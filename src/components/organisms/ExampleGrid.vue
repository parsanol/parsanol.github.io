<template>
  <div class="space-y-12">
    <!-- Language filter -->
    <div class="flex flex-wrap items-center gap-4 mb-6">
      <span class="text-sm text-gray-500 dark:text-gray-400">Filter:</span>
      <div class="flex flex-wrap gap-2">
        <button
          @click="showRust = !showRust"
          class="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-colors"
          :class="showRust
            ? 'bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 ring-1 ring-orange-300 dark:ring-orange-700'
            : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 ring-1 ring-gray-200 dark:ring-gray-700'"
        >
          <span
            class="w-2.5 h-2.5 rounded-sm"
            :class="showRust ? 'bg-orange-500' : 'bg-gray-300 dark:bg-gray-600'"
          ></span>
          Rust
        </button>
        <button
          @click="showRuby = !showRuby"
          class="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-colors"
          :class="showRuby
            ? 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 ring-1 ring-red-300 dark:ring-red-700'
            : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 ring-1 ring-gray-200 dark:ring-gray-700'"
        >
          <span
            class="w-2.5 h-2.5 rounded-sm"
            :class="showRuby ? 'bg-red-500' : 'bg-gray-300 dark:bg-gray-600'"
          ></span>
          Ruby
        </button>
        <button
          @click="showParsletOnly = !showParsletOnly"
          class="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-colors"
          :class="showParsletOnly
            ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 ring-1 ring-purple-300 dark:ring-purple-700'
            : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 ring-1 ring-gray-200 dark:ring-gray-700'"
          title="Show only examples ported from original Parslet repository"
        >
          <span
            class="w-2.5 h-2.5 rounded-sm"
            :class="showParsletOnly ? 'bg-purple-500' : 'bg-gray-300 dark:bg-gray-600'"
          ></span>
          From Parslet
        </button>
      </div>
      <span class="text-xs text-gray-400 dark:text-gray-500">
        Showing {{ filteredCount }} of {{ totalCount }} examples
      </span>
    </div>

    <!-- Dynamic sections based on manifest categories -->
    <section v-for="(examples, category) in examplesByCategory" :key="category">
      <div class="flex items-center gap-3 mb-6">
        <div :class="['w-10 h-10 rounded-lg flex items-center justify-center', getCategoryColor(category)]">
          <svg class="w-5 h-5" :class="getCategoryIconColor(category)" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getCategoryIcon(category)" />
          </svg>
        </div>
        <div>
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">{{ categoryLabels[category] || category }}</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ getCategoryDescription(category) }}</p>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ExampleCard
          v-for="example in examples"
          :key="example.path"
          v-bind="toExample(example)"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue'
import ExampleCard from '../molecules/ExampleCard.vue'
import examplesManifest from '../../data/examples-manifest.json'

interface Example {
  title: string
  description: string
  difficulty: 1 | 2 | 3
  concepts: string[]
  languages: ('rust' | 'ruby')[]
  to: string
  diagram?: string
}

// Language filter state - persisted to localStorage
const showRust = ref(true)
const showRuby = ref(true)
const showParsletOnly = ref(false)

// Load filter preferences from localStorage
onMounted(() => {
  const savedRust = localStorage.getItem('parsanol-filter-rust')
  const savedRuby = localStorage.getItem('parsanol-filter-ruby')
  const savedParslet = localStorage.getItem('parsanol-filter-parslet')
  if (savedRust !== null) showRust.value = savedRust === 'true'
  if (savedRuby !== null) showRuby.value = savedRuby === 'true'
  if (savedParslet !== null) showParsletOnly.value = savedParslet === 'true'
})

// Save filter preferences to localStorage
watch([showRust, showRuby, showParsletOnly], () => {
  localStorage.setItem('parsanol-filter-rust', String(showRust.value))
  localStorage.setItem('parsanol-filter-ruby', String(showRuby.value))
  localStorage.setItem('parsanol-filter-parslet', String(showParsletOnly.value))
})

// Total and filtered counts
const totalCount = examplesManifest.length
const filteredCount = computed(() => filteredExamples.value.length)

// Filter examples based on selected languages and Parslet compatibility
const filteredExamples = computed(() => {
  return examplesManifest.filter(example => {
    // Language filter: Show example if it matches ANY of the selected language filters
    const matchesLanguage =
      (showRust.value && example.hasRust) ||
      (showRuby.value && example.hasRuby)

    if (!matchesLanguage) return false

    // Parslet compatibility filter: If enabled, only show Parslet-compatible examples
    if (showParsletOnly.value && !example.parsletCompatible) {
      return false
    }

    return true
  })
})

// Category labels - matches data/categories.json
const categoryLabels: Record<string, string> = {
  'expression-parsers': 'Expression Parsers',
  'data-formats': 'Data Formats',
  'urls-network': 'URLs & Network',
  'code-template': 'Code & Templates',
  'text-processing': 'Text Processing',
  'error-handling': 'Error Handling',
  'conceptual': 'Conceptual Examples',
}

// Category descriptions
const categoryDescriptions: Record<string, string> = {
  'expression-parsers': 'Parse and evaluate mathematical and logical expressions',
  'data-formats': 'Parse structured data formats like JSON, CSV, XML',
  'urls-network': 'Parse URLs, email addresses, IP addresses',
  'code-template': 'Parse programming languages and template syntax',
  'text-processing': 'Parse natural language and text structures',
  'error-handling': 'Rich error reporting and debugging techniques',
  'conceptual': 'Demonstrate specific parser concepts and patterns',
}

// Category order for consistent display
const categoryOrder = [
  'expression-parsers',
  'data-formats',
  'urls-network',
  'code-template',
  'text-processing',
  'error-handling',
  'conceptual',
]

// Category colors
function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    'expression-parsers': 'bg-blue-100 dark:bg-blue-900',
    'data-formats': 'bg-green-100 dark:bg-green-900',
    'urls-network': 'bg-purple-100 dark:bg-purple-900',
    'code-template': 'bg-orange-100 dark:bg-orange-900',
    'text-processing': 'bg-teal-100 dark:bg-teal-900',
    'error-handling': 'bg-red-100 dark:bg-red-900',
    'conceptual': 'bg-yellow-100 dark:bg-yellow-900',
  }
  return colors[category] || 'bg-gray-100 dark:bg-gray-900'
}

function getCategoryIconColor(category: string): string {
  const colors: Record<string, string> = {
    'expression-parsers': 'text-blue-600 dark:text-blue-400',
    'data-formats': 'text-green-600 dark:text-green-400',
    'urls-network': 'text-purple-600 dark:text-purple-400',
    'code-template': 'text-orange-600 dark:text-orange-400',
    'text-processing': 'text-teal-600 dark:text-teal-400',
    'error-handling': 'text-red-600 dark:text-red-400',
    'conceptual': 'text-yellow-600 dark:text-yellow-400',
  }
  return colors[category] || 'text-gray-600 dark:text-gray-400'
}

function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    'expression-parsers': 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z',
    'data-formats': 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4',
    'urls-network': 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9',
    'code-template': 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
    'text-processing': 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    'error-handling': 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
    'conceptual': 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
  }
  return icons[category] || 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
}

function getCategoryDescription(category: string): string {
  return categoryDescriptions[category] || 'Parser examples'
}

// Convert difficulty string to number
function difficultyToNumber(difficulty?: string): 1 | 2 | 3 {
  switch (difficulty) {
    case 'beginner': return 1
    case 'advanced': return 3
    default: return 2
  }
}

// Convert manifest item to Example format
function toExample(item: typeof examplesManifest[0]): Example {
  const languages: ('rust' | 'ruby')[] = []
  if (item.hasRust) languages.push('rust')
  if (item.hasRuby) languages.push('ruby')

  return {
    title: item.title,
    description: item.description || `Example demonstrating ${item.title.toLowerCase()}.`,
    difficulty: difficultyToNumber(item.difficulty),
    concepts: item.concepts || item.tags,
    languages,
    to: item.path,
    diagram: item.diagram,
  }
}

// Group filtered examples by category
const examplesByCategory = computed(() => {
  const groups: Record<string, typeof examplesManifest> = {}

  // Initialize all categories in order
  for (const category of categoryOrder) {
    groups[category] = []
  }

  for (const example of filteredExamples.value) {
    const category = example.category || 'conceptual'
    if (groups[category]) {
      groups[category].push(example)
    }
  }

  // Sort within each category by title
  for (const category of Object.keys(groups)) {
    groups[category].sort((a, b) => a.title.localeCompare(b.title))
  }

  // Filter out empty categories
  const result: Record<string, typeof examplesManifest> = {}
  for (const category of categoryOrder) {
    if (groups[category].length > 0) {
      result[category] = groups[category]
    }
  }

  return result
})
</script>
