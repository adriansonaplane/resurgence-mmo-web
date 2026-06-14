import { jsonb, pgSchema, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { userProfiles } from './auth.schema';

export const audit = pgSchema('audit');

export const auditEvents = audit.table('audit_events', {
  id: uuid('id').defaultRandom().primaryKey(),
  actorUserId: uuid('actor_user_id').references(() => userProfiles.id),
  actorAuth0Subject: text('actor_auth0_subject'),
  action: text('action').notNull(),
  targetType: text('target_type').notNull(),
  targetId: text('target_id'),
  requestId: text('request_id'),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  metadataJson: jsonb('metadata_json'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const adminActions = audit.table('admin_actions', {
  id: uuid('id').defaultRandom().primaryKey(),
  actorAuth0Subject: text('actor_auth0_subject').notNull(),
  action: text('action').notNull(),
  targetType: text('target_type').notNull(),
  targetId: text('target_id'),
  metadataJson: jsonb('metadata_json'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const securityEvents = audit.table('security_events', {
  id: uuid('id').defaultRandom().primaryKey(),
  actorAuth0Subject: text('actor_auth0_subject'),
  eventType: text('event_type').notNull(),
  severity: text('severity').notNull().default('info'),
  metadataJson: jsonb('metadata_json'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});
