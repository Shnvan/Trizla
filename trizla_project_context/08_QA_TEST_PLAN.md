# QA and Test Plan

## Testing Philosophy

Trizla must be boringly reliable for text replacement.

The biggest product risk is not fancy UI. It is corrupting the user's text or failing to restore placeholders.

## Current QA Status

- Automated tests: 58 passing.
- Lint: passing.
- Build: passing.
- Live manual QA: passed before outreach.
- Live URL: `https://trizla.ivanliao41.workers.dev/`

## Unit Tests

Covered areas:

- Email detection.
- Phone detection.
- URL detection.
- Money detection.
- Date detection.
- ID detection.
- Custom term detection.
- Duplicate placeholder mapping.
- Preserve formatting.
- Overlap handling.
- Restore.
- Unknown placeholder behavior.
- Custom-term restore casing.

## Required Commands Before Sharing Changes

```powershell
npm test
npm run lint
npm run build
```

## Manual QA Checklist

Before sharing new changes with users:

- [x] App loads.
- [x] Sample text fills correctly.
- [x] Detection finds expected items.
- [x] User can uncheck item.
- [x] Unchecked item is not redacted.
- [x] User can remove a detection.
- [x] User can add custom term.
- [x] Custom term is redacted and restored.
- [x] Copy sanitized text works.
- [x] Restore output works.
- [x] Copy restored output works.
- [x] Clear all works.
- [x] FAQ details open and close.
- [x] Header How it works link scrolls.
- [x] Mobile layout is usable around 375px.
- [x] Long text remains usable enough.
- [x] No console errors during core flow.

## Privacy QA Checklist

- [x] No backend call for pasted text.
- [x] No AI API call.
- [x] No analytics event with text.
- [x] No error reporting with text.
- [x] No persistent browser storage by default.
- [x] Privacy disclaimer visible.
- [x] Trust badges visible.
- [x] No network requests during redaction actions.
- [x] No external font calls.

## Browser Testing

Test at minimum after major UI changes:

- Chrome desktop.
- Edge desktop.
- Safari if available.
- Mobile Chrome basic layout.
- Mobile Safari basic layout.

## Test Data

Use fake sample data only during development.

Do not test with real medical, legal, financial, or highly sensitive data.

## Outreach QA Rule

For the first validation sprint, every reported bug should be reproduced on the live app before it is marked real.
