# Phase 05 Blueprint - Angular SSR Public Website

    ## Goal

    Build public shell, SEO-aware routes, and CMS content pages.

    ## Codex Implementation Instructions

    - Build layout, navigation, footer, responsive shell, loading/error states.
- Implement prerendered routes: home, about, contact, FAQ, terms, privacy, refund-policy, community.
- Implement SSR routes: store, product list/detail, news, news detail, patch notes, download.
- Connect to Directus published content APIs.
- Add SEO metadata, Open Graph, canonical URLs.
- Add contact form UI with validation.

    ## Required Deliverables

    - `apps/frontend/src/app/public/*`
- `apps/frontend/src/app/store/*`
- `apps/frontend/src/app/api/directus-client.ts`
- `apps/frontend/playwright.config.ts`

    ## Acceptance Criteria

    - Public pages render without login.
- Storefront/news routes are SSR capable.
- Stable pages prerender.
- Playwright smoke loads public pages.

    ## Guardrails

    - Preserve the approved stack from `00_START_HERE/CANONICAL_CONSTRAINTS.md`.
    - Keep secrets out of source control.
    - Add or update tests in the same phase as implementation.
    - Update documentation when introducing new routes, environment variables, schema changes, or external services.
    - Backend HTTP/API tests must use Fastify Inject, not Supertest.

## Companion Boundary Update

The public website should launch before playable Alpha. Add MVP routes for:

```text
landing page
project overview
development updates
media/mock-up gallery
contact/community links
support or feedback entry point
Alpha information page
public documentation / portfolio entry points
```

Use SSR/prerendering where appropriate for public content.
