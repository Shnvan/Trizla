export type EntityType =
  | 'EMAIL'
  | 'PHONE'
  | 'URL'
  | 'MONEY'
  | 'DATE'
  | 'ID'
  | 'PERSON'
  | 'COMPANY'
  | 'CUSTOM'

export type DetectionSource = 'regex' | 'custom' | 'heuristic'

export type Confidence = 'high' | 'medium' | 'low'

export interface Occurrence {
  start: number
  end: number
}

export interface RawDetection {
  value: string
  type: EntityType
  start: number
  end: number
  confidence: Confidence
  source: DetectionSource
}

export interface Detection {
  id: string
  value: string
  type: EntityType
  placeholder: string
  confidence: Confidence
  source: DetectionSource
  enabled: boolean
  occurrences: Occurrence[]
}

export interface CustomTerm {
  id: string
  value: string
  type: EntityType
  caseSensitive: boolean
}
