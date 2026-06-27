import { describe, expect, it } from 'vitest'
import { detectSensitiveInfo } from './detectSensitiveInfo'
import { sanitizeText } from './sanitizeText'
import type { Detection } from './types'

function makeDetection(partial: Partial<Detection> & Pick<Detection, 'value' | 'placeholder' | 'occurrences'>): Detection {
  return {
    id: partial.id ?? 'det-test',
    value: partial.value,
    type: partial.type ?? 'CUSTOM',
    placeholder: partial.placeholder,
    confidence: partial.confidence ?? 'high',
    source: partial.source ?? 'regex',
    enabled: partial.enabled ?? true,
    occurrences: partial.occurrences,
  }
}

describe('sanitizeText', () => {
  it('returns original text when there are no detections', () => {
    expect(sanitizeText('Hello world', [])).toBe('Hello world')
  })

  it('returns original text when text is empty', () => {
    expect(sanitizeText('', [{ ...makeDetection({ value: 'x', placeholder: '[X_1]', occurrences: [{ start: 0, end: 1 }] }) }])).toBe('')
  })

  it('replaces a single enabled detection', () => {
    const text = 'Email maria@example.com please.'
    const detection = makeDetection({
      value: 'maria@example.com',
      type: 'EMAIL',
      placeholder: '[EMAIL_1]',
      occurrences: [{ start: 6, end: 6 + 'maria@example.com'.length }],
    })
    expect(sanitizeText(text, [detection])).toBe('Email [EMAIL_1] please.')
  })

  it('replaces duplicate occurrences with the same placeholder', () => {
    const text = 'Email maria@example.com and again maria@example.com later.'
    const value = 'maria@example.com'
    const first = text.indexOf(value)
    const second = text.indexOf(value, first + 1)
    const detection = makeDetection({
      value,
      type: 'EMAIL',
      placeholder: '[EMAIL_1]',
      occurrences: [
        { start: first, end: first + value.length },
        { start: second, end: second + value.length },
      ],
    })
    expect(sanitizeText(text, [detection])).toBe(
      'Email [EMAIL_1] and again [EMAIL_1] later.',
    )
  })

  it('leaves disabled detections unchanged', () => {
    const text = 'Email maria@example.com please.'
    const detection = makeDetection({
      value: 'maria@example.com',
      type: 'EMAIL',
      placeholder: '[EMAIL_1]',
      enabled: false,
      occurrences: [{ start: 6, end: 6 + 'maria@example.com'.length }],
    })
    expect(sanitizeText(text, [detection])).toBe(text)
  })

  it('preserves line breaks and bullet formatting', () => {
    const text =
      '- Name: maria@example.com\n- Phone: +1 415 555 0132\n- Notes: follow up.'
    const detections = detectSensitiveInfo(text)
    const result = sanitizeText(text, detections)
    expect(result).toContain('\n')
    expect(result.split('\n')).toHaveLength(3)
    expect(result).toContain('- Name: ')
    expect(result).toContain('- Phone: ')
    expect(result).toContain('- Notes: follow up.')
    expect(result).not.toContain('maria@example.com')
    expect(result).not.toContain('555 0132')
  })

  it('replaces multiple non-overlapping ranges without index drift', () => {
    const text = 'A=alpha B=beta C=gamma'
    const detections: Detection[] = [
      makeDetection({
        id: 'a',
        value: 'alpha',
        placeholder: '[X_LONG_PLACEHOLDER_1]',
        occurrences: [{ start: 2, end: 7 }],
      }),
      makeDetection({
        id: 'b',
        value: 'beta',
        placeholder: '[Y_2]',
        occurrences: [{ start: 10, end: 14 }],
      }),
      makeDetection({
        id: 'c',
        value: 'gamma',
        placeholder: '[Z_VERY_LONG_3]',
        occurrences: [{ start: 17, end: 22 }],
      }),
    ]
    expect(sanitizeText(text, detections)).toBe(
      'A=[X_LONG_PLACEHOLDER_1] B=[Y_2] C=[Z_VERY_LONG_3]',
    )
  })

  it('handles disabled mixed with enabled detections', () => {
    const text = 'Email maria@example.com about $85,000 today.'
    const detections = detectSensitiveInfo(text)
    const moneyDetection = detections.find((d) => d.type === 'MONEY')!
    const withMoneyDisabled = detections.map((d) =>
      d.id === moneyDetection.id ? { ...d, enabled: false } : d,
    )
    const result = sanitizeText(text, withMoneyDisabled)
    expect(result).toContain('$85,000')
    expect(result).not.toContain('maria@example.com')
    expect(result).toContain('[EMAIL_1]')
  })

  it('ignores detections whose occurrences are out of bounds', () => {
    const text = 'short'
    const detection = makeDetection({
      value: 'x',
      placeholder: '[X_1]',
      occurrences: [{ start: 100, end: 105 }],
    })
    expect(sanitizeText(text, [detection])).toBe(text)
  })

  it('end-to-end sanitization produces stable placeholders', () => {
    const text =
      'Maria: maria@example.com / +1 415 555 0132 / $85,000 / maria@example.com'
    const detections = detectSensitiveInfo(text)
    const result = sanitizeText(text, detections)
    // The same email should map to a single placeholder used in both spots.
    const emailPlaceholder = detections.find((d) => d.type === 'EMAIL')!.placeholder
    const matches = result.split(emailPlaceholder).length - 1
    expect(matches).toBe(2)
    expect(result).not.toContain('maria@example.com')
  })
})
