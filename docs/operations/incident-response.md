# Incident Response

Template only. Finalize owners, paging, and escalation paths before staging signoff.

## Severity Examples

- SEV1: payment grants incorrect entitlements, admin auth bypass, widespread outage.
- SEV2: checkout failures, webhook backlog, Directus public content outage.
- SEV3: isolated support/contact issue, non-critical dashboard degradation.

## First 15 Minutes

1. Assign incident commander.
2. Freeze deployments.
3. Check Cloud Run logs, Sentry, Stripe webhook dashboard, Auth0 logs, and DB health.
4. Identify whether rollback is safer than forward fix.
5. Preserve audit and webhook evidence.

## Payment/Entitlement Rule

Do not manually grant live game inventory from the website. Account-level entitlement correction must be auditable and must preserve Stripe event idempotency.
