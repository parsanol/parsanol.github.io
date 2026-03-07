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

        <div class="space-y-6">
          <router-link
            v-for="post in news"
            :key="post.id"
            :to="`/news/${post.id}`"
            class="block card p-6 hover:shadow-lg transition cursor-pointer"
          >
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
              <span
                v-if="post.featured"
                class="px-2 py-0.5 text-xs font-medium rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300"
              >
                Latest
              </span>
            </div>
            <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {{ post.title }}
            </h2>
            <p class="text-gray-600 dark:text-gray-400">{{ post.summary }}</p>
            <div class="mt-4 text-primary-600 dark:text-primary-400 text-sm font-medium">
              Read more →
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DocsNav from '../components/organisms/DocsNav.vue'
import news from '../data/news.json'

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
