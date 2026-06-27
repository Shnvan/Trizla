# Agent Handoff

## Mission

Build RedactKit v0.1: a local-first web app that redacts sensitive text before users paste it into AI tools, then restores placeholders after the AI response.

## Read First

Before coding, read:

1. `redactkit_development_docs/00_INDEX.md`
2. `redactkit_development_docs/01_FRONTEND.md`
3. `redactkit_development_docs/02_REDACTION_ENGINE.md`
4. `redactkit_development_docs/03_PRIVACY_SECURITY.md`
5. `redactkit_development_docs/06_QA_TESTING.md`
6. `redactkit_development_docs/08_MASTER_TODO.md`

Use `redactkit_project_context/` as the original source archive if more context is needed.

## Hard Rules

- Do not add a backend.
- Do not add authentication.
- Do not add a database.
- Do not add AI API calls.
- Do not upload pasted text anywhere.
- Do not add telemetry that includes user text.
- Do not use server actions or API routes for redaction.
- Do not add browser extension work.
- Do not add desktop app work.
- Do not add payments yet.
- Keep detection local and reviewable.
- Keep redaction logic in pure functions.

## First Build Target

Implement this first:

```text
Paste text
-> Detect emails/phones/URLs/money/dates/IDs
-> Show review list with checkboxes
-> Generate sanitized text
-> Copy sanitized text
-> Paste AI response
-> Restore placeholders
-> Copy restored output
```

Then add custom terms.

## Suggested Prompt for Future Coding Agent

```text
Read redactkit_development_docs first, then implement RedactKit v0.1 using React + TypeScript. Build a static local-only app and start with the core redaction/restore flow. Keep detection, sanitization, placeholder mapping, and restore logic in pure functions. Write tests for the core engine. Do not add backend, auth, AI APIs, payments, browser extension, desktop app, database, or cloud storage.
```

## Completion Criteria for v0.1

- App runs locally.
- No backend exists.
- User can complete the core flow.
- User can manually add custom sensitive terms.
- User can uncheck false positives.
- Restore works.
- Tests pass.
- Privacy messaging is visible.
- No network calls are needed for redaction.
