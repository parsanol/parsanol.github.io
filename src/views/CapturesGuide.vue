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

        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">Captures, Scopes, and Dynamic Atoms</h1>

        <div class="flex flex-wrap gap-2 mb-8">
          <span class="px-3 py-1 text-sm font-medium rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">New in 0.3.0</span>
        </div>

        <!-- When to Use Each Feature -->
        <section class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">When to Use Each Feature</h2>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            Each feature serves a specific purpose. Use this guide to choose the right tool for your parsing task.
          </p>

          <!-- Decision Flowchart -->
          <div class="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 mb-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Decision Guide</h3>
            <div class="space-y-4">
              <div class="flex items-start gap-3">
                <span class="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold text-sm">1</span>
                <div>
                  <p class="text-gray-900 dark:text-white font-medium">Need to extract specific values from input?</p>
                  <p class="text-gray-600 dark:text-gray-400 text-sm mt-1">
                    → Use <strong class="text-primary-600 dark:text-primary-400">Captures</strong> - Like named groups in regex, extract parts by name
                  </p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <span class="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold text-sm">2</span>
                <div>
                  <p class="text-gray-900 dark:text-white font-medium">Parsing nested or recursive structures?</p>
                  <p class="text-gray-600 dark:text-gray-400 text-sm mt-1">
                    → Use <strong class="text-primary-600 dark:text-primary-400">Scopes</strong> - Isolate captures per nesting level
                  </p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <span class="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold text-sm">3</span>
                <div>
                  <p class="text-gray-900 dark:text-white font-medium">Grammar depends on context or captures?</p>
                  <p class="text-gray-600 dark:text-gray-400 text-sm mt-1">
                    → Use <strong class="text-primary-600 dark:text-primary-400">Dynamic Atoms</strong> - Runtime-determined parsing
                  </p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <span class="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold text-sm">4</span>
                <div>
                  <p class="text-gray-900 dark:text-white font-medium">Processing large files without memory issues?</p>
                  <p class="text-gray-600 dark:text-gray-400 text-sm mt-1">
                    → Use <strong class="text-primary-600 dark:text-primary-400">Streaming + Captures</strong> - Chunk-based with capture extraction
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Feature Comparison Table -->
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Feature Comparison</h3>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead class="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th class="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-white">Aspect</th>
                  <th class="px-4 py-3 text-center text-sm font-medium text-gray-900 dark:text-white">Captures</th>
                  <th class="px-4 py-3 text-center text-sm font-medium text-gray-900 dark:text-white">Scopes</th>
                  <th class="px-4 py-3 text-center text-sm font-medium text-gray-900 dark:text-white">Dynamic</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td class="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">Purpose</td>
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 text-center">Extract values</td>
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 text-center">Isolate context</td>
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 text-center">Change grammar</td>
                </tr>
                <tr>
                  <td class="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">When to use</td>
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 text-center">Need named values</td>
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 text-center">Nested structures</td>
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 text-center">Context-sensitive</td>
                </tr>
                <tr>
                  <td class="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">Performance</td>
                  <td class="px-4 py-3 text-sm text-center text-green-600 dark:text-green-400">~5% overhead</td>
                  <td class="px-4 py-3 text-sm text-center text-green-600 dark:text-green-400">~2% per level</td>
                  <td class="px-4 py-3 text-sm text-center text-yellow-600 dark:text-yellow-400">~5-20% overhead</td>
                </tr>
                <tr>
                  <td class="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">Memory impact</td>
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 text-center">O(captures)</td>
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 text-center">Bounded by depth</td>
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 text-center">Callback-dependent</td>
                </tr>
                <tr>
                  <td class="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">Can access captures?</td>
                  <td class="px-4 py-3 text-sm text-center"><span class="text-green-500">✓</span></td>
                  <td class="px-4 py-3 text-sm text-center"><span class="text-green-500">✓</span> (outer only)</td>
                  <td class="px-4 py-3 text-sm text-center"><span class="text-green-500">✓</span></td>
                </tr>
                <tr>
                  <td class="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">Works in streaming?</td>
                  <td class="px-4 py-3 text-sm text-center"><span class="text-green-500">✓</span></td>
                  <td class="px-4 py-3 text-sm text-center"><span class="text-green-500">✓</span></td>
                  <td class="px-4 py-3 text-sm text-center"><span class="text-yellow-500">~</span> Fallback</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- Common Use Cases -->
        <section class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Common Use Cases</h2>

          <div class="grid gap-6">
            <!-- Use Case: Email Extraction -->
            <div class="card p-6">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">📧 Email Extraction</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm mb-3">Extract local and domain parts from email addresses.</p>
              <div class="bg-blue-50 dark:bg-blue-900/20 rounded p-2 inline-block mb-3">
                <span class="text-xs font-medium text-blue-700 dark:text-blue-300">Use: Captures</span>
              </div>
              <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto">
                <pre v-pre class="text-sm font-mono text-gray-800 dark:text-gray-200">let grammar = GrammarBuilder::new()
    .rule("email", seq(vec![
        capture("local", dynamic(re(r"[a-zA-Z0-9._%+-]+"))),
        dynamic(str("@")),
        capture("domain", dynamic(re(r"[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"))),
    ]))
    .build();

let result = parser.parse_from_pos(0)?;
println!("Local: {:?}", result.get_capture("local", input));
println!("Domain: {:?}", result.get_capture("domain", input));</pre>
              </div>
            </div>

            <!-- Use Case: INI Config Parsing -->
            <div class="card p-6">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">⚙️ INI Configuration Parsing</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm mb-3">Parse sections with isolated key-value captures.</p>
              <div class="bg-purple-50 dark:bg-purple-900/20 rounded p-2 inline-block mb-3">
                <span class="text-xs font-medium text-purple-700 dark:text-purple-300">Use: Captures + Scopes</span>
              </div>
              <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto">
                <pre v-pre class="text-sm font-mono text-gray-800 dark:text-gray-200">let grammar = GrammarBuilder::new()
    .rule("section", seq(vec![
        dynamic(str("[")),
        capture("section", dynamic(re(r"[a-z_]+"))),  // Persists
        dynamic(str("]\n")),
        scope(seq(vec![                               // Isolated
            capture("key", dynamic(re(r"[a-z_]+"))),
            dynamic(str("=")),
            capture("value", dynamic(re(r"[^\n]+"))),
        ])),
    ]))
    .build();
// Section name available, but key/value are discarded per section</pre>
              </div>
            </div>

            <!-- Use Case: Type-Driven Parsing -->
            <div class="card p-6">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">🔧 Type-Driven Value Parsing</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm mb-3">Parse values differently based on type annotation.</p>
              <div class="bg-orange-50 dark:bg-orange-900/20 rounded p-2 inline-block mb-3">
                <span class="text-xs font-medium text-orange-700 dark:text-orange-300">Use: Captures + Dynamic</span>
              </div>
              <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto">
                <pre v-pre class="text-sm font-mono text-gray-800 dark:text-gray-200">struct TypeCallback;
impl DynamicCallback for TypeCallback {
    fn resolve(&self, ctx: &DynamicContext) -> Option&lt;Atom&gt; {
        match ctx.get_capture_text("type")? {
            "int" => Some(Atom::Re { pattern: r"\d+".into() }),
            "str" => Some(Atom::Re { pattern: r#"[^"]*"#.into() }),
            "bool" => Some(Atom::Re { pattern: r"(true|false)".into() }),
            _ => None,
        }
    }
}

// Grammar: type:name = value
// "int:count=42" parses 42 as digits
// "str:msg=hello" parses hello as string
// "bool:flag=true" parses true as boolean</pre>
              </div>
            </div>

            <!-- Use Case: Large Log Files -->
            <div class="card p-6">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">📊 Large Log File Analysis</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm mb-3">Extract fields from GB-scale log files with bounded memory.</p>
              <div class="bg-green-50 dark:bg-green-900/20 rounded p-2 inline-block mb-3">
                <span class="text-xs font-medium text-green-700 dark:text-green-300">Use: Streaming + Captures</span>
              </div>
              <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto">
                <pre v-pre class="text-sm font-mono text-gray-800 dark:text-gray-200">let grammar = GrammarBuilder::new()
    .rule("log_line", seq(vec![
        capture("ip", dynamic(re(r"\d+\.\d+\.\d+\.\d+"))),
        // ... more fields ...
        capture("status", dynamic(re(r"\d+"))),
    ]))
    .build();

let config = ChunkConfig { chunk_size: 1024 * 1024, window_size: 2 };
let mut parser = StreamingParser::new(&grammar, config);

let result = parser.parse_from_reader(&mut file, &mut arena)?;
if let Some(captures) = &result.capture_state {
    // All IPs and status codes from 10GB file, ~2MB memory
}</pre>
              </div>
            </div>

            <!-- Use Case: Heredoc Parsing -->
            <div class="card p-6">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">📄 Heredoc / Here-Document</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm mb-3">Match delimiter at start and end of document.</p>
              <div class="bg-red-50 dark:bg-red-900/20 rounded p-2 inline-block mb-3">
                <span class="text-xs font-medium text-red-700 dark:text-red-300">Use: Captures + Dynamic</span>
              </div>
              <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto">
                <pre v-pre class="text-sm font-mono text-gray-800 dark:text-gray-200">// Capture the delimiter, then use dynamic to match it at the end
let grammar = GrammarBuilder::new()
    .rule("heredoc", seq(vec![
        dynamic(str("&lt;&lt;")),
        capture("delimiter", dynamic(re(r"[A-Z]+"))),  // Capture EOF
        dynamic(str("\n"))),
        dynamic(re(r"[\s\S]*?")),                       // Content
        dynamic(str("\n"))),
        // Dynamic uses the captured delimiter to match end
        dynamic(dynamic_with_id(match_delimiter_callback)),
    ]))
    .build();

// Input: &lt;&lt;EOF\nhello world\nEOF
// Matches because dynamic callback returns str("EOF")</pre>
              </div>
            </div>
          </div>
        </section>

        <!-- Performance Guidelines -->
        <section class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Performance Guidelines</h2>

          <div class="grid md:grid-cols-2 gap-6">
            <div class="card p-6">
              <h3 class="text-lg font-semibold text-green-600 dark:text-green-400 mb-3">✅ Do</h3>
              <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li class="flex items-start gap-2">
                  <span class="text-green-500 mt-0.5">•</span>
                  Use captures instead of building full AST when you only need specific fields
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-green-500 mt-0.5">•</span>
                  Use scopes for recursive structures to prevent capture accumulation
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-green-500 mt-0.5">•</span>
                  Use streaming for files larger than available RAM
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-green-500 mt-0.5">•</span>
                  Keep dynamic callbacks fast - avoid I/O operations
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-green-500 mt-0.5">•</span>
                  Use Packrat backend for heavy dynamic atom usage
                </li>
              </ul>
            </div>
            <div class="card p-6">
              <h3 class="text-lg font-semibold text-red-600 dark:text-red-400 mb-3">❌ Don't</h3>
              <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li class="flex items-start gap-2">
                  <span class="text-red-500 mt-0.5">•</span>
                  Don't capture everything - only what you need
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-red-500 mt-0.5">•</span>
                  Don't nest scopes unnecessarily - each adds overhead
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-red-500 mt-0.5">•</span>
                  Don't use dynamic atoms for static patterns
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-red-500 mt-0.5">•</span>
                  Don't accumulate captures in streaming without processing
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-red-500 mt-0.5">•</span>
                  Don't use Bytecode/Streaming backends with many dynamic atoms
                </li>
              </ul>
            </div>
          </div>
        </section>

        <!-- Introduction -->
        <section class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Introduction</h2>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Parsanol 0.3.0 introduces three powerful new features for extracting and managing parsed data:
          </p>
          <ul class="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
            <li><strong>Captures</strong> - Extract named values from your input</li>
            <li><strong>Scopes</strong> - Create isolated capture contexts for nested parsing</li>
            <li><strong>Dynamic Atoms</strong> - Context-sensitive parsing at runtime</li>
          </ul>
        </section>

        <!-- Captures Section -->
        <section class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Capture Atoms</h2>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Capture atoms allow you to extract and name matched portions of your input. Think of them like named groups
            in regular expressions, but integrated into the parsing grammar.
          </p>

          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Basic Capture</h3>
          <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4 overflow-x-auto">
            <pre v-pre class="text-sm font-mono text-gray-800 dark:text-gray-200">use parsanol::portable::{Grammar, Atom, Parser};

use parsanol::portable::parser_dsl::*;

// Match "hello" and capture it as "greeting"
let hello = grammar.add_atom(Atom::Str { pattern: "hello".into() });
let capture = grammar.add_atom(Atom::Capture {
    name: "greeting".into(),
    atom: hello,
});
grammar.root = capture;

let mut parser = Parser::packrat(grammar);
let result = parser.parse("hello world")?;

// Extract the captured value
if let Some(text) = result.get_capture("greeting", "hello world") {
    println!("Greeting: {}", text); // Prints: "hello"
}</pre>
          </div>

          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 mt-6">Using the DSL</h3>
          <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4 overflow-x-auto">
            <pre v-pre class="text-sm font-mono text-gray-800 dark:text-gray-200">let grammar = GrammarBuilder::new()
    .rule("greeting", capture("greeting", str("hello")))
    .build();</pre>
          </div>

          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 mt-6">Inspecting Captures</h3>
          <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4 overflow-x-auto">
            <pre v-pre class="text-sm font-mono text-gray-800 dark:text-gray-200">let result = parser.parse(input)?;

// Get all capture names
for name in result.capture_names() {
    println!("Capture: {}", name);
}
// Get specific capture
let value = result.get_capture("name", input)?;
// Get all captures as HashMap
let all = result.captures(input);</pre>
          </div>
        </section>

        <!-- Scopes Section -->
        <section class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Scope Atoms</h2>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Scopes create isolated capture contexts. Captures made inside a scope are
            discarded when the scope exits.
          </p>

          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Why Use Scopes?</h3>
          <ul class="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1 mb-4">
            <li><strong>Prevent capture pollution</strong> - Inner parses don't leak captures</li>
            <li><strong>Recursive parsing</strong> - Each recursion level has its own captures</li>
            <li><strong>Nested contexts</strong> - Parse sub-structures without affecting outer state</li>
          </ul>

          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Basic Scope</h3>
          <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4 overflow-x-auto">
            <pre v-pre class="text-sm font-mono text-gray-800 dark:text-gray-200">let mut grammar = Grammar::new();
let hello = grammar.add_atom(Atom::Str { pattern: "hello".into() });
let capture = grammar.add_atom(Atom::Capture {
    name: "greeting".into(),
    atom: hello,
});
grammar.root = capture;</pre>
          </div>
        </section>

        <!-- Dynamic Atoms Section -->
        <section class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Dynamic Atoms</h2>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Dynamic atoms allow you to determine what to parse at runtime. This enables
            context-sensitive parsing where the grammar itself depends on the input or
            previously captured values.
          </p>

          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">When to Use Dynamic Atoms</h3>
          <ul class="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1 mb-4">
            <li><strong>Configuration-driven parsing</strong> - Different grammars for different configs</li>
            <li><strong>Context-sensitive keywords</strong> - Reserved words change based on position</li>
            <li><strong>Incremental parsing</strong> - Re-parse with hints from previous parses</li>
            <li><strong>Plugin systems</strong> - Allow users to inject custom parsers</li>
          </ul>

          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Basic Dynamic Atom</h3>
          <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4 overflow-x-auto">
            <pre v-pre class="text-sm font-mono text-gray-800 dark:text-gray-200">use parsanol::portable::dynamic::{ConstCallback, register_dynamic_callback};
use parsanol::portable::{Grammar, Atom};

// Create a callback that always returns a specific atom
let callback = ConstCallback::new(
    Atom::Str { pattern: "dynamic".into() },
    "const_dynamic"
);
let callback_id = register_dynamic_callback(Box::new(callback));

// Use in grammar
let mut grammar = Grammar::new();
let dynamic = grammar.add_atom(Atom::Dynamic { callback_id });
grammar.root = dynamic;</pre>
          </div>

          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 mt-6">Dynamic Context</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-2">
            Callbacks receive a context with current parsing state:
          </p>
          <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4 overflow-x-auto">
            <pre v-pre class="text-sm font-mono text-gray-800 dark:text-gray-200">use parsanol::portable::dynamic::{DynamicCallback, DynamicContext};
use parsanol::portable::{Grammar, Atom};

struct KeywordCallback;

impl DynamicCallback for KeywordCallback {
    fn resolve(&self, ctx: &amp;DynamicContext) -> Option&lt;Atom&gt; {
        // Access current position
        let pos = ctx.pos();
        // Access input
        let input = ctx.input();
        // Access captures made so far
        if let Some(lang) = ctx.get_capture("language") {
            match lang {
                "ruby" => Some(Atom::Str { pattern: "def".into() }),
                "python" => Some(Atom::Str { pattern: "lambda".into() }),
                _ => None,
            }
        } else {
            None
        }
    }
}</pre>
          </div>
        </section>

        <!-- Backend Compatibility -->
        <section class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Backend Compatibility</h2>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead class="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th class="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-white">Feature</th>
                  <th class="px-4 py-3 text-center text-sm font-medium text-gray-900 dark:text-white">Packrat</th>
                  <th class="px-4 py-3 text-center text-sm font-medium text-gray-900 dark:text-white">Bytecode</th>
                  <th class="px-4 py-3 text-center text-sm font-medium text-gray-900 dark:text-white">Streaming</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">Capture</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-center text-green-600 dark:text-green-400">Full</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-center text-green-600 dark:text-green-400">Full</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-center text-green-600 dark:text-green-400">Full</td>
                </tr>
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">Scope</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-center text-green-600 dark:text-green-400">Full</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-center text-green-600 dark:text-green-400">Full</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-center text-green-600 dark:text-green-400">Full</td>
                </tr>
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">Dynamic</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-center text-green-600 dark:text-green-400">Full</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-center text-yellow-600 dark:text-yellow-400">Fallback</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-center text-yellow-600 dark:text-yellow-400">Fallback</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mt-4">
            <p class="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>Note:</strong> Dynamic atoms in Bytecode and Streaming backends use Packrat fallback internally.
              This may impact performance if you have many dynamic atoms. Consider using the Packrat backend for
              heavy dynamic usage.
            </p>
          </div>
        </section>

        <!-- Error Messages -->
        <section class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Error Messages with Captures</h2>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Captures can be included in error output for better debugging:
          </p>
          <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4 overflow-x-auto">
            <pre v-pre class="text-sm font-mono text-gray-800 dark:text-gray-200">use parsanol::portable::RichError;
use std::collections::HashMap;
let error = parser.parse(input).unwrap_err();
let rich: RichError = error.into_rich(input);
let mut captures = HashMap::new();
captures.insert("variable", "foo");
captures.insert("operator", "+");
println!("{}", rich.format_with_source_and_captures(input, &captures));</pre>
          </div>
          <div class="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 overflow-x-auto">
            <pre v-pre class="text-sm font-mono text-gray-200">Error at line 3, column 5:
    x = foo +
        ^
`- Expected expression after operator
Captures at time of error:
  operator = "+"
  variable = "foo"</pre>
          </div>
        </section>

        <!-- Streaming with Captures -->
        <section class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Streaming with Captures</h2>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Captures work with the streaming parser, persisting across chunks:
          </p>
          <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4 overflow-x-auto">
            <pre v-pre class="text-sm font-mono text-gray-800 dark:text-gray-200">use parsanol::portable::streaming::{StreamingParser, ChunkConfig};
let result = streaming_parser.parse_from_reader(&mut reader, &mut arena)?;
// Access captures after streaming parse
if let Some(captures) = &result.capture_state {
    for name in captures.names() {
        println!("{} = {:?}", name, captures.get(&name));
    }
}</pre>
          </div>
        </section>

        <!-- API Reference -->
        <section class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">API Reference</h2>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">ParseResult Methods</h3>
          <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4 overflow-x-auto">
            <pre v-pre class="text-sm font-mono text-gray-800 dark:text-gray-200">impl ParseResult {
    /// Returns names of all captures
    pub fn capture_names(&amp;self) -> Vec&lt;String&gt;;
    /// Get text of a named capture
    pub fn get_capture&lt;'a>(&amp;self, name: &amp;str, input: &'a str) -> Option&lt;&amp;'a str&gt;;
    /// Get all captures as HashMap
    pub fn captures&lt;'a>(&amp;'a self, input: &'a str) -> HashMap&lt;&amp;'a str, &amp;'a str&gt;;
}</pre>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 mt-6">Atom Types</h3>
          <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4 overflow-x-auto">
            <pre v-pre class="text-sm font-mono text-gray-800 dark:text-gray-200">pub enum Atom {
    /// Captures the result of parsing atom under name
    Capture { name: String, atom: usize },
    /// Creates an isolated capture scope for atom
    Scope { atom: usize },
    /// Invokes callback at parse time to determine which atom to use
    Dynamic { callback_id: u64 },
}</pre>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 mt-6">DSL Helpers</h3>
          <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4 overflow-x-auto">
            <pre v-pre class="text-sm font-mono text-gray-800 dark:text-gray-200">// Capture helper
capture("name", str("hello"))
// Scope helper
scope(sequence([...]))
// Dynamic helper
dynamic_with_id(callback_id)</pre>
          </div>
        </section>

        <!-- Examples -->
        <section class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Examples</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <router-link to="/examples/rust-capture" class="card p-4 hover:shadow-lg transition">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Capture Atoms</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">Extract named values from parsed input</p>
            </router-link>
            <router-link to="/examples/rust-scope" class="card p-4 hover:shadow-lg transition">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Scope Atoms</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">Create isolated capture contexts</p>
            </router-link>
            <router-link to="/examples/streaming-captures" class="card p-4 hover:shadow-lg transition">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Streaming with Captures</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">Extract values from large files without memory issues</p>
            </router-link>
            <router-link to="/examples/rust-dynamic" class="card p-4 hover:shadow-lg transition">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Dynamic Atoms</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">Context-sensitive parsing at runtime</p>
            </router-link>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from '../components/atoms/Icon.vue'
import DocsNav from '../components/organisms/DocsNav.vue'
</script>
