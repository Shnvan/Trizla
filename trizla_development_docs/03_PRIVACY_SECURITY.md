# Privacy and Security Work Area

## Goal

Keep Trizla trustworthy by preserving the MVP's local-first model, transparent copy, and conservative claims.

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

## Current Data Handling

- Pasted text is processed locally in the browser.
- Redaction actions do not send pasted text to a backend, AI API, analytics tool, or logging service.
- Original text, sanitized text, AI response text, restored text, redaction map, custom terms, and theme state are in memory only.
- Theme toggle works while the tab is open and resets to light on refresh.
- No external font loading is used.
- The deployed app uses self-only security headers from `public/_headers`.

## Storage Rules

Default:

- No persistence.

Allowed later only with explicit user action:

- Session recovery storage for current-tab recovery.
- Saved-term storage for user-approved reusable custom terms.

If persistence exists later, include:

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

## Completed

- [x] Add visible local-only badge.
- [x] Add no-upload statement.
- [x] Add no-account statement.
- [x] Add review-before-copy warning.
- [x] Add compliance disclaimer.
- [x] Add clear/reset action.
- [x] Confirm redaction flow has no backend, AI API, or analytics call.
- [x] Remove external font loading.
- [x] Keep theme state in memory only.

## Acceptance Criteria

- Privacy copy is visible in the app.
- App does not upload pasted text.
- App does not call AI APIs.
- App does not require login.
- App does not persist sensitive data by default.
- Claims are practical and conservative.

## Progress

Status: Implemented and QA-passed before outreach.
