---
id: ruby-1.1.0
date: 2026-03-05T16:00:00Z
title: "Parsanol Ruby 1.1.0: Slice Support and Performance"
summary: Added Slice objects for lazy extraction and streaming parser support for large files.
tags: [release, ruby, performance]
featured: false
---

Parsanol Ruby 1.1.0 adds Slice objects for lazy extraction and streaming parser support for large files.

## Slice Objects

Extract values lazily without loading entire parse results into memory:

```ruby
require 'parsanol'

parser = str('hello').repeat(1)
result = parser.parse('hellohellohello')

# Access results as Slice objects
result.each_slice do |slice|
  puts slice.to_s  # => "hello"
end
```

## Streaming Parser

Parse large files without loading them entirely into memory:

```ruby
# Stream parsing for large files
parser = Parsanol::StreamingParser.new(grammar)
parser.parse_file('large_data.json') do |result|
  process(result)
end
```

## Integration Modes Update

| Mode | Method | Description |
|------|--------|-------------|
| Ruby | `parse_ruby` | Pure Ruby, maximum compatibility |
| Native | `parse_native` | Rust FFI, 17-42x faster |
| JSON | `parse_json` | Serialize result to JSON |
| Slice | `parse_slice` | Return Slice objects for lazy extraction |
| ZeroCopy | `parse_zerocopy` | Direct FFI pointer access |

## What's Changed

- `parse_slice` method for lazy extraction
- `parse_zerocopy` for direct FFI pointer access
- Streaming parser support for large files
- Improved memory efficiency
- 850+ tests passing
