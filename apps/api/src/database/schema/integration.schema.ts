import { jsonb, pgSchema, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const integration = pgSchema('integration');

export const accountServiceEvents = integration.table('account_service_events', {
  id: uuid('id').defaultRandom().primaryKey(),
  eventType: text('event_type').notNull(),
  auth0Subject: text('auth0_subject'),
  accountServiceReference: text('account_service_reference'),
  status: text('status').notNull().default('queued'),
  payloadJson: jsonb('payload_json').notNull().default({}),
  responseJson: jsonb('response_json'),
  sourceOfTruth: text('source_of_truth').notNull().default('Account Service'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  processedAt: timestamp('processed_at', { withTimezone: true }),
});

export const entitlementHandoffEvents = integration.table('entitlement_handoff_events', {
  id: uuid('id').defaultRandom().primaryKey(),
  auth0Subject: text('auth0_subject').notNull(),
  entitlementKey: text('entitlement_key').notNull(),
  sourceOrderId: text('source_order_id').notNull(),
  webEntitlementSource: text('web_entitlement_source').notNull(),
  status: text('status').notNull().default('queued_for_account_service'),
  payloadJson: jsonb('payload_json').notNull().default({}),
  responseJson: jsonb('response_json'),
  sourceOfTruth: text('source_of_truth').notNull().default('Account/Entitlement Service'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  processedAt: timestamp('processed_at', { withTimezone: true }),
});
