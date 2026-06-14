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
