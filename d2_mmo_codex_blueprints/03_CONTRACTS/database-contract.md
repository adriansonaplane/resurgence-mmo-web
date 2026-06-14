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
