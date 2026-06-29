import { Injectable } from '@nestjs/common';
import { AccountServiceClient } from '../account-service/account-service.client';
import { AuditService } from '../audit/audit.service';

export interface EntitlementRecord {
  auth0Subject: string;
  entitlementKey: string;
  source: 'stripe_webhook' | 'admin' | 'game_bridge';
  sourceOrderId: string;
  status: 'active' | 'revoked';
  grantedAt: string;
}

@Injectable()
export class EntitlementsService {
  private readonly entitlements = new Map<string, EntitlementRecord>();

  constructor(
    private readonly accountServiceClient: AccountServiceClient,
    private readonly auditService: AuditService,
  ) {}

  grant(input: Omit<EntitlementRecord, 'status' | 'grantedAt'>) {
    const key = this.keyFor(input.auth0Subject, input.entitlementKey, input.source, input.sourceOrderId);
    const existing = this.entitlements.get(key);
    if (existing) return existing;

    const record: EntitlementRecord = {
      ...input,
      status: 'active',
      grantedAt: new Date().toISOString(),
    };
    this.entitlements.set(key, record);
    const handoff = this.accountServiceClient.queueEntitlementHandoff({
      auth0Subject: input.auth0Subject,
      entitlementKey: input.entitlementKey,
      sourceOrderId: input.sourceOrderId,
      webEntitlementSource: input.source,
    });
    this.auditService.record({
      actorAuth0Subject: input.auth0Subject,
      action: 'entitlement.granted',
      targetType: 'entitlement',
      targetId: input.entitlementKey,
      metadata: { source: input.source, sourceOrderId: input.sourceOrderId, handoffId: handoff.id },
    });
    return record;
  }

  listForUser(auth0Subject: string) {
    return [...this.entitlements.values()].filter((record) => record.auth0Subject === auth0Subject);
  }

  listAll() {
    return [...this.entitlements.values()];
  }

  private keyFor(auth0Subject: string, entitlementKey: string, source: string, sourceOrderId: string) {
    return `${auth0Subject}:${entitlementKey}:${source}:${sourceOrderId}`;
  }
}
