# Phase 18 Blueprint - Staging Release Candidate

    ## Goal

    Prove complete MVP in staging before production.

    ## Codex Implementation Instructions

    - Deploy frontend/API/CMS/worker to staging.
- Run Drizzle migrations against staging.
- Seed Directus content and storefront products.
- Configure Auth0 staging and Stripe test-mode webhooks.
- Run full GitHub Actions suite.
- Run Playwright staging smoke tests against real URLs.
- Manually verify public site, dashboard, checkout, webhook, entitlement, admin, Directus, audit.

    ## Required Deliverables

    - `docs/release/staging-rc-checklist.md`
- `docs/release/smoke-test-report.md`

    ## Acceptance Criteria

    - E2E works: content -> Angular -> Auth0 -> checkout -> webhook -> order -> entitlement -> dashboard.
- No critical security/payment/entitlement defects.
- Production approval only after staging signoff.

    ## Guardrails

    - Preserve the approved stack from `00_START_HERE/CANONICAL_CONSTRAINTS.md`.
    - Keep secrets out of source control.
    - Add or update tests in the same phase as implementation.
    - Update documentation when introducing new routes, environment variables, schema changes, or external services.
    - Backend HTTP/API tests must use Fastify Inject, not Supertest.
