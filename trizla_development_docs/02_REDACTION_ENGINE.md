# Redaction Engine Work Area

## Goal

Maintain local, pure TypeScript logic for detecting sensitive values, creating stable placeholders, generating sanitized text, and restoring placeholders after an AI response.

The biggest engineering risk is corrupting user text or failing to restore placeholders, so correctness matters more than clever detection.

## Entity Types

```ts
type EntityType =
  | "PERSON"
  | "EMAIL"
  | "PHONE"
  | "URL"
  | "COMPANY"
  | "MONEY"
  | "DATE"
  | "ID"
  | "CUSTOM"
```

## Detection Shape

```ts
type Detection = {
  id: string
  value: string
  type: EntityType
  placeholder: string
  confidence: number
  source: "regex" | "custom" | "heuristic"
  enabled: boolean
  occurrences: Array<{
    start: number
    end: number
  }>
}
```

## Implemented Behavior

- Email detection.
- URL detection.
- Phone detection.
- Money detection.
- Date detection.
- Long ID, order ID, and ticket ID detection.
- Custom term detection with escaped regex handling.
- Case-sensitive and case-insensitive custom terms.
- Actual matched text is preserved for custom-term restore casing.
- Overlapping detections are resolved before placeholder mapping.
- Date-like ranges win over phone-like overlaps when priority and confidence require it.
- Stable placeholder map generation.
- Sanitization for enabled detections only.
- Restore that leaves unknown placeholders unchanged.

## Placeholder Rules

- Format is `[TYPE_N]`.
- Use uppercase entity types.
- Numbering starts at `1` for each entity type.
- Same original value and same entity type map to the same placeholder.
- Unknown placeholders remain unchanged during restore.
- Avoid placeholder collisions with user text where practical.

Examples:

```text
Maria Santos -> [PERSON_1]
maria@email.com -> [EMAIL_1]
BrightPath BPO -> [COMPANY_1]
```

## Sanitization Rules

- Replace only enabled detections.
- Preserve punctuation, spacing, and line breaks.
- Sort replacement ranges from end to start to avoid index shifting.
- Resolve overlapping detections before replacement.
- Prefer higher-confidence, more complete matches when detections overlap.

## Restore Rules

- Replace exact placeholder strings using the current redaction map.
- Multiple instances restore correctly.
- Missing placeholders are ignored.
- Unknown placeholders remain unchanged.

## Completed

- [x] Create pure detection functions for email, phone, URL, money, date, and ID.
- [x] Create custom term detector with escaped regex handling.
- [x] Add case-sensitive and case-insensitive custom term behavior.
- [x] Add label-based person/company heuristics.
- [x] Create overlapping detection resolution logic.
- [x] Create stable placeholder map logic.
- [x] Create sanitizer.
- [x] Create restore function.
- [x] Keep all logic testable without React.

## Acceptance Criteria

- Duplicate values map to one placeholder.
- Overlapping detections do not corrupt text.
- Enabled items are redacted.
- Disabled items remain unchanged.
- Unknown placeholders survive restore unchanged.
- Restore works for repeated placeholders.
- The engine does not call network APIs.

## Progress

Status: Implemented and covered by automated tests.

Current verification:

```powershell
npm test
```

Latest QA state: 58 tests passing.
