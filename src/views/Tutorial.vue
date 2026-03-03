<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="flex gap-12">
      <div class="w-64 flex-shrink-0 hidden lg:block">
        <div class="sticky top-20 h-[calc(100vh-6rem)] overflow-y-auto">
          <DocsNav :show-sections="['tutorial']" />
        </div>
      </div>

      <div class="flex-1 min-w-0">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">Parser Writing Tutorial</h1>
        <p class="text-xl text-gray-600 dark:text-gray-400 mb-12">
          Learn to build parsers from scratch with Parsanol.
        </p>

        <!-- Introduction -->
        <section id="introduction" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Introduction</h2>
          <div class="prose dark:prose-invert max-w-none">
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              A <strong>parser</strong> is a program that analyzes text according to a set of rules (grammar)
              and produces a structured representation of that text. Parsanol is a <strong>parser combinator</strong>
              library that lets you build parsers by combining smaller parsers together.
            </p>
            <p class="text-gray-600 dark:text-gray-400">
              This tutorial will take you from zero to building real parsers.
            </p>
          </div>
        </section>

        <!-- Chapter 1: Basic Atoms -->
        <section id="chapter-1" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Chapter 1: Basic Atoms</h2>
          <div class="prose dark:prose-invert max-w-none mb-6">
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              <strong>Atoms</strong> are the fundamental building blocks of parsers. They match specific
              patterns in the input text.
            </p>
          </div>

          <div class="card mb-6">
            <h3 class="font-semibold text-gray-900 dark:text-white mb-4">str() - Match Literal String</h3>
            <CodeTabs :rust="chapter1Str" :ruby="chapter1StrRuby" />
          </div>

          <div class="card mb-6">
            <h3 class="font-semibold text-gray-900 dark:text-white mb-4">re() - Regular Expression</h3>
            <CodeTabs :rust="chapter1Re" :ruby="chapter1ReRuby" />
          </div>

          <div class="card mb-6">
            <h3 class="font-semibold text-gray-900 dark:text-white mb-4">any() - Any Character</h3>
            <CodeTabs :rust="chapter1Any" :ruby="chapter1AnyRuby" />
          </div>

          <div class="card">
            <h3 class="font-semibold text-gray-900 dark:text-white mb-4">match() - Character Class</h3>
            <CodeTabs :rust="chapter1Match" :ruby="chapter1MatchRuby" />
          </div>
        </section>

        <!-- Chapter 2: Combinators -->
        <section id="chapter-2" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Chapter 2: Combinators</h2>
          <div class="prose dark:prose-invert max-w-none mb-6">
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              <strong>Combinators</strong> combine atoms (and other combinators) to build more complex parsers.
            </p>
          </div>

          <div class="card mb-6">
            <h3 class="font-semibold text-gray-900 dark:text-white mb-4">Sequence (then or >>)</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Match multiple patterns in order.
            </p>
            <CodeTabs :rust="chapter2Seq" :ruby="chapter2SeqRuby" />
          </div>

          <div class="card mb-6">
            <h3 class="font-semibold text-gray-900 dark:text-white mb-4">Choice (or or |)</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Try each alternative in order.
            </p>
            <CodeTabs :rust="chapter2Choice" :ruby="chapter2ChoiceRuby" />
          </div>

          <div class="card mb-6">
            <h3 class="font-semibold text-gray-900 dark:text-white mb-4">Repetition (repeat)</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Match patterns zero or more times.
            </p>
            <CodeTabs :rust="chapter2Repeat" :ruby="chapter2RepeatRuby" />
          </div>

          <div class="card">
            <h3 class="font-semibold text-gray-900 dark:text-white mb-4">Optional (maybe)</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Match a pattern zero or one time.
            </p>
            <CodeTabs :rust="chapter2Maybe" :ruby="chapter2MaybeRuby" />
          </div>
        </section>

        <!-- Chapter 3: Captures -->
        <section id="chapter-3" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Chapter 3: Captures & Labels</h2>

          <div class="card mb-6">
            <h3 class="font-semibold text-gray-900 dark:text-white mb-4">Labels (.as)</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Attach names to matched content for the parse tree.
            </p>
            <CodeTabs :rust="chapter3Label" :ruby="chapter3LabelRuby" />
          </div>

          <div class="card">
            <h3 class="font-semibold text-gray-900 dark:text-white mb-4">Lookahead</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Check what's ahead without consuming input.
            </p>
            <CodeTabs :rust="chapter3Lookahead" :ruby="chapter3LookaheadRuby" />
          </div>
        </section>

        <!-- Chapter 4: Building a Real Parser -->
        <section id="chapter-4" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Chapter 4: Building a Real Parser</h2>
          <div class="prose dark:prose-invert max-w-none mb-6">
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Let's build a complete JSON parser step by step.
            </p>
          </div>

          <div class="card mb-6">
            <h3 class="font-semibold text-gray-900 dark:text-white mb-4">Step 1: Basic Structure</h3>
            <CodeTabs :rust="chapter4Step1" :ruby="chapter4Step1Ruby" />
          </div>

          <div class="card mb-6">
            <h3 class="font-semibold text-gray-900 dark:text-white mb-4">Step 2: Numbers and Strings</h3>
            <CodeTabs :rust="chapter4Step2" :ruby="chapter4Step2Ruby" />
          </div>

          <div class="card mb-6">
            <h3 class="font-semibold text-gray-900 dark:text-white mb-4">Step 3: Arrays and Objects</h3>
            <CodeTabs :rust="chapter4Step3" :ruby="chapter4Step3Ruby" />
          </div>

          <div class="card">
            <h3 class="font-semibold text-gray-900 dark:text-white mb-4">Step 4: Complete Parser</h3>
            <CodeTabs :rust="chapter4Complete" :ruby="chapter4CompleteRuby" />
          </div>
        </section>

        <!-- Chapter 5: Transformations -->
        <section id="chapter-5" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Chapter 5: Transformations</h2>
          <div class="prose dark:prose-invert max-w-none mb-6">
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Transforms convert the generic parse tree into your domain objects.
            </p>
          </div>

          <div class="card mb-6">
            <h3 class="font-semibold text-gray-900 dark:text-white mb-4">Basic Transform</h3>
            <CodeTabs :rust="chapter5Basic" :ruby="chapter5BasicRuby" />
          </div>

          <div class="card">
            <h3 class="font-semibold text-gray-900 dark:text-white mb-4">Recursive Transform</h3>
            <CodeTabs :rust="chapter5Recursive" :ruby="chapter5RecursiveRuby" />
          </div>
        </section>

        <!-- Best Practices -->
        <section id="best-practices" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Best Practices</h2>

          <div class="space-y-4">
            <div class="card">
              <h3 class="font-semibold text-gray-900 dark:text-white mb-2">1. Start Simple</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm">
                Build your parser incrementally. Test each rule before combining them.
              </p>
            </div>

            <div class="card">
              <h3 class="font-semibold text-gray-900 dark:text-white mb-2">2. Handle Whitespace</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm">
                Create a reusable `space?` rule and use it throughout your grammar.
              </p>
            </div>

            <div class="card">
              <h3 class="font-semibold text-gray-900 dark:text-white mb-2">3. Name Your Rules</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm">
                Use `.as(:name)` to label captures for easier debugging.
              </p>
            </div>

            <div class="card">
              <h3 class="font-semibold text-gray-900 dark:text-white mb-2">4. Use Two-Stage Parsing</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm">
                Separate parsing (syntax) from transformation (semantics).
              </p>
            </div>
          </div>
        </section>

        <!-- Navigation -->
        <div class="mt-12 flex justify-between">
          <router-link to="/first-parser" class="btn btn-secondary">
            ← Your First Parser
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

// Chapter 1: Basic Atoms
const chapter1Str = `// Match exact string "hello"
let hello = str("hello");
let result = hello.parse("hello");
assert!(result.is_ok());`

const chapter1StrRuby = `# Match exact string "hello"
hello = str("hello")
result = hello.parse("hello")
# => #<Parslet::Slice:0x... @value="hello">`

const chapter1Re = `// Match regex pattern [a-z]+ (one or more letters)
let word = re(r"[a-z]+");
let result = word.parse("hello");
assert!(result.is_ok());`

const chapter1ReRuby = `# Match regex pattern [a-z]+ (one or more letters)
word = re("[a-z]+")
result = word.parse("hello")
# => #<Parslet::Slice:0x... @value="hello">`

const chapter1Any = `// Match any single character
let any_char = any();
let result = any_char.parse("x");
assert!(result.is_ok());`

const chapter1AnyRuby = `# Match any single character
any_char = any
result = any_char.parse("x")
# => #<Parslet::Slice:0x... @value="x">`

const chapter1Match = `// Match character class [0-9]
let digit = match("[0-9]");`

const chapter1MatchRuby = `# Match character class [0-9]
digit = match("[0-9]")`

// Chapter 2: Combinators
const chapter2Seq = `// Sequence: match "hello" then " " then "world"
let greeting = str("hello") >> str(" ") >> str("world");`

const chapter2SeqRuby = `# Sequence: match "hello" then " " then "world"
greeting = str("hello") >> str(" ") >> str("world")`

const chapter2Choice = `// Choice: match "yes" or "no"
let yes_no = str("yes") | str("no");`

const chapter2ChoiceRuby = `# Choice: match "yes" or "no"
yes_no = str("yes") | str("no")`

const chapter2Repeat = `// Zero or more: match letters
let letters = re(r"[a-z]+").repeat();
// One or more: match digits
let digits = re(r"[0-9]+").repeat(1);
// Range: 1-3 times
let few = re(r"[a-z]").repeat(1, 3);`

const chapter2RepeatRuby = `# Zero or more: match letters
letters = re("[a-z]+").repeat
# One or more: match digits
digits = re("[0-9]+").repeat(1)
# Range: 1-3 times
few = re("[a-z]").repeat(1, 3)`

const chapter2Maybe = `// Optional: match "Mr." or nothing
let title = str("Mr.").maybe();`

const chapter2MaybeRuby = `# Optional: match "Mr." or nothing
title = str("Mr.").maybe`

// Chapter 3: Captures
const chapter3Label = `// Label captured content
let word = re(r"[a-z]+").as("word");
// Parse tree: {word: "hello"}`

const chapter3LabelRuby = `# Label captured content
word = re("[a-z]+").as(:word)
# Parse tree: {:word => "hello"}`

const chapter3Lookahead = `// Positive lookahead: must have "http" ahead
let http_url = str("http").present() >> re(r".*");

// Negative lookahead: not followed by "end"
let safe_end = str("end").absent() >> re(r".+");`

const chapter3LookaheadRuby = `# Positive lookahead: must have "http" ahead
http_url = str("http").present >> re(".*")

# Negative lookahead: not followed by "end"
safe_end = str("end").absent >> re(".+")`

// Chapter 4: Building a Real Parser
const chapter4Step1 = `// JSON Parser - Step 1: Basic structure

let json = choice!(vec![
    str("null").map(|_| JsonValue::Null),
    str("true").map(|_| JsonValue::Bool(true)),
    str("false").map(|_| JsonValue::Bool(false)),
]);`

const chapter4Step1Ruby = `# JSON Parser - Step 1: Basic structure

class JsonParser < Parsanol::Parser
  root :value

  rule(:value) {
    str("null").as(:null) |
    str("true").as(:true) |
    str("false").as(:false)
  }
end`

const chapter4Step2 = `// JSON Parser - Step 2: Numbers and Strings

let number = re(r"-?[0-9]+(\.[0-9]+)?([eE][+-]?[0-9]+)?");
let string = str("\"") >> re(r#"[^"\\]*(\\.[^"\\]*)*"#).as("string") >> str("\"");`

const chapter4Step2Ruby = `# JSON Parser - Step 2: Numbers and Strings

rule(:number) {
  match["0-9"].repeat(1).as(:num)
}

rule(:string) {
  str('"') >> (match['^"\\\\'] | str('\\\\') >> any).repeat >> str('"')
}`

const chapter4Step3 = `// JSON Parser - Step 3: Arrays and Objects

let array = str("[") >> value.repeat(0) >> str("]");
let object = str("{") >> (string >> str(":") >> value).repeat(0) >> str("}");`

const chapter4Step3Ruby = `# JSON Parser - Step 3: Arrays and Objects

rule(:array) {
  str("[") >> (value >> str(",") >> value).repeat >> str("]")
}

rule(:object) {
  str("{") >> (string >> str(":") >> value).repeat >> str("}")
}`

const chapter4CompleteRuby = `# Complete JSON Parser

require 'parsanol'

class JsonParser < Parsanol::Parser
  root :value

  rule(:spaces) { match['\\s'].repeat }

  rule(:value) {
    spaces >> (
      object | array | string | number | literal
    ) >> spaces
  }

  rule(:object) {
    str('{') >> (
      entry >> (str(',') >> entry).repeat
    ).maybe >> str('}')
  end

  rule(:entry) {
    string.as(:key) >> str(':') >> value.as(:val)
  }

  rule(:array) {
    str('[') >> (
      value >> (str(',') >> value).repeat
    ).maybe >> str(']')
  end

  rule(:string) {
    str('"') >> (
      str('\\\\') >> any | str('"').absent? >> any
    ).repeat.as(:string) >> str('"')
  end

  rule(:number) {
    str('-').maybe >> (
      str('0') | match['1-9'] >> match['0-9'].repeat
    ) >> (
      str('.') >> match['0-9'].repeat
    ).maybe >> (
      match['eE'] >> str('+-').maybe >> match['0-9'].repeat
    ).maybe
  end

  rule(:literal) {
    str('null').as(:null) |
    str('true').as(:true) |
    str('false').as(:false)
  }
end

# Test
parser = JsonParser.new
puts parser.parse('{"name": "John", "age": 30}').inspect`

const chapter4Step4 = `// Full parser in Rust - see json_parser.rs example`

// Chapter 5: Transformations
const chapter5Basic = `// Transform: Convert parse tree to typed value

let transform = TransformBuilder::new()
    .rule("num", |s: &str| {
        Ok(Value::Number(s.parse()?))
    })
    .build();`

const chapter5BasicRuby = `# Transform: Convert parse tree to typed value

class JsonTransform < Parsanol::Transform
  rule(string: simple(:s)) { s.to_s }
  rule(num: simple(:n)) { Integer(n) }
  rule(null: simple(:n)) { nil }
  rule(true: simple(:t)) { true }
  rule(false: simple(:f)) { false }
end`

const chapter5Recursive = `// Recursive transform for nested structures

let transform = TransformBuilder::new()
    .rule("num", |s: &str| {
        Ok(Value::Number(s.parse()?))
    })
    .rule("array", |arr: Vec<Value>| {
        Ok(Value::Array(arr))
    })
    .rule("object", |pairs: Vec<(String, Value)>| {
        Ok(Value::Object(pairs.into_iter().collect()))
    })
    .build();`

const chapter5RecursiveRuby = `# Recursive transform for nested structures

class JsonTransform < Parsanol::Transform
  rule(string: simple(:s)) { s.to_s }
  rule(num: simple(:n)) { Integer(n) }
  rule(null: simple(:n)) { nil }
  rule(true: simple(:t)) { true }
  rule(false: simple(:f)) { false }

  # Recursive rules
  rule(array: sequence(:arr)) {
    arr.map { |v| transform_value(v) }
  }

  rule(object: sequence(:pairs)) {
    Hash[pairs.map { |k, v| [k, transform_value(v)] }]
  end

  def transform_value(tree)
    apply(tree)
  end
end`
</script>
