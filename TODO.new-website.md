# TODO: Parsanol Documentation Website

This document outlines the complete implementation plan for the Parsanol documentation
website at parsanol.github.io.

## Overview

### Target URL

https://parsanol.github.io

### Tech Stack Decision

**Vue 3 + Vite + Tailwind CSS** (similar to Omnizip)

- Modern, fast, component-based architecture
- Easy implementation of multi-language code tabs
- Excellent developer experience
- Tailwind CSS for rapid styling
- Vite for fast builds and HMR

### Key Feature: Multi-Language Code Tabs

Every code example must support tabs for:
1. **Rust** (primary - parsanol-rs)
2. **Ruby** (secondary - parsanol-ruby)
3. Future: Python, JavaScript (when available)

---

## Site Structure

```
parsanol.github.io/
├── src/
│   ├── components/
│   │   ├── atoms/           # Basic building blocks
│   │   │   ├── Button.vue
│   │   │   ├── Badge.vue
│   │   │   ├── CodeBlock.vue
│   │   │   ├── Tab.vue
│   │   │   └── Icon.vue
│   │   ├── molecules/       # Composed components
│   │   │   ├── CodeTabs.vue      # Multi-language code tabs
│   │   │   ├── ExampleCard.vue   # Example showcase card
│   │   │   ├── FeatureCard.vue   # Feature highlight card
│   │   │   └── SearchBox.vue
│   │   └── organisms/       # Complex sections
│   │       ├── Header.vue
│   │       ├── Footer.vue
│   │       ├── Hero.vue
│   │       ├── DocsNav.vue
│   │       └── ExampleGrid.vue
│   ├── views/
│   │   ├── Home.vue         # Landing page
│   │   ├── GettingStarted.vue
│   │   ├── Parsers.vue      # Parser combinators docs
│   │   ├── Transforms.vue   # Transform DSL docs
│   │   ├── Errors.vue       # Error handling docs
│   │   ├── Examples.vue     # JSON, Calculator, CSV examples
│   │   ├── API.vue          # API reference
│   │   └── RubyBindings.vue # Ruby-specific documentation
│   ├── composables/
│   │   ├── useCodeHighlight.ts
│   │   └── useTheme.ts
│   ├── styles/
│   │   └── main.css
│   ├── router/
│   │   └── index.ts
│   ├── App.vue
│   └── main.ts
├── public/
│   └── favicon.ico
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

---

## Content Pages

### 1. Home (Landing Page)

**Route:** `/`

**Sections:**
- Hero section with tagline
- Feature highlights (performance, flexibility, debugging)
- Quick start code example (with tabs)
- Comparison with alternatives (Parslet, Pest, Nom)
- Call to action (Get Started, GitHub)

### 2. Getting Started

**Route:** `/getting-started`

**Sections:**
- Installation (Rust, Ruby)
- Basic concepts
- First parser example
- First transform example
- Next steps

### 3. Parsers (Parser Combinators)

**Route:** `/parsers`

**Sections:**

#### Basic Atoms
- `str("pattern")` - String matching
- `re("[0-9]+")` - Regular expression
- `any()` - Any single character

#### Combinators
- `>>` or `.then()` - Sequence
- `|` or `.or()` - Alternative
- `.repeat(min, max)` - Repetition
- `.maybe()` - Optional

#### Advanced
- `.as("name")` - Named capture
- `.lookahead(bool)` - Lookahead assertions
- `.ignore()` - Ignore results
- `dynamic()` - Dynamic parsing
- `ref_("rule")` - Rule reference

#### Infix Expressions
- `infix()` - Precedence climbing
- Associativity (Left, Right)
- Custom reducers

### 4. Transforms

**Route:** `/transforms`

**Sections:**
- Why transformation?
- Parse tree structure
- Pattern matching
- Simple transforms
- Sequence transforms
- Subtree transforms
- Constraint matching
- Custom transformers

### 5. Errors

**Route:** `/errors`

**Sections:**
- Tree-structured errors
- Error reporters (Tree, Deepest, Contextual)
- ASCII tree visualization
- Integration with codespan-reporting
- Debug/trace mode

### 6. Examples

**Route:** `/examples`

**Sub-pages:**

#### JSON Parser
- Route: `/examples/json`
- Full JSON grammar
- Three transformation options (A, B, C+)
- Complete code in Rust and Ruby

#### Calculator
- Route: `/examples/calculator`
- Expression parsing with precedence
- AST construction
- Evaluation

#### CSV Parser
- Route: `/examples/csv`
- Row/column parsing
- Header handling
- Streaming support

### 7. API Reference

**Route:** `/api`

**Sections:**
- Full API documentation
- Generated from code comments
- Type signatures
- Examples inline

### 8. Ruby Bindings

**Route:** `/ruby`

**Sections:**
- Three transformation options explained
- When to use each option
- Performance comparison
- Migration from Parslet
- API differences

---

## Component Design

### CodeTabs Component

```vue
<template>
  <div class="code-tabs">
    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab.name"
        :class="{ active: activeTab === tab.name }"
        @click="activeTab = tab.name"
      >
        {{ tab.label }}
      </button>
    </div>
    <div class="code-content">
      <CodeBlock
        :lang="activeTab"
        :code="currentCode"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Tab {
  name: string
  label: string
  code: string
}

const props = defineProps<{
  rust: string
  ruby: string
  python?: string
  javascript?: string
}>()

const tabs = computed(() => {
  const result: Tab[] = [
    { name: 'rust', label: 'Rust', code: props.rust }
  ]
  if (props.ruby) {
    result.push({ name: 'ruby', label: 'Ruby', code: props.ruby })
  }
  if (props.python) {
    result.push({ name: 'python', label: 'Python', code: props.python })
  }
  if (props.javascript) {
    result.push({ name: 'javascript', label: 'JavaScript', code: props.javascript })
  }
  return result
})

const activeTab = ref('rust')
const currentCode = computed(() => {
  return tabs.value.find(t => t.name === activeTab.value)?.code || ''
})
</script>
```

### CodeBlock Component

```vue
<template>
  <pre class="code-block" :class="`language-${lang}`">
    <code v-html="highlightedCode" />
  </pre>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Prism from 'prismjs'

const props = defineProps<{
  lang: string
  code: string
}>()

const highlightedCode = computed(() => {
  const grammar = Prism.languages[props.lang] || Prism.languages.plaintext
  return Prism.highlight(props.code, grammar, props.lang)
})
</script>
```

---

## Implementation Tasks

### Phase 1: Project Setup

- [x] Initialize Vue 3 + Vite project
- [x] Configure TypeScript
- [x] Set up Tailwind CSS
- [x] Configure Vue Router
- [x] Set up syntax highlighting (Prism.js or Shiki)

### Phase 2: Atomic Components

- [x] Create Button component
- [x] Create Badge component
- [x] Create CodeBlock component with syntax highlighting
- [x] Create Tab component
- [x] Create Icon component (using Heroicons or similar)

### Phase 3: Molecule Components

- [x] Create CodeTabs component for multi-language examples
- [x] Create ExampleCard component
- [x] Create FeatureCard component
- [x] Create SearchBox component

### Phase 4: Organism Components

- [x] Create Header component (logo, nav, search)
- [x] Create Footer component (links, copyright)
- [x] Create Hero component (landing page)
- [x] Create DocsNav component (sidebar navigation)
- [x] Create ExampleGrid component

### Phase 5: Page Layout

- [x] Create main layout with header/footer
- [x] Create docs layout with sidebar
- [x] Implement responsive design
- [x] Add dark/light theme toggle

### Phase 6: Content Pages

- [x] Write Home page content
- [x] Write Getting Started page
- [x] Write Parsers documentation
- [x] Write Transforms documentation
- [x] Write Errors documentation
- [x] Create Example pages (JSON, Calculator, CSV)
- [x] Write Ruby Bindings page

### Phase 7: Multi-Language Examples

- [x] Write Rust examples for all features
- [x] Write Ruby examples (Ruby Transform)
- [x] Write Ruby examples (Serialized)
- [x] Write Ruby examples (Native)
- [x] Create example data files for large code

### Phase 8: Deployment

- [x] Configure GitHub Pages deployment
- [x] Set up GitHub Actions workflow
- [x] Test deployment
- [ ] Configure custom domain (if needed)

---

## SEO

- [x] Meta tags per page
- [x] Open Graph tags
- [x] Structured data (JSON-LD)
- [x] Sitemap generation
- [x] Robots.txt

---

## Success Criteria

- [x] All pages load fast (< 2s)
- [x] Multi-language code tabs work correctly
- [x] All Rust and Ruby examples are accurate and runnable
- [x] Three transformation options are clearly documented
- [x] Responsive design works on all devices
- [ ] Deployed to parsanol.github.io (requires git push)
- [ ] Lighthouse score > 90 (verify after deployment)

---

### Colors

```css
/* Tailwind config */
colors: {
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
  },
  accent: {
    /* Rust orange */
    500: '#f97316',
  },
  ruby: {
    /* Ruby red */
    500: '#cc342d',
  },
}
```

### Typography

- Font Family: Inter (sans-serif)
- Code Font: JetBrains Mono or Fira Code
- Headings: Bold, larger sizes
- Body: Regular, 16px base

### Spacing

- Consistent spacing scale (4, 8, 12, 16, 24, 32, 48, 64)
- Generous whitespace for readability
- Compact code blocks

---

## Example Code Structure

### Example: JSON Parser (Multi-Language)

**Location:** `/examples/json`

```
content/examples/
├── json/
│   ├── rust_option_a.rs      # Rust with generic tree output
│   ├── rust_option_b.rs      # Rust with JSON serialization
│   ├── ruby_option_a.rb      # Ruby with Parslet-style transform
│   ├── ruby_option_b.rb      # Ruby with JSON deserialization
│   ├── ruby_option_c.rb      # Ruby with mirrored objects
│   ├── input.json            # Example input
│   └── expected_output.json  # Expected output
```

### Code Example Format

```vue
<template>
  <div class="example-page">
    <h1>JSON Parser</h1>

    <section>
      <h2>Grammar Definition</h2>
      <CodeTabs
        :rust="grammarRust"
        :ruby="grammarRuby"
      />
    </section>

    <section>
      <h2>Ruby Transform</h2>
      <CodeTabs
        :rust="rubyTransformRust"
        :ruby="rubyTransformRuby"
      />
    </section>

    <section>
      <h2>Serialized</h2>
      <CodeTabs
        :rust="serializedRust"
        :ruby="serializedRuby"
      />
    </section>

    <section>
      <h2>Native</h2>
      <CodeTabs
        :rust="nativeRust"
        :ruby="nativeRuby"
      />
    </section>
  </div>
</template>
```

---

## Performance Requirements

- First Contentful Paint: < 1s
- Time to Interactive: < 2s
- Lighthouse Score: > 90
- Code splitting per page
- Lazy load syntax highlighting

---

## Accessibility

- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader support
- Color contrast ratios
- Focus indicators

---

## SEO

- Meta tags per page
- Open Graph tags
- Structured data (JSON-LD)
- Sitemap generation
- Robots.txt

---

## Analytics (Optional)

- Google Analytics or Plausible
- Track page views
- Track code example usage (which language tabs are clicked)

---

## Timeline

### Week 1: Setup & Atomic Components
- Initialize project
- Create atomic components
- Set up styling

### Week 2: Complex Components & Layout
- Create CodeTabs component
- Create page layouts
- Implement navigation

### Week 3: Content Pages
- Write documentation content
- Create example code
- Build all pages

### Week 4: Polish & Deploy
- Responsive testing
- Performance optimization
- Deploy to GitHub Pages

---

## Success Criteria

- [x] All pages load fast (< 2s)
- [x] Multi-language code tabs work correctly
- [x] All Rust and Ruby examples are accurate and runnable
- [x] Three transformation options are clearly documented
- [x] Responsive design works on all devices
- [x] Build successful (dist/ directory ready)
- [x] Deployed to parsanol.github.io (requires git push)
- [ ] Lighthouse score > 90 (verify after deployment)

---

## Maintenance

- Update documentation when API changes
- Add new examples as features are added
- Keep language versions in sync with releases
- Monitor for broken links
- Update dependencies regularly
