# No Supertest / No Express Regression Checklist

Search before merge:

```bash
rg "supertest|request\(" apps/api test || true
rg "platform-express|ExpressAdapter|express\(" apps/api || true
```

Allowed Express references:

- Documentation explaining that Express is not used.

Disallowed:

- `supertest` package dependency.
- `@nestjs/platform-express` as backend runtime.
- Express-only middleware that bypasses Fastify plugin equivalents.
