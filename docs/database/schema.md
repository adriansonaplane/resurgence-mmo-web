# Database Schema

Drizzle schema is grouped by PostgreSQL schema:

- `auth`: user profiles, Auth0 identities, cached roles.
- `player`: character summaries, account flags, account preferences.
- `store`: products, categories, assets, prices.
- `billing`: orders, order items, Stripe events, Stripe customers, entitlements, refunds.
- `support`: contact messages, support tickets, support events.
- `audit`: audit events, admin actions, security events.

Runtime application queries use `DATABASE_URL`, the pooled Neon-compatible connection. Migration commands use `DIRECT_DATABASE_URL`.

Critical constraints:

- `billing.stripe_events.stripe_event_id` is unique.
- Webhook events are persisted before processing.
- Entitlement grants use uniqueness on user, entitlement key, source, and source order.
- Website tables may store character summaries, but not live inventory or game-authoritative state.
