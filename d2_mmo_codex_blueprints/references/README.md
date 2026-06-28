# Blueprint References

This folder contains source/reference material that Codex should read before implementation. These are not application source files, but they are authoritative planning inputs.

## Read Order

1. `main_blueprint.md` — top-level Codex implementation prompt and current boundary-aware execution directive.
2. `companion-web-platform-boundary.md` — Companion Web Platform boundary, Account Service boundary, web/game data ownership, entitlement split, support/admin/content boundaries.
3. `web-application-build-plan.md` — Principal Software Architect phased build plan.
4. `website-platform-architecture.md` — web architecture document and stack recommendations.
5. `UPDATED_TECH_STACK.md` — approved web technology stack.
6. `companion-web-platform-boundary.pdf` — original uploaded boundary guidance PDF for traceability.

## Boundary Rule

The Companion Web Platform supports the game but does not simulate the game.

The website must not directly mutate game-critical state, including inventory, currency, XP, combat, loot, zone state, dungeon state, or realtime simulation data. Cross-boundary operations must go through the Account Service / Entitlement Service / approved game service interfaces.
