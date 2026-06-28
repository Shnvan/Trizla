# Trizla Development Docs

## Purpose

This folder turns the source context in `trizla_project_context/` into developer-facing work documents by area.

The source context remains the archive of product thinking. These files are the active working docs for implementation status, QA, launch readiness, and outreach validation.

## Product Summary

Trizla is a local-first privacy utility that helps users sanitize sensitive work text before pasting it into ChatGPT, Claude, Gemini, Perplexity, or other AI tools.

Core loop:

1. Paste sensitive source text.
2. Detect likely sensitive values locally.
3. Review and adjust detections.
4. Replace approved values with stable placeholders.
5. Copy sanitized text into an AI tool.
6. Paste the AI response back into Trizla.
7. Restore placeholders locally.
8. Copy the restored output.

Live app:

```text
https://trizla.ivanliao41.workers.dev/
```

## MVP Non-Negotiables

- No backend.
- No login.
- No cloud database.
- No server-side text processing.
- No AI API calls.
- No browser extension.
- No desktop app.
- No payments.
- Store nothing by default.
- Do not upload pasted text anywhere.
- Do not claim legal compliance, HIPAA compliance, GDPR compliance, or perfect anonymization.
- Keep manual review central.

## Work Areas

- `01_FRONTEND.md`: implemented React UI, visual direction, workflow, and launch-state UI notes.
- `02_REDACTION_ENGINE.md`: implemented detection, placeholder mapping, sanitization, restore logic, and engine constraints.
- `03_PRIVACY_SECURITY.md`: local-only trust model, storage rules, privacy copy, and completed privacy checks.
- `04_BACKEND_DEFERRED.md`: backend guardrails and future triggers.
- `05_DATABASE_DEFERRED.md`: database/storage guardrails and future triggers.
- `06_QA_TESTING.md`: automated, manual, browser, and privacy QA status.
- `07_GROWTH_VALIDATION.md`: landing copy, pricing assumptions, outreach, validation metrics.
- `08_MASTER_TODO.md`: current milestone status and remaining outreach work.
- `09_PROGRESS_LOG.md`: ongoing dated progress log.
- `10_DECISIONS.md`: decision log.
- `11_AGENT_HANDOFF.md`: rules for future coding agents.
- `13_FIRST_OUTREACH_SPRINT.md`: first 15-person validation sprint workflow and message copy.
- `14_FIRST_OUTREACH_TRACKER.md`: active tracker for the first outreach batch.

## Current State

- App scaffold implemented.
- Frontend implemented.
- Redaction engine implemented.
- Custom terms implemented.
- Restore flow implemented.
- Privacy/security checks completed.
- Visual redesign implemented with cream/chartreuse brutalist styling and an in-memory theme toggle.
- Deployed on Cloudflare Workers static assets.
- QA completed with 58 automated tests passing.
- Outreach sprint is ready.

## Current Commands

```powershell
npm run dev
npm test
npm run lint
npm run build
npm run preview
```

Do not open `index.html` directly. Use Vite dev or preview locally.

## Current Priority

Start the first outreach validation sprint and capture user signals in `14_FIRST_OUTREACH_TRACKER.md`. Do not build new features until the first batch produces repeated evidence.
