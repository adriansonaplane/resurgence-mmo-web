# Updated Website Tech Stack

**Project:** Diablo-Inspired MMORPG Website Platform  
**Version:** 0.2  
**Status:** Updated Draft  
**Last Updated:** 2026-06-13

## Final Approved Stack

| Layer | Decision | Notes |
|---|---|---|
| Frontend | Angular + Angular SSR | SSR for storefront SEO, prerendering for stable public pages, CSR for account/admin surfaces. |
| Backend | Node.js + NestJS + Fastify Adapter | Structured TypeScript backend with high-performance Fastify HTTP adapter. |
| Database | Neon PostgreSQL | Serverless PostgreSQL for website/account/storefront/CMS persistence. |
| ORM / Query Layer | Drizzle ORM | Type-safe SQL-first database access and migrations. |
| CMS | Directus | Headless CMS for news, patch notes, pages, FAQ, announcements, and editorial workflows. |
| Authentication | Auth0 + OAuth 2.0 + OpenID Connect | Auth0 is the identity provider; OAuth/OIDC are the protocol standards used for auth flows and tokens. |
| Payments | Stripe | Checkout, webhooks, customer records, receipts, refunds, and future subscription support. |
| Hosting | Google Cloud Run | Serverless container hosting for frontend, API, CMS, and worker services. |
| CI/CD | GitHub Actions | Build, test, package, push images, deploy to staging/production. |
| Storage | Google Cloud Storage | Product images, news images, downloads, screenshots, media, and Directus uploads. |
| Secrets | Google Secret Manager | Runtime secrets for Auth0, Stripe, Neon, Directus, email, and Sentry. |
| Edge/Security | Cloud Load Balancer, Cloud CDN, Cloud Armor | Public entrypoint, caching, WAF, DDoS protection, and rate limiting at the edge. |
| Async Jobs | Cloud Tasks or Pub/Sub | Webhook follow-up jobs, entitlement sync, email, support notifications. |
| Observability | Cloud Logging, Cloud Monitoring, Sentry, OpenTelemetry | Logs, metrics, tracing, error tracking, and alerting. |
| Email | Postmark, SendGrid, Mailgun, or Amazon SES | Receipts, account notices, beta invites, support messages, and transactional email. |

## Testing Stack

| Area | Tools | Purpose |
|---|---|---|
| Frontend Testing | Angular Testing Utilities, Playwright, Jest | Component, unit, browser, route guard, storefront, account dashboard, and admin UI testing. |
| Backend Testing | Jest, Fastify Inject, Testcontainers | Unit tests, HTTP/API tests against Fastify, and integration tests with real service containers. |

## Key Correction Log

- Replaced plain Express with **NestJS + Fastify Adapter**.
- Added **Drizzle ORM** as the official database access layer.
- Added **Directus** as the official CMS layer.
- Added **GitHub Actions** as the official CI/CD system.
- Corrected `0Auth` to **Auth0 + OAuth 2.0 + OpenID Connect**.
- Removed **Supertest** from backend testing.
- Added **Fastify Inject** / `fastify.inject()` for HTTP-level backend tests.
