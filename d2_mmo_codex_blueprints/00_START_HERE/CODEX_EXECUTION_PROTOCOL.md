# Codex Execution Protocol

Codex must treat this package as the authoritative construction blueprint for the Diablo-Inspired MMORPG Website Platform.

## Execution Rules

1. Work phase-by-phase in numeric order.
2. Do not skip acceptance criteria.
3. Do not replace the approved stack with alternatives.
4. Do not use Express as the backend framework surface.
5. Do not use Supertest in backend tests.
6. Do not store secrets in source control.
7. Do not grant purchases from the checkout success page.
8. Do not mutate live character inventory from website APIs.
9. Do not make Directus responsible for account, payment, entitlement, or admin business logic.
10. Every phase should finish with tests, documentation updates, and a clear commit boundary.

## Required Commit Style

Use small commits grouped by phase and subsystem.

Examples:

```text
phase-01: scaffold Angular SSR frontend
phase-01: scaffold NestJS Fastify API
phase-03: add Drizzle schema and initial migrations
phase-07: add Auth0 JWT guards and profile sync
phase-10: add Stripe webhook idempotency
```

## Definition of a Complete Codex Task

A Codex-generated task is complete only when:

- Code compiles.
- Lint passes.
- Typecheck passes.
- Relevant tests pass.
- New environment variables are documented in `.env.example`.
- New routes are documented in API notes or OpenAPI annotations.
- New database changes include Drizzle migration updates.
- Security-sensitive actions have audit logging.
- The phase acceptance criteria are satisfied.

## Companion Boundary Update

After reading this file, also read:

```text
00_START_HERE/COMPANION_BOUNDARY_IMPLEMENTATION_NOTES.md
references/companion-web-platform-boundary.md
02_SYSTEM_BLUEPRINTS/companion-web-platform-boundary-blueprint.md
02_SYSTEM_BLUEPRINTS/account-service-boundary-blueprint.md
03_CONTRACTS/boundary-contract.md
```

These files are now part of the source of truth. They define the companion web platform as a non-realtime system, require Account Service boundaries for account/game identity handoffs, require a dedicated website database, and prohibit direct game-critical state mutations from the web platform.
