# Codex Blueprint Package
## Diablo-Inspired MMORPG Companion Web Platform

**Role:** System Architect  
**Purpose:** Convert the Web Application Build Plan and Companion Web Platform Boundary into implementation blueprints that Codex can use to write the software.  
**Current Version:** `0.3-main-blueprint-sync`

This package is designed to be delivered to Codex as the software construction guide. It does not contain production application code. It contains ordered implementation blueprints, repo layout requirements, API contracts, database schema guidance, testing requirements, deployment workflows, boundary contracts, and acceptance gates.

## Main Blueprint Prompt

The top-level implementation prompt is now included in:

```text
references/main_blueprint.md
```

If a separate root-level `main_blueprint.md` is provided beside this package, treat it as the active user-facing prompt and keep `references/main_blueprint.md` synchronized.

## How Codex Should Use This Package

1. Read `README.md` first.
2. Read `CHANGELOG.md` and `manifest.json`.
3. Read `references/main_blueprint.md`.
4. Read `00_START_HERE/CODEX_EXECUTION_PROTOCOL.md`.
5. Read `00_START_HERE/CANONICAL_CONSTRAINTS.md`.
6. Read `00_START_HERE/COMPANION_BOUNDARY_IMPLEMENTATION_NOTES.md`.
7. Read `00_START_HERE/REPO_TARGET_SHAPE.md`.
8. Read `03_CONTRACTS/boundary-contract.md` before other contracts.
9. Read the remaining contracts in `03_CONTRACTS/`.
10. Execute phase files in `01_PHASE_BLUEPRINTS/` in numeric order.
11. Use `02_SYSTEM_BLUEPRINTS/` for cross-cutting implementation details.
12. Use `04_TEMPLATES/` for starter config templates and CI/CD blueprints.
13. Use `05_CHECKLISTS/` before opening pull requests or declaring milestone completion.
14. Preserve and update `references/` when project-defining documents change.

## Highest-Priority Rules

- The Companion Web Platform supports the game but does **not** simulate the game.
- Use **NestJS with the Fastify Adapter from the first backend commit**.
- Use **Fastify Inject** for backend HTTP/API tests.
- Do **not** add Supertest.
- Do **not** add Prisma.
- Use **Drizzle ORM** for database schema, migrations, and typed data access.
- Use a **dedicated website database** separate from the game runtime database.
- Use **Directus** as the CMS layer, not as the NestJS backend replacement.
- Directus must not control authoritative gameplay data, live balance, loot tables, item stats, or server configuration.
- Use **Auth0 with OAuth 2.0 and OpenID Connect** for web authentication.
- Treat Auth0-for-game-login as tentative; the game runtime must still create and validate its own game session.
- Use **Stripe webhooks as the payment source of truth**.
- Keep website entitlements separate from live game inventory and simulation.
- Use the **Account Service boundary** for cross-boundary identity, account status, game session, ban/suspension, and game-account entitlement validation.
- The website must not directly mutate game-critical state.

## Package Map

```text
00_START_HERE/                  Codex execution rules and canonical constraints
01_PHASE_BLUEPRINTS/            Step-by-step implementation blueprints, phases 00-19
02_SYSTEM_BLUEPRINTS/           Architecture blueprints for frontend, backend, DB, auth, payments, CMS, boundary, support, deployment, testing
03_CONTRACTS/                   API, database, environment, boundary, and acceptance contracts
04_TEMPLATES/                   Docker Compose, env, GitHub Actions, Drizzle, NestJS Fastify starter templates
05_CHECKLISTS/                  PR, phase, MVP, launch, and anti-regression checklists
references/                     Source portfolio documents and current main blueprint prompt
```

## Companion Boundary v0.3 Update

This blueprint package incorporates `companion-web-platform-boundary.pdf` / `companion-web-platform-boundary.md`.

Major additions:

- Account Service boundary between web identity/account workflows and game account/session workflows.
- Dedicated website database boundary.
- Web/game data ownership rules.
- Directus documentation/support content scope.
- Two-layer web-account and game-account entitlement model.
- Expanded public website, account portal, player profile, support portal, documentation/portfolio, and admin dashboard blueprint requirements.
- Independent Cloud Run web deployment boundary while game runtime remains Docker/local/staged until Kubernetes/Agones are needed.
- Security/testing additions for CMS, support, admin, auth, payments, and entitlement handoff.

Codex should read `references/companion-web-platform-boundary.md` and `references/main_blueprint.md` before implementation.
