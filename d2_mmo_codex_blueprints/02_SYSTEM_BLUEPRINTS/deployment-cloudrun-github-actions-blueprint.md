# Deployment Blueprint - Cloud Run + GitHub Actions

## Services

```text
website-frontend  Angular SSR Cloud Run service
website-api       NestJS + Fastify Cloud Run service
website-cms       Directus Cloud Run service
website-worker    Optional async worker Cloud Run service
```

## Container Rules

- Listen on `process.env.PORT`.
- Bind to `0.0.0.0`.
- Read secrets from environment variables injected from Secret Manager.
- Do not bake secrets into images.

## GitHub Actions Workflows

- PR checks: install, lint, typecheck, tests, build.
- Staging deploy: build images, push to Artifact Registry, deploy to Cloud Run, run migrations, smoke tests.
- Production deploy: manual approval, promote tested images, production-safe migrations, deploy, smoke tests, notify.

## Edge/Security

- Cloud Load Balancer as public entrypoint.
- Cloud CDN for public/static assets.
- Cloud Armor for WAF/DDoS and edge rules.

## Companion Boundary Deployment Additions

The Companion Web Platform deploys independently from the real-time game runtime.

Deploy or scaffold Cloud Run services for:

```text
website frontend
website API
Directus CMS
optional worker
```

Do not require Kubernetes/Agones to launch the public website or web platform MVP.

The game runtime may remain Docker/local/staged until Kubernetes and Agones are needed. Web deployment must not depend on production game-server infrastructure.
