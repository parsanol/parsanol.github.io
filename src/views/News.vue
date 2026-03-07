<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="flex gap-12">
      <div class="w-64 flex-shrink-0 hidden lg:block">
        <div class="sticky top-20 h-[calc(100vh-6rem)] overflow-y-auto">
          <DocsNav :show-sections="['news']" />
        </div>
      </div>

      <div class="flex-1 min-w-0">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">News & Releases</h1>

        <div class="space-y-12">
          <article v-for="post in news" :key="post.id" class="border-b border-gray-200 dark:border-gray-700 pb-12 last:border-0">
            <!-- Header -->
            <div class="mb-6">
              <div class="flex items-center gap-3 mb-2">
                <span class="text-sm text-gray-500 dark:text-gray-400">{{ formatDate(post.date) }}</span>
                <span
                  v-for="tag in post.tags"
                  :key="tag"
                  class="px-2 py-0.5 text-xs font-medium rounded-full"
                  :class="getTagClass(tag)"
                >
                  {{ tag }}
                </span>
              </div>
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                {{ post.title }}
              </h2>
              <p class="text-gray-600 dark:text-gray-400 mt-2">{{ post.summary }}</p>
            </div>

            <!-- Content -->
            <div class="prose dark:prose-invert max-w-none">
              <template v-for="(block, idx) in post.content" :key="idx">
                <!-- Paragraph -->
                <p v-if="block.type === 'paragraph'" class="text-gray-600 dark:text-gray-400 mb-4">
                  {{ block.text }}
                </p>

                <!-- Heading -->
                <component
                  v-else-if="block.type === 'heading'"
                  :is="'h' + block.level"
                  class="text-gray-900 dark:text-white font-semibold mt-6 mb-3"
                  :class="headingClasses[block.level]"
                >
                  {{ block.text }}
                </component>

                <!-- Code Block -->
                <div v-else-if="block.type === 'code'" class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4 overflow-x-auto">
                  <pre class="text-sm font-mono text-gray-800 dark:text-gray-200">{{ block.text }}</pre>
                </div>

                <!-- List -->
                <ul v-else-if="block.type === 'list'" class="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1 mb-4">
                  <li v-for="(item, i) in block.items" :key="i">{{ item }}</li>
                </ul>

                <!-- Table -->
                <div v-else-if="block.type === 'table'" class="overflow-x-auto mb-4">
                  <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead class="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th
                          v-for="(header, i) in block.headers"
                          :key="i"
                          class="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-white"
                        >
                          {{ header }}
                        </th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                      <tr v-for="(row, i) in block.rows" :key="i">
                        <td
                          v-for="(cell, j) in row"
                          :key="j"
                          class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400"
                        >
                          {{ cell }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </template>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DocsNav from '../components/organisms/DocsNav.vue'
import news from '../data/news.json'

const headingClasses: Record<number, string> = {
  2: 'text-2xl',
  3: 'text-lg',
  4: 'text-base',
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

function getTagClass(tag: string): string {
  const classes: Record<string, string> = {
    release: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300',
    features: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300',
    streaming: 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300',
    performance: 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300',
  }
  return classes[tag] || 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
}
</script>
