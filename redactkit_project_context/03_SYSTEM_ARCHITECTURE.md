# System Architecture — RedactKit MVP

## Architecture principle

Local-first. No backend. No external processing.

## MVP architecture

```text
Browser
  |
  |-- React UI
  |-- Redaction Engine
  |-- Placeholder Mapper
  |-- Restore Engine
  |-- Optional Local Storage
```

## Components

### 1. UI Layer

Responsible for:

- Text input
- Review panel
- Copy buttons
- Status messages
- Privacy notices
- Manual term entry
- Restore flow

Suggested components:

```text
App
  Header
  PrivacyBanner
  OriginalTextPanel
  DetectionToolbar
  ReviewPanel
  SanitizedOutputPanel
  RestorePanel
  FooterDisclaimer
```

### 2. Redaction Engine

Responsible for detecting sensitive values.

Input:

```ts
{
  text: string
  customTerms: CustomTerm[]
  enabledEntityTypes: EntityType[]
}
```

Output:

```ts
Detection[]
```

Detection shape:

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

### 3. Placeholder Mapper

Responsible for stable placeholder generation.

Rules:

- Same original value + same entity type = same placeholder.
- Numbering starts at 1 for each entity type.
- Placeholders are uppercase and bracketed.
- Avoid placeholder collisions.

Example:

```text
Maria Santos -> [PERSON_1]
maria@email.com -> [EMAIL_1]
Maria Santos again -> [PERSON_1]
```

### 4. Sanitizer

Responsible for replacing approved detections in original text.

Important implementation rule:

Replace by sorted ranges from end to start to avoid index shifting.

For custom terms or regex matches, merge overlapping detections before replacing.

### 5. Restore Engine

Responsible for replacing placeholders in AI output with original values.

Input:

```ts
{
  aiText: string
  redactionMap: RedactionMapItem[]
}
```

Output:

```ts
restoredText: string
```

Rules:

- Replace exact placeholder strings.
- Unknown placeholders remain unchanged.
- Multiple instances restore correctly.

### 6. Storage

Default: no persistence.

Optional:

- sessionStorage for current session only.
- localStorage for custom terms only if user explicitly saves them.
- IndexedDB only if sessions become large later.

## File structure suggestion

```text
src/
  app/
    App.tsx
  components/
    Header.tsx
    PrivacyBanner.tsx
    OriginalTextPanel.tsx
    DetectionToolbar.tsx
    ReviewPanel.tsx
    SanitizedOutputPanel.tsx
    RestorePanel.tsx
    FooterDisclaimer.tsx
  lib/
    detection/
      detectSensitiveInfo.ts
      regexDetectors.ts
      customTermDetector.ts
      heuristicDetectors.ts
    redaction/
      createPlaceholderMap.ts
      sanitizeText.ts
      restoreText.ts
      mergeDetections.ts
    storage/
      localSettings.ts
    clipboard/
      copyToClipboard.ts
  types/
    redaction.ts
  tests/
    redaction.test.ts
    restore.test.ts
```

## Entity types

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

## Detection strategy v0.1

### High-confidence regex detectors

Implement first:

- Email
- URL
- Phone
- Money
- Dates
- Long IDs

### Custom terms

Implement second:

- Exact phrase detection.
- Case-insensitive by default.
- Escape regex characters.
- Word boundary matching where appropriate.

### Heuristic names/companies

Implement carefully and mark low confidence.

Possible initial heuristic:

- Consecutive capitalized words near labels:
  - `Name: Maria Santos`
  - `Candidate: Maria Santos`
  - `Client: Maria Santos`
  - `Company: BrightPath BPO`
  - `Employer: Acme Dental`

Do not try to solve general NER perfectly in v0.1.

## Privacy architecture requirements

- No backend.
- No fetch calls in redaction flow.
- No third-party script on app page if possible.
- No logging pasted text.
- No error reporting that captures user input.
- No analytics event containing text.

## Security notes

Even local browser apps can expose text through:

- Browser extensions
- Clipboard history
- Screen recordings
- User-installed malware
- Shared computers

Do not overpromise security. Use language like:

> RedactKit reduces accidental exposure by redacting text locally before you paste it into AI tools.
