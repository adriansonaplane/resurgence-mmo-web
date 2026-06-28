# System Blueprint - Account Service Boundary

## Purpose

Define how the web platform interacts with account/game identity behavior through a controlled Account Service boundary.

## Required Model

```text
Website Frontend
-> NestJS Web Backend
-> Account Service Client
-> Account / Identity Records
-> Game Session / Entitlement Validation
```

Auth0 can authenticate the user, but the game runtime must still create and validate its own game session.

## Required Backend Module

Create or scaffold:

```text
apps/api/src/modules/account-service/
  account-service.module.ts
  account-service.client.ts
  dto/
  account-service.types.ts
```

## Required Contracts

Create:

```text
docs/contracts/account-service-contract.md
```

Include operations for:

```text
validate identity
create game session placeholder
read account status
read support flags
read ban/suspension status
sync display name/public profile settings
validate entitlement handoff
```

## Guardrails

- Do not treat Auth0 web login alone as game login.
- Do not bypass Gateway/game session validation.
- Do not directly write game-account records from random web controllers.
- Cross-boundary account operations must go through the Account Service client abstraction.

## Acceptance Criteria

- Account Service boundary is documented.
- API client abstraction exists even if backed by a stub during early implementation.
- Game session creation/validation is represented as a contract, not implemented as live gameplay logic.
- Web session and game session are clearly separated.
