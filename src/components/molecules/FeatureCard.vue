<template>
  <div class="feature-card">
    <div class="w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
      <Icon :name="icon" size="lg" class="text-primary-600 dark:text-primary-400" />
    </div>
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
      {{ title }}
    </h3>
    <p class="text-gray-600 dark:text-gray-400">
      {{ description }}
    </p>
  </div>
</template>

<script setup lang="ts">
import Icon from '../atoms/Icon.vue'

type IconName = 'menu' | 'close' | 'sun' | 'moon' | 'github' | 'search' | 'chevron-right' | 'check' | 'code' | 'book' | 'lightning' | 'puzzle' | 'cube' | 'arrows' | 'exclamation'

interface Props {
  title: string
  description: string
  icon: IconName
}

defineProps<Props>()
</script>

<style scoped>
.feature-card {
  @apply p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700;
}
</style>
