import type { RawDetection } from './types'

const EMAIL_RE = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g

const URL_RE = /\b(?:https?:\/\/|www\.)[^\s<>"')]+/gi

const PHONE_RE =
  /(?:\+\d{1,3}[\s.-]?)?(?:\(\d{2,4}\)[\s.-]?\d{2,4}[\s.-]?\d{2,4}(?:[\s.-]?\d{2,4})?|\d{2,4}[\s.-]\d{2,4}[\s.-]\d{2,4}(?:[\s.-]\d{2,4})?)/g

const MONEY_NUM = String.raw`(?:\d{1,3}(?:[,.\s]\d{3})+|\d+)(?:[.,]\d{1,2})?`
const MONEY_RE = new RegExp(
  `(?:[$€£¥₱]\\s?${MONEY_NUM}|\\b(?:USD|EUR|GBP|JPY|PHP|CAD|AUD)\\s?${MONEY_NUM}|${MONEY_NUM}\\s?(?:USD|EUR|GBP|JPY|PHP|CAD|AUD)\\b)`,
  'g',
)

const MONTH = '(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*'
const DATE_RE = new RegExp(
  [
    String.raw`\b\d{4}-\d{1,2}-\d{1,2}\b`,
    String.raw`\b\d{1,2}\/\d{1,2}\/\d{2,4}\b`,
    String.raw`\b${MONTH}\.?\s+\d{1,2}(?:st|nd|rd|th)?,?\s+\d{2,4}\b`,
    String.raw`\b\d{1,2}\s+${MONTH}\.?\s+\d{2,4}\b`,
  ].join('|'),
  'gi',
)

const ID_RE = /(?:\b[A-Z]{2,5}-?\d{3,}\b|#\d{4,}\b)/g

interface DetectorSpec {
  type: RawDetection['type']
  source: RawDetection['source']
  confidence: RawDetection['confidence']
  pattern: RegExp
}

const SPECS: DetectorSpec[] = [
  { type: 'EMAIL', source: 'regex', confidence: 'high', pattern: EMAIL_RE },
  { type: 'URL', source: 'regex', confidence: 'high', pattern: URL_RE },
  { type: 'PHONE', source: 'regex', confidence: 'medium', pattern: PHONE_RE },
  { type: 'MONEY', source: 'regex', confidence: 'high', pattern: MONEY_RE },
  { type: 'DATE', source: 'regex', confidence: 'medium', pattern: DATE_RE },
  { type: 'ID', source: 'regex', confidence: 'medium', pattern: ID_RE },
]

function runPattern(text: string, spec: DetectorSpec): RawDetection[] {
  const out: RawDetection[] = []
  const re = new RegExp(spec.pattern.source, spec.pattern.flags)
  let m: RegExpExecArray | null
  while ((m = re.exec(text)) !== null) {
    if (m[0].length === 0) {
      re.lastIndex++
      continue
    }
    const value = m[0]
    out.push({
      value,
      type: spec.type,
      start: m.index,
      end: m.index + value.length,
      confidence: spec.confidence,
      source: spec.source,
    })
  }
  return out
}

export function detectEmails(text: string): RawDetection[] {
  return runPattern(text, SPECS[0])
}

export function detectURLs(text: string): RawDetection[] {
  return runPattern(text, SPECS[1])
}

export function detectPhones(text: string): RawDetection[] {
  return runPattern(text, SPECS[2])
}

export function detectMoney(text: string): RawDetection[] {
  return runPattern(text, SPECS[3])
}

export function detectDates(text: string): RawDetection[] {
  return runPattern(text, SPECS[4])
}

export function detectIDs(text: string): RawDetection[] {
  return runPattern(text, SPECS[5])
}

export function runAllRegexDetectors(text: string): RawDetection[] {
  return SPECS.flatMap((spec) => runPattern(text, spec))
}
