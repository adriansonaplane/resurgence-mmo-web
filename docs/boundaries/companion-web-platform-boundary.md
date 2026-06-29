# Companion Web Platform Boundary

The Companion Web Platform supports the MMO through public content, accounts, storefront, support, admin tooling, and documentation. It does not simulate realtime gameplay.

## Website Responsibilities

- Public marketing and launch-readiness pages.
- Account dashboard and profile settings.
- Storefront and webhook-first web entitlements.
- Support portal intake and admin review tools.
- Directus-backed content, documentation, and support articles.

## Game Runtime Responsibilities

- Movement, combat, AI, zones, dungeons, loot, inventory, currency, XP, and realtime replication.
- Gateway validation and live game sessions.
- Game-account entitlement application.

Any web feature that needs game-account/session data must use a boundary client or reviewed read model.
