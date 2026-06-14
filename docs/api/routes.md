# API Routes

Base prefix: `/api/v1`

## Public

- `GET /health`
- `GET /ready`
- `GET /store/products`
- `GET /store/products/:slug`
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
