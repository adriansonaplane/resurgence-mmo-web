# Payments Blueprint - Stripe Checkout, Webhooks, Orders, Entitlements

## Core Rule

The checkout success page is not proof of purchase. Only a verified Stripe webhook may create orders and grant entitlements.

## Required Flow

```text
Product page
 -> POST /api/v1/payments/checkout-session
 -> Stripe-hosted checkout
 -> success/cancel route
 -> Stripe webhook
 -> raw body signature verification
 -> persist Stripe event idempotently
 -> create/update order
 -> grant account-level entitlement
 -> dashboard display
 -> game backend consumes entitlement
```

## Required Stripe Events

```text
checkout.session.completed
payment_intent.succeeded
payment_intent.payment_failed
charge.refunded
customer.subscription.created
customer.subscription.updated
customer.subscription.deleted
invoice.paid
invoice.payment_failed
```

## Idempotency Requirements

- Persist `stripe_event_id` with a unique constraint before processing.
- If event already exists, return success and do not reprocess.
- Use a transaction for order creation + entitlement grant.
- Entitlement key + user + source order should be uniquely protected where applicable.

## Game Boundary

Website grants account-level entitlements only. It must not directly insert live items into character inventory.

## Companion Boundary Additions

Stripe entitlements may exist in both the web-account layer and the game-account layer.

Required entitlement flow:

```text
Player purchases product on website
-> Stripe confirms transaction
-> Web backend records order
-> Web entitlement record is created
-> Account / Entitlement Service validates entitlement
-> Game account entitlement is created or updated
-> Game service applies permitted benefit
```

The web backend records orders, purchase history, storefront-facing entitlement records, and handoff events. The Account/Entitlement Service validates and applies game-relevant entitlements.

Add or scaffold:

```text
apps/api/src/modules/entitlement-bridge/
docs/contracts/entitlement-service-contract.md
docs/boundaries/entitlement-boundary.md
```

An entitlement is not automatically an in-game item. Game-impacting rewards must not be granted directly by the website frontend.
