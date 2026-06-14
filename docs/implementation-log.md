# Implementation Log

## 2026-06-13 Blueprint Pass

Implemented the blueprint target shape under `apps/frontend`, `apps/api`, and `apps/cms` while leaving the older `game-website-frontend` and `game-website-backend` folders untouched.

## 2026-06-14 Continuation Pass

Added concrete Cloud Run service YAML templates, Directus collection/seed definitions, Drizzle migration journal metadata, and database testing notes. These are still non-secret templates and require environment-specific replacement values before deployment.

Verification after this pass:

- New JSON artifacts parse successfully.
- `npm run lint` passed.
- Backend forbidden-pattern scan found no Supertest, API Express adapter, or Express adapter usage in `apps/api`.
- PR workflow now sets `RUN_TESTCONTAINERS=true` for the Testcontainers integration step.

## 2026-06-14 Blueprint Continuation Pass

Added permission-guard structure, placeholder email queue integration, and local tests for the contact flow. Added non-secret templates/runbooks for Artifact Registry, Secret Manager bindings, Cloud Tasks, Cloud Load Balancer/CDN/Armor routing, backup/recovery, incident response, OpenTelemetry/Sentry, and deferred live setup.

## Assumptions

- Local test tokens `Bearer test-player` and `Bearer test-admin` are development/test-only helpers. Production token validation remains Auth0 OAuth/OIDC JWT validation through the backend guard.
- Stripe placeholder keys return a mock checkout URL for local development, but entitlements are still granted only by the verified webhook path.
- In-memory services are used for the local vertical slice. Drizzle schemas and initial SQL migration define the persistent contract for the next database-backed implementation pass.
- Testcontainers migration tests are present but gated behind `RUN_TESTCONTAINERS=true` so local runs do not require Docker unless explicitly requested.
- Cloud Run, Secret Manager, Neon, Auth0, Stripe, Directus, GCS, Cloud Armor/CDN, Sentry, and OpenTelemetry resources require external provisioning before staging or production acceptance gates can be fully signed off.

## Verification Notes

- `npm run lint` passed.
- `npm run test` passed.
- `npm run test:integration` passed with the Testcontainers spec skipped unless `RUN_TESTCONTAINERS=true`.
- `npm run build` passed; Angular SSR generated server bundles and prerendered 8 static routes.
- `npm run test:e2e:smoke -w apps/frontend` passed when run with browser-launch approval.
- Forbidden backend/package scans found no Supertest, API Express adapter, or Prisma dependency in the implemented `apps/*` packages.
- `npm audit --audit-level=high` currently fails due upstream advisories in Drizzle ORM, esbuild/Angular tooling, and Testcontainers/docker dependencies. Several report no fix available at the time of this local pass.

## Not Fully Implemented

- Real Auth0 tenant integration and browser SDK wiring.
- Real Stripe Checkout products/prices and live webhook secrets.
- Database-backed repositories and executed Drizzle migrations against Neon.
- Directus collection creation through a running Directus instance.
- Cloud Run deployments, Artifact Registry pushes, Secret Manager bindings, and production edge resources.
- Worker service implementation; the MVP async plan is documented for Cloud Tasks/Pub/Sub.
