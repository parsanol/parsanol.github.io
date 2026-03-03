import { ref, watch } from 'vue'

type Theme = 'light' | 'dark'

const isDark = ref(false)

export function useTheme() {
  const initTheme = () => {
    const stored = localStorage.getItem('theme') as Theme | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (stored) {
      isDark.value = stored === 'dark'
    } else {
      isDark.value = prefersDark
    }

    applyTheme()
  }

  const applyTheme = () => {
    if (isDark.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const toggleTheme = () => {
    isDark.value = !isDark.value
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
    applyTheme()
  }

  watch(isDark, applyTheme)

  return {
    isDark,
    initTheme,
    toggleTheme,
  }
}
