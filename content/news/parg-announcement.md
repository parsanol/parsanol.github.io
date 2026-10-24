---
id: parg-announcement
date: 2026-10-23T12:00:00Z
title: "Announcing PARG — a language-independent grammar language with bindings on every runtime"
summary: PARG is parsanol's grammar language: write one text file, compile it once into a checksummed artifact, and bind its captures to typed model objects — with runtime and compiled object bindings on every runtime: Ruby, Rust, WebAssembly, and TypeScript.
tags: [parg, announcement, ruby, rust, wasm, typescript, bindings]
featured: true
---

PARG is parsanol's grammar language, and it is now the recommended way to teach parsanol a new format. One `.parg` text file — rules in an ABNF-flavored style, entry points, bindings, and in-file tests — compiles **once** into a checksummed `parsanol-tree/v2` artifact that Ruby, Rust, WebAssembly, and TypeScript all load, verify, and parse **byte-identically**.

## One grammar, every runtime

```parg
# demo.parg
grammar Demo version "1.0.0" {
  skip = trivia
  trivia = 1*" "

  digit = %x30-39
  number = 1*digit
  publisher = %i"iso" / %i"ieee"

  origin = publisher as publisher
  serial = number as number

  iso_identifier = origin serial
}

bindings iso_identifier {
  publisher -> publisher (string)
  number -> number (integer)
}

test identifier {
  accept "iso 12345"
  accept "IEEE 42"
  reject "iso"
  capture "ieee 42" { publisher: "ieee", number: "42" }
}

entry identifier: iso_identifier
```

The compiler lints the grammar — shadowed alternatives and order-dependence are build failures, not runtime surprises — rewrites direct left recursion into left-folding precedence tiers, and runs every in-file test before anything ships. What ships is **data, not code**: a portable grammar envelope with a sha256 checksum over its canonicalized content, and the original source riding inside so any runtime can rebuild it.

## Bindings, language-independent

This is what PARG exists for: captures bind to typed model objects on every runtime, without rewriting the grammar per language.

```ruby
require "parsanol"

document = Parsanol::PARG::Parser.new(File.read("demo.parg")).parse
result   = Parsanol::PARG::Compiler.compile(document)
File.write("demo.artifact.json", JSON.generate(result.envelope))

artifact = Parsanol::PARG::Artifact.load("demo.artifact.json")
artifact.parse_and_bind("identifier", "iso 12345")
# => { publisher: "iso", number: 12345 }
```

A capture declared with `as` maps to a model field — `string`, `integer`, `float`, or `boolean`, with cardinalities `1`, `0..1`, `1..*`, and `0..*` — plus declarative preprocess steps (`table_lookup`) and data-driven alternatives (`alt from_table`). The same artifact carries runtime and compiled object bindings on every surface parsanol runs on:

| Runtime | Binding surface | Environment |
| --- | --- | --- |
| Ruby | `PargArtifact` | Server and CLI |
| Rust | the `parsanol-rs` crate | Native and embedded |
| WebAssembly | `PargArtifactJs` (`@parsanol/wasm`) | The browser — this site's playground runs it |
| TypeScript | `PargRuntime` | Node and bundlers |

Every engine verifies the checksum, applies the same bindings, and returns the same tree — that identity is enforced by a 32-artifact conformance corpus and a nightly five-engine differential fuzz, not promised.

## What the language has

- **Skip and trivia injection** — whitespace and comments consumed by declaration, with `capture: comments` so captured trivia becomes data; `atomic` rules opt out for token-shaped bodies.
- **Direct left recursion** — `expr = expr "*" expr / INT` is rewritten at compile time into left-folding precedence tiers, identical on every engine.
- **Behind-guards** — `!<x` and `&<x` inspect the text behind the position without consuming, for intraword constraints like constrained emphasis.
- **Declared recovery** — `resync` policies bake deterministic skip spans into the artifact, so a failed parse reports the deepest position, the partial tree, and the exact spans consumed to resume.
- **In-file tests** — `accept` / `reject` / `capture` / `example` / `shape` assertions run at compile time and travel with the artifact, so every runtime replays the same expectations.
- **Imports** — existing ABNF, EBNF, and pest grammars come in as PARG text through `Parsanol::PARG::Import`.

## Where to start

- [What is PARG?](/parg) — the grammar language and the artifact guarantees.
- [The language tour](/parg/language) — the whole syntax on one page, with examples.
- [The playground](/playground) — parse with the shipped wasm binary in your browser, including the error-recovery grammar with a declared `resync` policy.

Grammars that use runtime state atoms (`state`, `set`, `switch`, or custom Ruby classes) remain Ruby-tier by contract: the Rust and wasm engines reject such artifacts loudly at the boundary instead of mis-parsing them. Everything else in this post runs identically on all five engines.
