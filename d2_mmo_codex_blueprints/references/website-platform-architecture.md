# Website Platform Architecture Document

**Project:** Diablo-Inspired MMORPG Website Platform  
**Version:** 0.2  
**Status:** Updated Draft  
**Recommended Path:** `/docs/03-technical-design/website-platform-architecture.md`  
**Last Updated:** 2026-06-13

## 1. Purpose

This document defines the architecture for the website portion of the Diablo-inspired MMORPG project. The website supports public marketing, storefront commerce, player account dashboards, CMS content, admin tooling, payment processing, and entitlement visibility.

The website platform is not the real-time game server layer. It must not directly control combat, movement, live zone state, or authoritative character inventory. Those systems remain owned by the game backend.

The website platform may grant and display account-level entitlements after verified payment events. The game backend consumes those entitlements and decides how they translate into in-game access or rewards.

## 2. Final Approved Website Stack

```text
Frontend: Angular + Angular SSR + TypeScript
Backend: Node.js + NestJS + Fastify Adapter + TypeScript
Database: Neon PostgreSQL
ORM: Drizzle ORM
CMS: Directus
Authentication: Auth0 + OAuth 2.0 + OpenID Connect
Payments: Stripe
Hosting: Google Cloud Run
CI/CD: GitHub Actions
Storage: Google Cloud Storage
Secrets: Google Secret Manager
Edge: Cloud Load Balancer + Cloud CDN + Cloud Armor
Async: Cloud Tasks or Pub/Sub
Observability: Cloud Logging + Cloud Monitoring + Sentry + OpenTelemetry
Email: Postmark, SendGrid, Mailgun, or Amazon SES
```

## 3. Website Platform Responsibilities

The website platform is split into three major surfaces:

1. **Public Website** - marketing, news, about, contact, FAQ, download, legal pages, and public storefront.
2. **Authenticated Player Dashboard** - account overview, profile, security settings, characters, purchase history, and entitlements.
3. **Admin/Internal Tools** - content publishing, product management, order lookup, entitlement review, audit logs, support workflows, and role-restricted operations.

## 4. High-Level Architecture

```text
Player Browser
   |
   v
Google Cloud Load Balancer
   |
   v
Cloud Armor
   |
   v
Cloud CDN
   |
   +-----------------------------+------------------------------+
   |                             |                              |
   v                             v                              v
Angular SSR Frontend      NestJS + Fastify API            Directus CMS
Cloud Run Service         Cloud Run Service               Cloud Run Service
   |                             |                              |
   |                             +--> Auth0 + OAuth/OIDC         +--> Neon PostgreSQL
   |                             +--> Stripe                     +--> Cloud Storage
   |                             +--> Neon PostgreSQL            +--> Auth0/OIDC SSO optional
   |                             +--> Drizzle ORM
   |                             +--> Secret Manager
   |                             +--> Cloud Tasks / Pub/Sub
   |                             +--> Email Provider
   |                             +--> Game Backend Bridge
   |
   v
Rendered Website Pages
```

## 5. Rendering Strategy

Angular should use a hybrid rendering strategy.

### 5.1 Server-Side Rendered Pages

Use SSR for pages that need SEO, freshness, and social preview support.

Recommended SSR routes:

```text
/store
/store/products
/store/products/:slug
/news
/news/:slug
/patch-notes
/download
```

### 5.2 Prerendered Pages

Use prerendering for stable public pages.

Recommended prerendered routes:

```text
/
/about
/contact
/faq
/terms
/privacy
/refund-policy
/community
```

### 5.3 Client-Side Rendered Pages

Use CSR for authenticated/private pages.

Recommended CSR routes:

```text
/account
/account/profile
/account/security
/account/characters
/account/purchases
/account/entitlements
/admin
/admin/products
/admin/news
/admin/audit
```

## 6. Frontend Architecture

Recommended frontend structure:

```text
/frontend
  /src
    /app
      /public
      /store
      /account
      /admin
      /shared
      /core
      /layout
      /auth
      /api
      /guards
      /interceptors
      /models
      /environments
```

Frontend responsibilities include:

- Public marketing pages.
- Directus-powered news, patch notes, FAQ, and static content.
- Storefront product listings and product details.
- Checkout initiation.
- Auth0 login/logout integration.
- Account dashboard and player-facing account data.
- Admin route shell and protected admin UI.
- API client services for NestJS endpoints and Directus content APIs.

## 7. Backend Architecture

The backend uses NestJS with the Fastify adapter. NestJS provides the application structure; Fastify provides the HTTP runtime.

Recommended backend structure:

```text
/backend
  /src
    /modules
      /auth
      /users
      /accounts
      /characters
      /storefront
      /products
      /orders
      /payments
      /webhooks
      /entitlements
      /news
      /contact
      /support
      /admin
      /audit
      /health
      /directus
    /common
      /guards
      /decorators
      /filters
      /interceptors
      /pipes
      /dto
      /errors
      /logging
      /constants
    /config
      app.config.ts
      auth0.config.ts
      stripe.config.ts
      database.config.ts
      storage.config.ts
      email.config.ts
      directus.config.ts
    /database
      database.module.ts
      drizzle.service.ts
      schema
      migrations
    main.ts
    app.module.ts
```

### 7.1 Backend Module Responsibilities

- **Auth Module:** Auth0 JWT validation, OAuth/OIDC token handling, user identity extraction, guards, and role/permission checks.
- **Users Module:** Local profile records, display names, account status, and user preferences.
- **Accounts Module:** Dashboard data, linked identities, account flags, and account-level settings.
- **Characters Module:** Read-only character summaries for the dashboard.
- **Storefront Module:** Product discovery, store landing data, product visibility, and pricing metadata.
- **Products Module:** Product records, categories, Stripe price mapping, and admin product management.
- **Orders Module:** Internal orders, order items, order status, refund state, and purchase history.
- **Payments Module:** Stripe Checkout Sessions, Customer Portal links, and payment metadata.
- **Webhooks Module:** Stripe webhook signature verification, raw body handling, event storage, and idempotent event processing.
- **Entitlements Module:** Account-level unlocks, beta/founder access, purchase grants, revocations, and game-backend entitlement bridge.
- **News/Directus Module:** Reads published Directus content for frontend use where needed.
- **Support/Contact Module:** Contact form intake, support ticket creation, spam protection, and email handoff.
- **Admin Module:** Restricted admin APIs for content, products, orders, players, entitlements, and system views.
- **Audit Module:** Admin action logs, payment event logs, entitlement grant logs, and security events.
- **Health Module:** Runtime health checks, database checks, dependency checks, and Cloud Run readiness checks.

## 8. API Design

Recommended API prefix:

```text
/api/v1
```

Recommended endpoints:

```text
GET    /api/v1/health
GET    /api/v1/me
GET    /api/v1/account/dashboard
GET    /api/v1/account/characters
GET    /api/v1/account/purchases
GET    /api/v1/account/entitlements
GET    /api/v1/store/products
GET    /api/v1/store/products/:slug
POST   /api/v1/payments/checkout-session
POST   /api/v1/payments/customer-portal
POST   /api/v1/webhooks/stripe
GET    /api/v1/news
GET    /api/v1/news/:slug
POST   /api/v1/contact
GET    /api/v1/admin/orders
GET    /api/v1/admin/users/:id
GET    /api/v1/admin/audit
POST   /api/v1/admin/news
PATCH  /api/v1/admin/products/:id
```

Validation should be enforced through DTOs, validation pipes, strict request bodies, and consistent error responses.

## 9. Database Architecture

Neon PostgreSQL is the system of record for website, account, storefront, billing, CMS, admin, support, and audit records. Drizzle ORM is the official database access layer.

### 9.1 Drizzle Responsibilities

```text
Define database schema
Generate and manage migrations
Provide typed query helpers
Support transactional order and entitlement workflows
Support audit-log queries
Support admin dashboard queries
Support Directus integration where needed
```

### 9.2 Recommended Schema Groups

```text
auth.*
player.*
store.*
billing.*
cms.*
support.*
admin.*
audit.*
directus.*
```

### 9.3 Recommended Tables

```text
auth.user_profiles
auth.auth0_identities
auth.user_roles_cache
player.character_summaries
player.account_flags
player.account_preferences
store.products
store.product_categories
store.product_assets
store.product_prices
billing.orders
billing.order_items
billing.stripe_events
billing.stripe_customers
billing.entitlements
billing.refunds
cms.news_posts
cms.pages
cms.media_references
support.contact_messages
support.support_tickets
support.support_ticket_events
admin.admin_notes
audit.audit_events
audit.admin_actions
audit.security_events
```

Runtime application queries should use pooled Neon connections. Direct connections should be reserved for migrations and administrative tasks.

## 10. Directus CMS Architecture

Directus is the official CMS layer. It should run as its own Cloud Run service named `website-cms`.

Directus manages:

- News posts.
- Patch notes.
- Dev blogs.
- Public pages.
- FAQ entries.
- Storefront content blocks.
- Announcements.
- Media metadata.
- Editorial workflows.

Recommended Directus collections:

```text
news_posts
patch_notes
dev_blogs
pages
faq_entries
storefront_blocks
media_assets
announcements
seo_metadata
```

Directus should use Neon PostgreSQL for CMS data and Google Cloud Storage for uploaded media. Auth0/OIDC SSO can be used for Directus admin access when the team is ready to unify admin identity.

## 11. Authentication and Authorization

Authentication uses Auth0 as the identity provider, with OAuth 2.0 and OpenID Connect as the protocol standards.

Auth0 handles:

- Player login.
- OAuth 2.0 authorization flows.
- OpenID Connect identity tokens.
- Social login.
- Email verification.
- Password reset.
- MFA if enabled.
- Role-based access control.
- Admin identity.

Recommended roles:

```text
player
beta_tester
support_agent
moderator
content_editor
store_manager
developer
super_admin
```

Authorization must be enforced on the backend using NestJS guards, Auth0 JWT validation, role checks, permission checks, and audit logging. Frontend route guards improve UX but are not a security boundary.

## 12. Payment Architecture

Stripe is the payment provider.

Core rule:

```text
Checkout success page is not proof of purchase.
The Stripe webhook is proof of purchase.
```

Purchase flow:

```text
Player selects product
  -> Angular requests checkout session from NestJS
  -> NestJS validates product/account
  -> NestJS creates Stripe Checkout Session
  -> Player pays through Stripe-hosted checkout
  -> Stripe redirects player to success/cancel page
  -> Stripe sends webhook to NestJS
  -> NestJS verifies Stripe signature using raw body
  -> NestJS stores Stripe event idempotently
  -> NestJS creates/updates internal order
  -> NestJS grants account-level entitlement
  -> Dashboard displays entitlement
  -> Game backend consumes entitlement when needed
```

Recommended Stripe events:

```text
checkout.session.completed
payment_intent.succeeded
payment_intent.payment_failed
charge.refunded
customer.subscription.created
customer.subscription.updated
customer.subscription.deleted
invoice.paid
invoice.payment_failed
```

## 13. Entitlement Architecture

Entitlements represent account-level ownership or access.

Examples:

```text
base_game_access
alpha_access
beta_access
founder_pack_tier_1
founder_pack_tier_2
cosmetic_wings_shadow
cosmetic_pet_imp
expansion_1_access
premium_stash_tabs
```

Critical separation:

```text
Website purchase -> verified webhook -> order record -> entitlement grant -> game backend consumes entitlement
```

The website grants account-level entitlements only. It should not directly mutate live character inventory.

## 14. Deployment Architecture

Recommended Cloud Run services:

```text
website-frontend
website-api
website-cms
website-worker
```

- `website-frontend`: Angular SSR and public/account/admin frontend routes.
- `website-api`: NestJS + Fastify APIs, payments, webhooks, admin, entitlements, support, and audit.
- `website-cms`: Directus CMS service.
- `website-worker`: Optional async jobs for email, entitlement sync, webhook follow-up, and scheduled tasks.

Use Google Artifact Registry for Docker images and Google Secret Manager for runtime configuration.

Each Cloud Run service must listen on the `PORT` environment variable and bind to `0.0.0.0`.

## 15. CI/CD Architecture

GitHub Actions is the official CI/CD system.

Recommended pipeline:

```text
Pull Request
  -> install dependencies
  -> lint
  -> typecheck
  -> frontend Jest tests
  -> Angular testing utility tests
  -> backend Jest tests
  -> Fastify Inject API tests
  -> Testcontainers integration tests
  -> build frontend
  -> build backend
  -> build CMS image if changed
  -> Playwright smoke tests where appropriate

Staging
  -> build Docker images
  -> push to Artifact Registry
  -> deploy frontend/API/CMS to Cloud Run
  -> run Drizzle migrations
  -> run staging smoke tests

Production
  -> manual approval
  -> promote tested images
  -> run production-safe migrations
  -> deploy to Cloud Run
  -> production smoke tests
  -> notify team
```

## 16. Security Architecture

Security controls:

```text
Auth0 authentication
OAuth 2.0 + OpenID Connect
Auth0 RBAC
NestJS guards
Backend permission checks
Cloud Armor
Strict CORS
Helmet security headers
Rate limiting
Input validation
Audit logging
Secret Manager
Stripe webhook signature verification
Least-privilege service accounts
Environment separation
```

Sensitive admin actions must be audit logged, including entitlement grants, product changes, refunds, account status changes, role changes, and audit log access.

## 17. Testing Strategy

Frontend testing stack:

```text
Angular Testing Utilities
Playwright
Jest
```

Backend testing stack:

```text
Jest
Fastify Inject
Testcontainers
```

Supertest has been removed. Fastify Inject is the official HTTP/API testing mechanism because the backend runs on NestJS with the Fastify adapter.

Recommended Fastify Inject pattern:

```ts
const fastify = app.getHttpAdapter().getInstance();

const response = await fastify.inject({
  method: 'GET',
  url: '/api/v1/health',
});
```

## 18. MVP Scope

Public website MVP:

```text
Home page
About page
News listing
News detail page
Contact page
Storefront page
Product detail page
Terms/privacy/refund pages
```

Account MVP:

```text
Login/logout
Account dashboard
Profile display
Purchase history
Entitlement display
Character summary placeholder
```

Storefront MVP:

```text
Product listing
Product details
Stripe Checkout
Success page
Cancel page
Webhook processing
Order records
Entitlement grant
```

Admin MVP:

```text
Admin login
Role-protected admin dashboard
Directus content management
Product visibility management
Order lookup
Entitlement lookup
Audit log viewer
```

## 19. Implementation Phases

Phase 1 - Foundation:

```text
Create Angular SSR frontend
Create NestJS backend with Fastify adapter
Configure Drizzle ORM
Create Neon database
Create Directus CMS service
Configure Auth0 development tenant/application
Configure Stripe test account
Configure GitHub Actions skeleton
Create Cloud Run deployment skeleton
```

Phase 2 - Public Website and CMS:

```text
Build public layout
Connect Angular SSR to published Directus content
Build home/about/contact/FAQ/legal pages
Build news listing and news detail pages
Add SEO metadata
Add Cloud Storage media workflow
```

Phase 3 - Authenticated Account:

```text
Add Auth0 login/logout
Add backend JWT validation
Add route guards
Create user profile sync
Create account dashboard
Create entitlement display
Create purchase history page
```

Phase 4 - Storefront and Payments:

```text
Create product schema
Create product listing page
Create product detail page
Create Stripe Checkout Session endpoint
Create success/cancel pages
Create Stripe webhook endpoint
Create order records
Create entitlement grants
```

Phase 5 - Admin and Operations:

```text
Add admin roles and permissions
Add admin route guards
Create order lookup
Create entitlement lookup
Create audit log viewer
Configure Directus editorial roles
Add support/contact review flow
```

Phase 6 - Production Hardening:

```text
Add Cloud Armor
Add Cloud CDN
Add Secret Manager integration
Add structured logging
Add Sentry
Add OpenTelemetry
Add monitoring dashboards
Add alerting
Add backup and recovery notes
```

## 20. Final Architecture Rule

The website platform supports the MMO, but it does not replace the MMO backend.

```text
Website Platform:
Accounts, storefront, payments, public content, dashboard, admin tools, CMS, entitlements

Game Backend:
Real-time simulation, combat, movement, inventory authority, zone servers, matchmaking, world state
```

The website grants account-level entitlements after verified payment events. The game backend consumes those entitlements and performs any game-authoritative action.
