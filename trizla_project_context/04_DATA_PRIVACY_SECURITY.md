# Data, Privacy, and Security Notes

## Privacy Promise

Primary promise:

> Trizla runs locally in your browser. Your pasted text is not uploaded by Trizla.

Do not say:

- "100% secure"
- "Fully anonymous"
- "GDPR compliant"
- "HIPAA compliant"
- "Legal-safe"
- "Perfect anonymization"
- "Enterprise-grade security"

## Current Data Handling Principles

1. Minimize data.
2. Process locally.
3. Store nothing by default.
4. Make every saved item explicit if persistence is added later.
5. Avoid third-party scripts inside the app.
6. Never send pasted text to logs or analytics.
7. Use local/system fonts only.

## Current MVP Data Model

By default, keep data only in memory:

- Original text.
- Sanitized text.
- AI response text.
- Restored text.
- Redaction map.
- Custom terms.
- Theme state.

This data disappears when:

- User clears it.
- User reloads page.
- User closes tab.

## Optional Future Persistence

Only after explicit user action and validated need:

- Saved custom terms.
- Profiles.
- Local-only preferences.
- Current-tab recovery.

## Persistence Warning Copy

Use this if adding persistence:

> Saved terms are stored only in this browser. Anyone with access to this device/browser profile may be able to see them.

## Delete All Data

If browser persistence is added later, include:

- Button: "Delete all local data"
- Confirmation: "This removes saved profiles, custom terms, and current redaction sessions from this browser."
- Success message: "Local data deleted."

## Compliance Disclaimer

Use this copy:

> Trizla is not legal, compliance, or security certification software. It does not guarantee complete anonymization. Always review redactions before using sensitive text with third-party tools.

## Threat Model for MVP

### In Scope

- Accidental pasting of names/emails/phones/client names into AI tools.
- Manual redaction mistakes.
- Repeated find-and-replace workflows.
- Restoring placeholders after AI output.

### Out of Scope

- Malicious users.
- Device compromise.
- Browser extension spying.
- Network-level compromise.
- Legal compliance certification.
- Medical/legal/financial regulated workflows.
- Enterprise admin or audit logs.

## Current User Trust Features

- "Local only" badge.
- "No upload by Trizla" statement.
- "No account required" statement.
- "Review before copy" workflow.
- Clear all button.
- "Not compliance software" disclaimer.
- Self-only security headers in `public/_headers`.

## Sensitive Categories Detected

High priority:

- Email addresses.
- Phone numbers.
- URLs.
- Names.
- Company names.
- Money amounts.
- Dates.
- IDs/order numbers.
- Custom terms.

Later:

- Addresses.

## Sensitive Categories to Avoid in Early Marketing

Avoid positioning around:

- Medical records.
- Legal case files.
- Financial statements.
- Government IDs.
- Children's data.
- Regulated HR compliance decisions.

## Safe Market Positioning

Good:

- Recruiters preparing candidate summaries.
- Freelancers cleaning client briefs.
- Agencies sanitizing client reports.
- VAs summarizing customer emails.
- Researchers anonymizing interview snippets before ideation.

Riskier:

- Hospitals.
- Law firms.
- Banks.
- Insurance claims.
- Regulated compliance workflows.

## Privacy FAQ

### Does Trizla upload my text?

No. The MVP is designed to run in your browser. Redaction happens locally.

### Does Trizla use OpenAI or Claude APIs?

No. The MVP does not call AI APIs. It prepares text before you use whichever AI tool you choose.

### Is Trizla compliance software?

No. It is a practical local redaction helper. It does not guarantee compliance or complete anonymization.

### Can Trizla miss sensitive information?

Yes. Detection can miss things or mark false positives. Always review before copying.

### Can I delete my data?

Yes. The Clear all action wipes the current in-memory text, detections, custom terms, AI response, and restored output.
