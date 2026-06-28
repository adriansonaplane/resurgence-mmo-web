# System Blueprint - Player Profile Read Model

## Purpose

Support player-facing profile and character summary views without giving the web platform ownership of game-critical state.

## Allowed Data

The web platform may display selected read-only or synchronized summary data:

```text
character list
character summary
class display
level/progression summary
achievement display
future guild display
future match or dungeon history
public/private profile settings
display name
account status
```

## Forbidden Data Mutations

Do not allow profile APIs to mutate:

```text
inventory
equipment
items
currency
loot
skills/stats unless through approved game service
XP rewards
combat state
zone state
dungeon state
```

## Required Backend Module

```text
apps/api/src/modules/player-profiles/
```

## Required Frontend Area

```text
apps/frontend/src/app/profile/
```

## Required Data Pattern

Use one or both early patterns:

```text
safe read model table in website database
Account Service / Player Profile API client for game-owned summaries
```

## Acceptance Criteria

- Profile pages are read-oriented.
- Public/private profile settings are web-owned.
- Character summaries are clearly non-authoritative display data.
- No direct live game table writes are introduced.
