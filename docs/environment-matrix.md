# Environment Matrix

| Setting | Local | Staging | Production |
|---|---|---|---|
| Frontend URL | `http://localhost:4200` | staging domain | production domain |
| API URL | `http://localhost:8080` | staging API URL | production API URL |
| CMS URL | `http://localhost:8055` | staging Directus URL | production Directus URL |
| Database | local PostgreSQL | Neon staging branch | Neon production branch |
| Stripe | test mode | test mode | live mode after approval |
| Auth0 | local callback/origin | staging tenant/app | production tenant/app |
| Secrets | local `.env` | Secret Manager staging | Secret Manager production |
| Storage | local/dev placeholder | staging GCS buckets | production GCS buckets |
| Observability | local logs | Sentry/OTel staging | Sentry/OTel production |

Production and staging secrets are separate. `.env.example` documents names only and must not contain real secrets.
