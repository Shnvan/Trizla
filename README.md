# Trizla

Trizla is a local-first web app for sanitizing sensitive text before pasting it into AI tools, then restoring placeholders after the AI response.

The MVP flow is:

1. Paste source text.
2. Detect sensitive values locally.
3. Review, uncheck, remove, or add custom terms.
4. Copy sanitized text with stable placeholders.
5. Paste an AI response containing placeholders.
6. Restore placeholders locally.

## MVP Constraints

- No backend.
- No authentication.
- No database.
- No AI API.
- No storage by default.
- No uploaded pasted text.
- No analytics or telemetry for pasted text.
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

## Verification

Run these before sharing the app:

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

Vite will serve the built app from `dist` and print a local preview URL.

## Static Deployment

Trizla deploys as a static Vite app.

- Build command: `npm run build`
- Output directory: `dist`
- Environment variables: none
- Suitable hosts: Vercel, Netlify, Cloudflare Pages

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

Use `trizla_development_docs/12_OUTREACH_TRACKER_TEMPLATE.md` to track recruiter outreach, prototype trials, repeat usage, and payment commitment signals.
