# Canonical Constraints

These constraints are non-negotiable for every blueprint and Codex task.

## Required Technology Stack

| Area | Required Decision |
|---|---|
| Frontend | Angular + Angular SSR + TypeScript |
| Frontend Rendering | SSR for storefront/content SEO, prerendering for stable public pages, CSR for account/admin surfaces |
| Backend | Node.js + NestJS + Fastify Adapter + TypeScript |
| Backend Runtime Rule | Do not implement a plain Express backend |
| Database | Dedicated website database using Neon PostgreSQL or local PostgreSQL-compatible development database |
| ORM / Query Layer | Drizzle ORM and Drizzle migrations |
| CMS | Directus |
| Auth | Auth0 + OAuth 2.0 + OpenID Connect |
| Payments | Stripe Checkout + Stripe Webhooks |
| Payment Source of Truth | Verified Stripe webhook, never checkout success page alone |
| Hosting | Google Cloud Run containers listening on `PORT` and binding to `0.0.0.0` |
| CI/CD | GitHub Actions |
| Storage | Google Cloud Storage |
| Secrets | Google Secret Manager |
| Edge/Security | Cloud Load Balancer + Cloud CDN + Cloud Armor |
| Async Jobs | Cloud Tasks or Pub/Sub |
| Observability | Cloud Logging + Cloud Monitoring + Sentry + OpenTelemetry |
| Email | Postmark, SendGrid, Mailgun, or Amazon SES |
| Frontend Testing | Angular Testing Utilities + Playwright + Jest |
| Backend Testing | Jest + Fastify Inject + Testcontainers |
| Excluded Backend Test Tool | Supertest must not be used |

## Companion Web Platform Boundary

The Companion Web Platform is the non-realtime web layer supporting the MMORPG project. It owns or supports public website pages, account portal workflows, content, storefront, support tools, admin dashboards, documentation/portfolio pages, and other non-realtime workflows.

The web platform supports the game; it does not simulate the game.

## Game Runtime Boundary

The website must not own or directly mutate:

```text
real-time combat simulation
movement validation
monster AI
zone state
dungeon encounter state
loot generation
item creation
item duplication checks
direct inventory mutation
currency mutation
XP rewards
server tick loop
AoI calculations
snapshot replication
WebRTC gameplay transport
C++ zone server lifecycle
```

The game backend owns live inventory, combat, movement, zones, matchmaking, authoritative gameplay state, and world state.

## Account Service Boundary

The website must call an Account Service or explicit platform service contract for account/game identity operations that cross from web to game.

The web platform must not directly own all game identity behavior.

Required model:

```text
Website
-> Web Backend
-> Account Service
-> Account / Identity Records
-> Game Session / Entitlement Validation
```

Auth0 may be used for website login and may later support game login, but this remains tentative for long-term game identity. The game runtime must create and validate its own game session. The Gateway and game services must not blindly trust web login state.

## Data Ownership Boundary

Use a dedicated website database for web-owned data.

Game-owned tables and game-critical data must remain isolated from direct web writes.

Website-owned data may include:

```text
CMS content
website pages
support tickets
web account preferences
storefront metadata
order history references
admin dashboard metadata
public profile settings
web audit records
web session metadata
```

Game-owned data includes:

```text
characters
character stats
skills
inventory
equipment
items
currency
loot
dungeon progress
combat state
zone state
game mutation audit logs
```

Shared or referenced data must have a defined source of truth. Examples include account identity, entitlements, display name, public profile settings, account status, support flags, and ban/suspension status.

## Entitlement Boundary

Stripe entitlements may exist in both the web-account layer and the game-account layer.

Required flow:

```text
Player purchases product on website
-> Stripe confirms transaction
-> Web backend records order
-> Web entitlement record is created
-> Account / Entitlement Service validates entitlement
-> Game account entitlement is created or updated
-> Game service applies permitted benefit
```

An entitlement is not automatically an in-game item. Game-impacting rewards must not be granted directly by the website frontend.

## Directus Boundary

Directus may manage marketing/content pages and may also manage developer-facing documentation if approved.

Directus must not directly control authoritative gameplay data, live balance data, loot tables, item stats, or server configuration unless a separate reviewed configuration pipeline is created.

## Admin Boundary

Admin tools may live inside the website platform during early development, but they are sensitive internal tools.

Admin actions must:

```text
require authentication
require authorization
use role-based permissions
emit audit logs
avoid direct database mutation where possible
use reviewed service endpoints
support rollback or investigation when practical
```

If the public website and admin tooling become too tightly coupled, the admin dashboard should move to a separate internal operations app later.

## Public Website Timing

The public website should launch before the playable Alpha. Major web platform features should have MVP versions ready sometime during or before Alpha.

Minimum public website scope:

```text
landing page
project overview
development update area
media/mock-up area
contact/community link
basic account portal link if available
support or feedback entry point
Alpha information page when appropriate
```

## Deployment Boundary

The web platform deploys independently through Cloud Run, Docker, GitHub Actions, managed database, Directus, Auth0, and Stripe if commerce is enabled.

The game runtime may remain Docker/local or staged until Kubernetes and Agones are needed.
