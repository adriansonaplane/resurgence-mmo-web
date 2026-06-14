# Phase 03 Blueprint - Neon PostgreSQL and Drizzle Foundation

    ## Goal

    Establish database model, migrations, and typed access.

    ## Codex Implementation Instructions

    - Configure Neon development and staging branches/databases.
- Configure pooled runtime URL and direct migration URL.
- Install Drizzle and create drizzle.config.ts.
- Create schema groups/naming: auth, player, store, billing, cms, support, admin, audit, directus.
- Create initial tables listed in DB contract.
- Create database health checks and Testcontainers migration tests.

    ## Required Deliverables

    - `apps/api/src/database/schema/*.ts`
- `apps/api/drizzle.config.ts`
- `apps/api/src/database/drizzle.service.ts`
- `tests/integration/migrations.spec.ts`

    ## Acceptance Criteria

    - Migrations apply cleanly to fresh DB.
- Runtime uses pooled connection.
- Migrations use direct connection.
- Testcontainers validates migrations on real Postgres.

    ## Guardrails

    - Preserve the approved stack from `00_START_HERE/CANONICAL_CONSTRAINTS.md`.
    - Keep secrets out of source control.
    - Add or update tests in the same phase as implementation.
    - Update documentation when introducing new routes, environment variables, schema changes, or external services.
    - Backend HTTP/API tests must use Fastify Inject, not Supertest.
