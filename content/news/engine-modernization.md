---
id: engine-modernization
date: 2026-09-15T10:00:00Z
title: "Engine Modernization: Bytecode VM, SIMD Scanning, Incremental Reparse"
summary: parsanol-rs 0.6–0.8 ships a bytecode VM with lead-byte dispatch and selective rule memoization, SIMD scan kernels, compiled-program artifact caching, and tree-sitter-style incremental parsing sessions.
tags: [release, rust, performance]
featured: true
---

The Rust engine grew three major subsystems across 0.6 → 0.8:

## Bytecode VM (`Backend::Bytecode`)

Grammars compile to a flat instruction program with interleaved ordered choice, kinded backtrack frames, and a value model that builds parslet-shaped trees directly. Highlights:

- **BYTE_DISPATCH**: alternatives with provably disjoint lead-byte sets compile to a single table jump (the KV benchmark parses 47.5 KB in ~3 ms)
- **Selective rule memoization**: a CFG dataflow over the compiled program memoizes only rules that never cross host calls or capture writes — sound by construction, no memory tax on dynamic grammars
- **Compile-once**: `Parser::with_program` plus an on-disk artifact cache (XDG, versioned format) amortizes compilation across processes

## SIMD scan kernels

Identifier/delimiter classification runs 16/32-byte block membership kernels (NEON always; AVX2 behind runtime detection): ~6.2× on identifier runs, stable under load where scalar collapses.

## Incremental reparse

`Parsanol::IncrementalSession` (and `mode: :incremental`) reparse only the dirty span: per-edit tree equality against full reparse is CI-gated, and measured keystroke latency on ~600 KB documents is ~1.5–1.7× better than reparse. Retention is sound across edits — failure entries are never retained, and pool-backed values are re-walked instead of adopted.
