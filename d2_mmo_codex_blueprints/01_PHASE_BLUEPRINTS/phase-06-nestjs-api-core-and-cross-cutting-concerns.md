# Phase 06 Blueprint - NestJS API Core and Cross-Cutting Concerns

    ## Goal

    Harden backend foundation before feature workflows.

    ## Codex Implementation Instructions

    - Set global API prefix /api/v1.
- Enable validation pipes, DTO strict validation, request IDs, exception filters, logging interceptors.
- Configure Fastify-compatible helmet, CORS, rate limiting.
- Implement health/readiness checks for API, DB, config.
- Implement Drizzle service, transaction helper, repository base patterns.
- Add OpenAPI/Swagger, protected or non-production only.
- Add Fastify Inject API test harness.

    ## Required Deliverables

    - `apps/api/src/main.ts`
- `apps/api/src/common/*`
- `apps/api/src/modules/health/*`
- `apps/api/test/fastify-inject.setup.ts`

    ## Acceptance Criteria

    - /api/v1/health passes through Fastify Inject.
- Invalid DTOs rejected consistently.
- CORS allows configured origins only.
- Swagger is protected or disabled in production.

    ## Guardrails

    - Preserve the approved stack from `00_START_HERE/CANONICAL_CONSTRAINTS.md`.
    - Keep secrets out of source control.
    - Add or update tests in the same phase as implementation.
    - Update documentation when introducing new routes, environment variables, schema changes, or external services.
    - Backend HTTP/API tests must use Fastify Inject, not Supertest.
