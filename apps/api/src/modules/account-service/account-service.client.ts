import { Injectable } from '@nestjs/common';
import {
  AccountRecoveryRequest,
  AccountSecuritySummary,
  AccountStatus,
  EntitlementHandoffEvent,
  GameSessionPlaceholderRequest,
  LinkedAccount,
} from './account-service.types';

@Injectable()
export class AccountServiceClient {
  private readonly handoffEvents: EntitlementHandoffEvent[] = [];

  getAccountStatus(auth0Subject: string): AccountStatus {
    return {
      auth0Subject,
      source: 'stub',
      accountState: 'active',
      supportFlags: [],
      gameSessionEligible: false,
    };
  }

  getLinkedAccounts(auth0Subject: string): LinkedAccount[] {
    return [
      {
        provider: 'auth0',
        externalId: auth0Subject,
        status: 'linked',
        source: 'stub',
      },
      {
        provider: 'game-account',
        externalId: 'pending-account-service',
        status: 'unavailable',
        source: 'stub',
      },
    ];
  }

  getSecuritySummary(auth0Subject: string): AccountSecuritySummary {
    return {
      auth0Subject,
      source: 'stub',
      mfaRequired: false,
      recoveryAvailable: true,
      gameSessionAuthority: 'game-runtime',
    };
  }

  startAccountRecovery(auth0Subject: string): AccountRecoveryRequest {
    return {
      auth0Subject,
      requestId: `recovery_${Date.now()}`,
      status: 'queued_for_account_service',
      source: 'stub',
    };
  }

  requestGameSessionPlaceholder(auth0Subject: string): GameSessionPlaceholderRequest {
    return {
      auth0Subject,
      requestId: `game_session_contract_${Date.now()}`,
      status: 'contract_placeholder',
      webSessionIsGameSession: false,
      gatewayValidationRequired: true,
      source: 'stub',
    };
  }

  queueEntitlementHandoff(input: Omit<EntitlementHandoffEvent, 'id' | 'status' | 'boundary' | 'createdAt'>) {
    const existing = this.handoffEvents.find(
      (event) =>
        event.auth0Subject === input.auth0Subject &&
        event.entitlementKey === input.entitlementKey &&
        event.sourceOrderId === input.sourceOrderId,
    );
    if (existing) return existing;

    const event: EntitlementHandoffEvent = {
      ...input,
      id: `entitlement_handoff_${this.handoffEvents.length + 1}`,
      status: 'queued_for_account_service',
      boundary: 'account-entitlement-service',
      createdAt: new Date().toISOString(),
    };
    this.handoffEvents.push(event);
    return event;
  }

  listEntitlementHandoffs() {
    return [...this.handoffEvents];
  }
}
