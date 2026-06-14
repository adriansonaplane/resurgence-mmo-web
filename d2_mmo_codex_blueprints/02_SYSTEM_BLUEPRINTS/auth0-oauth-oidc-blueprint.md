# Auth Blueprint - Auth0 + OAuth 2.0 + OpenID Connect

## Purpose
Use Auth0 as the identity provider. OAuth 2.0 and OpenID Connect are the protocol standards.

## Required Roles

```text
player
beta_tester
support_agent
moderator
content_editor
store_manager
developer
super_admin
```

## Backend Requirements

- Validate Auth0-issued access tokens.
- Check issuer, audience, expiry, signature.
- Map Auth0 subject to local user profile.
- Enforce RBAC through NestJS guards.
- Enforce permissions on admin/payment/entitlement routes.
- Audit sensitive auth/admin actions.

## Frontend Requirements

- Implement Auth0 login/logout.
- Protect account/admin routes for UX.
- Attach access token to API calls.

## Security Rule

Frontend route guards are not security boundaries. NestJS guards are the authoritative enforcement layer.
