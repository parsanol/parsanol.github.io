---
id: ruby-1.0.2
date: 2026-03-03T14:00:00Z
title: "Parsanol Ruby 1.0.2: Release Infrastructure"
summary: Improved release infrastructure with automated gem builds and cross-platform support.
tags: [release, ruby]
featured: false
---

Parsanol Ruby 1.0.2 focuses on release infrastructure improvements for reliable gem distribution.

## Cross-Platform Support

Precompiled native gems for major platforms:

| Platform | Architecture |
|----------|--------------|
| Linux | x86_64, aarch64 |
| macOS | x86_64, arm64 |
| Windows | x86_64 |

## Automated Releases

- GitHub Actions workflow for automated gem builds
- RubyGems.org publishing on tag push
- Automated version synchronization with parsanol-rs

## What's Changed

- Precompiled native gems for Linux, macOS, Windows
- Automated release workflow via GitHub Actions
- Fixed native extension loading for various platforms
- Improved error messages for missing native extension
