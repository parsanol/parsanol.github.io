<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-8">API Reference</h1>
    <p class="text-lg text-gray-600 dark:text-gray-400 mb-12">
      Complete reference for all Parsanol functions and types.
    </p>

    <SearchBox v-model="search" />

    <div class="mt-8 space-y-12">
      <!-- Basic Parsers -->
      <section>
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Basic Parsers</h2>

        <div class="space-y-6">
          <div class="card">
            <h3 class="text-lg font-mono font-semibold text-gray-900 dark:text-white mb-2">
              str(pattern: &str) -> Atom
            </h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Matches a literal string exactly.
            </p>
            <CodeTabs
              :rust="apiStrRust"
              :ruby="apiStrRuby"
            />
          </div>

          <div class="card">
            <h3 class="text-lg font-mono font-semibold text-gray-900 dark:text-white mb-2">
              re(pattern: &str) -> Atom
            </h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Matches a regular expression pattern.
            </p>
            <CodeTabs
              :rust="apiReRust"
              :ruby="apiReRuby"
            />
          </div>

          <div class="card">
            <h3 class="text-lg font-mono font-semibold text-gray-900 dark:text-white mb-2">
              any() -> Atom
            </h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Matches any single character.
            </p>
            <CodeTabs
              :rust="apiAnyRust"
              :ruby="apiAnyRuby"
            />
          </div>

          <div class="card">
            <h3 class="text-lg font-mono font-semibold text-gray-900 dark:text-white mb-2">
              eof() -> Atom
            </h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Matches end of input.
            </p>
            <CodeTabs
              :rust="apiEofRust"
              :ruby="apiEofRuby"
            />
          </div>

          <div class="card">
            <h3 class="text-lg font-mono font-semibold text-gray-900 dark:text-white mb-2">
              cut() -> Atom
            </h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Commits to the current parsing branch, preventing backtracking.
              Use after a decision point to improve error messages.
            </p>
            <CodeTabs
              :rust="apiCutRust"
              :ruby="apiCutRuby"
            />
          </div>
        </div>
      </section>

      <!-- Character Classes -->
      <section>
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Character Classes</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          Pre-defined character classes with O(1) lookup using pre-computed tables.
        </p>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div class="card p-4">
            <code class="text-primary-600 dark:text-primary-400">digit()</code>
            <p class="text-sm text-gray-500 mt-1">[0-9] or \d</p>
          </div>
          <div class="card p-4">
            <code class="text-primary-600 dark:text-primary-400">non_digit()</code>
            <p class="text-sm text-gray-500 mt-1">\D</p>
          </div>
          <div class="card p-4">
            <code class="text-primary-600 dark:text-primary-400">alpha()</code>
            <p class="text-sm text-gray-500 mt-1">[a-zA-Z]</p>
          </div>
          <div class="card p-4">
            <code class="text-primary-600 dark:text-primary-400">lower()</code>
            <p class="text-sm text-gray-500 mt-1">[a-z]</p>
          </div>
          <div class="card p-4">
            <code class="text-primary-600 dark:text-primary-400">upper()</code>
            <p class="text-sm text-gray-500 mt-1">[A-Z]</p>
          </div>
          <div class="card p-4">
            <code class="text-primary-600 dark:text-primary-400">alnum()</code>
            <p class="text-sm text-gray-500 mt-1">[a-zA-Z0-9]</p>
          </div>
          <div class="card p-4">
            <code class="text-primary-600 dark:text-primary-400">word()</code>
            <p class="text-sm text-gray-500 mt-1">[a-zA-Z0-9_] or \w</p>
          </div>
          <div class="card p-4">
            <code class="text-primary-600 dark:text-primary-400">non_word()</code>
            <p class="text-sm text-gray-500 mt-1">\W</p>
          </div>
          <div class="card p-4">
            <code class="text-primary-600 dark:text-primary-400">space()</code>
            <p class="text-sm text-gray-500 mt-1">[ \t\n\r\f\v] or \s</p>
          </div>
          <div class="card p-4">
            <code class="text-primary-600 dark:text-primary-400">non_space()</code>
            <p class="text-sm text-gray-500 mt-1">\S</p>
          </div>
          <div class="card p-4">
            <code class="text-primary-600 dark:text-primary-400">hex_digit()</code>
            <p class="text-sm text-gray-500 mt-1">[0-9a-fA-F]</p>
          </div>
          <div class="card p-4">
            <code class="text-primary-600 dark:text-primary-400">blank()</code>
            <p class="text-sm text-gray-500 mt-1">[ \t]</p>
          </div>
        </div>

        <CodeTabs
          :rust="charClassRust"
          :ruby="charClassRuby"
        />
      </section>

      <!-- Combinators -->
      <section>
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Combinators</h2>

        <div class="space-y-6">
          <div class="card">
            <h3 class="text-lg font-mono font-semibold text-gray-900 dark:text-white mb-2">
              .then(other: Atom) -> Atom
            </h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Sequences two parsers. Both must succeed in order.
            </p>
            <CodeTabs
              :rust="apiThenRust"
              :ruby="apiThenRuby"
            />
          </div>

          <div class="card">
            <h3 class="text-lg font-mono font-semibold text-gray-900 dark:text-white mb-2">
              .or(other: Atom) -> Atom
            </h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Ordered choice: tries the first parser, falls back to the second if it fails.
            </p>
            <CodeTabs
              :rust="apiOrRust"
              :ruby="apiOrRuby"
            />
          </div>

          <div class="card">
            <h3 class="text-lg font-mono font-semibold text-gray-900 dark:text-white mb-2">
              seq(atoms: Vec&lt;Atom&gt;) -> Atom
            </h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Sequence of multiple atoms. All must succeed in order.
            </p>
            <CodeTabs
              :rust="apiSeqRust"
              :ruby="apiSeqRuby"
            />
          </div>

          <div class="card">
            <h3 class="text-lg font-mono font-semibold text-gray-900 dark:text-white mb-2">
              choice(atoms: Vec&lt;Atom&gt;) -> Atom
            </h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Ordered choice among multiple alternatives. Tries each in order until one succeeds.
            </p>
            <CodeTabs
              :rust="apiChoiceRust"
              :ruby="apiChoiceRuby"
            />
          </div>
        </div>
      </section>

      <!-- Repetition -->
      <section>
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Repetition</h2>

        <div class="space-y-6">
          <div class="card">
            <h3 class="text-lg font-mono font-semibold text-gray-900 dark:text-white mb-2">
              .repeat(min: usize, max: Option&lt;usize&gt;) -> Atom
            </h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Repeats the parser between min and max times.
            </p>
            <CodeTabs
              :rust="apiRepeatRust"
              :ruby="apiRepeatRuby"
            />
          </div>

          <div class="card">
            <h3 class="text-lg font-mono font-semibold text-gray-900 dark:text-white mb-2">
              .many() -> Atom
            </h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Zero or more repetitions. Equivalent to <code>.repeat(0, None)</code>.
            </p>
            <CodeTabs
              :rust="apiManyRust"
              :ruby="apiManyRuby"
            />
          </div>

          <div class="card">
            <h3 class="text-lg font-mono font-semibold text-gray-900 dark:text-white mb-2">
              .many1() -> Atom
            </h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              One or more repetitions. Equivalent to <code>.repeat(1, None)</code>.
            </p>
            <CodeTabs
              :rust="apiMany1Rust"
              :ruby="apiMany1Ruby"
            />
          </div>

          <div class="card">
            <h3 class="text-lg font-mono font-semibold text-gray-900 dark:text-white mb-2">
              .optional() -> Atom
            </h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Makes the parser optional (zero or one). Equivalent to <code>.repeat(0, Some(1))</code>.
            </p>
            <CodeTabs
              :rust="apiOptionalRust"
              :ruby="apiOptionalRuby"
            />
          </div>
        </div>
      </section>

      <!-- Lookahead -->
      <section>
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Lookahead</h2>

        <div class="space-y-6">
          <div class="card">
            <h3 class="text-lg font-mono font-semibold text-gray-900 dark:text-white mb-2">
              .lookahead() -> Atom
            </h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Positive lookahead: succeeds if the pattern matches, but doesn't consume input.
            </p>
            <CodeTabs
              :rust="apiLookaheadRust"
              :ruby="apiLookaheadRuby"
            />
          </div>

          <div class="card">
            <h3 class="text-lg font-mono font-semibold text-gray-900 dark:text-white mb-2">
              .not_ahead() -> Atom
            </h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Negative lookahead: succeeds if the pattern does NOT match, doesn't consume input.
            </p>
            <CodeTabs
              :rust="apiNotAheadRust"
              :ruby="apiNotAheadRuby"
            />
          </div>
        </div>
      </section>

      <!-- Modifiers -->
      <section>
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Modifiers</h2>

        <div class="space-y-6">
          <div class="card">
            <h3 class="text-lg font-mono font-semibold text-gray-900 dark:text-white mb-2">
              .label(name: &str) -> Atom
            </h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Names the capture for later access in transforms. Key feature for structured output.
            </p>
            <CodeTabs
              :rust="apiLabelRust"
              :ruby="apiLabelRuby"
            />
          </div>

          <div class="card">
            <h3 class="text-lg font-mono font-semibold text-gray-900 dark:text-white mb-2">
              .ignore() -> Atom
            </h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Excludes the result from the output AST. Useful for whitespace and delimiters.
            </p>
            <CodeTabs
              :rust="apiIgnoreRust"
              :ruby="apiIgnoreRuby"
            />
          </div>
        </div>
      </section>

      <!-- Grammar -->
      <section>
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Grammar Definition</h2>

        <div class="space-y-6">
          <div class="card">
            <h3 class="text-lg font-mono font-semibold text-gray-900 dark:text-white mb-2">
              ref_(name: &str) -> Atom
            </h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              References a named rule in the grammar. Essential for recursive structures.
            </p>
            <CodeTabs
              :rust="apiRefRust"
              :ruby="apiRefRuby"
            />
          </div>

          <div class="card">
            <h3 class="text-lg font-mono font-semibold text-gray-900 dark:text-white mb-2">
              grammar! { ... }
            </h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Macro for defining grammars with named rules. Clean syntax for complex parsers.
            </p>
            <CodeTabs
              :rust="grammarMacroRust"
            />
          </div>
        </div>
      </section>

      <!-- Infix Builder -->
      <section>
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Infix Expressions</h2>

        <div class="card">
          <h3 class="text-lg font-mono font-semibold text-gray-900 dark:text-white mb-2">
            InfixBuilder
          </h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Builder for parsing infix expressions with operator precedence and associativity.
          </p>
          <CodeTabs
            :rust="infixBuilderRust"
            :ruby="infixBuilderRuby"
          />
        </div>
      </section>

      <!-- Transform System -->
      <section>
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Transform System</h2>

        <div class="space-y-6">
          <div class="card">
            <h3 class="text-lg font-mono font-semibold text-gray-900 dark:text-white mb-2">
              Transform::new()
            </h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Transform raw parse trees into structured data using pattern matching.
            </p>
            <CodeTabs
              :rust="transformRust"
              :ruby="transformRuby"
            />
          </div>
        </div>
      </section>

      <!-- Derive Macros -->
      <section>
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Derive Macros</h2>

        <div class="card">
          <h3 class="text-lg font-mono font-semibold text-gray-900 dark:text-white mb-2">
            #[derive(FromAst)]
          </h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Automatically derive AST-to-struct conversion for type-safe parsing.
          </p>
          <CodeTabs
            :rust="deriveMacroRust"
          />
        </div>
      </section>

      <!-- Visitor Pattern -->
      <section>
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Visitor Pattern</h2>

        <div class="card">
          <h3 class="text-lg font-mono font-semibold text-gray-900 dark:text-white mb-2">
            trait Visitor
          </h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Walk the AST without transforming it. Useful for analysis, validation, and code generation.
          </p>
          <CodeTabs
            :rust="visitorRust"
          />
        </div>
      </section>

      <!-- Streaming Builder -->
      <section>
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Streaming Builder</h2>

        <div class="card">
          <h3 class="text-lg font-mono font-semibold text-gray-900 dark:text-white mb-2">
            trait StreamingBuilder
          </h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Build custom output structures during parsing without intermediate AST.
            Zero-allocation for maximum performance.
          </p>
          <CodeTabs
            :rust="streamingBuilderRust"
          />
        </div>
      </section>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CodeTabs from '../components/molecules/CodeTabs.vue'
import SearchBox from '../components/molecules/SearchBox.vue'

const search = ref('')

// Basic Parsers
const apiStrRust = `use parsanol::portable::parser_dsl::*;

let parser = str("hello");
let result = parser.parse("hello world");
// Ok(("hello", " world"))`

const apiStrRuby = `require 'parsanol'

parser = str("hello")
result = parser.parse("hello world")
# => Success(value: "hello", rest: " world")`

const apiReRust = `use parsanol::portable::parser_dsl::*;

let parser = re("[0-9]+");
let result = parser.parse("123abc");
// Ok(("123", "abc"))`

const apiReRuby = `require 'parsanol'

parser = re("[0-9]+")
result = parser.parse("123abc")
# => Success(value: "123", rest: "abc")`

const apiAnyRust = `use parsanol::portable::parser_dsl::*;

let parser = any();
let result = parser.parse("a");
// Ok(('a', ""))`

const apiAnyRuby = `require 'parsanol'

parser = any()
result = parser.parse("a")
# => Success(value: "a", rest: "")`

const apiEofRust = `use parsanol::portable::parser_dsl::*;

let parser = str("hello").then(eof());
let result = parser.parse("hello");
// Ok((("hello", ()), ""))`

const apiEofRuby = `require 'parsanol'

parser = str("hello") >> eof()
result = parser.parse("hello")
# => Success(value: ["hello", nil], rest: "")`

const apiCutRust = `use parsanol::portable::parser_dsl::*;

// Without cut: both branches are tried on failure
let parser_no_cut = choice(vec![
    str("if").then(str(" ").ignore()),
    str("in"),
]);

// With cut: commit to branch after 'if', better errors
let parser_with_cut = choice(vec![
    str("if").then(cut()).then(str(" ").ignore()),
    str("in"),
]);`

const apiCutRuby = `require 'parsanol'

# Without cut: both branches are tried on failure
parser_no_cut = str("if") >> str(" ").ignore | str("in")

# With cut: commit to branch, better error messages
parser_with_cut = str("if") >> cut >> str(" ").ignore | str("in")`

// Character Classes
const charClassRust = `use parsanol::portable::parser_dsl::*;
use parsanol::portable::char_class::*;

// Match a digit
let parser = digit();
let result = parser.parse("5");
// Ok(('5', ""))

// Match a word character
let parser = word();
let result = parser.parse("a");
// Ok(('a', ""))

// Combine with combinators
let identifier = alpha().then(word().many());`

const charClassRuby = `require 'parsanol'

# Match a digit
parser = digit
result = parser.parse("5")
# => Success(value: "5", rest: "")

# Match a word character
parser = word
result = parser.parse("a")
# => Success(value: "a", rest: "")

# Combine with combinators
identifier = alpha >> word.many`

// Combinators
const apiThenRust = `use parsanol::portable::parser_dsl::*;

let parser = str("a").then(str("b"));
let result = parser.parse("ab");
// Ok((("a", "b"), ""))`

const apiThenRuby = `require 'parsanol'

parser = str("a") >> str("b")
result = parser.parse("ab")
# => Success(value: ["a", "b"], rest: "")`

const apiOrRust = `use parsanol::portable::parser_dsl::*;

let parser = str("a").or(str("b"));
let result = parser.parse("b");
// Ok(("b", ""))`

const apiOrRuby = `require 'parsanol'

parser = str("a") | str("b")
result = parser.parse("b")
# => Success(value: "b", rest: "")`

const apiSeqRust = `use parsanol::portable::parser_dsl::*;

let parser = seq(vec![
    str("hello"),
    str(" "),
    str("world"),
]);
let result = parser.parse("hello world");
// Ok((["hello", " ", "world"], ""))`

const apiSeqRuby = `require 'parsanol'

parser = seq([str("hello"), str(" "), str("world")])
result = parser.parse("hello world")
# => Success(value: ["hello", " ", "world"], rest: "")`

const apiChoiceRust = `use parsanol::portable::parser_dsl::*;

let parser = choice(vec![
    str("true"),
    str("false"),
    str("null"),
]);
let result = parser.parse("false");
// Ok(("false", ""))`

const apiChoiceRuby = `require 'parsanol'

parser = choice([str("true"), str("false"), str("null")])
result = parser.parse("false")
# => Success(value: "false", rest: "")`

// Repetition
const apiRepeatRust = `use parsanol::portable::parser_dsl::*;

// Exactly 3 times
let parser = str("a").repeat(3, Some(3));
let result = parser.parse("aaa");
// Ok((["a", "a", "a"], ""))

// 1 to 5 times
let parser = digit().repeat(1, Some(5));`

const apiRepeatRuby = `require 'parsanol'

# Exactly 3 times
parser = str("a").repeat(3, 3)
result = parser.parse("aaa")
# => Success(value: ["a", "a", "a"], rest: "")

# 1 to 5 times
parser = digit.repeat(1, 5)`

const apiManyRust = `use parsanol::portable::parser_dsl::*;

let parser = digit().many();
let result = parser.parse("123abc");
// Ok((["1", "2", "3"], "abc"))

// Empty match is valid
let result = parser.parse("abc");
// Ok(([], "abc"))`

const apiManyRuby = `require 'parsanol'

parser = digit.many
result = parser.parse("123abc")
# => Success(value: ["1", "2", "3"], rest: "abc")

# Empty match is valid
result = parser.parse("abc")
# => Success(value: [], rest: "abc")`

const apiMany1Rust = `use parsanol::portable::parser_dsl::*;

let parser = digit().many1();
let result = parser.parse("123abc");
// Ok((["1", "2", "3"], "abc"))

// Empty match fails
let result = parser.parse("abc");
// Err(...)`

const apiMany1Ruby = `require 'parsanol'

parser = digit.many1
result = parser.parse("123abc")
# => Success(value: ["1", "2", "3"], rest: "abc")

# Empty match fails
result = parser.parse("abc")
# => Failure(...)`

const apiOptionalRust = `use parsanol::portable::parser_dsl::*;

let parser = str("-").optional().then(digit().many1());
let result = parser.parse("-42");
// Ok((Some("-"), ["4", "2"]), "")

let result = parser.parse("42");
// Ok((None, ["4", "2"]), "")`

const apiOptionalRuby = `require 'parsanol'

parser = str("-").optional >> digit.many1
result = parser.parse("-42")
# => Success(value: ["-", ["4", "2"]], rest: "")

result = parser.parse("42")
# => Success(value: [nil, ["4", "2"]], rest: "")`

// Lookahead
const apiLookaheadRust = `use parsanol::portable::parser_dsl::*;

// Match "hello" only if followed by "world"
let parser = str("hello").lookahead(str("world")).then(str("hello"));
let result = parser.parse("hello world");
// Ok(("hello", " world"))`

const apiLookaheadRuby = `require 'parsanol'

# Match "hello" only if followed by "world"
parser = str("hello").lookahead(str("world")) >> str("hello")
result = parser.parse("hello world")
# => Success(value: "hello", rest: " world")`

const apiNotAheadRust = `use parsanol::portable::parser_dsl::*;

// Match keyword only if NOT followed by identifier character
let parser = re("if").not_ahead(alpha());
let result = parser.parse("if ");
// Ok(("if", " "))`

const apiNotAheadRuby = `require 'parsanol'

# Match keyword only if NOT followed by identifier character
parser = re("if").not_ahead(alpha)
result = parser.parse("if ")
# => Success(value: "if", rest: " ")`

// Modifiers
const apiLabelRust = `use parsanol::portable::parser_dsl::*;

let parser = str("hello")
    .then(str(" ").ignore())
    .then(re("[A-Za-z]+").label("name"));

let result = parser.parse("hello World");
let tree = result.unwrap();
// Access: tree["name"] => "World"`

const apiLabelRuby = `require 'parsanol'

parser = str("hello") >>
         str(" ").ignore >>
         re("[A-Za-z]+").label(:name)

result = parser.parse("hello World")
# Access: result.value[:name] => "World"`

const apiIgnoreRust = `use parsanol::portable::parser_dsl::*;

let parser = str("hello")
    .then(str(" ").ignore())
    .then(str("world"));

let result = parser.parse("hello world");
// Ok(("hello", "world")) - no space in output`

const apiIgnoreRuby = `require 'parsanol'

parser = str("hello") >>
         str(" ").ignore >>
         str("world")

result = parser.parse("hello world")
# Success(value: ["hello", "world"], rest: "") - no space`

// Grammar
const apiRefRust = `use parsanol::portable::parser_dsl::*;
use parsanol::portable::grammar::GrammarBuilder;

let grammar = GrammarBuilder::new()
    .rule("expr", ref_("term").then(str("+")).then(ref_("term")))
    .rule("term", digit().many1())
    .build();`

const apiRefRuby = `require 'parsanol'

class Calculator < Parsanol::Parser
  rule(:expr) { term >> str("+") >> term }
  rule(:term) { digit.many1 }
  root :expr
end`

const grammarMacroRust = `use parsanol::portable::parser_dsl::*;

let grammar = grammar! {
    "number" => re("[0-9]+"),
    "string" => str("\"").then(re("[^\"]*")).then(str("\"")),
    "value" => ref_("number").or(ref_("string")),
    "array" => str("[").then(ref_("value").many()).then(str("]")),
};`

// Infix Builder
const infixBuilderRust = `use parsanol::portable::infix::{InfixBuilder, Assoc};
use parsanol::portable::parser_dsl::*;

let expr_idx = InfixBuilder::new()
    .primary(ref_("atom"))
    .op("*", 2, Assoc::Left)     // Higher precedence
    .op("/", 2, Assoc::Left)
    .op("+", 1, Assoc::Left)     // Lower precedence
    .op("-", 1, Assoc::Left)
    .op("^", 3, Assoc::Right)    // Right-associative
    .build(&mut builder);`

const infixBuilderRuby = `require 'parsanol'

class Calculator < Parsanol::Parser
  rule(:atom) { integer | str("(") >> expr >> str(")") }

  rule(:expr) do
    infix_expression(atom,
      [str("^"), :right, 3],
      [str("*"), :left, 2],
      [str("/"), :left, 2],
      [str("+"), :left, 1],
      [str("-"), :left, 1]
    )
  end
end`

// Transform
const transformRust = `use parsanol::portable::transform::{Transform, Pattern, Value};

let transform = Transform::new()
    .rule("number", |v| {
        Value::Int(v.as_str().parse().unwrap())
    })
    .rule("string", |v| {
        Value::String(v.as_str().to_string())
    })
    .pattern(Pattern::sequence("array"), |bindings| {
        let items: Vec<Value> = bindings.get("items")
            .map(|v| v.as_array().cloned().unwrap_or_default())
            .unwrap_or_default();
        Value::Array(items)
    });`

const transformRuby = `require 'parsanol'

class JsonTransform < Parsanol::Transform
  rule(number: simple(:n)) { Integer(n) }
  rule(string: simple(:s)) { String(s) }
  rule(array: sequence(:items)) { items }
  rule(object: subtree(:o)) { o.to_h }
end`

// Derive Macro
const deriveMacroRust = `use parsanol::derive::FromAst;

#[derive(FromAst)]
#[parsanol(rule = "statement")]
pub enum Statement {
    #[parsanol(tag = "assignment")]
    Assignment {
        #[parsanol(field = "name")]
        variable: String,
        #[parsanol(field = "value")]
        value: Box<Expr>,
    },
    #[parsanol(tag = "return")]
    Return {
        #[parsanol(field = "value")]
        value: Option<Box<Expr>>,
    },
}

// Now you can parse directly into your types:
let stmt: Statement = parser.parse_with_transform(input)?;`

// Visitor
const visitorRust = `use parsanol::portable::visitor::{Visitor, AstNode, AstArena};

struct NodeCounter {
    count: usize,
}

impl Visitor for NodeCounter {
    fn visit_int(&mut self, _value: i64) {
        self.count += 1;
    }

    fn visit_string_ref(&mut self, _pool_index: u32, _arena: &AstArena) {
        self.count += 1;
    }

    fn visit_array_start(&mut self, _pool_index: u32, _length: u32) {
        self.count += 1;
    }
}

// Use the visitor
let mut counter = NodeCounter { count: 0 };
counter.visit_node(&root, &arena, input);
println!("Total nodes: {}", counter.count);`

// Streaming Builder
const streamingBuilderRust = `use parsanol::portable::streaming_builder::{StreamingBuilder, BuildResult};

struct JsonBuilder {
    output: String,
}

impl StreamingBuilder for JsonBuilder {
    type Output = String;

    fn on_string(&mut self, value: &str, _offset: usize, _length: usize) -> BuildResult<()> {
        self.output.push_str(&format!("\\"{}\"", value));
        Ok(())
    }

    fn on_int(&mut self, value: i64) -> BuildResult<()> {
        self.output.push_str(&value.to_string());
        Ok(())
    }

    fn on_array_start(&mut self, _length: usize) -> BuildResult<()> {
        self.output.push('[');
        Ok(())
    }

    fn on_array_end(&mut self) -> BuildResult<()> {
        self.output.push(']');
        Ok(())
    }

    fn finish(&mut self) -> BuildResult<Self::Output> {
        Ok(std::mem::take(&mut self.output))
    }
}`
</script>
