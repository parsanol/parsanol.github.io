#!/usr/bin/env node

/**
 * News Manifest Generator
 *
 * Scans content/news directory for markdown files with YAML frontmatter
 * and generates a news-manifest.json for the website.
 *
 * Structure:
 * content/news/{id}.md
 *   - YAML frontmatter with: id, date, title, summary, tags, featured
 *   - Markdown body as content
 *
 * Run: node scripts/generate-news.cjs
 */

const fs = require('fs');
const path = require('path');

const NEWS_DIR = path.join(__dirname, '../content/news');
const OUTPUT_FILE = path.join(__dirname, '../src/data/news-manifest.json');

// Parse YAML frontmatter from markdown
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    return { meta: {}, body: content };
  }

  const frontmatter = match[1];
  const body = match[2];

  // Simple YAML parsing for basic types
  const meta = {};
  let currentKey = null;
  let currentArray = null;

  for (const line of frontmatter.split('\n')) {
    // Array items
    if (line.match(/^  - /)) {
      if (currentArray) {
        currentArray.push(line.slice(4).trim());
      }
      continue;
    }

    // Key: value
    const kvMatch = line.match(/^(\w+):\s*(.*)$/);
    if (kvMatch) {
      const key = kvMatch[1];
      let value = kvMatch[2].trim();

      // Handle arrays
      if (value === '[]' || value === '[') {
        currentArray = [];
        meta[key] = currentArray;
        currentKey = key;
        continue;
      }

      // Handle inline arrays [a, b, c]
      if (value.startsWith('[') && value.endsWith(']')) {
        const items = value.slice(1, -1).split(',').map(s => s.trim().replace(/['"]/g, ''));
        meta[key] = items;
        currentArray = null;
        continue;
      }

      // Handle quoted strings
      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }

      // Handle booleans
      if (value === 'true') value = true;
      else if (value === 'false') value = false;

      meta[key] = value;
      currentKey = key;
      currentArray = null;
    }
  }

  return { meta, body };
}

// Convert markdown body to content blocks
function parseBody(body) {
  const blocks = [];
  const lines = body.split('\n');
  let currentBlock = null;
  let inCodeBlock = false;
  let codeLang = '';
  let codeContent = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Code blocks
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        blocks.push({
          type: 'code',
          language: codeLang,
          text: codeContent.join('\n')
        });
        codeContent = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
        codeLang = line.slice(3).trim();
      }
      continue;
    }

    if (inCodeBlock) {
      codeContent.push(line);
      continue;
    }

    // Headings
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      blocks.push({
        type: 'heading',
        level: headingMatch[1].length,
        text: headingMatch[2]
      });
      continue;
    }

    // Tables
    if (line.startsWith('|')) {
      const tableLines = [];
      while (i < lines.length && lines[i].startsWith('|')) {
        tableLines.push(lines[i]);
        i++;
      }
      i--; // Back up one

      if (tableLines.length >= 2) {
        const headers = tableLines[0].split('|').slice(1, -1).map(h => h.trim());
        const rows = tableLines.slice(2).map(row =>
          row.split('|').slice(1, -1).map(cell => cell.trim())
        );
        blocks.push({ type: 'table', headers, rows });
      }
      continue;
    }

    // List items
    if (line.match(/^[-*]\s+/)) {
      const items = [];
      while (i < lines.length && lines[i].match(/^[-*]\s+/)) {
        items.push(lines[i].replace(/^[-*]\s+/, ''));
        i++;
      }
      i--; // Back up one
      blocks.push({ type: 'list', items });
      continue;
    }

    // Paragraphs
    if (line.trim()) {
      let paragraph = line;
      while (i + 1 < lines.length && lines[i + 1].trim() && !lines[i + 1].match(/^(#{1,6}|```|\||[-*])/)) {
        i++;
        paragraph += ' ' + lines[i];
      }
      blocks.push({ type: 'paragraph', text: paragraph.trim() });
    }
  }

  return blocks;
}

// Main function
function main() {
  console.log('Generating news manifest...\n');
  console.log(`Reading from: ${NEWS_DIR}`);

  if (!fs.existsSync(NEWS_DIR)) {
    console.error(`News directory not found: ${NEWS_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(NEWS_DIR).filter(f => f.endsWith('.md'));
  const posts = [];

  for (const file of files) {
    const filePath = path.join(NEWS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const { meta, body } = parseFrontmatter(content);

    if (!meta.id) {
      console.warn(`Skipping ${file}: missing id in frontmatter`);
      continue;
    }

    const post = {
      id: meta.id,
      date: meta.date || new Date().toISOString().split('T')[0],
      title: meta.title || meta.id,
      summary: meta.summary || '',
      tags: meta.tags || [],
      featured: meta.featured || false,
      content: parseBody(body)
    };

    posts.push(post);
    console.log(`✓ ${file} -> ${meta.id}`);
  }

  // Sort by date descending
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Ensure featured is only on the first post
  let featuredSet = false;
  for (const post of posts) {
    if (post.featured && !featuredSet) {
      featuredSet = true;
    } else {
      post.featured = false;
    }
  }

  // Write manifest
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(posts, null, 2));
  console.log(`\n✓ Generated ${posts.length} posts -> ${OUTPUT_FILE}`);
}

main();
