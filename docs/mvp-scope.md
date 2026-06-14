# MVP Scope

## In Scope

- Public marketing website: home, about, community, download, FAQ, legal, refund policy, contact.
- Storefront: public product listing, product detail, SEO metadata, checkout initiation.
- Authenticated account dashboard: profile, preferences foundation, character summaries, purchases, entitlements.
- Admin/internal tools: role-protected shell, order lookup, entitlement lookup, support/contact review, audit log viewer.
- CMS: Directus for news, patch notes, dev blogs, pages, FAQs, announcements, media metadata, and SEO metadata.
- Payments: Stripe Checkout and webhook-first order/entitlement flow.
- Auth: Auth0 OAuth 2.0 / OpenID Connect with backend JWT validation and RBAC.
- Persistence: Neon PostgreSQL-compatible schema through Drizzle ORM and migrations.
- Local development: Angular SSR, NestJS Fastify, Directus, PostgreSQL, Mailpit, and Stripe CLI.
- Delivery readiness: GitHub Actions, Cloud Run container shape, Secret Manager mapping, GCS bucket plan, observability and rollback docs.

## Post-MVP

- Live game inventory mutation from website APIs remains out of scope.
- Unified Directus/Auth0 SSO can be added after the Directus editorial workflow is stable.
- Full worker service can be split from the API after async volume requires it.
- Production CDN/Armor tuning follows staging traffic and security review.

## Route Ownership

- Frontend owns public, store, account, and admin user interfaces.
- API owns `/api/v1/*` account, payment, entitlement, support, admin, audit, and game entitlement bridge contracts.
- Directus owns published CMS content APIs only.
- Stripe owns hosted checkout; the API owns the verified webhook endpoint.
