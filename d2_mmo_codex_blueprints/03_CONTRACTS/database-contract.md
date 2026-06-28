# Database Contract Blueprint

## Required Initial Tables

Use Drizzle schema files to represent these domains and tables.

### auth
- `user_profiles`
- `auth0_identities`
- `user_roles_cache`

### player
- `character_summaries`
- `account_flags`
- `account_preferences`

### store
- `products`
- `product_categories`
- `product_assets`
- `product_prices`

### billing
- `orders`
- `order_items`
- `stripe_events`
- `stripe_customers`
- `entitlements`
- `refunds`

### support
- `contact_messages`
- `support_tickets`
- `support_ticket_events`

### audit
- `audit_events`
- `admin_actions`
- `security_events`

## Critical Columns

### billing.stripe_events

```text
id
stripe_event_id unique not null
event_type
payload_json
processed_at
processing_status
created_at
updated_at
```

### billing.entitlements

```text
id
user_id
entitlement_key
source
source_order_id
status
granted_at
revoked_at
expires_at
metadata_json
created_at
updated_at
```

### audit.audit_events

```text
id
actor_user_id
actor_auth0_subject
action
target_type
target_id
request_id
ip_address
user_agent
metadata_json
created_at
```

## Companion Boundary Database Additions

### web-owned profile/support/admin/integration schemas

Add or scaffold Drizzle tables for:

```text
player.public_profile_settings
player.character_summary_read_models
player.achievement_summary_read_models
support.bug_reports
support.ban_appeals
support.account_recovery_requests
support.known_issue_references
admin.dashboard_metadata
admin.player_report_references
integration.account_service_events
integration.entitlement_handoff_events
```

### Source-of-truth rule

Each shared/referenced data table must include documentation indicating whether the source of truth is:

```text
website database
Auth0
Account Service
Game Platform Service
Directus
Stripe
```

### Forbidden tables in website Drizzle schema

Do not create mutable authoritative tables for:

```text
inventory
items
currency
loot
combat_state
zone_state
dungeon_state
xp_rewards
monster_ai
movement_validation
```

Character summary read models are allowed only if clearly non-authoritative.
