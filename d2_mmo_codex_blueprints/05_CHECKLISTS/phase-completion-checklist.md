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
