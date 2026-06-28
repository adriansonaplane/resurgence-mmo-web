# Phase Completion Checklist

Before declaring any phase complete:

- [ ] Code compiles.
- [ ] Lint passes.
- [ ] Typecheck passes.
- [ ] Relevant unit tests pass.
- [ ] Relevant integration/API tests pass.
- [ ] `.env.example` updated for new variables.
- [ ] API docs updated for new routes.
- [ ] Drizzle migrations added for schema changes.
- [ ] Audit logging added for sensitive changes.
- [ ] No secrets committed.
- [ ] No Supertest usage added.
- [ ] No Express-only middleware added.
- [ ] Game backend boundary preserved.

## Companion Boundary Checklist

For each relevant phase, confirm:

- No game-authoritative simulation logic was added to the web platform.
- Account Service or service-boundary contracts are used for cross-boundary operations.
- Website database remains separate from the game runtime database.
- Direct game-critical mutations are prohibited.
- Admin-sensitive actions are RBAC-protected and audited.
- Directus content scope does not include authoritative gameplay configuration.
- Public website/support/documentation/profile surfaces are represented as required by phase scope.
