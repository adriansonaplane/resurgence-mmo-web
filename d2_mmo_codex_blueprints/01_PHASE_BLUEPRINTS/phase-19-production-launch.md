# Phase 19 Blueprint - Production Launch

    ## Goal

    Release MVP with safe deployment and monitoring.

    ## Codex Implementation Instructions

    - Promote tested Docker images.
- Run production-safe Drizzle migrations.
- Deploy frontend/API/CMS/worker if present to Cloud Run.
- Verify Auth0 production, Stripe live mode, webhook endpoint, domains, Cloud Storage, secrets, Cloud Armor/CDN.
- Run production smoke tests.
- Monitor logs, errors, webhooks, checkout, dashboard, Directus, admin audit.

    ## Required Deliverables

    - `docs/release/production-launch-checklist.md`
- `docs/release/launch-monitoring-notes.md`

    ## Acceptance Criteria

    - Production site reachable through intended domain.
- Checkout/webhook verified in live mode with controlled transaction if appropriate.
- Rollback procedure is ready.

    ## Guardrails

    - Preserve the approved stack from `00_START_HERE/CANONICAL_CONSTRAINTS.md`.
    - Keep secrets out of source control.
    - Add or update tests in the same phase as implementation.
    - Update documentation when introducing new routes, environment variables, schema changes, or external services.
    - Backend HTTP/API tests must use Fastify Inject, not Supertest.
