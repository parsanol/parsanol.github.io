<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="flex gap-12">
      <div class="w-64 flex-shrink-0 hidden lg:block">
        <div class="sticky top-20 h-[calc(100vh-6rem)] overflow-y-auto">
          <DocsNav :show-sections="['backends']" />
        </div>
      </div>

      <div class="flex-1 min-w-0">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-8">Parsing Backends</h1>
        <p class="text-lg text-gray-600 dark:text-gray-400 mb-12">
          Parsanol supports two parsing backends: <strong>Packrat</strong> (memoization-based) and
          <strong>Bytecode VM</strong> (stack-based). Understanding when to use each is crucial for
          optimal performance. This guide explains the characteristics of each backend, how to identify
          problematic grammar patterns, and how to analyze your grammar.
        </p>

        <!-- Quick Comparison -->
        <section id="comparison" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Backend Comparison</h2>

          <div class="card mb-8 overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Aspect</th>
                  <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Packrat</th>
                  <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Bytecode VM</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td class="py-3 px-4 font-medium text-gray-900 dark:text-white">Algorithm</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Memoization (cache results)</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Backtracking (re-try)</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 font-medium text-gray-900 dark:text-white">Time Complexity</td>
                  <td class="py-3 px-4 text-green-600 dark:text-green-400 font-medium">Guaranteed O(n)</td>
                  <td class="py-3 px-4 text-yellow-600 dark:text-yellow-400">O(n) to O(2^n)</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 font-medium text-gray-900 dark:text-white">Memory Usage</td>
                  <td class="py-3 px-4 text-yellow-600 dark:text-yellow-400">O(n × r) - n=positions, r=rules</td>
                  <td class="py-3 px-4 text-green-600 dark:text-green-400 font-medium">O(d) - d=nesting depth</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 font-medium text-gray-900 dark:text-white">Compilation</td>
                  <td class="py-3 px-4 text-green-600 dark:text-green-400">None required</td>
                  <td class="py-3 px-4 text-yellow-600 dark:text-yellow-400">Pre-compilation needed</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 font-medium text-gray-900 dark:text-white">Predictability</td>
                  <td class="py-3 px-4 text-green-600 dark:text-green-400 font-medium">Always consistent</td>
                  <td class="py-3 px-4 text-yellow-600 dark:text-yellow-400">Depends on grammar</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 font-medium text-gray-900 dark:text-white">Best For</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Complex grammars, safety-critical</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Simple patterns, memory-limited</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <p class="text-blue-800 dark:text-blue-200 text-sm">
              <strong>Both backends produce identical parsing results.</strong> The difference is only in
              performance characteristics. Use <code class="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">Backend::Auto</code>
              to let Parsanol analyze your grammar and choose automatically.
            </p>
          </div>
        </section>

        <!-- How Each Backend Works -->
        <section id="how-they-work" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">How Each Backend Works</h2>

          <div class="grid md:grid-cols-2 gap-6 mb-8">
            <div class="card">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Packrat (Memoization)</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">
                The Packrat backend stores parse results in a memoization table keyed by
                (position, rule) pairs. Each rule is evaluated at most once per position.
              </p>
              <div class="bg-gray-50 dark:bg-gray-800 rounded p-4 text-sm mb-4">
                <pre class="text-gray-800 dark:text-gray-200">
Memo Table:
┌─────────┬────────┬─────────────────┐
│ Position│ Rule   │ Cached Result   │
├─────────┼────────┼─────────────────┤
│    0    │ expr   │ Success, len=5  │
│    0    │ term   │ Success, len=2  │
│    2    │ expr   │ Success, len=3  │
│   ...   │  ...   │      ...        │
└─────────┴────────┴─────────────────┘

For input length n with r rules:
Table size = O(n × r)
                </pre>
              </div>
              <p class="text-gray-500 dark:text-gray-500 text-xs">
                <strong>Why O(n)?</strong> Even with backtracking, each (position, rule) combination
                is computed exactly once. Subsequent accesses are cache hits.
              </p>
            </div>

            <div class="card">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Bytecode VM</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">
                The Bytecode VM compiles grammar to stack-based instructions. On failure,
                it backtracks to the most recent choice point and tries the next alternative.
              </p>
              <div class="bg-gray-50 dark:bg-gray-800 rounded p-4 text-sm mb-4">
                <pre class="text-gray-800 dark:text-gray-200">
Bytecode for pattern (a*)*:
┌────────┬───────────────────────┐
│ Addr   │ Instruction           │
├────────┼───────────────────────┤
│   0    │ Choice L3 (outer *)   │
│   1    │   Choice L2 (inner *) │
│   2    │     Char 'a'          │
│   3    │     PartialCommit L1  │
│   4    │   L2: Commit          │
│   5    │   PartialCommit L0    │
│   6    │ L3: End               │
└────────┴───────────────────────┘

For input "aaa": tries many paths!
                </pre>
              </div>
              <p class="text-gray-500 dark:text-gray-500 text-xs">
                <strong>Why potentially O(2^n)?</strong> Without memoization, the same sub-problem
                can be solved many times. Nested repetitions multiply the possibilities.
              </p>
            </div>
          </div>
        </section>

        <!-- When to Use Which -->
        <section id="when-to-use" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">When to Use Each Backend</h2>

          <div class="card mb-8 overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Grammar Type</th>
                  <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Recommended</th>
                  <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Reason</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">JSON, XML, TOML, YAML</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Either (use Auto)</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Linear patterns, both perform well</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Programming languages (C, Rust, Python)</td>
                  <td class="py-3 px-4 text-green-600 dark:text-green-400 font-medium">Packrat</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Complex grammar with many rules</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Expression languages (arithmetic, boolean)</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Either</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Recursive but usually well-structured</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Log formats, CSV, simple protocols</td>
                  <td class="py-3 px-4 text-green-600 dark:text-green-400 font-medium">Bytecode</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Simple patterns, lower memory</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Grammars with <code class="bg-gray-100 dark:bg-gray-800 px-1">(a*)*</code></td>
                  <td class="py-3 px-4 text-red-600 dark:text-red-400 font-medium">Packrat (required)</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Avoids exponential backtracking</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Embedded systems, WebAssembly</td>
                  <td class="py-3 px-4 text-green-600 dark:text-green-400 font-medium">Bytecode</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Lower memory footprint</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Safety-critical, real-time systems</td>
                  <td class="py-3 px-4 text-green-600 dark:text-green-400 font-medium">Packrat</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Guaranteed predictable performance</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Large files (&gt;100MB)</td>
                  <td class="py-3 px-4 text-green-600 dark:text-green-400 font-medium">Bytecode</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Lower memory per byte of input</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- Problematic Grammar Patterns -->
        <section id="problematic-patterns" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Problematic Grammar Patterns</h2>

          <p class="text-gray-600 dark:text-gray-400 mb-6">
            The following patterns can cause <strong>exponential time complexity</strong> (O(2^n))
            in the Bytecode backend. They are <strong>safe with Packrat</strong> due to memoization.
            If your grammar contains any of these patterns, use Packrat.
          </p>

          <div class="space-y-8 mb-8">
            <!-- Pattern 1: Nested Repetitions -->
            <div class="card border-l-4 border-red-500">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 text-sm font-bold">1</span>
                Nested Repetitions (CRITICAL)
              </h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">
                When a repetition contains another repetition, the Bytecode backend tries all possible
                ways to divide the input. This creates exponential possibilities.
              </p>

              <div class="bg-gray-50 dark:bg-gray-800 rounded p-4 text-sm mb-4">
                <pre class="text-gray-800 dark:text-gray-200">
<span class="text-red-500">// CRITICAL - Exponential O(2^n):</span>
(a*)*           // Outer * tries many ways to divide input
(a+)+           // Similar issue with + quantifier
((a|b)*)*       // Nested choice makes it worse
([0-9]*)*       // Same issue with character classes

<span class="text-yellow-500">// MODERATE - Polynomial O(n^k):</span>
(a*b*)*         // k=2 repetitions, polynomial slowdown
(a|b*c*)*       // Mixed, still problematic

<span class="text-green-500">// SAFE - Linear O(n):</span>
a*              // Single repetition - no nesting
(a)*            // Same as above - just grouping
(a b)*          // Fixed sequence inside - O(n)
(a+ b+)*        // Multiple but bounded sequences
                </pre>
              </div>

              <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded p-4 mb-4">
                <p class="text-red-800 dark:text-red-200 text-sm">
                  <strong>Example:</strong> For input "aaa" with pattern <code>(a*)*</code>:
                </p>
                <pre class="text-red-700 dark:text-red-300 text-xs mt-2">
The outer * can try:
  (aaa)           - one group
  (aa)(a)         - two groups
  (a)(aa)         - two groups, different split
  (a)(a)(a)       - three groups
  (aaa)()         - with empty group
  (aa)(a)()       - etc.
Total: O(2^n) possibilities for input of length n
                </pre>
              </div>
            </div>

            <!-- Pattern 2: Overlapping Choices -->
            <div class="card border-l-4 border-yellow-500">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400 text-sm font-bold">2</span>
                Overlapping Choice Prefixes
              </h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">
                When multiple alternatives share a common prefix, the parser must try each one
                and backtrack on failure. This increases the backtracking depth.
              </p>

              <div class="bg-gray-50 dark:bg-gray-800 rounded p-4 text-sm mb-4">
                <pre class="text-gray-800 dark:text-gray-200">
<span class="text-yellow-500">// PROBLEMATIC - Many backtrack points:</span>
("a" | "aa" | "aaa" | "aaaa")+    // All start with 'a'
("if" | "iff" | "iffy")+          // Prefix overlap

<span class="text-green-500">// BETTER - Distinct first characters:</span>
("a" | "b" | "c")+                // No overlap
("ab" | "cd" | "ef")+             // Distinct prefixes

<span class="text-green-500">// BEST - Use negative lookahead:</span>
("aaa" | "aa" | "a")+             // Order longest first
// Or with lookahead:
("a" ~"aa" | "aa" ~"aaa" | "aaa" | "a")+
                </pre>
              </div>

              <p class="text-gray-500 dark:text-gray-500 text-xs">
                <strong>Note:</strong> In PEG, order matters. Put longer alternatives first.
              </p>
            </div>

            <!-- Pattern 3: Left Recursion (indirect) -->
            <div class="card border-l-4 border-red-500">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 text-sm font-bold">3</span>
                Indirect Left Recursion
              </h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">
                PEG cannot handle direct left recursion. Indirect left recursion (A → B → A)
                can cause deep recursion or infinite loops.
              </p>

              <div class="bg-gray-50 dark:bg-gray-800 rounded p-4 text-sm mb-4">
                <pre class="text-gray-800 dark:text-gray-200">
<span class="text-red-500">// INVALID - Direct left recursion (infinite loop):</span>
expr = expr "+" term | term

<span class="text-red-500">// PROBLEMATIC - Indirect left recursion:</span>
A = B | 'a'
B = A | 'b'    // A → B → A cycle

<span class="text-green-500">// CORRECT - Right recursion or iteration:</span>
expr = term ("+" term)*
// or
expr = term ("+" expr)?
                </pre>
              </div>
            </div>

            <!-- Pattern 4: Deeply Nested Alternatives -->
            <div class="card border-l-4 border-yellow-500">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400 text-sm font-bold">4</span>
                Deeply Nested Alternatives
              </h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Very deep nesting creates many choice points on the stack, increasing memory
                usage and backtracking cost.
              </p>

              <div class="bg-gray-50 dark:bg-gray-800 rounded p-4 text-sm mb-4">
                <pre class="text-gray-800 dark:text-gray-200">
<span class="text-yellow-500">// PROBLEMATIC - Depth > 10:</span>
(((((((((a | b) | c) | d) | e) | f) | g) | h) | i) | j)

<span class="text-green-500">// BETTER - Flatten alternatives:</span>
(a | b | c | d | e | f | g | h | i | j)

<span class="text-green-500">// Or use character class:</span>
[a-j]
                </pre>
              </div>
            </div>

            <!-- Pattern 5: Unbounded Lookahead -->
            <div class="card border-l-4 border-yellow-500">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400 text-sm font-bold">5</span>
                Unbounded Lookahead
              </h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Positive/negative lookahead with unbounded patterns can be expensive,
                especially when combined with other patterns.
              </p>

              <div class="bg-gray-50 dark:bg-gray-800 rounded p-4 text-sm mb-4">
                <pre class="text-gray-800 dark:text-gray-200">
<span class="text-yellow-500">// EXPENSIVE - Lookahead with repetition:</span>
&amp;(.*) "end"     // Scans to end, then backtracks
!"end" .*         // Negative lookahead on every position

<span class="text-green-500">// BETTER - Bounded or specific:</span>
&amp;[a-z]+ "end"   // Bounded lookahead
!"end" [a-z]+    // Specific negation
                </pre>
              </div>
            </div>
          </div>

          <div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <p class="text-green-800 dark:text-green-200 text-sm">
              <strong>Good news:</strong> Most practical grammars (JSON, programming languages, config files)
              don't have these patterns. The Packrat backend handles ALL patterns efficiently with O(n) guarantee.
              When in doubt, use Packrat or <code>Backend::Auto</code>.
            </p>
          </div>
        </section>

        <!-- Analyzing Your Grammar -->
        <section id="analyzing" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Analyzing Your Grammar</h2>

          <p class="text-gray-600 dark:text-gray-400 mb-6">
            Parsanol's grammar analysis is deliberately simple: it checks for <strong>nested repetitions</strong>,
            the <strong>only pattern</strong> that causes exponential time complexity in the Bytecode backend.
          </p>

          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Rust API</h3>

          <CodeTabs
            :rust="analysisRust"
          />

          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mt-8 mb-4">Why Only Nested Repetitions?</h3>

          <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
            <p class="text-blue-800 dark:text-blue-200 text-sm mb-4">
              The backend selection is based on a <strong>single hard rule</strong>:
            </p>
            <ul class="text-blue-800 dark:text-blue-200 text-sm space-y-2">
              <li><code class="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">has_nested_repetition == true</code> → Packrat (guaranteed O(n))</li>
              <li><code class="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">has_nested_repetition == false</code> → Bytecode (lower memory)</li>
            </ul>
          </div>

          <p class="text-gray-600 dark:text-gray-400 mb-6">
            Nested repetitions like <code class="bg-gray-100 dark:bg-gray-800 px-1">(a*)*</code> cause O(2^n) time in the
            Bytecode backend because the parser must try all possible ways to divide the input. Packrat's memoization
            solves this by caching each (position, rule) result, guaranteeing O(n) time.
          </p>

          <p class="text-gray-600 dark:text-gray-400 mb-6">
            <strong>Other patterns don't matter</strong> for backend selection:
          </p>

          <div class="card mb-6 overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Pattern</th>
                  <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Time Impact</th>
                  <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Backend Difference</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400 font-mono">("a" | "aa")</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Linear backtracking</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Both handle identically</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400 font-mono">Deep nesting</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Stack depth increases</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Both handle fine</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400 font-mono">Many alternatives</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">More choice points</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Linear in alternative count</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 text-red-600 dark:text-red-400 font-mono">(a*)*</td>
                  <td class="py-3 px-4 text-red-600 dark:text-red-400 font-medium">O(2^n) exponential!</td>
                  <td class="py-3 px-4 text-red-600 dark:text-red-400">Bytecode fails, Packrat O(n)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">When to Override Auto-Selection</h3>

          <p class="text-gray-600 dark:text-gray-400 mb-4">
            The auto-selection only considers <strong>time complexity</strong>. You may want to manually select based on:
          </p>

          <div class="card mb-6 overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Scenario</th>
                  <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Manual Selection</th>
                  <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Rationale</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Memory-constrained (embedded, WASM)</td>
                  <td class="py-3 px-4 text-green-600 dark:text-green-400 font-medium">Bytecode</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Lower memory: O(depth) vs O(n×rules)</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Very large files (&gt;100MB)</td>
                  <td class="py-3 px-4 text-green-600 dark:text-green-400 font-medium">Bytecode</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Packrat table grows with input size</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Predictable latency required</td>
                  <td class="py-3 px-4 text-green-600 dark:text-green-400 font-medium">Packrat</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Guaranteed O(n), no pathological cases</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Streaming parsing</td>
                  <td class="py-3 px-4 text-green-600 dark:text-green-400 font-medium">Bytecode</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Packrat requires full input in memory</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Incremental re-parsing</td>
                  <td class="py-3 px-4 text-green-600 dark:text-green-400 font-medium">Packrat</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Memo table can be reused</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Input always small (bounded)</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Either</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Even O(2^n) is fine for small n</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">GrammarAnalysis Fields</h3>

          <div class="grid md:grid-cols-2 gap-6">
            <div class="card">
              <h4 class="font-medium text-gray-900 dark:text-white mb-2">atom_count</h4>
              <p class="text-gray-600 dark:text-gray-400 text-sm">
                Total number of atoms in the grammar. Informational only - not used for backend selection.
              </p>
            </div>

            <div class="card border-l-4 border-red-500">
              <h4 class="font-medium text-gray-900 dark:text-white mb-2">has_nested_repetition</h4>
              <p class="text-gray-600 dark:text-gray-400 text-sm">
                <code class="bg-red-100 dark:bg-red-900 px-1 text-red-700 dark:text-red-300">THE CRITERION</code>
                Detects <code>(a*)*</code> patterns. This is the <strong>only field</strong> that matters.
                If true, use Packrat. If false, Bytecode is efficient.
              </p>
            </div>
          </div>

          <div class="mt-6 card bg-gray-50 dark:bg-gray-800">
            <h4 class="font-medium text-gray-900 dark:text-white mb-2">The recommended_backend() Method</h4>
            <pre class="text-sm text-gray-800 dark:text-gray-200">
// This is the entire logic:
pub fn recommended_backend(&self) -> Backend {
    if self.has_nested_repetition {
        Backend::Packrat  // Prevents O(2^n)
    } else {
        Backend::Bytecode // Lower memory, faster for simple patterns
    }
}
            </pre>
          </div>
        </section>

        <!-- Usage Examples -->
        <section id="usage" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Usage Examples</h2>

          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Automatic Selection (Recommended)</h3>

          <CodeTabs
            :rust="autoSelectRust"
          />

          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mt-8 mb-4">Explicit Backend Selection</h3>

          <CodeTabs
            :rust="explicitRust"
          />

          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mt-8 mb-4">Pre-compiled Parser (Best for Repeated Parsing)</h3>

          <CodeTabs
            :rust="precompiledRust"
          />

          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mt-8 mb-4">Ruby Bindings</h3>

          <CodeTabs
            :ruby="rubyExample"
          />
        </section>

        <!-- Bytecode Optimization Passes -->
        <section id="optimizations" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Bytecode Optimization Passes</h2>

          <p class="text-gray-600 dark:text-gray-400 mb-6">
            The Bytecode backend applies 11 optimization passes automatically during compilation.
            These reduce instruction count and improve runtime performance.
          </p>

          <div class="grid md:grid-cols-2 gap-4 mb-6">
            <div class="card p-4">
              <h4 class="font-medium text-gray-900 dark:text-white text-sm">1. DeadCodeElimination</h4>
              <p class="text-gray-500 dark:text-gray-500 text-xs mt-1">Remove unreachable code after returns/fails</p>
            </div>
            <div class="card p-4">
              <h4 class="font-medium text-gray-900 dark:text-white text-sm">2. JumpChainSimplification</h4>
              <p class="text-gray-500 dark:text-gray-500 text-xs mt-1">Jump to Jump → Jump to final target</p>
            </div>
            <div class="card p-4">
              <h4 class="font-medium text-gray-900 dark:text-white text-sm">3. JumpToReturnSimplification</h4>
              <p class="text-gray-500 dark:text-gray-500 text-xs mt-1">Jump to Return → Return directly</p>
            </div>
            <div class="card p-4">
              <h4 class="font-medium text-gray-900 dark:text-white text-sm">4. JumpToFailSimplification</h4>
              <p class="text-gray-500 dark:text-gray-500 text-xs mt-1">Jump to Fail → Fail directly</p>
            </div>
            <div class="card p-4">
              <h4 class="font-medium text-gray-900 dark:text-white text-sm">5. CombineAdjacentChars</h4>
              <p class="text-gray-500 dark:text-gray-500 text-xs mt-1">Multiple Char → Single String instruction</p>
            </div>
            <div class="card p-4">
              <h4 class="font-medium text-gray-900 dark:text-white text-sm">6. SpanOptimization</h4>
              <p class="text-gray-500 dark:text-gray-500 text-xs mt-1">CharSet* loop → Span instruction</p>
            </div>
            <div class="card p-4">
              <h4 class="font-medium text-gray-900 dark:text-white text-sm">7. FullCaptureOptimization</h4>
              <p class="text-gray-500 dark:text-gray-500 text-xs mt-1">Open+Close capture → FullCapture</p>
            </div>
            <div class="card p-4">
              <h4 class="font-medium text-gray-900 dark:text-white text-sm">8. TestCharOptimization</h4>
              <p class="text-gray-500 dark:text-gray-500 text-xs mt-1">Choice+Char+Commit → TestChar (5→2 instrs)</p>
            </div>
            <div class="card p-4">
              <h4 class="font-medium text-gray-900 dark:text-white text-sm">9. TestSetOptimization</h4>
              <p class="text-gray-500 dark:text-gray-500 text-xs mt-1">Choice+CharSet+Commit → TestSet</p>
            </div>
            <div class="card p-4">
              <h4 class="font-medium text-gray-900 dark:text-white text-sm">10. TailCallOptimization</h4>
              <p class="text-gray-500 dark:text-gray-500 text-xs mt-1">Call+Return → Jump (removes frame)</p>
            </div>
            <div class="card p-4">
              <h4 class="font-medium text-gray-900 dark:text-white text-sm">11. LookaheadOptimization</h4>
              <p class="text-gray-500 dark:text-gray-500 text-xs mt-1">Choice in lookahead → PredChoice</p>
            </div>
          </div>
        </section>

        <!-- Known Differences -->
        <section id="known-differences" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Known Behavioral Differences</h2>

          <p class="text-gray-600 dark:text-gray-400 mb-6">
            Both backends produce <strong>identical results</strong> for the vast majority of patterns.
            However, there is one edge case where behavior differs:
          </p>

          <div class="card border-l-4 border-yellow-500 mb-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Alternatives with Overlapping Prefixes in Sequences</h3>

            <div class="bg-gray-50 dark:bg-gray-800 rounded p-4 text-sm mb-4">
              <pre class="text-gray-800 dark:text-gray-200">
Pattern: ("a" | "aa") "b"
Input:   "aab"
              </pre>
            </div>

            <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Execution trace:
            </p>

            <div class="grid md:grid-cols-2 gap-4">
              <div class="bg-green-50 dark:bg-green-900/20 rounded p-4">
                <h4 class="font-medium text-green-700 dark:text-green-300 mb-2">Packrat</h4>
                <pre class="text-green-600 dark:text-green-400 text-xs">
1. Try "a" at pos 0 → Success
2. Try "b" at pos 1 → Fail (input is 'a')
3. Backtrack, try "aa" at pos 0 → Success
4. Try "b" at pos 2 → Success
5. Result: MATCH

Memoization allows re-evaluating
the alternative at pos 0.
                </pre>
              </div>

              <div class="bg-red-50 dark:bg-red-900/20 rounded p-4">
                <h4 class="font-medium text-red-700 dark:text-red-300 mb-2">Bytecode (Standard PEG)</h4>
                <pre class="text-red-600 dark:text-red-400 text-xs">
1. Try "a" at pos 0 → Success
2. Try "b" at pos 1 → Fail (input is 'a')
3. No backtrack point → FAIL

Standard PEG semantics: once
"a" succeeds, "aa" is not tried.
                </pre>
              </div>
            </div>
          </div>

          <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <p class="text-blue-800 dark:text-blue-200 text-sm mb-2">
              <strong>Practical Impact:</strong> This difference only affects grammars with:
            </p>
            <ol class="list-decimal list-inside text-blue-800 dark:text-blue-200 text-sm space-y-1 mb-2 ml-4">
              <li>Alternatives with overlapping prefixes ("a" vs "aa")</li>
              <li>The alternative inside a sequence</li>
              <li>Content after the alternative that can fail</li>
            </ol>
            <p class="text-blue-800 dark:text-blue-200 text-sm">
              Most practical grammars (JSON, programming languages, config files) don't have this pattern.
              If you encounter this case, prefer Packrat for the intuitive behavior.
            </p>
          </div>
        </section>

        <!-- Performance Benchmarks -->
        <section id="performance-benchmarks" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Performance Benchmarks</h2>

          <div class="flex items-center gap-2 mb-4 text-sm text-gray-500 dark:text-gray-400">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Generated from actual benchmark runs • Version {{ benchmarkData.version }}</span>
          </div>

          <!-- Category Tabs -->
          <div class="flex gap-2 mb-6 overflow-x-auto pb-2">
            <button
              v-for="cat in categories"
              :key="cat.key"
              @click="selectedCategory = cat.key"
              :class="[
                'px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors',
                selectedCategory === cat.key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              ]"
            >
              {{ cat.label }}
            </button>
          </div>

          <!-- Results for Selected Category -->
          <div class="space-y-4">
            <div
              v-for="result in filteredResults"
              :key="result.name"
              class="card p-4"
            >
              <div class="flex items-center justify-between mb-3">
                <div>
                  <h4 class="text-sm font-medium text-gray-900 dark:text-white">{{ result.name }}</h4>
                  <code class="text-xs text-gray-500 dark:text-gray-400">{{ result.input }}</code>
                </div>
                <div class="flex items-center gap-1">
                  <span
                    v-if="result.speedup.winner === 'bytecode'"
                    class="px-2 py-1 text-xs font-medium rounded bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                  >
                    Bytecode {{ result.speedup.factor }}x
                  </span>
                  <span
                    v-else-if="result.speedup.winner === 'packrat'"
                    class="px-2 py-1 text-xs font-medium rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                  >
                    Packrat {{ result.speedup.factor }}x
                  </span>
                  <span
                    v-else
                    class="px-2 py-1 text-xs font-medium rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                  >
                    Tie
                  </span>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <div class="flex justify-between text-xs mb-1">
                    <span class="text-blue-600 dark:text-blue-400">Packrat</span>
                    <span class="font-medium">{{ result.packrat.formatted }}</span>
                  </div>
                  <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      class="bg-blue-500 h-2 rounded-full transition-all"
                      :style="{ width: packratWidth(result) }"
                    ></div>
                  </div>
                </div>
                <div>
                  <div class="flex justify-between text-xs mb-1">
                    <span class="text-green-600 dark:text-green-400">Bytecode</span>
                    <span class="font-medium">{{ result.bytecode.formatted }}</span>
                  </div>
                  <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      class="bg-green-500 h-2 rounded-full transition-all"
                      :style="{ width: bytecodeWidth(result) }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Category Summary -->
          <div class="mt-8 card p-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Summary by Category</h3>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div v-for="(summary, cat) in benchmarkData.categorySummaries" :key="cat" class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div class="flex justify-between items-center mb-2">
                  <span class="font-medium text-gray-900 dark:text-white capitalize">{{ cat }}</span>
                  <span
                    :class="[
                      'px-2 py-1 text-xs font-medium rounded',
                      summary.avgSpeedup.winner === 'bytecode'
                        ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                        : summary.avgSpeedup.winner === 'packrat'
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                    ]"
                  >
                    {{ summary.avgSpeedup.winner === 'bytecode' ? 'Bytecode' : summary.avgSpeedup.winner === 'packrat' ? 'Packrat' : 'Tie' }}
                    {{ summary.avgSpeedup.factor }}x
                  </span>
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-400">
                  Avg: {{ summary.avgPackrat }} vs {{ summary.avgBytecode }}
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  {{ summary.count }} tests
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Benchmarks -->
        <section id="benchmarks" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Running Benchmarks</h2>

          <p class="text-gray-600 dark:text-gray-400 mb-6">
            Verify performance claims by running benchmarks on your own machine:
          </p>

          <div class="card mb-6">
            <pre class="text-sm text-gray-800 dark:text-gray-200">
# Run bytecode vs packrat benchmarks
cargo bench --bench bytecode

# Output includes:
# - Packrat vs Bytecode comparison for each grammar
# - Compilation overhead measurement
# - Large input handling comparison
# - Memory usage comparison
            </pre>
          </div>

          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Expected Results</h3>

          <div class="card mb-6 overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Grammar Type</th>
                  <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Packrat</th>
                  <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Bytecode</th>
                  <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Winner</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">JSON (linear)</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">~1x</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">~1.1x</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Similar</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Calculator (recursive)</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">~1x</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">~0.9x</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Similar</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">(a*)* (exponential)</td>
                  <td class="py-3 px-4 text-green-600 dark:text-green-400">O(n)</td>
                  <td class="py-3 px-4 text-red-600 dark:text-red-400">O(2^n)</td>
                  <td class="py-3 px-4 text-green-600 dark:text-green-400 font-medium">Packrat</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Memory (100MB input)</td>
                  <td class="py-3 px-4 text-red-600 dark:text-red-400">Higher</td>
                  <td class="py-3 px-4 text-green-600 dark:text-green-400">Lower</td>
                  <td class="py-3 px-4 text-green-600 dark:text-green-400 font-medium">Bytecode</td>
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
import { ref, computed } from 'vue'
import CodeTabs from '../components/molecules/CodeTabs.vue'
import DocsNav from '../components/organisms/DocsNav.vue'
import benchmarkData from '../data/backend-benchmarks.json'

const selectedCategory = ref('all')

const categories = [
  { key: 'all', label: 'All' },
  { key: 'simple', label: 'Simple Tokens' },
  { key: 'expression', label: 'Expressions' },
  { key: 'nested', label: 'Nested' },
  { key: 'linear', label: 'Linear' },
  { key: 'data', label: 'Data' },
]

const filteredResults = computed(() => {
  if (selectedCategory.value === 'all') {
    return benchmarkData.results
  }
  return benchmarkData.results.filter((r: any) => r.category === selectedCategory.value)
})

function packratWidth(result: any) {
  const max = Math.max(result.packrat.ns, result.bytecode.ns)
  return `${(result.packrat.ns / max) * 100}%`
}

function bytecodeWidth(result: any) {
  const max = Math.max(result.packrat.ns, result.bytecode.ns)
  return `${(result.bytecode.ns / max) * 100}%`
}

const analysisRust = `use parsanol::portable::{
    parser_dsl::{str, re, GrammarBuilder},
    bytecode::{Backend, GrammarAnalysis, Parser},
};

fn main() {
    // Build your grammar
    let grammar = GrammarBuilder::new()
        .rule("expr", re(r"[0-9]+"))
        .build();

    // Analyze the grammar
    let analysis = GrammarAnalysis::analyze(&grammar);

    // The only field that matters
    if analysis.has_nested_repetition {
        println!("⚠️  Nested repetitions detected - use Packrat!");
    } else {
        println!("✅ No nested repetitions - Bytecode is efficient");
    }

    // Get recommendation
    println!("Recommended: {:?}", analysis.recommended_backend());

    // Use the recommendation
    let mut parser = Parser::new(grammar, Backend::Auto);
}`

const autoSelectRust = `use parsanol::portable::{
    parser_dsl::{str, re, seq, GrammarBuilder},
    bytecode::{Backend, Parser},
};

fn main() {
    let grammar = GrammarBuilder::new()
        .rule("number", re(r"[0-9]+"))
        .rule("expr", seq(vec![str("number"), str("+"), str("number")]))
        .build();

    // Method 1: Use Backend::Auto (default)
    let mut parser = Parser::new(grammar.clone(), Backend::Auto);

    // Method 2: Convenience method
    let mut parser = Parser::auto(grammar);

    // Parse - backend is selected based on grammar analysis
    let result = parser.parse("42+10");
    println!("Result: {:?}", result);

    // Check which backend was actually used
    println!("Effective backend: {:?}", parser.effective_backend());
}`

const explicitRust = `use parsanol::portable::{
    parser_dsl::{str, re, GrammarBuilder},
    bytecode::{Backend, Parser},
};

fn main() {
    let grammar = GrammarBuilder::new()
        .rule("number", re(r"[0-9]+"))
        .build();

    // Use Packrat backend (guaranteed O(n), higher memory)
    let mut packrat_parser = Parser::new(grammar.clone(), Backend::Packrat);
    // or: Parser::packrat(grammar.clone())
    let result = packrat_parser.parse("42");
    println!("Packrat result: {:?}", result);

    // Use Bytecode backend (lower memory, potential O(2^n))
    let mut bytecode_parser = Parser::new(grammar.clone(), Backend::Bytecode);
    // or: Parser::bytecode(grammar.clone())
    let result = bytecode_parser.parse("42");
    println!("Bytecode result: {:?}", result);

    // For safety-critical code, always use Packrat
    fn parse_critical(input: &str) -> Result<AstNode, ParseError> {
        let grammar = build_critical_grammar();
        let mut parser = Parser::packrat(grammar); // Guaranteed O(n)
        parser.parse(input)
    }

    // For memory-constrained environments
    fn parse_large_file(input: &str) -> Result<AstNode, ParseError> {
        let grammar = build_simple_grammar();
        let mut parser = Parser::bytecode(grammar); // Lower memory
        parser.parse(input)
    }
}`

const precompiledRust = `use parsanol::portable::{
    parser_dsl::{str, re, GrammarBuilder},
    bytecode::{Backend, Parser},
};

fn main() {
    let grammar = GrammarBuilder::new()
        .rule("number", re(r"[0-9]+"))
        .build();

    // Pre-compile once (important for Bytecode efficiency)
    let mut parser = Parser::new(grammar, Backend::Bytecode);

    // Parse many inputs efficiently - no recompilation
    let inputs = vec!["42", "123", "999", "0", "1000000"];
    for input in inputs {
        let result = parser.parse(input);
        println!("{:?}: {:?}", input, result.is_ok());
    }
}

// For one-off parsing, Packrat has no compilation overhead
fn one_off_parse(input: &str) -> Result<AstNode, ParseError> {
    let grammar = build_grammar();
    let mut parser = Parser::packrat(grammar);
    // No pre-compilation needed for Packrat
    parser.parse(input)
}

// For server applications, reuse the parser
struct ParserService {
    parser: Parser, // Reuse across requests
}

impl ParserService {
    fn new(grammar: Grammar) -> Self {
        // Compile once, use many times
        let parser = Parser::new(grammar, Backend::Auto);
        Self { parser }
    }

    fn parse(&mut self, input: &str) -> Result<AstNode, ParseError> {
        self.parser.parse(input)
    }
}`

const rubyExample = `# Ruby bindings automatically use Backend::Auto
# The optimal backend is selected based on grammar analysis

require 'parsanol'

class MyParser < Parsanol::Parser
  rule(:number) { match('[0-9]').repeat(1) }
  rule(:expr) { number >> str('+') >> number }
  root(:expr)
end

parser = MyParser.new

# The native extension uses the optimal backend automatically
result = parser.parse('42+10')

# For explicit control, use the native API:
grammar_json = Parsanol::Native.serialize_grammar(parser.root)

# Parse with automatic backend selection (recommended)
result = Parsanol::Native.parse_to_ruby_objects(grammar_json, input)

# The backend selection is transparent to Ruby users
# - Complex grammars → Packrat for O(n) guarantee
# - Simple grammars → Bytecode for lower memory`
</script>
