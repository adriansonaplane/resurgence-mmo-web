# Production Launch Checklist

- Promote tested images from staging.
- Run production-safe Drizzle migrations.
- Verify production Auth0 app/API settings.
- Verify Stripe live mode keys and webhook endpoint.
- Verify production domains, Cloud Run services, Secret Manager, GCS buckets, Cloud Armor, and CDN.
- Run production smoke tests.
- Monitor logs, Sentry, Cloud Monitoring, Stripe events, dashboard behavior, Directus, admin audit, and rollback readiness.
