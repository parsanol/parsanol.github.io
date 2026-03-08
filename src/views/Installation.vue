<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="flex gap-12">
      <div class="w-64 flex-shrink-0 hidden lg:block">
        <div class="sticky top-20 h-[calc(100vh-6rem)] overflow-y-auto">
          <DocsNav :show-sections="['introduction', 'installation', 'first-parser']" />
        </div>
      </div>

      <div class="flex-1 min-w-0">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">Installation</h1>
        <p class="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Add Parsanol to your Rust or Ruby project in minutes.
        </p>

        <!-- Rust Installation -->
        <section class="mb-16">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-lg">R</span>
            </div>
            <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Rust</h2>
          </div>

          <div class="card mb-6">
            <h3 class="font-semibold text-gray-900 dark:text-white mb-4">Add to Cargo.toml</h3>
            <CodeTabs :rust="rustInstall" />
          </div>

          <div class="card">
            <h3 class="font-semibold text-gray-900 dark:text-white mb-4">Features</h3>
            <div class="overflow-x-auto">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <th class="text-left py-2">Feature</th>
                    <th class="text-left py-2">Default</th>
                    <th class="text-left py-2">Description</th>
                  </tr>
                </thead>
                <tbody class="text-gray-600 dark:text-gray-400">
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2 font-mono">ruby</td>
                    <td class="py-2">No</td>
                    <td class="py-2">Ruby FFI bindings (magnus, rb-sys)</td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2 font-mono">wasm</td>
                    <td class="py-2">No</td>
                    <td class="py-2">WebAssembly bindings (wasm-bindgen)</td>
                  </tr>
                  <tr>
                    <td class="py-2 font-mono">serde</td>
                    <td class="py-2">Yes</td>
                    <td class="py-2">Serialization support</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
            <h4 class="font-medium text-amber-900 dark:text-amber-100 mb-2">Feature Flags</h4>
            <CodeTabs :rust="rustFeatures" />
          </div>
        </section>

        <!-- Ruby Installation -->
        <section class="mb-16">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-lg">rb</span>
            </div>
            <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Ruby</h2>
          </div>

          <div class="card mb-6">
            <h3 class="font-semibold text-gray-900 dark:text-white mb-4">Add to Gemfile</h3>
            <CodeTabs :ruby="rubyGemfile" />
          </div>

          <div class="card">
            <h3 class="font-semibold text-gray-900 dark:text-white mb-4">Or Install Directly</h3>
            <CodeTabs :ruby="rubyInstall" />
          </div>

          <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 class="font-medium text-blue-900 dark:text-blue-100 mb-2">Requirements</h4>
            <ul class="list-disc pl-5 text-blue-800 dark:text-blue-200 space-y-1 text-sm">
              <li>Ruby 2.7 or later (3.0+ recommended)</li>
              <li>Rust toolchain (for native extension compilation)</li>
              <li>On macOS: Xcode Command Line Tools</li>
              <li>On Linux: build-essential package</li>
            </ul>
          </div>
        </section>

        <!-- WebAssembly -->
        <section class="mb-16">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-lg">W</span>
            </div>
            <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">WebAssembly</h2>
          </div>

          <div class="card mb-6">
            <h3 class="font-semibold text-gray-900 dark:text-white mb-4">NPM Package</h3>
            <CodeTabs :rust="wasmInstall" />
          </div>

          <div class="card">
            <h3 class="font-semibold text-gray-900 dark:text-white mb-4">Usage in Browser</h3>
            <CodeTabs :rust="wasmUsage" />
          </div>
        </section>

        <!-- Verification -->
        <section class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Verify Installation</h2>

          <div class="card mb-6">
            <h3 class="font-semibold text-gray-900 dark:text-white mb-4">Rust</h3>
            <CodeTabs :rust="verifyRust" />
          </div>

          <div class="card">
            <h3 class="font-semibold text-gray-900 dark:text-white mb-4">Ruby</h3>
            <CodeTabs :ruby="verifyRuby" />
          </div>
        </section>

        <!-- Choosing a Backend -->
        <section class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Choosing a Backend</h2>

          <p class="text-gray-600 dark:text-gray-400 mb-6">
            Parsanol offers three parsing backends, each optimized for different use cases. Choose based on your grammar complexity and memory requirements.
          </p>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <!-- Packrat -->
            <div class="card border-2 border-blue-200 dark:border-blue-800">
              <div class="flex items-center gap-2 mb-4">
                <div class="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                  <span class="text-white font-bold text-sm">P</span>
                </div>
                <h3 class="font-semibold text-gray-900 dark:text-white">Packrat</h3>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Default backend. Memoizes all parse results for O(n) time complexity.
              </p>
              <div class="space-y-2 text-sm">
                <div class="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <span>✓</span>
                  <span>Full feature support</span>
                </div>
                <div class="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <span>✓</span>
                  <span>Captures & dynamic atoms</span>
                </div>
                <div class="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <span>✓</span>
                  <span>Complex grammars</span>
                </div>
                <div class="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                  <span>~</span>
                  <span>Memory: O(n × rules)</span>
                </div>
              </div>
              <div class="mt-4 p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-xs text-blue-700 dark:text-blue-300">
                Best for: Captures, dynamic atoms, complex grammars
              </div>
            </div>

            <!-- Bytecode VM -->
            <div class="card border-2 border-green-200 dark:border-green-800">
              <div class="flex items-center gap-2 mb-4">
                <div class="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                  <span class="text-white font-bold text-sm">VM</span>
                </div>
                <h3 class="font-semibold text-gray-900 dark:text-white">Bytecode VM</h3>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Stack-based virtual machine. Minimal memory, fast for simple patterns.
              </p>
              <div class="space-y-2 text-sm">
                <div class="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <span>✓</span>
                  <span>10-32x faster for expressions</span>
                </div>
                <div class="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <span>✓</span>
                  <span>Memory: O(depth) only</span>
                </div>
                <div class="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <span>✓</span>
                  <span>Simple patterns</span>
                </div>
                <div class="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                  <span>~</span>
                  <span>Dynamic atoms use fallback</span>
                </div>
              </div>
              <div class="mt-4 p-2 bg-green-50 dark:bg-green-900/20 rounded text-xs text-green-700 dark:text-green-300">
                Best for: Simple patterns, memory-constrained, expressions
              </div>
            </div>

            <!-- Streaming -->
            <div class="card border-2 border-amber-200 dark:border-amber-800">
              <div class="flex items-center gap-2 mb-4">
                <div class="w-8 h-8 bg-amber-500 rounded flex items-center justify-center">
                  <span class="text-white font-bold text-sm">S</span>
                </div>
                <h3 class="font-semibold text-gray-900 dark:text-white">Streaming</h3>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Chunk-based parsing for large files. Bounded memory regardless of input size.
              </p>
              <div class="space-y-2 text-sm">
                <div class="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <span>✓</span>
                  <span>Parse GB files in MB RAM</span>
                </div>
                <div class="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <span>✓</span>
                  <span>Works with captures</span>
                </div>
                <div class="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <span>✓</span>
                  <span>Bounded memory</span>
                </div>
                <div class="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                  <span>~</span>
                  <span>~5-10% overhead</span>
                </div>
              </div>
              <div class="mt-4 p-2 bg-amber-50 dark:bg-amber-900/20 rounded text-xs text-amber-700 dark:text-amber-300">
                Best for: Large files (logs, CSV, JSON streams)
              </div>
            </div>
          </div>

          <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h4 class="font-medium text-gray-900 dark:text-white mb-2">Quick Decision Guide</h4>
            <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• <strong>Using captures or dynamic atoms?</strong> → Use Packrat (default)</li>
              <li>• <strong>Memory-constrained environment?</strong> → Use Bytecode VM</li>
              <li>• <strong>Files larger than available RAM?</strong> → Use Streaming</li>
              <li>• <strong>Simple patterns only?</strong> → Bytecode VM is fastest</li>
            </ul>
          </div>
        </section>

        <!-- Troubleshooting -->
        <section>
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Troubleshooting</h2>

          <div class="space-y-4">
            <div class="card bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
              <h3 class="font-semibold text-red-900 dark:text-red-100 mb-2">
                "linker 'cc' not found"
              </h3>
              <p class="text-sm text-red-700 dark:text-red-300">
                Install a C compiler. On Ubuntu: <code>sudo apt install build-essential</code>.
                On macOS: <code>xcode-select --install</code>.
              </p>
            </div>

            <div class="card bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
              <h3 class="font-semibold text-red-900 dark:text-red-100 mb-2">
                "cargo not found"
              </h3>
              <p class="text-sm text-red-700 dark:text-red-300">
                Install Rust: <code>curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh</code>
              </p>
            </div>

            <div class="card bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
              <h3 class="font-semibold text-red-900 dark:text-red-100 mb-2">
                Native extension fails to compile
              </h3>
              <p class="text-sm text-red-700 dark:text-red-300">
                Ensure you have the correct Rust target installed:
                <code>rustup target add x86_64-unknown-linux-gnu</code>
              </p>
            </div>
          </div>
        </section>

        <!-- Navigation -->
        <div class="mt-12 flex justify-between">
          <router-link to="/introduction" class="btn btn-secondary">
            ← Introduction
          </router-link>
          <router-link to="/first-parser" class="btn btn-primary">
            Your First Parser →
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CodeTabs from '../components/molecules/CodeTabs.vue'
import DocsNav from '../components/organisms/DocsNav.vue'

const rustInstall = `[dependencies]
parsanol = "0.1"`

const rustFeatures = `# With Ruby bindings
[dependencies]
parsanol = { version = "0.1", features = ["ruby"] }

# With WASM bindings
[dependencies]
parsanol = { version = "0.1", features = ["wasm"] }

# Minimal (no serialization)
[dependencies]
parsanol = { version = "0.1", default-features = false }`

const rubyGemfile = `# Gemfile
gem 'parsanol'`

const rubyInstall = `# Install via RubyGems
$ gem install parsanol

# Or with Bundler
$ bundle add parsanol`

const wasmInstall = `# npm
$ npm install @parsanol/wasm

# yarn
$ yarn add @parsanol/wasm

# pnpm
$ pnpm add @parsanol/wasm`

const wasmUsage = `import init, { Parser } from '@parsanol/wasm';

async function main() {
  await init();

  const parser = new Parser();
  const result = parser.parse('hello world');
  console.log(result);
}

main();`

const verifyRust = `// src/main.rs
use parsanol::portable::{GrammarBuilder, parser_dsl::*};

fn main() {
    let grammar = GrammarBuilder::new()
        .rule("hello", str("hello"))
        .build();

    println!("Parsanol installed successfully!");
    println!("Grammar: {:?}", grammar);
}`

const verifyRuby = `# test.rb
require 'parsanol'

# Create a simple parser
parser = Parsanol::Parser.new

puts "Parsanol installed successfully!"
puts "Version: #{Parsanol::VERSION}"`
</script>
