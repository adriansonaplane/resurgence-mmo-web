# Rollback Procedure

1. Confirm incident scope in logs, Sentry, Cloud Monitoring, Stripe dashboard, and Auth0 logs.
2. Stop production rollout and freeze migrations.
3. Promote the last tested Artifact Registry image for affected services.
4. Run Cloud Run deploy with the previous image tag.
5. Verify `/api/v1/health`, public frontend, Directus, login, checkout initiation, webhook receipt, and dashboard.
6. If a migration caused the incident, follow the migration rollback note for that release and verify data integrity before replaying webhooks or jobs.
7. Record the incident timeline and follow-up actions.
