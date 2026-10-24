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

// Scan for all examples by looking for example.json files
function scanExamples() {
  const examples = [];

  if (!fs.existsSync(RUST_EXAMPLES_DIR)) {
    console.error(`Rust examples directory not found: ${RUST_EXAMPLES_DIR}`);
    return examples;
  }

  const dirs = fs.readdirSync(RUST_EXAMPLES_DIR, { withFileTypes: true });

  for (const entry of dirs) {
    if (!entry.isDirectory()) continue;
    if (entry.name === 'SPEC.md') continue; // Skip spec file
    if (entry.name === 'assets') continue; // Skip assets directory

    const exampleDir = path.join(RUST_EXAMPLES_DIR, entry.name);
    const metadataPath = path.join(exampleDir, 'example.json');

    // Check if example.json exists
    if (fs.existsSync(metadataPath)) {
      examples.push({
        id: entry.name,
        dir: exampleDir,
        metadataPath: metadataPath,
        type: 'rust-ruby'
      });
    }
  }

  return examples;
}

// Scan for Ruby-only examples (Parslet-specific features)
function scanRubyOnlyExamples() {
  const examples = [];

  if (!fs.existsSync(RUBY_EXAMPLES_DIR)) {
    console.error(`Ruby examples directory not found: ${RUBY_EXAMPLES_DIR}`);
    return examples;
  }

  // Ruby-only example IDs (Parslet-specific features)
  const rubyOnlyIds = ['capture', 'scopes', 'local', 'empty', 'mathn', 'seasons'];

  for (const id of rubyOnlyIds) {
    const dir = path.join(RUBY_EXAMPLES_DIR, id);
    if (fs.existsSync(dir)) {
      examples.push({
        id: id,
        dir: dir,
        type: 'ruby-only'
      });
    }
  }

  return examples;
}

// Main function
function main() {
  console.log('Generating example documentation pages...\n');
  console.log('Reading from:', RUST_EXAMPLES_DIR);
  console.log('');

  // Ensure output directory exists
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  // Scan for examples
  const examples = scanExamples();
  console.log(`Found ${examples.length} examples with example.json\n`);

  const examplesManifest = [];
  const emittedPaths = new Set();
  let generatedCount = 0;

  for (const example of examples) {
    const { id, dir, metadataPath } = example;

    // Read metadata from example directory
    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));

    // Find code files
    const rustFiles = findRustFiles(id);
    const rubyFiles = findRubyFiles(id);

    // Get the first available implementation for each language
    const rustFile = rustFiles.length > 0 ? rustFiles[0] : null;
    const rubyFile = rubyFiles.length > 0 ? rubyFiles[0] : null;

    const rustCode = rustFile ? readFile(rustFile.path) : null;
    const rubyCode = rubyFile ? cleanRubyCode(readFile(rubyFile.path)) : null;

    const hasRust = !!rustCode;
    const hasRuby = !!rubyCode;

    // Skip if no code at all
    if (!hasRust && !hasRuby) {
      console.log(`⚠️  Skipping ${id}: No code found`);
      continue;
    }

    const kebabPath = `/examples/${toKebabCase(id)}`;
    if (emittedPaths.has(kebabPath)) {
      console.log(`⚠️  Skipping ${id}: duplicate path ${kebabPath}`);
      continue;
    }
    emittedPaths.add(kebabPath);

    // Parse code walkthrough from .md file
    let codeWalkthrough = [];
    if (rustFile && rustFile.mdPath) {
      const mdContent = readFile(rustFile.mdPath);
      if (mdContent) {
        codeWalkthrough = parseCodeWalkthrough(mdContent);
      }
    }

    // Copy diagram if available
    const hasDiagram = copyDiagram(id);

    // Emit Astro page data
    const exampleData = {
      id: id,
      path: `/examples/${toKebabCase(id)}`,
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
      walkthrough: codeWalkthrough,
      rustCode: rustCode,
      rubyCode: rubyCode,
    };
    const dataPath = path.join(DATA_DIR, `${id}.json`);
    fs.writeFileSync(dataPath, JSON.stringify(exampleData, null, 2));
    emittedPaths.add(kebabPath);

    // Status indicators
    const status = hasRust && hasRuby ? '✓' : (hasRust ? '◐' : '◑');
    const diagramStatus = hasDiagram ? '📄' : '';
    const walkthroughStatus = codeWalkthrough.length > 0 ? '📝' : '';
    console.log(`${status} Generated data: ${id}.json (Rust: ${hasRust ? 'Y' : 'n'}, Ruby: ${hasRuby ? 'Y' : 'n'}) ${diagramStatus}${walkthroughStatus}`);

    // Add to manifest
    examplesManifest.push({
      path: `/examples/${toKebabCase(id)}`,
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
      hasWalkthrough: codeWalkthrough.length > 0,
      parsletCompatible: metadata.parsletCompatible || false,
    });

    generatedCount++;
  }

  // Process Ruby-only examples (Parslet-specific features)
  console.log('\n📚 Processing Ruby-only examples...\n');
  const rubyOnlyExamples = scanRubyOnlyExamples();
  console.log(`Found ${rubyOnlyExamples.length} Ruby-only examples\n`);

  for (const example of rubyOnlyExamples) {
    const { id, dir } = example;

    // Find Ruby code file
    const rubyFiles = findRubyFiles(id);
    const rubyFile = rubyFiles.length > 0 ? rubyFiles[0] : null;

    const rubyKebabPath = `/examples/${toKebabCase(id)}`;
    if (emittedPaths.has(rubyKebabPath)) {
      console.log(`⚠️  Skipping ${id}: duplicate path ${rubyKebabPath}`);
      continue;
    }
    if (!rubyFile) {
      console.log(`⚠️  Skipping ${id}: No Ruby code found`);
      continue;
    }

    const rubyCode = cleanRubyCode(readFile(rubyFile.path));
    if (!rubyCode) {
      console.log(`⚠️  Skipping ${id}: Could not read Ruby code`);
      continue;
    }

    // Parse code walkthrough from .md file
    let codeWalkthrough = [];
    if (rubyFile.mdPath) {
      const mdContent = readFile(rubyFile.mdPath);
      if (mdContent) {
        codeWalkthrough = parseCodeWalkthrough(mdContent);
      }
    }

    // Emit Astro page data (Ruby-only example)
    const rubyOnlyMetadata = {
      'capture': { title: 'Capture DSL', description: 'Parslet capture DSL for variable binding', category: 'conceptual', difficulty: 'intermediate' },
      'scopes': { title: 'Scope DSL', description: 'Parslet scope DSL for context management', category: 'conceptual', difficulty: 'intermediate' },
      'local': { title: 'Local Variable Parsing', description: 'Non-greedy parsing with local bindings', category: 'conceptual', difficulty: 'intermediate' },
      'empty': { title: 'Empty Rule Stub', description: 'Empty rule pattern for prototyping', category: 'conceptual', difficulty: 'beginner' },
      'mathn': { title: 'Mathn Compatibility', description: 'Ruby mathn library compatibility', category: 'conceptual', difficulty: 'beginner' },
      'seasons': { title: 'Transform Patterns', description: 'Transform DSL patterns demonstration', category: 'conceptual', difficulty: 'intermediate' },
    };
    const metadata = rubyOnlyMetadata[id] || { title: toPascalCase(id), description: 'Ruby-only example demonstrating Parslet-specific features.', category: 'conceptual', difficulty: 'intermediate' };

    const exampleData = {
      id: id,
      path: `/examples/${toKebabCase(id)}`,
      title: metadata.title,
      description: metadata.description,
      category: metadata.category,
      tags: ['ruby-only', 'parslet'],
      difficulty: metadata.difficulty,
      concepts: [],
      hasRust: false,
      hasRuby: true,
      parsletCompatible: true,
      hasDiagram: false,
      diagram: null,
      motivation: metadata.motivation || null,
      inputFormat: null,
      outputFormat: null,
      walkthrough: codeWalkthrough,
      rustCode: null,
      rubyCode: rubyCode,
    };
    const dataPath = path.join(DATA_DIR, `${id}.json`);
    fs.writeFileSync(dataPath, JSON.stringify(exampleData, null, 2));
    emittedPaths.add(`/examples/${toKebabCase(id)}`);

    // Add to manifest
    examplesManifest.push({
      path: `/examples/${toKebabCase(id)}`,
      name: toPascalCase(id) + 'Example',
      title: metadata.title,
      description: metadata.description,
      category: metadata.category,
      tags: ['ruby-only', 'parslet'],
      difficulty: metadata.difficulty,
      concepts: [],
      hasRust: false,
      hasRuby: true,
      hasDiagram: false,
      hasWalkthrough: codeWalkthrough.length > 0,
      parsletCompatible: true,
      rubyOnly: true,
    });

    generatedCount++;
  }

  // Write manifest JSON (ensure directory exists)
  const manifestDir = path.join(__dirname, '../src/data');
  if (!fs.existsSync(manifestDir)) {
    fs.mkdirSync(manifestDir, { recursive: true });
  }
  const manifestPath = path.join(manifestDir, 'examples-manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(examplesManifest, null, 2));
  console.log(`\n✓ Generated manifest: examples-manifest.json`);

  console.log(`\n✅ Generated ${generatedCount} example pages`);
}

main();
