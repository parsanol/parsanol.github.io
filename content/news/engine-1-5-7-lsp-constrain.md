---
id: engine-1-5-7-lsp-constrain
date: 2026-11-18T12:00:00Z
title: "Engine 1.5.7: the PARG language server and the constrained-decoding oracle"
summary: parsanol-lsp ships the self-hosting language server — parsanol parsing PARG with its own diagnostics, hover, navigation, and the parse-tree preview. parsanol::constrain compiles an artifact + a tokenizer vocabulary into per-token masks. All runtimes ride at 1.5.7.
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

The greedy harness generates grammar-valid output at **100% validity by the artifact oracle** on the ISBN and JSON grammars. The logits-processor integration rides next (rs#530).

## All runtimes at 1.5.7

crates.io **1.5.7** · rubygems **1.5.7** · npm **1.5.7** (+@parsanol/wasm) · PyPI **1.5.7.0** — one grammar, one checksummed artifact, byte-identical trees everywhere.
