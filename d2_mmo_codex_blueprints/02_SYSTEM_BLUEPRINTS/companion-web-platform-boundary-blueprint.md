# System Blueprint - Companion Web Platform Boundary

## Purpose

Codify the boundary between the non-realtime Companion Web Platform and the real-time MMO runtime.

The web platform supports public, account, content, commerce, support, admin, and documentation workflows. It does not simulate the game.

## Web Platform Responsibilities

Implement or scaffold the web platform so it can support:

```text
public website
account portal
player profile portal
storefront
content management through Directus
admin dashboard
support portal
documentation / portfolio site
```

## Web Platform Non-Responsibilities

Do not implement game-authoritative systems in the web repository:

```text
real-time combat simulation
movement validation
monster AI
zone state
dungeon encounter state
loot generation
item creation
item duplication checks
direct inventory mutation
currency mutation
XP rewards
server tick loop
AoI calculations
snapshot replication
WebRTC gameplay transport
C++ zone server lifecycle
```

## Required Documentation Deliverables

Codex must create or update:

```text
docs/boundaries/companion-web-platform-boundary.md
docs/boundaries/account-service-boundary.md
docs/boundaries/entitlement-boundary.md
docs/boundaries/data-ownership-boundary.md
```

## Acceptance Criteria

- Web and game runtime responsibilities are separated in docs and code comments.
- API stubs for game-owned data are read-only or bridge/service oriented.
- No web module directly writes live game inventory, currency, loot, XP, combat, movement, dungeon, or zone state.
- Entitlement and account handoffs are represented through service contracts.
