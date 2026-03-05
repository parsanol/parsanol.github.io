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
          Parsanol offers 3 parsing modes for Ruby. All modes return <code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">Slice</code> objects with position information by default.
        </p>

        <!-- Key Change Banner -->
        <div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-12">
          <h3 class="text-green-800 dark:text-green-200 font-semibold mb-2">✨ Position Info is Now Default</h3>
          <p class="text-green-700 dark:text-green-300 text-sm">
            All parse methods now return <code class="bg-green-100 dark:bg-green-800 px-1 rounded">Parsanol::Slice</code> objects
            with <code class="bg-green-100 dark:bg-green-800 px-1 rounded">offset</code>,
            <code class="bg-green-100 dark:bg-green-800 px-1 rounded">length</code>,
            <code class="bg-green-100 dark:bg-green-800 px-1 rounded">line</code>, and
            <code class="bg-green-100 dark:bg-green-800 px-1 rounded">column</code>.
            No special options needed!
          </p>
        </div>

        <!-- The 3 Modes -->
        <section id="three-modes" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">The 3 Parsing Modes</h2>

          <p class="text-gray-600 dark:text-gray-400 mb-6">
            All modes return Slice objects with position info. Choose based on your output format needs.
          </p>

          <div class="card mb-8 overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Mode</th>
                  <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Description</th>
                  <th class="text-right py-3 px-4 font-semibold text-gray-900 dark:text-white">Speed</th>
                  <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Best For</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td class="py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Ruby</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Pure Ruby parsing</td>
                  <td class="py-3 px-4 text-right text-gray-600 dark:text-gray-400">1x</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Debugging, prototyping</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 font-medium text-green-600 dark:text-green-400">Native</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Rust parsing, Slice objects</td>
                  <td class="py-3 px-4 text-right text-green-600 dark:text-green-400">~20x</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Production use (RECOMMENDED)</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 font-medium text-green-600 dark:text-green-400">JSON</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Rust parsing, JSON output</td>
                  <td class="py-3 px-4 text-right text-green-600 dark:text-green-400">~20x</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">APIs, serialization</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- Slice Feature -->
        <section id="slice-feature" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Slice Objects</h2>

          <p class="text-gray-600 dark:text-gray-400 mb-6">
            All parse results contain <code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">Parsanol::Slice</code> objects
            that preserve source position information:
          </p>

          <div class="card mb-6">
            <pre class="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
# Parse result
result = parser.parse("SCHEMA test;", mode: :native)
# => {:name => "test"@7}  # @7 shows byte offset

# Access the slice
slice = result[:name]
slice.to_s            # => "test" (string content)
slice.offset          # => 7 (byte position)
slice.length          # => 4
slice.line_and_column # => [1, 8] (line, column - 1-indexed)

# String comparison works
slice == "test"       # => true

# Extract from original source
slice.extract_from(input)  # => "test"
            </pre>
          </div>

          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Slice API</h3>

          <div class="card mb-6">
            <pre class="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
class Parsanol::Slice
  # Core attributes
  def content       # String content
  def offset        # Byte offset in original input
  def length        # Length of the slice
  def line_and_column  # [line, column] tuple (1-indexed)

  # String compatibility
  def to_s          # Returns content
  def to_str        # Implicit string conversion
  def ==(other)     # Compares content with String or Slice

  # JSON serialization
  def to_json       # Returns { "value" => ..., "offset" => ..., ... }
  def as_json       # Returns hash with position info

  # Utility
  def to_span       # Returns SourceSpan object
  def extract_from(input)  # Extracts content from original input
end
            </pre>
          </div>

          <div class="grid md:grid-cols-4 gap-4 mb-6">
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
            <div class="card">
              <h3 class="font-medium text-gray-900 dark:text-white mb-2">Comment Attachment</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm">Attach remarks by position</p>
            </div>
          </div>

          <CodeTabs :ruby="sliceExample" />
        </section>

        <!-- Mode 1: Ruby -->
        <section id="mode-ruby" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Mode: Ruby (Baseline)
          </h2>

          <div class="card mb-6">
            <pre class="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   INPUT     │     │  PARSANOL   │     │   OUTPUT    │
│   String    │────▶│  (Ruby)     │────▶│Slice Objects│
└─────────────┘     └─────────────┘     └─────────────┘
                          │
                    SLOW parsing
                    Pure Ruby

SPEED: 1x (baseline) - 3036ms
            </pre>
          </div>

          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Pure Ruby parsing. Use for debugging grammar issues or prototyping.
          </p>

          <CodeTabs :ruby="modeRubyCode" />
        </section>

        <!-- Mode: Native (Recommended) -->
        <section id="mode-native" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Mode: Native (Recommended)
          </h2>

          <div class="card mb-6">
            <pre class="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   INPUT     │     │  PARSANOL   │     │   OUTPUT    │
│   String    │────▶│  (Rust)     │────▶│Slice Objects│
└─────────────┘     └─────────────┘     └─────────────┘
                          │
                    FAST parsing
                    Position tracking included

SPEED: ~20x faster - 153ms
FEATURES: Slice objects with offset, length, line, column
            </pre>
          </div>

          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Rust parsing with Slice objects. <strong>Recommended for production use.</strong>
            Position info is included by default - no special options needed.
          </p>

          <CodeTabs :ruby="modeNativeCode" />
        </section>

        <!-- Mode: JSON -->
        <section id="mode-json" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Mode: JSON
          </h2>

          <div class="card mb-6">
            <pre class="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   INPUT     │     │  PARSANOL   │     │   OUTPUT    │
│   String    │────▶│  (Rust)     │────▶│JSON + Pos   │
└─────────────┘     └─────────────┘     └─────────────┘
                          │
                    FAST parsing
                    Position inline in JSON

SPEED: ~20x faster
FORMAT: {"value": "hello", "offset": 0, "length": 5, ...}
            </pre>
          </div>

          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Rust parsing with JSON output. Position info is included inline.
            Perfect for APIs and cross-language interoperability.
          </p>

          <CodeTabs :ruby="modeJsonCode" />
        </section>

        <!-- When to Use Which -->
        <section id="when-to-use" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            When to Use Which Mode
          </h2>

          <div class="grid md:grid-cols-3 gap-6 mb-8">
            <div class="card">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Use Ruby mode when:
              </h3>
              <ul class="text-gray-600 dark:text-gray-400 text-sm space-y-2">
                <li>• Debugging grammar issues</li>
                <li>• Prototyping new parsers</li>
                <li>• No Rust extension available</li>
              </ul>
            </div>

            <div class="card border-green-500 dark:border-green-400">
              <h3 class="text-lg font-semibold text-green-600 dark:text-green-400 mb-3">
                Use Native mode when: (RECOMMENDED)
              </h3>
              <ul class="text-gray-600 dark:text-gray-400 text-sm space-y-2">
                <li>• Production use</li>
                <li>• Need Ruby objects with position</li>
                <li>• Building linters, IDEs, Expressir</li>
                <li>• Want maximum performance</li>
              </ul>
            </div>

            <div class="card">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Use JSON mode when:
              </h3>
              <ul class="text-gray-600 dark:text-gray-400 text-sm space-y-2">
                <li>• Building APIs</li>
                <li>• Serializing parse results</li>
                <li>• Cross-language interoperability</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- ZeroCopy Interface -->
        <section id="zerocopy" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            ZeroCopy Interface (Low-Level API)
          </h2>

          <p class="text-gray-600 dark:text-gray-400 mb-6">
            For maximum performance (~29x faster than pure Ruby), use the ZeroCopy interface
            which bypasses Ruby transformation overhead. This is a separate low-level API from
            the 3 parse modes above.
          </p>

          <div class="card mb-6 overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Method</th>
                  <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Keys</th>
                  <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Values</th>
                  <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Use Case</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:border-gray-700">
                <tr>
                  <td class="py-3 px-4 font-mono text-gray-600 dark:text-gray-400">parse_to_ruby_objects</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">String</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Slice</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Low-level, direct from Rust</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 font-mono text-gray-600 dark:text-gray-400">Parsanol::ZeroCopy</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Ruby objects</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Ruby objects</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Maximum performance</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            When to Use Parse Modes vs ZeroCopy
          </h3>

          <div class="card mb-6 overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Your Need</th>
                  <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Use This</th>
                  <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Why</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Building an API</td>
                  <td class="py-3 px-4 text-green-600 dark:text-green-400">JSON mode (<code>:json</code>)</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Direct JSON serialization</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Building a linter/IDE</td>
                  <td class="py-3 px-4 text-green-600 dark:text-green-400">Native mode (<code>:native</code>)</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Position info for errors</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Need position info</td>
                  <td class="py-3 px-4 text-green-600 dark:text-green-400">Parse Modes (not ZeroCopy)</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">ZeroCopy skips position tracking</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">High-throughput parsing</td>
                  <td class="py-3 px-4 text-orange-600 dark:text-orange-400">ZeroCopy</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Maximum performance</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Type-safe AST with methods</td>
                  <td class="py-3 px-4 text-orange-600 dark:text-orange-400">ZeroCopy</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Direct typed objects</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Example: Calculator with Direct Object Construction
          </h3>

          <CodeTabs :ruby="zerocopyCode" />

          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 mt-8">
            Low-Level: parse_to_ruby_objects
          </h3>

          <p class="text-gray-600 dark:text-gray-400 mb-4">
            When you don't need typed objects, use <code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">parse_to_ruby_objects</code>
            for direct Slice access with String keys:
          </p>

          <CodeTabs :ruby="zerocopyLowlevelCode" />

          <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mt-6">
            <p class="text-yellow-800 dark:text-yellow-200 text-sm">
              <strong>Requirements:</strong> ZeroCopy requires (1) native extension via <code class="bg-yellow-100 dark:bg-yellow-800 px-2 py-1 rounded">rake compile</code>,
              (2) <code class="bg-yellow-100 dark:bg-yellow-800 px-2 py-1 rounded">output_types</code> mapping in your parser,
              and (3) Ruby classes with matching constructors.
            </p>
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

const sliceExample = `# All parse methods return Slice objects with position info
require 'parsanol'

class JsonParser < Parsanol::Parser
  rule(:string) { str('"') >> (str('"').absent? >> any).repeat >> str('"') }
  rule(:number) { match('[0-9]').repeat(1) }
  rule(:value) { string | number }
  root(:value)
end

parser = JsonParser.new

# Native mode - returns Slice objects with position info
result = parser.parse('42', mode: :native)

# Access the slice
result.each do |key, slice|
  puts "#{key}: #{slice.to_s} at offset #{slice.offset}"
  puts "  Line/Column: #{slice.line_and_column}"
end`

const modeRubyCode = `# Mode: Ruby (Pure Ruby parsing)
require 'parsanol'

class JsonParser < Parsanol::Parser
  rule(:string) { str('"') >> (str('"').absent? >> any).repeat >> str('"') }
  rule(:number) { match('[0-9]').repeat(1) }
  rule(:value) { string | number }
  root(:value)
end

parser = JsonParser.new
result = parser.parse('42', mode: :ruby)
# Speed: 1x (baseline) - 3036ms for 22KB EXPRESS schema
# Returns Slice objects with position info`

const modeNativeCode = `# Mode: Native (Recommended)
require 'parsanol'

class JsonParser < Parsanol::Parser
  rule(:string) { str('"') >> (str('"').absent? >> any).repeat >> str('"') }
  rule(:number) { match('[0-9]').repeat(1) }
  rule(:value) { string | number }
  root(:value)
end

parser = JsonParser.new

# Just use mode: :native - position info is included!
result = parser.parse('42', mode: :native)

# Speed: ~20x faster - 153ms for 22KB EXPRESS schema
# Returns Slice objects with position info

# Access position info
result[:value].offset          # => 0
result[:value].line_and_column # => [1, 1]`

const modeJsonCode = `# Mode: JSON (for APIs and serialization)
require 'parsanol'

class JsonParser < Parsanol::Parser
  rule(:string) { str('"') >> (str('"').absent? >> any).repeat >> str('"') }
  rule(:number) { match('[0-9]').repeat(1) }
  rule(:value) { string | number }
  root(:value)
end

parser = JsonParser.new

# JSON mode - returns JSON with position inline
result = parser.parse('42', mode: :json)

# Result format:
# {
#   "value": {
#     "value": "42",
#     "offset": 0,
#     "length": 2,
#     "line": 1,
#     "column": 1
#   }
# }

# Perfect for APIs and cross-language use`

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
result = parser.parse('42')  # 20x faster with Rust backend!

# Position info is included by default
result.offset  # => 0
result.line_and_column  # => [1, 1]`

const zerocopyLowlevelCode = `# Low-Level ZeroCopy: parse_to_ruby_objects
require 'parsanol'

# When you don't need typed objects, use parse_to_ruby_objects
# This gives you direct Slice access with String keys
class SimpleParser < Parsanol::Parser
  rule(:word) { match('[a-z]').repeat(1).as(:name) }
  rule(:number) { match('[0-9]').repeat(1).as(:value) }
  root(:word)
end

parser = SimpleParser.new

# Serialize grammar once (cache this!)
grammar = Parsanol::Native.serialize_grammar(parser.root)

# Parse with direct FFI - String keys, Slice values
result = Parsanol::Native.parse_to_ruby_objects(grammar, "hello")
# => { "name" => Slice("hello", offset: 0, length: 5) }

# Access position info directly
result["name"].offset    # => 0
result["name"].length    # => 5
result["name"].to_s      # => "hello"

# Use case: High-throughput batch parsing
inputs = ["hello", "world", "test"]
results = inputs.map { |input| Parsanol::Native.parse_to_ruby_objects(grammar, input) }
# All results have String keys and Slice values with position info`
</script>
