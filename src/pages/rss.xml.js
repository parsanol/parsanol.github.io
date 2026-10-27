import { marked } from 'marked'
import news from '../data/news-manifest.json'

function escapeXml(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

// Same block rendering as the news page, so feed readers see the full post
function renderBlocks(blocks) {
  if (!Array.isArray(blocks)) return ''
  return blocks
    .map((block) => {
      if (block.type === 'paragraph') return marked.parse(block.text, { async: false })
      if (block.type === 'heading') return `<h2>${marked.parseInline(block.text, { async: false })}</h2>`
      if (block.type === 'list') {
        return `<ul>${block.items.map((item) => `<li>${marked.parseInline(item, { async: false })}</li>`).join('')}</ul>`
      }
      if (block.type === 'code') {
        return `<pre><code>${escapeXml(block.text)}</code></pre>`
      }
      if (block.type === 'table') {
        const head = `<thead><tr>${block.headers.map((h) => `<th>${marked.parseInline(h, { async: false })}</th>`).join('')}</tr></thead>`
        const rows = `<tbody>${block.rows
          .map((row) => `<tr>${row.map((cell) => `<td>${marked.parseInline(cell, { async: false })}</td>`).join('')}</tr>`)
          .join('')}</tbody>`
        return `<table>${head}${rows}</table>`
      }
      return ''
    })
    .join('\n')
}

export function GET({ site }) {
  const sorted = news.slice().sort((a, b) => (a.date < b.date ? 1 : -1))
  const items = sorted
    .map(
      (p) => `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${site}news/${p.id}/</link>
      <guid isPermaLink="true">${site}news/${p.id}/</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description>${escapeXml(p.summary)}</description>
      <content:encoded><![CDATA[${renderBlocks(p.content ?? []).replace(/\]\]>/g, ']]]]><![CDATA[>')}]]></content:encoded>
    </item>`
    )
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Parsanol News</title>
    <link>${site}</link>
    <atom:link href="${site}rss.xml" rel="self" type="application/rss+xml" />
    <description>${escapeXml('Parsanol release notes and announcements: runtime releases, engine news, and PARG updates.')}</description>
    <language>en</language>
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  })
}
