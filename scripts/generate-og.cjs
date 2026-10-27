#!/usr/bin/env node
/**
 * Generate per-page OG social cards.
 *
 * Walks every dist/** index.html, reads each page's og:title/og:description,
 * renders a 1200x630 card with satori + resvg into dist/og/<path>.png,
 * and rewrites the page's og:image meta to point at the card.
 *
 * Runs after `astro build` and before `pagefind` (search doesn't index
 * meta, but the rewrite must land in the final HTML).
 */

const fs = require('fs')
const path = require('path')
// satori is ESM-only; Node's require(esm) yields the namespace object
const satori = require('satori').default ?? require('satori')
const { Resvg } = require('@resvg/resvg-js')

const DIST = path.join(__dirname, '..', 'dist')
const W = 1200
const H = 630

function* htmlFiles(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) yield* htmlFiles(p)
    else if (e.name === 'index.html') yield p
  }
}

const fonts = [
  { name: 'Inter', data: fs.readFileSync(path.join(__dirname, '..', 'src/assets/og-fonts/Inter-Regular.ttf')), weight: 400, style: 'normal' },
  { name: 'Inter', data: fs.readFileSync(path.join(__dirname, '..', 'src/assets/og-fonts/Inter-Bold.ttf')), weight: 700, style: 'normal' },
]

function truncate(text, max) {
  if (!text) return ''
  return text.length <= max ? text : text.slice(0, max - 1).replace(/\s+\S*$/, '') + '…'
}

function meta(html, prop) {
  const m = html.match(new RegExp(`<meta property="${prop}" content="([^"]*)"`))
  return m ? m[1].replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"') : ''
}

function card({ siteTitle, title, description, sitePath }) {
  const div = (style, children, extra = {}) => ({
    type: 'div',
    props: { style, children, ...extra },
  })
  const rows = [
    div(
      { width: '14px', height: '48px', background: '#4b6cc1', borderRadius: '4px', display: 'flex' }
    ),
    div({ fontSize: '34px', fontWeight: 700, letterSpacing: '0.02em', color: '#a3bce3', display: 'flex' }, siteTitle),
  ]
  const middle = [
    div({ fontSize: title.length > 60 ? 58 : 68, fontWeight: 700, lineHeight: 1.15, display: 'flex', flexDirection: 'column' }, truncate(title, 120)),
  ]
  if (description) {
    middle.push(div({ fontSize: '30px', lineHeight: 1.4, color: '#9ca3af', display: 'flex', flexDirection: 'column' }, truncate(description, 180)))
  }
  const foot = [
    div({ display: 'flex' }, 'parsanol.org'),
  ]
  if (sitePath && sitePath !== '/') {
    foot.push(div({ display: 'flex', color: '#7a9bd4' }, sitePath))
  }
  return div(
    {
      width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
      justifyContent: 'space-between', padding: '72px',
      boxSizing: 'border-box',
      background: 'linear-gradient(135deg, #101827 0%, #1d2b4f 100%)',
      fontFamily: 'Inter', color: '#ffffff',
    },
    [
      div({ display: 'flex', alignItems: 'center', gap: '18px' }, rows),
      div({ display: 'flex', flexDirection: 'column', gap: '28px' }, middle),
      div({ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#9ca3af', fontSize: '26px' }, foot),
    ]
  )
}

async function main() {
  let count = 0
  for (const file of htmlFiles(DIST)) {
    const html = fs.readFileSync(file, 'utf8')
    // og:title carries a " — Parsanol" suffix that the card's brand mark already shows
    const title = meta(html, 'og:title').replace(/ — Parsanol$/, '')
    const description = meta(html, 'og:description')
    const sitePath = file.slice(DIST.length, -'index.html'.length) || '/'

    const svg = await satori(card({ siteTitle: 'Parsanol', title, description, sitePath }), {
      width: W, height: H, fonts,
    })
    const png = new Resvg(svg, { fitTo: { mode: 'width', value: W } }).render().asPng()

    const rel = sitePath === '/' ? 'index' : sitePath.replace(/^\/+|\/+$/g, '')
    // Flat file per page: /og/<path>.png — og:image must be the file URL itself
    const outDir = path.join(DIST, 'og', path.posix.dirname(rel === 'index' ? 'index' : rel))
    fs.mkdirSync(outDir, { recursive: true })
    fs.writeFileSync(path.join(outDir, `${path.posix.basename(rel)}.png`), png)

    const ogUrl = `https://www.parsanol.org/og/${rel}.png`
    const updated = html.replace(
      /(<meta property="og:image" content=")[^"]*(")/,
      `$1${ogUrl}$2`
    )
    if (updated !== html) fs.writeFileSync(file, updated)
    count++
  }
  console.log(`✓ Generated ${count} OG cards into dist/og/`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
