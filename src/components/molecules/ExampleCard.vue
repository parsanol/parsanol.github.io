<template>
  <div class="card card-hover group">
    <div class="flex items-start justify-between mb-3">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
        {{ title }}
      </h3>
      <!-- Difficulty indicator -->
      <div v-if="difficulty" class="flex gap-0.5" :title="`Difficulty: ${difficulty}/3`">
        <span
          v-for="n in 3"
          :key="n"
          class="w-2 h-2 rounded-full"
          :class="n <= difficulty ? 'bg-amber-400' : 'bg-gray-200 dark:bg-gray-700'"
        />
      </div>
    </div>
    <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">
      {{ description }}
    </p>
    <!-- Concepts tags -->
    <div v-if="concepts && concepts.length > 0" class="flex flex-wrap gap-1.5 mb-4">
      <span
        v-for="concept in concepts.slice(0, 3)"
        :key="concept"
        class="px-2 py-0.5 text-xs font-medium rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
      >
        {{ concept }}
      </span>
      <span
        v-if="concepts.length > 3"
        class="px-2 py-0.5 text-xs font-medium rounded bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-500"
      >
        +{{ concepts.length - 3 }}
      </span>
    </div>
    <!-- Language badges and link -->
    <div class="flex items-center justify-between">
      <div class="flex flex-wrap gap-1.5">
        <Badge v-for="lang in displayLanguages" :key="lang.value" :variant="lang.value">
          {{ lang.label }}
        </Badge>
      </div>
      <router-link
        v-if="to"
        :to="to"
        class="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity"
      >
        View
        <Icon name="chevron-right" class="ml-0.5 w-3.5 h-3.5" />
      </router-link>
      <a
        v-else-if="href"
        :href="href"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity"
      >
        View
        <Icon name="chevron-right" class="ml-0.5 w-3.5 h-3.5" />
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Icon from '../atoms/Icon.vue'
import Badge from '../atoms/Badge.vue'

interface Props {
  title: string
  description: string
  difficulty?: 1 | 2 | 3
  concepts?: string[]
  languages?: ('rust' | 'ruby' | 'python' | 'js')[]
  to?: string
  href?: string
}

const props = withDefaults(defineProps<Props>(), {
  difficulty: 1,
  concepts: () => [],
  languages: () => ['rust'],
})

const languageLabels: Record<string, string> = {
  rust: 'Rust',
  ruby: 'Ruby',
  python: 'Python',
  js: 'JS/WASM',
}

const displayLanguages = computed(() => {
  return props.languages.map(lang => ({
    value: lang,
    label: languageLabels[lang] || lang,
  }))
})
</script>
