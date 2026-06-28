# System Architecture - Trizla MVP

## Architecture Principle

Local-first. No backend. No external processing.

## Current MVP Architecture

```text
Browser
  |
  |-- React UI
  |-- Redaction Engine
  |-- Placeholder Mapper
  |-- Restore Engine
  |-- In-memory state
```

Live app:

```text
https://trizla.ivanliao41.workers.dev/
```

## Components

### 1. UI Layer

Responsible for:

- Text input.
- Review panel.
- Copy buttons.
- Status messages.
- Privacy notices.
- Manual term entry.
- Restore flow.
- In-memory theme toggle.

Current UI:

- Single-page Vite React app.
- Cream/chartreuse brutalist visual direction.
- Header, hero, trust strip, workflow panels, How it works, FAQ, validation CTA, and footer disclaimer.

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

Implementation rule:

Replace by sorted ranges from end to start to avoid index shifting.

For custom terms or regex matches, resolve overlapping detections before replacing.

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

### 6. State

Default: in memory only.

Current in-memory values:

- Original text.
- Sanitized text.
- AI response text.
- Restored text.
- Redaction map.
- Custom terms.
- Theme state.

The theme toggle works while the tab is open and resets to light on refresh.

## Current File Structure

```text
src/
  App.tsx
  App.css
  index.css
  main.tsx
  lib/
    redaction/
    sampleText.ts
  test/
public/
  _headers
  favicon.svg
  trizla-favicon.svg
```

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

## Detection Strategy v0.1

Implemented:

- Email.
- URL.
- Phone.
- Money.
- Dates.
- Long IDs.
- Custom terms.
- Simple label-based names and companies.
- Overlap resolution before placeholder mapping.

Do not try to solve general NER perfectly in v0.1.

## Privacy Architecture Requirements

- No backend.
- No fetch calls in redaction flow.
- No third-party scripts on app page.
- No logging pasted text.
- No error reporting that captures user input.
- No analytics event containing text.
- No external font loading.

## Security Notes

Even local browser apps can expose text through:

- Browser extensions.
- Clipboard history.
- Screen recordings.
- User-installed malware.
- Shared computers.

Do not overpromise security. Use language like:

> Trizla reduces accidental exposure by redacting text locally before you paste it into AI tools.
