# Worker Plan

MVP request paths keep the primary payment state transition synchronous and idempotent. Secondary work can move to Cloud Tasks or Pub/Sub when traffic requires it.

Candidate async jobs:

- Stripe webhook follow-up notifications.
- Entitlement sync notifications to game services.
- Email receipts and support notifications.
- Directus cache invalidation.
- Cleanup and reconciliation jobs.

Every job must include idempotency keys, retry limits, dead-letter handling, structured logs, and metrics for success, failure, latency, and retries.

The queue template is in `infra/async/cloud-tasks-template.md`. It is not applied locally because Cloud Tasks requires live GCP resources and service credentials.
