# Backup And Recovery

Template only. Verify these procedures in staging before production launch.

## Neon PostgreSQL

- Enable point-in-time recovery where available.
- Take a pre-migration restore point before production migrations.
- Test restoring staging from a backup.
- Document RPO/RTO once business requirements are known.

## Directus

- Back up Directus schema/collections and content exports.
- Keep media metadata consistent with GCS object backups.
- Test rehydrating Directus content into a clean staging CMS.

## Google Cloud Storage

- Enable object versioning for private assets and Directus uploads.
- Define lifecycle rules after retention requirements are known.
- Test restoring a deleted upload and a private entitlement asset.

## Stripe/Auth0

- Stripe and Auth0 are external systems of record. Export configuration snapshots and keep manual recovery runbooks for dashboards, webhook endpoints, roles, callbacks, and API audiences.
