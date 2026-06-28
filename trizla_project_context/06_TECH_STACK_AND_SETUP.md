# Tech Stack and Setup

## Current Stack

- Vite
- React
- TypeScript
- Simple CSS
- Vitest
- oxlint
- Cloudflare Workers static assets

## Why This Stack

- Fast local development.
- Works as a static app.
- No backend required.
- Easy to deploy from `main`.
- Good fit for a local-first privacy utility.
- Keeps runtime dependencies small.

## Do Not Use in MVP

- Backend database.
- Supabase.
- Firebase.
- Auth provider.
- OpenAI API.
- Claude API.
- Serverless functions.
- Browser extension framework.
- Electron.
- Tauri.
- Analytics SDK.
- External font provider.

Tauri or another offline wrapper can come later only after validation shows users refuse a web version but accept an offline build.

## Local Commands

Install:

```powershell
npm install
```

Run locally:

```powershell
npm run dev
```

Open the Vite URL printed in the terminal. Do not open `index.html` directly.

Verify:

```powershell
npm test
npm run lint
npm run build
```

Preview production build:

```powershell
npm run preview
```

## Project Scripts

Current scripts:

```json
{
  "dev": "vite",
  "build": "tsc -b && vite build",
  "lint": "oxlint .",
  "preview": "vite preview",
  "test": "vitest run"
}
```

## Deployment

Current deployment:

- Host: Cloudflare Workers static assets
- Live URL: `https://trizla.ivanliao41.workers.dev/`
- Build command: `npm run build`
- Output directory: `dist`
- Root directory: project root
- Production branch: `main`
- Environment variables: none

Current production asset notes:

- Favicon URL: `/trizla-favicon.svg`
- Security headers: `public/_headers`
- External fonts: none

## Code Quality Rules

- Put detection logic in pure functions.
- Write tests for redaction and restoration.
- Avoid mixing UI and detection logic.
- No hidden network calls.
- No tracking pasted text.
- Clear naming.
- Keep components and helpers small.

## Current Build Priority

The MVP build is complete. The next priority is outreach validation, not new product features.

Use:

```text
trizla_development_docs/14_FIRST_OUTREACH_TRACKER.md
```

Only build new features after repeated tester evidence.
