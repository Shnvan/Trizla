import type { Detection } from './types'

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function restoreText(aiText: string, detections: Detection[]): string {
  if (!aiText || detections.length === 0) return aiText

  const map = new Map<string, string>()
  for (const detection of detections) {
    if (!detection.placeholder) continue
    if (!map.has(detection.placeholder)) {
      map.set(detection.placeholder, detection.value)
    }
  }
  if (map.size === 0) return aiText

  const placeholders = [...map.keys()].sort((a, b) => b.length - a.length)
  const pattern = new RegExp(placeholders.map(escapeRegex).join('|'), 'g')
  return aiText.replace(pattern, (match) => map.get(match) ?? match)
}
