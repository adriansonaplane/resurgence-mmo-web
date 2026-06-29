# Account Service Boundary Contract

The Companion Web Platform uses Auth0 for web authentication, but Auth0 web login is not a game session. Cross-boundary account, game-session, ban/suspension, and game-account entitlement operations must go through the Account Service client abstraction in the API.

## Boundary Flow

```text
Angular website
-> NestJS Fastify API
-> Account Service client
-> Account / Identity records
-> Game session / entitlement validation
```

## Current Implementation Status

The API currently ships a stubbed `AccountServiceClient` so web controllers can depend on a boundary contract before the real Account Service exists. Stub responses must not be interpreted as live game authorization.

## Operations

### Validate identity

Input: Auth0 subject from a verified web bearer token.

Output: account status summary containing account state, support flags, and game-session eligibility.

Source of truth: Auth0 for web identity; Account Service for cross-boundary account status.

### Create game session placeholder

Input: Auth0 subject from a verified web bearer token.

Output: a contract placeholder with `webSessionIsGameSession: false` and `gatewayValidationRequired: true`.

Source of truth: Game runtime and Gateway validation. The website must never treat this placeholder as gameplay admission.

### Read account status

Input: Auth0 subject.

Output: active/suspended/banned/unknown status plus support flags.

Source of truth: Account Service.

### Read support flags and ban/suspension status

Input: Auth0 subject or account id.

Output: support-visible account flags and moderation status.

Source of truth: Account Service or a reviewed support integration, not arbitrary website table writes.

### Sync display name / public profile settings

Input: Authenticated web profile changes.

Output: accepted or rejected sync request.

Source of truth: website database for public profile settings; Account Service or Game Platform Service for game-account names.

### Validate entitlement handoff

Input: web entitlement created after a verified Stripe webhook.

Output: handoff event accepted/queued/failed for Account or Entitlement Service processing.

Source of truth: Stripe for payment event, website database for web entitlement/order, Account/Entitlement Service for game-account entitlement application.

## Guardrails

- Do not treat Auth0 web login as game login.
- Do not bypass Gateway or game-session validation.
- Do not mutate game inventory, currency, items, combat, zones, dungeons, loot, or XP from the website.
- Do not let feature controllers call game databases directly; use the Account Service client abstraction.
