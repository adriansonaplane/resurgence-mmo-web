# Directus Seeds

Seed these collections in local/staging before smoke tests:

- `pages`: home, about, FAQ, terms, privacy, refund policy, community.
- `news_posts`: at least one published launch update.
- `patch_notes`: at least one published patch note.
- `storefront_blocks`: hero and store explainer blocks.
- `seo_metadata`: route-level title, description, and Open Graph metadata.

Draft content must not be consumed by Angular SSR public routes.

## Included Files

- `../collections/directus-collections.json` describes the intended collections and common fields.
- `sample-content.json` contains minimal local/staging smoke content.

Import strategy can be Directus CLI/API based once the local Directus container is initialized. Keep account, payment, entitlement, and admin business records out of Directus.
