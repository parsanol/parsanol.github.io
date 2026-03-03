<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="flex gap-12">
      <div class="w-64 flex-shrink-0 hidden lg:block">
        <div class="sticky top-20 h-[calc(100vh-6rem)] overflow-y-auto">
          <DocsNav :show-sections="['docs']" />
        </div>
      </div>

      <div class="flex-1 min-w-0">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">Migrating from Parslet</h1>

        <p class="text-gray-600 dark:text-gray-400 mb-8">
          This guide helps you migrate your existing Parslet parsers to Parsanol, taking advantage of native performance while maintaining API compatibility.
        </p>

        <!-- Quick Start -->
        <section class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Quick Migration</h2>

          <div class="bg-gray-900 dark:bg-gray-950 rounded-lg p-6 mb-4">
            <p class="text-xs text-gray-400 mb-2">Step 1: Update your Gemfile</p>
            <pre class="text-sm text-gray-100 overflow-x-auto"># Replace Parslet with Parsanol
-gem 'parslet'
+gem 'parsanol'</pre>
          </div>

          <div class="bg-gray-900 dark:bg-gray-950 rounded-lg p-6 mb-4">
            <p class="text-xs text-gray-400 mb-2">Step 2: Update your requires</p>
            <pre class="text-sm text-gray-100 overflow-x-auto"># Option A: Full Parslet compatibility (recommended for migration)
-require 'parslet'
+require 'parsanol/parslet'

# Option B: Native Parsanol API (for new code)
require 'parsanol'</pre>
          </div>

          <div class="bg-gray-900 dark:bg-gray-950 rounded-lg p-6">
            <p class="text-xs text-gray-400 mb-2">Step 3: Update class inheritance</p>
            <pre class="text-sm text-gray-100 overflow-x-auto"># With parsanol/parslet compatibility layer, no changes needed!
class MyParser &lt; Parslet::Parser
  # Your existing code works as-is
end

# Or use native Parsanol namespace:
class MyParser &lt; Parsanol::Parser
  # Same API, better performance
end</pre>
          </div>
        </section>

        <!-- API Compatibility -->
        <section class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">API Compatibility</h2>

          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Parsanol provides a compatibility layer that implements most of the Parslet API. Here's what's supported:
          </p>

          <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead class="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Feature</th>
                  <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Notes</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td class="px-4 py-3 text-sm text-gray-900 dark:text-white"><code>str()</code>, <code>match()</code>, <code>any</code></td>
                  <td class="px-4 py-3 text-sm text-center text-green-600 dark:text-green-400">✓</td>
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Full support</td>
                </tr>
                <tr class="bg-gray-50 dark:bg-gray-800">
                  <td class="px-4 py-3 text-sm text-gray-900 dark:text-white"><code>&gt;&gt;</code> (sequence), <code>|</code> (choice)</td>
                  <td class="px-4 py-3 text-sm text-center text-green-600 dark:text-green-400">✓</td>
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Full support</td>
                </tr>
                <tr>
                  <td class="px-4 py-3 text-sm text-gray-900 dark:text-white"><code>.repeat</code>, <code>.maybe</code>, <code>.as()</code></td>
                  <td class="px-4 py-3 text-sm text-center text-green-600 dark:text-green-400">✓</td>
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Full support</td>
                </tr>
                <tr class="bg-gray-50 dark:bg-gray-800">
                  <td class="px-4 py-3 text-sm text-gray-900 dark:text-white"><code>.absent?</code>, <code>.present?</code></td>
                  <td class="px-4 py-3 text-sm text-center text-green-600 dark:text-green-400">✓</td>
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Lookahead</td>
                </tr>
                <tr>
                  <td class="px-4 py-3 text-sm text-gray-900 dark:text-white"><code>Parslet::Transform</code></td>
                  <td class="px-4 py-3 text-sm text-center text-green-600 dark:text-green-400">✓</td>
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Full support (Ruby-side)</td>
                </tr>
                <tr class="bg-gray-50 dark:bg-gray-800">
                  <td class="px-4 py-3 text-sm text-gray-900 dark:text-white"><code>.capture</code>, <code>scope</code></td>
                  <td class="px-4 py-3 text-sm text-center text-yellow-600 dark:text-yellow-400">~</td>
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Ruby-side only</td>
                </tr>
                <tr>
                  <td class="px-4 py-3 text-sm text-gray-900 dark:text-white"><code>dynamic</code> blocks</td>
                  <td class="px-4 py-3 text-sm text-center text-yellow-600 dark:text-yellow-400">~</td>
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Ruby-side only</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- New Features -->
        <section class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">New Features in Parsanol</h2>

          <p class="text-gray-600 dark:text-gray-400 mb-4">
            After migrating, you can take advantage of Parsanol-exclusive features:
          </p>

          <div class="space-y-4">
            <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 class="text-md font-semibold text-gray-900 dark:text-white mb-2">Cut Operator</h3>
              <div class="bg-gray-900 dark:bg-gray-950 rounded p-3 mb-3">
                <pre class="text-sm text-gray-100"># Prevents backtracking for O(1) space complexity
rule(:stmt) { if_stmt.cut | while_stmt.cut | expr }</pre>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Prevents backtracking after a choice is made, improving memory usage for complex grammars.
              </p>
            </div>

            <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 class="text-md font-semibold text-gray-900 dark:text-white mb-2">Streaming Parser</h3>
              <div class="bg-gray-900 dark:bg-gray-950 rounded p-3 mb-3">
                <pre class="text-sm text-gray-100"># Parse large files without loading into memory
parser.parse_stream(File.open('large.csv')) do |row|
  process_row(row)
end</pre>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Process large files chunk-by-chunk instead of loading everything into memory.
              </p>
            </div>

            <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 class="text-md font-semibold text-gray-900 dark:text-white mb-2">Incremental Parsing</h3>
              <div class="bg-gray-900 dark:bg-gray-950 rounded p-3 mb-3">
                <pre class="text-sm text-gray-100"># Reparse only changed portions (for editors)
parser.apply_edit(position, length, new_text)
result = parser.reparse  # Fast incremental update</pre>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Update parse results when the input changes without reparsing everything.
              </p>
            </div>
          </div>
        </section>

        <!-- Common Patterns -->
        <section class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Common Migration Patterns</h2>

          <div class="space-y-6">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Pattern: String Parsing</h3>
              <div class="bg-gray-900 dark:bg-gray-950 rounded p-4">
                <p class="text-xs text-gray-400 mb-2">Parslet (before)</p>
                <pre class="text-sm text-gray-100 mb-4">require 'parslet'
class StringParser &lt; Parslet::Parser
  rule(:string) { str('"') &gt;&gt; (str('\\') &gt;&gt; any | str('"').absent? &gt;&gt; any).repeat &gt;&gt; str('"') }
end</pre>
                <p class="text-xs text-gray-400 mb-2">Parsanol (after - no changes needed!)</p>
                <pre class="text-sm text-green-400">require 'parsanol/parslet'
class StringParser &lt; Parslet::Parser  # Same code, 35x faster!
  rule(:string) { str('"') &gt;&gt; (str('\\') &gt;&gt; any | str('"').absent? &gt;&gt; any).repeat &gt;&gt; str('"') }
end</pre>
              </div>
            </div>

            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Pattern: Transform</h3>
              <div class="bg-gray-900 dark:bg-gray-950 rounded p-4">
                <p class="text-xs text-gray-400 mb-2">Transforms work identically</p>
                <pre class="text-sm text-gray-100">class MyTransform &lt; Parslet::Transform
  rule(int: simple(:n)) { Integer(n) }
  rule(left: simple(:l), op: simple('+'), right: simple(:r)) { l + r }
end

# Usage is the same:
tree = parser.parse(input)
result = MyTransform.new.apply(tree)</pre>
              </div>
            </div>
          </div>
        </section>

        <!-- Troubleshooting -->
        <section class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Troubleshooting</h2>

          <div class="space-y-4">
            <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <h3 class="text-md font-semibold text-yellow-700 dark:text-yellow-300 mb-2">"uninitialized constant Parslet"</h3>
              <p class="text-sm text-yellow-600 dark:text-yellow-400">
                Make sure you're requiring <code>parsanol/parslet</code>, not just <code>parsanol</code>.
              </p>
            </div>

            <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <h3 class="text-md font-semibold text-yellow-700 dark:text-yellow-300 mb-2">Capture/Scope not working</h3>
              <p class="text-sm text-yellow-600 dark:text-yellow-400">
                These features run in Ruby and may have slight behavioral differences. Check the Ruby-only examples for guidance.
              </p>
            </div>

            <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <h3 class="text-md font-semibold text-yellow-700 dark:text-yellow-300 mb-2">Native extension not loading</h3>
              <p class="text-sm text-yellow-600 dark:text-yellow-400">
                Run <code>bundle exec rake compile</code> to build the native extension. Requires Rust toolchain.
              </p>
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
