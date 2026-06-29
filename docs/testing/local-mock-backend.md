# Local Mock Backend Mode

This project can simulate the provisioned companion-platform gates while Auth0, Stripe, Directus, Neon, and Cloud Run are still pending.

## What is mocked locally

- **Authentication:** the frontend login page stores development bearer tokens (`test-player` and `test-admin`) in local storage; the API accepts these tokens outside production.
- **Content/CMS:** `DirectusService` serves seeded in-memory collections for news, patch notes, docs, support articles, known issues, portfolio entries, media gallery items, and alpha info.
- **Store processing:** `POST /api/v1/payments/mock-complete` creates a paid mock order and grants the account-level entitlement through the same `EntitlementsService` handoff path used by verified webhooks.
- **Database-like state:** orders, entitlements, support tickets, bug reports, ban appeals, account recovery requests, profile settings, and audit events are held in process memory for local development.

## Recommended local flow

1. Start the API and frontend.
2. Use `/login` and choose **Continue as Player**.
3. Open `/store/products/founder-pack`.
4. Click **Simulate Local Purchase**.
5. Open `/account` and confirm the mock order/entitlement appears.
6. Open `/support`, `/docs`, `/portfolio`, `/media`, `/alpha`, and `/profile/rook` to verify mock content and read-model surfaces.

## Guardrails

- Mock purchase completion is disabled when `NODE_ENV=production`.
- Mock purchase completion still goes through backend order and entitlement services; checkout success pages do not grant entitlements.
- Game-state data remains read-only display data. Inventory, currency, loot, XP, combat, movement, zones, and dungeons remain game-runtime-owned.
