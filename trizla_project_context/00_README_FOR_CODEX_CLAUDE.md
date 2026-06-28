# Trizla Project Context Pack

## What this is

This folder contains the product context for **Trizla**, a local-first redaction tool for people who want to use ChatGPT, Claude, Gemini, or other AI tools with sensitive work text without manually removing names, emails, phone numbers, client names, company names, IDs, and other private terms.

Trizla is now implemented, deployed, QA-passed, and ready for first outreach validation.

Live app:

```text
https://trizla.ivanliao41.workers.dev/
```

## How the coding agent should use these files

Read these files before major product changes:

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

Use `trizla_development_docs/` for the active launch-state docs and outreach tracker.

## Product in one sentence

**Trizla sanitizes sensitive text locally before users paste it into AI tools, then restores placeholders after the AI response.**

## Non-Negotiables

- No backend in MVP.
- No login in MVP.
- No cloud database in MVP.
- No server-side processing in MVP.
- No AI API calls in MVP.
- All redaction must run locally in the browser.
- Store nothing by default.
- Do not claim legal compliance, HIPAA compliance, GDPR compliance, or perfect anonymization.
- Keep manual review central.
- Build only from validated user evidence during outreach.

## Current MVP Core Loop

1. User pastes sensitive text.
2. App detects sensitive items locally.
3. User reviews detected items.
4. App replaces approved items with stable placeholders.
5. User copies sanitized text into ChatGPT, Claude, Gemini, or another AI tool.
6. User pastes AI response back into Trizla.
7. App restores placeholders locally.
8. User copies final restored output.

## Current Implementation

- Vite React + TypeScript app.
- Local redaction engine implemented in pure TypeScript functions.
- Custom terms implemented.
- Restore flow implemented.
- Cream/chartreuse brutalist UI implemented.
- Theme toggle is in memory only and resets to light on refresh.
- No external font loading.
- Current favicon path is `/trizla-favicon.svg`.
- Cloudflare Workers static deployment is live.
- QA passed with 58 automated tests.

## Target MVP Buyer

Start with **recruiters**, then test agency owners, virtual assistants, consultants, and freelancers.

Primary first-use example:

> A recruiter wants to summarize a candidate profile with ChatGPT but needs to remove the candidate name, email, phone number, current employer, expected salary, and private interview notes first.

## Current Success Definition

A user can complete this flow without instructions:

```text
Paste sensitive text -> review detections -> copy sanitized text -> paste AI response -> restore placeholders.
```

## Current Priority

Run the first 15-person outreach sprint and track results in:

```text
trizla_development_docs/14_FIRST_OUTREACH_TRACKER.md
```
