import type { CustomTerm, RawDetection } from './types'

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function buildTermPattern(term: CustomTerm): RegExp {
  const escaped = escapeRegex(term.value)
  const prefix = /^\w/.test(term.value) ? '(?<!\\w)' : ''
  const suffix = /\w$/.test(term.value) ? '(?!\\w)' : ''
  const flags = term.caseSensitive ? 'g' : 'gi'
  return new RegExp(prefix + escaped + suffix, flags)
}

export function detectCustomTerms(
  text: string,
  customTerms: CustomTerm[],
): RawDetection[] {
  if (!text || customTerms.length === 0) return []

  const out: RawDetection[] = []
  for (const term of customTerms) {
    if (!term.value || term.value.length === 0) continue
    const pattern = buildTermPattern(term)
    let match: RegExpExecArray | null
    while ((match = pattern.exec(text)) !== null) {
      if (match[0].length === 0) {
        pattern.lastIndex++
        continue
      }
      out.push({
        value: match[0],
        type: term.type,
        start: match.index,
        end: match.index + match[0].length,
        confidence: 'high',
        source: 'custom',
      })
    }
  }
  return out
}
