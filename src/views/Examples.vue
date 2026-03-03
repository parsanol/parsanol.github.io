<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">Examples</h1>
    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Explore {{ examplesCount }} complete parser examples to learn how to use Parsanol effectively.
      Each example includes architecture diagrams, code in both Rust and Ruby, and explanations.
    </p>

    <ExampleGrid />
  </div>
</template>

<script setup lang="ts">
import ExampleGrid from '../components/organisms/ExampleGrid.vue'
import examplesManifest from '../data/examples-manifest.json'

const examplesCount = examplesManifest.length
</script>
