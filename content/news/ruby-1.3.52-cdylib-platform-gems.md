---
id: ruby-1.3.52-cdylib-platform-gems
date: 2026-09-23T10:00:00Z
title: "1.3.52: A Vendored C Library in Every Platform Gem"
summary: Each prebuilt platform gem now carries its own pure-portable cdylib next to the extension — the ffi tier works everywhere from MRI fallback to TruffleRuby — while the source gem stays binary-free.
tags: [release, ruby, packaging]
featured: true
---

Every prebuilt `parsanol` platform gem for 1.3.52 ships two native artifacts: the Ruby extension and a **pure-portable cdylib** (`libparsanol.{so,dylib}` / `parsanol.dll`) at `lib/parsanol/native/`.

## Why a cdylib next to the extension?

The cdylib speaks a plain C ABI with zero Ruby-version coupling — no magnus, no rb-sys. That makes it useful to runtimes that can't load C-API extensions:

- **TruffleRuby** resolves its host-triple platform gem and gets native parsing through the ffi tier
- **MRI** gets a resilience fallback: if the extension ever fails to load on an exotic libc, the ffi tier picks up the cdylib instead of dropping to pure Ruby
- The **ruby source gem stays binary-free** — binaries live only in per-platform gems, never in git

## The platform matrix

| gem | target | Ruby |
|-----|--------|------|
| x86_64-linux / -musl, aarch64-linux / -musl | glibc + Alpine, 64-bit | 3.2–4.0 |
| arm-linux / -musl | 32-bit armv7 | 3.2–4.0 |
| arm64-darwin, x86_64-darwin | macOS 11+ | 3.2–4.0 |
| x64-mingw-ucrt, aarch64-mingw-ucrt | Windows | 3.2–4.0 |
| x64-mingw32 | legacy MinGW (Ruby 3.0 < floor) | lib-only stub |
| ruby | everywhere else, incl. JRuby | pure-Ruby engine |

32-bit x86 Linux is not shippable today: rb-sys stopped publishing i686 dock images and rake-compiler ships no prebuilt i686 rubies for the 3.2+ floor.

Also in this release: binary-safe `parsanol_c_parse_len` on the C ABI (interior NULs survive the boundary), and bounded caches — the compiled-program cache is an LRU, closing the unbounded memory growth reported on dynamic-fragment grammars.
