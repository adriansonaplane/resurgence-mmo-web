# Phase 00 Blueprint - Architecture Confirmation and Delivery Targets

    ## Goal

    Freeze MVP target and convert constraints into executable implementation targets.

    ## Codex Implementation Instructions

    - Create MVP scope checklist for public website, account dashboard, storefront, CMS, admin, and deployment readiness.
- Create service naming sheet for website-frontend, website-api, website-cms, website-worker.
- Create environment matrix for local, staging, production.
- Create ADR checklist for Angular SSR, NestJS Fastify, Neon, Drizzle, Directus, Auth0/OAuth/OIDC, Stripe, Cloud Run, GitHub Actions, Fastify Inject.
- Define route ownership for frontend, API, CMS, and Stripe webhook endpoints.

    ## Required Deliverables

    - `docs/mvp-scope.md`
- `docs/service-naming.md`
- `docs/environment-matrix.md`
- `docs/adr/README.md`

    ## Acceptance Criteria

    - MVP and post-MVP scope are explicit.
- Every major stack decision is represented in ADR backlog.
- No implementation plan assumes Express or Supertest.

    ## Guardrails

    - Preserve the approved stack from `00_START_HERE/CANONICAL_CONSTRAINTS.md`.
    - Keep secrets out of source control.
    - Add or update tests in the same phase as implementation.
    - Update documentation when introducing new routes, environment variables, schema changes, or external services.
    - Backend HTTP/API tests must use Fastify Inject, not Supertest.
