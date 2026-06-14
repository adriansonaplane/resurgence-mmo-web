# Security Hardening

- Production secrets live in Google Secret Manager and are injected as environment variables.
- CORS is environment-specific through `CORS_ALLOWED_ORIGINS`.
- Fastify-compatible Helmet and rate limiting are registered in API bootstrap.
- Auth0 JWT validation and backend RBAC protect account/admin/payment surfaces.
- Stripe webhooks require raw body signature verification.
- Admin/payment/entitlement sensitive changes create audit events.
- Cloud Load Balancer, Cloud CDN, and Cloud Armor sit in front of public Cloud Run services.
- Least-privilege service accounts are required for API, CMS, worker, migrations, and deploy jobs.
- Neon, Directus, and GCS backups must be verified before production launch.

Related templates and runbooks:

- `infra/secrets/secret-bindings.template.yaml`
- `infra/load-balancer-cdn-armor/routing-template.md`
- `docs/operations/backup-recovery.md`
- `docs/operations/incident-response.md`
