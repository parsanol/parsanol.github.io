<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="flex gap-12">
      <div class="w-64 flex-shrink-0 hidden lg:block">
        <div class="sticky top-20 h-[calc(100vh-6rem)] overflow-y-auto">
          <DocsNav :show-sections="['examples']" />
        </div>

      <div class="flex-1 min-w-0">
        <router-link to="/examples" class="text-primary-600 dark:text-primary-400 hover:text-primary-700 mb-4 inline-flex items-center">
          <Icon name="chevron-right" class="w-4 h-4 rotate-180 mr-1" />
          Back to Examples
        </router-link>

        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">Calculator</h1>
        <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Build an expression parser with operator precedence using infix combinators.
        </p>

        <!-- Grammar -->
        <section class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Expression Grammar</h2>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            We'll parse mathematical expressions with proper operator precedence: parentheses, then multiplication/division, then addition/subtraction.
          </p>

          <CodeTabs
            :rust="grammarRust"
            :ruby="grammarRuby"
          />
        </section>

        <!-- Implementation -->
        <section class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Implementation</h2>

          <CodeTabs
            :rust="implementationRust"
            :ruby="implementationRuby"
          />
        </section>

        <!-- Associativity -->
        <section class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Handling Associativity</h2>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            By default, operations are left-associative. Use <code>right()</code> for right-associative operators like exponentiation.
          </p>

          <CodeTabs
            :rust="associativityRust"
            :ruby="associativityRuby"
          />
        </section>

        <!-- Complete Example -->
        <section>
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Complete Example</h2>

          <CodeTabs
            :rust="completeRust"
            :ruby="completeRuby"
          />
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from '../components/atoms/Icon.vue'
import CodeTabs from '../components/molecules/CodeTabs.vue'
import DocsNav from '../components/organisms/DocsNav.vue'

const grammarRust = `// Grammar (from lowest to highest precedence):
// expression  = term (("+" | "-") term)*
// term       = factor (("*" | "/") factor)*
// factor     = power ("^" power)?
// power      = unary | number
// unary      = "-" unary | "(" expression ")"

let expr = infix(
    term,
    infix_helper([
        ("+", Associativity::Left, |a, b| a + b),
        ("-", Associativity::Left, |a, b| a - b),
    ])
);

let term = infix(
    factor,
    infix_helper([
        ("*", Associativity::Left, |a, b| a * b),
        ("/", Associativity::Left, |a, b| a / b),
    ])
);

let power = factor
    .then(str("^").ignore().then(factor).maybe())
    .map(|(base, exp)| {
        exp.map(|((), e)| base.pow(e)).unwrap_or(base)
    });`

const grammarRuby = `# Grammar (from lowest to highest precedence):
# expression  = term (("+" | "-") term)*
# term       = factor (("*" | "/") factor)*
# power      = factor ("^" factor)?
# unary      = "-" unary | "(" expression ")"

expr = infix(
  term,
  {
    "+" => [:left, ->(a, b) { a + b }],
    "-" => [:left, ->(a, b) { a - b }],
  }
)

term = infix(
  factor,
  {
    "*" => [:left, ->(a, b) { a * b }],
    "/" => [:left, ->(a, b) { a / b }],
  }
)

power = factor >> (str("^").ignore >> factor).maybe >> transform { |base, exp|
  exp ? (base ** exp) : base
}`

const implementationRust = `use parsanol::prelude::*;
use parsanol::infix::{infix, assoc::*};

let expr = infix(term, |lhs, (op, _), rhs| {
    match op {
        "+" => lhs + rhs,
        "-" => lhs - rhs,
        _ => unreachable!(),
    }
}).parse;

let term = infix(factor, |lhs, (op, _), rhs| {
    match op {
        "*" => lhs * rhs,
        "/" => lhs / rhs,
        _ => unreachable!(),
    }
}).parse;

let result = expr.parse("1 + 2 * 3").unwrap();
assert_eq!(result.value(), 4);  // Correct precedence!`

const implementationRuby = `require 'parsanol'
require 'parsanol/infix'

expr = infix(term) do |lhs, (op, _), rhs|
  case op
  when "+" then lhs + rhs
  when "-" then lhs - rhs
  end
end

term = infix(factor) do |lhs, (op, _), rhs|
  case op
  when "*" then lhs * rhs
  when "/" then lhs / rhs
  end
end

result = expr.parse("1 + 2 * 3").value
puts result  # => 7 (correct!)`

const associativityRust = `// For right-associative exponentiation:
use parsanol::infix::assoc::Right;

let power = infix(
    atom,
    [("^", Right, |a, b| a.pow(b))]
).parse;

// Now 2^3^2 = 2^(3^2) = 512, not (2^3)^2 = 64
let result = power.parse("2^3^2").unwrap();
assert_eq!(result.value(), 512.0);`

const associativityRuby = `# For right-associative exponentiation:
power = infix(atom, {
  "^" => [:right, ->(a, b) { a ** b }]
})

# Now 2^3^2 = 2^(3^2) = 512, not (2^3)^2 = 64
result = power.parse("2^3^2").value
puts result  # => 512.0`

const completeRust = `use parsanol::prelude::*;
use parsanol::infix::{infix, assoc::*};

fn main() {
    let atom = re(r"[0-9]+")
            .transform(|s| s.parse::<f64>().unwrap())
        .or(str("(").ignore().then(expr).then(str(")").ignore()).map(|(((), e), ())| e));

    let power = infix(atom, [("^", Right, |a, b| a.pow(b))]);

    let factor = infix(power, [
        ("*", Left, |a, b| a * b),
        ("/", Left, |a, b| a / b),
    ]);

    let term = infix(factor, [
        ("+", Left, |a, b| a + b),
        ("-", Left, |a, b| a - b),
    ]);

    let expr = term;  // For simple expressions

    // Test
    println!("{}", expr.parse("1 + 2 * 3").unwrap());      // 7
    println!("{}", expr.parse("(1 + 2) * 3").unwrap());   // 9
    println!("{}", expr.parse("2^3^2").unwrap());         // 512
}`

const completeRuby = `require 'parsanol'
require 'parsanol/infix'

atom = re("[0-9]+").transform(&:to_f) |
       str("(").ignore >> expr >> str(")").ignore

power = infix(atom, { "^" => [:right, ->(a, b) { a ** b }] })

factor = infix(power, {
  "*" => [:left, ->(a, b) { a * b }],
  "/" => [:left, ->(a, b) { a / b }],
})

term = infix(factor, {
  "+" => [:left, ->(a, b) { a + b }],
  "-" => [:left, ->(a, b) { a - b }],
})

expr = term

# Test
puts expr.parse("1 + 2 * 3").value      # => 7
puts expr.parse("(1 + 2) * 3").value     # => 9
puts expr.parse("2^3^2").value           # => 512.0`
</script>
