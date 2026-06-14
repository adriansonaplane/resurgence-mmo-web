# Database Testing

The migration integration spec is located at `apps/api/test/integration/migrations.spec.ts`.

By default, `npm run test:integration` loads the spec but skips the Testcontainers case so a normal local run does not require Docker.

To validate migrations against a real PostgreSQL container on Windows PowerShell:

```powershell
$env:RUN_TESTCONTAINERS = 'true'
npm run test:integration
Remove-Item Env:\RUN_TESTCONTAINERS
```

Acceptance intent:

- Apply `apps/api/src/database/migrations/0000_initial.sql` to a fresh Postgres 16 container.
- Verify billing tables such as `stripe_events` and `entitlements` exist.
- Keep backend HTTP/API testing on Fastify Inject; do not add Supertest.
