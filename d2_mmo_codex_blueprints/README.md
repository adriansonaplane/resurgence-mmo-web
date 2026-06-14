# Codex Blueprint Package
## Diablo-Inspired MMORPG Website Platform

**Role:** System Architect  
**Purpose:** Convert the Web Application Build Plan into implementation blueprints that Codex can use to write the software.

This package is designed to be delivered to Codex as the software construction guide. It does not contain production application code. It contains ordered implementation blueprints, repo layout requirements, API contracts, database schema guidance, testing requirements, deployment workflows, and acceptance gates.

## How Codex Should Use This Package

1. Read `00_START_HERE/CODEX_EXECUTION_PROTOCOL.md` first.
2. Read `00_START_HERE/CANONICAL_CONSTRAINTS.md` second.
3. Read `00_START_HERE/REPO_TARGET_SHAPE.md` third.
4. Execute phase files in `01_PHASE_BLUEPRINTS/` in numeric order.
5. Use `02_SYSTEM_BLUEPRINTS/` for cross-cutting implementation details.
6. Use `03_CONTRACTS/` for API, schema, environment, and acceptance contracts.
7. Use `04_TEMPLATES/` for starter config templates and CI/CD blueprints.
8. Use `05_CHECKLISTS/` before opening pull requests or declaring milestone completion.

## Highest-Priority Rules

- Use **NestJS with the Fastify Adapter from the first backend commit**.
- Use **Fastify Inject** for backend HTTP/API tests.
- Do **not** add Supertest.
- Use **Drizzle ORM** for database schema, migrations, and typed data access.
- Use **Directus** as the CMS layer, not as the NestJS backend replacement.
- Use **Auth0 with OAuth 2.0 and OpenID Connect** for authentication.
- Use **Stripe webhooks as the payment source of truth**.
- Keep website entitlements separate from live game inventory and simulation.

## Package Map

```text
00_START_HERE/                  Codex execution rules and canonical constraints
01_PHASE_BLUEPRINTS/            Step-by-step implementation blueprints, phases 00-19
02_SYSTEM_BLUEPRINTS/           Architecture blueprints for frontend, backend, DB, auth, payments, CMS, security, deployment, testing
03_CONTRACTS/                   API, database, environment, service, and acceptance contracts
04_TEMPLATES/                   Docker Compose, env, GitHub Actions, Drizzle, NestJS Fastify starter templates
05_CHECKLISTS/                  PR, phase, MVP, launch, and anti-regression checklists
references/                     Source portfolio documents included for context
```
