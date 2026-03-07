<template>
  <div>
    <!-- Hero Section -->
    <Hero />

    <!-- Features Section -->
    <section class="py-24 bg-white dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Parsanol?
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A modern parser combinator library that combines power, flexibility, and ease of use.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            title="Blazing Fast"
            description="18-44x faster than pure Ruby parsers. Packrat memoization for O(n) parsing complexity."
            icon="lightning"
          />
          <FeatureCard
            title="Composable"
            description="Build complex parsers from simple, reusable components. Combine parsers using familiar operators."
            icon="puzzle"
          />
          <FeatureCard
            title="Type-Safe"
            description="Leverage Rust's type system for compile-time error detection. Derive macros for automatic AST conversion."
            icon="cube"
          />
          <FeatureCard
            title="Rich Errors"
            description="Detailed, tree-structured parse errors with source context. Help users understand what went wrong."
            icon="exclamation"
          />
        </div>
      </div>
    </section>

    <!-- More Features Section -->
    <section class="py-24 bg-gray-50 dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Production-Ready Features
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Built for real-world applications with streaming, incremental parsing, and multi-language support.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            title="Streaming Parsing"
            description="Parse large files without loading into memory. Configurable chunk sizes and sliding window backtracking."
            icon="stream"
          />
          <FeatureCard
            title="Incremental Parsing"
            description="Editor integration with cache invalidation. Only re-parse affected regions after edits."
            icon="sync"
          />
          <FeatureCard
            title="Parallel Processing"
            description="Multi-file parsing with rayon work-stealing. Linear speedup up to CPU core count."
            icon="layers"
          />
          <FeatureCard
            title="Ruby Bindings"
            description="5 integration approaches from pure Ruby to ZeroCopy+Slice. Parslet-compatible API for easy migration."
            icon="gem"
          />
          <FeatureCard
            title="WebAssembly"
            description="Parse in the browser with full feature parity. JSON, flat array, and JavaScript object outputs."
            icon="globe"
          />
          <FeatureCard
            title="Captures"
            description="Extract named values from your input. Zero-copy string access for immediate processing."
            icon="capture"
            badge="new"
          />
          <FeatureCard
            title="Scopes"
            description="Isolated capture contexts for nested parsing without capture pollution."
            icon="scope"
            badge="new"
          />
          <FeatureCard
            title="Dynamic Parsing"
            description="Context-sensitive parsing at runtime. Callbacks can access captures for decisions."
            icon="dynamic"
            badge="new"
          />
          <FeatureCard
            title="37 Examples"
            description="Complete examples for JSON, CSV, XML, TOML, YAML, Markdown, URL, Email, expressions, and more."
            icon="code"
          />
        </div>
      </div>
    </section>

    <!-- Performance Section -->
    <section class="py-24 bg-white dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Performance That Matters
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Built with Rust's zero-cost abstractions for maximum performance.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div class="card">
            <div class="text-5xl font-bold text-primary-600 dark:text-primary-400 mb-2">18-44x</div>
            <div class="text-gray-600 dark:text-gray-400">Faster than pure Ruby</div>
          </div>
          <div class="card">
            <div class="text-5xl font-bold text-primary-600 dark:text-primary-400 mb-2">99.5%</div>
            <div class="text-gray-600 dark:text-gray-400">Fewer allocations</div>
          </div>
          <div class="card">
            <div class="text-5xl font-bold text-primary-600 dark:text-primary-400 mb-2">O(n)</div>
            <div class="text-gray-600 dark:text-gray-400">Packrat complexity</div>
          </div>
          <div class="card">
            <div class="text-5xl font-bold text-primary-600 dark:text-primary-400 mb-2">100MB</div>
            <div class="text-gray-600 dark:text-gray-400">Max input size</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Optimization Techniques -->
    <section class="py-24 bg-gray-50 dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Optimization Techniques
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Every layer is optimized for speed and memory efficiency.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-8">
          <div class="card">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Arena Allocation</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              All AST nodes allocated in a single arena. Zero individual allocations,
              perfect cache locality, instant cleanup. Pre-sized based on input length.
            </p>
          </div>
          <div class="card">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Packrat Memoization</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              Dense cache with position-based lookups using AHash. O(n) parsing
              complexity guaranteed. Cache invalidation support for incremental parsing.
            </p>
          </div>
          <div class="card">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">SIMD Acceleration</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              memchr for fast substring search, SmallVec for stack-allocated
              small collections, pre-computed character class tables for O(1) lookup.
            </p>
          </div>
          <div class="card">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Zero-Copy Slices</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              InputRef nodes return slice references with offset/length instead of
              copying strings. Preserves source position information for IDEs and linters.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Comparison Section -->
    <section class="py-24 bg-white dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How Parsanol Compares
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            See how Parsanol stacks up against other popular parser combinator libraries.
          </p>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full max-w-4xl mx-auto">
            <thead>
              <tr class="border-b border-gray-200 dark:border-gray-700">
                <th class="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Feature</th>
                <th class="text-center py-4 px-6 font-semibold text-gray-900 dark:text-white">Parsanol</th>
                <th class="text-center py-4 px-6 font-semibold text-gray-500 dark:text-gray-400">Parslet</th>
                <th class="text-center py-4 px-6 font-semibold text-gray-500 dark:text-gray-400">Pest</th>
                <th class="text-center py-4 px-6 font-semibold text-gray-500 dark:text-gray-400">Nom</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td class="py-4 px-6 text-gray-700 dark:text-gray-300">Multi-language (Rust + Ruby + WASM)</td>
                <td class="text-center py-4 px-6"><Icon name="check" class="w-5 h-5 text-green-500 mx-auto" /></td>
                <td class="text-center py-4 px-6 text-gray-400">Ruby only</td>
                <td class="text-center py-4 px-6 text-gray-400">Rust only</td>
                <td class="text-center py-4 px-6 text-gray-400">Rust only</td>
              </tr>
              <tr>
                <td class="py-4 px-6 text-gray-700 dark:text-gray-300">Tree transforms</td>
                <td class="text-center py-4 px-6"><Icon name="check" class="w-5 h-5 text-green-500 mx-auto" /></td>
                <td class="text-center py-4 px-6"><Icon name="check" class="w-5 h-5 text-green-500 mx-auto" /></td>
                <td class="text-center py-4 px-6 text-gray-400">Limited</td>
                <td class="text-center py-4 px-6 text-gray-400">Limited</td>
              </tr>
              <tr>
                <td class="py-4 px-6 text-gray-700 dark:text-gray-300">Streaming parsing</td>
                <td class="text-center py-4 px-6"><Icon name="check" class="w-5 h-5 text-green-500 mx-auto" /></td>
                <td class="text-center py-4 px-6 text-gray-400">-</td>
                <td class="text-center py-4 px-6 text-gray-400">-</td>
                <td class="text-center py-4 px-6"><Icon name="check" class="w-5 h-5 text-green-500 mx-auto" /></td>
              </tr>
              <tr>
                <td class="py-4 px-6 text-gray-700 dark:text-gray-300">Incremental parsing</td>
                <td class="text-center py-4 px-6"><Icon name="check" class="w-5 h-5 text-green-500 mx-auto" /></td>
                <td class="text-center py-4 px-6 text-gray-400">-</td>
                <td class="text-center py-4 px-6 text-gray-400">-</td>
                <td class="text-center py-4 px-6 text-gray-400">-</td>
              </tr>
              <tr>
                <td class="py-4 px-6 text-gray-700 dark:text-gray-300">Parallel parsing</td>
                <td class="text-center py-4 px-6"><Icon name="check" class="w-5 h-5 text-green-500 mx-auto" /></td>
                <td class="text-center py-4 px-6 text-gray-400">-</td>
                <td class="text-center py-4 px-6 text-gray-400">-</td>
                <td class="text-center py-4 px-6 text-gray-400">-</td>
              </tr>
              <tr>
                <td class="py-4 px-6 text-gray-700 dark:text-gray-300">Infix expressions</td>
                <td class="text-center py-4 px-6"><Icon name="check" class="w-5 h-5 text-green-500 mx-auto" /></td>
                <td class="text-center py-4 px-6"><Icon name="check" class="w-5 h-5 text-green-500 mx-auto" /></td>
                <td class="text-center py-4 px-6"><Icon name="check" class="w-5 h-5 text-green-500 mx-auto" /></td>
                <td class="text-center py-4 px-6"><Icon name="check" class="w-5 h-5 text-green-500 mx-auto" /></td>
              </tr>
              <tr>
                <td class="py-4 px-6 text-gray-700 dark:text-gray-300">Derive macros</td>
                <td class="text-center py-4 px-6"><Icon name="check" class="w-5 h-5 text-green-500 mx-auto" /></td>
                <td class="text-center py-4 px-6 text-gray-400">-</td>
                <td class="text-center py-4 px-6 text-gray-400">-</td>
                <td class="text-center py-4 px-6 text-gray-400">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Examples Preview -->
    <section class="py-24 bg-gray-50 dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {{ totalExamples }} Complete Examples
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Learn by example with production-quality parsers for real-world formats.
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <router-link to="/examples/json" class="card p-4 text-center hover:shadow-lg transition">
            <span class="text-2xl mb-2 block">{ }</span>
            <span class="text-sm text-gray-600 dark:text-gray-400">JSON</span>
          </router-link>
          <router-link to="/examples/csv" class="card p-4 text-center hover:shadow-lg transition">
            <span class="text-2xl mb-2 block">CSV</span>
            <span class="text-sm text-gray-600 dark:text-gray-400">CSV</span>
          </router-link>
          <router-link to="/examples/toml" class="card p-4 text-center hover:shadow-lg transition">
            <span class="text-2xl mb-2 block">TOML</span>
            <span class="text-sm text-gray-600 dark:text-gray-400">Config</span>
          </router-link>
          <router-link to="/examples/yaml" class="card p-4 text-center hover:shadow-lg transition">
            <span class="text-2xl mb-2 block">YAML</span>
            <span class="text-sm text-gray-600 dark:text-gray-400">YAML</span>
          </router-link>
          <router-link to="/examples/markdown" class="card p-4 text-center hover:shadow-lg transition">
            <span class="text-2xl mb-2 block">MD</span>
            <span class="text-sm text-gray-600 dark:text-gray-400">Markdown</span>
          </router-link>
          <router-link to="/examples/simple-xml" class="card p-4 text-center hover:shadow-lg transition">
            <span class="text-2xl mb-2 block">&lt;/&gt;</span>
            <span class="text-sm text-gray-600 dark:text-gray-400">XML</span>
          </router-link>
          <router-link to="/examples/url" class="card p-4 text-center hover:shadow-lg transition">
            <span class="text-2xl mb-2 block">🔗</span>
            <span class="text-sm text-gray-600 dark:text-gray-400">URL</span>
          </router-link>
          <router-link to="/examples/email" class="card p-4 text-center hover:shadow-lg transition">
            <span class="text-2xl mb-2 block">@</span>
            <span class="text-sm text-gray-600 dark:text-gray-400">Email</span>
          </router-link>
          <router-link to="/examples/calculator" class="card p-4 text-center hover:shadow-lg transition">
            <span class="text-2xl mb-2 block">1+2</span>
            <span class="text-sm text-gray-600 dark:text-gray-400">Calculator</span>
          </router-link>
          <router-link to="/examples/sexp" class="card p-4 text-center hover:shadow-lg transition">
            <span class="text-2xl mb-2 block">( )</span>
            <span class="text-sm text-gray-600 dark:text-gray-400">S-Expr</span>
          </router-link>
          <router-link to="/examples/erb" class="card p-4 text-center hover:shadow-lg transition">
            <span class="text-2xl mb-2 block">&lt;%</span>
            <span class="text-sm text-gray-600 dark:text-gray-400">ERB</span>
          </router-link>
          <router-link to="/examples" class="card p-4 text-center hover:shadow-lg transition bg-primary-50 dark:bg-primary-900/20">
            <span class="text-2xl mb-2 block">+{{ moreExamples }}</span>
            <span class="text-sm text-primary-600 dark:text-primary-400">More...</span>
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-24 bg-gradient-to-r from-primary-600 to-accent-600">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to Build Your Parser?
        </h2>
        <p class="text-xl text-white/90 mb-10">
          Start with our getting started guide and build your first parser in minutes.
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <router-link to="/introduction">
            <Button variant="secondary" size="lg">
              Get Started
              <Icon name="chevron-right" class="ml-2" />
            </Button>
          </router-link>
          <router-link to="/examples">
            <Button variant="secondary" size="lg" class="bg-white/20 text-white hover:bg-white/30">
              View Examples
            </Button>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import Hero from '../components/organisms/Hero.vue'
import FeatureCard from '../components/molecules/FeatureCard.vue'
import Button from '../components/atoms/Button.vue'
import Icon from '../components/atoms/Icon.vue'
import examplesManifest from '../data/examples-manifest.json'

// Dynamic example counts
const totalExamples = examplesManifest.length
const shownExamples = 11 // json, csv, toml, yaml, markdown, simple-xml, url, email, calculator, sexp, erb
const moreExamples = totalExamples - shownExamples
</script>
