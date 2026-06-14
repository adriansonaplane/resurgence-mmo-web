# Target Repository Shape

The build plan allows separate frontend and backend repositories, plus infrastructure/config folders. For Codex implementation, use this target shape unless the team provides existing repos.

```text
mmo-website-platform/
  README.md
  package.json                         # optional workspace root
  .gitignore
  .editorconfig
  .github/
    workflows/
      pr-checks.yml
      deploy-staging.yml
      deploy-production.yml

  apps/
    frontend/                          # Angular SSR app
    api/                               # NestJS + Fastify API
    cms/                               # Directus container/config wrapper
    worker/                            # optional async worker, added when needed

  packages/
    shared-types/                      # optional DTO/type sharing later
    config/                            # optional shared config constants

  infra/
    cloud-run/
    artifact-registry/
    secrets/
    storage/
    load-balancer-cdn-armor/

  docs/
    adr/
    api/
    database/
    deployment/
    testing/

  docker-compose.yml
  .env.example
```

## Frontend Target Shape

```text
apps/frontend/src/app/
  public/
  store/
  account/
  admin/
  shared/
  core/
  auth/
  api/
  guards/
  interceptors/
  models/
```

## Backend Target Shape

```text
apps/api/src/
  modules/
    auth/
    users/
    accounts/
    characters/
    storefront/
    products/
    orders/
    payments/
    webhooks/
    entitlements/
    news/
    contact/
    support/
    admin/
    audit/
    health/
    directus/
  common/
    guards/
    decorators/
    filters/
    interceptors/
    pipes/
    dto/
    errors/
    logging/
    constants/
  config/
  database/
    schema/
    migrations/
    drizzle.service.ts
    database.module.ts
  main.ts
  app.module.ts
```
