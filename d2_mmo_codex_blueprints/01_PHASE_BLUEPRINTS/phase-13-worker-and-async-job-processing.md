# Phase 13 Blueprint - Worker and Async Job Processing

    ## Goal

    Move slow/retryable work out of request paths when needed.

    ## Codex Implementation Instructions

    - Decide MVP need for website-worker or API-local processing.
- Implement Cloud Tasks or Pub/Sub for webhook follow-ups, entitlement sync, email, support notifications, cleanup.
- Add retry logic and dead-letter handling.
- Add job metrics/logging for success/failure/latency/retries.

    ## Required Deliverables

    - `apps/worker/* or docs/async/worker-plan.md`
- `infra/async/topics-or-queues.md`

    ## Acceptance Criteria

    - Payment processing remains idempotent.
- Secondary work can retry safely.
- Failed jobs are visible in logs/metrics/alerts.

    ## Guardrails

    - Preserve the approved stack from `00_START_HERE/CANONICAL_CONSTRAINTS.md`.
    - Keep secrets out of source control.
    - Add or update tests in the same phase as implementation.
    - Update documentation when introducing new routes, environment variables, schema changes, or external services.
    - Backend HTTP/API tests must use Fastify Inject, not Supertest.
