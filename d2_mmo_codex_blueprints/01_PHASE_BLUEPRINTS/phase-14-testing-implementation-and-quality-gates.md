# Phase 14 Blueprint - Testing Implementation and Quality Gates

    ## Goal

    Make approved testing stack executable and mandatory.

    ## Codex Implementation Instructions

    - Add frontend Jest tests for utilities/services.
- Add Angular Testing Utilities tests for components, guards, forms, pipes, services.
- Add Playwright tests for public pages, auth redirects, storefront, dashboard, admin protection, checkout initiation.
- Add backend Jest tests for services, guards, payment/entitlement/audit logic, Drizzle repos.
- Add Fastify Inject tests for health, auth, products, contact, checkout, webhook, admin protection.
- Add Testcontainers tests for migrations, Drizzle queries, transactions, webhooks, audit.
- Reject Supertest usage.

    ## Required Deliverables

    - `apps/frontend/src/**/*.spec.ts`
- `apps/frontend/e2e/*.spec.ts`
- `apps/api/test/**/*.spec.ts`
- `docs/testing/no-supertest-policy.md`

    ## Acceptance Criteria

    - PRs fail on lint/typecheck/tests.
- Fastify Inject is only backend HTTP test mechanism.
- Testcontainers verifies real Postgres behavior.

    ## Guardrails

    - Preserve the approved stack from `00_START_HERE/CANONICAL_CONSTRAINTS.md`.
    - Keep secrets out of source control.
    - Add or update tests in the same phase as implementation.
    - Update documentation when introducing new routes, environment variables, schema changes, or external services.
    - Backend HTTP/API tests must use Fastify Inject, not Supertest.

## Companion Boundary Update

Add tests or documented test stubs for support portal flows, CMS content routes, Account Service boundary, read-only profile summaries, admin permissions, entitlement handoff, and prohibition of direct game-critical mutations.

Keep Fastify Inject, Jest, Testcontainers, Angular Testing Utilities, Playwright, and Jest as the testing stack.
