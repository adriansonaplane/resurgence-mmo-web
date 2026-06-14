# Canonical Constraints

These constraints are non-negotiable for every blueprint and Codex task.

| Area | Required Decision |
|---|---|
| Frontend | Angular + Angular SSR + TypeScript |
| Frontend Rendering | SSR for storefront/content SEO, prerendering for stable public pages, CSR for account/admin surfaces |
| Backend | Node.js + NestJS + Fastify Adapter + TypeScript |
| Backend Runtime Rule | Do not implement a plain Express backend |
| Database | Neon PostgreSQL |
| ORM / Query Layer | Drizzle ORM and Drizzle migrations |
| CMS | Directus |
| Auth | Auth0 + OAuth 2.0 + OpenID Connect |
| Payments | Stripe Checkout + Stripe Webhooks |
| Payment Source of Truth | Verified Stripe webhook, never checkout success page alone |
| Hosting | Google Cloud Run containers listening on PORT and binding to 0.0.0.0 |
| CI/CD | GitHub Actions |
| Storage | Google Cloud Storage |
| Secrets | Google Secret Manager |
| Edge/Security | Cloud Load Balancer + Cloud CDN + Cloud Armor |
| Async Jobs | Cloud Tasks or Pub/Sub |
| Observability | Cloud Logging + Cloud Monitoring + Sentry + OpenTelemetry |
| Email | Postmark, SendGrid, Mailgun, or Amazon SES |
| Frontend Testing | Angular Testing Utilities + Playwright + Jest |
| Backend Testing | Jest + Fastify Inject + Testcontainers |
| Excluded Backend Test Tool | Supertest must not be used |
| Game Boundary | Website grants account-level entitlements only; game backend owns live inventory, combat, movement, zones, matchmaking, and world state |
