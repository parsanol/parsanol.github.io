<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="flex gap-12">
      <div class="w-64 flex-shrink-0 hidden lg:block">
        <div class="sticky top-20 h-[calc(100vh-6rem)] overflow-y-auto">
          <DocsNav :show-sections="['introduction', 'installation', 'first-parser']" />
        </div>
      </div>

      <div class="flex-1 min-w-0">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">Your First Parser</h1>
        <p class="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Learn the core concepts of Parsanol and build your first complete parser.
        </p>

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
                  <span class="text-blue-500 mr-2">&#x2713;</span>
                  <span>Input: Raw string</span>
                </li>
                <li class="flex items-start">
                  <span class="text-blue-500 mr-2">&#x2713;</span>
                  <span>Output: Generic parse tree</span>
                </li>
                <li class="flex items-start">
                  <span class="text-blue-500 mr-2">&#x2713;</span>
                  <span>Grammar defines structure</span>
                </li>
                <li class="flex items-start">
                  <span class="text-blue-500 mr-2">&#x2713;</span>
                  <span>No semantic meaning yet</span>
                </li>
              </ul>
            </div>

            <!-- Stage 2: Transform -->
            <div class="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6">
              <h3 class="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-3">
                Stage 2: Transform
              </h3>
              <ul class="space-y-2 text-purple-800 dark:text-purple-200">
                <li class="flex items-start">
                  <span class="text-purple-500 mr-2">&#x2713;</span>
                  <span>Input: Generic parse tree</span>
                </li>
                <li class="flex items-start">
                  <span class="text-purple-500 mr-2">&#x2713;</span>
                  <span>Output: Domain objects</span>
                </li>
                <li class="flex items-start">
                  <span class="text-purple-500 mr-2">&#x2713;</span>
                  <span>Rules define semantics</span>
                </li>
                <li class="flex items-start">
                  <span class="text-purple-500 mr-2">&#x2713;</span>
                  <span>Full type safety</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p class="text-green-800 dark:text-green-200">
              <strong>Why separate?</strong> The parse tree is generic and debuggable. You can inspect it,
              visualize it, or transform it multiple ways. The transform stage adds meaning to the structure.
            </p>
          </div>
        </section>

        <!-- Anatomy of a Parser -->
        <section id="anatomy-parser" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Anatomy of a Parser
          </h2>

          <div class="prose dark:prose-invert max-w-none mb-6">
            <p class="text-gray-600 dark:text-gray-400">
              A parser in Parsanol is built from <strong>atoms</strong> (basic matching units) combined
              with <strong>combinators</strong> (composition operators).
            </p>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 mb-8">
            <CodeTabs :rust="parserAnatomyRust" :ruby="parserAnatomyRuby" />
          </div>

          <div class="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
            <h4 class="font-medium text-amber-900 dark:text-amber-100 mb-2">Key Concepts</h4>
            <ul class="list-disc pl-5 text-amber-800 dark:text-amber-200 space-y-1 text-sm">
              <li><strong>Atoms</strong>: str(), re(), any() - match literal text, regex, or any character</li>
              <li><strong>Combinators</strong>: then(), or(), maybe(), repeat() - compose atoms</li>
              <li><strong>Labels</strong>: .as("name") - attach names to captures</li>
            </ul>
          </div>
        </section>

        <!-- Parse Tree Structure -->
        <section id="parse-tree-structure" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Parse Tree Structure
          </h2>

          <div class="prose dark:prose-invert max-w-none mb-6">
            <p class="text-gray-600 dark:text-gray-400">
              The parser outputs a generic tree structure that represents the matched input.
            </p>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 mb-8">
            <img
              src="/diagrams/parse-tree-structure.svg"
              alt="Parse Tree Structure Diagram"
              class="w-full h-auto"
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">Str</h4>
              <p class="text-sm text-blue-800 dark:text-blue-200">Matched literal string with position</p>
            </div>
            <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
              <h4 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">Array</h4>
              <p class="text-sm text-purple-800 dark:text-purple-200">Ordered sequence of child nodes</p>
            </div>
            <div class="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4">
              <h4 class="font-semibold text-amber-900 dark:text-amber-100 mb-2">Hash</h4>
              <p class="text-sm text-amber-800 dark:text-amber-200">Named captures (from .as())</p>
            </div>
            <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
              <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">InputRef</h4>
              <p class="text-sm text-green-800 dark:text-green-200">Reference to input substring</p>
            </div>
          </div>
        </section>

        <!-- Anatomy of a Transform -->
        <section id="anatomy-transform" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Anatomy of a Transform
          </h2>

          <div class="prose dark:prose-invert max-w-none mb-6">
            <p class="text-gray-600 dark:text-gray-400">
              Transforms convert the generic parse tree into your domain objects using pattern matching.
            </p>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 mb-8">
            <CodeTabs :rust="transformAnatomyRust" :ruby="transformAnatomyRuby" />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div class="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4">
              <h4 class="font-semibold text-amber-900 dark:text-amber-100 mb-2">Pattern Matching</h4>
              <p class="text-sm text-amber-800 dark:text-amber-200">
                Rules match specific tree patterns and extract bound values
              </p>
            </div>
            <div class="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4">
              <h4 class="font-semibold text-amber-900 dark:text-amber-100 mb-2">Recursive</h4>
              <p class="text-sm text-amber-800 dark:text-amber-200">
                Transforms recursively process nested structures
              </p>
            </div>
            <div class="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4">
              <h4 class="font-semibold text-amber-900 dark:text-amber-100 mb-2">Type-Safe</h4>
              <p class="text-sm text-amber-800 dark:text-amber-200">
                Output is strongly typed Rust structs or Ruby objects
              </p>
            </div>
            <div class="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4">
              <h4 class="font-semibold text-amber-900 dark:text-amber-100 mb-2">Composable</h4>
              <p class="text-sm text-amber-800 dark:text-amber-200">
                Multiple transforms can be chained or combined
              </p>
            </div>
          </div>
        </section>

        <!-- Building Your First Parser -->
        <section id="first-parser" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Building Your First Parser
          </h2>

          <div class="prose dark:prose-invert max-w-none mb-6">
            <p class="text-gray-600 dark:text-gray-400">
              Let's build a simple calculator parser that can evaluate expressions like <code>1 + 2 * 3</code>.
            </p>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 mb-8">
            <CodeTabs :rust="firstParserRust" :ruby="firstParserRuby" />
          </div>

          <div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">Result</h4>
            <p class="text-blue-800 dark:text-blue-200">
              The expression <code>1 + 2 * 3</code> correctly parses as <code>1 + (2 * 3) = 7</code>
              due to operator precedence!
            </p>
          </div>
        </section>

        <!-- Navigation -->
        <div class="mt-12 flex justify-between">
          <router-link to="/installation" class="btn btn-secondary">
            ← Installation
          </router-link>
          <router-link to="/examples" class="btn btn-primary">
            Browse Examples →
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CodeTabs from '../components/molecules/CodeTabs.vue'
import DocsNav from '../components/organisms/DocsNav.vue'

const parserAnatomyRust = `use parsanol::prelude::*;

// Basic atoms
let hello = str("hello");        // Match literal "hello"
let space = str(" ");            // Match literal " "
let name = re(r"[A-Za-z]+");    // Match letters
let punct = any();               // Match any character

// Combine with combinators
let greeting = hello
    .then(space)                  // Sequence: "hello "
    .then(name.as("name"))        // Capture with label
    .then(punct.maybe());        // Optional punctuation

// Parse input
let tree = greeting.parse("hello World!")?;`

const parserAnatomyRuby = `require 'parsanol'

# Basic atoms
hello = str("hello")             # Match literal "hello"
space = str(" ")                 # Match literal " "
name = re("[A-Za-z]+")           # Match letters
punct = any                      # Match any character

# Combine with combinators
greeting = hello
  >> space                       # Sequence: "hello "
  >> name.as(:name)              # Capture with label
  >> punct.maybe                 # Optional punctuation

# Parse input
tree = greeting.parse("hello World!")`

const transformAnatomyRust = `use parsanol::transform::*;

// Define output types
#[derive(Debug)]
pub struct Expr {
    pub kind: ExprKind,
}

#[derive(Debug)]
pub enum ExprKind {
    Number(i64),
    Add { left: Box<Expr>, right: Box<Expr> },
    Mul { left: Box<Expr>, right: Box<Expr> },
}

// Build transform with rules
let transform = TransformBuilder::new()
    .rule("int", |s: &str| {
        Ok(Expr {
            kind: ExprKind::Number(s.parse()?)
        })
    })
    .rule(("left", "op", "right"), |l, o, r| {
        let left = *l;
        let right = *r;
        let kind = match o {
            "+" => ExprKind::Add { left, right },
            "*" => ExprKind::Mul { left, right },
            _ => unimplemented!(),
        };
        Expr { kind }
    })
    .build();

// Apply transform
let expr = transform.apply(tree)?;`

const transformAnatomyRuby = `require 'parsanol'

# Define output classes
class Expr
  attr_reader :kind
  def initialize(kind)
    @kind = kind
  end
end

class Number < Expr
  attr_reader :value
  def initialize(value)
    super(:number)
    @value = value
  end
end

class Add < Expr
  attr_reader :left, :right
  def initialize(left, right)
    super(:add)
    @left = left
    @right = right
  end
end

# Build transform with rules
transform = Parsanol::Transform.new
transform.rule(:int) { |s| Number.new(s.to_i) }
transform.rule(:left, :op, :right) do |l, o, r|
  case o
  when '+' then Add.new(l, r)
  when '*' then Mul.new(l, r)
  end
end

# Apply transform
expr = transform.apply(tree)`

const firstParserRust = `use parsanol::prelude::*;
use parsanol::portable::parser_dsl::*;

// Build grammar with precedence
let grammar = GrammarBuilder::new()
    .rule("number", re(r"[0-9]+").as("int"))
    .rule("mul_op", str("*").as("op"))
    .rule("add_op", str("+").as("op"))
    .rule("mult", seq(vec![
        dynamic(number()),
        dynamic(mul_op()),
        dynamic(number()),
    ]))
    .rule("add", seq(vec![
        dynamic(mult().as("left")),
        dynamic(add_op().as("op")),
        dynamic(mult().as("right")),
    ]))
    .root("add")
    .build();

// Parse: 1 + 2 * 3
let tree = grammar.parse("1+2*3")?;`

const firstParserRuby = `require 'parsanol'

# Build grammar with precedence
parser = GrammarBuilder.new
parser.rule(:number, re("[0-9]+").as(:int))
parser.rule(:mul_op, str("*").as(:op))
parser.rule(:add_op, str("+").as(:op))

# Note: Ruby version uses InfixParser for cleaner precedence
class CalculatorParser < Parsanol::InfixParser
  root :add

  rule(:number) { match('[0-9]').repeat(1) }

  rule(:mult) {
    number.as(:left) >> mul_op.as(:op) >> number.as(:right)
  }

  rule(:add) {
    (mult | number).as(:left) >> add_op.as(:op) >> (mult | number).as(:right)
  }

  operator(:add_op, :add, :left, :right)
  operator(:mul_op, :mult, :left, :right, :prec, 2)
end

parser = CalculatorParser.new
tree = parser.parse("1 + 2 * 3")`

// Parses: 1 + 2 * 3 as 1 + (2 * 3)
</script>
