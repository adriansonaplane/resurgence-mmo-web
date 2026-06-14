# Phase 16 Blueprint - Security, Edge, Secrets, Production Hardening

    ## Goal

    Prepare for external testing and public exposure.

    ## Codex Implementation Instructions

    - Enable Secret Manager for all runtime secrets.
- Configure strict CORS by environment.
- Enable Helmet/security headers via Fastify plugins.
- Rate limit contact, checkout, webhook, account, admin endpoints.
- Configure Cloud Load Balancer, Cloud CDN, Cloud Armor.
- Define least-privilege service accounts.
- Document Neon/Directus/Storage backup and recovery.
- Create incident response and rollback procedure.

    ## Required Deliverables

    - `docs/security/hardening.md`
- `infra/load-balancer-cdn-armor/*`
- `docs/operations/rollback.md`

    ## Acceptance Criteria

    - Production secrets not in repo/logs.
- Admin/payment endpoints protected and audited.
- Rollback steps tested in staging.

    ## Guardrails

    - Preserve the approved stack from `00_START_HERE/CANONICAL_CONSTRAINTS.md`.
    - Keep secrets out of source control.
    - Add or update tests in the same phase as implementation.
    - Update documentation when introducing new routes, environment variables, schema changes, or external services.
    - Backend HTTP/API tests must use Fastify Inject, not Supertest.
