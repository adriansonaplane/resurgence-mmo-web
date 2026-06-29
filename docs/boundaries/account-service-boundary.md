# Account Service Boundary

The Account Service boundary separates web account workflows from game-account/session authority. The web API exposes account-facing routes, but cross-boundary operations are routed through `AccountServiceClient`.

## Web-Owned

- Authenticated account portal presentation.
- Web profile preferences.
- Account recovery request intake.
- Web audit metadata.
- Web entitlement records created after verified Stripe webhooks.

## Account/Game-Owned

- Game session creation and validation.
- Account ban/suspension source of truth.
- Game-account entitlement application.
- Gateway admission decisions.

## Current Stub Contract

Until the live Account Service exists, `AccountServiceClient` returns explicit stub responses. Game-session placeholders include `webSessionIsGameSession: false` and `gatewayValidationRequired: true` so callers cannot confuse web auth with gameplay authorization.
