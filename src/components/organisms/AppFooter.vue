<template>
  <footer class="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Brand -->
        <div class="col-span-1 md:col-span-2">
          <div class="flex items-center space-x-3 mb-4">
            <img
              src="/logo.svg"
              alt="Parsanol"
              class="footer-logo"
            />
          </div>
          <p class="text-gray-600 dark:text-gray-400 max-w-md">
            A powerful parser combinator library for Rust and Ruby. Build complex parsers from simple components.
          </p>
        </div>

        <!-- Links -->
        <div>
          <h4 class="font-semibold text-gray-900 dark:text-white mb-4">Documentation</h4>
          <ul class="space-y-2">
            <li>
              <router-link to="/getting-started" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                Getting Started
              </router-link>
            </li>
            <li>
              <router-link to="/parsers" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                Parsers
              </router-link>
            </li>
            <li>
              <router-link to="/transforms" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                Transforms
              </router-link>
            </li>
            <li>
              <router-link to="/errors" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                Error Handling
              </router-link>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="font-semibold text-gray-900 dark:text-white mb-4">Resources</h4>
          <ul class="space-y-2">
            <li>
              <router-link to="/examples" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                Examples
              </router-link>
            </li>
            <li>
              <router-link to="/api" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                API Reference
              </router-link>
            </li>
            <li>
              <router-link to="/comparison" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                Parslet Comparison
              </router-link>
            </li>
            <li>
              <router-link to="/migration" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                Migration Guide
              </router-link>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center">
        <div class="flex flex-col md:flex-row items-center gap-2 md:gap-4">
          <p class="text-sm text-gray-500 dark:text-gray-400">
            &copy; {{ new Date().getFullYear() }} Ribose. MIT License.
          </p>
          <a
            href="https://ribose.com"
            target="_blank"
            rel="noopener noreferrer"
            class="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 flex items-center gap-1"
          >
            A Ribose project
            <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
        <div class="flex space-x-4 mt-4 md:mt-0">
          <Badge variant="rust">Rust</Badge>
          <Badge variant="ruby">Ruby</Badge>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import Badge from '../atoms/Badge.vue'
</script>

<style scoped>
.footer-logo {
  height: 2rem;
  width: auto;
}
</style>
