# Trizla

Trizla is a local-first web app for sanitizing sensitive text before pasting it into AI tools, then restoring placeholders after the AI response.

Live app:

```text
https://trizla.ivanliao41.workers.dev/
```

The MVP flow is:

1. Paste source text.
2. Detect sensitive values locally.
3. Review, uncheck, remove, or add custom terms.
4. Copy sanitized text with stable placeholders.
5. Paste an AI response containing placeholders.
6. Restore placeholders locally.

## Current State

- Implemented Vite + React + TypeScript app.
- Implemented local detection, placeholder mapping, sanitization, custom terms, and restore flow.
- Implemented cream/chartreuse brutalist UI with an in-memory theme toggle.
- Deployed on Cloudflare Workers static assets.
- QA passed before outreach with 58 automated tests passing.
- First outreach sprint is ready in `trizla_development_docs/13_FIRST_OUTREACH_SPRINT.md`.

## MVP Constraints

- No backend.
- No authentication.
- No database.
- No AI API.
- No analytics.
- No persistent browser storage by default.
- No uploaded pasted text.
- No external font loading.
- No compliance or perfect-anonymization claims.

## Local Setup

```powershell
npm install
npm run dev
```

Open the local URL printed by Vite, usually:

```text
http://127.0.0.1:5173/
```

Do not open `index.html` directly. The app is built for Vite dev, preview, or static hosting.

## Verification

Run these before sharing or deploying changes:

```powershell
npm test
npm run lint
npm run build
```

## Production Preview

Build and preview the static output locally:

```powershell
npm run build
npm run preview
```

Vite serves the built app from `dist` and prints a local preview URL.

## Deployment

Current host:

- Cloudflare Workers static assets

Deployment settings:

- Build command: `npm run build`
- Output directory: `dist`
- Root directory: project root
- Production branch: `main`
- Environment variables: none
- Current favicon path: `/trizla-favicon.svg`

Do not add deployment SDKs, serverless functions, API routes, auth, database, analytics, payments, or AI APIs for the MVP.

## Manual QA Before Sharing

- Use sample text.
- Detect sensitive info.
- Review, uncheck, and remove detections.
- Add a custom term and rerun detection.
- Copy sanitized text.
- Paste a faux AI response with placeholders.
- Restore placeholders.
- Copy restored output.
- Clear all.
- Check mobile layout.
- Confirm no pasted text is sent over the network.

## Validation Next Step

Use `trizla_development_docs/14_FIRST_OUTREACH_TRACKER.md` for the first 15-person validation sprint. The reusable template is `trizla_development_docs/12_OUTREACH_TRACKER_TEMPLATE.md`.
