# Decision Log

## Current Product Decision

Build Trizla v0.1 as a validation MVP for local redaction before using AI tools.

## Chosen Wedge

```text
Local redaction before using AI tools.
```

First segment:

```text
Recruiters and talent sourcers.
```

## Technical Decisions

- Use a static React + TypeScript app.
- Prefer Vite.
- Deploy through Cloudflare Workers static assets from `main`.
- Keep all redaction logic client-side.
- Use pure TypeScript functions for detection, sanitization, placeholder mapping, and restoration.
- Store nothing by default.
- Keep theme state in memory only; refresh resets to light.
- Use local/system fonts only.
- Use `/trizla-favicon.svg` as the current favicon path.
- Do not create backend code in MVP.
- Do not create database or cloud storage in MVP.
- Do not call OpenAI, Claude, Gemini, or other AI APIs in MVP.

## Product Decisions

- Manual review is central.
- Detection should start with high-confidence regexes.
- Custom terms are required for values the app cannot infer.
- Simple label-based person/company detection is optional for v0.1.
- General NER is out of scope for v0.1.
- Pricing hypothesis is `$29 one-time` for first 50 early users.
- Current validation URL is `https://trizla.ivanliao41.workers.dev/`.
- First outreach tracking lives in `14_FIRST_OUTREACH_TRACKER.md`.

## Privacy Decisions

- Use local-only promise.
- Avoid compliance claims.
- Avoid regulated medical, legal, financial, and government positioning.
- Use clear disclaimer that Trizla does not guarantee complete anonymization.

## Deferred Decisions

- Backend.
- Login/accounts.
- Cloud sync.
- Database.
- Browser extension.
- Desktop app.
- Payments.
- AI-powered detection.
- PDF/image redaction.
- OCR.
- Team workflows.

## Decision Review Triggers

Review product direction after:

- 50 targeted DMs.
- 15 replies.
- 8 discovery calls or demos.
- 5 prototype trials.
- 3 repeated users.
- 2 paid or committed users.

Review offline/desktop direction if:

- More than 50% of interested users refuse a web version but accept an offline build.
