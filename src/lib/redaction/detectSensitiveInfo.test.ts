import { describe, expect, it } from 'vitest'
import { detectSensitiveInfo } from './detectSensitiveInfo'

describe('detectSensitiveInfo', () => {
  it('keeps ISO dates as DATE instead of duplicate PHONE detections', () => {
    const detections = detectSensitiveInfo('Follow up on 2026-03-15.')

    expect(detections).toHaveLength(1)
    expect(detections[0].value).toBe('2026-03-15')
    expect(detections[0].type).toBe('DATE')
  })

  it('keeps slash dates as DATE without duplicate detections', () => {
    const detections = detectSensitiveInfo('Hired on 3/15/2024.')

    expect(detections).toHaveLength(1)
    expect(detections[0].value).toBe('3/15/2024')
    expect(detections[0].type).toBe('DATE')
  })

  it('still detects real phone numbers as PHONE', () => {
    const detections = detectSensitiveInfo('Maria: +63 917 555 1234')

    expect(detections).toHaveLength(1)
    expect(detections[0].value).toBe('+63 917 555 1234')
    expect(detections[0].type).toBe('PHONE')
  })

  it('preserves non-overlapping phone and date detections', () => {
    const detections = detectSensitiveInfo(
      'Call +63 917 555 1234 before 2026-03-15.',
    )

    expect(detections.map((d) => d.type)).toEqual(['PHONE', 'DATE'])
    expect(detections.map((d) => d.value)).toEqual([
      '+63 917 555 1234',
      '2026-03-15',
    ])
  })
})
