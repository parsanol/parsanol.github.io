---
id: generation-graduates
date: 2026-11-13T16:00:00Z
title: "Generation graduates: one grammar now drives parse and generate"
summary: The rs#459 graduation campaign lands — the render spec lowers into an engine-owned generator ("parse in reverse"), byte-identical with the interpreter and round-trip-proven on the iso pilot. Plus the per-parse fixed-work caches: 8x on tiny inputs.
tags: [release, rust, ruby, python, typescript, generation]
featured: true
---

rs#459 set the endgame: parsanol as an **output grammar** — one
artifact driving parsing, canonical rendering, and generation, all
under one checksum, byte-identical across the five languages. That
campaign just landed its graduation slices.

## The gate the fleet closed

The graduation oracle (every rendered string must re-parse to the
same bound map) started 0/20 — the lossiness lived in the render
spec, not the engines. pubid-grammar#116 re-authored the iso spec
(every bound face, grammar-valid joins) and the oracle went 20/20.
That gate satisfied, generation began.

## Slice 2: the segment→generator lowering

The render spec and derive templates lower **once per artifact** into
typed generators — literal / field / emit-or-skip segments, cached
per variant. The gates, all green:

- `generate()` reproduces the generic interpreter **byte-for-byte**
  over every render-spec artifact (20 render + 20 derive cases)
- generated strings **re-parse to the same bound map**: 20/20
  round-trips — the oracle's property through the graduated path
- the corpus's frozen-render replay runs both paths

Exposure is the Rust-authoritative doctrine: wasm
`PargArtifactJs.generate()`, C ABI `parsanol_parg_generate()`, Ruby
`parg generate --model` — one lowering, every tier inherits.

## The per-parse fixed cost, closed

The asciichem campaign measured setup ~12 µs + eval ~37 µs dominating
tiny inputs. Two caches landed (rs#486): the entry grammar was
re-decoded from envelope JSON **on every parse** (~800 µs of a ~930 µs
parse on the iso artifact — now decoded once per entry), and five pure
grammar analyses were recomputed per construction (now cached with the
decoded entry). Interleaved receipt: parse_and_bind **960 → 120 µs
(8×)** on a tiny input. A semver lesson came with it: `Grammar` is
exhaustively constructible, so the cache lives on the artifact and the
parser reads it through an additive `with_analysis` constructor.

## Shipped

parsanol-rs 0.20.19 riding the release-all-runtimes train: rubygems
1.3.147, PyPI 0.1.30, npm parsanol 0.10.51, npm @parsanol/wasm 0.20.19
— all five registries, one engine.
