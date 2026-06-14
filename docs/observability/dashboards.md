# Observability Dashboards

Required dashboards:

- Traffic: requests, status codes, p95 latency by service and route.
- API health: health/ready status, DB health, config readiness.
- Checkout funnel: checkout sessions, webhook completions, order creation, entitlement grants.
- Stripe webhooks: received, failed signature, duplicate, processing failed, latency.
- Database: connection pool, query latency, migration status, failed transactions.
- Admin activity: audit reads, grants, revokes, product updates, support actions.
- Errors: Sentry issue count, 5xx rate, unhandled exceptions.

Alerts should cover elevated 5xx, webhook failures, checkout failures, DB connectivity, and suspicious admin activity.
