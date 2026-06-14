# Environment Contract Blueprint

## Environments

```text
local
staging
production
```

## Required Environment Variables

```text
NODE_ENV
PORT
APP_PUBLIC_URL
API_PUBLIC_URL
CMS_PUBLIC_URL
DATABASE_URL                 # pooled runtime Neon URL
DIRECT_DATABASE_URL          # direct migration URL
AUTH0_DOMAIN
AUTH0_AUDIENCE
AUTH0_CLIENT_ID
AUTH0_CLIENT_SECRET
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
STRIPE_SUCCESS_URL
STRIPE_CANCEL_URL
DIRECTUS_SECRET
DIRECTUS_ADMIN_EMAIL
DIRECTUS_ADMIN_PASSWORD
DIRECTUS_PUBLIC_URL
GCS_PUBLIC_ASSETS_BUCKET
GCS_PRIVATE_ASSETS_BUCKET
GCS_DIRECTUS_UPLOADS_BUCKET
EMAIL_PROVIDER
EMAIL_API_KEY
SENTRY_DSN
OTEL_EXPORTER_OTLP_ENDPOINT
```

## Secret Rules

- Production secrets live in Google Secret Manager.
- `.env.example` may contain variable names only, no real secrets.
- Staging and production secrets must be separate.
