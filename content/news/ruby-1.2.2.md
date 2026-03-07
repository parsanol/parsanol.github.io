---
id: ruby-1.2.2
date: 2026-03-07T10:00:00Z
title: "Parsanol Ruby 1.2.2: FFI Captures, Scopes, and Dynamic Atoms"
summary: Ruby bindings now support native capture extraction, isolated scopes, and context-sensitive parsing via FFI callbacks.
tags: [release, ruby, features]
featured: true
---

Parsanol Ruby 1.2.2 brings full FFI support for the new features introduced in parsanol-rs 0.3.0. Ruby code can now use capture atoms, scope atoms, and dynamic atoms with native performance.

## Version Sync

| parsanol-ruby | parsanol-rs | Features |
|---------------|-------------|----------|
| 1.0.x | 0.1.x | Core parsing, native extension |
| 1.1.x | 0.2.x | Slice support, streaming parser |
| 1.2.x | 0.3.x | Captures, scopes, dynamic atoms |

## Capture Atoms in Ruby

```ruby
require 'parsanol'

parser = str('hello').capture(:greeting)
result = parser.parse('hello world')
puts result[:greeting].to_s  # => "hello"
```

## Dynamic Atoms with Ruby Callbacks

```ruby
# Type-driven parsing with FFI callbacks
parser = match('[a-z]+').capture(:type) >> str(':') >>
        dynamic { |ctx|
          case ctx[:type].to_s
          when 'int' then match('\d+')
          when 'str' then match('[a-z]+')
          else match('[a-z]+')
          end
        }

result = parser.parse('int:42')
puts result[:type].to_s  # => "int"
```

## Streaming Builder API

The StreamingBuilder module provides maximum performance by eliminating intermediate AST construction. Include `Parsanol::BuilderCallbacks` in your class to receive parse events directly.

## What's Changed

- FFI bindings for capture, scope, and dynamic atoms
- `Parsanol::BuilderCallbacks` module for streaming parsing
- `Parsanol::Native::Dynamic` module for callback registration
- Fixed native extension loading for precompiled gems
- 1178 tests passing
