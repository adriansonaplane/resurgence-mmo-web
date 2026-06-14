# CMS Blueprint - Directus

## Purpose
Use Directus as the CMS/editorial layer. Directus owns content, not account/payment/entitlement business logic.

## Required Collections

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

## Required Capabilities

- Draft/published workflow.
- Published content API for Angular SSR.
- Google Cloud Storage-backed media uploads.
- Editorial roles.
- Optional Auth0/OIDC SSO later for unified admin identity.

## Boundary Rule

Directus must not replace NestJS for:

- Account logic.
- Payment processing.
- Stripe webhooks.
- Entitlement grants.
- Admin/audit business workflows.
- Game backend service contracts.
