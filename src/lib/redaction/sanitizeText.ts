import type { Detection } from './types'

interface Range {
  start: number
  end: number
  placeholder: string
}

export function sanitizeText(text: string, detections: Detection[]): string {
  if (!text || detections.length === 0) return text

  const ranges: Range[] = []
  for (const detection of detections) {
    if (!detection.enabled) continue
    for (const occurrence of detection.occurrences) {
      if (
        occurrence.start < 0 ||
        occurrence.end > text.length ||
        occurrence.start >= occurrence.end
      ) {
        continue
      }
      ranges.push({
        start: occurrence.start,
        end: occurrence.end,
        placeholder: detection.placeholder,
      })
    }
  }
  if (ranges.length === 0) return text

  ranges.sort((a, b) => a.start - b.start)
  const kept: Range[] = []
  let lastEnd = -1
  for (const range of ranges) {
    if (range.start >= lastEnd) {
      kept.push(range)
      lastEnd = range.end
    }
  }

  kept.sort((a, b) => b.start - a.start)
  let result = text
  for (const range of kept) {
    result = result.slice(0, range.start) + range.placeholder + result.slice(range.end)
  }
  return result
}
