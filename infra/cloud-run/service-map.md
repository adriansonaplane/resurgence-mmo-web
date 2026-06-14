# Cloud Run Service Map

| Service | Container | Port | Public | Notes |
|---|---|---:|---|---|
| `website-frontend` | Angular SSR | `PORT` | yes | Serves public site, storefront, account/admin shells. |
| `website-api` | NestJS Fastify | `PORT` | yes | Serves `/api/v1`, Stripe webhooks, and entitlement bridge reads. |
| `website-cms` | Directus | `PORT` | restricted/editorial + public read API | CMS/editorial layer only. |
| `website-worker` | Node worker | `PORT` if HTTP worker | no or restricted | Optional async processing for retries, notifications, cleanup. |

All containers must bind `0.0.0.0` and read configuration from environment variables injected by Secret Manager.

## Service Specs

- `website-frontend.service.yaml`
- `website-api.service.yaml`
- `website-cms.service.yaml`
- `website-worker.service.yaml`

These files are deployment templates. Replace `PROJECT_ID`, `REGION`, domains, image tags, and service account names per environment before applying.
