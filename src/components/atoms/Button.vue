<template>
  <button
    :class="[
      'btn',
      variantClasses,
      sizeClasses,
      { 'opacity-50 cursor-not-allowed': disabled }
    ]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
})

defineEmits<{
  click: [event: MouseEvent]
}>()

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'secondary':
      return 'btn-secondary'
    default:
      return 'btn-primary'
  }
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'text-sm px-3 py-1.5'
    case 'lg':
      return 'text-lg px-6 py-3'
    default:
      return ''
  }
})
</script>
