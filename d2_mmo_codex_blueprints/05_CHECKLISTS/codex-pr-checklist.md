# Codex Pull Request Checklist

- [ ] PR states the phase number and blueprint file used.
- [ ] PR describes implementation scope and exclusions.
- [ ] PR includes tests matching changed behavior.
- [ ] Backend HTTP/API tests use Fastify Inject.
- [ ] Testcontainers used for database integration changes.
- [ ] Drizzle migration included for schema changes.
- [ ] Auth/admin/payment changes include audit logging where needed.
- [ ] Stripe webhook behavior is idempotent.
- [ ] Success page does not grant entitlement.
- [ ] Website does not mutate live inventory.
- [ ] CI passes.
