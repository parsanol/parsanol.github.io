<template>
  <div class="code-block-wrapper">
    <pre :class="['code-block', `language-${lang}`]"><code v-html="highlightedCode" /></pre>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Prism from 'prismjs'
import 'prismjs/components/prism-rust'
import 'prismjs/components/prism-ruby'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-typescript'

interface Props {
  lang: string
  code: string
}

const props = defineProps<Props>()

const highlightedCode = computed(() => {
  const grammar = Prism.languages[props.lang]
  if (!grammar) {
    return escapeHtml(props.code)
  }
  return Prism.highlight(props.code, grammar, props.lang)
})

const escapeHtml = (text: string): string => {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}
</script>

<style scoped>
.code-block-wrapper {
  @apply relative;
}

.code-block-wrapper pre code {
  @apply block;
}
</style>
