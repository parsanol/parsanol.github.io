<script setup lang="ts">
const props = defineProps<{ rust?: string; ruby?: string }>()
import { ref } from 'vue'
const langs = ['rust', 'ruby'] as const
const available = langs.filter(l => props[l])
const active = ref(available[0])
</script>
<template>
  <div class="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden my-4">
    <div v-if="available.length > 1" class="flex gap-2 px-3 py-2 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700 text-sm">
      <button v-for="l in available" :key="l" @click="active = l"
        :class="['px-3 py-1 rounded', active === l ? 'bg-primary-600 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700']">
        {{ l }}
      </button>
    </div>
    <pre v-if="active === 'rust' && props.rust" class="p-4 bg-gray-900 text-gray-100 text-sm overflow-x-auto"><code>{{ props.rust }}</code></pre>
    <pre v-else-if="active === 'ruby' && props.ruby" class="p-4 bg-gray-900 text-gray-100 text-sm overflow-x-auto"><code>{{ props.ruby }}</code></pre>
  </div>
</template>
