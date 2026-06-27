# Frontend Work Area

## Goal

Build a simple, trustworthy React interface that lets users complete the full RedactKit loop without instructions.

Success means a user can paste source text, review detections, copy sanitized text, paste an AI response, restore placeholders, and copy the restored output in under 2 minutes.

## Stack

- Vite
- React
- TypeScript
- Tailwind CSS or simple CSS
- Vitest and React Testing Library for UI-adjacent behavior

Do not use server-side framework features for the MVP.

## Required Screens

- Landing or intro section.
- Main app page.
- Basic privacy/FAQ content.

The first usable screen should be the app workflow, not a marketing-only page.

## App Layout

Header:

- RedactKit name.
- `Local only` badge.
- `How it works` link.
- `Clear data` action.

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

Subtitle:

```text
Redact names, emails, phone numbers, company names, money amounts, IDs, and custom terms locally in your browser.
```

Trust line:

```text
No upload. No account. Review before copy.
```

Privacy copy:

```text
Runs locally in your browser. Text is not uploaded by RedactKit.
```

Disclaimer:

```text
RedactKit is not compliance software and does not guarantee complete anonymization. Always review before sharing sensitive text with third-party tools.
```

## Component Responsibilities

- `Header`: product name, local badge, navigation/actions.
- `PrivacyBanner`: local-only trust copy.
- `OriginalTextPanel`: source textarea, sample text, clear action.
- `DetectionToolbar`: detect action, select/deselect all, custom term entry trigger.
- `ReviewPanel`: detection list with checkbox, type, value, placeholder, source/confidence, remove action.
- `SanitizedOutputPanel`: sanitized textarea, copy action, review warning.
- `RestorePanel`: AI response textarea, restore action, restored output, copy action.
- `FooterDisclaimer`: non-compliance disclaimer.

## TODO

- [ ] Scaffold React + TypeScript app.
- [ ] Add app shell and layout.
- [ ] Add header with local-only badge.
- [ ] Add original text textarea.
- [ ] Add detection controls.
- [ ] Add review panel with editable enabled state.
- [ ] Add sanitized output textarea and copy button.
- [ ] Add AI response textarea.
- [ ] Add restored output textarea and copy button.
- [ ] Add clear/reset action.
- [ ] Add sample recruiter text.
- [ ] Add basic privacy/FAQ content.
- [ ] Ensure mobile layout is usable.

## Acceptance Criteria

- User can complete the full local redaction and restore flow.
- Inputs are labeled and keyboard usable.
- Copy buttons show confirmation.
- False positives can be unchecked or removed.
- Manual custom terms can be added once custom term support is implemented.
- Privacy copy and disclaimer are visible.
- No UI feature implies compliance certification or perfect anonymization.

## Progress

Status: Not started.

Notes:

- No frontend app exists yet.
