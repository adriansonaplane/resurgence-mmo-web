# ADR Backlog

- Angular SSR and prerendering for public/store/content surfaces.
- CSR for account and admin private surfaces.
- NestJS with Fastify adapter for the website API.
- Fastify-compatible security plugins instead of Express middleware.
- Neon PostgreSQL for hosted persistence.
- Drizzle ORM and Drizzle migrations instead of Prisma.
- Directus for CMS/editorial content only.
- Auth0 with OAuth 2.0 and OpenID Connect for identity.
- Backend RBAC as the security boundary; frontend guards are UX only.
- Stripe Checkout and verified webhooks as the payment source of truth.
- Webhook-first idempotent entitlement grants.
- Cloud Run container deployment with Artifact Registry.
- GitHub Actions for lint, typecheck, tests, builds, migrations, and smoke tests.
- Fastify Inject for backend HTTP/API tests.
- Testcontainers for PostgreSQL integration and migration validation.
