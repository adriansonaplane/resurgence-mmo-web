# Boundary Contract - Companion Web Platform vs Core MMO Runtime

## Core Rule

The web platform supports the game. It does not simulate the game.

## Web Platform Owns

```text
public website
account portal
website content
storefront
support tools
admin dashboards
player-facing web views
public project presentation
web audit records
web session metadata
web order records
web entitlement records
```

## Core MMO Runtime Owns

```text
real-time gameplay
movement
combat
inventory authority
item creation / duplication checks
currency mutation
loot generation
zone state
dungeon state
server tick loop
WebRTC gameplay transport
C++ zone and dungeon server lifecycle
```

## Account Service Boundary

Account-related cross-boundary operations must go through an Account Service or explicit service contract.

## Entitlement Boundary

The website may create web entitlements after verified Stripe webhooks. Game entitlements must be validated/applied by an Account/Entitlement Service or game-owned service.

## Acceptance Criteria

- No website controller directly writes game-critical tables.
- Game-owned data access is read-only or service-mediated.
- Shared data has a source-of-truth note.
- Admin actions are audited.
