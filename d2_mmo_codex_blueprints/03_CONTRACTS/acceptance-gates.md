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

## Companion Boundary Acceptance Gates

- Public website MVP supports landing/project overview/dev update/media/contact-community/support-feedback/Alpha info surfaces.
- Account portal includes or scaffolds profile, linked accounts, security settings, account status, support links, and recovery workflow entry points.
- Player profile surfaces use read-only summaries or service-backed read models.
- Storefront creates web order and web entitlement records only after verified Stripe webhooks.
- Account/Entitlement Service handoff is documented and represented in code.
- Admin tools are role-protected, audited, and avoid direct game-critical mutations.
- Support portal supports help articles, bug reports, support tickets, ban appeals, account recovery, known issues, or their documented scaffolds.
- Directus manages content/docs/support articles but not authoritative gameplay configuration.
- Web platform can deploy independently of Kubernetes/Agones/game server runtime.
- Web platform and game runtime boundaries are documented in `docs/boundaries/`.
