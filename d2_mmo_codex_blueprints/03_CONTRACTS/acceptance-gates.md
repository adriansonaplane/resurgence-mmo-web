# Acceptance Gates

## MVP Definition of Done

- Angular SSR frontend deployed to Cloud Run.
- NestJS + Fastify API deployed to Cloud Run with `/api/v1` routes.
- Directus deployed to Cloud Run and powering published content.
- Neon PostgreSQL + Drizzle migrations support auth, player, store, billing, support, admin, audit data.
- Auth0 login works and backend validates OAuth/OIDC tokens.
- Stripe Checkout creates sessions and verified webhooks create orders/entitlements idempotently.
- Website does not mutate live character inventory or game-authoritative state.
- GitHub Actions runs lint, typecheck, frontend tests, backend Jest, Fastify Inject, Testcontainers, build, smoke tests.
- Cloud Run deployments use Artifact Registry images and Secret Manager secrets.
- Staging E2E flow passes: Directus content -> Angular page -> Auth0 login -> store checkout -> Stripe webhook -> order -> entitlement -> dashboard.

## Anti-Regression Gates

- No `supertest` dependency.
- No Express-only middleware assumptions.
- No secret values in repo.
- No entitlement grant from success page.
- No website direct inventory mutation endpoint.
