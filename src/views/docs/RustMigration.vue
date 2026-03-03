<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="flex gap-12">
      <div class="w-64 flex-shrink-0 hidden lg:block">
        <div class="sticky top-20 h-[calc(100vh-6rem)] overflow-y-auto">
          <DocsNav :show-sections="['rust']" />
        </div>
      </div>

      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-3 mb-6">
          <span class="px-3 py-1 text-sm font-medium rounded-full bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300">Rust</span>
        </div>

        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">Migrating to Parsanol</h1>
        <p class="text-lg text-gray-600 dark:text-gray-400 mb-12">
          Guide for migrating your existing parsers from nom, combine, chumsky, or pest to Parsanol.
        </p>

        <!-- Coming Soon Notice -->
        <section class="mb-12">
          <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <h3 class="font-semibold text-blue-800 dark:text-blue-200 mb-2">Documentation In Progress</h3>
            <p class="text-blue-700 dark:text-blue-300 text-sm mb-4">
              We're actively working on comprehensive migration guides. In the meantime, here are some quick tips.
            </p>
          </div>
        </section>

        <!-- Quick Migration Tips -->
        <section class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Quick Migration Tips</h2>

          <!-- From nom -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">From nom</h3>
            <div class="bg-gray-900 dark:bg-gray-950 rounded-lg p-4">
              <p class="text-xs text-gray-400 mb-2">nom (macro-based)</p>
              <pre class="text-sm text-gray-100 mb-4"><code>fn parse_input(input: &str) -> IResult<&str, &str> {
    alt((tag("hello"), tag("world")))(input)
}</code></pre>
              <p class="text-xs text-gray-400 mb-2">Parsanol (function-based)</p>
              <pre class="text-sm text-green-400"><code>fn parse_input() -> impl Parser&lt;Output = &str&gt; {
    string("hello").or(string("world"))
}</code></pre>
            </div>
          </div>

          <!-- From combine -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">From combine</h3>
            <div class="bg-gray-900 dark:bg-gray-950 rounded-lg p-4">
              <p class="text-xs text-gray-400 mb-2">combine</p>
              <pre class="text-sm text-gray-100 mb-4"><code>let parser = choice((string("hello"), string("world")));</code></pre>
              <p class="text-xs text-gray-400 mb-2">Parsanol</p>
              <pre class="text-sm text-green-400"><code>let parser = string("hello").or(string("world"));</code></pre>
            </div>
          </div>

          <!-- From pest -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">From pest</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Pest uses a separate .pest grammar file. You'll need to convert the grammar to Rust code:
            </p>
            <div class="bg-gray-900 dark:bg-gray-950 rounded-lg p-4">
              <p class="text-xs text-gray-400 mb-2">pest (.pest file)</p>
              <pre class="text-sm text-gray-100 mb-4"><code>number = @{ ASCII_DIGIT+ }
expr = { number ~ "+" ~ number }</code></pre>
              <p class="text-xs text-gray-400 mb-2">Parsanol (Rust code)</p>
              <pre class="text-sm text-green-400"><code>let number = one_or_more(digit());
let expr = number.then(string("+")).then(number);</code></pre>
            </div>
          </div>
        </section>

        <!-- Key Differences -->
        <section class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Key Differences</h2>

          <div class="space-y-4">
            <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Parser Definition</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Parsanol parsers are values, not functions. You compose them using method chaining rather than function calls or macros.
              </p>
            </div>
            <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Error Handling</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Parsanol uses tree-structured errors with detailed context. You get better error messages without extra configuration.
              </p>
            </div>
            <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Output Types</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Use <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded">.map()</code> to transform parser output. Parsanol infers output types automatically.
              </p>
            </div>
          </div>
        </section>

        <!-- Getting Help -->
        <section class="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Need Help?</h2>
          <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">
            If you're migrating a complex parser and need assistance, reach out on GitHub.
          </p>
          <a
            href="https://github.com/parsanol/parsanol-rs/discussions"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center text-primary-600 dark:text-primary-400 hover:underline"
          >
            GitHub Discussions
            <svg class="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DocsNav from '../../components/organisms/DocsNav.vue'
</script>
