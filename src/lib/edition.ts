// The envelope's `edition` is always 2 (named trees + spans — edition 1 was
// removed, parsanol-ruby 1.3.128 / parsanol-rs 0.20.1): the loaders accept
// the integer 2, the quoted "v2" (kept for artifacts baked before the
// numeric surface), and a missing field — everything else is rejected with
// the recompile instruction. Mirrors the loaders' EDITION_ALIASES /
// normalize_edition.
export function editionLabel(value: unknown): 'v2' | 'unsupported' {
  return value === 2 || value === 'v2' || value === '2' || value === undefined || value === null ? 'v2' : 'unsupported'
}
