# Phase 11 Blueprint - Entitlement Bridge and Game Backend Boundary

    ## Goal

    Define website-to-game entitlement integration boundary.

    ## Codex Implementation Instructions

    - Define entitlement keys/statuses: base_game_access, alpha_access, beta_access, founder packs, cosmetics, expansion access, premium stash tabs.
- Create authenticated entitlement query contract for game backend.
- Add service authentication for game-backend-to-website reads.
- Add audit logging for grant/revoke/read-sensitive operations.
- Document no website direct writes to live inventory.

    ## Required Deliverables

    - `docs/contracts/entitlement-bridge.md`
- `apps/api/src/modules/entitlements/*`

    ## Acceptance Criteria

    - Website grants account-level entitlements only.
- Game backend remains authoritative for live game state.
- Entitlement reads are authenticated and audited.

    ## Guardrails

    - Preserve the approved stack from `00_START_HERE/CANONICAL_CONSTRAINTS.md`.
    - Keep secrets out of source control.
    - Add or update tests in the same phase as implementation.
    - Update documentation when introducing new routes, environment variables, schema changes, or external services.
    - Backend HTTP/API tests must use Fastify Inject, not Supertest.
