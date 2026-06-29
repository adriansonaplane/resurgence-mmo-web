# Entitlement Boundary

Stripe webhooks are the source of truth for completed purchases. The website creates web order and web entitlement records, then queues an Account/Entitlement Service handoff. A web entitlement is not an in-game item.

## Flow

```text
Stripe verified webhook
-> Web order record
-> Web entitlement record
-> Account/Entitlement Service handoff event
-> Game-account entitlement validation/application by game-owned services
```

## Guardrails

- Checkout success pages never grant entitlements.
- The website does not create inventory, currency, loot, XP, or items.
- Handoff events are idempotent by Auth0 subject, entitlement key, and source order id.
