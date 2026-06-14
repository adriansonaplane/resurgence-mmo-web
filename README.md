# MMO Website Platform

Blueprint-driven website platform for a Diablo-inspired MMORPG. The target stack is Angular SSR, NestJS with the Fastify adapter, Drizzle ORM on PostgreSQL/Neon, Directus CMS, Auth0/OAuth/OIDC, Stripe Checkout/webhooks, and Cloud Run-oriented deployment.

## Repository Layout

- `apps/frontend` - Angular SSR public site, storefront, account dashboard, and admin shell.
- `apps/api` - NestJS Fastify API under `/api/v1`.
- `apps/cms` - Directus configuration, seed notes, and CMS documentation.
- `infra` - Cloud Run, secrets, storage, async, and edge planning.
- `docs` - phase deliverables, contracts, ADR backlog, testing, release, and operations notes.
- `docker-compose.yml` - local frontend/API/CMS/Postgres/Mailpit/Stripe CLI stack.

The older `game-website-frontend` and `game-website-backend` folders were inspected as the provided skeleton, but the blueprint target shape is implemented under `apps/*`.

## Install

```bash
npm install
```

## Configure

Copy `.env.example` into a local `.env` outside source control, then fill real Auth0, Stripe, Neon, Directus, email, Sentry, and GCP values for the target environment. Production secrets must live in Google Secret Manager.

## Run Locally

```bash
npm run dev:api
npm run dev:frontend
docker compose up postgres cms mailpit
```

API health is available at `http://localhost:8080/api/v1/health`. The Angular dev server runs on `http://localhost:4200`.

## Docker Compose

```bash
docker compose up --build
```

The compose stack starts Angular SSR, the NestJS Fastify API, Directus, PostgreSQL, Mailpit, and a Stripe CLI listener placeholder.

## Database

```bash
npm run db:generate
npm run db:migrate
```

Runtime application queries use `DATABASE_URL`; migrations use `DIRECT_DATABASE_URL`.

## Test And Build

```bash
npm run lint
npm run typecheck
npm run test:backend
npm run test:frontend
npm run test:integration
npm run test:e2e:smoke
npm run build
```

Backend HTTP tests use Fastify Inject. Supertest is intentionally not included.

The local integration command skips the Docker-backed Testcontainers case unless explicitly enabled:

```powershell
$env:RUN_TESTCONTAINERS = 'true'
npm run test:integration
Remove-Item Env:\RUN_TESTCONTAINERS
```

## Acceptance Gate Notes

- Checkout redirect success pages do not grant entitlements.
- Stripe entitlement grants are represented only in the verified webhook path.
- The website stores account-level entitlements only; live inventory and game state remain game-backend-owned.
- Cloud Run, Auth0, Stripe, Neon, Directus, GCS, and Secret Manager live resources require external provisioning before staging or production gates can be signed off.
