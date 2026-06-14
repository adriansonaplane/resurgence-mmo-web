# Async Topics Or Queues

| Queue/Topic | Producer | Consumer | Idempotency Key |
|---|---|---|---|
| `payment-followups` | API webhook handler | worker/API-local processor | Stripe event ID |
| `entitlement-sync` | entitlement service | worker/game integration | subject + entitlement + source order |
| `email-notifications` | API/support/payment | worker/email adapter | message type + target + source ID |
| `cleanup` | scheduler | worker | job name + date |

Cloud Tasks is preferred for targeted HTTP retries. Pub/Sub is acceptable when fanout is needed.
