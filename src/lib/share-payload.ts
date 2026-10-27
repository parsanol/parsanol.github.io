// The playground share-link payload: `{ d: demoId, i: input }` as
// base64url, gzip-compressed (the `z` prefix) when the browser has
// CompressionStream. Shared by the playground island and the
// example-page live demos so both sides speak one hash format.

export function toBase64Url(bytes: Uint8Array): string {
  let binary = ''
  bytes.forEach((byte) => (binary += String.fromCharCode(byte)))
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export function fromBase64Url(text: string): Uint8Array<ArrayBuffer> {
  const padded = text.replace(/-/g, '+').replace(/_/g, '/')
  const binary = atob(padded + '='.repeat((4 - (padded.length % 4)) % 4))
  return Uint8Array.from(binary, (char) => char.charCodeAt(0))
}

export async function encodeSharePayload(payload: unknown): Promise<string> {
  const json = JSON.stringify(payload)
  const bytes = new TextEncoder().encode(json)
  if ('CompressionStream' in window) {
    const stream = new Blob([bytes]).stream().pipeThrough(new CompressionStream('gzip'))
    return 'z' + toBase64Url(new Uint8Array(await new Response(stream).arrayBuffer()))
  }
  return 'p' + toBase64Url(bytes)
}

export async function decodeSharePayload(token: string): Promise<string | null> {
  try {
    const compressed = token.startsWith('z')
    const bytes = fromBase64Url(token.slice(1))
    if (!compressed) return new TextDecoder().decode(bytes)
    const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))
    return new TextDecoder().decode(await new Response(stream).arrayBuffer())
  } catch {
    return null
  }
}
