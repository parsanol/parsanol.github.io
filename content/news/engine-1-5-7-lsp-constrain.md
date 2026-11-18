---
id: engine-1-5-7-lsp-constrain
date: 2026-11-18T12:00:00Z
title: "Engine 1.5.7-1.5.8: the PARG language server, the constrained-decoding emitter, and the recovery splice"
summary: parsanol-lsp ships the self-hosting language server — parsanol parsing PARG with its own diagnostics, hover, navigation, and the parse-tree preview. parsanol::constrain compiles an artifact + a tokenizer vocabulary into per-token masks; 1.5.8 lands the llguidance-compatible mask emitter with the relaxed recovery. The recovery spine replays the unchanged prefix — windowed nTED halved to 0.059. All runtimes ride at 1.5.8.
tags: [release, rust, lsp, constrained-decoding]
featured: true
---

Two 2027-roadmap campaigns shipped in engine 1.5.7 (rs#529, rs#530).

## parsanol-lsp: the language server

PARG is a language, so it ships with a language server — and the server is **parsanol parsing PARG with its own diagnostics**: the hardest internal dogfood.

- **live diagnostics**: the structured failure wire (the deepest position, the expected labels, the ranked failures) mapped to editor ranges, plus the authoritative compile verdict as a second source
- **hover**: the rule's doc block + its signature
- **go-to-definition / find-references / completion / document symbols** over the rule table
- **the parse-tree preview** (`parg/treePreview`): the shape tree of the open document — the parse-tree debugger

Receipts: the scripted editor session drives the whole cycle over real stdio framing, and diagnostics over the self-hosting grammar's own source run in **~147 ms with zero diagnostics** — parsanol parses PARG cleanly.

```sh
cargo install parsanol-lsp
parsanol-lsp   # stdio; point your editor's LSP client at it
```

## constrained decoding: the token-mask oracle

`parsanol::constrain` compiles an artifact + a tokenizer's decoded vocabulary into per-step valid-token sets. The state oracle is the recovering envelope's consumed position: a token extends the prefix iff the parse consumes past the boundary — a dead end never masks the model into an impossible state, and the ranked-failure surface is the relaxation path when the model paints itself into a corner.

The greedy harness generates grammar-valid output at **100% validity by the artifact oracle** on the ISBN and JSON grammars.

**1.5.8 lands the emitter (rs#579)**: `TokenBitmask` packs the per-step valid set little-endian — the llguidance-compatible wire a logits processor consumes — and `MaskEmitter` drives the runtime loop with the sampler closure standing in for the model's logits pass. The differentiator is `generate_relaxed`: when the model paints itself into a corner (a dead rollout like `{"a"}` missing the colon), the loop pops the dead pick, bans it, and retries — every re-mask is a fresh oracle parse, so backtracking is free, and the dead rollout recovers to a full parse the FSM mask compilers cannot offer.

## The recovery splice (1.5.8, rs#580)

The recovery spine replays the UNCHANGED prefix forward from byte 0 with the same probe the resync rounds use — the recovered tree keeps the original nesting, and every truncate-class case that previously recovered a null tree now recovers its full good prefix. The 60-case harness: **windowed nTED 0.113 → 0.059** (tree-sitter 0.023), structure recall 52.8% → **67.5%**, 0/60 null recoveries (was 24), diagnostic distance unchanged. Receipt: `benchmarks/sota/results/2026-11-18-recovery-ted-shape.md`.

The quiet-machine receipts re-bake (rs#581): the VM lands **0.079 µs/B** min-of-15 (13.6× over the load-affected baseline; 2.55× behind tree-sitter, ahead of Lark LALR and ANTLR), and the incremental harness covers all four corpus documents with identity 800/800.

## All runtimes at 1.5.8

crates.io **1.5.8** · rubygems **1.5.8** · npm **1.5.8** (+@parsanol/wasm) · PyPI **1.5.8.0** — one grammar, one checksummed artifact, byte-identical trees everywhere.
