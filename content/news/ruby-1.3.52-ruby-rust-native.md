---
id: ruby-1.3.52-ruby-rust-native
date: 2026-09-23T18:00:00Z
title: "Parsanol 1.3.52: The Ruby and Rust Packages Ship Together"
summary: "The Ruby gem and the Rust crate now expose one engine across every supported runtime. This post enumerates the supported formats, archives, runtimes, and platforms."
tags: [release, ruby, rust, packaging]
featured: true
---

Parsanol 1.3.52 marks the first release in which the Ruby gem (`parsanol`) and the Rust crate (`parsanol`) ship from the same build matrix. The two artifacts share a single native engine, expose the same C ABI to non-MRI runtimes, and bundle a vendored copy of one another for the cases in which only one of the two is available.

## Two packages, one engine

The Ruby gem at version 1.3.52 (`gem install parsanol`) ships as one source gem plus eleven prebuilt platform gems. The Rust crate at version 0.8.8 (`cargo add parsanol`) compiles the same engine from source. Both packages expose the same set of primitives at the same level of capability: PEG grammars, named captures, scopes, dynamic dispatch, transformations, error reporting, and incremental reparsing.

## Supported grammar formats

The engine consumes and produces grammars in the following formats.

| Format | Identifier | Use |
|--------|-----------|-----|
| Parsanol DSL (Ruby `Parsanol::Parser` class) | `Parsanol::Parser` | Authoring |
| Parsanol DSL (Rust `parsanol::Grammar`) | `parsanol::Grammar` | Authoring |
| Parsanol JSON (serialized grammar) | `Parsanol::Native.serialize_grammar` | Wire format |
| Parslet DSL | `Parsanol::Parslet::Parser` | Compatibility shim |

The engine accepts any of these as input and produces a parslet-compatible tree from any of them on output.

## Supported input archives

The engine parses the following input formats in the standard DSL.

- Plain text (UTF-8, ASCII, binary-safe via the explicit-length C entry point `parsanol_c_parse_len`)
- RFC 3339 date and time values
- ISO 8601 date and time values
- JSON, XML, CSV, YAML through the corresponding parser libraries
- CommonMark markdown
- ABNF, RFC 5234 core ABNF
- Custom formats defined by the user through the Parsanol DSL

## Supported output archives

The engine emits the following output formats.

- Parslet-compatible tree (`Hash`, `Array`, `Parsanol::Slice`)
- Raw tagged tree (`Parsanol::Native.parse_raw`)
- Batch-encoded u64 array for high-throughput consumers (`Parsanol::Native.parse_batch`)
- Prefix-parse result (value, end position) (`Parsanol::Native.parse_prefix`)
- Raw tagged tree with the `parsanol_c_*` C ABI

## Supported runtimes

The engine runs on the following runtimes.

| Runtime | Engine tier | Native parse |
|---------|-------------|--------------|
| MRI Ruby 3.2, 3.3, 3.4, 4.0 | Rust extension | Yes |
| TruffleRuby | FFI tier (vendored cdylib) | Yes |
| JRuby | Pure-Ruby engine | No |
| Rubinius | Pure-Ruby engine | No |

The FFI tier depends on the `ffi` Ruby gem. MRI users receive the FFI tier as a resilience fallback when the extension fails to load. TruffleRuby users receive the FFI tier as the default engine.

## Supported platforms

Each platform gem carries the Ruby extension and a vendored cdylib. The ruby source gem carries no binaries.

| Platform | Triple | Ruby |
|----------|--------|------|
| x86_64-linux (glibc, musl) | linux | 3.2, 3.3, 3.4, 4.0 |
| aarch64-linux (glibc, musl) | linux | 3.2, 3.3, 3.4, 4.0 |
| arm-linux, arm-linux-musl | linux | 3.2, 3.3, 3.4, 4.0 |
| arm64-darwin, x86_64-darwin | darwin | 3.2, 3.3, 3.4, 4.0 |
| x64-mingw-ucrt, aarch64-mingw-ucrt | windows | 3.2, 3.3, 3.4, 4.0 |
| x64-mingw32 | windows | 3.0 (stub only) |
| ruby (source) | all | 3.2, 3.3, 3.4, 4.0 |

The 32-bit x86 Linux target is not shippable: rb-sys does not publish i686 dock images and rake-compiler ships no prebuilt i686 rubies for the 3.2 floor.

## How to use each package

### Ruby gem

```
gem install parsanol
```

The gem installs one source gem plus one prebuilt platform gem per runtime. The MRI extension loads by default. TruffleRuby resolves the host-triple platform gem and loads the FFI tier. JRuby resolves the source gem and runs the pure-Ruby engine.

### Rust crate

```
cargo add parsanol
```

The crate compiles from source. The `ruby` feature pulls in magnus for the Ruby extension. Without the feature, the crate compiles as a pure portable core that links into any cdylib.

### C ABI (ffi tier)

The C ABI is exported by both the MRI extension and the cdylib. The entry points are `parsanol_c_register`, `parsanol_c_parse`, `parsanol_c_parse_len`, `parsanol_c_last_error`, and `parsanol_c_release`. Consumers other than Ruby (Python, Node, Lua) bind these directly.

## Release cadence

The Ruby gem and the Rust crate release from the same commit and share the same version floor for major releases. The minor and patch versions advance independently. The Ruby gem leads on release tooling; the Rust crate leads on engine features. The Ruby 1.3.52 release and the Rust 0.8.8 release coincide.
