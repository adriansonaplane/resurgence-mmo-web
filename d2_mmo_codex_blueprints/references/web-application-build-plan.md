# Web Application Build Plan

**Project:** Diablo-Inspired MMORPG Website Platform  
**Version:** 0.1  
**Status:** Draft Build Plan  
**Prepared Role:** Principal Software Architect  
**Date:** 2026-06-13  
**Recommended Path:** `/docs/07-production/web-application-build-plan.md`  

## 1. Executive Summary

This build plan converts the current web application portfolio into an executable implementation sequence. The application is a website platform for a Diablo-inspired MMORPG. It includes a public marketing site, SEO-aware storefront, authenticated player dashboard, Directus-powered CMS content, protected admin tools, Stripe checkout, account-level entitlements, and Cloud Run deployment.

The most important architectural boundary is that the website supports the MMO but does not replace the game backend. The website may create and display account-level entitlements after verified Stripe webhook events. The game backend remains authoritative for live inventory, movement, combat, zones, matchmaking, and world state.

## 2. Non-Negotiable Portfolio Constraints

| Area | Constraint | Build Implication |
|---|---|---|
| Frontend | Angular + Angular SSR + TypeScript | SSR for storefront/content SEO, prerendering for stable public pages, CSR for account/admin surfaces. |
| Backend | Node.js + NestJS + Fastify Adapter + TypeScript | NestJS modules/services/guards with Fastify as the HTTP runtime. Do not build this as plain Express. |
| Database | Neon PostgreSQL | Serverless PostgreSQL for website, account, storefront, CMS, billing, support, admin, and audit persistence. |
| ORM / Query Layer | Drizzle ORM | Official SQL-first TypeScript query and migration layer. Runtime queries use pooled connections; migrations use direct connections. |
| CMS | Directus | Official CMS for news, patch notes, pages, FAQ, announcements, media metadata, and editorial workflow. Directus does not replace NestJS. |
| Authentication | Auth0 + OAuth 2.0 + OpenID Connect | Auth0 is the identity provider. OAuth/OIDC are the protocol standards. Use backend JWT validation and RBAC. |
| Payments | Stripe | Use Stripe Checkout and Stripe Webhooks. Webhooks are the source of truth for completed purchases. |
| Hosting | Google Cloud Run | Run frontend, API, CMS, and optional worker as serverless containers. Services listen on PORT and bind to 0.0.0.0. |
| CI/CD | GitHub Actions | Build, lint, typecheck, test, package Docker images, push to Artifact Registry, deploy to staging/production. |
| Storage | Google Cloud Storage | Media, Directus uploads, product/news images, downloads, screenshots, and public/private assets. |
| Secrets | Google Secret Manager | Runtime secrets for Auth0, Stripe, Neon, Directus, email, Sentry, and service credentials. |
| Edge/Security | Cloud Load Balancer + Cloud CDN + Cloud Armor | Public entrypoint, caching, WAF/DDoS protection, and edge security. |
| Async Jobs | Cloud Tasks or Pub/Sub | Webhook follow-up jobs, entitlement sync, email sending, support notifications, scheduled maintenance. |
| Observability | Cloud Logging + Cloud Monitoring + Sentry + OpenTelemetry | Structured logs, metrics, tracing, error capture, dashboards, and alerts. |
| Email | Postmark, SendGrid, Mailgun, or Amazon SES | Transactional emails: receipts, account notices, beta invites, support messages. |
| Frontend Testing | Angular Testing Utilities + Playwright + Jest | Angular component/service/route tests, browser E2E, and frontend unit tests. |
| Backend Testing | Jest + Fastify Inject + Testcontainers | Unit/service tests, HTTP/API tests against Fastify, and integration tests with real containers. Supertest is excluded. |

## 3. Target Service Map

```text
Player Browser
  -> Cloud Load Balancer
  -> Cloud Armor
  -> Cloud CDN
      -> website-frontend: Angular SSR on Cloud Run
      -> website-api: NestJS + Fastify on Cloud Run
      -> website-cms: Directus on Cloud Run
      -> website-worker: optional async worker on Cloud Run

website-api
  -> Auth0 + OAuth 2.0 + OpenID Connect
  -> Stripe Checkout + Stripe Webhooks
  -> Neon PostgreSQL through Drizzle ORM
  -> Secret Manager
  -> Cloud Tasks or Pub/Sub
  -> Email provider
  -> Game backend entitlement bridge

website-cms
  -> Neon PostgreSQL
  -> Google Cloud Storage
  -> optional Auth0/OIDC SSO for CMS admins
```

## 4. Implementation Milestones

| Milestone | Outcome | Completion Signal |
|---|---|---|
| M1 | Foundations boot locally | Angular SSR, NestJS Fastify, Directus, Dockerfiles, health endpoint. |
| M2 | Cloud baseline online | Cloud Run placeholders, Artifact Registry, Secret Manager, Cloud Storage, environment map. |
| M3 | Data layer ready | Neon + Drizzle migrations, schema groups, Testcontainers migration tests. |
| M4 | Public website + CMS | Directus content flows into Angular SSR/prerendered public pages. |
| M5 | Authenticated dashboard | Auth0 login, backend JWT validation, profile sync, dashboard, purchases, entitlements. |
| M6 | Storefront payment loop | Product pages, Stripe Checkout, webhooks, orders, entitlements, duplicate-event protection. |
| M7 | Admin/audit operations | Role-protected admin shell, order/entitlement lookup, audit viewer, support/contact workflow. |
| M8 | Production ready | CI/CD, tests, observability, Cloud Armor/CDN, Secret Manager, staging signoff, production rollout. |

## 5. Step-by-Step Build Plan

### Phase 0 - Architecture Confirmation and Delivery Targets

**Goal:** Freeze the MVP build target and make the portfolio constraints executable before writing production code.

**Build Steps:**
- Confirm repository strategy: separate frontend and backend repos, plus infrastructure/config folders as needed.
- Create a short MVP definition for public website, account dashboard, storefront, CMS, admin, and deployment readiness.
- Convert the web stack decisions into Architecture Decision Records if they are not already committed.
- Define environments: local, staging, and production.
- Define domain names and route ownership for frontend, API, CMS, and webhook endpoints.
- Create a shared naming convention for Cloud Run services, databases, buckets, secrets, and GitHub environments.

**Deliverables:**
- MVP scope checklist
- Service naming sheet
- Environment matrix
- ADR approval checklist

**Acceptance Criteria:**
- Team can answer what is in MVP and what is explicitly post-MVP.
- Every major stack decision is reflected in ADRs.
- No implementation begins with Express or Supertest assumptions.

### Phase 1 - Repository and Local Development Foundation

**Goal:** Create working local skeletons for Angular SSR, NestJS + Fastify, Directus, and shared development tooling.

**Build Steps:**
- Create the Angular SSR frontend repository with TypeScript, linting, formatting, environment files, and route groups: public, store, account, admin, shared, core, auth, api, guards, interceptors, models.
- Create the NestJS backend repository with the Fastify adapter enabled from the first commit.
- Create backend module shells: auth, users, accounts, characters, storefront, products, orders, payments, webhooks, entitlements, news, contact, support, admin, audit, health, directus.
- Create Dockerfiles for website-frontend, website-api, and website-cms.
- Create docker-compose or local scripts for frontend, API, CMS, optional local Postgres, Mailpit, and Stripe CLI.
- Add root README files explaining how to run each service locally.

**Deliverables:**
- Angular SSR app boots locally
- NestJS Fastify app boots locally
- Directus service boots locally or via container
- Local developer README

**Acceptance Criteria:**
- NestJS app uses FastifyAdapter and exposes /api/v1/health.
- Angular SSR renders the public shell locally.
- All apps can run without production secrets.

### Phase 2 - Cloud and Environment Baseline

**Goal:** Prepare Google Cloud hosting and environment separation before business features are built.

**Build Steps:**
- Create or select the Google Cloud project(s) for staging and production.
- Create Artifact Registry repositories for Docker images.
- Create Cloud Run services: website-frontend, website-api, website-cms, and reserve website-worker for async jobs.
- Create Google Secret Manager entries for database URLs, Auth0 settings, Stripe keys, Directus secrets, email provider keys, Sentry DSN, and application secrets.
- Create Google Cloud Storage buckets for public assets, private assets, Directus uploads, and optional downloads.
- Plan Cloud Load Balancer, Cloud CDN, and Cloud Armor placement. Edge hardening can be activated later, but naming and service routing should be planned now.

**Deliverables:**
- Staging Cloud Run services
- Artifact Registry repository
- Secret Manager baseline
- Cloud Storage buckets
- Environment variable map

**Acceptance Criteria:**
- Services deploy a placeholder container to Cloud Run.
- Cloud Run services read PORT and bind to 0.0.0.0.
- No secrets are stored in source control.

### Phase 3 - Neon PostgreSQL and Drizzle Foundation

**Goal:** Establish the database model, migrations, and typed data access layer before storefront/account workflows depend on data.

**Build Steps:**
- Create Neon PostgreSQL development and staging branches or separate databases.
- Configure pooled Neon connection strings for application runtime and direct connection strings for migrations.
- Install and configure Drizzle ORM and Drizzle migrations in the NestJS backend.
- Create schema groups or naming conventions for auth, player, store, billing, cms, support, admin, audit, and directus-related data.
- Create initial tables: auth.user_profiles, auth.auth0_identities, player.character_summaries, store.products, store.product_categories, store.product_assets, store.product_prices, billing.orders, billing.order_items, billing.stripe_events, billing.stripe_customers, billing.entitlements, billing.refunds, support.contact_messages, audit.audit_events, audit.admin_actions, audit.security_events.
- Create database health checks and migration test scripts.

**Deliverables:**
- Drizzle schema files
- Initial migration set
- Database module
- Migration runbook
- Database health endpoint integration

**Acceptance Criteria:**
- Drizzle migrations apply cleanly to a fresh database.
- Application runtime uses pooled connection strings.
- Migration tasks use direct connection strings.
- Testcontainers can run migration tests against a real Postgres container.

### Phase 4 - Directus CMS Service

**Goal:** Bring online the content system that powers public news, patch notes, pages, FAQs, announcements, and media metadata.

**Build Steps:**
- Deploy Directus as the website-cms Cloud Run service.
- Configure Directus against Neon PostgreSQL and Google Cloud Storage for uploads.
- Create Directus collections: news_posts, patch_notes, dev_blogs, pages, faq_entries, storefront_blocks, media_assets, announcements, seo_metadata.
- Configure draft/published status fields and editorial roles.
- Create read-only published-content access for Angular SSR.
- Plan Auth0/OIDC SSO for Directus admin access; implement when admin identity unification is required.
- Seed sample news, FAQ, and storefront content.

**Deliverables:**
- website-cms service
- Directus collections
- CMS seed content
- Published content API plan
- Media upload workflow

**Acceptance Criteria:**
- Directus can create, edit, publish, and unpublish content.
- Angular can read only published content.
- Directus uploads store media in Google Cloud Storage.

### Phase 5 - Angular SSR Public Website

**Goal:** Build the public website shell, SEO-aware routes, and CMS-driven content pages.

**Build Steps:**
- Build layout, navigation, footer, responsive shell, loading states, and error states.
- Implement prerendered routes: home, about, contact, FAQ, terms, privacy, refund policy, community.
- Implement SSR routes: store, store product list, product detail, news, news detail, patch notes, and download.
- Connect news, patch notes, FAQ, page content, and announcements to Directus published content APIs.
- Add SEO metadata, Open Graph tags, canonical URLs, and social preview metadata.
- Add contact form UI with validation and spam-control planning.

**Deliverables:**
- Public website shell
- CMS-driven content pages
- SEO metadata
- Contact form UI
- Prerender/SSR route configuration

**Acceptance Criteria:**
- Public pages render without login.
- Storefront and news routes are SSR-capable.
- Stable pages are prerenderable.
- Playwright smoke tests can load public pages.

### Phase 6 - NestJS API Core and Cross-Cutting Concerns

**Goal:** Harden the backend foundation before adding account, payment, and admin workflows.

**Build Steps:**
- Implement global API prefix /api/v1.
- Enable validation pipes, strict DTO validation, consistent error shape, request IDs, logging interceptors, and exception filters.
- Configure Fastify plugins for helmet/security headers, CORS, and rate limiting using Fastify-compatible packages.
- Implement health/readiness checks for API, database, and configuration sanity.
- Implement Drizzle service, transaction helper, and repository patterns for core modules.
- Add OpenAPI/Swagger generation for API documentation, restricted in production unless explicitly public.
- Add Fastify Inject API test harness.

**Deliverables:**
- NestJS API foundation
- Global validation/error handling
- Fastify security plugins
- Health endpoints
- Fastify Inject test harness

**Acceptance Criteria:**
- /api/v1/health returns success via Fastify Inject.
- Invalid request bodies are rejected consistently.
- CORS only allows configured origins.
- Swagger/OpenAPI is available in non-production or protected environments.

### Phase 7 - Auth0, OAuth/OIDC, User Profiles, and RBAC

**Goal:** Implement secure identity, protected routes, profile synchronization, and backend-enforced roles.

**Build Steps:**
- Configure Auth0 tenant, application, API audience, callback URLs, logout URLs, and allowed origins for local/staging/production.
- Integrate Auth0 login/logout in Angular.
- Implement NestJS JWT validation for Auth0-issued access tokens.
- Implement NestJS auth guards, role guards, permission guards, and decorators for current user context.
- Create local user profile synchronization keyed by Auth0 subject.
- Create roles: player, beta_tester, support_agent, moderator, content_editor, store_manager, developer, super_admin.
- Add audit events for sensitive account and admin-auth actions.

**Deliverables:**
- Auth0 login/logout
- JWT validation
- User profile sync
- Role/permission guard system
- Admin auth baseline

**Acceptance Criteria:**
- Unauthenticated users cannot access account or admin APIs.
- Angular route guards improve UX but backend guards enforce security.
- Auth0 subject maps to local user profile.
- Role-protected test routes reject unauthorized users.

### Phase 8 - Account Dashboard MVP

**Goal:** Deliver the authenticated player dashboard without exposing game-authoritative mutation paths.

**Build Steps:**
- Build account dashboard route and API endpoint.
- Build profile display and account preferences foundation.
- Build character summary placeholder using player.character_summaries or mocked data until game integration exists.
- Build purchase history page against billing.orders and billing.order_items.
- Build entitlement display against billing.entitlements.
- Build account security page linking to Auth0-managed security flows where appropriate.

**Deliverables:**
- Account dashboard
- Profile page
- Purchase history
- Entitlement display
- Character summary placeholder

**Acceptance Criteria:**
- Dashboard works only for authenticated users.
- Dashboard can display profile, purchases, entitlements, and character summaries.
- No endpoint directly mutates live character inventory.

### Phase 9 - Storefront Product Model and Public Store

**Goal:** Create the product catalog and public storefront before enabling payment collection.

**Build Steps:**
- Create product and pricing schema with Drizzle: products, categories, assets, prices, Stripe mappings, visibility flags, and metadata.
- Create admin seed data or staging-only scripts for initial products.
- Build storefront product listing route.
- Build product detail route with SSR metadata and media assets.
- Build backend product list/detail APIs.
- Ensure only visible/published products are shown to public users.

**Deliverables:**
- Product schema
- Product API
- Storefront list
- Product detail page
- Initial product seeds

**Acceptance Criteria:**
- Public storefront renders product listings via SSR.
- Hidden or inactive products are not publicly visible.
- Product detail pages include SEO metadata and social previews.

### Phase 10 - Stripe Checkout, Webhooks, Orders, and Entitlements

**Goal:** Implement the payment pipeline with webhook-source-of-truth processing and account-level entitlement grants.

**Build Steps:**
- Configure Stripe test mode, products/prices, webhook endpoint, and webhook signing secret.
- Implement checkout session endpoint: POST /api/v1/payments/checkout-session.
- Implement success and cancel pages in Angular.
- Implement Stripe webhook endpoint with raw body signature verification.
- Persist Stripe events idempotently before processing.
- Create or update billing.orders and billing.order_items from verified events.
- Grant billing.entitlements only after verified payment events.
- Handle duplicate events without duplicate entitlement grants.
- Add initial support for refunds and failed payments where needed.

**Deliverables:**
- Stripe checkout endpoint
- Webhook endpoint
- Order records
- Entitlement grants
- Payment test suite
- Checkout UI flow

**Acceptance Criteria:**
- Checkout success page alone does not grant access.
- Webhook signature verification is required.
- Duplicate Stripe events do not create duplicate entitlements.
- Account dashboard shows entitlements after verified webhook processing.
- Fastify Inject and Testcontainers cover payment and entitlement flows.

### Phase 11 - Entitlement Bridge and Game Backend Boundary

**Goal:** Define the integration boundary where the website grants account-level access and the game backend consumes it.

**Build Steps:**
- Define entitlement keys and statuses: base_game_access, alpha_access, beta_access, founder packs, cosmetics, expansion access, premium stash tabs.
- Create entitlement query endpoint for game backend consumption or plan a secure service-to-service integration.
- Add service authentication for game-backend-to-website entitlement reads.
- Add audit logging for entitlement grant, revoke, and read-sensitive operations.
- Document that website systems must not write directly into live character inventory.

**Deliverables:**
- Entitlement key registry
- Game backend entitlement read contract
- Audit coverage
- Boundary documentation

**Acceptance Criteria:**
- Website grants account-level entitlements only.
- Game backend remains authoritative for live inventory, movement, combat, and world state.
- Entitlement reads are authenticated and auditable.

### Phase 12 - Admin, Support, and Audit Tools

**Goal:** Provide controlled staff workflows for operations while keeping security and auditability central.

**Build Steps:**
- Build role-protected admin route shell in Angular.
- Build admin API guards for support_agent, moderator, content_editor, store_manager, developer, and super_admin roles.
- Build order lookup, entitlement lookup, audit log viewer, and support/contact review flow.
- Integrate Directus access/linking for editorial workflows instead of duplicating CMS screens inside Angular.
- Audit sensitive actions: entitlement grant/revoke, refund review, product update, price mapping update, account status change, admin role change, audit log access, support account notes.

**Deliverables:**
- Admin shell
- Order lookup
- Entitlement lookup
- Audit viewer
- Support/contact workflow
- Directus editorial integration

**Acceptance Criteria:**
- Unauthorized users cannot access admin APIs or admin pages.
- Sensitive admin actions create audit records.
- Directus remains the CMS layer, NestJS remains the account/payment/entitlement/admin API layer.

### Phase 13 - Worker and Async Job Processing

**Goal:** Move slow or retryable work out of request/response paths when necessary.

**Build Steps:**
- Decide whether the MVP needs website-worker immediately or whether API-local processing is acceptable for early staging.
- Implement Cloud Tasks or Pub/Sub for webhook follow-up jobs, entitlement sync, email sending, support notifications, and scheduled cleanup.
- Add retry logic and dead-letter handling for jobs that can fail safely.
- Add observability around job success, failure, latency, and retries.

**Deliverables:**
- Async processing plan
- Worker service if needed
- Queue/topic definitions
- Retry and alert rules

**Acceptance Criteria:**
- Critical payment processing remains idempotent.
- Email and secondary work can retry without duplicating orders or entitlements.
- Failed jobs are visible through logs/metrics/alerts.

### Phase 14 - Testing Implementation and Quality Gates

**Goal:** Make the approved testing stack executable and mandatory in CI.

**Build Steps:**
- Implement frontend Jest tests for utilities, services, and isolated TypeScript behavior.
- Implement Angular Testing Utilities tests for components, route guards, forms, pipes, and services.
- Implement Playwright tests for public pages, login redirects, storefront flows, dashboard access, admin restrictions, and checkout initiation.
- Implement backend Jest tests for services, guards, pipes, interceptors, payment logic, entitlement logic, audit logic, and Drizzle repositories.
- Implement Fastify Inject tests for /api/v1/health, auth behavior, product APIs, contact API, checkout API, webhook behavior, and admin protection.
- Implement Testcontainers tests for PostgreSQL migrations, Drizzle queries, transactions, order/entitlement workflows, webhook persistence, and audit logging.
- Remove or reject any Supertest usage from backend tests.

**Deliverables:**
- Frontend test suite
- Backend unit suite
- Fastify Inject API suite
- Testcontainers integration suite
- Playwright smoke suite

**Acceptance Criteria:**
- Pull requests fail if lint, typecheck, unit tests, API tests, integration tests, or required smoke tests fail.
- Fastify Inject is the only HTTP test mechanism for backend endpoint tests.
- Testcontainers verifies migrations and database behavior against real Postgres.

### Phase 15 - GitHub Actions CI/CD

**Goal:** Automate validation, packaging, and deployment according to the approved portfolio constraints.

**Build Steps:**
- Create pull request workflow: install dependencies, lint, typecheck, frontend Jest tests, Angular testing utility tests, backend Jest tests, Fastify Inject tests, Testcontainers tests, build frontend, build backend, build CMS image if changed, run Playwright smoke tests where applicable.
- Create staging workflow: build Docker images, push to Artifact Registry, deploy website-frontend, website-api, and website-cms to Cloud Run, run Drizzle migrations, run staging smoke tests.
- Create production workflow: require manual approval, promote tested images, run production-safe migrations, deploy to Cloud Run, run production smoke tests, notify team.
- Add GitHub environments and environment-specific secrets/identity federation.

**Deliverables:**
- PR workflow
- Staging deployment workflow
- Production deployment workflow
- Artifact Registry push
- Cloud Run deployment automation

**Acceptance Criteria:**
- No production deployment occurs without passing tests and manual approval.
- Staging deployments run migrations and smoke tests.
- Production uses tested images rather than rebuilding unverified code.

### Phase 16 - Security, Edge, Secrets, and Production Hardening

**Goal:** Prepare the application for external testing and public exposure.

**Build Steps:**
- Enable Google Secret Manager for all runtime secrets.
- Configure strict CORS origins for local, staging, and production.
- Enable Helmet security headers through Fastify-compatible plugins.
- Enable rate limits for contact, checkout, webhook, account, and admin endpoints.
- Configure Cloud Load Balancer, Cloud CDN, and Cloud Armor.
- Define least-privilege service accounts for Cloud Run services.
- Add backup/recovery notes for Neon, Directus content, and Cloud Storage assets.
- Create incident response notes and rollback procedure.

**Deliverables:**
- Secret Manager integration
- Cloud Armor/CDN configuration
- Rate limiting
- Least-privilege service accounts
- Backup and incident notes

**Acceptance Criteria:**
- Production secrets are not visible in repo or logs.
- Admin and payment endpoints are protected and audited.
- Rollback steps are documented and tested at least once in staging.

### Phase 17 - Observability and Operational Readiness

**Goal:** Make system health, errors, payment failures, webhook issues, and admin activity visible.

**Build Steps:**
- Add structured JSON logging with request ID, service, environment, user ID where safe, route, status code, duration, and error details.
- Add Sentry for Angular SSR/frontend errors and NestJS backend exceptions.
- Add OpenTelemetry instrumentation for API requests, database queries, Stripe calls, Auth0 validation, entitlement grants, and background jobs.
- Configure Cloud Logging and Cloud Monitoring dashboards.
- Create dashboards: website traffic, API health, checkout funnel, Stripe webhook, database health, admin activity, error rate.
- Create alerts for API error spikes, webhook failures, checkout failures, database connection issues, and elevated 5xx responses.

**Deliverables:**
- Structured logging
- Sentry integration
- OpenTelemetry instrumentation
- Dashboards
- Alerts

**Acceptance Criteria:**
- A failed Stripe webhook is visible and actionable.
- API latency and error rate are visible per environment.
- Admin actions can be traced through audit records and logs.

### Phase 18 - Staging Release Candidate

**Goal:** Prove the complete MVP in staging before production rollout.

**Build Steps:**
- Deploy frontend, API, CMS, and worker if present to staging.
- Run Drizzle migrations against staging.
- Seed Directus content and storefront products.
- Configure Auth0 staging application and Stripe test-mode webhooks.
- Run full GitHub Actions test suite.
- Run Playwright staging smoke tests against real deployed URLs.
- Run manual verification of public site, account dashboard, product checkout, webhook processing, entitlement display, admin access, Directus workflow, and audit logs.

**Deliverables:**
- Staging release candidate
- Smoke test report
- Manual verification checklist
- Known issues list

**Acceptance Criteria:**
- MVP end-to-end flow works in staging: content -> storefront -> checkout -> webhook -> order -> entitlement -> dashboard.
- No critical security, payment, or entitlement defects remain open.
- Production deployment is approved only after staging signoff.

### Phase 19 - Production Launch

**Goal:** Release the website MVP with safe deployment, rollback readiness, and post-launch monitoring.

**Build Steps:**
- Promote tested Docker images to production deployment.
- Run production-safe Drizzle migrations.
- Deploy website-frontend, website-api, website-cms, and worker if present to Cloud Run.
- Verify production Auth0 configuration, Stripe live mode configuration, webhook endpoint, domain URLs, Cloud Storage assets, Secret Manager bindings, and Cloud Armor/CDN settings.
- Run production smoke tests.
- Monitor logs, errors, webhooks, checkout events, dashboard access, Directus access, and admin audit activity after launch.

**Deliverables:**
- Production deployment
- Production smoke test result
- Launch monitoring window notes
- Rollback readiness confirmation

**Acceptance Criteria:**
- Production site is reachable through the intended domain.
- Checkout and webhook processing are verified in live mode with controlled test transactions if appropriate.
- Rollback procedure is available if launch defects appear.

## 6. Recommended Team Ownership

| Role | Ownership |
|---|---|
| Principal/Lead Architect | Own architecture integrity, ADRs, service boundaries, security posture, and release gates. |
| Frontend Engineer | Own Angular SSR, public pages, account dashboard, admin shell, frontend tests, and Playwright smoke flows. |
| Backend Engineer | Own NestJS + Fastify API, Drizzle, Auth0 validation, Stripe, entitlements, admin APIs, and Fastify Inject tests. |
| DevOps/Platform Engineer | Own Cloud Run, Artifact Registry, Secret Manager, GitHub Actions, Cloud Storage, CDN/Armor, monitoring. |
| Content/Admin Owner | Own Directus collections, content workflows, news/patch notes/pages, and editorial permissions. |
| QA Engineer | Own test plans, Jest/Angular tests, Fastify Inject, Testcontainers, Playwright E2E, staging signoff. |

## 7. Critical End-to-End MVP Flows

| Flow | Required Path |
|---|---|
| Public Content Flow | Directus published content -> Angular SSR/prerendered pages -> Cloud CDN -> player browser. |
| Authentication Flow | Angular login -> Auth0 OAuth/OIDC -> access token -> NestJS JWT validation -> user profile sync -> dashboard access. |
| Storefront Flow | Product page -> checkout session API -> Stripe-hosted checkout -> success/cancel route -> webhook event processing. |
| Entitlement Flow | Verified Stripe webhook -> stored Stripe event -> internal order -> account-level entitlement -> dashboard display -> game backend consumes entitlement. |
| Admin Flow | Admin login -> Auth0 RBAC -> NestJS role/permission guards -> order/entitlement/audit tools -> audit record. |
| Deployment Flow | GitHub Actions -> lint/typecheck/tests -> Docker image -> Artifact Registry -> Cloud Run staging -> smoke tests -> production approval. |

## 8. Database Build Order

1. Configure Neon project, branches/databases, pooled URL, and direct migration URL.
2. Add Drizzle configuration and migration scripts.
3. Create auth and profile tables.
4. Create store product/catalog tables.
5. Create billing order, order item, Stripe event, customer, refund, and entitlement tables.
6. Create support/contact tables.
7. Create audit/security event tables.
8. Configure Directus tables/collections and media metadata.
9. Add indexes, unique constraints, and transaction boundaries for Stripe events and entitlements.
10. Validate migrations through Testcontainers before staging deployment.

## 9. Minimum Test Gates

### Frontend
- Jest unit tests for utilities, services, and isolated TypeScript.
- Angular Testing Utilities for components, forms, guards, pipes, and services.
- Playwright for public routes, CMS pages, auth redirects, storefront, account dashboard, admin protection, and checkout initiation.

### Backend
- Jest for services, guards, pipes, interceptors, Drizzle repositories, payment logic, entitlement logic, and audit logic.
- Fastify Inject for HTTP/API tests against the NestJS Fastify runtime.
- Testcontainers for PostgreSQL migrations, Drizzle queries, transaction rollback, orders, entitlements, webhook persistence, and audit logging.
- Supertest must not be used.

### Required Backend Coverage
- Health endpoint returns success.
- Auth guard rejects missing tokens.
- Auth guard accepts valid test tokens.
- Role guard rejects unauthorized admin access.
- Product listing returns visible products.
- Checkout session endpoint validates input.
- Stripe webhook rejects invalid signatures.
- Stripe webhook processes valid checkout event.
- Duplicate Stripe event does not duplicate entitlement.
- Order is created after verified payment event.
- Entitlement is granted after completed checkout.
- Admin action creates audit log.
- Contact form creates support/contact record.
- Drizzle migrations apply successfully.
- Database transaction rolls back on failed entitlement grant.

## 10. Risks and Architectural Controls

| Risk | Control |
|---|---|
| Payment grants without verified webhook | Never grant entitlements from success page alone; require Stripe signature verification and idempotent event storage. |
| Duplicate Stripe webhook processing | Store stripe_event_id before processing; use transaction and unique constraints for entitlement grants. |
| Backend tests drift to Supertest | Enforce Fastify Inject as the only HTTP/API test mechanism in backend test guidelines and CI review. |
| Website mutates live inventory | Restrict website to account-level entitlements; game backend remains authoritative for inventory and gameplay. |
| Database connection exhaustion | Use Neon pooled connections at runtime, direct connections only for migrations, and Cloud Run max instance controls. |
| Admin privilege errors | Use Auth0 RBAC, NestJS guards, backend permission checks, least privilege, and audit logs. |
| Directus becomes confused with backend API | Directus owns CMS/editorial content only; NestJS owns account, payments, entitlements, support, admin APIs. |
| Secrets leakage | Use Secret Manager, avoid repo-stored secrets, scrub logs, and separate staging/production secrets. |

## 11. Definition of Done for MVP

- Angular SSR frontend is deployed to Cloud Run and serves public, store, account, and admin route shells.
- NestJS + Fastify API is deployed to Cloud Run and uses /api/v1 routes with validation, guards, logging, and health checks.
- Directus CMS is deployed to Cloud Run and powers published news/pages/FAQ/announcements through controlled collections.
- Neon PostgreSQL and Drizzle migrations support the required auth, player, store, billing, support, admin, and audit data.
- Auth0 login works, OAuth/OIDC tokens are validated by the backend, and RBAC protects admin APIs.
- Stripe Checkout creates sessions, verified webhooks create orders, and entitlements are granted idempotently.
- The website does not mutate live character inventory or game-authoritative state.
- GitHub Actions runs lint, typecheck, frontend tests, backend Jest, Fastify Inject, Testcontainers, build, and smoke tests.
- Cloud Run deployments use Artifact Registry images and Secret Manager secrets.
- Cloud Storage, CDN, Armor, logging, monitoring, Sentry, and OpenTelemetry are configured to the agreed MVP level.
- Staging end-to-end flow passes: Directus content -> Angular page -> Auth0 login -> store checkout -> Stripe webhook -> order -> entitlement -> dashboard.

## 12. Recommended Immediate Next Actions

1. Create the actual repositories and commit the skeleton frontend/backend/CMS/container layout.
2. Implement the NestJS Fastify health endpoint and Fastify Inject test harness first.
3. Set up Neon + Drizzle migrations before building storefront/account features.
4. Deploy placeholder Cloud Run services early to validate PORT binding, secrets, and CI/CD.
5. Build the first vertical slice in staging: Directus news item -> Angular SSR news page -> deployed through GitHub Actions.
6. Build the second vertical slice: Auth0 login -> NestJS JWT validation -> local user profile -> account dashboard.
7. Build the third vertical slice: product -> Stripe checkout -> webhook -> order -> entitlement -> dashboard display.

## 13. Final Architectural Rule

```text
Website Platform:
Accounts, storefront, payments, public content, dashboard, admin tools, CMS, entitlements

Game Backend:
Real-time simulation, combat, movement, inventory authority, zone servers, matchmaking, world state
```

The build should always preserve this boundary. Website purchases create account-level entitlements only. The game backend consumes those entitlements and performs any game-authoritative action.