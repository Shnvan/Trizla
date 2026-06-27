# Backend Work Area - Deferred

## MVP Decision

There is no backend in Trizla v0.1.

This file exists to prevent accidental backend scope creep and to document future triggers. It is not an active implementation plan.

## Prohibited in MVP

- API routes.
- Server actions for redaction.
- Server-side text processing.
- Authentication.
- Accounts.
- Team admin.
- Cloud sync.
- Serverless functions.
- AI API proxying.
- Payment webhooks.
- Background jobs.

## Reason

The MVP promise is local-first redaction before a user pastes text into third-party AI tools. A backend would add trust risk, implementation complexity, and scope before the core behavior is validated.

## Allowed MVP Behavior

- Static app hosting.
- Client-side React.
- Client-side redaction engine.
- Static privacy/FAQ content.
- No environment variables required.

## Future Backend Triggers

Consider backend work only after validation shows a clear need for:

- Paid accounts.
- Team sharing.
- License management.
- Cloud-synced settings.
- Organization admin.
- Server-side billing integration.

Even then, pasted user text should remain local unless the product direction changes explicitly.

## TODO

- [ ] Do not create backend code during v0.1.
- [ ] Review future feature requests against local-first promise.
- [ ] Ask before adding any API, auth, or server-side processing.

## Progress

Status: Deferred.

Notes:

- No backend exists and none should be created for MVP.
