# API Contract Blueprint

Base prefix: `/api/v1`

## Health

```text
GET /api/v1/health
GET /api/v1/ready
```

## Current User / Account

```text
GET /api/v1/me
GET /api/v1/account/dashboard
GET /api/v1/account/profile
PATCH /api/v1/account/profile
GET /api/v1/account/characters
GET /api/v1/account/purchases
GET /api/v1/account/entitlements
```

## Storefront

```text
GET /api/v1/store/products
GET /api/v1/store/products/:slug
GET /api/v1/store/categories
```

## Payments / Webhooks

```text
POST /api/v1/payments/checkout-session
POST /api/v1/payments/customer-portal
POST /api/v1/webhooks/stripe
```

## Contact / Support

```text
POST /api/v1/contact
GET /api/v1/support/tickets
POST /api/v1/support/tickets
GET /api/v1/support/tickets/:id
```

## Admin

```text
GET /api/v1/admin/orders
GET /api/v1/admin/orders/:id
GET /api/v1/admin/users/:id
GET /api/v1/admin/entitlements
POST /api/v1/admin/entitlements/grant
POST /api/v1/admin/entitlements/revoke
GET /api/v1/admin/audit
GET /api/v1/admin/support/contact-messages
PATCH /api/v1/admin/products/:id
```

## Error Envelope

```json
{
  "error": {
    "code": "ORDER_NOT_FOUND",
    "message": "Order could not be found.",
    "status": 404,
    "requestId": "req_123"
  }
}
```

## Companion Boundary API Additions

### Account Service Boundary

```text
GET  /api/v1/account/status
GET  /api/v1/account/linked-accounts
GET  /api/v1/account/security
POST /api/v1/account/recovery/start
POST /api/v1/account/game-session/request-placeholder
```

`/account/game-session/request-placeholder` is a contract placeholder only unless the Account Service is available. It must not be treated as direct Gateway validation.

### Player Profiles

```text
GET   /api/v1/profile/me
PATCH /api/v1/profile/settings
GET   /api/v1/profile/:publicName
GET   /api/v1/profile/:publicName/characters
GET   /api/v1/profile/:publicName/achievements
```

Profile character and achievement data must be read-only summary data or service/API read model data.

### Support Portal

```text
GET  /api/v1/support/articles
GET  /api/v1/support/known-issues
POST /api/v1/support/bug-reports
POST /api/v1/support/ban-appeals
POST /api/v1/support/account-recovery-requests
```

### Documentation / Portfolio

```text
GET /api/v1/content/docs
GET /api/v1/content/docs/:slug
GET /api/v1/content/portfolio
GET /api/v1/content/media-gallery
GET /api/v1/content/alpha-info
```

These may be proxied from Directus or consumed directly by Angular SSR depending on implementation.

### Admin Additions

```text
GET  /api/v1/admin/accounts/:id/status
POST /api/v1/admin/accounts/:id/ban
POST /api/v1/admin/accounts/:id/suspend
GET  /api/v1/admin/characters/:id/summary
POST /api/v1/admin/characters/:id/reset-request
GET  /api/v1/admin/player-reports
GET  /api/v1/admin/server-status
GET  /api/v1/admin/deployment-status
GET  /api/v1/admin/support/tickets
PATCH /api/v1/admin/support/tickets/:id
GET  /api/v1/admin/support/ban-appeals
```

Admin endpoints must be role-protected and audited. Character reset and inventory/duplicate-item operations must be requests through reviewed service endpoints, not direct web database writes.
