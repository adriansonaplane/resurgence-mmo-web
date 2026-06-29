# Acceptance Gates

The repository now has a lightweight automated acceptance gate script:

```bash
npm run test:acceptance
```

The gate checks the companion-platform anti-regression rules that can be verified without external services:

- No `supertest`, `prisma`, or `@prisma/client` dependency is declared.
- Backend HTTP tests do not import or reference Supertest.
- Website Drizzle schemas do not define forbidden game-authoritative tables such as inventory, loot, combat, zones, dungeons, XP rewards, monster AI, or movement validation.
- Checkout success pages do not call checkout/grant APIs.
- New companion API contract routes remain documented.
- Boundary documentation exists for Account Service, data ownership, entitlement handoff, and companion platform separation.
- Drizzle migration journal metadata is present for future migration generation.

External acceptance gates still require provisioned services and are tracked in release/staging documentation:

- Auth0 tenant and OAuth/OIDC flows.
- Stripe webhook delivery.
- Directus published content.
- Neon/PostgreSQL migration execution with Testcontainers or staging database.
- Cloud Run, Secret Manager, Artifact Registry, Cloud CDN, and Cloud Armor deployment checks.
