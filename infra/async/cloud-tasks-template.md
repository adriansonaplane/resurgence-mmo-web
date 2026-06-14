# Cloud Tasks Template

Template only. Use Cloud Tasks for retryable HTTP jobs when the API or worker needs durable async processing.

## Queues

| Queue | Handler | Max Attempts | Idempotency Key |
|---|---|---:|---|
| `payment-followups` | `/internal/jobs/payment-followup` | 10 | Stripe event ID |
| `entitlement-sync` | `/internal/jobs/entitlement-sync` | 10 | subject + entitlement + source order |
| `email-notifications` | `/internal/jobs/email` | 5 | template + recipient + source ID |
| `cleanup` | `/internal/jobs/cleanup` | 3 | job name + date |

## Handler Rules

- Verify a service token from Secret Manager.
- Persist job attempts and final status.
- Treat duplicate idempotency keys as success.
- Log job latency, retries, and failure reason.
