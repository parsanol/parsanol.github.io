# TODO: Comprehensive Documentation Overhaul

## Status: Phase 1-4 COMPLETED (2026-02-24)

**Completed:**
- ✅ Phase 1: Architecture diagrams (5 SVG diagrams created)
- ✅ Phase 2: Getting Started overhaul (complete rewrite with diagrams)
- ✅ Phase 3: Examples Hub (all 21 examples listed)
- ✅ Phase 4: Individual example pages (21 Vue files created)

**In Progress:**
- 🔄 Phase 5: Example-specific architecture diagrams (21 SVGs needed)
- 🔄 Phase 6: Deep Dive pages

**Remaining:**
- Phase 7: Polish (optional enhancement)

---

## Overview

This plan transforms parsanol.github.io into the **most comprehensive parser library documentation** in the Rust ecosystem, surpassing even Parslet's excellent documentation.

**Inspiration:** Parslet's documentation excels because it:
- Starts with immediate, runnable success
- Builds complexity incrementally
- Shows both success and failure states
- Provides visual representations (AST diagrams)
- Has a dedicated "tricks" page for common patterns
- Links to extensive external resources
- Uses consistent, clean presentation format

**Our Goal:** Match and exceed Parslet's documentation quality while adding:
- More visual diagrams (SVG architecture diagrams)
- All 21 examples documented with architecture diagrams
- Interactive code examples
- Dual-language (Rust + Ruby) throughout

---

## Part 1: Architecture Diagrams (SVG) ✅ COMPLETED

### Location
- **General diagrams:** `/public/diagrams/` (for website)
- **Example-specific diagrams:** `parsanol-rs/examples/assets/` (with the example code)

**Created:**
1. ✅ `parser-transform-flow.svg` - The two-stage model
2. ✅ `parser-stage-detail.svg` - How atoms combine
3. ✅ `transform-stage-detail.svg` - Pattern matching
4. ✅ `parse-tree-structure.svg` - Tree node types
5. ✅ `infix-precedence.svg` - Operator precedence

---

## Part 2: Getting Started Overhaul ✅ COMPLETED

**What was added:**
- ✅ "What is a Parser Combinator?" section
- ✅ "The Two-Stage Model" section with main architecture diagram
- ✅ "Anatomy of a Parser" section with diagram
- ✅ "Anatomy of a Transform" section with diagram
- ✅ "Parse Tree Structure" section with diagram
- ✅ "Your First Complete Parser" step-by-step
- ✅ "Understanding Operator Precedence" section with diagram
- ✅ All examples in Rust + Ruby

---

## Part 3: Examples Hub ✅ COMPLETED

**What was added:**
- ✅ 21 examples organized into 4 categories:
  - **Basic (6):** Balanced Parens, Comments, String Literals, Whitespace, Sentence, Error Reporting
  - **Text Formats (5):** CSV Pattern/Transform, JSON Pattern/Transform, INI
  - **Languages (6):** Calculator Pattern/Transform, Boolean Algebra, S-Expr, ERB, Expression Evaluator
  - **Advanced (4):** Email, URL, IP Address, Simple XML, Markup
- ✅ Difficulty indicators (1-3 stars)
- ✅ Concept tags for each example

---

## Part 4: Individual Example Pages ✅ COMPLETED

**What was created:**
- ✅ 21 Vue files in `views/examples/`
- ✅ All routes added to `main.ts` with lazy loading
- ✅ Key examples have detailed content

---

## Part 5: Example-Specific Architecture Diagrams (NEW)

### Status: 🔄 IN PROGRESS

Each example needs its own architecture diagram showing:
- Input format
- Grammar rules
- Transform rules (if applicable)
- Output structure
- Data flow

### Diagrams to Create

| # | Example | SVG File | Key Concepts to Show |
|---|---------|----------|---------------------|
| 1 | Balanced Parens | `balanced-parens.svg` | Recursive descent, nesting levels |
| 2 | Boolean Algebra | `boolean-algebra.svg` | Operator precedence, short-circuit eval |
| 3 | Calculator Pattern | `calculator-pattern.svg` | Infix parsing, precedence climbing |
| 4 | Calculator Transform | `calculator-transform.svg` | AST building, recursive eval |
| 5 | Comments | `comments.svg` | Ignore patterns, filtering |
| 6 | CSV Pattern | `csv-pattern.svg` | Field parsing, repetition |
| 7 | CSV Transform | `csv-transform.svg` | Header mapping, row conversion |
| 8 | Email | `email.svg` | RFC patterns, validation |
| 9 | ERB | `erb.svg` | Template parsing, code embedding |
| 10 | Error Reporting | `error-reporting.svg` | Rich errors, context display |
| 11 | Expression Evaluator | `expression-evaluator.svg` | Variables, functions, scope |
| 12 | INI | `ini.svg` | Sections, key-value pairs |
| 13 | IP Address | `ip-address.svg` | IPv4/IPv6 patterns |
| 14 | JSON Pattern | `json-pattern.svg` | Recursive types, pattern matching |
| 15 | JSON Transform | `json-transform.svg` | Typed deserialization |
| 16 | Markup | `markup.svg` | Inline formatting, nesting |
| 17 | Sentence | `sentence.svg` | Tokenization, punctuation |
| 18 | S-Expr | `sexp.svg` | Recursive lists, atoms |
| 19 | Simple XML | `simple-xml.svg` | Tags, attributes, nesting |
| 20 | String Literal | `string-literal.svg` | Escape sequences, quoting |
| 21 | URL | `url.svg` | Components, validation |

### Implementation Tasks

```
- [ ] Create `balanced-parens.svg` in examples/assets/
- [ ] Create `boolean-algebra.svg` in examples/assets/
- [ ] Create `calculator-pattern.svg` in examples/assets/
- [ ] Create `calculator-transform.svg` in examples/assets/
- [ ] Create remaining 17 example SVGs
- [ ] Update example pages to reference their diagrams
```

---

## Part 6: Deep Dive Pages (NEW)

### Status: 🔄 PENDING

### 6.1 Parsers Deep Dive
**Route:** `/parsers/deep-dive`

**Content:**
For EVERY combinator, provide:
- Syntax (Rust + Ruby)
- What it does
- Input/output example
- Common patterns
- Gotchas

**Combinators to Document:**
1. `str()` - String literal
2. `re()` - Regular expression
3. `any()` - Any character
4. `eof()` - End of input
5. `then()` / `>>` - Sequence
6. `or()` / `|` - Alternative
7. `repeat()` - Repetition
8. `maybe()` - Optional
9. `as()` - Named capture
10. `ignore()` - Ignore result
11. `lookahead()` - Lookahead
12. `not_ahead()` - Negative lookahead
13. `cut()` - Commit to branch
14. `ref_()` - Rule reference
15. `dynamic()` - Dynamic parsing

### 6.2 Transforms Deep Dive
**Route:** `/transforms/deep-dive`

**Pattern Types:**
1. `simple(:x)` - Leaf values
2. `sequence(:x)` - Arrays
3. `subtree(:x)` - Anything
4. Hash patterns - Specific keys
5. Constraints - Variable unification
6. Custom patterns

### 6.3 Error Handling Deep Dive
**Route:** `/errors/deep-dive`

**Content:**
- Error tree structure
- Why errors are trees
- Error reporters
- Integration with codespan
- Custom error messages
- Error recovery strategies

### 6.4 Performance Guide
**Route:** `/guides/performance`

**Content:**
- How packrat memoization works
- Arena allocation explained
- When memoization helps
- When it doesn't
- Benchmarking tips
- Optimization strategies

### 6.5 Testing Guide
**Route:** `/guides/testing`

**Content:**
- Testing individual rules
- Property-based testing
- Snapshot testing
- Debugging failed parses
- Test organization

---

## Part 7: New Features Documentation (NEW)

### parsanol-rs v0.1.0 Features to Document

#### 7.1 Source Location Tracking

**Route:** `/features/source-location`

**What to document:**
```rust
pub struct SourcePosition {
    pub offset: usize,    // Byte offset
    pub line: usize,      // 1-indexed line
    pub column: usize,    // 1-indexed column (UTF-8 aware)
}

pub struct SourceSpan {
    pub start: SourcePosition,
    pub end: SourcePosition,
}
```

**Use cases:**
- IDE integration (go to definition)
- Error messages with line/column
- Source mapping for languages

#### 7.2 Grammar Composition

**Route:** `/features/grammar-composition`

**What to document:**
```rust
impl GrammarBuilder {
    pub fn import(&mut self, grammar: &Grammar, prefix: Option<&str>) -> &mut Self;
    pub fn import_with_rules(&mut self, grammar: &Grammar, prefix: &str, rules: &[(&str, usize)]) -> &mut Self;
    pub fn update_rule(&mut self, name: &str, atom_idx: usize) -> &mut Self;
}
```

**Use cases:**
- Modular grammar libraries
- Extending existing grammars
- Rule overriding

#### 7.3 Transform Pattern Indexing

**Route:** `/features/transform-indexing`

**What to document:**
- O(1) dispatch via hash pattern indexing
- How patterns are indexed by first key
- Performance benefits

#### 7.4 Incremental Parsing

**Route:** `/features/incremental-parsing`

**What to document:**
```rust
pub struct IncrementalParse {
    pub fn apply_edit(&mut self, start: usize, deleted: usize, inserted: &str);
    pub fn reparse(&mut self) -> Result<(), ParseError>;
    pub fn invalidate_range(&mut self, start: usize, end: usize);
}
```

**Use cases:**
- IDE integration
- Live preview
- Hot reloading

#### 7.5 Streaming Parser

**Route:** `/features/streaming`

**What to document:**
- Processing large files chunk by chunk
- Memory-efficient parsing
- Event-based output

#### 7.6 Infix Expression Builder

**Route:** `/features/infix-builder`

**What to document:**
```rust
pub struct InfixBuilder {
    pub fn primary(self, primary: impl Parslet) -> Self;
    pub fn op(self, op: &str, precedence: u8, assoc: Assoc) -> Self;
    pub fn build(&self, builder: &mut GrammarBuilder) -> usize;
}
```

**Use cases:**
- Calculator parsers
- Expression languages
- Query languages

---

## Part 8: Implementation Tasks

### Phase 5: Example Architecture Diagrams (2-3 days)
- [ ] Create all 21 example SVGs
- [ ] Update example pages to include diagrams

### Phase 6: Deep Dive Pages (3-4 days)
- [ ] Create ParsersDeepDive.vue
- [ ] Create TransformsDeepDive.vue
- [ ] Create ErrorsDeepDive.vue
- [ ] Create Performance guide
- [ ] Create Testing guide

### Phase 7: New Features Documentation (2-3 days)
- [ ] Create Source Location feature page
- [ ] Create Grammar Composition feature page
- [ ] Create Transform Indexing feature page
- [ ] Create Incremental Parsing feature page
- [ ] Create Streaming Parser feature page
- [ ] Create Infix Builder feature page

### Phase 8: Polish (1-2 days)
- [ ] Ensure all links work
- [ ] Add navigation breadcrumbs
- [ ] Add "Next/Previous" navigation
- [ ] Verify all code examples run
- [ ] Mobile responsiveness check
- [ ] Accessibility audit

---

## Success Metrics

- [x] 5 core architecture diagrams created
- [ ] 21 example-specific diagrams created
- [x] Getting Started explains two-stage model clearly
- [ ] Deep dive pages cover every combinator and pattern type
- [ ] Every code example is runnable (copy-paste works)
- [ ] Mobile-friendly on all pages
- [ ] Lighthouse score > 90
- [ ] Time to "Hello World" < 5 minutes for new users

---

## Reference: Parslet Documentation Excellence

What Parslet does well that we should match:

1. **Immediate Success**: First example works immediately ✅
2. **Progressive Complexity**: Each example adds one concept ✅
3. **Visual Output**: Shows what the parse tree looks like ✅
4. **Tricks Page**: Common patterns collected in one place (TODO)
5. **Error Examples**: Shows failures, not just successes (TODO)
6. **External Resources**: Links to videos, blog posts (TODO)
7. **Projects Page**: Shows real-world usage (TODO)

What we add beyond Parslet:

1. **Architecture Diagrams**: Visual explanation of how things work ✅
2. **Dual Language**: Rust + Ruby examples everywhere ✅
3. **21 Examples**: Comprehensive coverage of all use cases ✅
4. **Performance Guide**: Optimization tips (TODO)
5. **Testing Guide**: How to test parsers properly (TODO)
6. **New Features**: Source location, incremental parsing, streaming (TODO)
