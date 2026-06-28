# Database Work Area - Deferred

## MVP Decision

There is no database in Trizla v0.1.

This file documents storage guardrails and future triggers. It is not an active implementation plan.

## Prohibited in MVP

- Cloud database.
- Supabase.
- Firebase.
- Hosted Postgres.
- Remote document storage.
- User accounts tied to saved redaction data.
- Persisting pasted source text by default.
- Persisting AI response text by default.

## Current Data Model

Keep these values in memory only:

- Original text.
- Sanitized text.
- AI response text.
- Restored text.
- Redaction map.
- Custom terms.
- Theme state.

This data disappears when the user clears it, reloads, closes the tab, or navigates away.

## Optional Persistence Later

Only with explicit user action:

- Saved custom terms.
- Local profiles.
- Local-only preferences.
- Current-tab recovery.

Preferred storage order:

1. In-memory state for MVP.
2. Session-only recovery storage if users repeatedly ask for reload recovery.
3. Explicit saved-term storage after opt-in.
4. Larger browser database storage only if local sessions become too large for simpler storage.

## Delete Data Requirement

If any browser persistence is used, include:

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

## Completed

- [x] Do not add database dependencies during MVP.
- [x] Keep redaction session data in memory by default.
- [x] Keep custom terms in memory by default.
- [x] Keep theme state in memory only.

## Still Required

- [ ] Ask before adding any persistent storage.
- [ ] Add delete-local-data UX if persistence is introduced.

## Progress

Status: Deferred by design.

Notes:

- No database exists and none should be created before validation proves a need.
