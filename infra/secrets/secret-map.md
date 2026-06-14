# Secret Manager Map

| Secret | Services |
|---|---|
| `DATABASE_URL` | API, worker |
| `DIRECT_DATABASE_URL` | migration job |
| `AUTH0_DOMAIN` | API, frontend |
| `AUTH0_AUDIENCE` | API, frontend |
| `AUTH0_CLIENT_ID` | frontend, API if needed |
| `AUTH0_CLIENT_SECRET` | API only |
| `STRIPE_SECRET_KEY` | API |
| `STRIPE_WEBHOOK_SECRET` | API |
| `DIRECTUS_SECRET` | CMS |
| `DIRECTUS_ADMIN_EMAIL` | CMS bootstrap |
| `DIRECTUS_ADMIN_PASSWORD` | CMS bootstrap |
| `EMAIL_API_KEY` | API, worker |
| `SENTRY_DSN` | API, frontend, worker |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | API, frontend, worker |
| `GAME_BACKEND_SERVICE_TOKEN` | API and game backend service client |

Never commit production values. Staging and production secrets are distinct.
