# Phase 09 Blueprint - Storefront Product Model and Public Store

    ## Goal

    Create catalog and public storefront before payment collection.

    ## Codex Implementation Instructions

    - Create product/pricing schema with Drizzle.
- Create staging seed scripts for initial products.
- Build storefront listing and product detail routes.
- Build backend product list/detail APIs.
- Ensure only visible/published products show publicly.
- Add SEO metadata/social previews for product detail.

    ## Required Deliverables

    - `apps/api/src/modules/products/*`
- `apps/api/src/modules/storefront/*`
- `apps/frontend/src/app/store/*`
- `apps/api/src/database/seeds/products.ts`

    ## Acceptance Criteria

    - Public storefront renders via SSR.
- Hidden/inactive products are not visible.
- Product pages contain SEO metadata.

    ## Guardrails

    - Preserve the approved stack from `00_START_HERE/CANONICAL_CONSTRAINTS.md`.
    - Keep secrets out of source control.
    - Add or update tests in the same phase as implementation.
    - Update documentation when introducing new routes, environment variables, schema changes, or external services.
    - Backend HTTP/API tests must use Fastify Inject, not Supertest.

## Companion Boundary Update

Storefront responsibilities may include game purchase page, cosmetic product pages, future DLC/expansion pages, checkout flow, order history, refund/support links, and entitlement display.

Product pages create checkout intent only. They do not grant entitlements or in-game items.
