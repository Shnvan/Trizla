# Database Work Area - Deferred

## MVP Decision

There is no database in RedactKit v0.1.

This file exists to document storage guardrails and future triggers. It is not an active implementation plan.

## Prohibited in MVP

- Cloud database.
- Supabase.
- Firebase.
- Hosted Postgres.
- Remote document storage.
- User accounts tied to saved redaction data.
- Persisting pasted source text by default.
- Persisting AI response text by default.

## Default Data Model

Keep these values in memory only:

- Original text.
- Sanitized text.
- AI response text.
- Restored text.
- Redaction map.

This data should disappear when the user clears it, reloads, closes the tab, or navigates away.

## Optional Local Storage Later

Only with explicit user action:

- Custom terms.
- Local profiles.
- Local-only preferences.

Preferred storage order:

1. In-memory state for MVP.
2. `sessionStorage` if session recovery is needed.
3. `localStorage` for saved terms only after explicit opt-in.
4. IndexedDB only if local sessions become too large.

## Delete Data Requirement

If any browser storage is used, include:

- Delete all local data button.
- Confirmation message.
- Success message.
- Clear documentation that saved data is visible to anyone with access to the browser profile.

## Future Database Triggers

Consider a database only after validation proves:

- Users pay for the product.
- Users request cross-device saved profiles.
- Team workflows become necessary.
- Cloud sync is worth the privacy tradeoff.

## TODO

- [ ] Do not add database dependencies during MVP.
- [ ] Keep redaction session data in memory by default.
- [ ] Ask before adding any persistent storage.
- [ ] Add delete-local-data UX if persistence is introduced.

## Progress

Status: Deferred.

Notes:

- No database exists and none should be created for MVP.
