---
id: constrained-decoding-export
date: 2026-11-12T10:30:00Z
title: "Constrained decoding: one grammar feeds both the parsers and the model"
summary: The XGrammar/llguidance export ships as one authoritative lowering in the Rust engine — wasm carries it to TypeScript, the C ABI carries it to Python, and Ruby stays the parity oracle with a byte-for-byte fixture gate across the whole corpus.
tags: [release, rust, ruby, python, typescript, constrained-decoding]
featured: true
---

A PARG artifact is a verified, self-describing grammar wire — and the
same wire now lowers, mechanically, to the two constrained-decoding
formats the LLM ecosystem standardizes on: **XGrammar's EBNF** and
**llguidance's Lark subset**. Declare a grammar once; parse with it on
five runtimes and decode with it on the model.

## One lowering, every runtime

The lowering is **authoritative in the Rust engine** — the wire format
is language-neutral JSON, so every runtime lowers identically instead
of re-implementing the walk per language:

```ts
// TypeScript — through @parsanol/wasm
const grammar = artifact.export("xgrammar", /* recovery */ true);
```

```python
# Python — through the parsanol C ABI
grammar = artifact.export("llguidance", recovery=True)
```

```bash
parg export artifact.json --target xgrammar --recovery   # Ruby CLI
```

## What lowers, and what refuses

The supported subset lowers 1:1: literals, classes, sequences,
alternations, repetitions (`{m,n}` native on XGrammar; mechanically
expanded — and loudly capped — on llguidance), and ASCII fold
literals, which expand to per-character case classes. The recovery
story carries over: a declared `resync` pattern lowers as an escape
alternative at the repetition spine, so the exported grammar accepts
exactly what the engines' recovery path accepts — clean parses, and
violate-then-resync parses.

Everything the target cannot express is **rejected naming the
construct** — lookaround, behind-guards, custom atoms, non-ASCII fold
groups — the importer philosophy in reverse, never silently dropped.
And the corpus taught us one boundary the hard way: the self-hosted
parg meta-grammar is *recursive*, and an inline EBNF unfold of a
recursive grammar is infinite in principle. Both engines reject that
naming the re-entry atom instead of crashing.

## The parity gate

Ruby remains the oracle: `tests/export_parity.rs` replays its recorded
outputs byte-for-byte across 160+ fixture cases — the whole flavor
corpus (sha-pinned per artifact, stale-skip on re-bakes) plus
hand-built convention cases for everything the corpus does not
exercise: escapes, `\u` class de-escaping, fold expansion, bounded
repetitions on both targets, the expansion cap, every rejection. One
fixture, three runtimes: Rust asserts it natively, Python replays it
through the C ABI, and TypeScript inherits the same lowering the same
way.

Ships in parsanol 0.20.16 / ruby 1.3.144 / python 0.1.27 /
ts 0.10.48.
