# Target Repository Shape

The build plan allows separate frontend and backend repositories, plus infrastructure/config folders. The companion boundary recommends keeping the website frontend/backend separate from game platform services and game runtime code.

For Codex implementation, use this target shape unless the team provides existing repos.

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
    boundaries/
      companion-web-platform-boundary.md
      account-service-boundary.md
      entitlement-boundary.md

  docker-compose.yml
  .env.example
```

## External Repository Boundary

Do not create game runtime code in this repository.

Expected future repository direction:

```text
website-frontend
website-backend
game-platform-services
game-server-runtime
```

The exact repo names can change, but the separation rule remains: the web platform and game platform have different release cycles and deployment targets.

## Frontend Target Shape

```text
apps/frontend/src/app/
  public/
    home/
    about/
    news/
    media/
    alpha-info/
    documentation/
    portfolio/
  store/
  account/
  profile/
  support/
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
    account-service/
    characters/
    player-profiles/
    storefront/
    products/
    orders/
    payments/
    webhooks/
    entitlements/
    entitlement-bridge/
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

## CMS Target Shape

```text
apps/cms/
  Dockerfile
  directus.config.example
  collections/
    news_posts.md
    patch_notes.md
    pages.md
    faq_entries.md
    support_articles.md
    public_docs.md
    dev_docs.md
    media_assets.md
```

## Worker Target Shape

```text
apps/worker/src/
  jobs/
    entitlement-sync.job.ts
    email-notification.job.ts
    support-notification.job.ts
    webhook-retry.job.ts
```
