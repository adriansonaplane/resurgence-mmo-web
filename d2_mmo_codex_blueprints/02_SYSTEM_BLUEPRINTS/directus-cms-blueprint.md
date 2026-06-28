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

## Companion Boundary Additions

Directus may manage both marketing/content pages and developer-facing documentation if approved.

Add collections or collection documentation for:

```text
news_posts
patch_notes
public_pages
faq_pages
media_posts
development_blogs
support_articles
public_documentation_pages
developer_documentation_pages
known_issue_pages
portfolio_pages
media_gallery_items
alpha_information_pages
```

Directus must not directly control authoritative gameplay data, live balance data, loot tables, item stats, or server configuration unless a future reviewed configuration pipeline is approved.

Separate public CMS roles from admin/system roles.
