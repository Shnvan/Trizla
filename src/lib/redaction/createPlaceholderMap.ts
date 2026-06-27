import type { Detection, EntityType, Occurrence, RawDetection } from './types'

interface Group {
  type: EntityType
  value: string
  source: Detection['source']
  confidence: Detection['confidence']
  occurrences: Occurrence[]
  firstStart: number
}

function keyOf(type: EntityType, value: string): string {
  return `${type}::${value}`
}

export function groupDetections(raws: RawDetection[]): Group[] {
  const groups = new Map<string, Group>()
  for (const r of raws) {
    const key = keyOf(r.type, r.value)
    const existing = groups.get(key)
    const occurrence: Occurrence = { start: r.start, end: r.end }
    if (existing) {
      existing.occurrences.push(occurrence)
      if (r.start < existing.firstStart) existing.firstStart = r.start
    } else {
      groups.set(key, {
        type: r.type,
        value: r.value,
        source: r.source,
        confidence: r.confidence,
        occurrences: [occurrence],
        firstStart: r.start,
      })
    }
  }
  for (const group of groups.values()) {
    group.occurrences.sort((a, b) => a.start - b.start)
  }
  return [...groups.values()]
}

export function createPlaceholderMap(raws: RawDetection[]): Detection[] {
  const groups = groupDetections(raws)
  groups.sort((a, b) => {
    if (a.type !== b.type) return a.type.localeCompare(b.type)
    return a.firstStart - b.firstStart
  })

  const counters = new Map<EntityType, number>()
  const detections: Detection[] = []
  let idCounter = 0

  for (const group of groups) {
    const next = (counters.get(group.type) ?? 0) + 1
    counters.set(group.type, next)
    detections.push({
      id: `det-${idCounter++}`,
      value: group.value,
      type: group.type,
      placeholder: `[${group.type}_${next}]`,
      confidence: group.confidence,
      source: group.source,
      enabled: true,
      occurrences: group.occurrences,
    })
  }

  detections.sort((a, b) => {
    const aStart = a.occurrences[0]?.start ?? 0
    const bStart = b.occurrences[0]?.start ?? 0
    return aStart - bStart
  })

  return detections
}
