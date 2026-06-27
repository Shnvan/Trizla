# Trizla Project Context Pack

## What this is

This folder contains the full project context for building **Trizla**, a local-first redaction tool for people who want to use ChatGPT/Claude/Gemini with sensitive work text without manually removing names, emails, phone numbers, client names, company names, IDs, and other private terms.

## How the coding agent should use these files

Read these files before coding:

1. `00_README_FOR_CODEX_CLAUDE.md`
2. `01_PRODUCT_BRIEF.md`
3. `02_PRD_MVP_REQUIREMENTS.md`
4. `03_SYSTEM_ARCHITECTURE.md`
5. `04_DATA_PRIVACY_SECURITY.md`
6. `05_UI_UX_SPEC.md`
7. `06_TECH_STACK_AND_SETUP.md`
8. `07_DEVELOPMENT_TASKS.md`
9. `08_QA_TEST_PLAN.md`
10. `09_COPY_LANDING_PRICING.md`
11. `10_OUTREACH_VALIDATION_PLAN.md`
12. `11_AGENT_WORKING_RULES.md`
13. `12_DECISION_LOG_AND_KILL_METRICS.md`

## Product in one sentence

**Trizla sanitizes sensitive text locally before users paste it into AI tools, then restores placeholders after the AI response.**

## Non-negotiables

- No backend in MVP.
- No login in MVP.
- No cloud database in MVP.
- No server-side processing in MVP.
- No AI API calls in MVP.
- All redaction must run locally in the browser.
- Store nothing by default.
- Do not claim legal compliance, HIPAA compliance, GDPR compliance, or perfect anonymization.
- Keep manual review central.
- Build the smallest useful version first.

## MVP core loop

1. User pastes sensitive text.
2. App detects sensitive items locally.
3. User reviews detected items.
4. App replaces approved items with stable placeholders.
5. User copies sanitized text into ChatGPT/Claude/Gemini.
6. User pastes AI response back into Trizla.
7. App restores placeholders locally.
8. User copies final restored output.

## Target MVP buyer

Start with **recruiters**, then test agency owners, virtual assistants, consultants, and freelancers.

Primary first-use example:

> A recruiter wants to summarize a candidate profile with ChatGPT but needs to remove the candidate name, email, phone number, current employer, expected salary, and private interview notes first.

## Success definition for v0.1

A user can complete this flow without instructions:

**Paste sensitive text → review detections → copy sanitized text → paste AI response → restore placeholders.**

## Recommended first build

Build a static React + TypeScript app with Vite or Next.js. No backend.

Use simple local detection first:

- Emails
- Phone numbers
- URLs
- Money amounts
- Dates
- Long IDs / order IDs
- Custom user terms
- Optional simple name/company heuristics

Do not build authentication, payment, browser extension, desktop app, or cloud sync yet.

## Suggested first command for the coding agent

```text
Read all markdown files in this folder. Then build Trizla v0.1 as a local-only TypeScript React app. Start with the core flow only. Do not add backend, auth, payments, external APIs, browser extension, or desktop app.
```
