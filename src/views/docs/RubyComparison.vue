<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="flex gap-12">
      <div class="w-64 flex-shrink-0 hidden lg:block">
        <div class="sticky top-20 h-[calc(100vh-6rem)] overflow-y-auto">
          <DocsNav :show-sections="['ruby-comparison']" />
        </div>
      </div>

      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-3 mb-6">
          <span class="px-3 py-1 text-sm font-medium rounded-full bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300">Ruby</span>
        </div>

        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">Ruby Parser Comparison</h1>
        <p class="text-lg text-gray-600 dark:text-gray-400 mb-12">
          Compare Parsanol-Ruby with other Ruby parsing libraries to choose the right tool for your project.
        </p>

        <!-- Quick Summary -->
        <section id="summary" class="mb-12">
          <div class="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg p-6 mb-6">
            <h3 class="font-semibold text-primary-900 dark:text-primary-100 mb-2">Why Choose Parsanol-Ruby?</h3>
            <ul class="text-primary-700 dark:text-primary-300 space-y-1">
              <li>• <strong>Drop-in Parslet replacement</strong> - Same API, 20-30x faster</li>
              <li>• <strong>Multiple integration modes</strong> - Choose your performance level</li>
              <li>• <strong>Rust-powered</strong> - Native performance with Ruby convenience</li>
              <li>• <strong>Zero-copy available</strong> - Minimal allocations for maximum speed</li>
            </ul>
          </div>
        </section>

        <!-- Feature Comparison -->
        <section id="features" class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Feature Comparison</h2>

          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead class="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Feature</th>
                  <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Parsanol</th>
                  <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Parslet</th>
                  <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Racc</th>
                  <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">RLTK</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td class="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">Approach</td>
                  <td class="px-4 py-3 text-sm text-center text-primary-600 dark:text-primary-400">PEG Combinator</td>
                  <td class="px-4 py-3 text-sm text-center text-gray-600 dark:text-gray-400">PEG Combinator</td>
                  <td class="px-4 py-3 text-sm text-center text-gray-600 dark:text-gray-400">LALR Generator</td>
                  <td class="px-4 py-3 text-sm text-center text-gray-600 dark:text-gray-400">Parser Generator</td>
                </tr>
                <tr class="bg-gray-50 dark:bg-gray-800/50">
                  <td class="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">Syntax</td>
                  <td class="px-4 py-3 text-sm text-center text-primary-600 dark:text-primary-400">Ruby DSL</td>
                  <td class="px-4 py-3 text-sm text-center text-gray-600 dark:text-gray-400">Ruby DSL</td>
                  <td class="px-4 py-3 text-sm text-center text-gray-600 dark:text-gray-400">.yacc file</td>
                  <td class="px-4 py-3 text-sm text-center text-gray-600 dark:text-gray-400">Ruby DSL</td>
                </tr>
                <tr>
                  <td class="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">Relative Speed</td>
                  <td class="px-4 py-3 text-sm text-center"><span class="text-green-600 dark:text-green-400 font-semibold">20-30x</span></td>
                  <td class="px-4 py-3 text-sm text-center text-gray-600 dark:text-gray-400">1x (baseline)</td>
                  <td class="px-4 py-3 text-sm text-center text-gray-600 dark:text-gray-400">~5-10x</td>
                  <td class="px-4 py-3 text-sm text-center text-gray-600 dark:text-gray-400">~3-5x</td>
                </tr>
                <tr class="bg-gray-50 dark:bg-gray-800/50">
                  <td class="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">Error Messages</td>
                  <td class="px-4 py-3 text-sm text-center"><span class="text-green-600 dark:text-green-400">Excellent</span></td>
                  <td class="px-4 py-3 text-sm text-center text-gray-600 dark:text-gray-400">Good</td>
                  <td class="px-4 py-3 text-sm text-center text-gray-600 dark:text-gray-400">Basic</td>
                  <td class="px-4 py-3 text-sm text-center text-gray-600 dark:text-gray-400">Good</td>
                </tr>
                <tr>
                  <td class="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">Parslet Compatible</td>
                  <td class="px-4 py-3 text-sm text-center"><span class="text-green-600 dark:text-green-400">Yes</span></td>
                  <td class="px-4 py-3 text-sm text-center"><span class="text-green-600 dark:text-green-400">N/A</span></td>
                  <td class="px-4 py-3 text-sm text-center text-gray-600 dark:text-gray-400">No</td>
                  <td class="px-4 py-3 text-sm text-center text-gray-600 dark:text-gray-400">No</td>
                </tr>
                <tr class="bg-gray-50 dark:bg-gray-800/50">
                  <td class="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">Native Extension</td>
                  <td class="px-4 py-3 text-sm text-center"><span class="text-green-600 dark:text-green-400">Yes (Rust)</span></td>
                  <td class="px-4 py-3 text-sm text-center text-gray-600 dark:text-gray-400">Pure Ruby</td>
                  <td class="px-4 py-3 text-sm text-center text-gray-600 dark:text-gray-400">C extension</td>
                  <td class="px-4 py-3 text-sm text-center text-gray-600 dark:text-gray-400">Pure Ruby</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- Parslet Comparison -->
        <section id="parslet" class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Parsanol vs Parslet</h2>

          <p class="text-gray-600 dark:text-gray-400 mb-6">
            Parsanol-Ruby is designed as a drop-in replacement for Parslet with significant performance improvements.
            Most Parslet grammars work with minimal changes.
          </p>

          <div class="grid gap-6 md:grid-cols-2 mb-6">
            <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Same Code</h4>
              <div class="bg-gray-900 dark:bg-gray-950 rounded p-3">
                <pre class="text-sm text-gray-100"><code>class MyParser &lt; Parslet::Parser
  rule(:number) { digit.repeat(1) }
  rule(:expr) { number &gt;&gt; str('+') &gt;&gt; number }
end</code></pre>
              </div>
            </div>
            <div class="border border-green-200 dark:border-green-800 rounded-lg p-4 bg-green-50 dark:bg-green-900/20">
              <h4 class="font-semibold text-green-800 dark:text-green-200 mb-2">20-30x Faster</h4>
              <p class="text-sm text-green-700 dark:text-green-300 mb-2">
                The same parser runs 20-30x faster with Parsanol's Rust backend while maintaining full compatibility.
              </p>
              <div class="text-xs text-green-600 dark:text-green-400">
                Benchmark: JSON parsing, 1000 iterations
              </div>
            </div>
          </div>

          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Key Differences</h3>
          <div class="space-y-3">
            <div class="flex items-start gap-3">
              <span class="text-green-600 dark:text-green-400 mt-1">✓</span>
              <div>
                <span class="font-medium text-gray-900 dark:text-white">Mostly compatible</span>
                <p class="text-sm text-gray-600 dark:text-gray-400">98% of Parslet features supported. See migration guide for edge cases.</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <span class="text-green-600 dark:text-green-400 mt-1">✓</span>
              <div>
                <span class="font-medium text-gray-900 dark:text-white">Better errors</span>
                <p class="text-sm text-gray-600 dark:text-gray-400">Tree-structured errors with precise source locations.</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <span class="text-yellow-600 dark:text-yellow-400 mt-1">△</span>
              <div>
                <span class="font-medium text-gray-900 dark:text-white">Some features differ</span>
                <p class="text-sm text-gray-600 dark:text-gray-400">Capture/scope DSL has slight differences. Check the migration guide.</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Performance Modes -->
        <section id="modes" class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Performance Modes</h2>

          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Parsanol-Ruby offers multiple integration modes to balance compatibility vs performance:
          </p>

          <div class="space-y-4">
            <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex items-center justify-between">
              <div>
                <h4 class="font-medium text-gray-900 dark:text-white">parslet-ruby</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">Pure Ruby, full compatibility</p>
              </div>
              <span class="text-gray-500 dark:text-gray-400 text-sm">1x</span>
            </div>
            <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex items-center justify-between">
              <div>
                <h4 class="font-medium text-gray-900 dark:text-white">parsanol-ruby</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">Rust parsing, Ruby AST construction</p>
              </div>
              <span class="text-gray-500 dark:text-gray-400 text-sm">~20x</span>
            </div>
            <div class="border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-center justify-between bg-green-50 dark:bg-green-900/20">
              <div>
                <h4 class="font-medium text-green-800 dark:text-green-200">ZeroCopy + Slice</h4>
                <p class="text-sm text-green-700 dark:text-green-300">Direct FFI, with source positions</p>
              </div>
              <span class="text-green-600 dark:text-green-400 font-semibold">~29x</span>
            </div>
          </div>
        </section>

        <!-- Next Steps -->
        <section class="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-6">
          <h2 class="text-lg font-semibold text-primary-900 dark:text-primary-100 mb-2">Next Steps</h2>
          <ul class="text-primary-700 dark:text-primary-300 space-y-1">
            <li>→ <router-link to="/ruby" class="underline hover:no-underline">Learn about Ruby bindings</router-link></li>
            <li>→ <router-link to="/migration" class="underline hover:no-underline">Migrate from Parslet</router-link></li>
            <li>→ <router-link to="/examples" class="underline hover:no-underline">See Ruby examples</router-link></li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DocsNav from '../../components/organisms/DocsNav.vue'
</script>
