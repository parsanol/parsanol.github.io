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
const OUTPUT_DIR = path.join(__dirname, '../src/views/examples');
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

// Generate motivation section HTML
function generateMotivationSection(motivation) {
  if (!motivation) return '';

  const useCasesHtml = motivation.useCases && motivation.useCases.length > 0
    ? `
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Use Cases</h3>
          <ul class="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1 mb-4">
            ${motivation.useCases.map(uc => `<li>${escapeHtml(uc)}</li>`).join('\n            ')}
          </ul>`
    : '';

  return `
        <!-- Why This Example? -->
        <section class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Why Parse This Format?</h2>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            ${escapeHtml(motivation.why)}
          </p>
          ${useCasesHtml}
        </section>`;
}

// Generate input format section HTML
function generateInputFormatSection(inputFormat) {
  if (!inputFormat) return '';

  const examplesHtml = inputFormat.examples && inputFormat.examples.length > 0
    ? inputFormat.examples.map(ex => {
        const validityClass = ex.valid !== false
          ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
          : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
        const validityBadge = ex.valid !== false
          ? '<span class="text-green-600 dark:text-green-400 text-xs font-medium">VALID</span>'
          : '<span class="text-red-600 dark:text-red-400 text-xs font-medium">INVALID</span>';

        return `
            <div class="${validityClass} border rounded-lg p-4">
              <div class="flex items-center justify-between mb-2">
                <code class="text-sm font-mono bg-white dark:bg-gray-800 px-2 py-1 rounded">${escapeHtml(ex.input)}</code>
                ${validityBadge}
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400">${escapeHtml(ex.description)}</p>
            </div>`;
      }).join('\n')
    : '';

  return `
        <!-- Input Format -->
        <section class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Input Format</h2>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            ${escapeHtml(inputFormat.description)}
          </p>
          ${inputFormat.syntax ? `
          <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4">
            <code class="text-sm font-mono">${escapeHtml(inputFormat.syntax)}</code>
          </div>
          ` : ''}
          ${examplesHtml ? `
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Examples</h3>
          <div class="space-y-3">
            ${examplesHtml}
          </div>
          ` : ''}
        </section>`;
}

// Generate output format section HTML
function generateOutputFormatSection(outputFormat) {
  if (!outputFormat) return '';

  const structureHtml = outputFormat.structure
    ? Object.entries(outputFormat.structure).map(([name, info]) => `
            <div class="flex items-start gap-4 py-3 border-b border-gray-200 dark:border-gray-700 last:border-0">
              <code class="text-sm font-mono font-semibold text-primary-600 dark:text-primary-400 min-w-[100px]">${escapeHtml(name)}</code>
              <div class="flex-1">
                ${info.type ? `<span class="text-xs font-medium px-2 py-1 rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">${escapeHtml(info.type)}</span>` : ''}
                <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">${escapeHtml(info.description || '')}</p>
              </div>
            </div>`).join('\n')
    : '';

  const exampleHtml = outputFormat.example
    ? `
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3 mt-6">Example Output</h3>
          <div class="bg-gray-900 dark:bg-gray-950 rounded-lg p-4">
            <p class="text-xs text-gray-400 mb-2">Input: <code class="text-green-400">${escapeHtml(outputFormat.example.input)}</code></p>
            <pre class="text-sm text-gray-100 overflow-x-auto">${escapeHtml(JSON.stringify(outputFormat.example.output, null, 2))}</pre>
          </div>`
    : '';

  return `
        <!-- Output Format -->
        <section class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Output Format</h2>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            ${escapeHtml(outputFormat.description)}
          </p>
          ${structureHtml ? `
          <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div class="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Structure</h3>
            </div>
            <div class="px-4">
            ${structureHtml}
            </div>
          </div>
          ` : ''}
          ${exampleHtml}
        </section>`;
}

// Generate code walkthrough section HTML from parsed markdown
function generateCodeWalkthroughSection(walkthrough) {
  if (!walkthrough || walkthrough.length === 0) return '';

  const walkthroughHtml = walkthrough.map(item => `
          <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h4 class="text-md font-semibold text-gray-900 dark:text-white mb-2">${escapeHtml(item.section)}</h4>
            ${item.code ? `
            <div class="bg-gray-100 dark:bg-gray-800 rounded p-3 mb-3 overflow-x-auto">
              <pre v-pre class="text-sm font-mono text-gray-800 dark:text-gray-200">${escapeHtml(item.code)}</pre>
            </div>
            ` : ''}
            ${item.explanation ? `
            <p class="text-sm text-gray-600 dark:text-gray-400">${escapeHtml(item.explanation)}</p>
            ` : ''}
          </div>`).join('\n');

  return `
        <!-- Code Walkthrough -->
        <section class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">How the Code Works</h2>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            This section explains how the parsing rules map to the format semantics.
          </p>
          <div class="space-y-4">
            ${walkthroughHtml}
          </div>
        </section>`;
}

// Generate Vue component from template
function generateVueComponent(example, rustCode, rubyCode, codeWalkthrough, hasDiagram, exampleId) {
  const { title, description, category, concepts, difficulty, motivation, inputFormat, outputFormat } = example;

  const hasRust = !!rustCode;
  const hasRuby = !!rubyCode;

  const placeholderRust = hasRust ? '' : `// Rust implementation not available for this example`;
  const placeholderRuby = hasRuby ? '' : `# Ruby implementation not available for this example`;

  const displayRust = hasRust ? rustCode : placeholderRust;
  const displayRuby = hasRuby ? rubyCode : placeholderRuby;

  // Difficulty badge color
  const difficultyColors = {
    'beginner': 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300',
    'intermediate': 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300',
    'advanced': 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300',
  };
  const difficultyColor = difficultyColors[difficulty] || difficultyColors['intermediate'];

  // Category badge color
  const categoryColors = {
    'expression-parsers': 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300',
    'data-formats': 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300',
    'urls-network': 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300',
    'code-template': 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300',
    'text-processing': 'bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300',
    'error-handling': 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300',
    'conceptual': 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300',
  };
  const categoryColor = categoryColors[category] || 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300';

  // CodeTabs props
  const codeTabsProps = [];
  if (hasRust) {
    codeTabsProps.push(':rust="sourceRust"');
  }
  if (hasRuby) {
    codeTabsProps.push(':ruby="sourceRuby"');
  }

  // Generate sections
  const motivationSection = generateMotivationSection(motivation);
  const inputSection = generateInputFormatSection(inputFormat);
  const outputSection = generateOutputFormatSection(outputFormat);
  const walkthroughSection = generateCodeWalkthroughSection(codeWalkthrough);

  return `<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="flex gap-12">
      <div class="w-64 flex-shrink-0 hidden lg:block">
        <div class="sticky top-20 h-[calc(100vh-6rem)] overflow-y-auto">
          <DocsNav :show-sections="['examples']" />
        </div>
      </div>

      <div class="flex-1 min-w-0">
        <router-link to="/examples" class="text-primary-600 dark:text-primary-400 hover:text-primary-700 mb-4 inline-flex items-center">
          <Icon name="chevron-right" class="w-4 h-4 rotate-180 mr-1" />
          Back to Examples
        </router-link>

        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">${title}</h1>

        <div class="flex flex-wrap gap-2 mb-8">
          ${hasRust ? '<span class="px-3 py-1 text-sm font-medium rounded-full bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300">Rust</span>' : ''}
          ${hasRuby ? '<span class="px-3 py-1 text-sm font-medium rounded-full bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300">Ruby</span>' : ''}
          <span class="px-3 py-1 text-sm font-medium rounded-full ${categoryColor}">${category}</span>
          <span class="px-3 py-1 text-sm font-medium rounded-full ${difficultyColor}">${difficulty}</span>
        </div>

        <!-- Overview -->
        <section class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Overview</h2>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            ${description}
          </p>
          ${concepts && concepts.length > 0 ? `
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Key Concepts</h3>
          <ul class="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
            ${concepts.map(c => `<li>${c}</li>`).join('\n            ')}
          </ul>
          ` : ''}
        </section>

        ${motivationSection}
        ${inputSection}
        ${outputSection}

        ${hasDiagram ? `
        <!-- Diagram -->
        <section class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Visual Overview</h2>
          <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
            <img src="/diagrams/examples/${exampleId}.svg" alt="${title} diagram" class="w-full max-w-2xl mx-auto" />
          </div>
        </section>
        ` : ''}

        ${walkthroughSection}

        <!-- Source Code -->
        <section class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Source Code</h2>
          <CodeTabs ${codeTabsProps.join(' ')} />
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from '../../components/atoms/Icon.vue'
import CodeTabs from '../../components/molecules/CodeTabs.vue'
import DocsNav from '../../components/organisms/DocsNav.vue'
${hasRust ? `
const sourceRust = \`${escapeForVue(displayRust)}\`
` : ''}${hasRuby ? `
const sourceRuby = \`${escapeForVue(displayRuby)}\`
` : ''}
</script>
`;
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

// Generate Vue component for Ruby-only example
function generateRubyOnlyVueComponent(exampleId, rubyCode, codeWalkthrough) {
  // Read metadata from example.json
  const metadataPath = path.join(RUBY_EXAMPLES_DIR, exampleId, 'example.json');
  let metadata = {
    title: toPascalCase(exampleId),
    description: 'Ruby-only example demonstrating Parslet-specific features.',
    category: 'conceptual',
    tags: ['ruby', 'parslet'],
    difficulty: 'intermediate',
    concepts: [],
    motivation: { why: 'Demonstrates Parslet-specific features.', useCases: [] }
  };

  if (fs.existsSync(metadataPath)) {
    try {
      metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
    } catch (e) {
      console.log(`Warning: Could not parse ${metadataPath}: ${e.message}`);
    }
  }

  const { title, description, category, concepts, difficulty, motivation } = metadata;

  // Difficulty badge color
  const difficultyColors = {
    'beginner': 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300',
    'intermediate': 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300',
    'advanced': 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300',
  };
  const difficultyColor = difficultyColors[difficulty] || difficultyColors['intermediate'];

  // Generate sections
  const motivationSection = motivation ? `
        <!-- Why This Example? -->
        <section class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Why This Example?</h2>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            ${escapeHtml(motivation.why)}
          </p>
          ${motivation.useCases && motivation.useCases.length > 0 ? `
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Use Cases</h3>
          <ul class="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
            ${motivation.useCases.map(uc => `<li>${escapeHtml(uc)}</li>`).join('\n            ')}
          </ul>
          ` : ''}
        </section>` : '';

  const walkthroughSection = codeWalkthrough && codeWalkthrough.length > 0 ? `
        <!-- Code Walkthrough -->
        <section class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">How the Code Works</h2>
          <div class="space-y-4">
            ${codeWalkthrough.map(item => `
          <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h4 class="text-md font-semibold text-gray-900 dark:text-white mb-2">${escapeHtml(item.section)}</h4>
            ${item.code ? `
            <div class="bg-gray-100 dark:bg-gray-800 rounded p-3 mb-3 overflow-x-auto">
              <pre v-pre class="text-sm font-mono text-gray-800 dark:text-gray-200">${escapeHtml(item.code)}</pre>
            </div>
            ` : ''}
            ${item.explanation ? `
            <p class="text-sm text-gray-600 dark:text-gray-400">${escapeHtml(item.explanation)}</p>
            ` : ''}
          </div>`).join('\n')}
          </div>
        </section>` : '';

  return `<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="flex gap-12">
      <div class="w-64 flex-shrink-0 hidden lg:block">
        <div class="sticky top-20 h-[calc(100vh-6rem)] overflow-y-auto">
          <DocsNav :show-sections="['examples']" />
        </div>
      </div>

      <div class="flex-1 min-w-0">
        <router-link to="/examples" class="text-primary-600 dark:text-primary-400 hover:text-primary-700 mb-4 inline-flex items-center">
          <Icon name="chevron-right" class="w-4 h-4 rotate-180 mr-1" />
          Back to Examples
        </router-link>

        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">${title}</h1>

        <div class="flex flex-wrap gap-2 mb-8">
          <span class="px-3 py-1 text-sm font-medium rounded-full bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300">Ruby Only</span>
          <span class="px-3 py-1 text-sm font-medium rounded-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300">Parslet Feature</span>
          <span class="px-3 py-1 text-sm font-medium rounded-full ${difficultyColor}">${difficulty}</span>
        </div>

        <!-- Ruby-only notice -->
        <div class="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 mb-8">
          <div class="flex items-start gap-3">
            <Icon name="info" class="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 class="text-sm font-medium text-purple-800 dark:text-purple-200">Ruby-Only Feature</h3>
              <p class="text-sm text-purple-700 dark:text-purple-300 mt-1">
                This example demonstrates a Parslet-specific feature that has no direct Rust equivalent.
                It uses the Parslet compatibility layer in parsanol-ruby.
              </p>
            </div>
          </div>
        </div>

        <!-- Overview -->
        <section class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Overview</h2>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            ${description}
          </p>
          ${concepts && concepts.length > 0 ? `
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Key Concepts</h3>
          <ul class="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
            ${concepts.map(c => `<li>${c}</li>`).join('\n            ')}
          </ul>
          ` : ''}
        </section>

        ${motivationSection}
        ${walkthroughSection}

        <!-- Source Code -->
        <section class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Source Code</h2>
          <CodeTabs :ruby="sourceRuby" />
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from '../../components/atoms/Icon.vue'
import CodeTabs from '../../components/molecules/CodeTabs.vue'
import DocsNav from '../../components/organisms/DocsNav.vue'

const sourceRuby = \`${escapeForVue(rubyCode)}\`
</script>
`;
}

// Main function
function main() {
  console.log('Generating example documentation pages...\n');
  console.log('Reading from:', RUST_EXAMPLES_DIR);
  console.log('');

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Scan for examples
  const examples = scanExamples();
  console.log(`Found ${examples.length} examples with example.json\n`);

  const examplesManifest = [];
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

    // Parse code walkthrough from .md file
    let codeWalkthrough = [];
    if (rustFile && rustFile.mdPath) {
      const mdContent = readFile(rustFile.mdPath);
      if (mdContent) {
        codeWalkthrough = parseCodeWalkthrough(mdContent);
      }
    }

    const componentName = toPascalCase(id) + 'Example';

    // Copy diagram if available (before generating component)
    const hasDiagram = copyDiagram(id);

    // Generate Vue component
    const vueCode = generateVueComponent(metadata, rustCode, rubyCode, codeWalkthrough, hasDiagram, id);
    const outputPath = path.join(OUTPUT_DIR, `${componentName}.vue`);

    fs.writeFileSync(outputPath, vueCode);

    // Status indicators
    const status = hasRust && hasRuby ? '✓' : (hasRust ? '◐' : '◑');
    const diagramStatus = hasDiagram ? '📄' : '';
    const walkthroughStatus = codeWalkthrough.length > 0 ? '📝' : '';
    console.log(`${status} Generated: ${componentName}.vue (Rust: ${hasRust ? 'Y' : 'n'}, Ruby: ${hasRuby ? 'Y' : 'n'}) ${diagramStatus}${walkthroughStatus}`);

    // Add to manifest
    examplesManifest.push({
      path: `/examples/${toKebabCase(id)}`,
      name: componentName,
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

    const componentName = toPascalCase(id) + 'Example';

    // Generate Vue component for Ruby-only example
    const vueCode = generateRubyOnlyVueComponent(id, rubyCode, codeWalkthrough);
    const outputPath = path.join(OUTPUT_DIR, `${componentName}.vue`);

    fs.writeFileSync(outputPath, vueCode);

    // Get metadata for the manifest
    const rubyOnlyMetadata = {
      'capture': { title: 'Capture DSL', description: 'Parslet capture DSL for variable binding', category: 'conceptual', difficulty: 'intermediate' },
      'scopes': { title: 'Scope DSL', description: 'Parslet scope DSL for context management', category: 'conceptual', difficulty: 'intermediate' },
      'local': { title: 'Local Variable Parsing', description: 'Non-greedy parsing with local bindings', category: 'conceptual', difficulty: 'intermediate' },
      'empty': { title: 'Empty Rule Stub', description: 'Empty rule pattern for prototyping', category: 'conceptual', difficulty: 'beginner' },
      'mathn': { title: 'Mathn Compatibility', description: 'Ruby mathn library compatibility', category: 'conceptual', difficulty: 'beginner' },
      'seasons': { title: 'Transform Patterns', description: 'Transform DSL patterns demonstration', category: 'conceptual', difficulty: 'intermediate' },
    };

    const metadata = rubyOnlyMetadata[id] || { title: id, description: '', category: 'conceptual', difficulty: 'intermediate' };

    console.log(`◆ Generated: ${componentName}.vue (Ruby-only: Y)`);

    // Add to manifest
    examplesManifest.push({
      path: `/examples/${toKebabCase(id)}`,
      name: componentName,
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
