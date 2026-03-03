<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="flex gap-12">
      <div class="w-64 flex-shrink-0 hidden lg:block">
        <div class="sticky top-20 h-[calc(100vh-6rem)] overflow-y-auto">
          <DocsNav :show-sections="['ruby']" />
        </div>
      </div>

      <div class="flex-1 min-w-0">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-8">Ruby Bindings</h1>
        <p class="text-lg text-gray-600 dark:text-gray-400 mb-12">
          Parsanol offers 5 different approaches for parsing in Ruby, each moving more work from Ruby to Rust for better performance.
        </p>

        <!-- The 5 Approaches -->
        <section id="five-approaches" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">The 5 Approaches</h2>

          <p class="text-gray-600 dark:text-gray-400 mb-6">
            Each approach represents a different trade-off between flexibility and performance.
            Run the benchmarks yourself to verify these results on your system.
          </p>

          <div class="card mb-8 overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Approach</th>
                  <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Description</th>
                  <th class="text-right py-3 px-4 font-semibold text-gray-900 dark:text-white">Speed</th>
                  <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Best For</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td class="py-3 px-4 font-medium text-gray-600 dark:text-gray-400">1. parslet-ruby</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Pure Ruby parsing (baseline)</td>
                  <td class="py-3 px-4 text-right text-gray-600 dark:text-gray-400">1x</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Compatibility, debugging</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 font-medium text-gray-600 dark:text-gray-400">2. parsanol-ruby</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Parsanol Ruby backend</td>
                  <td class="py-3 px-4 text-right text-gray-600 dark:text-gray-400">~1x</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Learning, prototyping</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 font-medium text-green-600 dark:text-green-400">3. parsanol-native</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Rust parsing, AST via u64</td>
                  <td class="py-3 px-4 text-right text-green-600 dark:text-green-400">~20x</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Need Ruby objects, good performance</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 font-medium text-green-600 dark:text-green-400">4. ZeroCopy</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Direct FFI object construction</td>
                  <td class="py-3 px-4 text-right text-green-600 dark:text-green-400">~25x</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Maximum performance</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 font-medium text-green-600 dark:text-green-400">5. ZeroCopy + Slice</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Zero-copy with source positions</td>
                  <td class="py-3 px-4 text-right font-medium text-green-600 dark:text-green-400">~29x</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Linters, IDEs, Expressir (BEST)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- Slice Feature Highlight -->
        <section id="slice-feature" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Slice Support (New)</h2>

          <div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
            <p class="text-green-800 dark:text-green-200 text-sm">
              <strong>28.7x faster</strong> with source position tracking! The ZeroCopy + Slice mode preserves
              byte offsets for each parsed element, essential for linters, IDEs, and tools like Expressir.
            </p>
          </div>

          <div class="card mb-6">
            <pre class="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
# Before (plain strings - no position info):
[{"word"=>"hello"}, " ", {"name"=>"world"}]

# After (Slice objects with position info):
[{"word"=>"hello"@0}, " "@5, {"name"=>"world"@6}]

# The @N notation shows the byte offset in the original input
# Parsanol::Slice is compatible with Parslet::Slice
            </pre>
          </div>

          <div class="grid md:grid-cols-3 gap-4 mb-6">
            <div class="card">
              <h3 class="font-medium text-gray-900 dark:text-white mb-2">Linters</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm">Precise error locations</p>
            </div>
            <div class="card">
              <h3 class="font-medium text-gray-900 dark:text-white mb-2">IDEs</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm">Go-to-definition, highlighting</p>
            </div>
            <div class="card">
              <h3 class="font-medium text-gray-900 dark:text-white mb-2">Expressir</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm">EXPRESS schema parsing</p>
            </div>
          </div>

          <CodeTabs :ruby="sliceExample" />
        </section>

        <!-- Approach 1: Parslet Ruby -->
        <section id="approach-1" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Approach 1: parslet-ruby (Baseline)
          </h2>

          <div class="card mb-6">
            <pre class="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   INPUT     │     │  PARSLET    │     │   OUTPUT    │
│   String    │────▶│  (Ruby)     │────▶│  Ruby Hash  │
└─────────────┘     └─────────────┘     └─────────────┘
                          │
                    SLOW parsing
                    Pure Ruby

SPEED: 1x (baseline) - 3036ms
            </pre>
          </div>

          <p class="text-gray-600 dark:text-gray-400 mb-4">
            This is the original Parslet implementation. Use it for maximum compatibility
            with existing Parslet codebases.
          </p>

          <CodeTabs :ruby="approach1Code" />
        </section>

        <!-- Approach 3: Parsanol Native (Batch) -->
        <section id="approach-3" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Approach 3: parsanol-native (Batch)
          </h2>

          <div class="card mb-6">
            <pre class="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   INPUT     │     │  PARSANOL   │     │   OUTPUT    │
│   String    │────▶│  (Rust)     │────▶│  Ruby Hash  │
└─────────────┘     └─────────────┘     └─────────────┘
                          │
                    FAST parsing
                    AST via u64 array

SPEED: ~20x faster - 153ms (19.9x measured)
            </pre>
          </div>

          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Parsing happens in Rust, AST is transferred via u64 array and reconstructed in Ruby.
            Good balance of performance and flexibility.
          </p>

          <CodeTabs :ruby="approach3Code" />
        </section>

        <!-- Approach 5: ZeroCopy + Slice -->
        <section id="approach-5" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Approach 5: ZeroCopy + Slice (Recommended)
          </h2>

          <div class="card mb-6">
            <pre class="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
┌─────────────┐     ┌─────────────────────────────────────┐
│   INPUT     │     │            PARSANOL                 │
│   String    │────▶│            (Rust)                   │────▶ Slice Objects
└─────────────┘     │  Zero-copy + Source positions       │
                    └─────────────────────────────────────┘
                          │
                    FASTEST parsing
                    Source position tracking

SPEED: ~29x faster - 106ms (28.7x measured)
FEATURES: Preserves source positions for linters, IDEs
            </pre>
          </div>

          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Everything happens in Rust with zero-copy slice references.
            Preserves source positions (offset, length) for each element.
            <strong>Recommended for most use cases.</strong>
          </p>

          <CodeTabs :ruby="approach5Code" />
        </section>

        <!-- When to Use Which -->
        <section id="when-to-use" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            When to Use Which Approach
          </h2>

          <div class="grid md:grid-cols-2 gap-6 mb-8">
            <div class="card">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Use parslet-ruby (1) when:
              </h3>
              <ul class="text-gray-600 dark:text-gray-400 text-sm space-y-2">
                <li>• Migrating existing Parslet code</li>
                <li>• Need maximum Parslet compatibility</li>
                <li>• Debugging grammar issues</li>
              </ul>
            </div>

            <div class="card">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Use parsanol-native (3) when:
              </h3>
              <ul class="text-gray-600 dark:text-gray-400 text-sm space-y-2">
                <li>• Need Ruby objects for manipulation</li>
                <li>• Want good performance without Slice</li>
                <li>• Applying custom transformations</li>
              </ul>
            </div>

            <div class="card border-green-500 dark:border-green-400">
              <h3 class="text-lg font-semibold text-green-600 dark:text-green-400 mb-3">
                Use ZeroCopy + Slice (5) when: (RECOMMENDED)
              </h3>
              <ul class="text-gray-600 dark:text-gray-400 text-sm space-y-2">
                <li>• Need source position tracking</li>
                <li>• Building linters, IDEs, code analysis tools</li>
                <li>• Maximum performance required</li>
                <li>• Using Expressir for EXPRESS schemas</li>
              </ul>
            </div>

            <div class="card">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Performance Summary:
              </h3>
              <ul class="text-gray-600 dark:text-gray-400 text-sm space-y-2">
                <li>• <strong>1x:</strong> parslet-ruby (3036ms)</li>
                <li>• <strong>19.9x:</strong> parsanol-native (153ms)</li>
                <li>• <strong>28.7x:</strong> ZeroCopy + Slice (106ms)</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- Running Benchmarks -->
        <section id="benchmarks" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Verify Performance Yourself
          </h2>

          <p class="text-gray-600 dark:text-gray-400 mb-6">
            All performance claims can be verified by running the benchmarks on your own machine:
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
            </pre>
          </div>

          <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <p class="text-blue-800 dark:text-blue-200 text-sm">
              <strong>Tip:</strong> Benchmark results are saved to
              <code class="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">benchmark/reports/</code>
              as JSON files for comparison over time.
            </p>
          </div>
        </section>

        <!-- Migration from Parslet -->
        <section id="migration" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Migration from Parslet
          </h2>

          <p class="text-gray-600 dark:text-gray-400 mb-6">
            Parsanol provides full Parslet API compatibility. Simply change your require statement:
          </p>

          <CodeTabs :ruby="migrationCode" />

          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 mt-8">
            API Compatibility Matrix
          </h3>

          <div class="card overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Parslet API</th>
                  <th class="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white">Status</th>
                  <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Notes</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td class="py-3 px-4 font-mono text-gray-600 dark:text-gray-400">str('foo')</td>
                  <td class="py-3 px-4 text-center text-green-600 dark:text-green-400">✅</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Literal string match</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 font-mono text-gray-600 dark:text-gray-400">match('[0-9]')</td>
                  <td class="py-3 px-4 text-center text-green-600 dark:text-green-400">✅</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Character class</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 font-mono text-gray-600 dark:text-gray-400">any</td>
                  <td class="py-3 px-4 text-center text-green-600 dark:text-green-400">✅</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Any single character</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 font-mono text-gray-600 dark:text-gray-400">&gt;&gt; (sequence)</td>
                  <td class="py-3 px-4 text-center text-green-600 dark:text-green-400">✅</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Sequential composition</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 font-mono text-gray-600 dark:text-gray-400">| (choice)</td>
                  <td class="py-3 px-4 text-center text-green-600 dark:text-green-400">✅</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Ordered choice</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 font-mono text-gray-600 dark:text-gray-400">.repeat(n, m)</td>
                  <td class="py-3 px-4 text-center text-green-600 dark:text-green-400">✅</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Repetition with bounds</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 font-mono text-gray-600 dark:text-gray-400">.maybe</td>
                  <td class="py-3 px-4 text-center text-green-600 dark:text-green-400">✅</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Optional</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 font-mono text-gray-600 dark:text-gray-400">.as(:name)</td>
                  <td class="py-3 px-4 text-center text-green-600 dark:text-green-400">✅</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Label capture</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 font-mono text-gray-600 dark:text-gray-400">.absent?</td>
                  <td class="py-3 px-4 text-center text-green-600 dark:text-green-400">✅</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Negative lookahead</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 font-mono text-gray-600 dark:text-gray-400">Parslet::Slice</td>
                  <td class="py-3 px-4 text-center text-green-600 dark:text-green-400">✅</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Parsanol::Slice compatible</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 font-mono text-gray-600 dark:text-gray-400">Parslet::Transform</td>
                  <td class="py-3 px-4 text-center text-green-600 dark:text-green-400">✅</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Tree transformation</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CodeTabs from '../components/molecules/CodeTabs.vue'
import DocsNav from '../components/organisms/DocsNav.vue'

const sliceExample = `# Using ZeroCopy + Slice for source position tracking
require 'parsanol'

class JsonParser < Parsanol::Parser
  rule(:string) { str('"') >> (str('"').absent? >> any).repeat >> str('"') }
  rule(:number) { match('[0-9]').repeat(1) }
  rule(:value) { string | number }
  root(:value)
end

parser = JsonParser.new

# Enable ZeroCopy + Slice mode
grammar_json = Parsanol::Native.serialize_grammar(parser.root)
result = Parsanol::Native.parse_to_objects(grammar_json, '42', slice: true)

# Result contains Slice objects with position info:
# {"value" => "42"@0}  # @0 shows byte offset

# Slice objects are compatible with Parslet::Slice
# You can access offset and length:
result.each do |key, slice|
  puts "#{key}: #{slice} at offset #{slice.offset}"
end`

const approach1Code = `# Approach 1: parslet-ruby (Baseline)
require 'parslet'

class JsonParser < Parslet::Parser
  rule(:string) { str('"') >> (str('"').absent? >> any).repeat >> str('"') }
  rule(:number) { match('[0-9]').repeat(1) }
  rule(:value) { string | number }
  root(:value)
end

parser = JsonParser.new
result = parser.parse('42')
# Speed: 1x (baseline) - 3036ms for 22KB EXPRESS schema`

const approach3Code = `# Approach 3: parsanol-native (Batch mode)
require 'parsanol'

class JsonParser < Parsanol::Parser
  use_rust_backend!  # Use Rust for parsing

  rule(:string) { str('"') >> (str('"').absent? >> any).repeat >> str('"') }
  rule(:number) { match('[0-9]').repeat(1) }
  rule(:value) { string | number }
  root(:value)
end

parser = JsonParser.new
result = parser.parse('42')
# Speed: ~20x faster - 153ms for 22KB EXPRESS schema
# AST is transferred via u64 array and reconstructed in Ruby`

const approach5Code = `# Approach 5: ZeroCopy + Slice (Recommended)
require 'parsanol'

class JsonParser < Parsanol::Parser
  rule(:string) { str('"') >> (str('"').absent? >> any).repeat >> str('"') }
  rule(:number) { match('[0-9]').repeat(1) }
  rule(:value) { string | number }
  root(:value)
end

parser = JsonParser.new

# Serialize grammar and use ZeroCopy + Slice mode
grammar_json = Parsanol::Native.serialize_grammar(parser.root)
result = Parsanol::Native.parse_to_objects(grammar_json, '42', slice: true)

# Speed: ~29x faster - 106ms for 22KB EXPRESS schema
# Everything in Rust, zero-copy with source positions

# Slice objects preserve source positions:
# {"value" => "42"@0}  # @0 is the byte offset

# Perfect for linters, IDEs, and Expressir`

const migrationCode = `# BEFORE: Using original Parslet
require 'parslet'

class MyParser < Parslet::Parser
  rule(:number) { match('[0-9]').repeat(1) }
  root(:number)
end

# ============================================

# AFTER: Using Parsanol with Parslet compatibility
# Just change the require statement!
require 'parsanol/parslet'  # <- Only change needed

class MyParser < Parsanol::Parslet::Parser
  rule(:number) { match('[0-9]').repeat(1) }
  root(:number)
end

parser = MyParser.new
result = parser.parse('42')  # 28x faster with Rust backend!`
</script>
