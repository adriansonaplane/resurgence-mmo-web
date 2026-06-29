# Data Ownership Boundary

The web platform uses a dedicated website database for web-owned data and read models. It must not directly write game-runtime tables.

## Source-of-Truth Notes

| Data | Source of truth |
| --- | --- |
| Web identity token | Auth0 |
| Web profile preferences | Website database |
| Public profile settings | Website database |
| Account status / bans / suspensions | Account Service |
| Storefront metadata | Website database / Directus depending on content type |
| Payment completion | Stripe verified webhook |
| Web order and web entitlement records | Website database |
| Game entitlement application | Account/Entitlement Service or game-owned service |
| Character summaries | Game Platform Service read model |
| Inventory, currency, items, loot, XP, combat, zones, dungeons | Game runtime |
