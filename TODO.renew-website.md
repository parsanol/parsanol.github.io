# TODO: Website Renewal - COMPLETE

**Last Updated:** 2026-02-24

## ✅ FULLY DYNAMIC ARCHITECTURE

The website is now FULLY DYNAMIC with proper correlation between Rust and Ruby examples.

### How It Works

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     DYNAMIC DATA FLOW                                    │
└─────────────────────────────────────────────────────────────────────────┘

1. npm run generate (or npm run build)
         │
         ▼
2. Script scans:
   - parsanol-rs/examples/*.rs (21 files)
   - parsanol-ruby/example/*.rb (40 files)
         │
         ▼
3. Correlation via CORRELATION_MAP:
   - balanced_parens (Rust) ↔ parens (Ruby)
   - calculator_pattern (Rust) ↔ calc (Ruby)
   - error_reporting (Rust) ↔ nested_errors (Ruby)
   - etc.
         │
         ▼
4. Canonical examples (48 total):
   - Rust name preferred
   - Ruby-only if no Rust equivalent
         │
         ▼
5. Generates:
   - Vue components (48 pages)
   - JSON manifest
         │
         ▼
6. main.ts → Auto-routes from manifest
         │
         ▼
7. DocsNav.vue → Sidebar from manifest
```

### Build Commands

```bash
# Generate examples only
npm run generate

# Build (includes generate)
npm run build
```

### GitHub Actions

The workflow automatically:
1. Checkouts parsanol-rs and parsanol-ruby
2. Updates paths in generate script
3. Runs `npm run build` (which runs generate first)
4. Deploys to GitHub Pages

### Results

| Metric | Count |
|--------|-------|
| Rust examples | 21 |
| Ruby examples | 40 |
| Canonical examples | 48 |
| Both Rust+Ruby | 16 |
| Rust-only | 5 |
| Ruby-only | 27 |

### Files Modified

1. **`scripts/generate-examples.cjs`**
   - CORRELATION_MAP: Rust name → Ruby name
   - Canonical example deduplication
   - Proper file lookup with correlation

2. **`package.json`**
   - `"generate": "node scripts/generate-examples.cjs"`
   - `"build": "npm run generate && vite build"`

3. **`src/main.ts`**
   - Imports manifest
   - Auto-generates routes

4. **`.github/workflows/deploy.yml`**
   - Checkouts both repos
   - Updates paths for CI

## Testing Checklist

- [x] npm run generate works
- [x] npm run build works
- [x] 48 example pages generated
- [x] Correlation works (balanced_parens ↔ parens)
- [x] Sidebar shows all examples
- [x] Routes work correctly
