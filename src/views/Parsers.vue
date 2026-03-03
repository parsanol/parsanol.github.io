<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="flex gap-12">
      <div class="w-64 flex-shrink-0 hidden lg:block">
        <div class="sticky top-20 h-[calc(100vh-6rem)] overflow-y-auto">
          <DocsNav :show-sections="['parsers']" />
        </div>
      </div>

      <div class="flex-1 min-w-0">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-8">Parser Combinators</h1>

        <!-- Basic Atoms -->
        <section id="basic-atoms" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Basic Atoms</h2>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            Basic atoms are the building blocks of parsers. They match specific patterns in the input.
          </p>

          <div class="space-y-8">
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                <code>str("pattern")</code> - String Matching
              </h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4">
                Matches a literal string exactly.
              </p>
              <CodeTabs
                :rust="strExampleRust"
                :ruby="strExampleRuby"
              />
            </div>

            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                <code>re("pattern")</code> - Regular Expression
              </h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4">
                Matches a regular expression pattern.
              </p>
              <CodeTabs
                :rust="reExampleRust"
                :ruby="reExampleRuby"
              />
            </div>

            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                <code>any()</code> - Any Character
              </h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4">
                Matches any single character.
              </p>
              <CodeTabs
                :rust="anyExampleRust"
                :ruby="anyExampleRuby"
              />
            </div>
          </div>
        </section>

        <!-- Combinators -->
        <section id="combinators" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Combinators</h2>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            Combinators combine parsers to create more complex patterns.
          </p>

          <div class="space-y-8">
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Sequence - <code>.then()</code> or <code>&gt;&gt;</code>
              </h3>
              <CodeTabs
                :rust="thenExampleRust"
                :ruby="thenExampleRuby"
              />
            </div>

            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Alternative - <code>.or()</code> or <code>|</code>
              </h3>
              <CodeTabs
                :rust="orExampleRust"
                :ruby="orExampleRuby"
              />
            </div>

            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Repetition - <code>.repeat(min, max)</code>
              </h3>
              <CodeTabs
                :rust="repeatExampleRust"
                :ruby="repeatExampleRuby"
              />
            </div>

            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Optional - <code>.maybe()</code>
              </h3>
              <CodeTabs
                :rust="maybeExampleRust"
                :ruby="maybeExampleRuby"
              />
            </div>
          </div>
        </section>

        <!-- Advanced -->
        <section id="advanced" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Advanced</h2>

          <div class="space-y-8">
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Named Capture - <code>.as("name")</code>
              </h3>
              <CodeTabs
                :rust="asExampleRust"
                :ruby="asExampleRuby"
              />
            </div>

            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Lookahead - <code>.lookahead(bool)</code>
              </h3>
              <CodeTabs
                :rust="lookaheadExampleRust"
                :ruby="lookaheadExampleRuby"
              />
            </div>

            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Ignore Results - <code>.ignore()</code>
              </h3>
              <CodeTabs
                :rust="ignoreExampleRust"
                :ruby="ignoreExampleRuby"
              />
            </div>

            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Dynamic Parser - <code>dynamic()</code>
              </h3>
              <CodeTabs
                :rust="dynamicExampleRust"
                :ruby="dynamicExampleRuby"
              />
            </div>
          </div>
        </section>

        <!-- Infix Expressions -->
        <section id="infix" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Infix Expressions</h2>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            Parsanol provides special support for parsing infix expressions like mathematical expressions with operator precedence.
          </p>

          <CodeTabs
            :rust="infixExampleRust"
            :ruby="infixExampleRuby"
          />
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CodeTabs from '../components/molecules/CodeTabs.vue'
import DocsNav from '../components/organisms/DocsNav.vue'

// Basic Atoms
const strExampleRust = `// Match the literal string "hello"
let parser = str("hello");
let result = parser.parse("hello world");  // Ok(("hello", " world"))`

const strExampleRuby = `# Match the literal string "hello"
parser = str("hello")
result = parser.parse("hello world")  # => #<Parsanol::Success value="hello", rest=" world">`

const reExampleRust = `// Match one or more digits
let parser = re(r"[0-9]+");
let result = parser.parse("123abc");  // Ok(("123", "abc"))`

const reExampleRuby = `# Match one or more digits
parser = re("[0-9]+")
result = parser.parse("123abc")  # => #<Parsanol::Success value="123", rest="abc">`

const anyExampleRust = `// Match any single character
let parser = any();
let result = parser.parse("a");  // Ok(('a', ""))`

const anyExampleRuby = `# Match any single character
parser = any()
result = parser.parse("a")  # => #<Parsanol::Success value="a", rest="">`

// Combinators
const thenExampleRust = `// Match "hello" then " " then "world"
let parser = str("hello").then(str(" ")).then(str("world"));
let result = parser.parse("hello world");  // Ok((("hello", " "), "world"))`

const thenExampleRuby = `# Match "hello" then " " then "world"
parser = str("hello") >> str(" ") >> str("world")
result = parser.parse("hello world")  # => #<Parsanol::Success value=["hello", " ", "world"]>`

const orExampleRust = `// Match either "hello" or "goodbye"
let parser = str("hello").or(str("goodbye"));
let result = parser.parse("goodbye");  // Ok(("goodbye", ""))`

const orExampleRuby = `# Match either "hello" or "goodbye"
parser = str("hello") | str("goodbye")
result = parser.parse("goodbye")  # => #<Parsanol::Success value="goodbye", rest="">`

const repeatExampleRust = `// Match one or more digits
let parser = re(r"[0-9]+").repeat(1, None);
// Or use shorthand: .one_or_more()
// Match zero or more: .zero_or_more()

let result = parser.parse("123abc");  // Ok((["1", "2", "3"], "abc"))`

const repeatExampleRuby = `# Match one or more digits
parser = re("[0-9]+").repeat(1)
result = parser.parse("123abc")  # => #<Parsanol::Success value=["123"], rest="abc">`

const maybeExampleRust = `// Optionally match "!"
let parser = str("hello").maybe().then(str("world"));
let result1 = parser.parse("helloworld");  // Ok((None, "world"))
let result2 = parser.parse("hello world");  // Ok((None, " world"))`

const maybeExampleRuby = `# Optionally match "!"
parser = str("hello").maybe() >> str("world")
result1 = parser.parse("helloworld")  # => #<Parsanol::Success value=[nil, "world"]>`

// Advanced
const asExampleRust = `// Capture with a name
let parser = str("hello")
    .then(str(" ").ignore())
    .then(re(r"[A-Za-z]+").as("name"));

let result = parser.parse("hello World");
let tree = result.unwrap().1;
// Access: tree["name"] => "World"`

const asExampleRuby = `# Capture with a name
parser = str("hello") >> str(" ").ignore >> re("[A-Za-z]+").as(:name)

result = parser.parse("hello World")
tree = result.value
# Access: tree[:name] => "World"`

const lookaheadExampleRust = `// Positive lookahead - match "hello" only if followed by "!"
let parser = str("hello").lookahead(str("!"));
let result1 = parser.parse("hello!");  // Ok(("hello", ""))
let result2 = parser.parse("hello");  // Err(...)`

const lookaheadExampleRuby = `# Positive lookahead
parser = str("hello").lookahead(str("!"))
result1 = parser.parse("hello!")  # => #<Parsanol::Success value="hello", rest="">`

const ignoreExampleRust = `// Ignore the whitespace
let parser = str("hello").then(str(" ").ignore()).then(str("world"));
let result = parser.parse("hello world");
// Result: Ok(("hello", "world")) - no whitespace in output`

const ignoreExampleRuby = `# Ignore the whitespace
parser = str("hello") >> str(" ").ignore >> str("world")
result = parser.parse("hello world")
# Result: ["hello", "world"] - no whitespace in output`

const dynamicExampleRust = `// Dynamic parser based on input
let parser = dynamic(|input| {
    if input.starts_with("number") {
        re(r"[0-9]+").parse(input.strip_prefix("number").unwrap())
    } else {
        str("word").parse(input)
    }
});`

const dynamicExampleRuby = `# Dynamic parser
parser = dynamic { |input|
  if input.start_with?("number")
    re("[0-9]+").parse(input.sub(/^number/, ""))
  else
    str("word").parse(input)
  end
}`

// Infix
const infixExampleRust = `use parsanol::infix::*;

let expr = infix(re(r"[0-9]+"), |lhs, op, rhs| {
    // op is ("+", "+") or ("-", "-"), etc.
    match op.0 {
        "+" => lhs + rhs,
        "-" => lhs - rhs,
        _ => lhs * rhs,  // Default to multiplication
    }
});

let result = expr.parse("1 + 2 * 3");  // Ok((7, ""))`

const infixExampleRuby = `require 'parsanol/infix'

expr = infix(re("[0-9]+")) do |lhs, op, rhs|
  case op[0]
  when "+" then lhs + rhs
  when "-" then lhs - rhs
  else lhs * rhs
  end
end

result = expr.parse("1 + 2 * 3")
puts result.value  # => 7`
</script>
