# Tech Stack and Setup

## Recommended stack

Use this unless there is a strong reason not to:

- Vite
- React
- TypeScript
- Tailwind CSS
- Vitest
- React Testing Library
- ESLint
- Prettier

## Why this stack

- Fast to scaffold.
- Easy for Codex/Claude Code to modify.
- Works as a static app.
- Can deploy for free.
- No backend required.
- Good for a local-first privacy utility.

## Alternative stack

Next.js is okay, but avoid server features for MVP.

If using Next.js:

- Use static export if possible.
- Do not create API routes.
- Do not send pasted text to server actions.
- Keep all redaction code client-side.

## Do not use in MVP

- Backend database
- Supabase
- Firebase
- Auth.js
- OpenAI API
- Claude API
- Serverless functions
- Browser extension framework
- Electron
- Tauri

Tauri can come later after validation.

## Suggested setup commands

For Vite:

```bash
npm create vite@latest redactkit -- --template react-ts
cd redactkit
npm install
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
npm install tailwindcss @tailwindcss/vite
```

Adjust commands based on package versions and project setup.

## Project scripts

Expected scripts:

```json
{
  "dev": "vite",
  "build": "tsc -b && vite build",
  "preview": "vite preview",
  "test": "vitest",
  "lint": "eslint ."
}
```

## Package choices

Keep dependencies minimal.

Allowed useful packages:

- `nanoid` for IDs, optional
- `clsx` for class names, optional
- `lucide-react` for icons, optional

Avoid heavy NER libraries in v0.1 unless necessary.

## Deployment

Recommended:

- Vercel free
- Netlify free
- Cloudflare Pages free

Important:

- The app can be deployed statically.
- No environment variables should be required.
- It should still work if downloaded as static files.

## Offline version

After v0.1 works:

- Provide a downloadable `.html` or zipped static build.
- Explain that users can open it locally.
- This increases trust for privacy-sensitive testers.

## Code quality rules

- Put detection logic in pure functions.
- Write tests for redaction and restoration.
- Avoid mixing UI and detection logic.
- No hidden network calls.
- No tracking pasted text.
- Clear naming.
- Small components.

## Build priority

Build in this order:

1. UI shell
2. Text input
3. Regex detectors
4. Review panel
5. Placeholder map
6. Sanitized output
7. Copy button
8. Restore flow
9. Custom terms
10. Tests
11. Privacy/FAQ page
12. Landing page polish
