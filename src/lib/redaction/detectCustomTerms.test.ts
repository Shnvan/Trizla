import { describe, expect, it } from 'vitest'
import { detectCustomTerms } from './detectCustomTerms'
import { detectSensitiveInfo } from './detectSensitiveInfo'
import { restoreText } from './restoreText'
import { sanitizeText } from './sanitizeText'
import type { CustomTerm } from './types'

function term(partial: Partial<CustomTerm> & Pick<CustomTerm, 'value'>): CustomTerm {
  return {
    id: partial.id ?? `term-${partial.value}`,
    value: partial.value,
    type: partial.type ?? 'CUSTOM',
    caseSensitive: partial.caseSensitive ?? false,
  }
}

describe('detectCustomTerms', () => {
  it('detects a custom company term', () => {
    const r = detectCustomTerms('Acme Corp is the client.', [
      term({ value: 'Acme Corp', type: 'COMPANY' }),
    ])
    expect(r).toHaveLength(1)
    expect(r[0].type).toBe('COMPANY')
    expect(r[0].source).toBe('custom')
    expect(r[0].start).toBe(0)
    expect(r[0].end).toBe('Acme Corp'.length)
  })

  it('matches case-insensitively by default', () => {
    const r = detectCustomTerms('acme corp and ACME CORP are the same.', [
      term({ value: 'Acme Corp', type: 'COMPANY' }),
    ])
    expect(r).toHaveLength(2)
  })

  it('stores the actual matched text for case-insensitive matches', () => {
    const r = detectCustomTerms('ACME CORP signed today.', [
      term({ value: 'Acme Corp', type: 'COMPANY' }),
    ])
    expect(r).toHaveLength(1)
    expect(r[0].value).toBe('ACME CORP')
  })

  it('respects case-sensitive flag', () => {
    const r = detectCustomTerms('acme corp and Acme Corp differ.', [
      term({ value: 'Acme Corp', type: 'COMPANY', caseSensitive: true }),
    ])
    expect(r).toHaveLength(1)
    expect(r[0].start).toBe('acme corp and '.length)
  })

  it('escapes regex-special characters in the term', () => {
    const r = detectCustomTerms('Client: Acme (PH) signed today.', [
      term({ value: 'Acme (PH)', type: 'COMPANY' }),
    ])
    expect(r).toHaveLength(1)
    expect(r[0].end - r[0].start).toBe('Acme (PH)'.length)
  })

  it('avoids partial word matches when the term has word-character edges', () => {
    const r = detectCustomTerms('I like pineapple, not apple pie.', [
      term({ value: 'apple', type: 'CUSTOM' }),
    ])
    expect(r).toHaveLength(1)
    expect(r[0].start).toBe('I like pineapple, not '.length)
  })

  it('handles multiple terms across the same text', () => {
    const r = detectCustomTerms('John Smith works for Acme Corp.', [
      term({ value: 'John Smith', type: 'PERSON' }),
      term({ value: 'Acme Corp', type: 'COMPANY' }),
    ])
    const values = r.map((d) => d.value).sort()
    expect(values).toEqual(['Acme Corp', 'John Smith'])
  })

  it('skips empty values and empty input safely', () => {
    expect(detectCustomTerms('', [term({ value: 'x' })])).toEqual([])
    expect(detectCustomTerms('hello', [term({ value: '' })])).toEqual([])
    expect(detectCustomTerms('hello', [])).toEqual([])
  })
})

describe('detectSensitiveInfo with custom terms', () => {
  it('maps duplicate custom-term occurrences to one placeholder', () => {
    const text = 'John Smith met John Smith again at the John Smith summit.'
    const detections = detectSensitiveInfo(text, [
      term({ value: 'John Smith', type: 'PERSON' }),
    ])
    const persons = detections.filter((d) => d.type === 'PERSON')
    expect(persons).toHaveLength(1)
    expect(persons[0].occurrences).toHaveLength(3)
    expect(persons[0].placeholder).toBe('[PERSON_1]')
    expect(persons[0].source).toBe('custom')
  })

  it('round-trips through sanitize and restore with custom terms', () => {
    const text =
      'John Smith from Acme Corp emailed maria@example.com about the rollout.'
    const customTerms: CustomTerm[] = [
      term({ value: 'John Smith', type: 'PERSON' }),
      term({ value: 'Acme Corp', type: 'COMPANY' }),
    ]
    const detections = detectSensitiveInfo(text, customTerms)
    const sanitized = sanitizeText(text, detections)
    expect(sanitized).not.toContain('John Smith')
    expect(sanitized).not.toContain('Acme Corp')
    expect(sanitized).not.toContain('maria@example.com')
    const restored = restoreText(sanitized, detections)
    expect(restored).toBe(text)
  })

  it('round-trips uppercase source casing for case-insensitive custom terms', () => {
    const text = 'ACME CORP signed today.'
    const detections = detectSensitiveInfo(text, [
      term({ value: 'Acme Corp', type: 'COMPANY' }),
    ])
    const sanitized = sanitizeText(text, detections)
    expect(sanitized).toBe('[COMPANY_1] signed today.')
    expect(restoreText(sanitized, detections)).toBe(text)
  })

  it('preserves separate case variants through sanitize and restore', () => {
    const text = 'Acme Corp met ACME CORP.'
    const detections = detectSensitiveInfo(text, [
      term({ value: 'Acme Corp', type: 'COMPANY' }),
    ])
    const sanitized = sanitizeText(text, detections)
    expect(sanitized).toBe('[COMPANY_1] met [COMPANY_2].')
    expect(restoreText(sanitized, detections)).toBe(text)
  })
})
