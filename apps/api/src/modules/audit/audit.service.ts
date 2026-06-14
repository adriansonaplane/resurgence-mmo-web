import { Injectable } from '@nestjs/common';

export interface AuditRecord {
  actorAuth0Subject?: string;
  action: string;
  targetType: string;
  targetId?: string;
  requestId?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

@Injectable()
export class AuditService {
  private readonly records: AuditRecord[] = [];

  record(event: Omit<AuditRecord, 'createdAt'>) {
    const record = { ...event, createdAt: new Date().toISOString() };
    this.records.push(record);
    return record;
  }

  list() {
    return [...this.records].reverse();
  }
}
