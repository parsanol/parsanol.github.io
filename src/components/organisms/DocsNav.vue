<template>
  <aside class="w-64 flex-shrink-0 hidden lg:block">
    <nav class="sticky top-20 space-y-6">
      <!-- About -->
      <div v-if="showSections.includes('about')">
        <h3 class="font-semibold text-gray-900 dark:text-white mb-3">About</h3>
        <ul class="space-y-1">
          <li>
            <router-link to="/about" class="nav-link text-sm" :class="{ 'active': $route.path === '/about' }">
              About Parsanol
            </router-link>
          </li>
        </ul>
      </div>

      <!-- Introduction (new separate pages) -->
      <div v-if="showSections.includes('introduction') || showSections.includes('installation') || showSections.includes('first-parser')">
        <h3 class="font-semibold text-gray-900 dark:text-white mb-3">Getting Started</h3>
        <ul class="space-y-1">
          <li>
            <router-link to="/introduction" class="nav-link text-sm" :class="{ 'active': $route.path === '/introduction' }">
              What is Parsanol?
            </router-link>
          </li>
          <li>
            <router-link to="/installation" class="nav-link text-sm" :class="{ 'active': $route.path === '/installation' }">
              Installation
            </router-link>
          </li>
          <li>
            <router-link to="/first-parser" class="nav-link text-sm" :class="{ 'active': $route.path === '/first-parser' }">
              Your First Parser
            </router-link>
          </li>
        </ul>
      </div>

      <!-- Getting Started (legacy single page) -->
      <div v-if="showSections.includes('getting-started')">
        <h3 class="font-semibold text-gray-900 dark:text-white mb-3">Getting Started</h3>
        <ul class="space-y-1">
          <li>
            <router-link to="/getting-started#installation" class="nav-link text-sm">
              Installation
            </router-link>
          </li>
          <li>
            <router-link to="/getting-started#basic-concepts" class="nav-link text-sm">
              Basic Concepts
            </router-link>
          </li>
          <li>
            <router-link to="/getting-started#first-parser" class="nav-link text-sm">
              First Parser
            </router-link>
          </li>
        </ul>
      </div>

      <!-- Parsers -->
      <div v-if="showSections.includes('parsers')">
        <h3 class="font-semibold text-gray-900 dark:text-white mb-3">Parser Combinators</h3>
        <ul class="space-y-1">
          <li>
            <router-link to="/parsers#basic-atoms" class="nav-link text-sm">
              Basic Atoms
            </router-link>
          </li>
          <li>
            <router-link to="/parsers#combinators" class="nav-link text-sm">
              Combinators
            </router-link>
          </li>
          <li>
            <router-link to="/parsers#advanced" class="nav-link text-sm">
              Advanced
            </router-link>
          </li>
          <li>
            <router-link to="/parsers#infix" class="nav-link text-sm">
              Infix Expressions
            </router-link>
          </li>
        </ul>
      </div>

      <!-- Transforms -->
      <div v-if="showSections.includes('transforms')">
        <h3 class="font-semibold text-gray-900 dark:text-white mb-3">Transforms</h3>
        <ul class="space-y-1">
          <li>
            <router-link to="/transforms#why-transforms" class="nav-link text-sm">
              Why Transforms?
            </router-link>
          </li>
          <li>
            <router-link to="/transforms#pattern-matching" class="nav-link text-sm">
              Pattern Matching
            </router-link>
          </li>
          <li>
            <router-link to="/transforms#simple-transforms" class="nav-link text-sm">
              Simple Transforms
            </router-link>
          </li>
        </ul>
      </div>

      <!-- Errors -->
      <div v-if="showSections.includes('errors')">
        <h3 class="font-semibold text-gray-900 dark:text-white mb-3">Error Handling</h3>
        <ul class="space-y-1">
          <li>
            <router-link to="/errors#tree-errors" class="nav-link text-sm">
              Tree-Structured Errors
            </router-link>
          </li>
          <li>
            <router-link to="/errors#reporters" class="nav-link text-sm">
              Error Reporters
            </router-link>
          </li>
        </ul>
      </div>

      <!-- Examples - Dynamic from manifest -->
      <div v-if="showSections.includes('examples')">
        <div class="flex items-center justify-between mb-3">
          <h3 class="font-semibold text-gray-900 dark:text-white">Examples</h3>
        </div>

        <!-- Language filter toggles -->
        <div class="flex flex-wrap gap-2 mb-4">
          <button
            @click="showRust = !showRust"
            class="flex items-center gap-1.5 px-2 py-1 text-xs font-medium rounded transition-colors"
            :class="showRust
              ? 'bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 ring-1 ring-orange-300 dark:ring-orange-700'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 ring-1 ring-gray-200 dark:ring-gray-700'"
          >
            <span
              class="w-2 h-2 rounded-sm"
              :class="showRust ? 'bg-orange-500' : 'bg-gray-300 dark:bg-gray-600'"
            ></span>
            Rust
          </button>
          <button
            @click="showRuby = !showRuby"
            class="flex items-center gap-1.5 px-2 py-1 text-xs font-medium rounded transition-colors"
            :class="showRuby
              ? 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 ring-1 ring-red-300 dark:ring-red-700'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 ring-1 ring-gray-200 dark:ring-gray-700'"
          >
            <span
              class="w-2 h-2 rounded-sm"
              :class="showRuby ? 'bg-red-500' : 'bg-gray-300 dark:bg-gray-600'"
            ></span>
            Ruby
          </button>
          <button
            @click="showParsletOnly = !showParsletOnly"
            class="flex items-center gap-1.5 px-2 py-1 text-xs font-medium rounded transition-colors"
            :class="showParsletOnly
              ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 ring-1 ring-purple-300 dark:ring-purple-700'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 ring-1 ring-gray-200 dark:ring-gray-700'"
            title="Show only examples ported from original Parslet repository"
          >
            <span
              class="w-2 h-2 rounded-sm"
              :class="showParsletOnly ? 'bg-purple-500' : 'bg-gray-300 dark:bg-gray-600'"
            ></span>
            From Parslet
          </button>
        </div>

        <!-- Dynamic examples from manifest grouped by category -->
        <div v-for="(examples, category) in examplesByCategory" :key="category" class="mb-4">
          <h4 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
            {{ categoryLabels[category] || category }}
          </h4>
          <ul class="space-y-1">
            <li v-for="example in examples" :key="example.path">
              <router-link
                :to="example.path"
                class="nav-link text-sm flex items-center gap-2"
                :class="{ 'active': $route.path === example.path }"
              >
                <span class="flex gap-0.5 flex-shrink-0 w-10">
                  <span
                    v-if="example.hasRust"
                    class="text-[9px] px-1 py-0.5 rounded bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400 font-medium"
                  >R</span>
                  <span
                    v-else
                    class="text-[9px] px-1 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 font-medium"
                  >-</span>
                  <span
                    v-if="example.hasRuby"
                    class="text-[9px] px-1 py-0.5 rounded bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 font-medium"
                  >Rb</span>
                  <span
                    v-else
                    class="text-[9px] px-1 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 font-medium"
                  >-</span>
                </span>
                <span class="truncate">{{ example.title }}</span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>

      <!-- Ruby -->
      <div v-if="showSections.includes('ruby')">
        <h3 class="font-semibold text-gray-900 dark:text-white mb-3">Ruby Bindings</h3>
        <ul class="space-y-1">
          <li>
            <router-link to="/ruby#three-modes" class="nav-link text-sm">
              The 3 Modes
            </router-link>
          </li>
          <li>
            <router-link to="/ruby#slice-feature" class="nav-link text-sm">
              Slice Support
            </router-link>
          </li>
          <li>
            <router-link to="/ruby#zerocopy" class="nav-link text-sm">
              ZeroCopy Interface
            </router-link>
          </li>
          <li>
            <router-link to="/ruby#when-to-use" class="nav-link text-sm">
              When to Use Which
            </router-link>
          </li>
          <li>
            <router-link to="/ruby#benchmarks" class="nav-link text-sm">
              Verify Performance
            </router-link>
          </li>
          <li>
            <router-link to="/ruby#migration" class="nav-link text-sm">
              Migration from Parslet
            </router-link>
          </li>
        </ul>
      </div>

      <!-- Rust -->
      <div v-if="showSections.includes('rust')">
        <h3 class="font-semibold text-gray-900 dark:text-white mb-3">Rust</h3>
        <ul class="space-y-1">
          <li>
            <router-link to="/rust#installation" class="nav-link text-sm">
              Installation
            </router-link>
          </li>
          <li>
            <router-link to="/rust#basic-usage" class="nav-link text-sm">
              Basic Usage
            </router-link>
          </li>
          <li>
            <router-link to="/rust#zero-copy" class="nav-link text-sm">
              Zero-Copy Parsing
            </router-link>
          </li>
          <li>
            <router-link to="/rust#slice-feature" class="nav-link text-sm">
              Slice Support
            </router-link>
          </li>
          <li>
            <router-link to="/rust#error-handling" class="nav-link text-sm">
              Error Handling
            </router-link>
          </li>
          <li>
            <router-link to="/rust#performance" class="nav-link text-sm">
              Performance Tips
            </router-link>
          </li>
          <li>
            <router-link to="/rust#features" class="nav-link text-sm">
              Feature Flags
            </router-link>
          </li>
        </ul>
      </div>

      <!-- Rust Comparison -->
      <div v-if="showSections.includes('rust-comparison')">
        <h3 class="font-semibold text-gray-900 dark:text-white mb-3">Rust Comparison</h3>
        <ul class="space-y-1">
          <li>
            <router-link to="/rust-comparison#summary" class="nav-link text-sm">
              Quick Summary
            </router-link>
          </li>
          <li>
            <router-link to="/rust-comparison#features" class="nav-link text-sm">
              Feature Comparison
            </router-link>
          </li>
          <li>
            <router-link to="/rust-comparison#details" class="nav-link text-sm">
              Detailed Comparisons
            </router-link>
          </li>
        </ul>
      </div>

      <!-- Ruby Comparison -->
      <div v-if="showSections.includes('ruby-comparison')">
        <h3 class="font-semibold text-gray-900 dark:text-white mb-3">Ruby Comparison</h3>
        <ul class="space-y-1">
          <li>
            <router-link to="/ruby-comparison#summary" class="nav-link text-sm">
              Quick Summary
            </router-link>
          </li>
          <li>
            <router-link to="/ruby-comparison#features" class="nav-link text-sm">
              Feature Comparison
            </router-link>
          </li>
          <li>
            <router-link to="/ruby-comparison#parslet" class="nav-link text-sm">
              vs Parslet
            </router-link>
          </li>
          <li>
            <router-link to="/ruby-comparison#modes" class="nav-link text-sm">
              Performance Modes
            </router-link>
          </li>
        </ul>
      </div>

      <!-- Docs (Comparison, Migration) -->
      <div v-if="showSections.includes('docs')">
        <h3 class="font-semibold text-gray-900 dark:text-white mb-3">Documentation</h3>
        <ul class="space-y-1">
          <li>
            <router-link to="/architecture" class="nav-link text-sm" :class="{ 'active': $route.path === '/architecture' }">
              Architecture
            </router-link>
          </li>
          <li>
            <router-link to="/comparison" class="nav-link text-sm" :class="{ 'active': $route.path === '/comparison' }">
              Parser Comparison
            </router-link>
          </li>
          <li>
            <router-link to="/migration" class="nav-link text-sm" :class="{ 'active': $route.path === '/migration' }">
              Migrating from Parslet
            </router-link>
          </li>
        </ul>
      </div>

      <!-- Architecture -->
      <div v-if="showSections.includes('architecture')">
        <h3 class="font-semibold text-gray-900 dark:text-white mb-3">Architecture</h3>
        <ul class="space-y-1">
          <li>
            <router-link to="/architecture#three-modes" class="nav-link text-sm">
              The 3 Modes
            </router-link>
          </li>
          <li>
            <router-link to="/architecture#zerocopy" class="nav-link text-sm">
              ZeroCopy Interface
            </router-link>
          </li>
          <li>
            <router-link to="/architecture#benchmarks" class="nav-link text-sm">
              Evidence-Based Benchmarks
            </router-link>
          </li>
          <li>
            <router-link to="/architecture#slice-feature" class="nav-link text-sm">
              Slice Support
            </router-link>
          </li>
          <li>
            <router-link to="/architecture#when-to-use" class="nav-link text-sm">
              When to Use Which
            </router-link>
          </li>
          <li>
            <router-link to="/architecture#rust-core" class="nav-link text-sm">
              Rust Core Engine
            </router-link>
          </li>
          <li>
            <router-link to="/architecture#parslet-compat" class="nav-link text-sm">
              Parslet Compatibility
            </router-link>
          </li>
          <li>
            <router-link to="/architecture#running-benchmarks" class="nav-link text-sm">
              Running Benchmarks
            </router-link>
          </li>
        </ul>
      </div>

      <!-- Backends -->
      <div v-if="showSections.includes('backends')">
        <h3 class="font-semibold text-gray-900 dark:text-white mb-3">Parsing Backends</h3>
        <ul class="space-y-1">
          <li>
            <router-link to="/backends#comparison" class="nav-link text-sm">
              Quick Comparison
            </router-link>
          </li>
          <li>
            <router-link to="/backends#how-they-work" class="nav-link text-sm">
              How They Work
            </router-link>
          </li>
          <li>
            <router-link to="/backends#when-to-use" class="nav-link text-sm">
              When to Use Which
            </router-link>
          </li>
          <li>
            <router-link to="/backends#problematic-patterns" class="nav-link text-sm">
              Problematic Patterns
            </router-link>
          </li>
          <li>
            <router-link to="/backends#analyzing" class="nav-link text-sm">
              Analyzing Your Grammar
            </router-link>
          </li>
          <li>
            <router-link to="/backends#usage" class="nav-link text-sm">
              Usage Examples
            </router-link>
          </li>
          <li>
            <router-link to="/backends#optimizations" class="nav-link text-sm">
              Optimizations
            </router-link>
          </li>
          <li>
            <router-link to="/backends#known-differences" class="nav-link text-sm">
              Known Differences
            </router-link>
          </li>
        </ul>
      </div>

      <!-- News -->
      <div v-if="showSections.includes('news')">
        <h3 class="font-semibold text-gray-900 dark:text-white mb-3">Releases</h3>
        <ul class="space-y-1">
          <li v-for="post in newsPosts" :key="post.id">
            <router-link
              :to="`/news/${post.id}`"
              class="nav-link text-sm flex items-center gap-2"
              :class="{ 'active': $route.path === `/news/${post.id}` }"
            >
              <span class="text-xs text-gray-500 dark:text-gray-400">{{ post.id }}</span>
              <span class="truncate">{{ getShortTitle(post.title) }}</span>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue'
import examplesManifest from '../../data/examples-manifest.json'
import newsPosts from '../../data/news.json'

interface Props {
  showSections?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  showSections: () => ['getting-started', 'parsers', 'transforms', 'errors', 'examples', 'ruby'],
})

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

// Helper function to get short title from news posts
function getShortTitle(title: string): string {
  return title.replace(/^Parsanol\s+(\w+\s+)?\d+\.\d+\.\d+:\s*/, '').replace(/^Parsanol\s+Ruby\s+\d+\.\d+\.\d+:\s*/, '')
}

// Category labels for display - matches data/categories.json
const categoryLabels: Record<string, string> = {
  'expression-parsers': 'Expression Parsers',
  'data-formats': 'Data Formats',
  'urls-network': 'URLs & Network',
  'code-template': 'Code & Templates',
  'text-processing': 'Text Processing',
  'error-handling': 'Error Handling',
  'conceptual': 'Conceptual',
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

// Filter examples based on selected languages and Parslet compatibility
const filteredExamples = computed(() => {
  return examplesManifest.filter(example => {
    // Language filter: Show example if it matches ANY of the selected language filters
    const matchesLanguage =
      (showRust.value && example.hasRust) ||
      (showRuby.value && example.hasRuby)

    if (!matchesLanguage) return false

    // Parslet compatibility filter: If enabled, only show Parslet-compatible examples
    if (showParsletOnly.value === true && !example.parsletCompatible) {
      return false
    }

    return true
  })
})

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
