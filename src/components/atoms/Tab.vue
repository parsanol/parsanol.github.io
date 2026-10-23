<template>
  <div class="tab-container">
    <button
      v-for="tab in tabs"
      :key="tab.id"
      :class="['tab-btn', { active: modelValue === tab.id }]"
      @click="$emit('update:modelValue', tab.id)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
interface Tab {
  id: string
  label: string
}

interface Props {
  modelValue: string
  tabs: Tab[]
}

defineProps<Props>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<style scoped>
.tab-container {
  @apply flex border-b border-gray-200 dark:border-gray-700;
}

.tab-btn {
  @apply px-4 py-2 text-sm font-medium transition-colors duration-200;
  @apply text-gray-600 dark:text-gray-400;
  @apply hover:text-gray-900 dark:hover:text-gray-100;
  @apply border-b-2 border-transparent;
  @apply -mb-px;
}

.tab-btn.active {
  @apply text-primary-600 dark:text-primary-400;
  @apply border-primary-600 dark:border-primary-400;
}
</style>
