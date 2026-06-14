# Staging Release Candidate Checklist

- Deploy frontend/API/CMS/worker placeholders to staging Cloud Run.
- Run Drizzle migrations against Neon staging.
- Seed Directus content and storefront products.
- Configure Auth0 staging callbacks, logout URLs, audiences, and origins.
- Configure Stripe test-mode products, prices, and webhook endpoint.
- Run GitHub Actions PR suite.
- Run Playwright smoke tests against staging URLs.
- Manually verify content -> Angular -> Auth0 -> checkout -> webhook -> order -> entitlement -> dashboard.
- Verify admin audit and Directus editorial separation.
