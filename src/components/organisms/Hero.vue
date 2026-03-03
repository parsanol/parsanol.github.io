<template>
  <section class="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-30 dark:opacity-10">
      <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" stroke-width="0.5" class="text-gray-300 dark:text-gray-700"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
      <div class="text-center">
        <!-- Badge -->
        <div class="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-8">
          <Icon name="lightning" class="w-4 h-4 mr-2" />
          Parser Combinators for Rust & Ruby
          <span class="mx-2 text-primary-300 dark:text-primary-700">|</span>
          <span class="text-primary-600 dark:text-primary-400 font-semibold">18-44x Faster</span>
        </div>

        <!-- Headline -->
        <h1 class="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
          Build Parsers with
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-blue-600 to-primary-600">
            Confidence
          </span>
        </h1>

        <!-- Subheadline -->
        <p class="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
          Parsanol is a powerful, composable parser combinator library that makes it easy to build complex parsers from simple, reusable components.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <router-link to="/introduction">
            <Button variant="primary" size="lg">
              Get Started
              <Icon name="chevron-right" class="ml-2" />
            </Button>
          </router-link>
          <a href="https://github.com/parsanol/parsanol-rs" target="_blank" rel="noopener noreferrer">
            <Button variant="secondary" size="lg">
              <Icon name="github" class="mr-2" />
              View on GitHub
            </Button>
          </a>
        </div>

        <!-- Quick Code Example -->
        <div class="max-w-2xl mx-auto">
          <CodeTabs
            :rust="quickStartRust"
            :ruby="quickStartRuby"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Button from '../atoms/Button.vue'
import Icon from '../atoms/Icon.vue'
import CodeTabs from '../molecules/CodeTabs.vue'

const quickStartRust = `use parsanol::prelude::*;

let parser = str("hello")
    .then(str(" "))
    .then(re(r"[A-Za-z]+"))
    .then(str("!"));

let result = parser.parse("hello World!");
assert!(result.is_ok());`

const quickStartRuby = `require 'parsanol'

parser = str("hello")
  .then(str(" "))
  .then(re("[A-Za-z]+"))
  .then(str("!"))

result = parser.parse("hello World!")
puts result.value # => "hello World!"`
</script>
