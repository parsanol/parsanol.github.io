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

        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">Rust Guide</h1>
        <p class="text-lg text-gray-600 dark:text-gray-400 mb-12">
          Parsanol is a parser combinator library designed for zero-copy parsing with excellent error messages.
          This guide covers everything from basic usage to advanced optimizations.
        </p>

        <!-- Installation -->
        <section id="installation" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Installation</h2>

          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Add Parsanol to your Cargo.toml:
          </p>
          <div class="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 mb-6">
            <pre class="text-sm text-gray-100"><code>[dependencies]
parsanol = "0.1"</code></pre>
          </div>

          <p class="text-gray-600 dark:text-gray-400">
            Or with specific features:
          </p>
          <div class="bg-gray-900 dark:bg-gray-950 rounded-lg p-4">
            <pre class="text-sm text-gray-100"><code>[dependencies]
parsanol = { version = "0.1", features = ["serde", "trace"] }</code></pre>
          </div>
        </section>

        <!-- Basic Usage -->
        <section id="basic-usage" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Basic Usage</h2>

          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Parsanol uses parser combinators - small, composable functions that combine to parse complex formats:
          </p>

          <div class="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 mb-6">
            <pre class="text-sm text-gray-100 overflow-x-auto"><code>use parsanol::prelude::*;

// Define a simple parser for identifiers
let identifier = alpha1();

// Parse a string
let result = identifier.parse("hello123");
// Ok("hello") - returns the matched letters

// Combine parsers
let word_and_number = alpha1().then(digit1());
let result = word_and_number.parse("abc123");
// Ok(("abc", "123"))</code></pre>
          </div>

          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3 mt-8">Building a JSON Parser</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Here's a taste of how to build parsers. See the <router-link to="/examples" class="text-primary-600 dark:text-primary-400">Examples</router-link> for complete parsers:
          </p>

          <div class="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 mb-6">
            <pre class="text-sm text-gray-100 overflow-x-auto"><code>// JSON string parser
let json_string = char('"')
    .then(none_of('"').repeated())
    .then(char('"'))
    .map(|(_, content, _)| content.join(""));

// JSON number parser
let json_number = digit1()
    .then(char('.').then(digit1()).optional())
    .map(|(int, frac)| {
        // Combine into number
    });</code></pre>
          </div>
        </section>

        <!-- Zero-Copy Parsing -->
        <section id="zero-copy" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Zero-Copy Parsing</h2>

          <div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
            <p class="text-green-800 dark:text-green-200 text-sm">
              <strong>Key advantage:</strong> Parsanol parses without allocating strings by default.
              Results borrow from the input, making it extremely fast for large inputs.
            </p>
          </div>

          <p class="text-gray-600 dark:text-gray-400 mb-4">
            By default, parsers return slices of the input rather than owned strings:
          </p>

          <div class="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 mb-6">
            <pre class="text-sm text-gray-100 overflow-x-auto"><code>let input = "hello world";
let parser = alpha1();
let result: &str = parser.parse(input)?;

// result borrows from input - no allocation!
// If you need an owned string:
let owned: String = result.to_string();</code></pre>
          </div>

          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3 mt-8">When Allocation Happens</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Allocation only occurs when you explicitly transform results:
          </p>

          <div class="bg-gray-900 dark:bg-gray-950 rounded-lg p-4">
            <pre class="text-sm text-gray-100 overflow-x-auto"><code>// No allocation
let parser = alpha1();

// Allocation: Vec of &str
let parser = alpha1().repeated();

// Allocation: owned String via map
let parser = alpha1().map(|s| s.to_uppercase());

// No allocation: just reborrows
let parser = alpha1().then(digit1());</code></pre>
          </div>
        </section>

        <!-- Slice Feature -->
        <section id="slice-feature" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Slice Support (Source Positions)</h2>

          <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
            <p class="text-blue-800 dark:text-blue-200 text-sm">
              <strong>Unique to Parsanol:</strong> Track exact byte offsets in the original input.
              Essential for linters, IDEs, and tools that need to highlight or navigate source code.
            </p>
          </div>

          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Use <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded">.with_slice()</code> to get position information:
          </p>

          <div class="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 mb-6">
            <pre class="text-sm text-gray-100 overflow-x-auto"><code>// Before (plain &str - no position info):
let result = parser.parse("hello world");
// Ok("hello")

// After (Slice with position info):
let result = parser.with_slice().parse("hello world");
// Ok(Slice { value: "hello", start: 0, end: 5 })

// Access position info:
println!("Found at byte {}..{}", result.start, result.end);</code></pre>
          </div>

          <div class="grid md:grid-cols-3 gap-4 mb-6">
            <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 class="font-medium text-gray-900 dark:text-white mb-2">Linters</h4>
              <p class="text-gray-600 dark:text-gray-400 text-sm">Precise error locations with source spans</p>
            </div>
            <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 class="font-medium text-gray-900 dark:text-white mb-2">IDEs</h4>
              <p class="text-gray-600 dark:text-gray-400 text-sm">Go-to-definition, syntax highlighting</p>
            </div>
            <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 class="font-medium text-gray-900 dark:text-white mb-2">Code Analysis</h4>
              <p class="text-gray-600 dark:text-gray-400 text-sm">Static analysis with precise locations</p>
            </div>
          </div>
        </section>

        <!-- Error Handling -->
        <section id="error-handling" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Error Handling</h2>

          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Parsanol provides tree-structured errors with precise locations and context:
          </p>

          <div class="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 mb-6">
            <pre class="text-sm text-gray-100 overflow-x-auto"><code>match parser.parse(input) {
    Ok(result) => println!("Parsed: {:?}", result),
    Err(error) => {
        // Tree-structured error with context
        println!("Error at {}..{}: {}", error.start, error.end, error.message);

        // Get the full error tree
        for child in error.children {
            println!("  - {}", child.message);
        }
    }
}</code></pre>
          </div>

          <p class="text-gray-600 dark:text-gray-400">
            See <router-link to="/errors" class="text-primary-600 dark:text-primary-400">Error Handling</router-link> for detailed error reporting patterns.
          </p>
        </section>

        <!-- Performance Tips -->
        <section id="performance" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Performance Tips</h2>

          <div class="grid gap-4 md:grid-cols-2 mb-6">
            <div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <h4 class="font-semibold text-green-800 dark:text-green-200 mb-3">Do</h4>
              <ul class="text-sm text-green-700 dark:text-green-300 space-y-2">
                <li>• Use <code class="bg-green-100 dark:bg-green-900 px-1 rounded">&str</code> for input</li>
                <li>• Reuse parser instances (they're cheap to clone)</li>
                <li>• Build in release mode for benchmarks</li>
                <li>• Use <code class="bg-green-100 dark:bg-green-900 px-1 rounded">.with_slice()</code> only when needed</li>
                <li>• Enable LTO for maximum performance</li>
              </ul>
            </div>
            <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <h4 class="font-semibold text-red-800 dark:text-red-200 mb-3">Don't</h4>
              <ul class="text-sm text-red-700 dark:text-red-300 space-y-2">
                <li>• Allocate in hot loops (use <code class="bg-red-100 dark:bg-red-900 px-1 rounded">&str</code>)</li>
                <li>• Recreate parsers inside loops</li>
                <li>• Use <code class="bg-red-100 dark:bg-red-900 px-1 rounded">String</code> where <code class="bg-red-100 dark:bg-red-900 px-1 rounded">&str</code> works</li>
                <li>• Ignore Clippy warnings</li>
                <li>• Benchmark in debug mode</li>
              </ul>
            </div>
          </div>

          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Cargo.toml Optimization</h3>
          <div class="bg-gray-900 dark:bg-gray-950 rounded-lg p-4">
            <pre class="text-sm text-gray-100 overflow-x-auto"><code>[profile.release]
lto = true
codegen-units = 1
strip = true</code></pre>
          </div>
        </section>

        <!-- Feature Flags -->
        <section id="features" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Feature Flags</h2>

          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead class="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Feature</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Description</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Default</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td class="px-4 py-3 text-sm font-mono text-primary-600 dark:text-primary-400">std</td>
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Standard library support</td>
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Yes</td>
                </tr>
                <tr>
                  <td class="px-4 py-3 text-sm font-mono text-primary-600 dark:text-primary-400">serde</td>
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Serde serialization for AST types</td>
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">No</td>
                </tr>
                <tr>
                  <td class="px-4 py-3 text-sm font-mono text-primary-600 dark:text-primary-400">trace</td>
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Debug tracing of parser execution</td>
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">No</td>
                </tr>
                <tr>
                  <td class="px-4 py-3 text-sm font-mono text-primary-600 dark:text-primary-400">no_std</td>
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Disable std for embedded targets</td>
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">No</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- Next Steps -->
        <section class="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-6">
          <h2 class="text-lg font-semibold text-primary-900 dark:text-primary-100 mb-2">Next Steps</h2>
          <ul class="text-primary-700 dark:text-primary-300 space-y-1">
            <li>→ <router-link to="/parsers" class="underline hover:no-underline">Learn parser combinators</router-link></li>
            <li>→ <router-link to="/examples" class="underline hover:no-underline">Explore example parsers</router-link></li>
            <li>→ <router-link to="/rust-comparison" class="underline hover:no-underline">Compare with other Rust parsers</router-link></li>
            <li>→ <router-link to="/errors" class="underline hover:no-underline">Master error handling</router-link></li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DocsNav from '../../components/organisms/DocsNav.vue'
</script>
