<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { EditorState } from '@codemirror/state'
import { EditorView, basicSetup } from 'codemirror'
import { json } from '@codemirror/lang-json'
import jsonArtifact from '../assets/playground/json.artifact.json?raw'
import isoArtifact from '../assets/playground/iso.artifact.json?raw'
import recoveryArtifact from '../assets/playground/recovery.artifact.json?raw'

interface Demo {
  id: string
  name: string
  entry: string
  artifactRaw: string
  artifact: any
  input: string
}

const demos: Demo[] = [
  {
    id: 'recovery',
    name: 'Error recovery (key = value)',
    entry: 'main',
    artifactRaw: recoveryArtifact,
    artifact: JSON.parse(recoveryArtifact),
    input: 'a=1;b=2;@@junk@@;c=3;d=4;',
  },
  {
    id: 'iso',
    name: 'ISO identifier',
    entry: 'main',
    artifactRaw: isoArtifact,
    artifact: JSON.parse(isoArtifact),
    input: 'ISO 12345',
  },
  {
    id: 'json',
    name: 'JSON (RFC 8259)',
    entry: 'value',
    artifactRaw: jsonArtifact,
    artifact: JSON.parse(jsonArtifact),
    input: '{"parser": "parsanol", "artifacts": 3, "wasm": true, "items": [1, 2, 3]}',
  },
]

const current = ref<Demo>(demos[0])
const input = ref(current.value.input)
const treeText = ref('')
const boundText = ref('')
const errorText = ref('')
const recovery = ref<{ ok: boolean; headline: string; text: string } | null>(null)
const selfTest = ref<{ ok: boolean; text: string } | null>(null)
const loading = ref(true)
const shareState = ref('')

let PargArtifactJs: any = null
let artifactInstance: any = null
let editor: EditorView | null = null
let parseTimer: ReturnType<typeof setTimeout> | null = null
let initialised = false

const TREE_LIMIT = 120_000

async function initWasm() {
  if (PargArtifactJs) return
  const mod: any = await import('@parsanol/wasm')
  await mod.default()
  PargArtifactJs = mod.PargArtifactJs
}

function loadDemo(demo: Demo) {
  current.value = demo
  if (!PargArtifactJs) return
  artifactInstance = new PargArtifactJs(demo.artifactRaw)
  input.value = demo.input
  if (editor) {
    editor.dispatch({
      changes: { from: 0, to: editor.state.doc.length, insert: demo.input },
    })
  }
  runSelfTest()
  parse()
}

function runSelfTest() {
  if (!artifactInstance) return
  const expected = current.value.artifact.tests?.length ?? 0
  try {
    const failures = JSON.parse(artifactInstance.runTests())
    selfTest.value = {
      ok: failures.length === 0,
      text:
        expected === 0
          ? 'no embedded tests in this artifact'
          : failures.length === 0
            ? `${expected}/${expected} embedded tests green on wasm — all engines agree`
            : `${failures.length} embedded test failure(s)`,
    }
  } catch (error) {
    selfTest.value = { ok: false, text: `self-test failed: ${String(error)}` }
  }
}

function scheduleParse() {
  if (parseTimer) clearTimeout(parseTimer)
  parseTimer = setTimeout(parse, 180)
}

interface RecoveryError {
  offset?: number
  line?: number
  column?: number
  expected?: string[]
}

interface RecoveryEnvelope {
  ok: boolean
  shape?: unknown
  captures?: Record<string, unknown>
  error?: RecoveryError
  consumed_upto?: number
  partial?: unknown
  resyncs?: Array<{ offset?: number; skipped?: string; resumed_at?: number }>
}

function parse() {
  if (!artifactInstance) return
  errorText.value = ''
  recovery.value = null
  try {
    // One wasm call serves both paths: a clean parse carries `shape`,
    // a failed one carries the full recovery envelope (never throws).
    const envelope = JSON.parse(
      artifactInstance.parseShapeRecovering(current.value.entry, input.value),
    ) as RecoveryEnvelope
    if (!envelope.ok) {
      treeText.value = ''
      boundText.value = ''
      applyFailure(envelope)
      return
    }
    const shapeText = JSON.stringify(envelope.shape, null, 2)
    treeText.value =
      shapeText.length > TREE_LIMIT
        ? `${shapeText.slice(0, TREE_LIMIT)}\n… (${shapeText.length - TREE_LIMIT} more characters)`
        : shapeText
    try {
      boundText.value = artifactInstance.applyBindings(
        current.value.entry,
        JSON.stringify(envelope.shape),
      )
    } catch {
      boundText.value = ''
    }
  } catch (error) {
    treeText.value = ''
    boundText.value = ''
    errorText.value = String(error)
  }
}

// R1/R2 recovery envelope: the deepest error position, the best partial
// tree, and — when the grammar declares a `resync` policy — the
// deterministic spans that were consumed so the parse could resume.
function applyFailure(envelope: RecoveryEnvelope) {
  const err = envelope.error ?? {}
  const where = `line ${err.line ?? 1}:${err.column ?? 1} (offset ${err.offset ?? '?'})`
  const expected: string[] = Array.isArray(err.expected) ? err.expected : []
  const resyncs: Array<{ offset?: number; skipped?: string; resumed_at?: number }> = Array.isArray(
    envelope.resyncs,
  )
    ? envelope.resyncs
    : []
  const partial = envelope.partial ?? null

  const bits: string[] = [`parse failed at ${where}`]
  if (expected.length) {
    bits.push(`expected ${expected.slice(0, 4).join(', ')}${expected.length > 4 ? '…' : ''}`)
  }
  const itemCount = countPartialItems(partial)
  if (itemCount > 0) {
    bits.push(
      `partial tree keeps ${itemCount} complete ${itemCount === 1 ? 'item' : 'items'} before the failure`,
    )
  }
  for (const span of resyncs) {
    bits.push(
      `recovery consumed ${JSON.stringify(span.skipped)} (offsets ${span.offset}→${span.resumed_at}) as one annotated span and resumed`,
    )
  }
  if (!resyncs.length && itemCount > 0) {
    bits.push('no resync policy applied — the partial tree is the deepest clean prefix')
  }

  recovery.value = {
    ok: false,
    headline: bits.join(' · '),
    text: JSON.stringify(
      {
        partial,
        error: err,
        resyncs,
        captured: envelope.captures ?? {},
        consumed_upto: envelope.consumed_upto,
      },
      null,
      2,
    ),
  }
}

function countPartialItems(partial: any): number {
  if (partial == null) return 0
  if (Array.isArray(partial)) return partial.length
  if (typeof partial === 'object') {
    const first = Object.values(partial)[0]
    if (Array.isArray(first)) return first.length
  }
  return 0
}

function setupEditor(element: HTMLElement) {
  editor = new EditorView({
    state: EditorState.create({
      doc: input.value,
      extensions: [
        basicSetup,
        json(),
        EditorView.updateListener.of((update) => {
          if (!update.docChanged) return
          input.value = update.state.doc.toString()
          scheduleParse()
        }),
        EditorView.theme({ '&': { minHeight: '10rem', fontSize: '13px' } }),
      ],
    }),
    parent: element,
  })
  if (!initialised) {
    initialised = true
    loadDemo(current.value)
  }
}

function onDemoChange(event: Event) {
  const id = (event.target as HTMLSelectElement).value
  const demo = demos.find((candidate) => candidate.id === id)
  if (demo) loadDemo(demo)
}

async function copyShareLink() {
  const payload = JSON.stringify({ v: 1, d: current.value.id, i: input.value })
  const encoded = await encodePayload(payload)
  const url = `${location.origin}${location.pathname}#${encoded}`
  location.hash = encoded
  try {
    await navigator.clipboard.writeText(url)
    shareState.value = 'Link copied'
  } catch {
    shareState.value = 'Link is in the address bar'
  }
  setTimeout(() => (shareState.value = ''), 2500)
}

async function encodePayload(text: string): Promise<string> {
  const bytes = new TextEncoder().encode(text)
  if ('CompressionStream' in window) {
    const stream = new Blob([bytes]).stream().pipeThrough(new CompressionStream('gzip'))
    const buffer = await new Response(stream).arrayBuffer()
    return `z${toBase64Url(new Uint8Array(buffer))}`
  }
  return `p${toBase64Url(bytes)}`
}

async function decodePayload(token: string): Promise<string | null> {
  try {
    const compressed = token.startsWith('z')
    const bytes = fromBase64Url(token.slice(1))
    if (!compressed) return new TextDecoder().decode(bytes)
    const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))
    return new TextDecoder().decode(await new Response(stream).arrayBuffer())
  } catch {
    return null
  }
}

function toBase64Url(bytes: Uint8Array): string {
  let binary = ''
  bytes.forEach((byte) => (binary += String.fromCharCode(byte)))
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function fromBase64Url(text: string): Uint8Array {
  const padded = text.replace(/-/g, '+').replace(/_/g, '/')
  const binary = atob(padded + '='.repeat((4 - (padded.length % 4)) % 4))
  return Uint8Array.from(binary, (char) => char.charCodeAt(0))
}

async function applyHash() {
  const token = location.hash.replace(/^#/, '')
  if (!token) return
  const decoded = await decodePayload(token)
  if (!decoded) return
  try {
    const payload = JSON.parse(decoded)
    const demo = demos.find((candidate) => candidate.id === payload.d)
    if (!demo) return
    demo.input = String(payload.i ?? demo.input)
    if (current.value.id === demo.id) {
      input.value = demo.input
      if (editor) {
        editor.dispatch({ changes: { from: 0, to: editor.state.doc.length, insert: demo.input } })
      }
      parse()
    } else {
      current.value = demo
    }
  } catch {
    // ignore malformed share links
  }
}

onMounted(async () => {
  const element = document.getElementById('playground-editor')
  if (element) setupEditor(element)
  await initWasm()
  loading.value = false
  await applyHash()
  loadDemo(current.value)
})

onBeforeUnmount(() => {
  if (parseTimer) clearTimeout(parseTimer)
  editor?.destroy()
  artifactInstance?.free?.()
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-wrap items-center gap-3">
      <label class="text-sm font-medium" for="demo-select">Grammar</label>
      <select
        id="demo-select"
        class="rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-2 py-1 text-sm"
        :value="current.id"
        @change="onDemoChange"
      >
        <option v-for="demo in demos" :key="demo.id" :value="demo.id">{{ demo.name }}</option>
      </select>
      <button
        class="rounded bg-primary-600 px-3 py-1 text-sm text-white hover:bg-primary-700"
        @click="copyShareLink"
      >
        Share
      </button>
      <span class="text-xs text-gray-500 dark:text-gray-400">{{ shareState }}</span>
      <span
        v-if="selfTest"
        :class="[
          'ml-auto rounded-full px-3 py-1 text-xs font-medium',
          selfTest.ok
            ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200'
            : 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-200',
        ]"
        >{{ selfTest.text }}</span
      >
    </div>

    <div class="grid gap-6 lg:grid-cols-2">
      <section>
        <h2 class="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
          Input
        </h2>
        <div
          id="playground-editor"
          class="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
        ></div>
        <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Entry point: <code class="font-mono">{{ current.entry }}</code> · parsed live by the
          parsanol wasm engine
        </p>
      </section>

      <section>
        <div class="mb-2 flex gap-2 text-sm">
          <span
            class="rounded bg-gray-200 px-2 py-1 text-xs font-medium dark:bg-gray-700"
            >tree</span
          >
          <span class="text-xs text-gray-500 dark:text-gray-400"
            >parsanol-shape output (truncated above {{ TREE_LIMIT }} characters)</span
          >
        </div>
        <pre
          class="h-64 overflow-auto rounded-lg border border-gray-200 bg-gray-900 p-3 text-xs text-gray-100 dark:border-gray-700"
        >{{ loading ? 'Loading wasm engine…' : errorText || treeText || '(empty)' }}</pre>
        <details class="mt-3">
          <summary class="cursor-pointer text-sm font-medium">Bound captures</summary>
          <pre
            class="mt-2 max-h-48 overflow-auto rounded-lg border border-gray-200 bg-gray-900 p-3 text-xs text-gray-100 dark:border-gray-700"
          >{{ boundText === '{}' ? '(no bindings declared for this entry)' : boundText || '(no bindings declared for this entry)' }}</pre>
        </details>
      </section>
    </div>

    <div
      v-if="recovery && !recovery.ok"
      class="rounded-lg border border-amber-300 bg-amber-50 dark:border-amber-700/60 dark:bg-amber-900/20"
    >
      <div class="px-4 py-2 text-sm font-medium text-amber-900 dark:text-amber-200">
        Error recovery · {{ recovery.headline }}
      </div>
      <pre
        class="max-h-72 overflow-auto border-t border-amber-200 bg-white/70 px-4 py-3 text-xs text-gray-800 dark:border-amber-800/60 dark:bg-gray-900/60 dark:text-gray-100"
      >{{ recovery.text }}</pre>
      <p class="px-4 py-2 text-xs text-amber-800 dark:text-amber-300">
        Produced by <code>parseShapeRecovering</code>: the deepest real-content position, the
        best partial tree, and — because this grammar declares a
        <code>resync document = …</code> policy — the exact spans consumed so the parse could
        resume. Every engine returns these spans byte-identically.
      </p>
    </div>

    <details class="rounded-lg border border-gray-200 dark:border-gray-700">
      <summary class="cursor-pointer px-4 py-2 text-sm font-medium">Grammar source</summary>
      <pre
        class="max-h-80 overflow-auto border-t border-gray-200 bg-gray-50 p-4 text-xs dark:border-gray-700 dark:bg-gray-800/50"
      >{{ current.artifact.source }}</pre>
    </details>

    <p class="text-xs text-gray-500 dark:text-gray-400">
      The engine is the published <code>@parsanol/wasm</code> build (~1.4&nbsp;MB), the same
      binary the Rust and Ruby conformance suites validate. Parsing runs locally; nothing is
      uploaded. Share links carry the grammar id and input, gzipped in the URL hash.
    </p>
  </div>
</template>
