import { describe, expect, it } from 'vitest'
import { createPlaceholderMap } from './createPlaceholderMap'
import { detectSensitiveInfo } from './detectSensitiveInfo'
import type { RawDetection } from './types'

describe('createPlaceholderMap', () => {
  it('assigns the same placeholder to duplicate value + type pairs', () => {
    const raws: RawDetection[] = [
      {
        value: 'maria@example.com',
        type: 'EMAIL',
        start: 0,
        end: 17,
        confidence: 'high',
        source: 'regex',
      },
      {
        value: 'maria@example.com',
        type: 'EMAIL',
        start: 40,
        end: 57,
        confidence: 'high',
        source: 'regex',
      },
    ]
    const detections = createPlaceholderMap(raws)
    expect(detections).toHaveLength(1)
    expect(detections[0].placeholder).toBe('[EMAIL_1]')
    expect(detections[0].occurrences).toHaveLength(2)
  })

  it('increments per entity type independently', () => {
    const raws: RawDetection[] = [
      {
        value: 'a@x.com',
        type: 'EMAIL',
        start: 0,
        end: 7,
        confidence: 'high',
        source: 'regex',
      },
      {
        value: 'b@x.com',
        type: 'EMAIL',
        start: 10,
        end: 17,
        confidence: 'high',
        source: 'regex',
      },
      {
        value: '$50',
        type: 'MONEY',
        start: 20,
        end: 23,
        confidence: 'high',
        source: 'regex',
      },
    ]
    const detections = createPlaceholderMap(raws)
    const map = Object.fromEntries(detections.map((d) => [d.value, d.placeholder]))
    expect(map['a@x.com']).toBe('[EMAIL_1]')
    expect(map['b@x.com']).toBe('[EMAIL_2]')
    expect(map['$50']).toBe('[MONEY_1]')
  })

  it('handles empty input', () => {
    expect(createPlaceholderMap([])).toEqual([])
  })

  it('groups duplicates from end-to-end detection flow', () => {
    const text =
      'Email maria@example.com first, then again maria@example.com later.'
    const detections = detectSensitiveInfo(text)
    const emails = detections.filter((d) => d.type === 'EMAIL')
    expect(emails).toHaveLength(1)
    expect(emails[0].placeholder).toBe('[EMAIL_1]')
    expect(emails[0].occurrences).toHaveLength(2)
  })
})
