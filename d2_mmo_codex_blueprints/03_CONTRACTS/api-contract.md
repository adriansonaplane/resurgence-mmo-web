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
