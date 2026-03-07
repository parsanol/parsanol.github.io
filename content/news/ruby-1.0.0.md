---
id: ruby-1.0.0
date: 2026-03-03T10:00:00Z
title: "Parsanol Ruby 1.0.0: Initial Release"
summary: First release of Parsanol Ruby bindings with native extension support and Parslet-compatible API.
tags: [release, ruby]
featured: false
---

Parsanol Ruby 1.0.0 provides Ruby bindings for the Parsanol parser combinator library with native extension support for maximum performance.

## Parslet-Compatible API

Familiar API for users coming from Parslet:

```ruby
require 'parsanol'

class MyParser < Parsanol::Parser
  rule(:integer) { match('[0-9]').repeat(1) }
  rule(:plus)    { str('+') }
  rule(:expr)    { integer >> plus >> integer }

  root :expr
end

parser = MyParser.new
result = parser.parse('1+2')
```

## Native Extension

The native extension provides significant performance improvements over pure Ruby parsers:

| Grammar | Pure Ruby | Parsanol Native | Speedup |
|---------|-----------|-----------------|---------|
| JSON | 45ms | 1.2ms | 37x |
| CSV | 120ms | 2.7ms | 44x |
| Calculator | 8ms | 0.4ms | 20x |

## Integration Modes

| Mode | Method | Description |
|------|--------|-------------|
| Ruby | `parse_ruby` | Pure Ruby, maximum compatibility |
| Native | `parse_native` | Rust FFI, 17-42x faster |
| JSON | `parse_json` | Serialize result to JSON |

## Installation

```ruby
gem 'parsanol', '~> 1.0'
```

## What's Changed

- Native extension for Rust FFI parsing
- Parslet-compatible parser API
- Multiple parsing modes (Ruby, Native, JSON)
- Comprehensive test suite
