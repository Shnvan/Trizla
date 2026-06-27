import { describe, expect, it } from 'vitest'
import { detectSensitiveInfo } from './detectSensitiveInfo'
import { restoreText } from './restoreText'
import { sanitizeText } from './sanitizeText'
import type { Detection } from './types'

function makeDetection(
  partial: Partial<Detection> & Pick<Detection, 'value' | 'placeholder'>,
): Detection {
  return {
    id: partial.id ?? `det-${partial.placeholder}`,
    value: partial.value,
    type: partial.type ?? 'CUSTOM',
    placeholder: partial.placeholder,
    confidence: partial.confidence ?? 'high',
    source: partial.source ?? 'regex',
    enabled: partial.enabled ?? true,
    occurrences: partial.occurrences ?? [],
  }
}

describe('restoreText', () => {
  it('restores a single placeholder', () => {
    const detection = makeDetection({
      value: 'maria@example.com',
      type: 'EMAIL',
      placeholder: '[EMAIL_1]',
    })
    expect(restoreText('Contact [EMAIL_1] today.', [detection])).toBe(
      'Contact maria@example.com today.',
    )
  })

  it('restores repeated placeholders to the same value', () => {
    const detection = makeDetection({
      value: 'maria@example.com',
      type: 'EMAIL',
      placeholder: '[EMAIL_1]',
    })
    expect(
      restoreText('Try [EMAIL_1] first, then [EMAIL_1].', [detection]),
    ).toBe('Try maria@example.com first, then maria@example.com.')
  })

  it('restores multiple placeholder types', () => {
    const detections: Detection[] = [
      makeDetection({ value: 'maria@example.com', type: 'EMAIL', placeholder: '[EMAIL_1]' }),
      makeDetection({ value: '+1 415 555 0132', type: 'PHONE', placeholder: '[PHONE_1]' }),
      makeDetection({ value: '$85,000', type: 'MONEY', placeholder: '[MONEY_1]' }),
    ]
    const ai = 'Reach [EMAIL_1] or [PHONE_1] about the [MONEY_1] offer.'
    expect(restoreText(ai, detections)).toBe(
      'Reach maria@example.com or +1 415 555 0132 about the $85,000 offer.',
    )
  })

  it('leaves unknown placeholders unchanged', () => {
    const detection = makeDetection({
      value: 'maria@example.com',
      type: 'EMAIL',
      placeholder: '[EMAIL_1]',
    })
    expect(
      restoreText('Known [EMAIL_1] and unknown [EMAIL_99] and [FOO_1].', [detection]),
    ).toBe('Known maria@example.com and unknown [EMAIL_99] and [FOO_1].')
  })

  it('returns text unchanged when there are no detections', () => {
    expect(restoreText('Hello [EMAIL_1]', [])).toBe('Hello [EMAIL_1]')
  })

  it('returns text unchanged when AI text is empty', () => {
    const detection = makeDetection({
      value: 'maria@example.com',
      type: 'EMAIL',
      placeholder: '[EMAIL_1]',
    })
    expect(restoreText('', [detection])).toBe('')
  })

  it('disambiguates between [EMAIL_1] and [EMAIL_10]', () => {
    const detections: Detection[] = [
      makeDetection({ value: 'first@x.com', type: 'EMAIL', placeholder: '[EMAIL_1]' }),
      makeDetection({ value: 'tenth@x.com', type: 'EMAIL', placeholder: '[EMAIL_10]' }),
    ]
    expect(restoreText('[EMAIL_10] and [EMAIL_1]', detections)).toBe(
      'tenth@x.com and first@x.com',
    )
  })

  it('restores a placeholder belonging to a disabled detection', () => {
    const detection = makeDetection({
      value: 'maria@example.com',
      type: 'EMAIL',
      placeholder: '[EMAIL_1]',
      enabled: false,
    })
    expect(restoreText('Contact [EMAIL_1] today.', [detection])).toBe(
      'Contact maria@example.com today.',
    )
  })

  it('round-trips with sanitizeText through the full detection flow', () => {
    const text =
      'Maria: maria@example.com / +1 415 555 0132 / $85,000 / maria@example.com'
    const detections = detectSensitiveInfo(text)
    const sanitized = sanitizeText(text, detections)
    const restored = restoreText(sanitized, detections)
    expect(restored).toBe(text)
  })
})
