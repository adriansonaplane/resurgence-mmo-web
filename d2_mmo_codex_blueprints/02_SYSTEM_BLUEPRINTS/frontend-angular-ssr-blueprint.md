# Frontend Blueprint - Angular SSR

## Purpose
Build the public website, SEO storefront, account dashboard, and admin shell using Angular with SSR.

## Rendering Rules

| Surface | Rendering Mode | Reason |
|---|---|---|
| Home, about, FAQ, legal, community | Prerender/static where possible | Stable public pages and CDN-friendly output |
| News, patch notes, store listing, product detail | SSR | SEO, freshness, social previews |
| Account dashboard | CSR behind Auth0 | Private user-specific data |
| Admin shell | CSR behind Auth0/RBAC | Private staff-only data |

## Required Route Groups

```text
/public
/store
/account
/admin
/shared
/core
/auth
/api
/guards
/interceptors
/models
```

## Required Features

- Responsive layout, nav, footer.
- Directus published content client.
- Storefront product pages with SEO metadata.
- Auth0 login/logout integration.
- Account dashboard views for profile, purchases, entitlements, character summaries.
- Admin shell route protected by frontend guards for UX.
- Frontend guards are not security boundaries; backend guards remain authoritative.

## Required Tests

- Jest tests for utilities/services.
- Angular Testing Utilities for components, forms, guards, services.
- Playwright for public routes, auth redirects, storefront, dashboard access, admin restrictions, checkout initiation.
