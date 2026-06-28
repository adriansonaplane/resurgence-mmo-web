# Changelog

## 0.3 - Main Blueprint and References Synchronized

Updated the top-level Codex implementation prompt and synchronized it into `references/main_blueprint.md`.

Updated or added:

- Root uploaded `main_blueprint.md`
- `references/main_blueprint.md`
- `references/README.md`
- `README.md`
- `manifest.json`

Main prompt now explicitly requires:

- Reading the nested package `README.md`, `CHANGELOG.md`, `manifest.json`, and reference files first.
- Reading `COMPANION_BOUNDARY_IMPLEMENTATION_NOTES.md` and `boundary-contract.md` before implementation.
- Preserving the nested `README.md` and `references/` folder.
- Applying the Companion Web Platform boundary throughout implementation.
- Using the Account Service boundary for cross-boundary identity/session/entitlement operations.
- Keeping the website database separate from the game runtime database.
- Implementing public website, account portal, player profile read model, support portal, documentation/portfolio site, storefront, admin tools, Directus CMS, and entitlement handoff boundaries.

Key architecture decision preserved:

The Companion Web Platform supports the game but does not simulate the game.

## 0.2 - Companion Web Platform Boundary Incorporated

Incorporated guidance from `companion-web-platform-boundary.pdf`.

Updated or added:

- `00_START_HERE/CANONICAL_CONSTRAINTS.md`
- `00_START_HERE/REPO_TARGET_SHAPE.md`
- Phase blueprints 00, 01, 03, 04, 05, 07, 08, 09, 10, 11, 12, 14, 16, and 19
- New system blueprints:
  - `companion-web-platform-boundary-blueprint.md`
  - `account-service-boundary-blueprint.md`
  - `player-profile-read-model-blueprint.md`
  - `support-portal-blueprint.md`
  - `documentation-portfolio-site-blueprint.md`
- Updated system blueprints for backend, frontend, database, Directus, Auth0, Stripe, testing, and deployment
- New contract:
  - `03_CONTRACTS/boundary-contract.md`
- Updated contracts for API, database, environment, and acceptance gates
- Added reference files:
  - `references/companion-web-platform-boundary.md`
  - `references/companion-web-platform-boundary.pdf`

Key architecture decision preserved:

The Companion Web Platform supports the game but does not simulate the game.
