<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="flex gap-12">
      <div class="w-64 flex-shrink-0 hidden lg:block">
        <div class="sticky top-20 h-[calc(100vh-6rem)] overflow-y-auto">
          <DocsNav :show-sections="['transforms']" />
        </div>
      </div>

      <div class="flex-1 min-w-0">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-8">Transforms</h1>

        <!-- Why Transforms -->
        <section id="why-transforms" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Why Transforms?</h2>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            Parsers produce parse trees - nested structures that represent the matched input. Transforms convert these trees into meaningful data structures.
          </p>

          <CodeTabs
            :rust="whyTransformsRust"
            :ruby="whyTransformsRuby"
          />
        </section>

        <!-- Pattern Matching -->
        <section id="pattern-matching" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Pattern Matching</h2>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            The transform system uses pattern matching on parse tree nodes.
          </p>

          <CodeTabs
            :rust="patternMatchingRust"
            :ruby="patternMatchingRuby"
          />
        </section>

        <!-- Simple Transforms -->
        <section id="simple-transforms" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Simple Transforms</h2>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            Transform individual leaf values.
          </p>

          <CodeTabs
            :rust="simpleTransformRust"
            :ruby="simpleTransformRuby"
          />
        </section>

        <!-- Sequence Transforms -->
        <section id="sequence-transforms" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Sequence Transforms</h2>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            Transform sequences of values.
          </p>

          <CodeTabs
            :rust="sequenceTransformRust"
            :ruby="sequenceTransformRuby"
          />
        </section>

        <!-- Subtree Transforms -->
        <section id="subtree-transforms" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Subtree Transforms</h2>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            Transform nested tree structures.
          </p>

          <CodeTabs
            :rust="subtreeTransformRust"
            :ruby="subtreeTransformRuby"
          />
        </section>

        <!-- Custom Transformers -->
        <section id="custom-transformers">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Custom Transformers</h2>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            Create reusable transformer functions.
          </p>

          <CodeTabs
            :rust="customTransformerRust"
            :ruby="customTransformerRuby"
          />
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CodeTabs from '../components/molecules/CodeTabs.vue'
import DocsNav from '../components/organisms/DocsNav.vue'

const whyTransformsRust = `// Without transform - you get a parse tree
let parser = str("hello").then(str(" ")).then(re(r"[A-Za-z]+"));
let result = parser.parse("hello World");
// result: Ok((("hello", " "), "World"))

// With transform - you get structured data
let greeting = str("hello")
    .then(str(" ").ignore())
    .then(re(r"[A-Za-z]+").as("name"))
    .transform(|node| {
        format!("Hello, {}!", node["name"])
    });

let result = greeting.parse("hello World");
// result: Ok("Hello, World!")`

const whyTransformsRuby = `# Without transform - you get a parse tree
parser = str("hello") >> str(" ") >> re("[A-Za-z]+")
result = parser.parse("hello World")
# result.value: ["hello", " ", "World"]

# With transform - you get structured data
greeting = str("hello") >>
  str(" ").ignore >>
  re("[A-Za-z]+").as(:name) >>
  transform { |node| "Hello, #{node[:name]}!" }

result = greeting.parse("hello World")
# result.value: "Hello, World!"`

const patternMatchingRust = `// The Tree node has variants:
// - Tree::Value(String) - leaf values
// - - Tree::Sequence(Vec<Tree>) - sequences
// - Tree::Named { name, tree } - named captures
// - Tree::Error(err) - error nodes

match tree {
    Tree::Value(v) => parse_value(&v),
    Tree::Sequence(items) => process_sequence(items),
    Tree::Named { name, tree } => process_named(name, *tree),
    _ => default_processing(),
}`

const patternMatchingRuby = `# The node has a :type and :value
# Access patterns:
// node[:type] => :value, :sequence, :named, :error
# node[:value] => the actual value
# node[:name] => for named captures

case node[:type]
when :value then parse_value(node[:value])
when :sequence then process_sequence(node[:value])
when :named then process_named(node[:name], node[:value])
else default_processing
end`

const simpleTransformRust = `// Transform a single value
let parser = re(r"[0-9]+").transform(|s| s.parse::<i32>().unwrap());

let result = parser.parse("123");
assert_eq!(result.unwrap(), 123);`

const simpleTransformRuby = `# Transform a single value
parser = re("[0-9]+").transform { |s| s.to_i }

result = parser.parse("123")
puts result.value  # => 123`

const sequenceTransformRust = `// Transform a sequence into a Vec
let parser = re(r"[0-9]+")
    .repeat(1, None)
    .transform(|nodes| {
        nodes.iter()
            .map(|s| s.parse::<i32>().unwrap())
            .collect::<Vec<_>>()
    });

let result = parser.parse("1 2 3");`

const sequenceTransformRuby = `# Transform a sequence
parser = re("[0-9]+").repeat(1).transform { |nodes|
  nodes.map(&:to_i)
}

result = parser.parse("1 2 3")
puts result.value  # => [1, 2, 3]`

const subtreeTransformRust = `// Transform nested structures
let pair = str("(")
    .then(re(r"[0-9]+").as("first"))
    .then(str(",").ignore())
    .then(re(r"[0-9]+").as("second"))
    .then(str(")"))
    .transform(|node| {
        let a = node["first"].string().parse::<i32>().unwrap();
        let b = node["second"].string().parse::<i32>().unwrap();
        (a, b)
    });

let result = pair.parse("(1,2)").unwrap();`

const subtreeTransformRuby = `# Transform nested structures
pair = str("(") >>
  re("[0-9]+").as(:first) >>
  str(",").ignore >>
  re("[0-9]+").as(:second) >>
  str(")") >>
  transform { |node|
    [node[:first].to_i, node[:second].to_i]
  }

result = pair.parse("(1,2)").value  # => [1, 2]`

const customTransformerRust = `// Reusable transformer
fn number_transform() -> impl Parser<Out = i32> {
    re(r"[0-9]+").transform(|s| s.parse().unwrap())
}

// Use it in multiple places
let parser = number_transform().then(
    str("+").ignore().then(number_transform())
        .transform(|(a, b)| a + b)
);`

const customTransformerRuby = `# Reusable transformer
def number_transform
  re("[0-9]+").transform(&:to_i)
end

# Use it in multiple places
parser = number_transform >> str("+").ignore >> number_transform >> transform { |(a, b)| a + b }`
</script>
