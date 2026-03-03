<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="flex gap-12">
      <div class="w-64 flex-shrink-0 hidden lg:block">
        <div class="sticky top-20 h-[calc(100vh-6rem)] overflow-y-auto">
          <DocsNav :show-sections="['docs']" />
        </div>
      </div>

      <div class="flex-1 min-w-0">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">Parser Comparison</h1>

        <p class="text-gray-600 dark:text-gray-400 mb-8">
          Compare Parsanol with other popular parser libraries across different languages.
        </p>

        <!-- Feature Comparison Table -->
        <section class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Feature Comparison</h2>

          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead class="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Feature</th>
                  <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Parsanol</th>
                  <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Parslet</th>
                  <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Pest</th>
                  <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Nom</th>
                  <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ANTLR</th>
                </tr>
              </thead>
              <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td class="px-4 py-3 text-sm text-gray-900 dark:text-white font-medium">Parsing Algorithm</td>
                  <td class="px-4 py-3 text-sm text-center text-primary-600 dark:text-primary-400">PEG</td>
                  <td class="px-4 py-3 text-sm text-center text-gray-600 dark:text-gray-400">PEG</td>
                  <td class="px-4 py-3 text-sm text-center text-gray-600 dark:text-gray-400">PEG</td>
                  <td class="px-4 py-3 text-sm text-center text-gray-600 dark:text-gray-400">Parser Combinator</td>
                  <td class="px-4 py-3 text-sm text-center text-gray-600 dark:text-gray-400">LL(*)</td>
                </tr>
                <tr class="bg-gray-50 dark:bg-gray-800">
                  <td class="px-4 py-3 text-sm text-gray-900 dark:text-white font-medium">Language</td>
                  <td class="px-4 py-3 text-sm text-center text-primary-600 dark:text-primary-400">Rust + Ruby</td>
                  <td class="px-4 py-3 text-sm text-center text-gray-600 dark:text-gray-400">Ruby only</td>
                  <td class="px-4 py-3 text-sm text-center text-gray-600 dark:text-gray-400">Rust only</td>
                  <td class="px-4 py-3 text-sm text-center text-gray-600 dark:text-gray-400">Rust only</td>
                  <td class="px-4 py-3 text-sm text-center text-gray-600 dark:text-gray-400">Multi-target</td>
                </tr>
                <tr>
                  <td class="px-4 py-3 text-sm text-gray-900 dark:text-white font-medium">Native Performance</td>
                  <td class="px-4 py-3 text-sm text-center text-green-600 dark:text-green-400">✓ Rust</td>
                  <td class="px-4 py-3 text-sm text-center text-red-600 dark:text-red-400">Pure Ruby</td>
                  <td class="px-4 py-3 text-sm text-center text-green-600 dark:text-green-400">✓ Rust</td>
                  <td class="px-4 py-3 text-sm text-center text-green-600 dark:text-green-400">✓ Rust</td>
                  <td class="px-4 py-3 text-sm text-center text-green-600 dark:text-green-400">✓ Generated</td>
                </tr>
                <tr class="bg-gray-50 dark:bg-gray-800">
                  <td class="px-4 py-3 text-sm text-gray-900 dark:text-white font-medium">WASM Support</td>
                  <td class="px-4 py-3 text-sm text-center text-green-600 dark:text-green-400">✓</td>
                  <td class="px-4 py-3 text-sm text-center text-red-600 dark:text-red-400">✗</td>
                  <td class="px-4 py-3 text-sm text-center text-yellow-600 dark:text-yellow-400">Experimental</td>
                  <td class="px-4 py-3 text-sm text-center text-green-600 dark:text-green-400">✓</td>
                  <td class="px-4 py-3 text-sm text-center text-green-600 dark:text-green-400">✓</td>
                </tr>
                <tr>
                  <td class="px-4 py-3 text-sm text-gray-900 dark:text-white font-medium">Cut Operator</td>
                  <td class="px-4 py-3 text-sm text-center text-green-600 dark:text-green-400">✓ O(1) space</td>
                  <td class="px-4 py-3 text-sm text-center text-red-600 dark:text-red-400">✗</td>
                  <td class="px-4 py-3 text-sm text-center text-green-600 dark:text-green-400">✓</td>
                  <td class="px-4 py-3 text-sm text-center text-yellow-600 dark:text-yellow-400">Partial</td>
                  <td class="px-4 py-3 text-sm text-center text-green-600 dark:text-green-400">✓</td>
                </tr>
                <tr class="bg-gray-50 dark:bg-gray-800">
                  <td class="px-4 py-3 text-sm text-gray-900 dark:text-white font-medium">Streaming Parser</td>
                  <td class="px-4 py-3 text-sm text-center text-green-600 dark:text-green-400">✓</td>
                  <td class="px-4 py-3 text-sm text-center text-red-600 dark:text-red-400">✗</td>
                  <td class="px-4 py-3 text-sm text-center text-red-600 dark:text-red-400">✗</td>
                  <td class="px-4 py-3 text-sm text-center text-green-600 dark:text-green-400">✓</td>
                  <td class="px-4 py-3 text-sm text-center text-red-600 dark:text-red-400">✗</td>
                </tr>
                <tr>
                  <td class="px-4 py-3 text-sm text-gray-900 dark:text-white font-medium">Incremental Parsing</td>
                  <td class="px-4 py-3 text-sm text-center text-green-600 dark:text-green-400">✓</td>
                  <td class="px-4 py-3 text-sm text-center text-red-600 dark:text-red-400">✗</td>
                  <td class="px-4 py-3 text-sm text-center text-red-600 dark:text-red-400">✗</td>
                  <td class="px-4 py-3 text-sm text-center text-red-600 dark:text-red-400">✗</td>
                  <td class="px-4 py-3 text-sm text-center text-red-600 dark:text-red-400">✗</td>
                </tr>
                <tr class="bg-gray-50 dark:bg-gray-800">
                  <td class="px-4 py-3 text-sm text-gray-900 dark:text-white font-medium">Rich Error Reporting</td>
                  <td class="px-4 py-3 text-sm text-center text-green-600 dark:text-green-400">✓</td>
                  <td class="px-4 py-3 text-sm text-center text-green-600 dark:text-green-400">✓</td>
                  <td class="px-4 py-3 text-sm text-center text-green-600 dark:text-green-400">✓</td>
                  <td class="px-4 py-3 text-sm text-center text-yellow-600 dark:text-yellow-400">Basic</td>
                  <td class="px-4 py-3 text-sm text-center text-green-600 dark:text-green-400">✓</td>
                </tr>
                <tr>
                  <td class="px-4 py-3 text-sm text-gray-900 dark:text-white font-medium">Transform DSL</td>
                  <td class="px-4 py-3 text-sm text-center text-green-600 dark:text-green-400">✓ Ruby</td>
                  <td class="px-4 py-3 text-sm text-center text-green-600 dark:text-green-400">✓</td>
                  <td class="px-4 py-3 text-sm text-center text-red-600 dark:text-red-400">✗</td>
                  <td class="px-4 py-3 text-sm text-center text-red-600 dark:text-red-400">✗</td>
                  <td class="px-4 py-3 text-sm text-center text-red-600 dark:text-red-400">✗</td>
                </tr>
                <tr class="bg-gray-50 dark:bg-gray-800">
                  <td class="px-4 py-3 text-sm text-gray-900 dark:text-white font-medium">Learning Curve</td>
                  <td class="px-4 py-3 text-sm text-center text-yellow-600 dark:text-yellow-400">Medium</td>
                  <td class="px-4 py-3 text-sm text-center text-green-600 dark:text-green-400">Easy</td>
                  <td class="px-4 py-3 text-sm text-center text-yellow-600 dark:text-yellow-400">Medium</td>
                  <td class="px-4 py-3 text-sm text-center text-red-600 dark:text-red-400">Hard</td>
                  <td class="px-4 py-3 text-sm text-center text-yellow-600 dark:text-yellow-400">Medium</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- Performance Benchmarks -->
        <section class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Performance Benchmarks</h2>

          <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">JSON Parsing (1MB file)</h3>

            <div class="space-y-4">
              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span class="text-gray-600 dark:text-gray-400">Parsanol (Rust)</span>
                  <span class="font-medium text-green-600 dark:text-green-400">12ms</span>
                </div>
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div class="bg-green-500 h-2 rounded-full" style="width: 10%"></div>
                </div>
              </div>

              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span class="text-gray-600 dark:text-gray-400">Parslet (Ruby)</span>
                  <span class="font-medium text-red-600 dark:text-red-400">420ms</span>
                </div>
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div class="bg-red-500 h-2 rounded-full" style="width: 100%"></div>
                </div>
              </div>

              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span class="text-gray-600 dark:text-gray-400">Speedup</span>
                  <span class="font-medium text-primary-600 dark:text-primary-400">35x faster</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- When to Use -->
        <section class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">When to Use Parsanol</h2>

          <div class="grid md:grid-cols-2 gap-6">
            <div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <h3 class="text-lg font-semibold text-green-700 dark:text-green-300 mb-2">Choose Parsanol when:</h3>
              <ul class="text-sm text-green-600 dark:text-green-400 space-y-1">
                <li>• You need native performance</li>
                <li>• Parsing large files (streaming)</li>
                <li>• Building editor integrations (incremental)</li>
                <li>• Cross-platform (Rust, Ruby, WASM)</li>
                <li>• Migrating from Parslet for speed</li>
              </ul>
            </div>

            <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h3 class="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-2">Consider alternatives when:</h3>
              <ul class="text-sm text-blue-600 dark:text-blue-400 space-y-1">
                <li>• Pure Ruby project (use Parslet)</li>
                <li>• Complex grammar with external tools (use ANTLR)</li>
                <li>• Need other target languages (use ANTLR)</li>
                <li>• Parser combinator preference (use Nom)</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DocsNav from '../../components/organisms/DocsNav.vue'
</script>
