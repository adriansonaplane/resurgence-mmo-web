# Phase 17 Blueprint - Observability and Operational Readiness

    ## Goal

    Make health, errors, payments, webhooks, admin activity visible.

    ## Codex Implementation Instructions

    - Add structured JSON logging with request ID, service, environment, route, status, duration, safe user ID.
- Add Sentry for Angular/SSR and NestJS exceptions.
- Add OpenTelemetry for API requests, DB queries, Stripe calls, Auth0 validation, entitlements, jobs.
- Configure Cloud Logging and Monitoring dashboards.
- Create dashboards: traffic, API health, checkout funnel, Stripe webhook, DB health, admin activity, errors.
- Create alerts for API errors, webhook failures, checkout failures, DB issues, elevated 5xx.

    ## Required Deliverables

    - `apps/api/src/common/logging/*`
- `apps/frontend/src/app/core/error-tracking/*`
- `docs/observability/dashboards.md`

    ## Acceptance Criteria

    - Failed webhook is visible/actionable.
- Latency/error rate visible per environment.
- Admin actions trace through logs and audit records.

    ## Guardrails

    - Preserve the approved stack from `00_START_HERE/CANONICAL_CONSTRAINTS.md`.
    - Keep secrets out of source control.
    - Add or update tests in the same phase as implementation.
    - Update documentation when introducing new routes, environment variables, schema changes, or external services.
    - Backend HTTP/API tests must use Fastify Inject, not Supertest.
