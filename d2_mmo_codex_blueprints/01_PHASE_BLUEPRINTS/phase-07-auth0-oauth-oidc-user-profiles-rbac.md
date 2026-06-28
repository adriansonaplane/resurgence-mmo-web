# Phase 07 Blueprint - Auth0, OAuth/OIDC, User Profiles, RBAC

    ## Goal

    Implement identity, JWT validation, profile sync, backend roles.

    ## Codex Implementation Instructions

    - Configure Auth0 tenant/app/API audience/callback/logout/origins for local/staging/production.
- Integrate Auth0 login/logout in Angular.
- Implement NestJS JWT validation for Auth0 access tokens.
- Implement auth, role, permission guards and current-user decorator.
- Sync local user profile keyed by Auth0 subject.
- Create roles: player, beta_tester, support_agent, moderator, content_editor, store_manager, developer, super_admin.
- Add audit events for sensitive auth/admin actions.

    ## Required Deliverables

    - `apps/api/src/modules/auth/*`
- `apps/api/src/modules/users/*`
- `apps/frontend/src/app/auth/*`
- `docs/security/auth0-rbac.md`

    ## Acceptance Criteria

    - Unauthenticated users cannot access account/admin APIs.
- Frontend guards are UX only; backend guards enforce security.
- Auth0 subject maps to local profile.
- Role tests reject unauthorized users.

    ## Guardrails

    - Preserve the approved stack from `00_START_HERE/CANONICAL_CONSTRAINTS.md`.
    - Keep secrets out of source control.
    - Add or update tests in the same phase as implementation.
    - Update documentation when introducing new routes, environment variables, schema changes, or external services.
    - Backend HTTP/API tests must use Fastify Inject, not Supertest.

## Companion Boundary Update

Auth0 is accepted for web login and is a candidate for game login, but the game runtime must create and validate its own game session.

Add `docs/adr/auth0-long-term-game-login-evaluation.md` covering simplicity, cost, vendor lock-in, security benefits, integration complexity, migration difficulty, and game session creation after identity validation.

Add or scaffold an Account Service client boundary instead of treating Auth0 login as direct game login.
