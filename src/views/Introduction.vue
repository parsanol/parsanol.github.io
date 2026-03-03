<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="flex gap-12">
      <div class="w-64 flex-shrink-0 hidden lg:block">
        <div class="sticky top-20 h-[calc(100vh-6rem)] overflow-y-auto">
          <DocsNav :show-sections="['introduction', 'installation', 'first-parser']" />
        </div>
      </div>

      <div class="flex-1 min-w-0">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          What is Parsanol?
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400 mb-8">
          A high-performance PEG parser library for Rust with Ruby bindings, inspired by Parslet.
        </p>

        <!-- Quick Overview -->
        <section class="mb-16">
          <div class="bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 rounded-xl p-6 mb-8">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              In a Nutshell
            </h2>
            <p class="text-gray-700 dark:text-gray-300">
              Parsanol is a <strong>parser combinator library</strong> that lets you build complex parsers
              by combining small, simple parsing functions. It separates parsing into two stages:
              <strong>parsing</strong> (syntax recognition) and <strong>transformation</strong> (semantic interpretation).
            </p>
          </div>

          <!-- Key Features Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="card bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <h3 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">PEG Parsing</h3>
              <p class="text-sm text-blue-700 dark:text-blue-300">
                Parsing Expression Grammar with packrat memoization for deterministic, efficient parsing.
              </p>
            </div>
            <div class="card bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
              <h3 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">Two-Stage Model</h3>
              <p class="text-sm text-purple-700 dark:text-purple-300">
                Separate parsing from transformation for debuggability and flexibility.
              </p>
            </div>
            <div class="card bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <h3 class="font-semibold text-green-900 dark:text-green-100 mb-2">Cross-Language</h3>
              <p class="text-sm text-green-700 dark:text-green-300">
                Rust core with Ruby bindings. Parse once, use from any language via FFI.
              </p>
            </div>
            <div class="card bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
              <h3 class="font-semibold text-amber-900 dark:text-amber-100 mb-2">Arena Allocation</h3>
              <p class="text-sm text-amber-700 dark:text-amber-300">
                Zero-copy AST with arena allocation for minimal memory overhead.
              </p>
            </div>
          </div>
        </section>

        <!-- Why Use Parsanol -->
        <section class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Why Use Parsanol?</h2>

          <div class="prose dark:prose-invert max-w-none">
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Traditional parser generators like Yacc/Bison require learning a separate DSL and generate
              code that's hard to debug. Parser combinators like Parsanol let you write parsers
              <strong>in your host language</strong> with full IDE support, type checking, and debugging tools.
            </p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <div class="card">
              <h3 class="font-semibold text-green-700 dark:text-green-300 mb-3">
                ✓ Choose Parsanol When:
              </h3>
              <ul class="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                <li class="flex items-start">
                  <span class="text-green-500 mr-2">•</span>
                  <span>You need <strong>modular, composable</strong> parsers</span>
                </li>
                <li class="flex items-start">
                  <span class="text-green-500 mr-2">•</span>
                  <span>You want to <strong>debug</strong> parse trees easily</span>
                </li>
                <li class="flex items-start">
                  <span class="text-green-500 mr-2">•</span>
                  <span>You're building <strong>domain-specific languages</strong></span>
                </li>
                <li class="flex items-start">
                  <span class="text-green-500 mr-2">•</span>
                  <span>You need <strong>cross-language</strong> parsing (Rust + Ruby)</span>
                </li>
                <li class="flex items-start">
                  <span class="text-green-500 mr-2">•</span>
                  <span>You value <strong>readable, maintainable</strong> code</span>
                </li>
              </ul>
            </div>

            <div class="card">
              <h3 class="font-semibold text-amber-700 dark:text-amber-300 mb-3">
                ✗ Consider Alternatives When:
              </h3>
              <ul class="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                <li class="flex items-start">
                  <span class="text-amber-500 mr-2">•</span>
                  <span>You need <strong>left-recursive</strong> grammars (PEG limitation)</span>
                </li>
                <li class="flex items-start">
                  <span class="text-amber-500 mr-2">•</span>
                  <span>Parsing <strong>binary formats</strong> (use nom instead)</span>
                </li>
                <li class="flex items-start">
                  <span class="text-amber-500 mr-2">•</span>
                  <span>You require <strong>streaming</strong> for huge files</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <!-- Comparison with Other Parsers -->
        <section class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Comparison with Other Rust Parsers
          </h2>

          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b-2 border-gray-200 dark:border-gray-700">
                  <th class="text-left py-3 px-4">Feature</th>
                  <th class="text-left py-3 px-4 bg-primary-50 dark:bg-primary-900/20">Parsanol</th>
                  <th class="text-left py-3 px-4">nom</th>
                  <th class="text-left py-3 px-4">lalrpop</th>
                  <th class="text-left py-3 px-4">pest</th>
                </tr>
              </thead>
              <tbody class="text-gray-600 dark:text-gray-400">
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <td class="py-3 px-4 font-medium">Approach</td>
                  <td class="py-3 px-4 bg-primary-50 dark:bg-primary-900/20">PEG Combinator</td>
                  <td class="py-3 px-4">Combinator</td>
                  <td class="py-3 px-4">LR Parser Gen</td>
                  <td class="py-3 px-4">PEG Parser Gen</td>
                </tr>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <td class="py-3 px-4 font-medium">Grammar in Code</td>
                  <td class="py-3 px-4 bg-primary-50 dark:bg-primary-900/20 text-green-600">Yes</td>
                  <td class="py-3 px-4 text-green-600">Yes</td>
                  <td class="py-3 px-4 text-red-600">No (DSL)</td>
                  <td class="py-3 px-4 text-red-600">No (DSL)</td>
                </tr>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <td class="py-3 px-4 font-medium">Two-Stage Model</td>
                  <td class="py-3 px-4 bg-primary-50 dark:bg-primary-900/20 text-green-600">Yes</td>
                  <td class="py-3 px-4 text-red-600">No</td>
                  <td class="py-3 px-4 text-red-600">No</td>
                  <td class="py-3 px-4 text-amber-600">Partial</td>
                </tr>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <td class="py-3 px-4 font-medium">Ruby Bindings</td>
                  <td class="py-3 px-4 bg-primary-50 dark:bg-primary-900/20 text-green-600">Yes</td>
                  <td class="py-3 px-4 text-red-600">No</td>
                  <td class="py-3 px-4 text-red-600">No</td>
                  <td class="py-3 px-4 text-red-600">No</td>
                </tr>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <td class="py-3 px-4 font-medium">Debug Trees</td>
                  <td class="py-3 px-4 bg-primary-50 dark:bg-primary-900/20 text-green-600">Excellent</td>
                  <td class="py-3 px-4 text-amber-600">Good</td>
                  <td class="py-3 px-4 text-amber-600">Good</td>
                  <td class="py-3 px-4 text-amber-600">Good</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 font-medium">Binary Data</td>
                  <td class="py-3 px-4 bg-primary-50 dark:bg-primary-900/20 text-amber-600">Limited</td>
                  <td class="py-3 px-4 text-green-600">Excellent</td>
                  <td class="py-3 px-4 text-amber-600">Good</td>
                  <td class="py-3 px-4 text-amber-600">Good</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- Performance -->
        <section class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Performance</h2>

          <div class="prose dark:prose-invert max-w-none mb-6">
            <p class="text-gray-600 dark:text-gray-400">
              Parsanol achieves high performance through several key optimizations:
            </p>
          </div>

          <!-- Performance Diagram -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 mb-8">
            <img
              src="/diagrams/performance-architecture.svg"
              alt="Performance Architecture Diagram"
              class="w-full h-auto"
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="card">
              <h3 class="font-semibold text-gray-900 dark:text-white mb-3">Packrat Memoization</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Caches parse results to avoid re-parsing the same input. Transforms O(n³) worst-case
                into O(n) for most grammars. Uses dense bit-packed cache for memory efficiency.
              </p>
            </div>

            <div class="card">
              <h3 class="font-semibold text-gray-900 dark:text-white mb-3">Arena Allocation</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                All AST nodes allocated in a single arena. Zero individual allocations means
                no memory fragmentation. Entire AST freed in one operation.
              </p>
            </div>

            <div class="card">
              <h3 class="font-semibold text-gray-900 dark:text-white mb-3">SIMD Optimization</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Uses memchr crate for SIMD-accelerated substring search. Scanning for
                delimiters is 10-50x faster than naive byte-by-byte comparison.
              </p>
            </div>

            <div class="card">
              <h3 class="font-semibold text-gray-900 dark:text-white mb-3">SmallVec Optimization</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Small collections stored on stack, only heap-allocated when they grow.
                Eliminates allocation overhead for typical parse trees.
              </p>
            </div>
          </div>

          <!-- Benchmark Results -->
          <div class="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <h3 class="font-semibold text-gray-900 dark:text-white mb-4">Benchmark Results</h3>
            <div class="grid grid-cols-3 gap-4 text-center">
              <div>
                <div class="text-3xl font-bold text-green-600">18-44x</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">Faster than Ruby</div>
              </div>
              <div>
                <div class="text-3xl font-bold text-blue-600">99.5%</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">Fewer Allocations</div>
              </div>
              <div>
                <div class="text-3xl font-bold text-purple-600">Zero</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">Copy Overhead</div>
              </div>
            </div>
          </div>
        </section>

        <!-- What is a Parser Combinator -->
        <section class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            What is a Parser Combinator?
          </h2>

          <div class="prose dark:prose-invert max-w-none">
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              A <strong>parser combinator</strong> is a design pattern where small, simple parsing functions
              (called <em>atoms</em>) are combined using higher-order functions (called <em>combinators</em>)
              to build complex parsers.
            </p>

            <div class="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 mb-6">
              <h4 class="font-semibold text-gray-900 dark:text-white mb-3">The Key Insight</h4>
              <p class="text-gray-700 dark:text-gray-300 mb-0">
                Instead of writing one massive parser, you build small, reusable pieces and compose them.
                This makes parsers <strong>modular</strong>, <strong>testable</strong>, and <strong>easy to reason about</strong>.
              </p>
            </div>

            <h3 class="text-lg font-medium text-gray-900 dark:text-white mt-8 mb-4">Atoms: The Building Blocks</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Atoms match the smallest units of input:
            </p>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2 mb-6">
              <li><code class="text-primary-600 dark:text-primary-400">str("hello")</code> - Match a literal string</li>
              <li><code class="text-primary-600 dark:text-primary-400">re("[0-9]+")</code> - Match a regex pattern</li>
              <li><code class="text-primary-600 dark:text-primary-400">any()</code> - Match any single character</li>
            </ul>

            <h3 class="text-lg font-medium text-gray-900 dark:text-white mt-8 mb-4">Combinators: The Glue</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Combinators join atoms together:
            </p>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
              <li><code class="text-primary-600 dark:text-primary-400">.then()</code> - Sequence: match A followed by B</li>
              <li><code class="text-primary-600 dark:text-primary-400">.or()</code> - Alternative: match A or B</li>
              <li><code class="text-primary-600 dark:text-primary-400">.repeat()</code> - Repetition: match multiple times</li>
              <li><code class="text-primary-600 dark:text-primary-400">.maybe()</code> - Optional: match zero or one time</li>
            </ul>
          </div>
        </section>

        <!-- Next Steps -->
        <section>
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Next Steps</h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <router-link to="/installation" class="card card-hover">
              <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Installation →</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm">Add Parsanol to your Rust or Ruby project.</p>
            </router-link>
            <router-link to="/first-parser" class="card card-hover">
              <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Your First Parser →</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm">Build a complete parser in minutes.</p>
            </router-link>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DocsNav from '../components/organisms/DocsNav.vue'
</script>
