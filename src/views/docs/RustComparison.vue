<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="flex gap-12">
      <div class="w-64 flex-shrink-0 hidden lg:block">
        <div class="sticky top-20 h-[calc(100vh-6rem)] overflow-y-auto">
          <DocsNav :show-sections="['rust-comparison']" />
        </div>
      </div>

      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-3 mb-6">
          <span class="px-3 py-1 text-sm font-medium rounded-full bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300">Rust</span>
        </div>

        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">Rust Parser Comparison</h1>
        <p class="text-lg text-gray-600 dark:text-gray-400 mb-12">
          Compare Parsanol with other popular Rust parser libraries to choose the right tool for your project.
        </p>

        <!-- Quick Summary -->
        <section id="summary" class="mb-12">
          <div class="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg p-6 mb-6">
            <h3 class="font-semibold text-primary-900 dark:text-primary-100 mb-2">Why Choose Parsanol?</h3>
            <ul class="text-primary-700 dark:text-primary-300 space-y-1">
              <li>• <strong>Readable syntax</strong> - Parser combinators that read like grammar definitions</li>
              <li>• <strong>Excellent error messages</strong> - Tree-structured errors with precise locations</li>
              <li>• <strong>Zero-copy by default</strong> - Minimal allocations for maximum performance</li>
              <li>• <strong>Ruby bindings</strong> - Share parsers across Rust and Ruby projects</li>
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
                  <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">nom</th>
                  <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">chumsky</th>
                  <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">pest</th>
                  <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">lalrpop</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td class="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">Approach</td>
                  <td class="px-4 py-3 text-sm text-center text-primary-600 dark:text-primary-400">Parser Combinator</td>
                  <td class="px-4 py-3 text-sm text-center text-gray-600 dark:text-gray-400">Parser Combinator</td>
                  <td class="px-4 py-3 text-sm text-center text-gray-600 dark:text-gray-400">Parser Combinator</td>
                  <td class="px-4 py-3 text-sm text-center text-gray-600 dark:text-gray-400">PEG DSL</td>
                  <td class="px-4 py-3 text-sm text-center text-gray-600 dark:text-gray-400">LALR DSL</td>
                </tr>
                <tr class="bg-gray-50 dark:bg-gray-800/50">
                  <td class="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">Syntax</td>
                  <td class="px-4 py-3 text-sm text-center text-primary-600 dark:text-primary-400">Rust code</td>
                  <td class="px-4 py-3 text-sm text-center text-gray-600 dark:text-gray-400">Rust macros</td>
                  <td class="px-4 py-3 text-sm text-center text-gray-600 dark:text-gray-400">Rust code</td>
                  <td class="px-4 py-3 text-sm text-center text-gray-600 dark:text-gray-400">External .pest file</td>
                  <td class="px-4 py-3 text-sm text-center text-gray-600 dark:text-gray-400">External .lalrpop file</td>
                </tr>
                <tr>
                  <td class="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">Error Messages</td>
                  <td class="px-4 py-3 text-sm text-center"><span class="text-green-600 dark:text-green-400">Excellent</span></td>
                  <td class="px-4 py-3 text-sm text-center text-gray-600 dark:text-gray-400">Basic</td>
                  <td class="px-4 py-3 text-sm text-center text-gray-600 dark:text-gray-400">Good</td>
                  <td class="px-4 py-3 text-sm text-center text-gray-600 dark:text-gray-400">Good</td>
                  <td class="px-4 py-3 text-sm text-center text-gray-600 dark:text-gray-400">Good</td>
                </tr>
                <tr class="bg-gray-50 dark:bg-gray-800/50">
                  <td class="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">Zero-Copy</td>
                  <td class="px-4 py-3 text-sm text-center"><span class="text-green-600 dark:text-green-400">Yes</span></td>
                  <td class="px-4 py-3 text-sm text-center"><span class="text-green-600 dark:text-green-400">Yes</span></td>
                  <td class="px-4 py-3 text-sm text-center text-gray-600 dark:text-gray-400">Partial</td>
                  <td class="px-4 py-3 text-sm text-center text-gray-600 dark:text-gray-400">No</td>
                  <td class="px-4 py-3 text-sm text-center text-gray-600 dark:text-gray-400">No</td>
                </tr>
                <tr>
                  <td class="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">Left Recursion</td>
                  <td class="px-4 py-3 text-sm text-center text-gray-600 dark:text-gray-400">Via wrapper</td>
                  <td class="px-4 py-3 text-sm text-center text-gray-600 dark:text-gray-400">Manual</td>
                  <td class="px-4 py-3 text-sm text-center"><span class="text-green-600 dark:text-green-400">Yes</span></td>
                  <td class="px-4 py-3 text-sm text-center text-gray-600 dark:text-gray-400">No</td>
                  <td class="px-4 py-3 text-sm text-center"><span class="text-green-600 dark:text-green-400">Yes</span></td>
                </tr>
                <tr class="bg-gray-50 dark:bg-gray-800/50">
                  <td class="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">Multi-language</td>
                  <td class="px-4 py-3 text-sm text-center"><span class="text-green-600 dark:text-green-400">Rust + Ruby</span></td>
                  <td class="px-4 py-3 text-sm text-center text-gray-600 dark:text-gray-400">Rust only</td>
                  <td class="px-4 py-3 text-sm text-center text-gray-600 dark:text-gray-400">Rust only</td>
                  <td class="px-4 py-3 text-sm text-center text-gray-600 dark:text-gray-400">Rust only</td>
                  <td class="px-4 py-3 text-sm text-center text-gray-600 dark:text-gray-400">Rust only</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- Detailed Comparisons -->
        <section id="details" class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Detailed Comparisons</h2>

          <div class="space-y-6">
            <!-- vs nom -->
            <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Parsanol vs nom</h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4">
                nom is the most popular parser combinator library in Rust. Both libraries share similar concepts but differ in approach:
              </p>
              <div class="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 class="font-medium text-gray-900 dark:text-white mb-2">Choose Parsanol if you:</h4>
                  <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Need better error messages out of the box</li>
                    <li>• Want Ruby bindings for the same parser</li>
                    <li>• Prefer functional-style combinators</li>
                  </ul>
                </div>
                <div>
                  <h4 class="font-medium text-gray-900 dark:text-white mb-2">Choose nom if you:</h4>
                  <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Need binary format parsing</li>
                    <li>• Want a larger ecosystem of pre-built parsers</li>
                    <li>• Are comfortable with macro-based syntax</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- vs chumsky -->
            <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Parsanol vs chumsky</h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4">
                chumsky is a modern parser combinator with advanced features like error recovery:
              </p>
              <div class="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 class="font-medium text-gray-900 dark:text-white mb-2">Choose Parsanol if you:</h4>
                  <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Want simpler, more predictable behavior</li>
                    <li>• Need Ruby interoperability</li>
                    <li>• Prefer zero-copy by default</li>
                  </ul>
                </div>
                <div>
                  <h4 class="font-medium text-gray-900 dark:text-white mb-2">Choose chumsky if you:</h4>
                  <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Need built-in error recovery</li>
                    <li>• Want left recursion support</li>
                    <li>• Are building a programming language</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- vs pest -->
            <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Parsanol vs pest</h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4">
                pest uses a separate PEG grammar file instead of Rust code:
              </p>
              <div class="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 class="font-medium text-gray-900 dark:text-white mb-2">Choose Parsanol if you:</h4>
                  <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Want to stay in Rust code</li>
                    <li>• Need dynamic parser construction</li>
                    <li>• Prefer composable functions</li>
                  </ul>
                </div>
                <div>
                  <h4 class="font-medium text-gray-900 dark:text-white mb-2">Choose pest if you:</h4>
                  <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Like separate grammar files</li>
                    <li>• Want PEG precedence rules</li>
                    <li>• Are porting from other PEG tools</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Benchmark Note -->
        <section class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
          <h3 class="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Performance Benchmarks</h3>
          <p class="text-yellow-700 dark:text-yellow-300 text-sm">
            Performance depends heavily on your specific use case. We recommend benchmarking with your actual data.
            See the <router-link to="/architecture#benchmarks" class="underline">Architecture page</router-link> for our benchmark methodology.
          </p>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DocsNav from '../../components/organisms/DocsNav.vue'
</script>
