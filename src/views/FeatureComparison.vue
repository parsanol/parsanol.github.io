<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="flex gap-12">
      <div class="w-64 flex-shrink-0 hidden lg:block">
        <div class="sticky top-20 h-[calc(100vh-6rem)] overflow-y-auto">
          <DocsNav :show-sections="['guides']" />
        </div>
      </div>

      <div class="flex-1 min-w-0">
        <router-link to="/introduction" class="text-primary-600 dark:text-primary-400 hover:text-primary-700 mb-4 inline-flex items-center">
          <Icon name="chevron-right" class="w-4 h-4 rotate-180 mr-1" />
          Back to Documentation
        </router-link>

        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">Feature Comparison & Decision Guide</h1>

        <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Choose the right parsing approach for your use case. This guide compares Parsanol's features
          and helps you decide when to use each one.
        </p>

        <!-- Quick Reference -->
        <section class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Quick Reference</h2>

          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead class="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th class="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-white">I need to...</th>
                  <th class="px-4 py-3 text-center text-sm font-medium text-gray-900 dark:text-white">Feature</th>
                  <th class="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-white">Example</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Extract specific fields from input</td>
                  <td class="px-4 py-3 text-center">
                    <span class="px-2 py-1 text-xs font-medium rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">Captures</span>
                  </td>
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 font-mono">capture("email", ...)</td>
                </tr>
                <tr>
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Parse nested structures cleanly</td>
                  <td class="px-4 py-3 text-center">
                    <span class="px-2 py-1 text-xs font-medium rounded bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300">Scopes</span>
                  </td>
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 font-mono">scope(inner_parser)</td>
                </tr>
                <tr>
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Change grammar based on context</td>
                  <td class="px-4 py-3 text-center">
                    <span class="px-2 py-1 text-xs font-medium rounded bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300">Dynamic</span>
                  </td>
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 font-mono">dynamic_with_id(id)</td>
                </tr>
                <tr>
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Process files larger than RAM</td>
                  <td class="px-4 py-3 text-center">
                    <span class="px-2 py-1 text-xs font-medium rounded bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">Streaming</span>
                  </td>
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 font-mono">StreamingParser::new(...)</td>
                </tr>
                <tr>
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Re-parse after small edits</td>
                  <td class="px-4 py-3 text-center">
                    <span class="px-2 py-1 text-xs font-medium rounded bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-300">Incremental</span>
                  </td>
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 font-mono">IncrementalParser::new(...)</td>
                </tr>
                <tr>
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Match heredocs / self-referencing</td>
                  <td class="px-4 py-3 text-center">
                    <span class="px-2 py-1 text-xs font-medium rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">Captures + Dynamic</span>
                  </td>
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 font-mono">capture + dynamic callback</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- Feature Deep Dive -->
        <section class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Feature Deep Dive</h2>

          <!-- Captures -->
          <div class="mb-8">
            <div class="flex items-center gap-3 mb-4">
              <span class="px-3 py-1 text-sm font-medium rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">Captures</span>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Named Value Extraction</h3>
            </div>
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <h4 class="font-medium text-gray-900 dark:text-white mb-2">Best For</h4>
                <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Extracting email parts (local@domain)</li>
                  <li>• Parsing log entries (IP, timestamp, status)</li>
                  <li>• Getting specific CSV/JSON fields</li>
                  <li>• URL parsing (protocol, host, path)</li>
                </ul>
              </div>
              <div>
                <h4 class="font-medium text-gray-900 dark:text-white mb-2">Avoid When</h4>
                <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• You need the full AST anyway</li>
                  <li>• Captures would duplicate AST info</li>
                  <li>• Parsing deeply nested structures (use scopes)</li>
                </ul>
              </div>
            </div>
            <div class="mt-4 bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
              <div class="flex justify-between text-sm mb-2">
                <span class="text-gray-600 dark:text-gray-400">Performance Overhead</span>
                <span class="font-medium text-green-600 dark:text-green-400">~5%</span>
              </div>
              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div class="bg-green-500 h-2 rounded-full" style="width: 5%"></div>
              </div>
            </div>
          </div>

          <!-- Scopes -->
          <div class="mb-8">
            <div class="flex items-center gap-3 mb-4">
              <span class="px-3 py-1 text-sm font-medium rounded-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300">Scopes</span>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Isolated Capture Contexts</h3>
            </div>
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <h4 class="font-medium text-gray-900 dark:text-white mb-2">Best For</h4>
                <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• INI/TOML config parsing (per-section isolation)</li>
                  <li>• Recursive descent parsing</li>
                  <li>• Nested language constructs</li>
                  <li>• Preventing capture name collisions</li>
                </ul>
              </div>
              <div>
                <h4 class="font-medium text-gray-900 dark:text-white mb-2">Avoid When</h4>
                <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• You need inner captures to persist</li>
                  <li>• No nested structures in your grammar</li>
                  <li>• Excessive nesting (performance impact)</li>
                </ul>
              </div>
            </div>
            <div class="mt-4 bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
              <div class="flex justify-between text-sm mb-2">
                <span class="text-gray-600 dark:text-gray-400">Performance Overhead</span>
                <span class="font-medium text-green-600 dark:text-green-400">~2% per level</span>
              </div>
              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div class="bg-green-500 h-2 rounded-full" style="width: 8%"></div>
              </div>
            </div>
          </div>

          <!-- Dynamic -->
          <div class="mb-8">
            <div class="flex items-center gap-3 mb-4">
              <span class="px-3 py-1 text-sm font-medium rounded-full bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300">Dynamic</span>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Runtime Grammar Selection</h3>
            </div>
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <h4 class="font-medium text-gray-900 dark:text-white mb-2">Best For</h4>
                <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Type-driven parsing (int vs str vs bool)</li>
                  <li>• Language keyword detection</li>
                  <li>• Heredoc delimiter matching</li>
                  <li>• Configuration-driven grammars</li>
                  <li>• Plugin/extensible parsers</li>
                </ul>
              </div>
              <div>
                <h4 class="font-medium text-gray-900 dark:text-white mb-2">Avoid When</h4>
                <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Pattern is static (use regular atoms)</li>
                  <li>• Callback does I/O (performance killer)</li>
                  <li>• Using Bytecode/Streaming with many dynamic atoms</li>
                </ul>
              </div>
            </div>
            <div class="mt-4 bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
              <div class="flex justify-between text-sm mb-2">
                <span class="text-gray-600 dark:text-gray-400">Performance Overhead (Packrat)</span>
                <span class="font-medium text-yellow-600 dark:text-yellow-400">~5-20%</span>
              </div>
              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div class="bg-yellow-500 h-2 rounded-full" style="width: 15%"></div>
              </div>
            </div>
          </div>

          <!-- Streaming -->
          <div class="mb-8">
            <div class="flex items-center gap-3 mb-4">
              <span class="px-3 py-1 text-sm font-medium rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">Streaming</span>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Memory-Bounded Parsing</h3>
            </div>
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <h4 class="font-medium text-gray-900 dark:text-white mb-2">Best For</h4>
                <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Files larger than available RAM</li>
                  <li>• Network streams / real-time feeds</li>
                  <li>• Log file analysis (10GB+)</li>
                  <li>• Database dump processing</li>
                </ul>
              </div>
              <div>
                <h4 class="font-medium text-gray-900 dark:text-white mb-2">Avoid When</h4>
                <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Input fits in memory (simpler to use regular parser)</li>
                  <li>• Heavy backtracking needed (large window required)</li>
                  <li>• Many dynamic atoms (fallback overhead)</li>
                </ul>
              </div>
            </div>
            <div class="mt-4 bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
              <div class="flex justify-between text-sm mb-2">
                <span class="text-gray-600 dark:text-gray-400">Memory Usage</span>
                <span class="font-medium text-green-600 dark:text-green-400">chunk_size × window_size</span>
              </div>
              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div class="bg-green-500 h-2 rounded-full" style="width: 10%"></div>
              </div>
            </div>
          </div>
        </section>

        <!-- Backend Selection -->
        <section class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Backend Selection Guide</h2>

          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead class="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th class="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-white">Scenario</th>
                  <th class="px-4 py-3 text-center text-sm font-medium text-gray-900 dark:text-white">Recommended Backend</th>
                  <th class="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-white">Reason</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">General purpose parsing</td>
                  <td class="px-4 py-3 text-center">
                    <span class="px-2 py-1 text-xs font-medium rounded bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300">Packrat</span>
                  </td>
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Best feature support, O(n) complexity</td>
                </tr>
                <tr>
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Heavy dynamic atom usage</td>
                  <td class="px-4 py-3 text-center">
                    <span class="px-2 py-1 text-xs font-medium rounded bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300">Packrat</span>
                  </td>
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Native support, no fallback overhead</td>
                </tr>
                <tr>
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Large file processing</td>
                  <td class="px-4 py-3 text-center">
                    <span class="px-2 py-1 text-xs font-medium rounded bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">Streaming</span>
                  </td>
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Bounded memory, chunk-based</td>
                </tr>
                <tr>
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Network / real-time feeds</td>
                  <td class="px-4 py-3 text-center">
                    <span class="px-2 py-1 text-xs font-medium rounded bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">Streaming</span>
                  </td>
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Process as data arrives</td>
                </tr>
                <tr>
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Grammar serialization</td>
                  <td class="px-4 py-3 text-center">
                    <span class="px-2 py-1 text-xs font-medium rounded bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-300">Bytecode</span>
                  </td>
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Compiled grammar, fast startup</td>
                </tr>
                <tr>
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Editor integration</td>
                  <td class="px-4 py-3 text-center">
                    <span class="px-2 py-1 text-xs font-medium rounded bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-300">Incremental</span>
                  </td>
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Cache invalidation, re-parse only changes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- Feature Compatibility Matrix -->
        <section class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Feature Compatibility Matrix</h2>

          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead class="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th class="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-white">Feature</th>
                  <th class="px-4 py-3 text-center text-sm font-medium text-gray-900 dark:text-white">Packrat</th>
                  <th class="px-4 py-3 text-center text-sm font-medium text-gray-900 dark:text-white">Bytecode</th>
                  <th class="px-4 py-3 text-center text-sm font-medium text-gray-900 dark:text-white">Streaming</th>
                  <th class="px-4 py-3 text-center text-sm font-medium text-gray-900 dark:text-white">Incremental</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td class="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">Capture Atoms</td>
                  <td class="px-4 py-3 text-center text-green-600 dark:text-green-400">✓ Full</td>
                  <td class="px-4 py-3 text-center text-green-600 dark:text-green-400">✓ Full</td>
                  <td class="px-4 py-3 text-center text-green-600 dark:text-green-400">✓ Full</td>
                  <td class="px-4 py-3 text-center text-green-600 dark:text-green-400">✓ Full</td>
                </tr>
                <tr>
                  <td class="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">Scope Atoms</td>
                  <td class="px-4 py-3 text-center text-green-600 dark:text-green-400">✓ Full</td>
                  <td class="px-4 py-3 text-center text-green-600 dark:text-green-400">✓ Full</td>
                  <td class="px-4 py-3 text-center text-green-600 dark:text-green-400">✓ Full</td>
                  <td class="px-4 py-3 text-center text-green-600 dark:text-green-400">✓ Full</td>
                </tr>
                <tr>
                  <td class="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">Dynamic Atoms</td>
                  <td class="px-4 py-3 text-center text-green-600 dark:text-green-400">✓ Full</td>
                  <td class="px-4 py-3 text-center text-yellow-600 dark:text-yellow-400">~ Fallback</td>
                  <td class="px-4 py-3 text-center text-yellow-600 dark:text-yellow-400">~ Fallback</td>
                  <td class="px-4 py-3 text-center text-yellow-600 dark:text-yellow-400">~ Fallback</td>
                </tr>
                <tr>
                  <td class="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">Streaming Parse</td>
                  <td class="px-4 py-3 text-center text-gray-400">-</td>
                  <td class="px-4 py-3 text-center text-gray-400">-</td>
                  <td class="px-4 py-3 text-center text-green-600 dark:text-green-400">✓ Native</td>
                  <td class="px-4 py-3 text-center text-gray-400">-</td>
                </tr>
                <tr>
                  <td class="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">Incremental Re-parse</td>
                  <td class="px-4 py-3 text-center text-gray-400">-</td>
                  <td class="px-4 py-3 text-center text-gray-400">-</td>
                  <td class="px-4 py-3 text-center text-gray-400">-</td>
                  <td class="px-4 py-3 text-center text-green-600 dark:text-green-400">✓ Native</td>
                </tr>
                <tr>
                  <td class="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">Transform DSL</td>
                  <td class="px-4 py-3 text-center text-green-600 dark:text-green-400">✓ Full</td>
                  <td class="px-4 py-3 text-center text-green-600 dark:text-green-400">✓ Full</td>
                  <td class="px-4 py-3 text-center text-green-600 dark:text-green-400">✓ Full</td>
                  <td class="px-4 py-3 text-center text-green-600 dark:text-green-400">✓ Full</td>
                </tr>
                <tr>
                  <td class="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">Rich Error Messages</td>
                  <td class="px-4 py-3 text-center text-green-600 dark:text-green-400">✓ Full</td>
                  <td class="px-4 py-3 text-center text-green-600 dark:text-green-400">✓ Full</td>
                  <td class="px-4 py-3 text-center text-green-600 dark:text-green-400">✓ Full</td>
                  <td class="px-4 py-3 text-center text-green-600 dark:text-green-400">✓ Full</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mt-4">
            <p class="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>Note:</strong> "Fallback" means the feature works but uses Packrat internally within the Bytecode/Streaming backend.
              This may impact performance if you have many dynamic atoms. For heavy dynamic usage, prefer the Packrat backend.
            </p>
          </div>
        </section>

        <!-- Common Patterns -->
        <section class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Common Patterns</h2>

          <div class="space-y-6">
            <!-- Pattern 1 -->
            <div class="card p-6">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Pattern: Email + URL Extraction</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">Extract structured data without building AST</p>
              <div class="flex gap-2 mb-3">
                <span class="px-2 py-1 text-xs font-medium rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">Captures</span>
                <span class="px-2 py-1 text-xs font-medium rounded bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300">Packrat</span>
              </div>
              <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto">
                <pre class="text-sm font-mono text-gray-800 dark:text-gray-200">// Just captures, no AST construction needed
let grammar = GrammarBuilder::new()
    .rule("email", capture("email", dynamic(re(r"[^@\s]+@[^@\s]+"))))
    .build();</pre>
              </div>
            </div>

            <!-- Pattern 2 -->
            <div class="card p-6">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Pattern: Config File with Sections</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">Parse INI-style config with isolated section captures</p>
              <div class="flex gap-2 mb-3">
                <span class="px-2 py-1 text-xs font-medium rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">Captures</span>
                <span class="px-2 py-1 text-xs font-medium rounded bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300">Scopes</span>
              </div>
              <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto">
                <pre class="text-sm font-mono text-gray-800 dark:text-gray-200">// Section name persists, key/values isolated per section
.rule("section", seq(vec![
    capture("section", ...),  // Persists
    scope(seq(vec![          // Isolated
        capture("key", ...),
        capture("value", ...),
    ])),
]))</pre>
              </div>
            </div>

            <!-- Pattern 3 -->
            <div class="card p-6">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Pattern: Large Log Analysis</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">Process 10GB+ logs with bounded memory</p>
              <div class="flex gap-2 mb-3">
                <span class="px-2 py-1 text-xs font-medium rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">Captures</span>
                <span class="px-2 py-1 text-xs font-medium rounded bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">Streaming</span>
              </div>
              <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto">
                <pre class="text-sm font-mono text-gray-800 dark:text-gray-200">// 1MB chunks, captures persist across streaming parse
let config = ChunkConfig { chunk_size: 1024 * 1024, window_size: 2 };
let result = parser.parse_from_reader(&mut file, &mut arena)?;
if let Some(captures) = &result.capture_state {
    // All IPs from 10GB file, ~2MB memory used
}</pre>
              </div>
            </div>

            <!-- Pattern 4 -->
            <div class="card p-6">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Pattern: Heredoc / Here-Document</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">Match delimiter at both ends of document</p>
              <div class="flex gap-2 mb-3">
                <span class="px-2 py-1 text-xs font-medium rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">Captures</span>
                <span class="px-2 py-1 text-xs font-medium rounded bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300">Dynamic</span>
              </div>
              <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto">
                <pre class="text-sm font-mono text-gray-800 dark:text-gray-200">// Capture delimiter, use dynamic to match at end
.rule("heredoc", seq(vec![
    dynamic(str("<<")),
    capture("delimiter", dynamic(re(r"[A-Z]+"))),  // EOF
    // ... content ...
    // Dynamic callback uses captured delimiter
    dynamic(dynamic_with_id(match_delimiter)),
]))</pre>
              </div>
            </div>
          </div>
        </section>

        <!-- Navigation -->
        <div class="flex justify-between items-center pt-8 border-t border-gray-200 dark:border-gray-700">
          <router-link to="/guides/captures" class="text-primary-600 dark:text-primary-400 hover:text-primary-700 flex items-center gap-2">
            <Icon name="chevron-right" class="w-4 h-4 rotate-180" />
            Captures, Scopes & Dynamic Guide
          </router-link>
          <router-link to="/backends" class="text-primary-600 dark:text-primary-400 hover:text-primary-700 flex items-center gap-2">
            Backend Comparison
            <Icon name="chevron-right" class="w-4 h-4" />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from '../components/atoms/Icon.vue'
import DocsNav from '../components/organisms/DocsNav.vue'
</script>
