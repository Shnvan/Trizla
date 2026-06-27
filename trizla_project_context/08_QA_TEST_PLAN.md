# QA and Test Plan

## Testing philosophy

Trizla must be boringly reliable for text replacement.

The biggest product risk is not fancy UI. It is corrupting the user’s text or failing to restore placeholders.

## Unit tests

### Email detection

Input:

```text
Contact maria.santos@email.com and john@company.co.uk
```

Expected:

- `maria.santos@email.com`
- `john@company.co.uk`

### Phone detection

Input:

```text
Call +63 917 555 0192 or (555) 123-4567.
```

Expected:

- `+63 917 555 0192`
- `(555) 123-4567`

### URL detection

Input:

```text
Visit https://example.com/path and www.company.com.
```

Expected:

- `https://example.com/path`
- `www.company.com`

### Money detection

Input:

```text
Expected salary is ₱85,000/month or $1,200.
```

Expected:

- `₱85,000`
- `$1,200`

### Date detection

Input:

```text
Interview date: June 27, 2026. Follow up on 2026-07-01.
```

Expected:

- `June 27, 2026`
- `2026-07-01`

### ID detection

Input:

```text
Ticket ID: ABC-123456. Order #ORD-998877.
```

Expected:

- `ABC-123456`
- `ORD-998877`

### Custom term detection

Custom term:

```text
BrightPath BPO
```

Input:

```text
Candidate works at BrightPath BPO.
```

Expected:

- `BrightPath BPO`

## Redaction tests

### Duplicate mapping

Input:

```text
Maria emailed maria@email.com. Maria will reply tomorrow.
```

Expected:

- Both `Maria` references use `[PERSON_1]` if detected/added.
- Email uses `[EMAIL_1]`.

### Preserve formatting

Input:

```text
Name: Maria Santos
Email: maria@email.com

Notes:
- Strong English
- Expected ₱85,000
```

Expected:

- Line breaks preserved.
- Bullets preserved.
- Labels preserved.

### Overlap handling

If one detector finds `maria@email.com` and another finds `email.com`, keep only the better/high-confidence match.

### Restore test

Redaction map:

```text
[PERSON_1] => Maria Santos
[EMAIL_1] => maria@email.com
```

AI output:

```text
[PERSON_1] is a strong candidate. Contact [EMAIL_1].
```

Expected:

```text
Maria Santos is a strong candidate. Contact maria@email.com.
```

### Unknown placeholder

AI output:

```text
Contact [PERSON_99].
```

Expected:

```text
Contact [PERSON_99].
```

## Manual QA checklist

Before sharing with users:

- [ ] App loads.
- [ ] Sample text fills correctly.
- [ ] Detection finds expected items.
- [ ] User can uncheck item.
- [ ] Unchecked item is not redacted.
- [ ] User can add custom term.
- [ ] Custom term is redacted.
- [ ] Copy sanitized text works.
- [ ] Restore output works.
- [ ] Clear button works.
- [ ] No console errors.
- [ ] App works after internet is disabled once loaded.
- [ ] No network requests happen during redaction.
- [ ] Mobile layout is usable enough.
- [ ] Long text does not freeze badly.

## Privacy QA checklist

- [ ] No backend call for pasted text.
- [ ] No AI API call.
- [ ] No analytics event with text.
- [ ] No error reporting with text.
- [ ] No local storage unless explicit.
- [ ] Delete local data button works if storage exists.
- [ ] Privacy disclaimer visible.

## Browser testing

Test at minimum:

- Chrome desktop
- Edge desktop
- Safari if available
- Mobile Chrome basic layout
- Mobile Safari basic layout

## Test data

Use fake sample data only during development.

Do not test with real medical, legal, financial, or highly sensitive data.
