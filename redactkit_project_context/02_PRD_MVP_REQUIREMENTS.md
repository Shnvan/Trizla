# PRD — RedactKit MVP

## Version

v0.1 local-first MVP

## Goal

Build the smallest useful product that validates whether users will use a local redaction workflow before pasting sensitive work text into AI tools.

## Primary user story

As a recruiter, I want to paste candidate information into RedactKit, remove sensitive values with reviewable placeholders, copy the sanitized version into ChatGPT, then restore the placeholders in the AI response.

## Core user stories

### Story 1 — Paste source text

User can paste original text into a large textarea.

Acceptance criteria:

- Textarea supports multi-line text.
- User can clear text.
- App handles at least 20,000 characters without freezing badly.
- App does not upload text anywhere.

### Story 2 — Detect sensitive values locally

User can click a button or detection runs automatically.

Detect these entity types in v0.1:

- Email
- Phone number
- URL
- Money amount
- Date
- Long ID / order ID / ticket ID
- Custom terms from user
- Optional likely person/company names with simple heuristic

Acceptance criteria:

- Detected items appear in a review panel.
- Each item has:
  - Original value
  - Entity type
  - Placeholder
  - Enabled/disabled checkbox
- Duplicate values map to the same placeholder.
- Stable placeholder numbering is deterministic within a session.

### Story 3 — Review detections

User can approve or unapprove redactions.

Acceptance criteria:

- User can uncheck false positives.
- User can manually add a sensitive term.
- User can change an entity type if needed.
- User can delete a detection.

### Story 4 — Generate sanitized text

User can generate a sanitized version.

Acceptance criteria:

- Approved items are replaced with placeholders.
- Unapproved items remain unchanged.
- Replacement does not corrupt punctuation or spacing.
- The same original value always uses the same placeholder.
- Placeholder format:
  - `[PERSON_1]`
  - `[EMAIL_1]`
  - `[PHONE_1]`
  - `[COMPANY_1]`
  - `[MONEY_1]`
  - `[DATE_1]`
  - `[URL_1]`
  - `[ID_1]`
  - `[CUSTOM_1]`

### Story 5 — Copy sanitized text

User can copy sanitized text to clipboard.

Acceptance criteria:

- Button copies sanitized text.
- User sees confirmation.
- If clipboard API fails, user can manually select text.

### Story 6 — Restore placeholders

User can paste an AI response containing placeholders and restore original values.

Acceptance criteria:

- User can paste AI response into a second textarea.
- App replaces placeholders with original values using the current redaction map.
- Missing placeholders are ignored.
- Unknown placeholders remain unchanged.
- User can copy restored output.

### Story 7 — Custom sensitive terms

User can add terms like client names, company names, project names, product names, or competitor names.

Acceptance criteria:

- Custom terms are included in detection.
- Custom terms can be case-sensitive or case-insensitive.
- User can label custom term type:
  - Client
  - Company
  - Project
  - Person
  - Custom
- Custom terms are stored only in current browser/session if persistence is enabled.

### Story 8 — Privacy trust

User sees clear privacy information.

Acceptance criteria:

- UI says: “Runs locally in your browser. Text is not uploaded.”
- No external API calls from redaction logic.
- No analytics inside the app page for pasted text area.
- No compliance claims.
- Include “Delete all local data” button if persistence exists.

## Out of scope for v0.1

- Login
- Accounts
- Cloud storage
- Team admin
- Subscription billing
- Backend
- AI API detection
- Browser extension
- Desktop app
- PDF/image redaction
- OCR
- Legal/compliance guarantee
- Perfect anonymization claims

## MVP pages/screens

1. Landing page
2. App page
3. Basic privacy/FAQ page

## App page layout

Top:

- Logo/name
- Privacy badge: “Local only”
- Link: “How it works”
- Link: “Delete local data”

Main sections:

1. Original text input
2. Detection controls
3. Review panel
4. Sanitized output
5. AI response restore input
6. Restored output

## MVP acceptance checklist

The MVP is acceptable when:

- A test user can complete the full loop in under 2 minutes.
- No backend is required.
- All redaction works offline after page load.
- App does not crash on normal pasted text.
- User can manually correct wrong detections.
- User can add custom terms.
- User can copy sanitized and restored text.
