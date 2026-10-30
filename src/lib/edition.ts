// The envelope's `edition` has shipped as the integer 1|2 (canonical since
// parsanol 1.3.113) and as the legacy quoted spellings; absent means 1.
// Mirrors the loaders' EDITION_ALIASES / normalize_edition.
export function editionLabel(value: unknown): 'v1' | 'v2' {
  return value === 2 || value === 'v2' || value === '2' ? 'v2' : 'v1'
}
