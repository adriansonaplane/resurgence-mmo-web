# Database Schema

Drizzle schema is grouped by PostgreSQL schema:

- `auth`: user profiles, Auth0 identities, cached roles.
- `player`: character summaries, account flags, account preferences, public profile settings, character summary read models, achievement summary read models.
- `store`: products, categories, assets, prices.
- `billing`: orders, order items, Stripe events, Stripe customers, entitlements, refunds.
- `support`: contact messages, support tickets, support events, bug reports, ban appeals, account recovery requests, known issue references.
- `audit`: audit events, admin actions, security events.
- `admin`: admin dashboard metadata and player report references.
- `integration`: Account Service events and entitlement handoff events.

Runtime application queries use `DATABASE_URL`, the pooled Neon-compatible connection. Migration commands use `DIRECT_DATABASE_URL`.

Critical constraints:

- `billing.stripe_events.stripe_event_id` is unique.
- Webhook events are persisted before processing.
- Entitlement grants use uniqueness on user, entitlement key, source, and source order.
- Website tables may store character summaries, but not live inventory or game-authoritative state.

Companion-boundary source-of-truth notes:

| Table or data area | Source of truth |
| --- | --- |
| `player.public_profile_settings` | Website database |
| `player.character_summary_read_models` | Game Platform Service read model |
| `player.achievement_summary_read_models` | Game Platform Service read model |
| `support.bug_reports` | Website database |
| `support.ban_appeals` | Account Service |
| `support.account_recovery_requests` | Account Service |
| `support.known_issue_references` | Directus |
| `admin.dashboard_metadata` | Website database |
| `admin.player_report_references` | Account Service |
| `integration.account_service_events` | Account Service |
| `integration.entitlement_handoff_events` | Account/Entitlement Service |

The website database must not define mutable authoritative inventory, item, currency, loot, combat, zone, dungeon, XP, monster AI, or movement-validation tables.
