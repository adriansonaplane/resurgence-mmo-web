# Testing and Quality Blueprint

## Frontend Testing

Use:

- Angular Testing Utilities for components, route guards, forms, pipes, services.
- Jest for utilities, service units, isolated TypeScript.
- Playwright for browser/E2E smoke flows.

## Backend Testing

Use:

- Jest for units/services/guards/pipes/interceptors/repositories.
- Fastify Inject for HTTP/API endpoint tests.
- Testcontainers for real PostgreSQL integration tests.

## Explicitly Excluded

- Supertest must not be used.

## Minimum Backend API Tests

- Health endpoint returns success.
- Auth guard rejects missing tokens.
- Auth guard accepts valid test tokens.
- Role guard rejects unauthorized admin access.
- Product listing returns visible products.
- Checkout session endpoint validates input.
- Stripe webhook rejects invalid signatures.
- Stripe webhook processes valid checkout event.
- Duplicate Stripe event does not duplicate entitlement.
- Order is created after verified payment event.
- Entitlement is granted after completed checkout.
- Admin action creates audit log.
- Contact form creates support/contact record.
- Drizzle migrations apply successfully.
- Database transaction rolls back on failed entitlement grant.
