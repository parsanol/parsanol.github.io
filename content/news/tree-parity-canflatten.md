---
id: tree-parity-canflatten
date: 2026-09-21T10:00:00Z
title: "Exact Tree Parity: CanFlatten, Dynamic Capture Writes, TreeDiff"
summary: Both engines now produce byte-identical parslet trees — the CanFlatten fold is ported exactly, dynamic blocks can read AND write captures across the FFI boundary, and TreeDiff.why explains any divergence in one call.
tags: [release, ruby, rust, compatibility]
featured: false
---

Parsanol's compatibility bar moved from "parslet-like" to **exact**: the transformer is now a line-for-line port of Parslet's `CanFlatten` fold (merge_fold, flatten_repetition, named-empty-list semantics), and a differential suite pins Ruby vs Rust vs parslet on shared corpora — including the subtle bare-repeated-sibling-capture cases that historically lost data (#36, #83).

## The dynamic bridge, completed

Coradoc-style dispatch grammars — mutually recursive rules keyed on captures — now work natively end to end:

- blocks **read** `ctx.captures` (capture subtrees travel with the state, content-fingerprinted)
- blocks **write** `ctx.captures[:k] = v`, and writes propagate back into the enclosing capture scope with rollback on failed branches
- deterministic blocks are pure cache functions of `(input, pos, captures)` — hits replay grammar and writes without re-entering the host

## When trees differ anyway

`Parsanol::TreeDiff.why(a, b)` reports the first divergence with a path — the debugging tool we used to chase the remaining edge cases ourselves.
