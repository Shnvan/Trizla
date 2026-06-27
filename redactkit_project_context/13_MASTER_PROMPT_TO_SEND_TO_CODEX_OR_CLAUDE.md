# Master Prompt to Send to Codex / Claude Code

Copy and paste this prompt into Codex or Claude Code after placing this folder in your project.

```text
You are helping me build RedactKit.

Read every markdown file in this project context folder before coding.

Product:
RedactKit is a local-first web app that sanitizes sensitive text before users paste it into ChatGPT, Claude, Gemini, Perplexity, or other AI tools. It detects likely sensitive info locally, replaces approved detections with stable placeholders, lets users copy the sanitized prompt, then restores placeholders after the AI response.

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

Build:
A React + TypeScript MVP with a clean UI.

Core features:
1. Large textarea for original text.
2. Local detection for:
   - emails
   - phone numbers
   - URLs
   - money amounts
   - dates
   - long IDs/order IDs/ticket IDs
   - custom user terms
   - simple label-based person/company detection if feasible
3. Review panel where user can enable/disable detections.
4. Manual custom term entry.
5. Stable placeholders like [PERSON_1], [EMAIL_1], [PHONE_1], [COMPANY_1], [MONEY_1], [DATE_1], [URL_1], [ID_1], [CUSTOM_1].
6. Sanitized output.
7. Copy sanitized text button.
8. AI response textarea.
9. Restore placeholders button.
10. Restored output.
11. Copy restored output button.
12. Clear/delete local data button if storage is used.
13. Visible privacy copy:
   “Runs locally in your browser. Text is not uploaded by RedactKit.”
14. Visible disclaimer:
   “RedactKit is not compliance software and does not guarantee complete anonymization. Always review before sharing sensitive text with third-party tools.”

Implementation:
- Put detection/redaction/restore logic in pure TypeScript functions.
- Write tests for the core redaction engine.
- Keep UI simple.
- Avoid unnecessary dependencies.
- Use fake sample candidate data for the demo.
- Ensure the core flow works before polishing.

First task:
Create the app scaffold and implement the core redaction/restore flow. Then run tests and show me exactly what files changed.
```
