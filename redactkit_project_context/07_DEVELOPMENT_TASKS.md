# Development Tasks — RedactKit v0.1

## Milestone 1 — Project scaffold

- [ ] Create React + TypeScript app.
- [ ] Add Tailwind or simple CSS.
- [ ] Create app layout.
- [ ] Add basic header and privacy banner.
- [ ] Add original text textarea.
- [ ] Add sanitized output textarea.
- [ ] Add restore textarea and output.

Definition of done:

- App runs locally.
- UI has the four main sections.
- No redaction logic yet required.

## Milestone 2 — Detection engine

Create pure detection functions.

- [ ] `detectEmails(text)`
- [ ] `detectUrls(text)`
- [ ] `detectPhones(text)`
- [ ] `detectMoney(text)`
- [ ] `detectDates(text)`
- [ ] `detectIds(text)`
- [ ] `detectCustomTerms(text, customTerms)`
- [ ] `detectHeuristicNamesAndCompanies(text)` optional/simple

Definition of done:

- Given text, functions return detections with start/end indices.
- Detection logic is testable without UI.

## Milestone 3 — Merge and map detections

- [ ] Create `mergeOverlappingDetections`.
- [ ] Create `createPlaceholderMap`.
- [ ] Ensure duplicate values map to same placeholder.
- [ ] Sort detections by location.
- [ ] Generate stable placeholders.

Definition of done:

- Same value appears multiple times but gets one placeholder.
- Overlapping detections do not corrupt text.

## Milestone 4 — Review panel

- [ ] Show detections in table/list.
- [ ] User can enable/disable detections.
- [ ] User can remove detection.
- [ ] User can manually add custom term.
- [ ] User can choose custom term type.

Definition of done:

- User controls what gets redacted.

## Milestone 5 — Sanitization

- [ ] Replace enabled detections with placeholders.
- [ ] Preserve punctuation and line breaks.
- [ ] Add “Copy sanitized text.”
- [ ] Add copied success state.
- [ ] Add warning to review before copy.

Definition of done:

- Core redaction flow works.

## Milestone 6 — Restore flow

- [ ] User can paste AI response.
- [ ] Restore placeholders with original values.
- [ ] Unknown placeholders stay unchanged.
- [ ] Add “Copy restored output.”

Definition of done:

- Full loop works from original text to sanitized text to restored AI output.

## Milestone 7 — Custom terms

- [ ] Add custom term form.
- [ ] Add custom term list.
- [ ] Add term type.
- [ ] Add case-sensitive toggle.
- [ ] Include custom terms in detection.
- [ ] Optional: save custom terms locally only if user enables.

Definition of done:

- User can redact client/project/company names the app cannot infer.

## Milestone 8 — Privacy and trust

- [ ] Add “Runs locally” badge.
- [ ] Add no-upload explanation.
- [ ] Add compliance disclaimer.
- [ ] Add clear/reset button.
- [ ] Add delete local data button if storage is used.
- [ ] Avoid analytics inside app.

Definition of done:

- User understands what the app does and does not promise.

## Milestone 9 — Tests

Write tests for:

- [ ] Email detection.
- [ ] Phone detection.
- [ ] Money detection.
- [ ] Date detection.
- [ ] Custom term detection.
- [ ] Duplicate placeholder mapping.
- [ ] Sanitization.
- [ ] Restoration.
- [ ] Unknown placeholder behavior.
- [ ] Overlapping detections.

Definition of done:

- Core functions covered by tests.

## Milestone 10 — Landing/demo

- [ ] Add landing page or intro section.
- [ ] Add sample text button.
- [ ] Add “Try demo” CTA.
- [ ] Add basic FAQ.
- [ ] Add waitlist/payment link placeholder.

Definition of done:

- Founder can share a link with prospects.

## First coding task

Build this first:

```text
Paste text → detect emails/phones/URLs/money/dates/IDs → show review list → copy sanitized text → restore placeholders
```

Do not build anything else until that works.
