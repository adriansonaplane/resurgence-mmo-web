# API Routes

Base prefix: `/api/v1`

## Public

- `GET /health`
- `GET /ready`
- `GET /store/products`
- `GET /store/products/:slug`
- `GET /store/categories`
- `GET /support/articles`
- `GET /support/known-issues`
- `GET /profile/:publicName`
- `GET /profile/:publicName/characters`
- `GET /profile/:publicName/achievements`
- `GET /content/docs`
- `GET /content/docs/:slug`
- `GET /content/portfolio`
- `GET /content/media-gallery`
- `GET /content/alpha-info`
- `POST /contact`
- `POST /webhooks/stripe`

## Authenticated

- `GET /me`
- `GET /account/dashboard`
- `GET /account/profile`
- `PATCH /account/profile`
- `GET /account/characters`
- `GET /account/purchases`
- `GET /account/entitlements`
- `GET /account/status`
- `GET /account/linked-accounts`
- `GET /account/security`
- `POST /account/recovery/start`
- `POST /account/game-session/request-placeholder`
- `GET /profile/me`
- `PATCH /profile/settings`
- `POST /support/bug-reports`
- `POST /support/ban-appeals`
- `POST /support/account-recovery-requests`
- `POST /payments/checkout-session`
- `POST /payments/customer-portal`

## Admin

- `GET /admin/orders`
- `GET /admin/orders/:id`
- `GET /admin/users/:id`
- `GET /admin/entitlements`
- `POST /admin/entitlements/grant`
- `POST /admin/entitlements/revoke`
- `GET /admin/audit`
- `GET /admin/support/contact-messages`
- `GET /admin/accounts/:id/status`
- `POST /admin/accounts/:id/ban`
- `POST /admin/accounts/:id/suspend`
- `GET /admin/characters/:id/summary`
- `POST /admin/characters/:id/reset-request`
- `GET /admin/player-reports`
- `GET /admin/server-status`
- `GET /admin/deployment-status`
- `GET /admin/support/tickets`
- `PATCH /admin/support/tickets/:id`
- `GET /admin/support/ban-appeals`
- `PATCH /admin/products/:id`

Errors use:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message.",
    "status": 400,
    "requestId": "req_..."
  }
}
```
