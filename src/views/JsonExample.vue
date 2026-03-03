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

        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">JSON Parser</h1>
        <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
          A complete JSON parser demonstrating all three transformation options.
        </p>

        <!-- Grammar Definition -->
        <section class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Grammar Definition</h2>

          <CodeTabs
            :rust="grammarRust"
            :ruby="grammarRuby"
          />
        </section>

        <!-- Ruby Transform -->
        <section class="mb-16">
          <div class="flex items-center gap-3 mb-6">
            <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Ruby Transform</h2>
            <Badge variant="rust">Rust</Badge>
            <Badge variant="ruby">Ruby</Badge>
          </div>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Parse in Rust, transform in Ruby. Uses named captures to build a tree structure that's transformed in Ruby.
          </p>

          <CodeTabs
            :rust="rubyTransformRust"
            :ruby="rubyTransformRuby"
          />
        </section>

        <!-- Serialized -->
        <section class="mb-16">
          <div class="flex items-center gap-3 mb-6">
            <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Serialized</h2>
            <Badge variant="rust">Rust</Badge>
            <Badge variant="ruby">Ruby</Badge>
          </div>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Parse and transform in Rust, output as JSON. Best performance with serialization.
          </p>

          <CodeTabs
            :rust="serializedRust"
            :ruby="serializedRuby"
          />
        </section>

        <!-- Native -->
        <section class="mb-16">
          <div class="flex items-center gap-3 mb-6">
            <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Native</h2>
            <Badge variant="rust">Rust</Badge>
            <Badge variant="ruby">Ruby</Badge>
          </div>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Direct Ruby object construction via FFI. Define structures that mirror your JSON and parse directly into them.
          </p>

          <CodeTabs
            :rust="nativeRust"
            :ruby="nativeRuby"
          />
        </section>

        <!-- Try It -->
        <section>
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Try It Out</h2>
          <div class="card">
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Run the complete example in your project:
            </p>
            <CodeTabs
              :rust="tryItRust"
              :ruby="tryItRuby"
            />
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Badge from '../components/atoms/Badge.vue'
import Icon from '../components/atoms/Icon.vue'
import CodeTabs from '../components/molecules/CodeTabs.vue'
import DocsNav from '../components/organisms/DocsNav.vue'

const grammarRust = `use parsanol::prelude::*;

// JSON Grammar
let json_value = json_object
    .or(json_array)
    .or(json_string)
    .or(json_number)
    .or(json_true)
    .or(json_false)
    .or(json_null);

let json_object = str("{")
    .then(key_values.maybe())
    .then(str("}"))
    .map(|((_, values), _)| values.unwrap_or_default());

let key_values = pair.repeat(1, None);

let pair = json_string
    .then(str(":").ignore())
    .then(json_value)
    .map(|(k, v)| (k, v));

let json_array = str("[")
    .then(values.maybe())
    .then(str("]"))
    .map(|((_, vals), _)| vals.unwrap_or_default());

let values = json_value.separated_by(str(","));`

const grammarRuby = `require 'parsanol'

# JSON Grammar
json_value = json_object | json_array | json_string |
             json_number | json_true | json_false | json_null

json_object = str("{") >>
              (key_values.maybe()) >>
              str("}") >>
              transform { |((_, values), _)| values || [] }

key_values = pair.separated_by(str(",")).repeat(1)

pair = json_string >>
      str(":").ignore >>
      json_value >>
      transform { |(k, v)| [k, v] }

json_array = str("[") >>
             (values.maybe()) >>
             str("]") >>
             transform { |((_, vals), _)| vals || [] }

values = json_value.separated_by(str(","))`

const rubyTransformRust = `// Ruby Transform: Parse in Rust, transform in Ruby
use serde_json::Value;

let json = json_value.transform(|node| {
    match node {
        Tree::Value(s) => Value::String(s),
        Tree::Sequence(items) => {
            Value::Array(items.into_iter().map(transform_node).collect())
        }
        Tree::Named { name, tree } => {
            let mut map = serde_json::Map::new();
            map.insert(name, transform_node(*tree));
            Value::Object(map)
        }
        _ => Value::Null,
    }
});

fn transform_node(tree: Tree) -> Value { ... }`

const rubyTransformRuby = `# Ruby Transform: Parse in Rust, transform in Ruby
require 'parsanol'

json = json_value >> transform { |node|
  case node[:type]
  when :value
    JSON.parse(node[:value])
  when :array
    node[:value].map { |v| transform_node(v) }
  when :object
    Hash[node[:value].map { |k, v| [k, transform_node(v)] }]
  when :true
    true
  when :false
    false
  when :null
    nil
  end
}`

const serializedRust = `// Serialized: Parse + transform in Rust, JSON output
use serde_json::json;

let json_string = re(r#""[^"\\]*(?:\\.[^"\\]*)*""#)
    .transform(|s| json!(s));

let json_number = re(r"-?(?:[0-9]+(?:\.[0-9]+)?(?:[eE][+-]?[0-9]+)?)")
    .transform(|s| json!(s.parse::<f64>().unwrap()));

let json_object = str("{")
    .then(key_values.maybe())
    .then(str("}"))
    .transform(|((_, values), _)| {
        let map: Map<String, Value> = values
            .unwrap_or_default()
            .into_iter()
            .collect();
        json!(map)
    });`

const serializedRuby = `# Serialized: Parse + transform in Rust, JSON output
require 'json'

json_string = re('"[^"\\\\]*(?:\\\\.[^"\\\\]*)*"') >> transform { |s|
  JSON.parse(s)
}

json_number = re('-?(?:[0-9]+(?:\\.[0-9]+)?(?:[eE][+-]?[0-9]+)?)') >> transform { |s|
  Float(s)
}

json_object = str("{") >>
              (key_values.maybe()) >>
              str("}") >>
              transform { |((_, values), _)|
                Hash[values || []]
              }`

const nativeRust = `// Native: Direct Ruby object construction via FFI
use serde::Deserialize;

#[derive(Deserialize, Debug)]
struct JsonValue {
    #[serde(flatten)]
    kind: ValueKind,
}

#[derive(Deserialize)]
#[serde(untagged)]
enum ValueKind {
    Null,
    Bool(bool),
    Number(f64),
    String(String),
    Array(Vec<JsonValue>),
    Object(BTreeMap<String, JsonValue>),
}

let json = json_value.transform(|node| {
    serde_json::from_value(to_json(node)).unwrap()
});`

const nativeRuby = `# Native: Direct Ruby object construction via FFI
require 'parsanol'

# Define a Ruby class that mirrors your JSON structure
class JsonValue
  attr_reader :value

  def initialize(value)
    @value = value
  end
end

class JsonObject < JsonValue
  def [](key)
    value[key]
  end
end

# Use the transformer
json = json_value >> transform { |node|
  build_object(node)
}`

const tryItRust = `$ cargo add parsanol serde_json

# Then run:
$ cargo run --example json_parser

# Output:
# Parse "{\"name\": \"Alice\", \"age\": 30}":
# Ok(JsonValue { kind: Object({"name": String("Alice"), age: Number(30.0)) } })`

const tryItRuby = `$ gem install parsanol

# Then run:
$ ruby examples/json_parser.rb

# Output:
# Parse "{\"name\": \"Alice\", \"age\": 30}":
# #<JsonValue:0x00007f8a5a @value={"name"=>"Alice", "age"=>30}>`
</script>
