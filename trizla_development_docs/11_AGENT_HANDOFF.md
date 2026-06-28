# Agent Handoff

## Mission

Maintain Trizla v0.1: a local-first web app that redacts sensitive text before users paste it into AI tools, then restores placeholders after the AI response.

The app is already implemented, renamed, visually redesigned, QA-passed, deployed, and ready for first outreach.

Live app:

```text
https://trizla.ivanliao41.workers.dev/
```

## Read First

Before coding, read:

1. `trizla_development_docs/00_INDEX.md`
2. `trizla_development_docs/08_MASTER_TODO.md`
3. `trizla_development_docs/13_FIRST_OUTREACH_SPRINT.md`
4. `trizla_development_docs/14_FIRST_OUTREACH_TRACKER.md`
5. `trizla_development_docs/03_PRIVACY_SECURITY.md`
6. `trizla_development_docs/06_QA_TESTING.md`

Use `trizla_project_context/` as the source archive if more context is needed.

## Current Commands

```powershell
npm run dev
npm test
npm run lint
npm run build
npm run preview
```

Do not open `index.html` directly. Use Vite dev or preview locally.

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
- Keep default state in memory only.
- Do not add external font loading.

## Current Product Surface

- Vite React + TypeScript single-page app.
- Cream/chartreuse brutalist UI.
- In-memory theme toggle that resets to light on refresh.
- Local detection, review, sanitize, copy, restore, and clear flow.
- Custom terms with case-sensitive option.
- How it works, FAQ, validation CTA, and disclaimer.
- Current favicon path: `/trizla-favicon.svg`.
- Deployment: Cloudflare Workers static assets.

## Current Priority

Run the first outreach validation sprint. Track contacts, replies, trials, exact quotes, pain level, confusing parts, and willingness-to-pay signals in `14_FIRST_OUTREACH_TRACKER.md`.

Do not build new features until repeated tester evidence justifies them.

## Completion Criteria for This Phase

- 15 targeted contacts sent.
- 5 replies received.
- 3 people try the live app.
- 2 people say they manually clean sensitive text or avoid AI because of sensitive text.
- At least 3 exact quotes captured.
