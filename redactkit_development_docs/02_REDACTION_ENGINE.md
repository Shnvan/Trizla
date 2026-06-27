# Redaction Engine Work Area

## Goal

Implement local, pure TypeScript logic for detecting sensitive values, creating stable placeholders, generating sanitized text, and restoring placeholders after an AI response.

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

## Detection Priority

Implement in this order:

1. Email.
2. Phone.
3. URL.
4. Money.
5. Date.
6. Long ID, order ID, or ticket ID.
7. Custom terms.
8. Simple label-based person/company heuristics.

Do not attempt general named-entity recognition in v0.1.

## Sanitization Rules

- Replace only enabled detections.
- Preserve punctuation, spacing, and line breaks.
- Sort replacement ranges from end to start to avoid index shifting.
- Merge or resolve overlapping detections before replacement.
- Prefer higher-confidence, more complete matches when detections overlap.

## Restore Rules

- Replace exact placeholder strings using the current redaction map.
- Multiple instances restore correctly.
- Missing placeholders are ignored.
- Unknown placeholders remain unchanged.

## TODO

- [ ] Create pure detection functions for email, phone, URL, money, date, and ID.
- [ ] Create custom term detector with escaped regex handling.
- [ ] Add case-sensitive and case-insensitive custom term behavior.
- [ ] Add simple label-based person/company heuristics if feasible.
- [ ] Create overlapping detection merge logic.
- [ ] Create stable placeholder map logic.
- [ ] Create sanitizer.
- [ ] Create restore function.
- [ ] Keep all logic testable without React.

## Acceptance Criteria

- Duplicate values map to one placeholder.
- Overlapping detections do not corrupt text.
- Enabled items are redacted.
- Disabled items remain unchanged.
- Unknown placeholders survive restore unchanged.
- Restore works for repeated placeholders.
- The engine does not call network APIs.

## Progress

Status: Not started.

Notes:

- Redaction logic has not been implemented yet.
