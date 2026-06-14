# Entitlement Bridge Contract

The website grants account-level entitlements only. The game backend remains authoritative for live inventory, movement, combat, zones, matchmaking, and world state.

## Entitlement Keys

- `base_game_access`
- `alpha_access`
- `beta_access`
- `founder_pack`
- `cosmetic_*`
- `expansion_*`
- `premium_stash_tab`

## Read Contract

`GET /api/v1/entitlements/bridge`

Headers:

- `x-game-service-token`: service credential issued through Secret Manager.
- `x-auth0-subject`: Auth0 subject to query.

Response:

```json
{
  "entitlements": [
    {
      "auth0Subject": "auth0|player",
      "entitlementKey": "founder_pack",
      "source": "stripe_webhook",
      "status": "active"
    }
  ]
}
```

Reads are authenticated and should be audited when promoted from the in-memory foundation to persistent storage.
