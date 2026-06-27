# Agent Working Rules for Codex / Claude Code

## Mission

Build RedactKit v0.1: a local-first web app for redacting sensitive text before users paste it into AI tools.

## Read first

Before coding, read:

1. `00_README_FOR_CODEX_CLAUDE.md`
2. `01_PRODUCT_BRIEF.md`
3. `02_PRD_MVP_REQUIREMENTS.md`
4. `03_SYSTEM_ARCHITECTURE.md`
5. `04_DATA_PRIVACY_SECURITY.md`
6. `05_UI_UX_SPEC.md`
7. `06_TECH_STACK_AND_SETUP.md`
8. `07_DEVELOPMENT_TASKS.md`
9. `08_QA_TEST_PLAN.md`

## Non-negotiable implementation rules

- Do not add a backend.
- Do not add authentication.
- Do not add AI API calls.
- Do not upload pasted text anywhere.
- Do not add telemetry that includes user text.
- Do not use server actions/API routes for redaction.
- Do not add database.
- Do not add browser extension.
- Do not add desktop app.
- Do not add payments yet.
- Keep detection local and reviewable.
- Keep code simple and testable.

## Coding style

- Use TypeScript.
- Keep redaction logic in pure functions.
- Avoid putting business logic inside React components.
- Write tests for detection, sanitization, and restoration.
- Use clear names.
- Prefer small files.
- Avoid unnecessary dependencies.
- Keep UI usable before beautiful.

## First implementation target

Build this flow first:

```text
Paste text
→ Detect emails/phones/URLs/money/dates/IDs/custom terms
→ Show review list with checkboxes
→ Generate sanitized text
→ Copy sanitized text
→ Paste AI response
→ Restore placeholders
→ Copy restored output
```

## Detection priority

Implement in this order:

1. Email
2. Phone
3. URL
4. Money
5. Date
6. Long ID/order ID
7. Custom terms
8. Simple label-based person/company detection

Do not over-engineer general person/company recognition in v0.1.

## Placeholder rules

- Format: `[TYPE_N]`
- Use uppercase.
- Use stable numbering per entity type.
- Same value should map to same placeholder.
- Unknown placeholders should not break restore.

## Privacy copy to include in UI

Use:

> Runs locally in your browser. Text is not uploaded by RedactKit.

Use disclaimer:

> RedactKit is not compliance software and does not guarantee complete anonymization. Always review before sharing sensitive text with third-party tools.

## What to ask before changing scope

If tempted to add any of these, stop and ask:

- Backend
- Login
- Cloud sync
- AI API
- Browser extension
- Desktop app
- Team dashboard
- Payment system
- PDF/image redaction

## Definition of done for v0.1

- App runs locally.
- No backend.
- User completes core flow.
- User can manually add custom sensitive terms.
- User can uncheck false positives.
- Restore works.
- Tests pass.
- Privacy messaging is visible.
- No network calls are needed for redaction.

## Suggested first prompt for coding agent

```text
Read all markdown files in this folder. Then implement RedactKit v0.1 using React + TypeScript. Start with a static local-only app and the core redaction/restore flow. Keep redaction logic in pure functions and write tests for it. Do not add backend, auth, AI APIs, payments, extension, desktop app, or cloud storage.
```
