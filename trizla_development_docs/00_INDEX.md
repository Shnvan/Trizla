# Trizla Development Docs

## Purpose

This folder turns the source context in `trizla_project_context/` into developer-facing work documents by area.

The source context remains the archive of original product thinking. These files are the working docs for planning, implementation, QA, and handoff.

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

- `01_FRONTEND.md`: React UI, screens, layout, copy, user workflow.
- `02_REDACTION_ENGINE.md`: detection, placeholder mapping, sanitization, restore logic.
- `03_PRIVACY_SECURITY.md`: local-only trust model, storage rules, privacy copy, risk boundaries.
- `04_BACKEND_DEFERRED.md`: backend guardrails and future triggers.
- `05_DATABASE_DEFERRED.md`: database/storage guardrails and future triggers.
- `06_QA_TESTING.md`: unit, manual, browser, offline, and privacy QA.
- `07_GROWTH_VALIDATION.md`: landing copy, pricing assumptions, outreach, validation metrics.
- `08_MASTER_TODO.md`: milestone checklist.
- `09_PROGRESS_LOG.md`: ongoing dated progress log.
- `10_DECISIONS.md`: decision log.
- `11_AGENT_HANDOFF.md`: rules for future coding agents.

## Current State

- Repository currently contains planning/context documents only.
- No React app scaffold exists yet.
- Recommended app stack is Vite, React, TypeScript, Tailwind CSS, Vitest, React Testing Library, ESLint, and Prettier.

## First Implementation Target

Build this before anything else:

```text
Paste text -> detect emails/phones/URLs/money/dates/IDs -> review list -> copy sanitized text -> restore placeholders
```

Custom terms should follow once the basic local redaction and restore loop works.
