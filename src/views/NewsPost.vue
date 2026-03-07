<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="flex gap-12">
      <div class="w-64 flex-shrink-0 hidden lg:block">
        <div class="sticky top-20 h-[calc(100vh-6rem)] overflow-y-auto">
          <DocsNav :show-sections="['news']" />
        </div>
      </div>

      <div class="flex-1 min-w-0">
        <router-link to="/news" class="text-primary-600 dark:text-primary-400 hover:text-primary-700 mb-4 inline-flex items-center">
          <Icon name="chevron-right" class="w-4 h-4 rotate-180 mr-1" />
          Back to News
        </router-link>

        <article v-if="post">
          <!-- Header -->
          <div class="mb-8">
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
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
              {{ post.title }}
            </h1>
            <p class="text-lg text-gray-600 dark:text-gray-400 mt-3">{{ post.summary }}</p>
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
                class="text-gray-900 dark:text-white font-semibold mt-8 mb-4"
                :class="headingClasses[block.level]"
              >
                {{ block.text }}
              </component>

              <!-- Code Block -->
              <div v-else-if="block.type === 'code'" class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4 overflow-x-auto">
                <pre class="text-sm font-mono text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{{ block.text }}</pre>
              </div>

              <!-- List -->
              <ul v-else-if="block.type === 'list'" class="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 mb-4">
                <li v-for="(item, i) in block.items" :key="i">{{ item }}</li>
              </ul>

              <!-- Table -->
              <div v-else-if="block.type === 'table'" class="overflow-x-auto mb-4">
                <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg">
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
                  <tbody class="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
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

        <!-- Not Found -->
        <div v-else class="text-center py-12">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Post Not Found</h2>
          <p class="text-gray-600 dark:text-gray-400 mb-6">The news post you're looking for doesn't exist.</p>
          <router-link to="/news" class="btn btn-primary">
            Back to News
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import DocsNav from '../components/organisms/DocsNav.vue'
import Icon from '../components/atoms/Icon.vue'
import news from '../data/news-manifest.json'

const route = useRoute()

const post = computed(() => {
  const id = route.params.id as string
  return (news as any[]).find(p => p.id === id)
})

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
