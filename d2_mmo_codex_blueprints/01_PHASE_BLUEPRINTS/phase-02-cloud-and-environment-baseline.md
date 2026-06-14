# Phase 02 Blueprint - Cloud and Environment Baseline

    ## Goal

    Prepare Google Cloud hosting and environment separation before business features.

    ## Codex Implementation Instructions

    - Create cloud resource naming docs for staging/production.
- Define Artifact Registry image names for website-frontend, website-api, website-cms, website-worker.
- Create Cloud Run service specs with PORT binding and 0.0.0.0 host requirement.
- Create Secret Manager key map for Neon, Auth0, Stripe, Directus, email, Sentry.
- Create Cloud Storage bucket plan for public assets, private assets, Directus uploads, downloads.
- Plan Load Balancer, CDN, Armor routing.

    ## Required Deliverables

    - `infra/cloud-run/service-map.md`
- `infra/secrets/secret-map.md`
- `infra/storage/bucket-map.md`

    ## Acceptance Criteria

    - Placeholder containers can deploy to Cloud Run.
- Services read PORT and bind 0.0.0.0.
- No secrets in source control.

    ## Guardrails

    - Preserve the approved stack from `00_START_HERE/CANONICAL_CONSTRAINTS.md`.
    - Keep secrets out of source control.
    - Add or update tests in the same phase as implementation.
    - Update documentation when introducing new routes, environment variables, schema changes, or external services.
    - Backend HTTP/API tests must use Fastify Inject, not Supertest.
