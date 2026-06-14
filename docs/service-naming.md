# Service Naming

| Logical Service | Local Compose Name | Cloud Run Name | Artifact Registry Image |
|---|---|---|---|
| Angular SSR frontend | `frontend` | `website-frontend` | `website/frontend` |
| NestJS Fastify API | `api` | `website-api` | `website/api` |
| Directus CMS | `cms` | `website-cms` | `website/cms` |
| Async worker | `worker` | `website-worker` | `website/worker` |

## Environments

- Local: `local-website-*`
- Staging: `staging-website-*`
- Production: `prod-website-*`

All services must read `PORT` and bind `0.0.0.0` in Cloud Run containers.
