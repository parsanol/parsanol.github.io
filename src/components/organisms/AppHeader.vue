<template>
  <header class="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-2">
          <img
            src="/logo.svg"
            alt="Parsanol"
            class="header-logo"
          />
        </router-link>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-1">
          <!-- Get Started - Top level -->
          <router-link to="/getting-started" class="nav-link" active-class="active">
            Get Started
          </router-link>

          <!-- News - Top level -->
          <router-link to="/news" class="nav-link" active-class="active">
            News
          </router-link>

          <!-- Learn Dropdown (Generic Concepts) -->
          <div class="relative" ref="docsDropdownRef">
            <button
              class="nav-link flex items-center gap-1"
              :class="{ 'active': isDocsActive }"
              @click="toggleDocsDropdown"
              @mouseenter="openDocsDropdown"
            >
              Learn
              <Icon name="chevron-down" class="w-3 h-3 transition-transform" :class="{ 'rotate-180': isDocsOpen }" />
            </button>
            <transition
              enter-active-class="transition duration-150 ease-out"
              enter-from-class="opacity-0 scale-95"
              enter-to-class="opacity-100 scale-100"
              leave-active-class="transition duration-100 ease-in"
              leave-from-class="opacity-100 scale-100"
              leave-to-class="opacity-0 scale-95"
            >
              <div
                v-if="isDocsOpen"
                class="absolute left-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1"
                @mouseleave="closeDocsDropdown"
              >
                <router-link
                  v-for="link in docsLinks"
                  :key="link.to"
                  :to="link.to"
                  class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  active-class="bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400"
                  @click="closeDocsDropdown"
                >
                  {{ link.label }}
                </router-link>
              </div>
            </transition>
          </div>

          <!-- Rust Dropdown -->
          <div class="relative" ref="rustDropdownRef">
            <button
              class="nav-link flex items-center gap-1"
              :class="{ 'active': isRustActive }"
              @click="toggleRustDropdown"
              @mouseenter="openRustDropdown"
            >
              Rust
              <Icon name="chevron-down" class="w-3 h-3 transition-transform" :class="{ 'rotate-180': isRustOpen }" />
            </button>
            <transition
              enter-active-class="transition duration-150 ease-out"
              enter-from-class="opacity-0 scale-95"
              enter-to-class="opacity-100 scale-100"
              leave-active-class="transition duration-100 ease-in"
              leave-from-class="opacity-100 scale-100"
              leave-to-class="opacity-0 scale-95"
            >
              <div
                v-if="isRustOpen"
                class="absolute left-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1"
                @mouseleave="closeRustDropdown"
              >
                <router-link
                  v-for="link in rustLinks"
                  :key="link.to"
                  :to="link.to"
                  class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  active-class="bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400"
                  @click="closeRustDropdown"
                >
                  {{ link.label }}
                </router-link>
              </div>
            </transition>
          </div>

          <!-- Ruby Dropdown -->
          <div class="relative" ref="rubyDropdownRef">
            <button
              class="nav-link flex items-center gap-1"
              :class="{ 'active': isRubyActive }"
              @click="toggleRubyDropdown"
              @mouseenter="openRubyDropdown"
            >
              Ruby
              <Icon name="chevron-down" class="w-3 h-3 transition-transform" :class="{ 'rotate-180': isRubyOpen }" />
            </button>
            <transition
              enter-active-class="transition duration-150 ease-out"
              enter-from-class="opacity-0 scale-95"
              enter-to-class="opacity-100 scale-100"
              leave-active-class="transition duration-100 ease-in"
              leave-from-class="opacity-100 scale-100"
              leave-to-class="opacity-0 scale-95"
            >
              <div
                v-if="isRubyOpen"
                class="absolute left-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1"
                @mouseleave="closeRubyDropdown"
              >
                <router-link
                  v-for="link in rubyLinks"
                  :key="link.to"
                  :to="link.to"
                  class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  active-class="bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400"
                  @click="closeRubyDropdown"
                >
                  {{ link.label }}
                </router-link>
              </div>
            </transition>
          </div>

          <!-- Simple Links -->
          <router-link
            v-for="link in simpleLinks"
            :key="link.to"
            :to="link.to"
            class="nav-link"
            active-class="active"
          >
            {{ link.label }}
          </router-link>
        </nav>

        <!-- Actions -->
        <div class="flex items-center space-x-2">
          <a
            href="https://github.com/parsanol/parsanol-rs"
            target="_blank"
            rel="noopener noreferrer"
            class="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            <Icon name="github" />
          </a>
          <button
            class="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            @click="toggleTheme"
          >
            <Icon :name="isDark ? 'sun' : 'moon'" />
          </button>

          <!-- Mobile Menu Button -->
          <button
            class="md:hidden p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
          >
            <Icon :name="isMobileMenuOpen ? 'close' : 'menu'" />
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <nav v-if="isMobileMenuOpen" class="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
          <!-- Get Started - Top level -->
          <router-link
            to="/getting-started"
            class="block nav-link"
            active-class="active"
            @click="isMobileMenuOpen = false"
          >
            Get Started
          </router-link>

          <!-- Mobile Learn Section -->
          <div class="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Learn</div>
          <router-link
            v-for="link in docsLinks"
            :key="link.to"
            :to="link.to"
            class="block nav-link"
            active-class="active"
            @click="isMobileMenuOpen = false"
          >
            {{ link.label }}
          </router-link>

          <!-- Mobile Rust Section -->
          <div class="px-4 py-2 mt-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Rust</div>
          <router-link
            v-for="link in rustLinks"
            :key="link.to"
            :to="link.to"
            class="block nav-link"
            active-class="active"
            @click="isMobileMenuOpen = false"
          >
            {{ link.label }}
          </router-link>

          <!-- Mobile Ruby Section -->
          <div class="px-4 py-2 mt-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Ruby</div>
          <router-link
            v-for="link in rubyLinks"
            :key="link.to"
            :to="link.to"
            class="block nav-link"
            active-class="active"
            @click="isMobileMenuOpen = false"
          >
            {{ link.label }}
          </router-link>

          <!-- Mobile Simple Links -->
          <div class="border-t border-gray-200 dark:border-gray-700 mt-2 pt-2">
            <router-link
              v-for="link in simpleLinks"
              :key="link.to"
              :to="link.to"
              class="block nav-link"
              active-class="active"
              @click="isMobileMenuOpen = false"
            >
              {{ link.label }}
            </router-link>
          </div>
        </nav>
      </transition>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import Icon from '../atoms/Icon.vue'
import { useTheme } from '../../composables/useTheme'

const { isDark, toggleTheme } = useTheme()
const route = useRoute()
const isMobileMenuOpen = ref(false)

// Dropdown states
const isDocsOpen = ref(false)
const isRustOpen = ref(false)
const isRubyOpen = ref(false)
const docsDropdownRef = ref<HTMLElement | null>(null)
const rustDropdownRef = ref<HTMLElement | null>(null)
const rubyDropdownRef = ref<HTMLElement | null>(null)

// Navigation structure
const docsLinks = [
  { to: '/parsers', label: 'Parsers' },
  { to: '/transforms', label: 'Transforms' },
  { to: '/errors', label: 'Error Handling' },
  { to: '/examples', label: 'Examples' },
  { to: '/api', label: 'API Reference' },
  { to: '/architecture', label: 'Architecture' },
  { to: '/backends', label: 'Parsing Backends' },
]

const rustLinks = [
  { to: '/rust', label: 'Rust Guide' },
  { to: '/rust-comparison', label: 'Parser Comparison' },
  { to: '/rust-migration', label: 'Migration' },
]

const rubyLinks = [
  { to: '/ruby', label: 'Ruby Guide' },
  { to: '/ruby-comparison', label: 'Ruby Comparison' },
  { to: '/migration', label: 'Migration Guide' },
]

const simpleLinks = [
  { to: '/about', label: 'About' },
]

// Active state for dropdowns
const docsPaths = computed(() => docsLinks.map(l => l.to))
const rustPaths = computed(() => rustLinks.map(l => l.to))
const rubyPaths = computed(() => rubyLinks.map(l => l.to))

const isDocsActive = computed(() => docsPaths.value.includes(route.path))
const isRustActive = computed(() => rustPaths.value.includes(route.path))
const isRubyActive = computed(() => rubyPaths.value.includes(route.path))

// Dropdown handlers
function toggleDocsDropdown() {
  isDocsOpen.value = !isDocsOpen.value
  if (isDocsOpen.value) {
    isRustOpen.value = false
    isRubyOpen.value = false
  }
}

function toggleRustDropdown() {
  isRustOpen.value = !isRustOpen.value
  if (isRustOpen.value) {
    isDocsOpen.value = false
    isRubyOpen.value = false
  }
}

function toggleRubyDropdown() {
  isRubyOpen.value = !isRubyOpen.value
  if (isRubyOpen.value) {
    isDocsOpen.value = false
    isRustOpen.value = false
  }
}

function openDocsDropdown() {
  isDocsOpen.value = true
  isRustOpen.value = false
  isRubyOpen.value = false
}

function closeDocsDropdown() {
  isDocsOpen.value = false
}

function openRustDropdown() {
  isRustOpen.value = true
  isDocsOpen.value = false
  isRubyOpen.value = false
}

function closeRustDropdown() {
  isRustOpen.value = false
}

function openRubyDropdown() {
  isRubyOpen.value = true
  isDocsOpen.value = false
  isRustOpen.value = false
}

function closeRubyDropdown() {
  isRubyOpen.value = false
}

// Close dropdowns on outside click
function handleClickOutside(event: MouseEvent) {
  if (docsDropdownRef.value && !docsDropdownRef.value.contains(event.target as Node)) {
    isDocsOpen.value = false
  }
  if (rustDropdownRef.value && !rustDropdownRef.value.contains(event.target as Node)) {
    isRustOpen.value = false
  }
  if (rubyDropdownRef.value && !rubyDropdownRef.value.contains(event.target as Node)) {
    isRubyOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.header-logo {
  height: 2.5rem;
  width: auto;
}
</style>
