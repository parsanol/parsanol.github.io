---
id: cache-shrink-retained-band
date: 2026-11-13T08:30:00Z
title: "Cache shrink: the retained band's floor drops 10%"
summary: Round 2 of the retained-band lever closes with a measured win — DenseCache::shrink_to_entries rehashes the survivors of retention into a right-sized table, dropping the late band from 24.22 to 21.99 ms and widening the retained/snapshot ratio from 2.5x to 4.3x. The 0.20.18 train carries it to every runtime.
tags: [release, rust, performance]
featured: false
---

The [proof-infrastructure round](/news/fuzzing-receipts-and-parg-fmt/)
closed two performance levers as measured negatives. One of them had a
sequel.

## The diagnosis

The incremental session's retained tier keeps failure entries alive
across keystrokes so re-edits reuse work. After a retention pass, only
a few thousand entries survive — but the slot table is still sized for
the session-start input, and the capacity-wide maintenance loops
iterate all of it. That mismatch is what held the late band (edits at
the end of a large document, after 100 keystrokes) at ~24 ms.

Round 1 attacked this with a remap-shaped pre-drop retain and lost:
the 4 MB remap vector's random access loses to sequential rebuild
hashing at a million entries. An honest negative, closed with data.

## Round 2: shrink, don't remap

`DenseCache::shrink_to_entries` takes the opposite shape. After the
post-parse retention, it rehashes the survivors into a fresh
right-sized table — a sequential write into a small allocation, no
remap vector at all. The insert path's load-factor check grows the
table back naturally if the retained set grows again.

Interleaved min-of-3 A/B on the bucketed instrument (911 KiB input,
100 keystrokes, late band = end-of-document edits), run under rising
host load:

| config | retained late median | retained late min |
|---|---|---|
| baseline | 24.22 ms | 23.56 ms |
| shrink | **21.99 ms** | **20.94 ms** |

The control proves the direction: the shrink-free snapshot tier moved
*up* with host noise while the retained tier moved *down* — the
retained/snapshot ratio went 2.5x → 4.3x.

## Shipped

Landed in [rs#482](https://github.com/parsanol/parsanol-rs/pull/482),
released as parsanol-rs 0.20.18, and riding the release-all-runtimes
train: parsanol-ruby 1.3.146, parsanol-python 0.1.29, and parsanol-ts
0.10.50 (node tier from the candidate recipe, web tier from the
official @parsanol/wasm 0.20.18).
