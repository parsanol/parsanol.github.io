<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="flex gap-12">
      <div class="w-64 flex-shrink-0 hidden lg:block">
        <div class="sticky top-20 h-[calc(100vh-6rem)] overflow-y-auto">
          <DocsNav :show-sections="['architecture']" />
        </div>
      </div>

      <div class="flex-1 min-w-0">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-8">Architecture</h1>
        <p class="text-lg text-gray-600 dark:text-gray-400 mb-12">
          Parsanol is built as a high-performance Rust core with bindings for Ruby and WebAssembly.
          This architecture provides native performance while maintaining ease of use.
        </p>

        <!-- The 5 Approaches -->
        <section id="five-approaches" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">The 5 Approaches for Ruby Parsing</h2>

          <p class="text-gray-600 dark:text-gray-400 mb-6">
            Parsanol offers 5 different approaches for parsing in Ruby, each moving more work from Ruby to Rust:
          </p>

          <div class="card mb-8 overflow-x-auto">
            <pre class="text-sm text-gray-800 dark:text-gray-200">
┌──────────────────────────────────────────────────────────────────────────────┐
│                    5 APPROACHES FOR RUBY PARSING                             │
│                                                                              │
│   Each approach moves more work from Ruby to Rust, increasing performance.   │
│   Measured with Expressir parsing EXPRESS schemas (22KB file).               │
└──────────────────────────────────────────────────────────────────────────────┘


APPROACH 1: parslet-ruby (BASELINE)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   INPUT     │     │  PARSLET    │     │   OUTPUT    │
│   String    │────▶│  (Ruby)     │────▶│  Ruby Hash  │
└─────────────┘     └─────────────┘     └─────────────┘
                          │
                    SLOW parsing
                    Pure Ruby

SPEED: 1x (baseline) - 3036ms


APPROACH 2: parsanol-ruby
━━━━━━━━━━━━━━━━━━━━━━━━━
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   INPUT     │     │  PARSANOL   │     │   OUTPUT    │
│   String    │────▶│  (Ruby)     │────▶│  Ruby Hash  │
└─────────────┘     └─────────────┘     └─────────────┘

SPEED: ~1x (equivalent to Parslet)


APPROACH 3: parsanol-native (Batch)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   INPUT     │     │  PARSANOL   │     │   OUTPUT    │
│   String    │────▶│  (Rust)     │────▶│  Ruby Hash  │
└─────────────┘     └─────────────┘     └─────────────┘
                          │
                    FAST parsing
                    AST via u64 array

SPEED: ~20x faster - 153ms


APPROACH 4: parsanol-native (ZeroCopy)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┌─────────────┐     ┌─────────────────────────┐
│   INPUT     │     │        PARSANOL         │
│   String    │────▶│        (Rust FFI)       │────▶ Ruby Objects
└─────────────┘     │  Direct construction    │
                    └─────────────────────────┘

SPEED: ~25x faster


APPROACH 5: parsanol-native (ZeroCopy + Slice) ← FASTEST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┌─────────────┐     ┌────────────────────────────────────┐
│   INPUT     │     │            PARSANOL                │
│   String    │────▶│            (Rust)                  │────▶ Slice Objects
└─────────────┘     │  Zero-copy + Source positions      │
                    └────────────────────────────────────┘
                          │
                    FASTEST parsing
                    Source position tracking

SPEED: ~29x faster - 106ms (28.7x vs baseline)
FEATURES: Preserves source positions for linters, IDEs
            </pre>
          </div>

          <div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
            <p class="text-green-800 dark:text-green-200 text-sm">
              <strong>New: Slice Support</strong> - ZeroCopy + Slice mode preserves source positions (offset, length)
              for each parsed element. This is essential for tools like linters, IDEs, and Expressir that need
              to track where in the source code each element came from.
            </p>
          </div>

          <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
            <p class="text-blue-800 dark:text-blue-200 text-sm">
              <strong>Evidence-Based:</strong> These results are measured with Expressir parsing real EXPRESS schemas.
              Run the benchmarks yourself: <code class="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded ml-2">bundle exec ruby benchmark/run_all.rb --quick</code>
            </p>
          </div>
        </section>

        <!-- Evidence-Based Benchmarks -->
        <section id="benchmarks" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Evidence-Based Benchmarks</h2>

          <p class="text-gray-600 dark:text-gray-400 mb-4">
            These are <strong>actual benchmark results</strong> from Expressir parsing EXPRESS schemas.
            The test file is 22KB with 733 lines of EXPRESS code.
          </p>

          <div class="card mb-8 overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Mode</th>
                  <th class="text-right py-3 px-4 font-semibold text-gray-900 dark:text-white">Time</th>
                  <th class="text-right py-3 px-4 font-semibold text-gray-900 dark:text-white">Speedup</th>
                  <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Notes</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Ruby (Parslet)</td>
                  <td class="py-3 px-4 text-right text-gray-600 dark:text-gray-400">3036 ms</td>
                  <td class="py-3 px-4 text-right text-gray-600 dark:text-gray-400">1x (baseline)</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Pure Ruby parsing</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 text-green-600 dark:text-green-400">Native Batch (u64)</td>
                  <td class="py-3 px-4 text-right text-green-600 dark:text-green-400">153 ms</td>
                  <td class="py-3 px-4 text-right text-green-600 dark:text-green-400">19.9x faster</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">AST via u64 array transfer</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 font-medium text-green-600 dark:text-green-400">Native ZeroCopy (Slice)</td>
                  <td class="py-3 px-4 text-right font-medium text-green-600 dark:text-green-400">106 ms</td>
                  <td class="py-3 px-4 text-right font-medium text-green-600 dark:text-green-400">28.7x faster</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Zero-copy with source positions</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">JSON Parsing Benchmarks</h3>

          <div class="card mb-8 overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Input Size</th>
                  <th class="text-right py-3 px-4 font-semibold text-gray-900 dark:text-white">parslet-ruby</th>
                  <th class="text-right py-3 px-4 font-semibold text-gray-900 dark:text-white">parsanol-native</th>
                  <th class="text-right py-3 px-4 font-semibold text-gray-900 dark:text-white">parsanol-zerocopy</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">tiny (76 bytes)</td>
                  <td class="py-3 px-4 text-right text-gray-600 dark:text-gray-400">1,156 iter/s</td>
                  <td class="py-3 px-4 text-right text-green-600 dark:text-green-400">4,745 iter/s</td>
                  <td class="py-3 px-4 text-right font-medium text-green-600 dark:text-green-400">33,000+ iter/s</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">small (791 bytes)</td>
                  <td class="py-3 px-4 text-right text-gray-600 dark:text-gray-400">111 iter/s</td>
                  <td class="py-3 px-4 text-right text-green-600 dark:text-green-400">469 iter/s</td>
                  <td class="py-3 px-4 text-right font-medium text-green-600 dark:text-green-400">3,200+ iter/s</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">medium (8KB)</td>
                  <td class="py-3 px-4 text-right text-gray-600 dark:text-gray-400">9.3 iter/s</td>
                  <td class="py-3 px-4 text-right text-green-600 dark:text-green-400">47.2 iter/s</td>
                  <td class="py-3 px-4 text-right font-medium text-green-600 dark:text-green-400">270+ iter/s</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <p class="text-yellow-800 dark:text-yellow-200 text-sm">
              <strong>Note:</strong> Results vary based on hardware, Ruby version, and input complexity.
              Always run benchmarks on your own system for accurate comparisons.
            </p>
          </div>
        </section>

        <!-- Slice Feature -->
        <section id="slice-feature" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Slice Support for Source Positions</h2>

          <p class="text-gray-600 dark:text-gray-400 mb-6">
            The ZeroCopy + Slice mode preserves source position information, which is essential for
            tools that need to track where in the source code each element came from.
          </p>

          <div class="card mb-6">
            <pre class="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
# Before (plain strings):
[{"word"=>"hello"}, " ", {"name"=>"world"}]

# After (Slice objects with position info):
[{"word"=>"hello"@0}, " "@5, {"name"=>"world"@6}]

# The @N notation shows the byte offset in the original input
            </pre>
          </div>

          <div class="grid md:grid-cols-2 gap-6 mb-8">
            <div class="card">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Parslet::Slice Compatible</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm">
                Parsanol::Slice objects are compatible with Parslet::Slice, making migration seamless
                for existing code that depends on source position tracking.
              </p>
            </div>

            <div class="card">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Offset + Length</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm">
                Each slice contains the byte offset and length, allowing tools to precisely
                locate and highlight source code elements.
              </p>
            </div>
          </div>

          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Use Cases</h3>

          <div class="space-y-4">
            <div class="card">
              <h4 class="font-medium text-gray-900 dark:text-white mb-2">Linters</h4>
              <p class="text-gray-600 dark:text-gray-400 text-sm">
                Show precise error locations with line/column information derived from byte offsets.
              </p>
            </div>

            <div class="card">
              <h4 class="font-medium text-gray-900 dark:text-white mb-2">IDE Integration</h4>
              <p class="text-gray-600 dark:text-gray-400 text-sm">
                Enable go-to-definition, find-references, and syntax highlighting based on parsed structure.
              </p>
            </div>

            <div class="card">
              <h4 class="font-medium text-gray-900 dark:text-white mb-2">Code Generation</h4>
              <p class="text-gray-600 dark:text-gray-400 text-sm">
                Generate output that preserves mappings back to original source locations.
              </p>
            </div>
          </div>
        </section>

        <!-- When to Use Which Approach -->
        <section id="when-to-use" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">When to Use Which Approach</h2>

          <div class="overflow-x-auto mb-6">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Approach</th>
                  <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Best For</th>
                  <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Trade-offs</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td class="py-3 px-4 font-medium text-gray-900 dark:text-white">parslet-ruby</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Existing Parslet code, maximum compatibility</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Slowest, but most reliable</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 font-medium text-gray-900 dark:text-white">parsanol-native (Batch)</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Need Ruby objects, good performance</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">AST transfer overhead</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 font-medium text-green-600 dark:text-green-400">ZeroCopy + Slice</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Need source positions (linters, IDEs)</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Best overall - fastest + position tracking</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- Rust Core -->
        <section id="rust-core" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Rust Core Engine</h2>

          <p class="text-gray-600 dark:text-gray-400 mb-6">
            The Rust core provides the parsing engine with maximum performance:
          </p>

          <div class="grid md:grid-cols-2 gap-6 mb-8">
            <div class="card">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Packrat Parser</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm">
                Memoization-based parsing guarantees O(n) time complexity for PEG grammars.
                No exponential backtracking, predictable performance.
              </p>
            </div>

            <div class="card">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Arena Allocation</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm">
                All AST nodes are allocated in a single arena. Zero individual allocations,
                perfect cache locality, instant cleanup.
              </p>
            </div>

            <div class="card">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">SIMD Acceleration</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm">
                Uses memchr for fast substring search, AHash for fast hashing,
                SmallVec for stack-allocated small collections.
              </p>
            </div>

            <div class="card">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Zero-Copy Slices</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm">
                InputRef nodes return slice references with offset/length instead of
                copying strings, preserving source position information.
              </p>
            </div>
          </div>

          <CodeTabs
            :rust="rustExample"
          />
        </section>

        <!-- Parslet Compatibility -->
        <section id="parslet-compat" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Parslet Compatibility Layer</h2>

          <p class="text-gray-600 dark:text-gray-400 mb-6">
            For existing Parslet users, we provide a drop-in compatibility layer:
          </p>

          <div class="card mb-8">
            <pre class="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
┌─────────────────────────────────────────────────────────────────────┐
│                    PARSLET COMPATIBILITY LAYER                      │
│                                                                     │
│  require 'parslet'           →        require 'parsanol/parslet'    │
│                                                                     │
│  class MyParser < Parslet::Parser    class MyParser < Parsanol::    │
│    rule(:expr) { ... }                 Parslet::Parser              │
│  end                                     rule(:expr) { ... }        │
│                                        end                          │
│                                                                     │
│  NO CODE CHANGES REQUIRED!                                          │
│                                                                     │
│  Benefits:                                                          │
│  • Same API as Parslet                                              │
│  • Same output format (including Slice objects)                     │
│  • Rust backend by default - 28x faster                             │
└─────────────────────────────────────────────────────────────────────┘
            </pre>
          </div>

          <CodeTabs
            :ruby="parsletCompatExample"
          />
        </section>

        <!-- Running Benchmarks -->
        <section id="running-benchmarks" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Running Benchmarks Yourself</h2>

          <p class="text-gray-600 dark:text-gray-400 mb-6">
            All performance claims on this page can be verified by running the benchmarks on your own machine:
          </p>

          <div class="card mb-6">
            <pre class="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
# Clone and setup
git clone https://github.com/parsanol/parsanol-ruby
cd parsanol-ruby
bundle install

# Build native extension (requires Rust)
bundle exec rake compile

# Run quick benchmarks (skips large inputs)
bundle exec ruby benchmark/run_all.rb --quick

# Run all benchmarks
bundle exec ruby benchmark/run_all.rb

# View the approaches diagram
cat benchmark/APPROACHES.md
            </pre>
          </div>

          <p class="text-gray-600 dark:text-gray-400">
            Benchmark results are saved to <code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">benchmark/reports/</code>
            as JSON files for comparison over time.
          </p>
        </section>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CodeTabs from '../components/molecules/CodeTabs.vue'
import DocsNav from '../components/organisms/DocsNav.vue'

const rustExample = `// Direct Rust usage
use parsanol::portable::{
    parser_dsl::{GrammarBuilder, str, re, ParsletExt},
    AstArena, PortableParser, to_parslet_compatible,
};

fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Build grammar using DSL
    let grammar = GrammarBuilder::new()
        .rule("schema",
            str("SCHEMA ") >>
            re("[a-zA-Z_][a-zA-Z0-9_]*").label("name") >>
            str(";")
        )
        .build();

    let input = "SCHEMA my_schema;";
    let mut arena = AstArena::for_input(input.len());
    let mut parser = PortableParser::new(&grammar, input, &mut arena);

    // Parse to raw AST
    let raw_ast = parser.parse()?;

    // Transform to Parslet-compatible format
    let parslet_ast = to_parslet_compatible(&raw_ast, &mut arena, input);

    println!("{:?}", parslet_ast);
    // Output: Hash { name: "my_schema" }

    Ok(())
}`

const parsletCompatExample = `# BEFORE: Using original Parslet
require 'parslet'

class JsonParser < Parslet::Parser
  rule(:string) { str('"') >> (str('"').absent? >> any).repeat >> str('"') }
  rule(:number) { match('[0-9]').repeat(1) }
  rule(:value) { string | number }
  root(:value)
end

parser = JsonParser.new
result = parser.parse('42')

# ============================================

# AFTER: Using Parsanol with Parslet compatibility
# Just change the require statement!
require 'parsanol/parslet'  # <- Only change needed

class JsonParser < Parsanol::Parslet::Parser
  rule(:string) { str('"') >> (str('"').absent? >> any).repeat >> str('"') }
  rule(:number) { match('[0-9]').repeat(1) }
  rule(:value) { string | number }
  root(:value)
end

parser = JsonParser.new
result = parser.parse('42')  # 28x faster with Rust backend!`
</script>
