# Phase 08 Blueprint - Account Dashboard MVP

    ## Goal

    Deliver authenticated dashboard without game-authoritative mutation paths.

    ## Codex Implementation Instructions

    - Build account dashboard route and API endpoint.
- Build profile display and preferences foundation.
- Build character summary placeholder from player.character_summaries or mocked data.
- Build purchase history from billing.orders and billing.order_items.
- Build entitlement display from billing.entitlements.
- Link account security page to Auth0-managed security flows where appropriate.

    ## Required Deliverables

    - `apps/frontend/src/app/account/*`
- `apps/api/src/modules/accounts/*`
- `apps/api/src/modules/characters/*`

    ## Acceptance Criteria

    - Dashboard requires auth.
- Profile/purchases/entitlements/character summaries render.
- No endpoint mutates live character inventory.

    ## Guardrails

    - Preserve the approved stack from `00_START_HERE/CANONICAL_CONSTRAINTS.md`.
    - Keep secrets out of source control.
    - Add or update tests in the same phase as implementation.
    - Update documentation when introducing new routes, environment variables, schema changes, or external services.
    - Backend HTTP/API tests must use Fastify Inject, not Supertest.
