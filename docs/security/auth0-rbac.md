# Auth0 RBAC

Auth0 is the identity provider for OAuth 2.0 and OpenID Connect. The frontend integrates login/logout for UX, but backend NestJS guards are the security boundary.

Required roles:

- `player`
- `beta_tester`
- `support_agent`
- `moderator`
- `content_editor`
- `store_manager`
- `developer`
- `super_admin`

Backend access tokens must be validated for issuer, audience, expiry, and signature. Admin APIs require role checks. Sensitive auth/admin actions create audit events.

## Permission Checks

Roles decide broad staff access, while permissions decide specific action access.

Initial backend permissions:

- `admin:read`
- `admin:write`
- `entitlements:read`

The NestJS API has both `RolesGuard` and `PermissionsGuard`. A user with a staff role but without the required permission is rejected by the backend.

Local test-only tokens:

- `Bearer test-player`
- `Bearer test-admin`
- `Bearer test-staff-no-permissions`
