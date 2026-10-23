<template>
  <span :class="['badge', variantClasses]">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'default' | 'rust' | 'ruby' | 'python' | 'js'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
})

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'rust':
      return 'badge-rust'
    case 'ruby':
      return 'badge-ruby'
    case 'python':
      return 'badge-python'
    case 'js':
      return 'badge-js'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
  }
})
</script>
