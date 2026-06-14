# Phase 15 Blueprint - GitHub Actions CI/CD

    ## Goal

    Automate validation, packaging, and deployment.

    ## Codex Implementation Instructions

    - Create PR workflow: install, lint, typecheck, frontend tests, backend Jest, Fastify Inject, Testcontainers, build frontend/API/CMS, Playwright smoke where applicable.
- Create staging workflow: build/push Docker images, deploy Cloud Run services, run Drizzle migrations, run staging smoke tests.
- Create production workflow: manual approval, promote tested images, production-safe migrations, Cloud Run deploy, production smoke, notify team.
- Add GitHub environments and identity/secrets strategy.

    ## Required Deliverables

    - `.github/workflows/pr-checks.yml`
- `.github/workflows/deploy-staging.yml`
- `.github/workflows/deploy-production.yml`

    ## Acceptance Criteria

    - No prod deploy without tests and approval.
- Staging runs migrations and smoke tests.
- Production promotes tested images.

    ## Guardrails

    - Preserve the approved stack from `00_START_HERE/CANONICAL_CONSTRAINTS.md`.
    - Keep secrets out of source control.
    - Add or update tests in the same phase as implementation.
    - Update documentation when introducing new routes, environment variables, schema changes, or external services.
    - Backend HTTP/API tests must use Fastify Inject, not Supertest.
