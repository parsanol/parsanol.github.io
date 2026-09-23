---
id: ruby-1.3-native-first
date: 2026-08-20T10:00:00Z
title: "Parsanol 1.3: The Native-First Era"
summary: Native Rust parsing is now the default on every mode — cause-tree errors, prefix and reporter parsing, incremental sessions — with a pure-Ruby engine always underneath as the portable floor.
tags: [release, ruby, rust, architecture]
featured: true
---

Parsanol 1.3 reorganized the gem around one principle: the Rust engine is the default, and every parsing mode runs natively — no silent re-entry into Ruby mid-parse.

## What runs natively now

| Mode | Since | Notes |
|------|-------|-------|
| Default parse | 1.3.15 | grammar-handle API; input borrowed zero-copy |
| Cause-tree errors | 1.3.23 | parslet-compatible failure trees built in Rust; no reporter reparse |
| `prefix: true` | 1.3.24 | `parse_with_end_pos` exposed natively |
| `reporter:` feeding | 1.3.25 | one `err_at` from the native cause on failure |
| Incremental sessions | 1.3.43 | edit-span reparse with snapshot-tier memo retention |

Grammars that cannot be serialized to Rust (Cut, Infix, custom atoms) fail fast at registration with `Parsanol::Native::UnsupportedGrammar` and route to the Ruby engine — loudly, never silently diverging.

## Measured against parslet

Interleaved A/B on real corpora (shared machines, GC-isolated):

- molecule grammar: native **10.7–12.2×** parslet, ruby **1.7–1.9×**
- pubid-ISO corpus: native **6.9×** parslet
- asciichem mixed valid/invalid: native **~2.9×** parslet after the native failure path landed

## Memory that stays bounded

Large-input memoization recycles packrat caches at capacity instead of freezing them (expressir's 605 KB giants: 99.8 → 11.5 ms/KB), and a bounded-RSS spec now guards release CI: dozens of distinct documents and repeated parses of one document must not grow RSS.
