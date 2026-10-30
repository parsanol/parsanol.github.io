<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { encodeSharePayload } from '../lib/share-payload'
import { editionLabel } from '../lib/edition'

// The live Try-it-live block on an example page (site#36): the page
// passes the artifact this example ships (checksum-verified on load)
// and, when the grammar is also a playground demo, its demo id — the
// island then offers the preselected share-link into the playground.
const props = defineProps<{
  artifactRaw: string
  demoId?: string
  presetInput?: string
}>()

const ready = ref(false)
const failed = ref('')
const entry = ref('')
const edition = ref('')
const input = ref(props.presetInput || '')
const tree = ref('')
const elapsed = ref(0)
const truncated = ref(false)
const playgroundHref = ref('')

let PargArtifactJs: any = null
let artifact: any = null
let timer: ReturnType<typeof setTimeout> | null = null

const TREE_LIMIT = 20_000

async function initWasm() {
  if (PargArtifactJs) return
  const mod: any = await import('@parsanol/wasm')
  await mod.default()
  PargArtifactJs = mod.PargArtifactJs
}

function sampleInput(envelope: any): string {
  if (props.presetInput) return props.presetInput
  const test = (envelope.tests || []).find(
    (t: any) => t.kind === 'accept' || t.kind === 'shape',
  )
  return test?.input ?? ''
}

async function parse() {
  if (!artifact) return
  const started = performance.now()
  try {
    const envelope = JSON.parse(artifact.parseShapeRecovering(entry.value, input.value))
    if (envelope.error) {
      tree.value = JSON.stringify(envelope.error, null, 2)
    } else {
      tree.value = JSON.stringify(envelope.shape, null, 2)
    }
  } catch (err: any) {
    tree.value = String(err?.message ?? err)
  }
  elapsed.value = Math.max(0, performance.now() - started)
  truncated.value = tree.value.length > TREE_LIMIT
}

function onInput() {
  if (timer) clearTimeout(timer)
  timer = setTimeout(parse, 250)
}

onBeforeUnmount(() => {
  if (timer) clearTimeout(timer)
})

onMounted(async () => {
  try {
    await initWasm()
    artifact = new PargArtifactJs(props.artifactRaw)
    const envelope = JSON.parse(props.artifactRaw)
    edition.value = editionLabel(envelope.edition)
    entry.value = envelope.default_entry || Object.keys(envelope.entries || {})[0] || 'main'
    input.value = sampleInput(envelope)
    await parse()
    if (props.demoId) {
      const token = await encodeSharePayload({ d: props.demoId, i: input.value })
      playgroundHref.value = `/playground#${token}`
    }
    ready.value = true
  } catch (err: any) {
    failed.value = String(err?.message ?? err)
  }
})
</script>

<template>
  <div class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden mb-8">
    <div class="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <span class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
        Try it live<span v-if="edition"> · {{ edition }} edition</span> · parsed in your browser by the wasm engine
      </span>
      <a
        v-if="playgroundHref"
        :href="playgroundHref"
        class="text-xs text-primary-600 dark:text-primary-400 hover:underline"
      >Open in playground →</a>
    </div>
    <div v-if="failed" class="px-4 py-3 text-sm text-red-600 dark:text-red-400">
      The wasm engine failed to load: {{ failed }}
    </div>
    <div v-else-if="!ready" class="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
      Loading the wasm engine…
    </div>
    <div v-else class="grid md:grid-cols-2">
      <div class="border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700 p-4">
        <label class="block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
          Input · entry <code class="normal-case">{{ entry }}</code>
        </label>
        <textarea
          v-model="input"
          rows="5"
          spellcheck="false"
          class="w-full font-mono text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded p-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
          @input="onInput"
        ></textarea>
        <div class="mt-2 text-xs text-gray-500 dark:text-gray-400">
          {{ elapsed.toFixed(1) }} ms · checksum verified on load
        </div>
      </div>
      <div class="p-4 min-w-0">
        <div class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
          Shape
        </div>
        <pre class="font-mono text-xs leading-5 overflow-auto max-h-64 text-gray-900 dark:text-gray-100 whitespace-pre-wrap break-words">{{ truncated ? tree.slice(0, TREE_LIMIT) + '\n…' : tree }}</pre>
      </div>
    </div>
  </div>
</template>
