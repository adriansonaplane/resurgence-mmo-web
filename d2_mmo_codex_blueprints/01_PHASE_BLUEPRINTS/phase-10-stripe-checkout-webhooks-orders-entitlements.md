# Phase 10 Blueprint - Stripe Checkout, Webhooks, Orders, Entitlements

    ## Goal

    Implement payment pipeline with webhook source of truth.

    ## Codex Implementation Instructions

    - Configure Stripe test mode, products/prices, webhook secret.
- Implement POST /api/v1/payments/checkout-session.
- Implement Angular success/cancel pages.
- Implement Stripe webhook endpoint with raw body signature verification.
- Persist Stripe events idempotently before processing.
- Create/update billing.orders and billing.order_items from verified events.
- Grant entitlements only after verified events.
- Handle duplicate events without duplicate entitlements.
- Add refund and failed payment support foundation.

    ## Required Deliverables

    - `apps/api/src/modules/payments/*`
- `apps/api/src/modules/webhooks/*`
- `apps/api/src/modules/orders/*`
- `apps/api/src/modules/entitlements/*`
- `apps/frontend/src/app/store/checkout-*`

    ## Acceptance Criteria

    - Checkout success page alone does not grant access.
- Webhook signature verification required.
- Duplicate events do not duplicate entitlements.
- Dashboard shows entitlement after verified webhook.
- Fastify Inject + Testcontainers cover payment flow.

    ## Guardrails

    - Preserve the approved stack from `00_START_HERE/CANONICAL_CONSTRAINTS.md`.
    - Keep secrets out of source control.
    - Add or update tests in the same phase as implementation.
    - Update documentation when introducing new routes, environment variables, schema changes, or external services.
    - Backend HTTP/API tests must use Fastify Inject, not Supertest.
