# Phase 12 Blueprint - Admin, Support, Audit Tools

    ## Goal

    Create controlled staff workflows with auditability.

    ## Codex Implementation Instructions

    - Build role-protected admin route shell in Angular.
- Build admin API guards for support_agent, moderator, content_editor, store_manager, developer, super_admin.
- Build order lookup, entitlement lookup, audit log viewer, support/contact review.
- Integrate/link Directus for editorial workflows instead of duplicating CMS UI.
- Audit entitlement grant/revoke, refund review, product update, price mapping update, account status change, admin role change, audit access, support notes.

    ## Required Deliverables

    - `apps/frontend/src/app/admin/*`
- `apps/api/src/modules/admin/*`
- `apps/api/src/modules/support/*`
- `apps/api/src/modules/audit/*`

    ## Acceptance Criteria

    - Unauthorized users cannot access admin APIs/pages.
- Sensitive admin actions create audit records.
- Directus remains CMS; NestJS remains business API.

    ## Guardrails

    - Preserve the approved stack from `00_START_HERE/CANONICAL_CONSTRAINTS.md`.
    - Keep secrets out of source control.
    - Add or update tests in the same phase as implementation.
    - Update documentation when introducing new routes, environment variables, schema changes, or external services.
    - Backend HTTP/API tests must use Fastify Inject, not Supertest.
