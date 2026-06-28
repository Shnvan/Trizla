# Frontend Work Area

## Goal

Maintain a simple, trustworthy React interface that lets users complete the full Trizla loop without instructions.

Success means a user can paste source text, review detections, copy sanitized text, paste an AI response, restore placeholders, and copy the restored output in under 2 minutes.

## Current Stack

- Vite
- React
- TypeScript
- Simple CSS
- Vitest for engine behavior
- oxlint for linting

Do not use server-side framework features for the MVP.

## Current UI State

- Implemented single-page app.
- Implemented cream/chartreuse brutalist visual direction.
- Implemented in-memory light/dark theme toggle.
- Theme resets to light on refresh.
- No external font loading.
- Header includes Trizla brand, `Local only` badge, How it works link, FAQ link, theme toggle, and Clear all.
- Hero, trust strip, four workflow panels, How it works, FAQ, validation CTA, and footer disclaimer are present.
- Current favicon path is `/trizla-favicon.svg`.

## App Layout

Header:

- Trizla name.
- `Local only` badge.
- `How it works` link.
- `FAQ` link.
- In-memory theme toggle.
- `Clear all` action.

Main workflow:

1. Original text input.
2. Detection controls.
3. Review panel.
4. Sanitized output.
5. AI response restore input.
6. Restored output.

Footer:

- Compliance disclaimer.

## Required UI Copy

Hero title:

```text
Sanitize sensitive text before pasting it into AI.
```

Trust copy:

```text
Runs locally in your browser. Text is not uploaded by Trizla.
```

Disclaimer:

```text
Trizla is not legal, compliance, or security certification software. It does not guarantee complete anonymization. Always review redactions before using sensitive text with third-party tools.
```

## Completed

- [x] Scaffold React + TypeScript app.
- [x] Add app shell and layout.
- [x] Add header with local-only badge.
- [x] Add original text textarea.
- [x] Add detection controls.
- [x] Add review panel with editable enabled state.
- [x] Add sanitized output textarea and copy button.
- [x] Add AI response textarea.
- [x] Add restored output textarea and copy button.
- [x] Add clear/reset action.
- [x] Add sample recruiter text.
- [x] Add privacy/FAQ content.
- [x] Add validation CTA.
- [x] Ensure mobile layout is usable.
- [x] Remove external font loading.
- [x] Keep theme state in memory only.

## Acceptance Criteria

- User can complete the full local redaction and restore flow.
- Inputs are labeled and keyboard usable.
- Copy buttons show confirmation.
- False positives can be unchecked or removed.
- Manual custom terms can be added.
- Privacy copy and disclaimer are visible.
- No UI feature implies compliance certification or perfect anonymization.

## Progress

Status: Implemented, deployed, and QA-passed.

Live app:

```text
https://trizla.ivanliao41.workers.dev/
```

Next frontend work should come from repeated outreach feedback, not speculative polish.
