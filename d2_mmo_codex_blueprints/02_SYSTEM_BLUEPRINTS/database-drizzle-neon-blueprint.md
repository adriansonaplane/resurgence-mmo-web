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
