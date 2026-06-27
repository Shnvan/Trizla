import { createPlaceholderMap } from './createPlaceholderMap'
import { detectCustomTerms } from './detectCustomTerms'
import { runAllRegexDetectors } from './regexDetectors'
import type { Confidence, CustomTerm, Detection, EntityType, RawDetection } from './types'

const CONFIDENCE_RANK: Record<Confidence, number> = {
  high: 3,
  medium: 2,
  low: 1,
}

const TYPE_PRIORITY: Record<EntityType, number> = {
  EMAIL: 1,
  URL: 2,
  MONEY: 3,
  DATE: 4,
  PHONE: 5,
  ID: 6,
  PERSON: 7,
  COMPANY: 8,
  CUSTOM: 9,
}

function overlaps(a: RawDetection, b: RawDetection): boolean {
  return a.start < b.end && b.start < a.end
}

function compareDetectionPriority(a: RawDetection, b: RawDetection): number {
  const confidenceDiff =
    CONFIDENCE_RANK[b.confidence] - CONFIDENCE_RANK[a.confidence]
  if (confidenceDiff !== 0) return confidenceDiff

  const lengthDiff = b.end - b.start - (a.end - a.start)
  if (lengthDiff !== 0) return lengthDiff

  const priorityDiff = TYPE_PRIORITY[a.type] - TYPE_PRIORITY[b.type]
  if (priorityDiff !== 0) return priorityDiff

  return a.start - b.start
}

export function resolveOverlappingDetections(
  raws: RawDetection[],
): RawDetection[] {
  const sorted = [...raws].sort(compareDetectionPriority)
  const kept: RawDetection[] = []

  for (const detection of sorted) {
    if (!kept.some((existing) => overlaps(existing, detection))) {
      kept.push(detection)
    }
  }

  return kept.sort((a, b) => a.start - b.start)
}

export function detectSensitiveInfo(
  text: string,
  customTerms: CustomTerm[] = [],
): Detection[] {
  if (!text || text.trim().length === 0) return []
  const raws = [
    ...runAllRegexDetectors(text),
    ...detectCustomTerms(text, customTerms),
  ]
  return createPlaceholderMap(resolveOverlappingDetections(raws))
}
