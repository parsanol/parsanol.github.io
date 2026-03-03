<template>
  <div class="relative">
    <Icon
      name="search"
      class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      size="sm"
    />
    <input
      type="text"
      :value="modelValue"
      :placeholder="placeholder"
      class="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-primary-500 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 outline-none transition-colors"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>

<script setup lang="ts">
import Icon from '../atoms/Icon.vue'

interface Props {
  modelValue: string
  placeholder?: string
}

withDefaults(defineProps<Props>(), {
  placeholder: 'Search documentation...',
})

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>
