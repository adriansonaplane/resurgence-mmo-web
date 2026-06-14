# Load Balancer, CDN, And Armor

Production edge plan:

- Cloud Load Balancer routes public web traffic to `website-frontend`.
- `/api/*` routes to `website-api`.
- Directus editorial admin routes are restricted by identity/access policy.
- Cloud CDN caches public static assets and stable prerendered pages.
- Cloud Armor applies baseline WAF/DDoS protections and stricter rules on auth, checkout, webhook, account, admin, and contact routes.
