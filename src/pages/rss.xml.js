import news from '../data/news-manifest.json'

function escapeXml(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
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
    </item>`
    )
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
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
