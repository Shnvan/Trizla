# Development Tasks - Trizla v0.1

## Current Status

Trizla v0.1 is implemented, deployed, QA-passed, and ready for first outreach validation.

Live app:

```text
https://trizla.ivanliao41.workers.dev/
```

## Completed Milestones

### Milestone 1 - Project Scaffold

- [x] Create React + TypeScript app.
- [x] Add simple CSS.
- [x] Create app layout.
- [x] Add header and privacy badges.
- [x] Add original text textarea.
- [x] Add sanitized output textarea.
- [x] Add restore textarea and output.

### Milestone 2 - Detection Engine

- [x] Detect emails.
- [x] Detect URLs.
- [x] Detect phones.
- [x] Detect money.
- [x] Detect dates.
- [x] Detect IDs.
- [x] Detect custom terms.
- [x] Detect simple label-based people and companies.

### Milestone 3 - Merge and Map Detections

- [x] Resolve overlapping detections.
- [x] Create placeholder map.
- [x] Ensure duplicate values map to same placeholder.
- [x] Sort detections by location.
- [x] Generate stable placeholders.

### Milestone 4 - Review Panel

- [x] Show detections in list.
- [x] User can enable/disable detections.
- [x] User can remove detection.
- [x] User can manually add custom term.
- [x] User can choose custom term type.

### Milestone 5 - Sanitization

- [x] Replace enabled detections with placeholders.
- [x] Preserve punctuation and line breaks.
- [x] Add Copy sanitized text.
- [x] Add copied success state.
- [x] Add warning to review before copy.

### Milestone 6 - Restore Flow

- [x] User can paste AI response.
- [x] Restore placeholders with original values.
- [x] Unknown placeholders stay unchanged.
- [x] Add Copy restored output.

### Milestone 7 - Custom Terms

- [x] Add custom term form.
- [x] Add custom term list.
- [x] Add term type.
- [x] Add case-sensitive toggle.
- [x] Include custom terms in detection.
- [x] Preserve original matched casing during restore.

### Milestone 8 - Privacy and Trust

- [x] Add Runs locally badge.
- [x] Add no-upload explanation.
- [x] Add compliance disclaimer.
- [x] Add clear/reset button.
- [x] Avoid analytics inside app.
- [x] Keep state in memory only.
- [x] Remove external font loading.

### Milestone 9 - Tests

- [x] Email detection.
- [x] Phone detection.
- [x] Money detection.
- [x] Date detection.
- [x] Custom term detection.
- [x] Duplicate placeholder mapping.
- [x] Sanitization.
- [x] Restoration.
- [x] Unknown placeholder behavior.
- [x] Overlapping detections.

### Milestone 10 - Landing/Demo

- [x] Add intro section.
- [x] Add sample text button.
- [x] Add Try the local demo CTA.
- [x] Add FAQ.
- [x] Add early-access CTA.
- [x] Deploy shareable live URL.

## Current Remaining Task

Run the first outreach validation sprint:

```text
trizla_development_docs/13_FIRST_OUTREACH_SPRINT.md
trizla_development_docs/14_FIRST_OUTREACH_TRACKER.md
```

Do not build anything else until first-batch evidence is captured.
