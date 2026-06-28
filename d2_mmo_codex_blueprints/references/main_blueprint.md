# Main Codex Implementation Blueprint Prompt
## Diablo-Inspired MMORPG Companion Web Platform

You are Codex acting as a senior full-stack implementation agent.

Your task is to scan the local folder:

```text
d2_mmo_codex_blueprints
```

Then implement the software according to the blueprint package.

You must treat the blueprint package as the source of truth. The current blueprint package includes the Companion Web Platform Boundary update. That boundary is mandatory, not optional.

---

## 1. Primary Goal

Build the Companion Web Platform for a Diablo-inspired MMORPG using the required architecture, constraints, build phases, contracts, and acceptance gates.

The application is the non-realtime website/platform layer that supports the game. It includes:

- Public marketing website
- Public website launch path before playable Alpha
- Storefront
- Authenticated account portal
- Basic profile/account view
- Player profile portal with read-only character summary data
- Support portal
- Admin/internal tools
- Documentation/portfolio site area
- Directus-backed CMS content
- Directus-backed support articles, public pages, news, patch notes, development blogs, and optional developer-facing documentation
- Stripe checkout and two-layer entitlement flow
- Auth0/OAuth/OIDC authentication
- Account Service boundary for cross-boundary account/session/entitlement operations
- Dedicated website database separate from the game runtime database
- Neon PostgreSQL persistence through Drizzle ORM
- Cloud Run-oriented web deployment
- GitHub Actions CI/CD
- Required testing setup

The web platform supports the game, but it does not simulate the game.

---

## 2. Required First Step

Before writing code, inspect the blueprint folder in this order:

```text
d2_mmo_codex_blueprints/README.md
d2_mmo_codex_blueprints/CHANGELOG.md
d2_mmo_codex_blueprints/manifest.json

d2_mmo_codex_blueprints/00_START_HERE/CODEX_EXECUTION_PROTOCOL.md
d2_mmo_codex_blueprints/00_START_HERE/CANONICAL_CONSTRAINTS.md
d2_mmo_codex_blueprints/00_START_HERE/COMPANION_BOUNDARY_IMPLEMENTATION_NOTES.md
d2_mmo_codex_blueprints/00_START_HERE/REPO_TARGET_SHAPE.md

d2_mmo_codex_blueprints/03_CONTRACTS/boundary-contract.md
d2_mmo_codex_blueprints/03_CONTRACTS/acceptance-gates.md
d2_mmo_codex_blueprints/03_CONTRACTS/environment-contract.md
d2_mmo_codex_blueprints/03_CONTRACTS/api-contract.md
d2_mmo_codex_blueprints/03_CONTRACTS/database-contract.md

d2_mmo_codex_blueprints/references/README.md
d2_mmo_codex_blueprints/references/main_blueprint.md
d2_mmo_codex_blueprints/references/companion-web-platform-boundary.md
d2_mmo_codex_blueprints/references/web-application-build-plan.md
d2_mmo_codex_blueprints/references/website-platform-architecture.md
d2_mmo_codex_blueprints/references/UPDATED_TECH_STACK.md
```

Then inspect all files under:

```text
d2_mmo_codex_blueprints/01_PHASE_BLUEPRINTS
d2_mmo_codex_blueprints/02_SYSTEM_BLUEPRINTS
d2_mmo_codex_blueprints/04_TEMPLATES
d2_mmo_codex_blueprints/05_CHECKLISTS
```

Use the phase blueprints as the implementation sequence.

---

## 3. Companion Web Platform Boundary

The Companion Web Platform is a related but separate system from the core MMO runtime.

### 3.1 Core Rule

```text
The web platform supports the game.
It does not simulate the game.
```

The web platform may display game-related information, manage accounts, support purchases, expose dashboards, publish content, or support administrative workflows. It must not own realtime combat, movement, loot generation, dungeon state, monster AI, zone state, WebRTC gameplay transport, or authoritative gameplay state.

### 3.2 Core MMO Runtime Owns

```text
Godot Client
WebRTC / Protobuf
Gateway Service
C++ Zone Servers
C++ Dungeon Instance Servers
Game Platform Services
Game PostgreSQL database
Redis / NATS / NATS JetStream where applicable
Realtime combat, movement, loot, inventory, currency, XP, zones, dungeons, and authoritative gameplay state
```

### 3.3 Companion Web Platform Owns or Supports

```text
Angular web client
NestJS + Fastify web backend
Auth0/OAuth/OIDC login flows
Account portal
Public website
Directus content system
Storefront APIs
Website database
Support tools
Admin dashboard
Documentation/portfolio pages
Web-owned audit logs
Web-owned order records
Web-owned entitlement records
```

### 3.4 Required Account Service Boundary

The web platform must call an Account Service or boundary layer for cross-boundary account/session/game entitlement operations.

Recommended flow:

```text
Website
→ Web Backend
→ Account Service
→ Account / Identity Records
→ Game Session / Entitlement Validation
```

The website must not directly own all game identity/session behavior. The Gateway and game services must validate game sessions independently.

### 3.5 Auth0 Boundary

Auth0 may be used for website login and may be evaluated for game login. However, this is tentative for long-term game login.

The game runtime must not blindly trust a web login. It must create and validate its own game session.

Recommended model:

```text
Player authenticates through Auth0
→ Web Platform or Account Service validates identity
→ Game session is created
→ Gateway validates game session
→ Zone server accepts only validated player connection
```

### 3.6 Data Ownership Boundary

The website platform must use its own website database.

Website-owned data may include:

- CMS content
- Website pages
- Support tickets
- Web account preferences
- Storefront metadata
- Order history references
- Admin dashboard metadata
- Public profile settings
- Web audit records
- Web session metadata
- Non-authoritative display data

Game-owned data must remain controlled by game services and must not be directly modified by the web platform.

Game-owned data includes:

- Characters
- Character stats
- Skills
- Inventory
- Equipment
- Items
- Currency
- Loot
- Dungeon progress
- Combat state
- Zone state
- Game mutation audit logs

The website may request or display selected game data through APIs or read models, but it must not directly mutate game-critical tables.

### 3.7 Entitlement Boundary

Stripe entitlements may exist in both the web-account layer and the game-account layer.

Recommended flow:

```text
Player purchases product on website
→ Stripe confirms transaction
→ Web backend records order
→ Web entitlement record is created
→ Account / Entitlement Service validates entitlement
→ Game account entitlement is created or updated
→ Game service applies permitted benefit
```

An entitlement is not automatically an in-game item.

Game-impacting benefits must not be granted directly by the website frontend or by direct website writes to game inventory/currency/item tables.

### 3.8 Admin Tool Boundary

Admin tools may live inside the website platform for early development, but they must be treated as sensitive internal tools.

Admin actions must:

- Require authentication
- Require authorization
- Use role-based permissions
- Emit audit logs
- Avoid direct game database mutation where possible
- Use reviewed service endpoints
- Support rollback or investigation when practical

Examples of sensitive admin actions:

- Ban account
- Modify account status
- Grant entitlement
- Inspect inventory through safe service/read model only
- Review audit logs
- Reset stuck character through approved game service workflow only
- Resolve support ticket

If the public website and admin tooling become too tightly coupled, admin tools should later move to a separate internal operations app.

### 3.9 Directus Boundary

Directus may manage:

- Marketing pages
- News posts
- Patch notes
- Public pages
- FAQ pages
- Media posts
- Development blogs
- Support articles
- Public documentation pages
- Developer-facing documentation if approved

Directus must not directly control authoritative gameplay data, live balance data, loot tables, item stats, server configuration, or gameplay rules unless a separate reviewed configuration pipeline is explicitly created later.

### 3.10 Deployment Boundary

The Companion Web Platform deploys separately from the real-time game runtime.

Website platform:

```text
Google Cloud Run
Docker
GitHub Actions
Managed database / Neon PostgreSQL
Directus
Auth0
Stripe if commerce is enabled
```

Game runtime:

```text
Docker first
Local/staging services first
Kubernetes foundation later
Agones foundation later
Full Kubernetes/Agones when needed
```

Do not make real-time gameplay depend on website availability.

---

## 4. Critical Architecture Constraints

You must follow these constraints exactly:

```text
Frontend:
Angular
Angular SSR
Angular prerendering where appropriate
TypeScript

Frontend Testing:
Angular Testing Utilities
Playwright
Jest

Backend:
Node.js
NestJS
Fastify Adapter
TypeScript
Class Validator / Class Transformer
OpenAPI / Swagger

Backend Testing:
Jest
Fastify Inject
Testcontainers

Database:
Dedicated website database
Neon PostgreSQL
Drizzle ORM
Drizzle migrations
Pooled runtime connection
Direct migration connection

CMS:
Directus

Authentication:
Auth0
OAuth 2.0
OpenID Connect
Role-Based Access Control
Admin permissions
Game session validation through Account Service / Gateway boundary

Payments:
Stripe Checkout
Stripe Webhooks
Stripe Customer Portal if needed
Stripe test mode for development
Webhook-first order and entitlement processing

Hosting Target:
Google Cloud Run

CI/CD:
GitHub Actions

Storage:
Google Cloud Storage

Async Processing:
Cloud Tasks or Pub/Sub, where needed

Observability:
Sentry
OpenTelemetry
Cloud Logging-compatible structured logs

Email:
Postmark, SendGrid, Mailgun, or Amazon SES placeholder integration
```

---

## 5. Explicit Prohibitions

Do not introduce these unless the blueprints are updated later:

```text
Do not use plain Express as the backend framework.
Do not use Supertest.
Do not use Prisma.
Do not replace Drizzle with another ORM.
Do not replace Directus with a custom CMS.
Do not bypass Auth0/OAuth/OIDC.
Do not treat a web login as a validated game session.
Do not directly mutate live game inventory from the website.
Do not directly mutate game currency from the website.
Do not directly mutate XP, combat state, zone state, dungeon state, or loot state from the website.
Do not grant in-game items directly from the website API.
Do not write directly to game-critical tables from the web platform.
Do not use Directus as authoritative gameplay configuration.
Do not treat Stripe redirect success as proof of purchase.
Do not make the game runtime depend on the public website being online.
```

The website may grant web-account entitlements only after verified Stripe webhook events. Game-relevant entitlements must be validated through the Account / Entitlement Service boundary before the game applies any benefit.

---

## 6. Implementation Order

Implement the project according to the numbered phase blueprints in:

```text
d2_mmo_codex_blueprints/01_PHASE_BLUEPRINTS
```

Follow the phase order exactly unless a blueprint explicitly says otherwise.

For each phase:

1. Read the phase blueprint completely.
2. Read any referenced system blueprints.
3. Read boundary-related blueprints when the phase touches auth, account, profile, admin, support, storefront, entitlements, CMS, or deployment.
4. Implement only what the phase requires.
5. Add or update tests required by that phase.
6. Run the relevant checks if possible.
7. Record assumptions in a project note or implementation log.
8. Move to the next phase only after the current phase acceptance criteria are satisfied.

Boundary-related blueprints include:

```text
02_SYSTEM_BLUEPRINTS/companion-web-platform-boundary-blueprint.md
02_SYSTEM_BLUEPRINTS/account-service-boundary-blueprint.md
02_SYSTEM_BLUEPRINTS/player-profile-read-model-blueprint.md
02_SYSTEM_BLUEPRINTS/support-portal-blueprint.md
02_SYSTEM_BLUEPRINTS/documentation-portfolio-site-blueprint.md
03_CONTRACTS/boundary-contract.md
```

---

## 7. Expected Repository Shape

Create or update the repository so it follows the intended target shape from:

```text
00_START_HERE/REPO_TARGET_SHAPE.md
```

At minimum, the project should support a structure similar to:

```text
/
  frontend/
  backend/
  cms/
  worker/
  docs/
  references/
  docker-compose.yml
  .github/workflows/
  .env.example
  README.md
```

There is a base skeleton already laid out to use. Modify it as needed, but preserve existing useful structure and references.

If the repo already includes a nested `d2_mmo_codex_blueprints/README.md` and `d2_mmo_codex_blueprints/references/`, preserve and update them instead of deleting them.

---

## 8. Backend Requirements

The backend must be a NestJS application using the Fastify adapter.

Required backend expectations:

- `main.ts` must bootstrap NestJS with `FastifyAdapter`.
- The backend must listen on `process.env.PORT` with a local fallback.
- Use `0.0.0.0` for Cloud Run compatibility.
- Enable validation pipes.
- Use Fastify-compatible plugins, not Express middleware.
- Support raw body handling for Stripe webhook signature verification.
- Add health endpoints.
- Add structured error handling.
- Add request validation.
- Add Auth0 JWT validation guards.
- Add role/permission guard structure.
- Add Drizzle database module.
- Add Account Service client/boundary module or stubbed boundary adapter.
- Add player profile read-model endpoints for safe character/profile display.
- Add support portal modules for tickets, bug reports, ban appeals, and account recovery placeholders.
- Add documentation/portfolio routing/API support where needed.
- Add Stripe payment/webhook modules.
- Add entitlement module with web-account and game-account handoff separation.
- Add audit logging module.
- Add OpenAPI/Swagger support where appropriate.

Backend HTTP/API tests must use:

```text
Fastify Inject
```

Do not use Supertest.

---

## 9. Frontend Requirements

The frontend must be Angular with SSR enabled.

Required frontend expectations:

- Public marketing routes
- Public website MVP suitable to launch before playable Alpha
- Storefront routes
- Account portal routes
- Player profile portal routes using read-only display data
- Support portal routes
- Documentation/portfolio pages
- Admin shell routes
- Auth route guards
- API service layer
- Error/loading states
- SEO metadata for public/store/news/docs pages
- SSR/prerender strategy where appropriate
- Client-side rendering for private dashboard/admin sections

Frontend tests must use:

```text
Angular Testing Utilities
Jest
Playwright
```

---

## 10. Database Requirements

Use Drizzle ORM and Neon PostgreSQL-compatible schema design.

Required database expectations:

- Dedicated website database separate from the game runtime database
- Drizzle schema files
- Drizzle migration setup
- Runtime pooled connection configuration
- Direct migration connection configuration
- Tables/schemas for users, profiles, public profile settings, products, orders, Stripe events, web entitlements, audit events, support/contact data, admin dashboard metadata, Directus/CMS integration references, and non-authoritative display/read-model data as required by the blueprints
- Idempotent Stripe event persistence
- Transaction-safe web entitlement granting
- Boundary-safe game entitlement handoff status tracking
- No direct writes to game-critical tables

Do not use Prisma.

---

## 11. Directus Requirements

Directus is the CMS layer.

Required expectations:

- Directus service/config shape
- CMS collections documented or scaffolded
- Integration path for Angular SSR public content
- Collections for news, patch notes, public pages, FAQ, media posts, development blogs, support articles, public documentation pages, and optional developer-facing documentation
- Storage/media assumptions
- Environment variables documented
- Separation between CMS content and NestJS application authority
- Explicit warning that Directus must not control authoritative gameplay data, live balance data, loot tables, item stats, or server configuration

Directus should not replace the NestJS backend.

---

## 12. Stripe Requirements

Stripe must be implemented according to the webhook-first model.

Required expectations:

- Checkout Session creation endpoint
- Stripe webhook endpoint
- Raw body signature verification
- Stripe event idempotency
- Internal order records
- Web entitlement grant only after verified webhook event
- Entitlement handoff to Account / Entitlement Service for game-account validation
- Duplicate webhook events must not duplicate entitlements
- Refund/subscription event handling stubs where required by the blueprint

The checkout success page is not proof of purchase.

---

## 13. Auth Requirements

Use Auth0 with OAuth 2.0 and OpenID Connect for the web platform.

Required expectations:

- Auth0 configuration
- JWT validation guard
- Role/permission guard structure
- Local user profile sync or placeholder
- Account Service identity/session boundary
- Admin route protection
- Backend authorization as the source of truth
- Frontend guards only for UX, not security
- Do not treat website login state as a game session
- Document Auth0-for-game-login as tentative and subject to later cost/vendor/security review

---

## 14. Account Service Boundary Requirements

Implement or scaffold the web-side Account Service boundary.

Required expectations:

- Account Service client interface or adapter
- Configurable base URL and service auth placeholder
- Methods for identity validation, account status lookup, game session request/validation handoff, entitlement validation/handoff, ban/suspension status lookup, and safe profile summary fetch where applicable
- No direct game database writes
- Clear error handling for unavailable Account Service
- Audit logs for sensitive cross-boundary operations

---

## 15. Player Profile Read Model Requirements

The website may expose player profile and character summary data only through safe read models or approved APIs.

Required expectations:

- Public/private profile settings
- Character list display
- Character summary display
- Class display
- Level/progression summary
- Achievement display placeholder
- Future guild/match/dungeon history placeholders
- No direct mutation of real-time gameplay state
- No direct inventory/currency/item mutation

---

## 16. Support Portal Requirements

Implement or scaffold support portal features.

Required expectations:

- Help/support entry point
- Support articles from Directus where practical
- Contact/support ticket form
- Bug report form
- Ban appeal form or placeholder
- Account recovery assistance placeholder
- Known issue tracker placeholder
- Admin/support review workflow placeholder
- Audit logs for sensitive support/admin actions

---

## 17. Admin Requirements

Admin tools may live inside the website platform for early development.

Required expectations:

- Strong authentication
- Role-based authorization
- Audit logging
- Admin shell protected by backend authorization
- Account lookup
- Character lookup through safe read model/service only
- Support review
- Ban/suspension tools through Account Service boundary or placeholder
- Player reports placeholder
- Server status/deployment status links
- Operational dashboard links
- Audit log search
- Customer support workflows

Avoid direct database mutation where possible, especially for game-owned data.

---

## 18. Testing Requirements

Implement the testing setup from the blueprints.

Required backend testing:

```text
Jest
Fastify Inject
Testcontainers
```

Required frontend testing:

```text
Angular Testing Utilities
Jest
Playwright
```

Test at least:

- Health endpoint
- Auth guard rejection
- Product listing
- Checkout session validation
- Stripe webhook signature failure
- Stripe webhook success path
- Duplicate Stripe event idempotency
- Web entitlement grant
- Account Service handoff mocked success/failure
- Boundary rejection for direct game mutation attempts
- Audit log creation
- Support ticket creation
- Admin permission enforcement
- CMS content rendering path
- Public frontend route render
- Protected frontend route behavior
- Basic Playwright smoke flow

---

## 19. CI/CD Requirements

Create GitHub Actions workflows according to the blueprint templates.

The pipeline should include:

- Install dependencies
- Lint
- Typecheck
- Frontend tests
- Backend tests
- Fastify Inject API tests
- Testcontainers integration tests where feasible
- Build frontend
- Build backend
- Build Directus image/config where applicable
- Playwright smoke tests where applicable
- Boundary regression checks confirming no Express/Supertest/Prisma and no direct game-critical writes

Deployment should be Cloud Run-oriented, but it is acceptable to use placeholders for project IDs, service names, and secrets.

---

## 20. Docker / Local Development Requirements

Use the Docker Compose setup and blueprint templates where provided.

Local development should support:

- Angular frontend
- NestJS Fastify API
- Directus CMS
- Dedicated website PostgreSQL database
- Test database
- Optional Redis
- Stripe CLI webhook listener documentation or placeholder
- Mailpit or email placeholder if included
- Testcontainers-compatible Docker runtime

The web local development environment should remain understandable as a separate layer from the game local development environment. Full-stack integration can be added later.

---

## 21. Documentation Requirements

Update or create README files that explain:

- How to install dependencies
- How to configure `.env`
- How to run frontend
- How to run backend
- How to run Directus
- How to run migrations
- How to run tests
- How to run Playwright
- How to run local Docker Compose
- How to verify acceptance gates
- How the Companion Web Platform boundary works
- How the Account Service boundary works
- Which files are authoritative implementation references

Preserve useful blueprint references under:

```text
d2_mmo_codex_blueprints/references
```

Do not delete the nested `d2_mmo_codex_blueprints/README.md`. Update it when implementation changes affect package usage.

---

## 22. Output Requirements

When finished, provide:

1. Summary of implemented phases.
2. Files created or modified.
3. Commands to install, run, test, and build.
4. Any missing secrets or environment values.
5. Any assumptions made.
6. Any blueprint items not implemented and why.
7. Confirmation that Supertest was not added.
8. Confirmation that plain Express backend was not introduced.
9. Confirmation that Prisma was not introduced.
10. Confirmation that Drizzle, Directus, Auth0/OAuth/OIDC, Stripe, NestJS Fastify, GitHub Actions, and Fastify Inject are represented.
11. Confirmation that Account Service boundary handling is represented.
12. Confirmation that website DB and game DB boundaries are preserved.
13. Confirmation that no direct game-critical table writes were added.
14. Confirmation that Directus does not control authoritative gameplay configuration.
15. Confirmation that Stripe redirect success is not treated as proof of purchase.

---

## 23. Quality Bar

Do not generate placeholder-only code unless a blueprint explicitly says a placeholder is acceptable.

Prefer small, working vertical slices over large incomplete scaffolds.

Keep the repository buildable at each major phase.

Use TypeScript strictly where configured.

Keep secret values out of source control.

Use `.env.example` for required environment keys.

Use clear module boundaries.

Preserve the website/game separation:

```text
Website:
accounts, storefront, payments, CMS content, dashboard, admin tools, support tools, documentation/portfolio pages, web-owned entitlements, web audit logs

Account Service boundary:
identity validation, account status, game session handoff, game-account entitlement validation, safe cross-boundary account operations

Game backend:
real-time simulation, movement, combat, live inventory authority, item creation, currency mutation, XP rewards, loot generation, zone state, dungeon state, WebRTC gameplay transport
```

Begin by reading `d2_mmo_codex_blueprints/README.md`, then `d2_mmo_codex_blueprints/00_START_HERE/CODEX_EXECUTION_PROTOCOL.md`, then implement the blueprints phase by phase.
