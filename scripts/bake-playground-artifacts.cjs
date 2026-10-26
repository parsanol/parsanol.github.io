// Bake the playground artifacts from their PARG sources (site#36).
// The sources are the contract: content/playground/<name>.parg ->
// src/assets/playground/<name>.artifact.json, compiled with the
// published `parsanol` gem. CI runs this before the build and fails
// when a committed artifact drifts from its source (the freshness
// gate) or when a source has no committed artifact.
const { execFileSync } = require('node:child_process')
const { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } = require('node:fs')
const { tmpdir } = require('node:os')
const { join } = require('node:path')

const contentDir = join(__dirname, '..', 'content', 'playground')
const assetsDir = join(__dirname, '..', 'src', 'assets', 'playground')
const checkOnly = process.argv.includes('--check')

const sources = readdirSync(contentDir).filter((name) => name.endsWith('.parg'))
if (sources.length === 0) {
  console.error('no .parg sources in content/playground')
  process.exit(1)
}

let failed = false
for (const source of sources) {
  const name = source.replace(/\.parg$/, '')
  const artifactPath = join(assetsDir, `${name}.artifact.json`)
  // The CLI prints a summary line on stdout alongside the file it
  // writes, so bake to a temp file and read that.
  const scratch = mkdtempSync(join(tmpdir(), 'parg-bake-'))
  let baked
  try {
    execFileSync('parsanol', [
      'parg', 'compile', join(contentDir, source), '-o', join(scratch, 'artifact.json'),
    ], { encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 })
    baked = readFileSync(join(scratch, 'artifact.json'), 'utf8')
  } finally {
    rmSync(scratch, { recursive: true, force: true })
  }
  if (!existsSync(artifactPath)) {
    if (checkOnly) {
      console.error(`${name}: no committed artifact (run the bake without --check)`)
      failed = true
      continue
    }
    writeFileSync(artifactPath, baked)
    console.log(`${name}: baked`)
    continue
  }
  const committed = readFileSync(artifactPath, 'utf8')
  if (committed === baked) {
    console.log(`${name}: fresh`)
    continue
  }
  if (checkOnly) {
    console.error(`${name}: artifact is stale against its source — run scripts/bake-playground-artifacts.cjs and commit`)
    failed = true
    continue
  }
  writeFileSync(artifactPath, baked)
  console.log(`${name}: re-baked (was stale)`)
}

process.exit(failed ? 1 : 0)
