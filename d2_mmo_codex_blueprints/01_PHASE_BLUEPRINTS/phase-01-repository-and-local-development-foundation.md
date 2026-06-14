# Phase 01 Blueprint - Repository and Local Development Foundation

    ## Goal

    Create working local skeletons for Angular SSR, NestJS Fastify, Directus, and local tooling.

    ## Codex Implementation Instructions

    - Scaffold Angular SSR frontend with route groups: public, store, account, admin, shared, core, auth, api, guards, interceptors, models.
- Scaffold NestJS backend with FastifyAdapter enabled in main.ts from first commit.
- Create backend module shells for auth, users, accounts, characters, storefront, products, orders, payments, webhooks, entitlements, news, contact, support, admin, audit, health, directus.
- Create Dockerfiles for website-frontend, website-api, website-cms.
- Create docker-compose.yml for frontend, API, CMS, Postgres-local, Mailpit, Stripe CLI.
- Add developer README and .env.example.

    ## Required Deliverables

    - `apps/frontend Angular SSR skeleton`
- `apps/api NestJS Fastify skeleton`
- `apps/cms Directus config`
- `docker-compose.yml`
- `.env.example`

    ## Acceptance Criteria

    - NestJS app uses FastifyAdapter and exposes /api/v1/health.
- Angular SSR renders public shell locally.
- Apps boot without production secrets.

    ## Guardrails

    - Preserve the approved stack from `00_START_HERE/CANONICAL_CONSTRAINTS.md`.
    - Keep secrets out of source control.
    - Add or update tests in the same phase as implementation.
    - Update documentation when introducing new routes, environment variables, schema changes, or external services.
    - Backend HTTP/API tests must use Fastify Inject, not Supertest.
