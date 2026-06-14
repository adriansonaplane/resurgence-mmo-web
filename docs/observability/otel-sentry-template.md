# OpenTelemetry And Sentry Template

Template only. Enable after staging DSNs/endpoints are available.

## API Signals

- HTTP route latency and status.
- DB query latency and failures.
- Stripe webhook verification, duplicate, and processing outcomes.
- Auth0 JWT validation failures.
- Admin action audit correlation IDs.

## Frontend Signals

- SSR render failures.
- Public route errors.
- Account/admin client errors.
- Checkout initiation failures.

## Required Attributes

- `service.name`
- `deployment.environment`
- `request.id`
- `route`
- `user.safe_id` where available and non-sensitive

Never send access tokens, payment data, raw webhook secrets, or direct personal contact/payment identifiers to logs, traces, or Sentry.
