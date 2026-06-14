# Load Balancer / CDN / Armor Routing Template

Template only. Apply after Cloud Run services and domains exist.

## Host Routing

| Host | Target |
|---|---|
| `APP_DOMAIN` | `website-frontend` |
| `API_DOMAIN` or `APP_DOMAIN/api/*` | `website-api` |
| `CMS_DOMAIN` | `website-cms` with editorial access controls |

## CDN

- Cache static frontend assets with immutable hashes.
- Cache prerendered stable public pages where safe.
- Do not cache account, admin, checkout, webhook, or entitlement bridge routes.

## Cloud Armor Policy

Baseline rules:

- Deny known malicious IP reputation lists where available.
- Rate-limit `/api/v1/contact`.
- Rate-limit `/api/v1/payments/checkout-session`.
- Never block Stripe webhook IPs without a verified Stripe operational procedure.
- Require stricter allowlist or identity-aware access for Directus admin routes.

All values are placeholders until live domains, service URLs, and risk thresholds are known.
