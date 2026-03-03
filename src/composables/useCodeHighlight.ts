import Prism from 'prismjs'
import 'prismjs/components/prism-rust'
import 'prismjs/components/prism-ruby'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-typescript'

export function useCodeHighlight() {
  const highlightCode = (code: string, lang: string): string => {
    const grammar = Prism.languages[lang]
    if (!grammar) {
      return escapeHtml(code)
    }
    return Prism.highlight(code, grammar, lang)
  }

  const escapeHtml = (text: string): string => {
    const div = document.createElement('div')
    div.textContent = text
    return div.innerHTML
  }

  return {
    highlightCode,
  }
}
