# Data, Privacy, and Security Notes

## Privacy promise

Primary promise:

> RedactKit runs locally in your browser. Your pasted text is not uploaded by RedactKit.

Do not say:

- “100% secure”
- “Fully anonymous”
- “GDPR compliant”
- “HIPAA compliant”
- “Legal-safe”
- “Perfect anonymization”
- “Enterprise-grade security”

## Data handling principles

1. Minimize data.
2. Process locally.
3. Store nothing by default.
4. Make every saved item explicit.
5. Let the user delete all local data.
6. Avoid third-party scripts inside the app.
7. Never send pasted text to logs or analytics.

## MVP data model

By default, keep data only in memory:

- Original text
- Sanitized text
- AI response text
- Restored text
- Redaction map

This data disappears when:

- User clears it.
- User reloads page.
- User closes tab.

Optional user-enabled storage:

- Custom terms
- Profiles
- Local-only preferences

## Local storage warning copy

Use this if adding persistence:

> Saved terms are stored only in this browser. Anyone with access to this device/browser profile may be able to see them.

## Delete all data

If localStorage/sessionStorage/IndexedDB is used, include:

- Button: “Delete all local data”
- Confirmation: “This removes saved profiles, custom terms, and current redaction sessions from this browser.”
- Success message: “Local data deleted.”

## Compliance disclaimer

Use this copy:

> RedactKit is not legal, compliance, or security certification software. It does not guarantee complete anonymization. Always review redactions before using sensitive text with third-party tools.

## Threat model for MVP

### In scope

- Accidental pasting of names/emails/phones/client names into AI tools.
- Manual redaction mistakes.
- Repeated find-and-replace workflows.
- Restoring placeholders after AI output.

### Out of scope

- Malicious users.
- Device compromise.
- Browser extension spying.
- Network-level compromise.
- Legal compliance certification.
- Medical/legal/financial regulated workflows.
- Enterprise admin or audit logs.

## User trust features

Include these visible trust features:

- “Local only” badge
- “No upload” statement
- “No account required” statement
- “Review before copy” workflow
- “Delete local data” button
- “Not compliance software” disclaimer

## Sensitive categories to detect

High priority:

- Email addresses
- Phone numbers
- URLs
- Names
- Company names
- Money amounts
- Dates
- IDs/order numbers
- Addresses later
- Custom terms

## Sensitive categories to avoid in early marketing

Avoid positioning around:

- Medical records
- Legal case files
- Financial statements
- Government IDs
- Children’s data
- Regulated HR compliance decisions

## Safe market positioning

Good:

- Recruiters preparing candidate summaries
- Freelancers cleaning client briefs
- Agencies sanitizing client reports
- VAs summarizing customer emails
- Researchers anonymizing interview snippets before ideation

Riskier:

- Hospitals
- Law firms
- Banks
- Insurance claims
- Regulated compliance workflows

## Privacy FAQ

### Does RedactKit upload my text?

No. The MVP is designed to run in your browser. Redaction happens locally.

### Does RedactKit use OpenAI or Claude APIs?

No. The MVP does not call AI APIs. It prepares text before you use whichever AI tool you choose.

### Is RedactKit compliance software?

No. It is a practical local redaction helper. It does not guarantee compliance or complete anonymization.

### Can RedactKit miss sensitive information?

Yes. Detection can miss things or mark false positives. Always review before copying.

### Can I delete my data?

Yes. The MVP should include a clear data deletion option if any local storage is used.
