# Database Blueprint - Neon PostgreSQL + Drizzle

## Purpose
Implement website persistence through Neon PostgreSQL and Drizzle ORM.

## Connection Rules

- Runtime application queries use Neon pooled connection string.
- Migration tasks use direct connection string.
- Do not hardcode database URLs.
- Do not commit secrets.

## Required Schema Domains

```text
auth
player
store
billing
cms
support
admin
audit
directus
```

## Initial Tables

```text
auth.user_profiles
auth.auth0_identities
auth.user_roles_cache
player.character_summaries
player.account_flags
player.account_preferences
store.products
store.product_categories
store.product_assets
store.product_prices
billing.orders
billing.order_items
billing.stripe_events
billing.stripe_customers
billing.entitlements
billing.refunds
support.contact_messages
support.support_tickets
support.support_ticket_events
audit.audit_events
audit.admin_actions
audit.security_events
```

## Critical Constraints

- `billing.stripe_events.stripe_event_id` must be unique.
- Entitlement grants must be idempotent.
- Sensitive state changes must create audit events.
- Character summaries may be displayed by the website, but live character inventory is game-backend-owned.

## Testing

- Drizzle migrations must be validated with Testcontainers.
- Transaction rollback must be tested for failed entitlement grant flows.

## Companion Boundary Additions

The web platform must use its own website database system. Do not model the game database as the website database.

Website-owned tables may include CMS references, website pages, support tickets, web account preferences, storefront metadata, order history references, admin dashboard metadata, public profile settings, web audit records, and web session metadata.

Game-owned data must not be directly mutated by Drizzle schemas in the website API:

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

If character/profile information is needed, use read-only summary tables or service/API read models.

Add tables or schema areas for:

```text
player.public_profile_settings
player.character_summary_read_models
support.bug_reports
support.ban_appeals
support.known_issue_references
admin.dashboard_metadata
integration.account_service_events
integration.entitlement_handoff_events
```

Shared or referenced data must have a declared source of truth.
