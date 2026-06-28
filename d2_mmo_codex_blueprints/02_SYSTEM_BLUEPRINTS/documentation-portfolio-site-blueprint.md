# System Blueprint - Documentation and Portfolio Site

## Purpose

Support public documentation, project presentation, and portfolio/case-study pages in the Companion Web Platform.

## Responsibilities

Implement or scaffold public pages/content for:

```text
public technical case study
architecture summaries
project milestone pages
media kit
development roadmap excerpts
portfolio-facing engineering summaries
recruit/collaborator information
public documentation pages
developer-facing documentation if approved
```

## Directus Usage

Directus may manage public documentation and possibly developer-facing documentation if practical.

Directus must not directly manage authoritative gameplay data, live balance data, loot tables, item stats, or server configuration unless a future reviewed configuration pipeline is created.

## Required Frontend Areas

```text
apps/frontend/src/app/public/documentation/
apps/frontend/src/app/public/portfolio/
apps/frontend/src/app/public/media/
```

## Acceptance Criteria

- Public documentation and portfolio pages can consume published Directus content.
- Draft/internal documentation is not publicly exposed.
- Content roles are separated from system/admin roles.
