# Master Prompt to Send to Codex / Claude Code

Use this prompt only when handing the current project to a future coding agent.

```text
You are helping me maintain Trizla.

Read trizla_development_docs first, then use trizla_project_context as the source archive.

Current product:
Trizla is a local-first web app that sanitizes sensitive text before users paste it into ChatGPT, Claude, Gemini, Perplexity, or other AI tools. It detects likely sensitive info locally, replaces approved detections with stable placeholders, lets users copy the sanitized prompt, then restores placeholders after the AI response.

Current state:
- Vite React + TypeScript app is implemented.
- Redaction engine is implemented in pure TypeScript functions.
- Custom terms, review controls, sanitization, restore, copy, FAQ, and validation CTA are implemented.
- Visual direction is cream/chartreuse brutalist UI.
- Theme toggle is in memory only and resets to light on refresh.
- No external font loading.
- Deployed at https://trizla.ivanliao41.workers.dev/
- QA passed with 58 automated tests.
- First outreach sprint is ready.

Hard constraints:
- No backend.
- No login.
- No cloud database.
- No AI API calls.
- No uploading pasted text anywhere.
- No server-side processing.
- No browser extension yet.
- No desktop app yet.
- No payments yet.
- Store nothing by default.
- Do not claim legal/compliance/HIPAA/GDPR guarantees.
- Manual review must be central.

Current priority:
Do not build new features. Help run the first outreach validation sprint and track results in trizla_development_docs/14_FIRST_OUTREACH_TRACKER.md. Only fix bugs that block the validated core workflow.

Before any change:
npm test
npm run lint
npm run build
```
