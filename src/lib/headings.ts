const slugify = (text: string): string =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 64) || 'section'

export interface Heading {
  level: 2 | 3
  id: string
  text: string
}

// The baked docs HTML has untyped h2/h3 without ids; give each a stable slug.
export function withHeadingIds(html: string): string {
  const seen = new Map<string, number>()
  return html.replace(/<h([23])(\s[^>]*)?>([\s\S]*?)<\/h\1>/g, (match, level, attrs, inner) => {
    const text = inner.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
    let slug = slugify(text)
    const n = (seen.get(slug) ?? 0) + 1
    seen.set(slug, n)
    if (n > 1) slug = `${slug}-${n}`
    return `<h${level}${attrs ?? ''} id="${slug}">${inner}</h${level}>`
  })
}

// Read headings (with the ids assigned above) back out of processed HTML.
export function extractHeadings(html: string): Heading[] {
  const out: Heading[] = []
  const re = /<h([23])[^>]*\sid="([^"]+)"[^>]*>([\s\S]*?)<\/h\1>/g
  let m: RegExpExecArray | null
  while ((m = re.exec(html))) {
    out.push({
      level: Number(m[1]) as 2 | 3,
      id: m[2],
      text: m[3].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim(),
    })
  }
  return out
}
