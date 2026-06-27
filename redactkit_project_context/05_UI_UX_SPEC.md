# UI/UX Spec — RedactKit MVP

## Design goals

- Boring and trustworthy.
- Fast to understand.
- No scary security theatre.
- No complex dashboards.
- No account wall.
- Clear before/after workflow.
- Manual review is obvious.

## Page structure

### Header

Left:

- RedactKit logo/text

Right:

- “Local only” badge
- “How it works”
- “Clear data”

### Hero / top app copy

Title:

> Sanitize sensitive text before pasting it into AI.

Subtitle:

> Redact names, emails, phone numbers, company names, money amounts, IDs, and custom terms locally in your browser.

Trust line:

> No upload. No account. Review before copy.

### Main app layout

Use a two-column or stacked layout.

Recommended first layout:

1. Original Text
2. Detected Sensitive Info
3. Sanitized Text
4. Restore AI Response

## Screen 1 — Original Text

Label:

> 1. Paste original text

Placeholder:

```text
Paste client notes, candidate profiles, support logs, survey responses, or internal docs here...
```

Buttons:

- Detect sensitive info
- Clear

Small copy:

> Redaction runs locally in your browser.

## Screen 2 — Review Panel

Label:

> 2. Review what will be redacted

Columns:

- Checkbox
- Type
- Original value
- Placeholder
- Source/confidence
- Remove

Empty state:

> No sensitive info detected yet. You can add a custom term manually.

Controls:

- Select all
- Deselect all
- Add custom term

Custom term modal/form:

- Sensitive term
- Type dropdown
- Case sensitive checkbox
- Add

Type dropdown:

- Person
- Company
- Client
- Project
- Email
- Phone
- Money
- Date
- ID
- Custom

## Screen 3 — Sanitized Text

Label:

> 3. Copy sanitized text into your AI tool

Button:

- Copy sanitized text

Success message:

> Copied. You can paste this into ChatGPT, Claude, Gemini, or any AI tool.

Warning:

> Review the sanitized text before using it. RedactKit can miss sensitive information.

## Screen 4 — Restore AI Response

Label:

> 4. Paste the AI response to restore placeholders

Placeholder:

```text
Paste the AI response that contains placeholders like [PERSON_1] and [COMPANY_1]...
```

Button:

- Restore placeholders
- Copy restored output

Success message:

> Placeholders restored locally.

## Footer disclaimer

Use:

> RedactKit is a local redaction helper, not compliance software. It does not guarantee complete anonymization. Always review before sharing sensitive text with third-party tools.

## Example demo text

Use this as default sample:

```text
Please summarize this candidate for the hiring manager:

Maria Santos
Email: maria.santos@email.com
Phone: +63 917 555 0192
Current company: BrightPath BPO
Expected salary: ₱85,000/month
Notes: Strong English, handled healthcare accounts, worried about night shift.
```

Expected sanitized output:

```text
Please summarize this candidate for the hiring manager:

[PERSON_1]
Email: [EMAIL_1]
Phone: [PHONE_1]
Current company: [COMPANY_1]
Expected salary: [MONEY_1]/month
Notes: Strong English, handled healthcare accounts, worried about night shift.
```

## UX details

### Placeholder format

Use uppercase bracketed placeholders.

Good:

- `[PERSON_1]`
- `[EMAIL_1]`

Avoid:

- `{{person_1}}`
- `<redacted>`
- random tokens

Reason:

- Easy for AI tools to preserve.
- Easy for users to understand.
- Easy to restore.

### Confidence labels

Use simple labels:

- High
- Medium
- Low

Do not overcomplicate with percentages in the UI.

### Detection source labels

Use:

- Regex
- Custom
- Heuristic

### False positives

Make false positive removal easy. The user should not feel trapped by the detector.

### Empty states

When no text:

> Paste text to begin.

When no detections:

> No sensitive info detected. Add custom terms if needed.

When restore map missing:

> Restore requires a redaction map from this session.

## Visual style

- Minimal
- Neutral
- Spacious
- Plain language
- Avoid hacker/security aesthetic
- Avoid heavy dark cyber look
- Use calm trust-oriented design

## Accessibility

- Buttons must have clear labels.
- Inputs must have labels.
- Keyboard navigation should work.
- Good contrast.
- Do not rely only on color to show enabled/disabled.
