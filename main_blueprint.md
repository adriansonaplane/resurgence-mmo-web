You are Codex acting as a senior full-stack implementation agent.



Your task is to scan the local folder:



```text

d2\_mmo\_codex\_blueprints

```



Then implement the software according to the blueprint package.



You must treat the blueprint package as the source of truth.



\## Primary Goal



Build the web application described by the blueprints using the required architecture, constraints, build phases, contracts, and acceptance gates.



The application is the website platform for a Diablo-inspired MMORPG. It includes:



\* Public marketing website

\* Storefront

\* Authenticated account dashboard

\* Admin/internal tools

\* Directus-backed CMS content

\* Stripe checkout and entitlement flow

\* Auth0/OAuth/OIDC authentication

\* Neon PostgreSQL persistence through Drizzle ORM

\* Cloud Run-oriented deployment shape

\* GitHub Actions CI/CD

\* Required testing setup



\## Required First Step



Before writing code, inspect the blueprint folder in this order:



```text

d2\_mmo\_codex\_blueprints/00\_START\_HERE/CODEX\_EXECUTION\_PROTOCOL.md

d2\_mmo\_codex\_blueprints/00\_START\_HERE/CANONICAL\_CONSTRAINTS.md

d2\_mmo\_codex\_blueprints/00\_START\_HERE/REPO\_TARGET\_SHAPE.md

d2\_mmo\_codex\_blueprints/03\_CONTRACTS/acceptance-gates.md

d2\_mmo\_codex\_blueprints/03\_CONTRACTS/environment-contract.md

d2\_mmo\_codex\_blueprints/03\_CONTRACTS/api-contract.md

d2\_mmo\_codex\_blueprints/03\_CONTRACTS/database-contract.md

```



Then inspect all files under:



```text

d2\_mmo\_codex\_blueprints/01\_PHASE\_BLUEPRINTS

d2\_mmo\_codex\_blueprints/02\_SYSTEM\_BLUEPRINTS

d2\_mmo\_codex\_blueprints/04\_TEMPLATES

d2\_mmo\_codex\_blueprints/05\_CHECKLISTS

```



Use the phase blueprints as the implementation sequence.



\## Critical Architecture Constraints



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



Payments:

Stripe Checkout

Stripe Webhooks

Stripe Customer Portal if needed

Stripe test mode for development



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



\## Explicit Prohibitions



Do not introduce these unless the blueprints are updated later:



```text

Do not use plain Express as the backend framework.

Do not use Supertest.

Do not use Prisma.

Do not replace Drizzle with another ORM.

Do not replace Directus with a custom CMS.

Do not bypass Auth0/OAuth/OIDC.

Do not directly mutate live game inventory from the website.

Do not grant in-game items directly from the website API.

Do not treat Stripe redirect success as proof of purchase.

```



The website may grant account-level entitlements only after verified Stripe webhook events. The game backend remains authoritative for live character inventory, combat state, movement state, and real-time game systems.



\## Implementation Order



Implement the project according to the numbered phase blueprints in:



```text

d2\_mmo\_codex\_blueprints/01\_PHASE\_BLUEPRINTS

```



Follow the phase order exactly unless a blueprint explicitly says otherwise.



For each phase:



1\. Read the phase blueprint completely.

2\. Read any referenced system blueprints.

3\. Implement only what the phase requires.

4\. Add or update tests required by that phase.

5\. Run the relevant checks if possible.

6\. Record any assumptions in a project note or implementation log.

7\. Move to the next phase only after the current phase acceptance criteria are satisfied.



\## Expected Repository Shape



Create or update the repository so it follows the intended target shape from:



```text

00\_START\_HERE/REPO\_TARGET\_SHAPE.md

```



At minimum, the project should support a structure similar to:



```text

/

&#x20; frontend/

&#x20; backend/

&#x20; cms/

&#x20; worker/

&#x20; docs/

&#x20; docker-compose.yml

&#x20; .github/workflows/

&#x20; .env.example

&#x20; README.md

```



Respect the actual target shape in the blueprint file if it differs.

There is a base skeleton already laid out to use. Modify it as you need!



\## Backend Requirements



The backend must be a NestJS application using the Fastify adapter.



Required backend expectations:



\* `main.ts` must bootstrap NestJS with `FastifyAdapter`.

\* The backend must listen on `process.env.PORT` with a local fallback.

\* Use `0.0.0.0` for Cloud Run compatibility.

\* Enable validation pipes.

\* Use Fastify-compatible plugins, not Express middleware.

\* Support raw body handling for Stripe webhook signature verification.

\* Add health endpoints.

\* Add structured error handling.

\* Add request validation.

\* Add Auth0 JWT validation guards.

\* Add role/permission guard structure.

\* Add Drizzle database module.

\* Add Stripe payment/webhook modules.

\* Add entitlement module.

\* Add audit logging module.

\* Add OpenAPI/Swagger support where appropriate.



Backend HTTP/API tests must use:



```text

Fastify Inject

```



Do not use Supertest.



\## Frontend Requirements



The frontend must be Angular with SSR enabled.



Required frontend expectations:



\* Public marketing routes

\* Storefront routes

\* Account dashboard routes

\* Admin shell routes

\* Auth route guards

\* API service layer

\* Error/loading states

\* SEO metadata for public/store/news pages

\* SSR/prerender strategy where appropriate

\* Client-side rendering for private dashboard/admin sections



Frontend tests must use:



```text

Angular Testing Utilities

Jest

Playwright

```



\## Database Requirements



Use Drizzle ORM and Neon PostgreSQL-compatible schema design.



Required database expectations:



\* Drizzle schema files

\* Drizzle migration setup

\* Runtime pooled connection configuration

\* Direct migration connection configuration

\* Tables/schemas for users, profiles, products, orders, Stripe events, entitlements, audit events, support/contact data, and CMS integration as required by the blueprints

\* Idempotent Stripe event persistence

\* Transaction-safe entitlement granting



Do not use Prisma.



\## Directus Requirements



Directus is the CMS layer.



Required expectations:



\* Directus service/config shape

\* CMS collections documented or scaffolded

\* Integration path for Angular SSR public content

\* Storage/media assumptions

\* Environment variables documented

\* Separation between CMS content and NestJS application authority



Directus should not replace the NestJS backend.



\## Stripe Requirements



Stripe must be implemented according to the webhook-first model.



Required expectations:



\* Checkout Session creation endpoint

\* Stripe webhook endpoint

\* Raw body signature verification

\* Stripe event idempotency

\* Internal order records

\* Entitlement grant only after verified webhook event

\* Duplicate webhook events must not duplicate entitlements

\* Refund/subscription event handling stubs where required by the blueprint



The checkout success page is not proof of purchase.



\## Auth Requirements



Use Auth0 with OAuth 2.0 and OpenID Connect.



Required expectations:



\* Auth0 configuration

\* JWT validation guard

\* Role/permission guard structure

\* Local user profile sync or placeholder

\* Admin route protection

\* Backend authorization as the source of truth

\* Frontend guards only for UX, not security



\## Testing Requirements



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



\* Health endpoint

\* Auth guard rejection

\* Product listing

\* Checkout session validation

\* Stripe webhook signature failure

\* Stripe webhook success path

\* Duplicate Stripe event idempotency

\* Entitlement grant

\* Audit log creation

\* Public frontend route render

\* Protected frontend route behavior

\* Basic Playwright smoke flow



\## CI/CD Requirements



Create GitHub Actions workflows according to the blueprint templates.



The pipeline should include:



\* Install dependencies

\* Lint

\* Typecheck

\* Frontend tests

\* Backend tests

\* Fastify Inject API tests

\* Testcontainers integration tests where feasible

\* Build frontend

\* Build backend

\* Build Directus image/config where applicable

\* Playwright smoke tests where applicable



Deployment should be Cloud Run-oriented, but it is acceptable to use placeholders for project IDs, service names, and secrets.



\## Docker / Local Development Requirements



Use the Docker Compose setup and blueprint templates where provided.



Local development should support:



\* Angular frontend

\* NestJS Fastify API

\* Directus CMS

\* PostgreSQL or Neon-compatible local database path

\* Stripe CLI webhook listener documentation or placeholder

\* Mailpit or email placeholder if included

\* Testcontainers-compatible Docker runtime



\## Documentation Requirements



Update or create README files that explain:



\* How to install dependencies

\* How to configure `.env`

\* How to run frontend

\* How to run backend

\* How to run Directus

\* How to run migrations

\* How to run tests

\* How to run Playwright

\* How to run local Docker Compose

\* How to verify acceptance gates



Also preserve useful blueprint references under `docs/`.



\## Output Requirements



When finished, provide:



1\. Summary of implemented phases.

2\. Files created or modified.

3\. Commands to install, run, test, and build.

4\. Any missing secrets or environment values.

5\. Any assumptions made.

6\. Any blueprint items not implemented and why.

7\. Confirmation that Supertest was not added.

8\. Confirmation that plain Express backend was not introduced.

9\. Confirmation that Drizzle, Directus, Auth0/OAuth/OIDC, Stripe, NestJS Fastify, GitHub Actions, and Fastify Inject are represented.



\## Quality Bar



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

accounts, storefront, payments, CMS content, dashboard, admin tools, entitlements



Game backend:

real-time simulation, movement, combat, live inventory authority, zone state

```



Begin by reading `d2\_mmo\_codex\_blueprints/00\_START\_HERE/CODEX\_EXECUTION\_PROTOCOL.md`, then implement the blueprints phase by phase.



