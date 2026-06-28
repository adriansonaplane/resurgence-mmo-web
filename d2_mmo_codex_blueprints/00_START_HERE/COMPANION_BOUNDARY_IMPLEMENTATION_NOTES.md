# Companion Boundary Implementation Notes

Read this after `CANONICAL_CONSTRAINTS.md`.

The uploaded `companion-web-platform-boundary` guidance changes the blueprint package from a generic web platform into a clearly bounded Companion Web Platform.

## Most Important Changes

1. The web platform supports the game, but it does not simulate the game.
2. Cross-boundary account operations go through an Account Service.
3. Auth0 can authenticate web users, but the game runtime still creates and validates its own game session.
4. The website has its own database and must not directly mutate game-critical tables.
5. Directus may manage content/docs/support articles, but not authoritative gameplay data or live balance/configuration.
6. Stripe purchases create web orders and web entitlements first; game/account services validate and apply game-relevant entitlements.
7. Admin tools can live in the website platform early, but must be RBAC-protected and audited.
8. The public website should launch before playable Alpha.
9. Cloud Run web deployment is independent from Kubernetes/Agones game-runtime deployment.

## Required Additional Reads

```text
references/companion-web-platform-boundary.md
02_SYSTEM_BLUEPRINTS/companion-web-platform-boundary-blueprint.md
02_SYSTEM_BLUEPRINTS/account-service-boundary-blueprint.md
03_CONTRACTS/boundary-contract.md
```
