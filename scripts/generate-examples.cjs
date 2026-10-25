#!/usr/bin/env node

/**
 * Example Generator Script
 *
 * Scans parsanol-rs/examples directory for example.json files
 * and generates Vue documentation pages.
 *
 * IMPORTANT: All metadata lives in the example directories, NOT here.
 * This script is a CONSUMER of that metadata.
 *
 * Structure expected:
 * parsanol-rs/examples/{id}/
 *   ├── basic.rs          (Rust code)
 *   ├── basic.rs.md       (Implementation docs with code walkthrough)
 *   ├── diagram.svg       (Optional diagram)
 *   └── example.json      (Format-level metadata)
 *
 * Run: node scripts/generate-examples.cjs
 */

const fs = require('fs');
const path = require('path');

// Paths - configurable via environment variables or relative paths
// In CI: PARSANOL_RS_DIR=./parsanol-rs PARSANOL_RUBY_DIR=./parsanol-ruby
// Locally: defaults to sibling directories
const RUST_EXAMPLES_DIR = process.env.PARSANOL_RS_DIR
  ? path.join(process.env.PARSANOL_RS_DIR, 'examples')
  : path.join(__dirname, '../../parsanol-rs/examples');
const RUBY_EXAMPLES_DIR = process.env.PARSANOL_RUBY_DIR
  ? path.join(process.env.PARSANOL_RUBY_DIR, 'example')
  : path.join(__dirname, '../../parsanol-ruby/example');
const DATA_DIR = path.join(__dirname, '../src/data/examples');
const DIAGRAMS_OUTPUT_DIR = path.join(__dirname, '../public/diagrams/examples');

// Read a file safely
function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch (e) {
    return null;
  }
}

// Clean up Ruby code for display (remove dev-only lines)
function cleanRubyCode(code) {
  if (!code) return code;
  return code
    .split('\n')
    .filter(line => !line.match(/^\s*\$:\.unshift/))
    .join('\n')
    .replace(/^\n+/, '');
}

// Escape backticks and template literals for Vue (for code in backticks)
function escapeForVue(str) {
  if (!str) return '';
  return str
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$/g, '\\$')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// Escape HTML entities for text content (descriptions, labels, etc.)
function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\$/g, '&#36;');  // Escape $ for Vue template compatibility
}

// Convert snake_case to PascalCase for component names
function toPascalCase(str) {
  return str.split(/[-_]/)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join('');
}

// Convert to kebab-case for paths
function toKebabCase(str) {
  return str.replace(/_/g, '-');
}

// Copy diagram from source to public/diagrams/examples/
function copyDiagram(exampleId) {
  const sourcePath = path.join(RUST_EXAMPLES_DIR, exampleId, 'diagram.svg');
  const destPath = path.join(DIAGRAMS_OUTPUT_DIR, `${exampleId}.svg`);

  if (fs.existsSync(sourcePath)) {
    if (!fs.existsSync(DIAGRAMS_OUTPUT_DIR)) {
      fs.mkdirSync(DIAGRAMS_OUTPUT_DIR, { recursive: true });
    }
    fs.copyFileSync(sourcePath, destPath);
    return true;
  }
  return false;
}

// Parse markdown file to extract code walkthrough sections
// Looks for ## Code Walkthrough section and extracts ### subsections
function parseCodeWalkthrough(markdown) {
  if (!markdown) return [];

  const sections = [];
  const lines = markdown.split('\n');
  let inWalkthrough = false;
  let currentSection = null;
  let currentContent = [];
  let currentCode = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check for Code Walkthrough section start
    if (line.match(/^## Code Walkthrough/)) {
      inWalkthrough = true;
      continue;
    }

    // Stop at next ## section (not subsection)
    if (inWalkthrough && line.match(/^## [^#]/) && !line.includes('Walkthrough')) {
      if (currentSection) {
        sections.push({
          section: currentSection,
          explanation: currentContent.join('\n').trim(),
          code: currentCode.join('\n').trim()
        });
      }
      break;
    }

    // Parse subsections (###)
    if (inWalkthrough && line.match(/^### /)) {
      // Save previous section
      if (currentSection) {
        sections.push({
          section: currentSection,
          explanation: currentContent.join('\n').trim(),
          code: currentCode.join('\n').trim()
        });
      }
      currentSection = line.replace(/^### /, '').trim();
      currentContent = [];
      currentCode = [];
      continue;
    }

    // Collect content
    if (inWalkthrough && currentSection) {
      // Check for code block
      if (line.startsWith('```')) {
        if (currentCode.length > 0 || line === '```') {
          // End of code block or empty block marker
          continue;
        }
        // Start of code block - collect until closing
        i++;
        while (i < lines.length && !lines[i].startsWith('```')) {
          currentCode.push(lines[i]);
          i++;
        }
      } else if (line.trim()) {
        currentContent.push(line);
      }
    }
  }

  // Don't forget the last section
  if (currentSection) {
    sections.push({
      section: currentSection,
      explanation: currentContent.join('\n').trim(),
      code: currentCode.join('\n').trim()
    });
  }

  return sections;
}

// Find Rust example file(s) in directory structure
function findRustFiles(exampleId) {
  const dir = path.join(RUST_EXAMPLES_DIR, exampleId);
  const files = [];

  if (fs.existsSync(dir)) {
    const entries = fs.readdirSync(dir);
    for (const entry of entries) {
      if (entry.endsWith('.rs')) {
        files.push({
          name: entry.replace('.rs', ''),
          path: path.join(dir, entry),
          mdPath: path.join(dir, entry + '.md')
        });
      }
    }
  }

  // Also check flat structure (legacy)
  const flatFile = path.join(RUST_EXAMPLES_DIR, `${exampleId}.rs`);
  if (fs.existsSync(flatFile)) {
    files.push({
      name: 'basic',
      path: flatFile,
      mdPath: flatFile + '.md'
    });
  }

  return files;
}

// Find Ruby example file(s) in directory structure
function findRubyFiles(exampleId) {
  const dir = path.join(RUBY_EXAMPLES_DIR, exampleId);
  const files = [];

  if (fs.existsSync(dir)) {
    const entries = fs.readdirSync(dir);
    for (const entry of entries) {
      if (entry.endsWith('.rb') && !entry.endsWith('.md')) {
        files.push({
          name: entry.replace('.rb', ''),
          path: path.join(dir, entry),
          mdPath: path.join(dir, entry + '.md')
        });
      }
    }
  }

  // Also check flat structure (legacy)
  const flatFile = path.join(RUBY_EXAMPLES_DIR, `${exampleId}.rb`);
  if (fs.existsSync(flatFile)) {
    files.push({
      name: 'basic',
      path: flatFile,
      mdPath: flatFile + '.md'
    });
  }

  return files;
}

// Scan both example roots; the rs checkout is the canonical source on collisions
function scanAllExamples() {
  const found = new Map();
  const scan = (rootDir, source) => {
    if (!fs.existsSync(rootDir)) {
      console.error(`Examples directory not found: ${rootDir}`);
      return;
    }
    for (const entry of fs.readdirSync(rootDir, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      if (['SPEC.md', 'assets', 'readme', 'output', 'documentation'].includes(entry.name)) continue;
      const dir = path.join(rootDir, entry.name);
      const metadataPath = path.join(dir, 'example.json');
      const kebab = `/examples/${toKebabCase(entry.name)}`;
      if (found.has(kebab)) continue; // rs is the canonical source
      if (fs.existsSync(metadataPath)) {
        found.set(kebab, { id: entry.name, dir, metadataPath, source });
      }
    }
  };
  scan(RUST_EXAMPLES_DIR, 'rs');
  scan(RUBY_EXAMPLES_DIR, 'ruby');
  return [...found.values()];
}

// Collect every implementation (rs and ruby) for an example id
function collectSources(id) {
  const sources = [];
  for (const f of findRustFiles(id)) {
    const code = readFile(f.path);
    if (!code) continue;
    const walkthrough = f.mdPath ? parseCodeWalkthrough(readFile(f.mdPath) || '') : [];
    sources.push({ lang: 'rust', name: f.name, code, walkthrough });
  }
  for (const f of findRubyFiles(id)) {
    let code = readFile(f.path);
    code = code ? cleanRubyCode(code) : null;
    if (!code) continue;
    const walkthrough = f.mdPath ? parseCodeWalkthrough(readFile(f.mdPath) || '') : [];
    sources.push({ lang: 'ruby', name: f.name, code, walkthrough });
  }
  return sources;
}

// Main function
function main() {
  console.log('Generating example documentation data...\n');
  console.log('Reading from:', RUST_EXAMPLES_DIR, 'and', RUBY_EXAMPLES_DIR);
  console.log('');

  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  const examples = scanAllExamples();
  console.log(`Found ${examples.length} unique examples\n`);

  const examplesManifest = [];
  const emittedPaths = new Set();
  let generatedCount = 0;

  for (const example of examples) {
    const { id, dir, metadataPath, source } = example;
    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
    const sources = collectSources(id);

    const kebabPath = `/examples/${toKebabCase(id)}`;
    if (emittedPaths.has(kebabPath)) {
      console.log(`⚠️  Skipping ${id}: duplicate path ${kebabPath}`);
      continue;
    }

    if (sources.length === 0) {
      console.log(`⚠️  Skipping ${id}: no implementation files found`);
      continue;
    }
    emittedPaths.add(kebabPath);

    // Copy diagram if available
    const hasDiagram = copyDiagram(id);

    const hasRust = sources.some((s) => s.lang === 'rust');
    const hasRuby = sources.some((s) => s.lang === 'ruby');

    // Emit Astro page data
    const exampleData = {
      id: id,
      path: kebabPath,
      title: metadata.title,
      description: metadata.description,
      category: metadata.category,
      tags: metadata.tags || [],
      difficulty: metadata.difficulty,
      concepts: metadata.concepts || [],
      hasRust: hasRust,
      hasRuby: hasRuby,
      parsletCompatible: metadata.parsletCompatible || false,
      hasDiagram: hasDiagram,
      diagram: hasDiagram ? `/diagrams/examples/${id}.svg` : null,
      motivation: metadata.motivation || null,
      inputFormat: metadata.inputFormat || null,
      outputFormat: metadata.outputFormat || null,
      sources: sources.map((s) => ({ lang: s.lang, name: s.name, code: s.code, walkthrough: s.walkthrough })),
    };
    const dataPath = path.join(DATA_DIR, `${id}.json`);
    fs.writeFileSync(dataPath, JSON.stringify(exampleData, null, 2));

    const status = hasRust && hasRuby ? '✓' : (hasRust || hasRuby ? '◐' : '◑');
    const diagramStatus = hasDiagram ? '📄' : '';
    const walkthroughStatus = sources.some((s) => s.walkthrough.length > 0) ? '📝' : '';
    console.log(`${status} Generated data: ${id}.json (${sources.map((s) => s.lang).join(' + ')}) ${diagramStatus}${walkthroughStatus}`);

    examplesManifest.push({
      path: kebabPath,
      name: toPascalCase(id) + 'Example',
      title: metadata.title,
      description: metadata.description,
      category: metadata.category,
      tags: metadata.tags || [],
      difficulty: metadata.difficulty,
      concepts: metadata.concepts || [],
      hasRust: hasRust,
      hasRuby: hasRuby,
      hasDiagram: hasDiagram,
      hasWalkthrough: sources.some((s) => s.walkthrough.length > 0),
      parsletCompatible: metadata.parsletCompatible || false,
      rubyOnly: source === 'ruby' && !hasRust,
    });

    generatedCount++;
  }

  const manifestDir = path.join(__dirname, '../src/data');
  if (!fs.existsSync(manifestDir)) {
    fs.mkdirSync(manifestDir, { recursive: true });
  }
  fs.writeFileSync(path.join(manifestDir, 'examples-manifest.json'), JSON.stringify(examplesManifest, null, 2));
  console.log(`\n✓ Generated manifest: examples-manifest.json (${examplesManifest.length} examples)`);

  console.log(`\n✅ Generated data for ${generatedCount} examples`);
}

main();
