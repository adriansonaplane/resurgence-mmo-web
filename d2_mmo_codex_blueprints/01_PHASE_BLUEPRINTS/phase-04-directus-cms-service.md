# Phase 04 Blueprint - Directus CMS Service

    ## Goal

    Bring online CMS for news, patch notes, pages, FAQs, announcements, media metadata.

    ## Codex Implementation Instructions

    - Configure Directus Cloud Run/container service.
- Connect Directus to Neon PostgreSQL and Google Cloud Storage uploads.
- Create collections: news_posts, patch_notes, dev_blogs, pages, faq_entries, storefront_blocks, media_assets, announcements, seo_metadata.
- Configure draft/published workflow.
- Expose read-only published content API for Angular SSR.
- Seed sample content.

    ## Required Deliverables

    - `apps/cms/directus.env.example`
- `docs/cms/directus-collections.md`
- `apps/cms/seeds/README.md`

    ## Acceptance Criteria

    - Directus can create/edit/publish/unpublish content.
- Angular can read published content only.
- Media uploads target Google Cloud Storage.

    ## Guardrails

    - Preserve the approved stack from `00_START_HERE/CANONICAL_CONSTRAINTS.md`.
    - Keep secrets out of source control.
    - Add or update tests in the same phase as implementation.
    - Update documentation when introducing new routes, environment variables, schema changes, or external services.
    - Backend HTTP/API tests must use Fastify Inject, not Supertest.

## Companion Boundary Update

Directus should manage or scaffold collections for public pages, news, patch notes, media posts, development blogs, FAQ pages, support articles, public documentation pages, developer documentation pages if approved, known issue pages, portfolio pages, media gallery, and Alpha information pages.

Do not let Directus control authoritative gameplay balance/configuration, loot tables, item stats, or server configuration.
