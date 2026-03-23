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

        <!-- Unified API Banner -->
        <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
          <h3 class="text-blue-800 dark:text-blue-200 font-semibold mb-2">✨ Unified parse() API</h3>
          <p class="text-blue-700 dark:text-blue-300 text-sm">
            One method replaces five confusing options. The unified <code class="bg-blue-100 dark:bg-blue-800 px-1 rounded">parse()</code> API is simpler and more intuitive:
          </p>
          <div class="mt-3 bg-gray-900 dark:bg-gray-950 rounded p-3">
            <pre class="text-xs text-gray-100 overflow-x-auto"># Before 0.4.0 - Too many options!
parse_parslet(g, i)
parse_parslet_with_positions(g, i, cache)
parse_with_transform(g, i, cache)
parse_to_objects(g, i, map)
parse_raw(atom, i)

# After 0.4.0 - One method to rule them all
result = Parsanol::Native.parse(grammar, input)</pre>
          </div>
        </div>

        <!-- Key Change Banner -->
        <div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
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

        <!-- Ruby 4.0 Support Banner -->
        <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-12">
          <h3 class="text-yellow-800 dark:text-yellow-200 font-semibold mb-2">🚀 Ruby 4.0 Support (Coming Soon)</h3>
          <p class="text-yellow-700 dark:text-yellow-300 text-sm">
            Parsanol 0.4.1 will support Ruby 4.0 via <code class="bg-yellow-100 dark:bg-yellow-800 px-1 rounded">magnus 0.9.0</code>
            and <code class="bg-yellow-100 dark:bg-yellow-800 px-1 rounded">rb-sys</code> HEAD. These packages are not yet released.
            The workspace <code class="bg-yellow-100 dark:bg-yellow-800 px-1 rounded">Cargo.toml</code> patches rb-sys automatically for ABI compatibility.
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
                  <td class="py-3 px-4 text-right text-green-600 dark:text-green-400">~200-1300x</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Production use (RECOMMENDED)</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 font-medium text-green-600 dark:text-green-400">JSON</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Rust parsing, JSON output</td>
                  <td class="py-3 px-4 text-right text-green-600 dark:text-green-400">~200-1300x</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">APIs, serialization</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Benchmark Results</h3>

          <div class="card mb-6 overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Pattern Type</th>
                  <th class="text-right py-3 px-4 font-semibold text-gray-900 dark:text-white">Ruby (i/s)</th>
                  <th class="text-right py-3 px-4 font-semibold text-gray-900 dark:text-white">Native (i/s)</th>
                  <th class="text-right py-3 px-4 font-semibold text-gray-900 dark:text-white">Speedup</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Simple string</td>
                  <td class="py-3 px-4 text-right text-gray-600 dark:text-gray-400">~575</td>
                  <td class="py-3 px-4 text-right text-green-600 dark:text-green-400">~775,000</td>
                  <td class="py-3 px-4 text-right font-semibold text-green-600 dark:text-green-400">1,340x</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Sequence (3 parts)</td>
                  <td class="py-3 px-4 text-right text-gray-600 dark:text-gray-400">~580</td>
                  <td class="py-3 px-4 text-right text-green-600 dark:text-green-400">~530,000</td>
                  <td class="py-3 px-4 text-right font-semibold text-green-600 dark:text-green-400">910x</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Named capture</td>
                  <td class="py-3 px-4 text-right text-gray-600 dark:text-gray-400">~575</td>
                  <td class="py-3 px-4 text-right text-green-600 dark:text-green-400">~510,000</td>
                  <td class="py-3 px-4 text-right font-semibold text-green-600 dark:text-green-400">880x</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Repetition (unnamed)</td>
                  <td class="py-3 px-4 text-right text-gray-600 dark:text-gray-400">~560</td>
                  <td class="py-3 px-4 text-right text-green-600 dark:text-green-400">~720,000</td>
                  <td class="py-3 px-4 text-right font-semibold text-green-600 dark:text-green-400">1,280x</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Alternative</td>
                  <td class="py-3 px-4 text-right text-gray-600 dark:text-gray-400">~575</td>
                  <td class="py-3 px-4 text-right text-green-600 dark:text-green-400">~720,000</td>
                  <td class="py-3 px-4 text-right font-semibold text-green-600 dark:text-green-400">1,250x</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Calculator expression</td>
                  <td class="py-3 px-4 text-right text-gray-600 dark:text-gray-400">~570</td>
                  <td class="py-3 px-4 text-right text-green-600 dark:text-green-400">~180,000</td>
                  <td class="py-3 px-4 text-right font-semibold text-green-600 dark:text-green-400">315x</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Repetition (named)</td>
                  <td class="py-3 px-4 text-right text-gray-600 dark:text-gray-400">~575</td>
                  <td class="py-3 px-4 text-right text-green-600 dark:text-green-400">~125,000</td>
                  <td class="py-3 px-4 text-right font-semibold text-orange-600 dark:text-orange-400">220x</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p class="text-gray-600 dark:text-gray-400 mb-4 text-sm">
            Speedup varies by pattern complexity. Simple patterns show highest speedups (1000-1300x),
            while patterns with named repetitions show lower speedups (200-400x) due to transformation overhead.
          </p>
        </section>

        <!-- Batch Parsing Mode -->
        <section id="batch-mode" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Batch Parsing Mode</h2>

          <p class="text-gray-600 dark:text-gray-400 mb-6">
            Batch mode supports tagged AST nodes to preserve repetition and sequence semantics across the FFI boundary.
            Tags like <code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">:repetition</code> and <code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">:sequence</code>
            mark nodes for proper Ruby transformation.
          </p>

          <div class="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 mb-6">
            <h3 class="text-purple-800 dark:text-purple-200 font-semibold mb-2">🎯 When to Use Batch Mode</h3>
            <p class="text-purple-700 dark:text-purple-300 text-sm">
              Batch mode is ideal when you need correct Parslet-compatible semantics for complex grammars with
              repetition patterns. It preserves the distinction between true repetitions and wrapper patterns.
            </p>
          </div>

          <div class="card mb-6">
            <pre class="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
# Batch mode with tagged AST nodes
result = Parsanol::Native.parse_batch(grammar, input)

# Results preserve :repetition and :sequence tags
# This enables correct Ruby transformation for complex patterns</pre>
          </div>

          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Pattern Detection</h3>

          <div class="card mb-6 overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Pattern</th>
                  <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Example</th>
                  <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Result</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">True Repetition</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400"><code>[{x:1}, {x:2}]</code></td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Array of hashes</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Wrapper Pattern</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400"><code>{x: {y:1}, z:2}</code></td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Single hash</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Duplicate Labels</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400"><code>[{a:{x:1}}, {a:{y:2}}]</code></td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Last value wins</td>
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

          <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
            <h4 class="text-blue-800 dark:text-blue-200 font-semibold mb-2">⚡ Lazy Line/Column</h4>
            <p class="text-blue-700 dark:text-blue-300 text-sm">
              <code class="bg-blue-100 dark:bg-blue-800 px-1 rounded">line_and_column</code> is computed lazily and cached.
              This means <strong>zero overhead</strong> if you don't need position info,
              but it's <strong>always available</strong> when you do.
            </p>
          </div>

          <div class="card mb-6">
            <pre class="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
class Parsanol::Slice
  # Core attributes (always available, zero cost)
  def content       # String content
  def offset        # Byte offset in original input
  def length        # Length of the slice

  # Lazy computation (computed on first access, then cached)
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

SPEED: 1x (baseline) - 425s (SRL benchmark)
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

SPEED: ~200-1300x faster depending on pattern complexity
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

SPEED: ~200-1300x faster depending on pattern complexity
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
            For maximum performance (~200-1300x faster than pure Ruby), use the ZeroCopy interface
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

        <!-- Streaming Parser -->
        <section id="streaming" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Streaming Parser
          </h2>

          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Parse large files without loading them entirely into memory. The streaming parser
            processes input in configurable chunks with a sliding window for backtracking support.
          </p>

          <div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
            <p class="text-green-800 dark:text-green-200 text-sm">
              <strong>Use streaming when:</strong> Files are larger than available memory, or input arrives
              incrementally (network streams, pipes).
            </p>
          </div>

          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Basic Usage</h3>

          <div class="card mb-6">
            <pre class="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
require 'parsanol/streaming'

# Configure chunk size and backtracking window
config = Parsanol::Streaming::ChunkConfig.new(
  chunk_size: 64 * 1024,  # 64 KB chunks
  window_size: 3          # Keep 3 chunks for backtracking
)

# Parse from a file
parser = Parsanol::StreamingParser.new(grammar, config)
result = parser.parse_from_file('large_file.json')

# Parse from any IO object
result = parser.parse_from_io(socket, config)
            </pre>
          </div>

          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3 mt-8">With Captures</h3>

          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Captures work with streaming and persist across chunk boundaries:
          </p>

          <div class="card mb-6">
            <pre class="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
# Define grammar with captures
class LogParser < Parsanol::Parser
  rule(:ip) { match('\d').repeat(1,3) >> str('.') >> match('\d').repeat(1,3) >> str('.') >> match('\d').repeat(1,3) >> str('.') >> match('\d').repeat(1,3) }
  rule(:log_line) { capture(:ip, ip) >> str(' ') >> capture(:status, match('\d').repeat(3)) }
  root(:log_line)
end

# Parse large log file with streaming
config = Parsanol::Streaming::ChunkConfig.new(chunk_size: 1024 * 1024, window_size: 2)
parser = Parsanol::StreamingParser.new(LogParser.new.grammar, config)

result = parser.parse_from_file('access.log')
# Access captures from streaming parse
result.captures[:ip].each { |ip| puts ip }
            </pre>
          </div>

          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3 mt-8">StreamingBuilder Callbacks</h3>

          <p class="text-gray-600 dark:text-gray-400 mb-4">
            For maximum performance, use <code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">Parsanol::BuilderCallbacks</code>
            to receive parse events directly without intermediate AST construction:
          </p>

          <div class="card mb-6">
            <pre class="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
class MyBuilder
  include Parsanol::BuilderCallbacks

  def on_rule(name, start_pos, end_pos)
    puts "Rule #{name} at #{start_pos}..#{end_pos}"
  end

  def on_capture(name, value)
    puts "Captured #{name}: #{value}"
  end
end

builder = MyBuilder.new
parser.parse_from_file('large.json', builder: builder)
            </pre>
          </div>

          <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <p class="text-yellow-800 dark:text-yellow-200 text-sm">
              <strong>Limitations:</strong> Backtracking is limited to the window size. Some grammars may require
              larger windows. The current implementation collects chunks into memory before parsing.
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
                <tr>
                  <td class="py-3 px-4 font-mono text-gray-600 dark:text-gray-400">.capture(:name)</td>
                  <td class="py-3 px-4 text-center text-green-600 dark:text-green-400">✅</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Named capture extraction <span class="px-2 py-0.5 text-xs rounded bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 ml-2">NEW</span></td>
                </tr>
                <tr>
                  <td class="py-3 px-4 font-mono text-gray-600 dark:text-gray-400">scope { ... }</td>
                  <td class="py-3 px-4 text-center text-green-600 dark:text-green-400">✅</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Isolated capture context <span class="px-2 py-0.5 text-xs rounded bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 ml-2">NEW</span></td>
                </tr>
                <tr>
                  <td class="py-3 px-4 font-mono text-gray-600 dark:text-gray-400">dynamic { |ctx| ... }</td>
                  <td class="py-3 px-4 text-center text-green-600 dark:text-green-400">✅</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Runtime-determined parsing <span class="px-2 py-0.5 text-xs rounded bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 ml-2">NEW</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-6">
            <p class="text-blue-800 dark:text-blue-200 text-sm">
              <strong>New in 1.1.0:</strong> The <code class="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">capture</code>,
              <code class="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">scope</code>, and
              <code class="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">dynamic</code> atoms are now
              available in Ruby with full FFI support. See the
              <router-link to="/guides/captures" class="text-blue-600 dark:text-blue-400 hover:underline">Captures Guide</router-link>
              for details.
            </p>
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
# Speed: 1x (baseline) - 425s for SRL benchmark (179K lines)
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

# Speed: ~200-1300x faster depending on pattern
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
result = parser.parse('42')  # ~200-1300x faster with Rust backend!

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
