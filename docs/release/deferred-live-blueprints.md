# Deferred Live Blueprints

These items are intentionally skipped in local implementation because they require live accounts, secrets, domains, or cloud resources.

## Auth0

- Create local/staging/production applications.
- Create API audiences.
- Configure callbacks, logout URLs, and allowed origins.
- Configure roles and custom claims.
- Replace local `test-player` and `test-admin` helpers for real environments.

## Stripe

- Create test-mode products and prices.
- Configure webhook endpoint and signing secret.
- Validate checkout, refund, subscription, and failed-payment event handling in staging.
- Switch to live mode only after production approval.

## Neon / Database

- Create staging and production branches/databases.
- Store pooled runtime URL and direct migration URL in Secret Manager.
- Run Drizzle migrations through reviewed deployment jobs.

## Directus

- Initialize collections from `apps/cms/collections/directus-collections.json`.
- Import `apps/cms/seeds/sample-content.json`.
- Configure Google Cloud Storage uploads.
- Configure editorial roles and publish workflow.

## Google Cloud

- Create Artifact Registry repositories.
- Build and push images.
- Create Cloud Run services from `infra/cloud-run/*.service.yaml`.
- Bind Secret Manager secrets from `infra/secrets/secret-bindings.template.yaml`.
- Configure Load Balancer, CDN, and Armor from `infra/load-balancer-cdn-armor`.
- Configure Sentry and OpenTelemetry endpoints.

## Release Gates

- Run staging E2E: Directus content -> Angular -> Auth0 -> checkout -> Stripe webhook -> order -> entitlement -> dashboard.
- Run production smoke with controlled transaction only after staging signoff.
