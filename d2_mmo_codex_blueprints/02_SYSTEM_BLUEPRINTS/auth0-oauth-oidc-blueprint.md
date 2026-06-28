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

## Companion Boundary Additions

Auth0 is accepted for the web platform and is a candidate for game login, but long-term game-login usage remains tentative and requires evaluation.

Codex must document these tradeoffs in `docs/adr/auth0-long-term-game-login-evaluation.md`:

```text
simplicity
cost at scale
vendor lock-in
security benefits
integration complexity
migration difficulty
how game sessions are created after web identity validation
```

The game must not blindly trust web login state. Required model:

```text
Player authenticates through Auth0
-> Web Platform or Account Service validates identity
-> Game session is created
-> Gateway validates game session
-> Zone server accepts only validated player connection
```

Keep web sessions and game sessions explicitly separated.
