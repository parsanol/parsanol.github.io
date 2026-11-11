---
id: preprocess-vocabulary-v11
date: 2026-11-12T08:00:00Z
title: "Declarative Preprocess Vocabulary v1.1: const_map, default_when_absent, rename"
summary: The rs#147 ruling lands in full — the declarative preprocessing vocabulary grows to four pure-data ops, executed by the engine on every tier, with a grow-with-minor binding_version contract so a step an old engine does not know can never run silently wrong.
tags: [release, rust, ruby, python, typescript, bindings]
featured: false
---

Between the raw parse tree and the model fields sit data-driven
normalizations — stage-code tables, closed mappings, absent-value fills,
capture-name alignment. The rs#147 ruling made them **declarative**: a
small vocabulary of pure-data operations declared in the artifact's
`preprocess` section, executed by the ENGINE (one implementation across
every tier — Ruby, Rust, wasm, Python, TypeScript — never re-implemented
per language).

## The four ops

```parg
preprocess resolve {
  table_lookup stages abbr -> code
  const_map "draft" -> "Draft", "international-standard" -> "Full standard"
}

preprocess align {
  default_when_absent "-"
  rename letter -> part
}
```

- **`table_lookup`** (v1) — map the value through a sidecar table's
  column pair; unmapped values pass through.
- **`const_map`** (v1.1) — a closed mapping carried in the step itself;
  a multi-entry source line emits sequential steps, preserving the
  declared order.
- **`default_when_absent`** (v1.1) — fill a nil member of a hash-shaped
  capture value in place (scalar nils never reach the pipeline — the
  null-capture contract skips those bindings upstream).
- **`rename`** (v1.1) — capture-name alignment on a hash-shaped value;
  the renamed key keeps its position, so the canonical JSON is stable.

Anything not expressible with these is application logic and belongs
above the binding layer — the registry rejects unknown ops loudly at
apply time.

## Grow-with-minor

The envelope's `binding_version` now declares the contract level the
artifact relies on: v1-only documents stay byte-identical at `1`; any
post-v1 op declares `2`; engines accept `{1, 2}` and refuse higher
levels **at load**. A step an old engine does not know can never be
silently mis-executed, and shipping new vocabulary never rewrites
existing artifacts.

## Shipped in

- parsanol-rs **0.20.14 / 0.20.15** (rs#445, rs#449)
- parsanol (Ruby) **1.3.142** (the `Bindings.apply` registry dispatch,
  ruby#487) with 1.3.138+ compilers emitting the v1.1 syntax
- parsanol (Python) **0.1.26**, parsanol (TypeScript) **0.10.47** —
  engine-executed, no per-language code
- The parity matrix: Ruby-authoritative bound-map cases replayed
  byte-for-byte by the Rust executor (the C7 fixture)
