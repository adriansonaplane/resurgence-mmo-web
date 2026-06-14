# Directus Collections

Directus is the CMS/editorial layer only. It must not own account, payment, entitlement, or admin business logic.

| Collection | Purpose | Workflow |
|---|---|---|
| `news_posts` | Public news articles | draft/published |
| `patch_notes` | Patch and balance notes | draft/published |
| `dev_blogs` | Long-form developer updates | draft/published |
| `pages` | Stable public pages | draft/published |
| `faq_entries` | FAQ blocks | draft/published |
| `storefront_blocks` | Editorial store content blocks | draft/published |
| `media_assets` | Media metadata around uploads | draft/published |
| `announcements` | Time-boxed public notices | draft/published |
| `seo_metadata` | SEO and social metadata per route | draft/published |

Angular SSR reads published content only. Media uploads target Google Cloud Storage in staging and production.

Collection and sample content definitions live in:

- `apps/cms/collections/directus-collections.json`
- `apps/cms/seeds/sample-content.json`
