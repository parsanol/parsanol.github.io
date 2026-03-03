<template>
  <div class="code-tabs">
    <div class="tabs">
      <button
        v-for="tab in availableTabs"
        :key="tab.name"
        :class="['tab-btn', { active: activeTab === tab.name }]"
        @click="activeTab = tab.name"
      >
        {{ tab.label }}
        <Badge v-if="tab.badge" :variant="tab.badge" class="ml-2">
          {{ tab.badge }}
        </Badge>
      </button>
    </div>
    <div class="code-content">
      <CodeBlock :lang="activeTab" :code="currentCode" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import CodeBlock from '../atoms/CodeBlock.vue'
import Badge from '../atoms/Badge.vue'

interface Tab {
  name: string
  label: string
  code: string
  badge?: 'rust' | 'ruby' | 'python' | 'js'
}

interface Props {
  rust?: string
  ruby?: string
  python?: string
  javascript?: string
}

const props = defineProps<Props>()

const availableTabs = computed<Tab[]>(() => {
  const tabs: Tab[] = []

  if (props.rust) {
    tabs.push({ name: 'rust', label: 'Rust', code: props.rust, badge: 'rust' })
  }
  if (props.ruby) {
    tabs.push({ name: 'ruby', label: 'Ruby', code: props.ruby, badge: 'ruby' })
  }
  if (props.python) {
    tabs.push({ name: 'python', label: 'Python', code: props.python, badge: 'python' })
  }
  if (props.javascript) {
    tabs.push({ name: 'javascript', label: 'JavaScript', code: props.javascript, badge: 'js' })
  }

  return tabs
})

const activeTab = ref(availableTabs.value[0]?.name || 'rust')

const currentCode = computed(() => {
  const tab = availableTabs.value.find(t => t.name === activeTab.value)
  return tab?.code || ''
})
</script>
