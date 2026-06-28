# System Blueprint - Support Portal

## Purpose

Build the player support entry point and staff support workflow for Alpha web planning.

## Player-Facing Responsibilities

Implement or scaffold:

```text
help articles
bug report form
player support tickets
ban appeal form
account recovery assistance links
known issue tracker
troubleshooting guides
```

## Staff Responsibilities

Implement or scaffold:

```text
support ticket review
contact message review
support notes
status changes
assignment metadata
links to admin account lookup
links to audit events
```

## Required Frontend Areas

```text
apps/frontend/src/app/support/
apps/frontend/src/app/admin/support/
```

## Required Backend Modules

```text
apps/api/src/modules/support/
apps/api/src/modules/contact/
apps/api/src/modules/audit/
```

## Required Directus Content

Directus may manage:

```text
support articles
FAQ pages
known issue pages
troubleshooting guides
```

## Acceptance Criteria

- Public users can submit support/contact/bug report forms as allowed.
- Authenticated users can create/view their own support tickets when implemented.
- Admin/support staff actions are role-protected and audited.
- Support actions do not directly mutate game-critical data.
