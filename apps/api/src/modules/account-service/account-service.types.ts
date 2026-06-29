export type AccountBoundarySource = 'stub' | 'account-service';

export interface AccountStatus {
  auth0Subject: string;
  source: AccountBoundarySource;
  accountState: 'active' | 'suspended' | 'banned' | 'unknown';
  supportFlags: string[];
  gameSessionEligible: boolean;
}

export interface LinkedAccount {
  provider: 'auth0' | 'game-account' | 'discord' | 'steam';
  externalId: string;
  status: 'linked' | 'pending' | 'unavailable';
  source: AccountBoundarySource;
}

export interface AccountSecuritySummary {
  auth0Subject: string;
  source: AccountBoundarySource;
  mfaRequired: boolean;
  recoveryAvailable: boolean;
  gameSessionAuthority: 'game-runtime';
}

export interface AccountRecoveryRequest {
  auth0Subject: string;
  requestId: string;
  status: 'queued_for_account_service';
  source: AccountBoundarySource;
}

export interface GameSessionPlaceholderRequest {
  auth0Subject: string;
  requestId: string;
  status: 'contract_placeholder';
  webSessionIsGameSession: false;
  gatewayValidationRequired: true;
  source: AccountBoundarySource;
}

export interface EntitlementHandoffEvent {
  id: string;
  auth0Subject: string;
  entitlementKey: string;
  sourceOrderId: string;
  webEntitlementSource: string;
  status: 'queued_for_account_service' | 'accepted_by_account_service' | 'failed';
  boundary: 'account-entitlement-service';
  createdAt: string;
}
