# Backend Blueprint - NestJS + Fastify

## Purpose
Build the website API with NestJS and the Fastify adapter. The backend owns account APIs, payment workflows, entitlements, admin APIs, audit logging, support/contact APIs, and game entitlement bridge contracts.

## Non-Negotiable Runtime

```ts
const app = await NestFactory.create<NestFastifyApplication>(
  AppModule,
  new FastifyAdapter({ logger: true }),
  { rawBody: true },
);
await app.listen(process.env.PORT ? Number(process.env.PORT) : 8080, '0.0.0.0');
```

## Required Modules

```text
auth, users, accounts, characters, storefront, products, orders,
payments, webhooks, entitlements, news, contact, support,
admin, audit, health, directus
```

## Cross-Cutting Requirements

- Global `/api/v1` prefix.
- ValidationPipe with whitelist, forbidNonWhitelisted, transform.
- Consistent error envelope.
- Request ID middleware/interceptor.
- Structured JSON logging.
- Fastify-compatible helmet, CORS, rate limit plugins.
- Raw body enabled for Stripe webhook verification.
- OpenAPI/Swagger protected or non-production only.

## Testing Requirement

Use:

- Jest for units/services/guards.
- Fastify Inject for HTTP/API tests.
- Testcontainers for PostgreSQL/Drizzle integration tests.

Do not use Supertest.
