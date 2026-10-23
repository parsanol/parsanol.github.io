---
id: recovery-five-engines
date: 2026-10-23T10:00:00Z
title: "Error Recovery Everywhere, and a Fifth Engine to Keep It Honest"
summary: The recovery stack is complete on every runtime — deepest-failure diagnostics, partial trees, and declared resync spans with byte-identical offsets — verified daily by a five-engine differential fuzz that now includes a reference walker with every optimization switched off.
tags: [release, ruby, rust, wasm, recovery, verification]
featured: true
---

Parsanol's recovery stack is finished and shipped on **all five runtimes** — the Ruby interpreter and VM, the Rust packrat walker and its bytecode VM, the wasm build, and the TypeScript runtime:

- **Deepest-failure diagnostics (F7)** — every failure reports the deepest real-content position with the expected set and ranked alternatives, not the outermost construct.
- **Partial trees (R1.5)** — a failed parse still returns the deepest clean prefix, shaped exactly as the root rule would have shaped it.
- **Declared resync (R2)** — `resync document = 1*( %x00-3A / %x3C-FF ) ";"` bakes a deterministic skip policy into the artifact: at a failure point the engine consumes each pattern match as one annotated span (`offset → resumed_at`) and resumes parsing. No trial scanning, no heuristics — the author owns the spans, and every engine returns them byte-identically.

## A fifth engine keeps it honest

The nightly differential fuzz grew a fifth path: a **reference walker** with every memo table, fused scan, and fast path switched off — the plain recursive relation the normative semantics document states, nothing more. The whole conformance corpus (32 artifacts, 125 cases) replays identically through it, and an archived one-shot validator — an independent implementation of the semantics written from the document — agrees on **304/304** cases. Two spec ambiguities that run surfaced were fixed in the document, not papered over.

## Try it

The [playground](/playground) now ships an error-recovery grammar: break the input and the engine shows the strict failure, the partial tree, and the exact resync span side by side — produced by the same `@parsanol/wasm` binary the conformance suites validate.

**Released:** parsanol-rs 0.18.18 (+ @parsanol/wasm 0.18.18), parsanol (TS) 0.10.13, parsanol-ruby 1.3.107 — all shipped, audited, and replay-verified across the corpus.
