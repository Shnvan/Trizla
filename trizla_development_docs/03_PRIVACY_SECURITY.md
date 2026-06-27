# Privacy and Security Work Area

## Goal

Make Trizla trustworthy by keeping the MVP local-first, transparent, and conservative in its claims.

The product reduces accidental exposure before users paste text into third-party AI tools. It is not compliance software.

## Privacy Promise

Use this copy:

```text
Trizla runs locally in your browser. Your pasted text is not uploaded by Trizla.
```

Also use:

```text
Runs locally in your browser. Text is not uploaded by Trizla.
```

## Do Not Claim

- `100% secure`
- `Fully anonymous`
- `GDPR compliant`
- `HIPAA compliant`
- `Legal-safe`
- `Perfect anonymization`
- `Enterprise-grade security`

## Data Handling Rules

- Process pasted text locally.
- Store nothing by default.
- Keep original text, sanitized text, AI response text, restored text, and redaction map in memory by default.
- Never send pasted text to logs, analytics, error reporting, or external APIs.
- Avoid third-party scripts inside the app page.
- Make every saved item explicit if persistence is ever added.

## Storage Rules

Default:

- No persistence.

Allowed later only with explicit user action:

- `sessionStorage` for current-session recovery.
- `localStorage` for saved custom terms.

If persistence exists, include:

- `Delete all local data` button.
- Confirmation copy:

```text
This removes saved profiles, custom terms, and current redaction sessions from this browser.
```

- Success copy:

```text
Local data deleted.
```

Storage warning:

```text
Saved terms are stored only in this browser. Anyone with access to this device/browser profile may be able to see them.
```

## Required Disclaimer

```text
Trizla is not legal, compliance, or security certification software. It does not guarantee complete anonymization. Always review redactions before using sensitive text with third-party tools.
```

## Threat Model

In scope:

- Accidental pasting of names, emails, phone numbers, client names, or company names into AI tools.
- Manual redaction mistakes.
- Repeated find-and-replace workflows.
- Restoring placeholders after AI output.

Out of scope:

- Device compromise.
- Browser extension spying.
- Network-level compromise.
- Regulated medical, legal, financial, or government workflows.
- Enterprise audit, admin, or certification requirements.

## TODO

- [ ] Add visible local-only badge.
- [ ] Add no-upload statement.
- [ ] Add no-account statement.
- [ ] Add review-before-copy warning.
- [ ] Add compliance disclaimer.
- [ ] Add clear/reset action.
- [ ] Add delete-local-data action if persistence is added.
- [ ] Confirm redaction flow has no network calls.
- [ ] Confirm no analytics event contains user text.

## Acceptance Criteria

- Privacy copy is visible in the app.
- App does not upload pasted text.
- App does not call AI APIs.
- App does not require login.
- App does not persist sensitive data by default.
- Claims are practical and conservative.

## Progress

Status: Not started.
