<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="flex gap-12">
      <div class="w-64 flex-shrink-0 hidden lg:block">
        <div class="sticky top-20 h-[calc(100vh-6rem)] overflow-y-auto">
          <DocsNav :show-sections="['errors']" />
        </div>
      </div>

      <div class="flex-1 min-w-0">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-8">Error Handling</h1>

        <!-- Tree-Structured Errors -->
        <section id="tree-errors" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Tree-Structured Errors</h2>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            Parsanol produces tree-structured errors that capture the full context of what went wrong.
          </p>

          <CodeTabs
            :rust="treeErrorsRust"
            :ruby="treeErrorsRuby"
          />
        </section>

        <!-- Error Reporters -->
        <section id="reporters" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Error Reporters</h2>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            Use reporters to format errors in different ways.
          </p>

          <div class="space-y-8">
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Tree Reporter</h3>
              <CodeTabs
                :rust="treeReporterRust"
                :ruby="treeReporterRuby"
              />
            </div>

            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Deepest Reporter</h3>
              <CodeTabs
                :rust="deepestReporterRust"
                :ruby="deepestReporterRuby"
              />
            </div>

            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Contextual Reporter</h3>
              <CodeTabs
                :rust="contextualReporterRust"
                :ruby="contextualReporterRuby"
              />
            </div>
          </div>
        </section>

        <!-- ASCII Tree -->
        <section id="ascii-tree" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">ASCII Tree Visualization</h2>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            Visualize parse trees and errors with ASCII art.
          </p>

          <CodeTabs
            :rust="asciiTreeRust"
            :ruby="asciiTreeRuby"
          />
        </section>

        <!-- Debug Mode -->
        <section id="debug-mode">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Debug/Trace Mode</h2>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            Enable tracing to see exactly how your parser processes input.
          </p>

          <CodeTabs
            :rust="debugModeRust"
            :ruby="debugModeRuby"
          />
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CodeTabs from '../components/molecules/CodeTabs.vue'
import DocsNav from '../components/organisms/DocsNav.vue'

const treeErrorsRust = `use parsanol::error::TreeError;

// When parsing fails, you get a tree of errors
let parser = str("hello").then(str(" ")).then(re(r"[0-9]+"));
let result = parser.parse("hello world");

// The error contains:
// - What was expected
// - What was found
// - Position information
// - Nested error context

match result {
    Ok(_) => println!("Success!"),
    Err(e) => {
        println!("Error: {:?}", e);
    }
}`

const treeErrorsRuby = `require 'parsanol'

# When parsing fails, you get a tree of errors
parser = str("hello") >> str(" ") >> re("[0-9]+")
result = parser.parse("hello world")

# The error contains:
# - What was expected
# - What was found
# - Position information
# - Nested error context

if result.success?
  puts "Success!"
else
  puts "Error: #{result.error}"
end`

const treeReporterRust = `use parsanol::error::{ParseError, reporter::TreeReporter};

// Get the tree-formatted error
let error = parser.parse("invalid input").unwrap_err();
let formatted = TreeReporter::new().report(&error);
println!("{}", formatted);`

const treeReporterRuby = `require 'parsanol'

# Get the tree-formatted error
error = parser.parse("invalid input").error
puts error.to_tree`

const deepestReporterRust = `use parsanol::error::{ParseError, reporter::DeepestReporter};

// Get only the deepest (most specific) error
let error = parser.parse("invalid input").unwrap_err();
let formatted = DeepestReporter::new().report(&error);`

const deepestReporterRuby = `require 'parsanol'

# Get only the deepest (most specific) error
error = parser.parse("invalid input").error
puts error.to_deepest`

const contextualReporterRust = `use parsanol::error::{ParseError, reporter::ContextualReporter};

// Get error with source context
let error = parser.parse("invalid input").unwrap_err();
let formatted = ContextualReporter::new()
    .with_source("invalid input")
    .report(&error);
// Shows:
//   |
// 1 | invalid input
//   | ^~~~~~~~~~~~`

const contextualReporterRuby = `require 'parsanol'

# Get error with source context
error = parser.parse("invalid input").error
puts error.to_context("invalid input")`

const asciiTreeRust = `use parsanol::tree::display::AsciiTree;

// Display the parse tree as ASCII art
let tree = parser.parse("hello 123").unwrap();
println!("{}", AsciiTree::new(&tree));
// Output:
// Sequence
// ├── "hello"
// ├── " "
// └── "123"`

const asciiTreeRuby = `require 'parsanol'

# Display the parse tree as ASCII art
tree = parser.parse("hello 123").value
puts tree.to_ascii_tree`

const debugModeRust = `use parsanol::prelude::*;

// Enable tracing
let parser = str("hello")
    .then(str(" "))
    .then(re(r"[0-9]+"))
    .trace();  // Enable debug output

let result = parser.parse("hello world");
// Prints:
// [TRACE] str("hello") at 0: "hello world"
// [TRACE] str(" ") at 5: " world"
// [TRACE] re("[0-9]+") at 6: "world"
// [ERROR] Expected [0-9]+ at 6: "world"`

const debugModeRuby = `require 'parsanol'

# Enable tracing
parser = str("hello") >> str(" ") >> re("[0-9]+")
parser = parser.trace  # Enable debug output

result = parser.parse("hello world")
# Prints debug information`
</script>
