# QA and Testing Work Area

## Goal

Make redaction and restoration boringly reliable.

The core QA priority is preserving user text structure while replacing and restoring sensitive values correctly.

## Unit Test Areas

- Email detection.
- Phone detection.
- URL detection.
- Money detection.
- Date detection.
- ID detection.
- Custom term detection.
- Duplicate placeholder mapping.
- Sanitization.
- Restoration.
- Unknown placeholder behavior.
- Overlapping detections.

## Required Test Scenarios

Email:

```text
Contact maria.santos@email.com and john@company.co.uk
```

Phone:

```text
Call +63 917 555 0192 or (555) 123-4567.
```

URL:

```text
Visit https://example.com/path and www.company.com.
```

Money:

```text
Expected salary is PHP 85,000/month or $1,200.
```

Date:

```text
Interview date: June 27, 2026. Follow up on 2026-07-01.
```

ID:

```text
Ticket ID: ABC-123456. Order #ORD-998877.
```

Custom term:

```text
Candidate works at BrightPath BPO.
```

Restore:

```text
[PERSON_1] is a strong candidate. Contact [EMAIL_1].
```

Unknown placeholder:

```text
Contact [PERSON_99].
```

## Manual QA Checklist

- [ ] App loads.
- [ ] Sample text fills correctly.
- [ ] Detection finds expected items.
- [ ] User can uncheck an item.
- [ ] Unchecked item is not redacted.
- [ ] User can remove a detection.
- [ ] User can add a custom term.
- [ ] Custom term is redacted.
- [ ] Copy sanitized text works.
- [ ] Restore output works.
- [ ] Copy restored output works.
- [ ] Clear button works.
- [ ] No console errors.
- [ ] App remains usable with 20,000 characters.
- [ ] Mobile layout is usable enough.

## Privacy QA Checklist

- [ ] No backend call for pasted text.
- [ ] No AI API call.
- [ ] No analytics event with pasted text.
- [ ] No error reporting with pasted text.
- [ ] No local storage unless explicit.
- [ ] Delete local data button works if storage exists.
- [ ] Privacy disclaimer is visible.
- [ ] App works offline after page load.
- [ ] No network requests happen during redaction.

## Browser Coverage

Minimum:

- Chrome desktop.
- Edge desktop.
- Safari if available.
- Mobile Chrome basic layout.
- Mobile Safari basic layout.

## Test Data Rule

Use fake sample data only. Do not test with real medical, legal, financial, or highly sensitive data.

## TODO

- [ ] Add Vitest setup.
- [ ] Add redaction engine unit tests.
- [ ] Add restore tests.
- [ ] Add overlap tests.
- [ ] Add basic UI smoke tests if practical.
- [ ] Run build before sharing with users.
- [ ] Run manual QA checklist before outreach.

## Progress

Status: Not started.
