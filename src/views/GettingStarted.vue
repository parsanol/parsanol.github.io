<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="flex gap-12">
      <div class="w-64 flex-shrink-0 hidden lg:block">
        <div class="sticky top-20 h-[calc(100vh-6rem)] overflow-y-auto">
          <!-- Sidebar -->
          <DocsNav :show-sections="['getting-started']" />
        </div>

      <!-- Main Content -->
      <div class="flex-1 min-w-0">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">Getting Started</h1>
        <p class="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Learn the core concepts of Parsanol and build your first parser in minutes.
        </p>

        <!-- Installation -->
        <section id="installation" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Installation</h2>

          <div class="space-y-8">
            <!-- Rust -->
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                <Badge variant="rust" class="mr-2">Rust</Badge>
                Add to your project
              </h3>
              <CodeTabs :rust="rustInstall" />
            </div>

            <!-- Ruby -->
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                <Badge variant="ruby" class="mr-2">Ruby</Badge>
                Add to your Gemfile
              </h3>
              <CodeTabs :ruby="rubyInstall" />
            </div>
          </div>
        </section>

        <!-- What is a Parser Combinator -->
        <section id="what-is-parser-combinator" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            What is a Parser Combinator?
          </h2>

          <div class="prose dark:prose-invert max-w-none">
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              A <strong>parser combinator</strong> is a design pattern where small, simple parsing functions
              (called <em>atoms</em>) are combined using higher-order functions (called <em>combinators</em>)
              to build complex parsers.
            </p>

            <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 mb-6">
              <h4 class="font-semibold text-gray-900 dark:text-white mb-3">The Key Insight</h4>
              <p class="text-gray-700 dark:text-gray-300 mb-0">
                Instead of writing one massive parser, you build small, reusable pieces and compose them.
                This makes parsers <strong>modular</strong>, <strong>testable</strong>, and <strong>easy to reason about</strong>.
              </p>
            </div>

            <h3 class="text-lg font-medium text-gray-900 dark:text-white mt-8 mb-4">Atoms: The Building Blocks</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Atoms match the smallest units of input:
            </p>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2 mb-6">
              <li><code class="text-primary-600 dark:text-primary-400">str("hello")</code> - Match a literal string</li>
              <li><code class="text-primary-600 dark:text-primary-400">re("[0-9]+")</code> - Match a regex pattern</li>
              <li><code class="text-primary-600 dark:text-primary-400">any()</code> - Match any single character</li>
            </ul>

            <h3 class="text-lg font-medium text-gray-900 dark:text-white mt-8 mb-4">Combinators: The Glue</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Combinators join atoms together:
            </p>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
              <li><code class="text-primary-600 dark:text-primary-400">.then()</code> - Sequence: match A followed by B</li>
              <li><code class="text-primary-600 dark:text-primary-400">.or()</code> - Alternative: match A or B</li>
              <li><code class="text-primary-600 dark:text-primary-400">.repeat()</code> - Repetition: match multiple times</li>
              <li><code class="text-primary-600 dark:text-primary-400">.maybe()</code> - Optional: match zero or one time</li>
            </ul>
          </div>
        </section>

        <!-- The Two-Stage Model -->
        <section id="two-stage-model" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            The Two-Stage Model
          </h2>

          <div class="prose dark:prose-invert max-w-none mb-6">
            <p class="text-gray-600 dark:text-gray-400">
              Parsanol separates parsing into two distinct stages. This separation is crucial for
              <strong>debuggability</strong>, <strong>flexibility</strong>, and <strong>reusability</strong>.
            </p>
          </div>

          <!-- Main Architecture Diagram -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 mb-8">
            <img
              src="/diagrams/parser-transform-flow.svg"
              alt="Parser Transform Flow Diagram"
              class="w-full h-auto"
            />
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Stage 1: Parser -->
            <div class="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
              <h3 class="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
                Stage 1: Parsing
              </h3>
              <ul class="space-y-2 text-blue-800 dark:text-blue-200">
                <li class="flex items-start">
                  <span class="text-blue-500 mr-2">&#10003;</span>
                  <span>Input: Raw string</span>
                </li>
                <li class="flex items-start">
                  <span class="text-blue-500 mr-2">&#10003;</span>
                  <span>Output: Generic parse tree</span>
                </li>
                <li class="flex items-start">
                  <span class="text-blue-500 mr-2">&#10003;</span>
                  <span>Domain-agnostic structure</span>
                </li>
                <li class="flex items-start">
                  <span class="text-blue-500 mr-2">&#10003;</span>
                  <span>Debuggable and inspectable</span>
                </li>
              </ul>
            </div>

            <!-- Stage 2: Transform -->
            <div class="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6">
              <h3 class="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-3">
                Stage 2: Transformation
              </h3>
              <ul class="space-y-2 text-purple-800 dark:text-purple-200">
                <li class="flex items-start">
                  <span class="text-purple-500 mr-2">&#10003;</span>
                  <span>Input: Parse tree</span>
                </li>
                <li class="flex items-start">
                  <span class="text-purple-500 mr-2">&#10003;</span>
                  <span>Output: Your typed data</span>
                </li>
                <li class="flex items-start">
                  <span class="text-purple-500 mr-2">&#10003;</span>
                  <span>Pattern-based matching</span>
                </li>
                <li class="flex items-start">
                  <span class="text-purple-500 mr-2">&#10003;</span>
                  <span>Recursive transformation</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h4 class="font-medium text-green-900 dark:text-green-100 mb-2">Why Two Stages?</h4>
            <ul class="list-disc pl-5 text-green-800 dark:text-green-200 space-y-1">
              <li><strong>Debug the tree</strong> - See exactly what was parsed before transforming</li>
              <li><strong>Transform multiple ways</strong> - Same tree, different outputs</li>
              <li><strong>Test independently</strong> - Parser tests vs transform tests</li>
            </ul>
          </div>
        </section>

        <!-- Anatomy of a Parser -->
        <section id="anatomy-parser" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Anatomy of a Parser
          </h2>

          <div class="prose dark:prose-invert max-w-none mb-6">
            <p class="text-gray-600 dark:text-gray-400">
              Let's see how atoms combine to build a complete parser. This diagram shows
              the flow from basic atoms through combinators to the final parse tree.
            </p>
          </div>

          <!-- Parser Stage Detail Diagram -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 mb-8">
            <img
              src="/diagrams/parser-stage-detail.svg"
              alt="Parser Stage Detail Diagram"
              class="w-full h-auto"
            />
          </div>

          <CodeTabs
            :rust="parserAnatomyRust"
            :ruby="parserAnatomyRuby"
          />

          <div class="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
            <h4 class="font-medium text-amber-900 dark:text-amber-100 mb-2">Key Methods</h4>
            <ul class="list-disc pl-5 text-amber-800 dark:text-amber-200 space-y-1">
              <li><code>.as("name")</code> - Label a capture for later access</li>
              <li><code>.ignore()</code> - Match but don't include in tree</li>
              <li><code>.lookahead(bool)</code> - Peek ahead without consuming</li>
            </ul>
          </div>
        </section>

        <!-- Parse Tree Structure -->
        <section id="parse-tree-structure" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Understanding the Parse Tree
          </h2>

          <div class="prose dark:prose-invert max-w-none mb-6">
            <p class="text-gray-600 dark:text-gray-400">
              The parse tree is a generic, domain-agnostic structure that captures
              <em>what</em> was matched, not <em>how to interpret it</em>. This is what enables
              the two-stage model.
            </p>
          </div>

          <!-- Parse Tree Structure Diagram -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 mb-8">
            <img
              src="/diagrams/parse-tree-structure.svg"
              alt="Parse Tree Structure Diagram"
              class="w-full h-auto"
            />
          </div>

          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Node Types</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <h4 class="font-medium text-blue-900 dark:text-blue-100">Value</h4>
              <p class="text-sm text-blue-700 dark:text-blue-300">Leaf node containing matched text</p>
            </div>
            <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
              <h4 class="font-medium text-purple-900 dark:text-purple-100">Sequence</h4>
              <p class="text-sm text-purple-700 dark:text-purple-300">Ordered children from <code>.then()</code></p>
            </div>
            <div class="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4">
              <h4 class="font-medium text-amber-900 dark:text-amber-100">Named</h4>
              <p class="text-sm text-amber-700 dark:text-amber-300">Labeled node from <code>.as()</code></p>
            </div>
            <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
              <h4 class="font-medium text-green-900 dark:text-green-100">Alternative</h4>
              <p class="text-sm text-green-700 dark:text-green-300">Choice made from <code>.or()</code></p>
            </div>
          </div>

          <CodeTabs
            :rust="treeAccessRust"
            :ruby="treeAccessRuby"
          />
        </section>

        <!-- Anatomy of a Transform -->
        <section id="anatomy-transform" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Anatomy of a Transform
          </h2>

          <div class="prose dark:prose-invert max-w-none mb-6">
            <p class="text-gray-600 dark:text-gray-400">
              Transforms use pattern matching to convert the generic parse tree into
              your domain-specific types. This is where you give meaning to the parsed structure.
            </p>
          </div>

          <!-- Transform Stage Detail Diagram -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 mb-8">
            <img
              src="/diagrams/transform-stage-detail.svg"
              alt="Transform Stage Detail Diagram"
              class="w-full h-auto"
            />
          </div>

          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Pattern Types</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div class="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4">
              <h4 class="font-mono text-amber-900 dark:text-amber-100 mb-2">simple(:x)</h4>
              <p class="text-sm text-amber-700 dark:text-amber-300">Matches leaf values (strings, numbers)</p>
            </div>
            <div class="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4">
              <h4 class="font-mono text-amber-900 dark:text-amber-100 mb-2">sequence(:x)</h4>
              <p class="text-sm text-amber-700 dark:text-amber-300">Matches arrays of values</p>
            </div>
            <div class="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4">
              <h4 class="font-mono text-amber-900 dark:text-amber-100 mb-2">subtree(:x)</h4>
              <p class="text-sm text-amber-700 dark:text-amber-300">Matches anything (whole tree)</p>
            </div>
            <div class="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4">
              <h4 class="font-mono text-amber-900 dark:text-amber-100 mb-2">{ key: pattern }</h4>
              <p class="text-sm text-amber-700 dark:text-amber-300">Matches hashes by keys</p>
            </div>
          </div>

          <CodeTabs
            :rust="transformAnatomyRust"
            :ruby="transformAnatomyRuby"
          />
        </section>

        <!-- Your First Complete Parser -->
        <section id="first-parser" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Your First Complete Parser
          </h2>

          <div class="prose dark:prose-invert max-w-none mb-6">
            <p class="text-gray-600 dark:text-gray-400">
              Let's build a complete parser that recognizes simple arithmetic expressions.
              This example demonstrates both stages working together.
            </p>
          </div>

          <div class="bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 rounded-xl p-6 mb-6">
            <h4 class="font-semibold text-gray-900 dark:text-white mb-3">Goal: Parse "1 + 2 * 3"</h4>
            <p class="text-gray-700 dark:text-gray-300">
              We want to respect operator precedence: <code>2 * 3</code> should be evaluated before <code>1 + ...</code>.
            </p>
          </div>

          <CodeTabs
            :rust="firstParserRust"
            :ruby="firstParserRuby"
          />

          <div class="mt-8 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h4 class="font-medium text-green-900 dark:text-green-100 mb-2">How it works:</h4>
            <ol class="list-decimal pl-5 text-green-800 dark:text-green-200 space-y-2">
              <li><strong>Parse</strong> - The grammar recognizes the structure</li>
              <li><strong>Tree</strong> - A generic tree captures what was matched</li>
              <li><strong>Transform</strong> - Patterns match tree nodes and build expressions</li>
              <li><strong>Evaluate</strong> - The resulting AST can be executed</li>
            </ol>
          </div>
        </section>

        <!-- Infix Precedence -->
        <section id="infix-precedence" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Understanding Operator Precedence
          </h2>

          <div class="prose dark:prose-invert max-w-none mb-6">
            <p class="text-gray-600 dark:text-gray-400">
              One of the most challenging aspects of parsing is handling operator precedence
              correctly. Parsanol provides built-in support for this common pattern.
            </p>
          </div>

          <!-- Infix Precedence Diagram -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 mb-8">
            <img
              src="/diagrams/infix-precedence.svg"
              alt="Infix Precedence Diagram"
              class="w-full h-auto"
            />
          </div>

          <CodeTabs
            :rust="infixRust"
            :ruby="infixRuby"
          />
        </section>

        <!-- Next Steps -->
        <section id="next-steps">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Next Steps</h2>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <router-link to="/parsers" class="card card-hover">
              <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Parser Reference</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm">All parser combinators with examples.</p>
            </router-link>
            <router-link to="/transforms" class="card card-hover">
              <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Transform Reference</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm">Pattern matching and transformation rules.</p>
            </router-link>
            <router-link to="/examples" class="card card-hover">
              <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Examples</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm">Complete parsers for JSON, CSV, and more.</p>
            </router-link>
            <router-link to="/errors" class="card card-hover">
              <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Error Handling</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm">Rich error messages and debugging.</p>
            </router-link>
            <router-link to="/api" class="card card-hover">
              <h3 class="font-semibold text-gray-900 dark:text-white mb-2">API Reference</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm">Complete API documentation.</p>
            </router-link>
            <a href="https://github.com/parsanol/parsanol-rs" target="_blank" class="card card-hover">
              <h3 class="font-semibold text-gray-900 dark:text-white mb-2">GitHub</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm">Source code and contributions.</p>
            </a>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Badge from '../components/atoms/Badge.vue'
import CodeTabs from '../components/molecules/CodeTabs.vue'
import DocsNav from '../components/organisms/DocsNav.vue'

const rustInstall = `# Cargo.toml
[dependencies]
parsanol = "0.1"`

const rubyInstall = `# Gemfile
gem 'parsanol'

# Or install directly
$ gem install parsanol`

const parserAnatomyRust = `use parsanol::prelude::*;

// Basic atoms
let hello = str("hello");        // Match literal "hello"
let space = str(" ");            // Match literal " "
let name = re(r"[A-Za-z]+");     // Match letters
let punct = any();               // Match any character

// Combine with combinators
let greeting = hello
    .then(space)                  // Sequence: "hello "
    .then(name.as("name"))        // Capture with label
    .then(punct.maybe());         // Optional punctuation

// Parse input
let tree = greeting.parse("hello World!")?;`

const parserAnatomyRuby = `require 'parsanol'

# Basic atoms
hello = str("hello")        # Match literal "hello"
space = str(" ")            # Match literal " "
name = re("[A-Za-z]+")      # Match letters
punct = any                 # Match any character

# Combine with combinators
greeting = hello >>
  space >>                   # Sequence: "hello "
  name.as(:name) >>          # Capture with label
  punct.maybe                # Optional punctuation

# Parse input
tree = greeting.parse("hello World!")`

const treeAccessRust = `use parsanol::prelude::*;

let parser = str("hello")
    .then(str(" ").ignore())
    .then(re(r"[0-9]+").as("num"));

let tree = parser.parse("hello 42")?;

// Access tree values
tree[0]        // -> "hello" (by index)
tree["num"]    // -> "42" (by label)
tree.as_str()  // -> "hello 42" (full match)`

const treeAccessRuby = `require 'parsanol'

parser = str("hello") >>
  str(" ").ignore >>
  re("[0-9]+").as(:num)

tree = parser.parse("hello 42")

# Access tree values
tree[0]        # => "hello" (by index)
tree[:num]     # => "42" (by label)
tree.to_s      # => "hello 42" (full match)`

const transformAnatomyRust = `use parsanol::prelude::*;

// Define transform rules
let transform = Transform::new()
    // Match leaf values (strings, numbers)
    .rule("int", |s: &str| Ok(s.parse::<i64>()?))

    // Match hash patterns with named captures
    .rule(("left", "op", "right"), |h: &Hash| {
        Ok(Expr::BinOp {
            left: Box::new(h.get("left")?),
            op: h.get("op")?.parse()?,
            right: Box::new(h.get("right")?),
        })
    })
    .build();

// Apply transform
let expr: Expr = transform.apply(tree)?;`

const transformAnatomyRuby = `require 'parsanol'

# Define transform rules
class ExprTransform < Parslet::Transform
  # Match leaf values
  rule(int: simple(:n)) { Integer(n) }

  # Match hash patterns
  rule(left: simple(:l), op: simple('+'), right: simple(:r)) {
    l + r
  }
  rule(left: simple(:l), op: simple('-'), right: simple(:r)) {
    l - r
  }
  rule(left: simple(:l), op: simple('*'), right: simple(:r)) {
    l * r
  }
end

# Apply transform
expr = ExprTransform.new.apply(tree)`

const firstParserRust = `use parsanol::prelude::*;

// Define the grammar
let number = re(r"[0-9]+").as("int");
let op = (str("+").or(str("-")).or(str("*")).or(str("/"))).as("op");

let expr = number.clone()
    .then(op)
    .then(number.clone())
    .as("expr");

// Parse input
let tree = expr.parse("1 + 2 * 3")?;

// Define transform rules
let transform = Transform::new()
    .rule("int", |s: &str| Ok(Expr::Num(s.parse()?)))
    .rule(("left", "op", "right"), |h: &Hash| {
        Ok(Expr::BinOp {
            left: Box::new(h.get("left")?),
            op: h.get("op")?.to_string(),
            right: Box::new(h.get("right")?),
        })
    })
    .build();

// Transform to typed AST
let ast: Expr = transform.apply(tree)?;
println!("{:?}", ast);  // BinOp { left: Num(1), op: "+", right: ... }`

const firstParserRuby = `require 'parsanol'

# Define the grammar
number = re("[0-9]+").as(:int)
op = (str("+") | str("-") | str("*") | str("/")).as(:op)

expr = number >> op >> number

# Parse input
tree = expr.parse("1 + 2 * 3")

# Define transform rules
class CalcTransform < Parslet::Transform
  rule(int: simple(:n)) { n.to_i }

  rule(left: simple(:l), op: simple('+'), right: simple(:r)) { l + r }
  rule(left: simple(:l), op: simple('-'), right: simple(:r)) { l - r }
  rule(left: simple(:l), op: simple('*'), right: simple(:r)) { l * r }
  rule(left: simple(:l), op: simple('/'), right: simple(:r)) { l / r }
end

# Transform and evaluate
result = CalcTransform.new.apply(tree)
puts result  # => 7 (1 + (2 * 3))`

const infixRust = `use parsanol::prelude::*;

// Use built-in infix expression parser
let expr = infix(
    re(r"[0-9]+").as("int"),       // Primary expression

    // Operators with precedence (higher = binds tighter)
    (str("*"), 2, Assoc::Left),    // Multiplication: precedence 2
    (str("/"), 2, Assoc::Left),    // Division: precedence 2
    (str("+"), 1, Assoc::Left),    // Addition: precedence 1
    (str("-"), 1, Assoc::Left),    // Subtraction: precedence 1
)
.with_reducer(|left, op, right| {
    Expr::BinOp {
        left: Box::new(left),
        op: op.to_string(),
        right: Box::new(right),
    }
});

// Correctly parses: 1 + 2 * 3 as 1 + (2 * 3)
let tree = expr.parse("1 + 2 * 3")?;`

const infixRuby = `require 'parsanol'

# Define operators with precedence
class InfixParser < Parsanol::Parser
  rule(:number) { match('[0-9]').repeat(1).as(:int) }
  rule(:mul_op) { str('*') | str('/') }
  rule(:add_op) { str('+') | str('-') }

  # Higher precedence = evaluated first
  rule(:mult) {
    number.as(:left) >> mul_op.as(:op) >> number.as(:right)
  }
  rule(:add) {
    (mult | number).as(:left) >> add_op.as(:op) >> (mult | number).as(:right)
  }

  root(:add)
end

# Correctly parses: 1 + 2 * 3 as 1 + (2 * 3)
parser = InfixParser.new
tree = parser.parse("1 + 2 * 3")`
</script>
