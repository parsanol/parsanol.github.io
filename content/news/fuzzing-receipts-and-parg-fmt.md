---
id: fuzzing-receipts-and-parg-fmt
date: 2026-11-13T09:00:00Z
title: "Proof infrastructure: scheduled fuzzing, published receipts, and parg fmt"
summary: The 0.20.17 round ships the SOTA-proof layer — a weekly hours-long fuzz gate that found a real panic on its first run, published benchmark receipts with a regression gate, and the canonical formatter for PARG sources. Plus the full platform wheel matrix for the Python runtime.
tags: [release, rust, ruby, python, typescript, tooling, fuzzing]
featured: true
---

SOTA is a claim until it publishes evidence. The 0.20.17 round ships
the proof layer: three gates that make the engine's claims checkable,
and one tool the grammar authors asked for.

## The fuzz gate that caught a real bug on run one

`tests/fuzz_heavy.rs` mutates the 51-grammar seed pool — byte flips,
truncations, splices, operator soup — and drives the public surface:
parse, compile, checksum-verified load, embedded-test replay. The
invariant is absolute: **no panics, every rejection structured.** The
scheduled job runs 60 minutes weekly on a reduced sandbox; the honest
counter (hours with 0 crashes) resets on any crash.

Its first full run found one: a mutated `%x3a-39` — a descending
range — underflowed the compiler's class-pattern arithmetic. Descending
ranges now reject at parse time naming the spec, the case persists
under `fuzz-crashes/`, and the one-command replay stays green through
585,983 subsequent cases.

## Published benchmark receipts

`bash scripts/bench-report.sh` emits `benchmarks/latest.md`: machine,
rustc, commit, and the ns/iter tables. The weekly workflow gates any
>10% regression against the committed receipt and lands the refresh as
a reviewed PR. The campaign bar reads directly off the table:
**json/parsanol/small 3,155 ns vs json/parsanol-parslet/small 3,161 ns**
— native and the parslet-compatibility path on par on the same wire.
A [benchmarks page](/benchmarks) carries the receipt story.

## parg fmt

The canonical formatter for `.parg` sources: `parg fmt FILE [--check]`,
`parg fmt --stdin`, and `textDocument/formatting` in the LSP — one
code path. It is a layout-aware token walk, not a re-writer: token
order never changes, and the gates prove semantics over the whole
fleet corpus (48 grammars re-compile to identical envelopes;
`fmt(fmt(x)) == fmt(x)`; unparseable files fail without being touched).

## Python: every platform, each proven

The Python runtime's wheel matrix followed leptris-py#346 to full
coverage — aarch64 (glibc + musl) on native arm runners; i686, armv7l,
ppc64le, s390x, and riscv64 built and **tested** in QEMU-emulated
containers; macOS universal2; Windows ARM64 and x86. The engine
vendors inside each build environment and the full conformance suite
runs on every wheel platform, emulated legs included.

## Where the levers stand, honestly

Two perf levers closed as measured negatives this round (the
remap-shaped pre-drop retain loses to memory layout at 10⁶ entries;
the cachegrind instrument now measures dispatch locality before any
slab work). The round-trip oracle still reads 0/20 on the iso render
spec — generation graduates when the spec-side render lossiness is
fixed, and the violation list is in the fleet's hands.
