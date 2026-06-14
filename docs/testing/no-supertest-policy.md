# No Supertest Policy

Backend HTTP/API tests must use Fastify Inject through the Nest Fastify adapter. Do not add `supertest`, `@nestjs/platform-express`, `ExpressAdapter`, or Express-only middleware to `apps/api`.

Regression checks:

```bash
rg "supertest|request\\(" apps/api
rg "platform-express|ExpressAdapter|express\\(" apps/api
```

Express references are allowed only outside `apps/api` for Angular SSR server implementation or documentation explaining that the API does not use Express.
