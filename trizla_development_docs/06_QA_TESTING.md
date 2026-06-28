# QA and Testing Work Area

## Goal

Make redaction and restoration boringly reliable.

The core QA priority is preserving user text structure while replacing and restoring sensitive values correctly.

## Current QA State

- Automated test suite passes with 58 tests.
- Lint passes.
- Production build passes.
- Live manual QA passed before outreach.
- Live URL: `https://trizla.ivanliao41.workers.dev/`

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
- Case-insensitive custom-term restore casing.

## Required Commands

```powershell
npm test
npm run lint
npm run build
```

## Completed Manual QA Checklist

- [x] App loads.
- [x] Sample text fills correctly.
- [x] Detection finds expected items.
- [x] User can uncheck an item.
- [x] Unchecked item is not redacted.
- [x] User can remove a detection.
- [x] User can add a custom term.
- [x] Custom term is redacted.
- [x] Copy sanitized text works.
- [x] Restore output works.
- [x] Copy restored output works.
- [x] Clear all works.
- [x] FAQ opens and closes.
- [x] Header How it works link scrolls correctly.
- [x] Mobile layout is usable around 375px.
- [x] App remains usable with a 20,000-character paste.

## Completed Privacy QA Checklist

- [x] No backend call for pasted text.
- [x] No AI API call.
- [x] No analytics event with pasted text.
- [x] No error reporting with pasted text.
- [x] No persistent browser storage by default.
- [x] Privacy disclaimer is visible.
- [x] Trust badges are visible.
- [x] Redaction still works after page load.
- [x] No network requests happen during redaction actions.

## Browser Coverage

Minimum before major updates:

- Chrome desktop.
- Edge desktop.
- Safari if available.
- Mobile Chrome basic layout.
- Mobile Safari basic layout.

## Test Data Rule

Use fake sample data only. Do not test with real medical, legal, financial, or highly sensitive data.

## Outreach QA Rule

During the first outreach sprint, reproduce every reported issue on the live URL before marking it as a real product bug. Do not build speculative fixes from one-off confusion unless the issue blocks the core workflow.

## Progress

Status: QA complete for first outreach. Continue QA only for reported issues and future changes.
