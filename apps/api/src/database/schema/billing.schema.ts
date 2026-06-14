import { integer, jsonb, pgSchema, text, timestamp, unique, uuid } from 'drizzle-orm/pg-core';
import { userProfiles } from './auth.schema';

export const billing = pgSchema('billing');

export const stripeCustomers = billing.table('stripe_customers', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => userProfiles.id),
  auth0Subject: text('auth0_subject').notNull(),
  stripeCustomerId: text('stripe_customer_id').notNull().unique(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const orders = billing.table('orders', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => userProfiles.id),
  auth0Subject: text('auth0_subject').notNull(),
  stripeCheckoutSessionId: text('stripe_checkout_session_id').notNull().unique(),
  stripeCustomerId: text('stripe_customer_id'),
  status: text('status').notNull(),
  totalAmount: integer('total_amount').notNull().default(0),
  currency: text('currency').notNull().default('usd'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const orderItems = billing.table('order_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  orderId: uuid('order_id').notNull().references(() => orders.id),
  productSlug: text('product_slug').notNull(),
  entitlementKey: text('entitlement_key').notNull(),
  quantity: integer('quantity').notNull().default(1),
  unitAmount: integer('unit_amount').notNull().default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const stripeEvents = billing.table('stripe_events', {
  id: uuid('id').defaultRandom().primaryKey(),
  stripeEventId: text('stripe_event_id').notNull().unique(),
  eventType: text('event_type').notNull(),
  payloadJson: jsonb('payload_json').notNull(),
  processedAt: timestamp('processed_at', { withTimezone: true }),
  processingStatus: text('processing_status').notNull().default('received'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const entitlements = billing.table(
  'entitlements',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').references(() => userProfiles.id),
    auth0Subject: text('auth0_subject').notNull(),
    entitlementKey: text('entitlement_key').notNull(),
    source: text('source').notNull(),
    sourceOrderId: text('source_order_id').notNull(),
    status: text('status').notNull().default('active'),
    grantedAt: timestamp('granted_at', { withTimezone: true }).notNull().defaultNow(),
    revokedAt: timestamp('revoked_at', { withTimezone: true }),
    expiresAt: timestamp('expires_at', { withTimezone: true }),
    metadataJson: jsonb('metadata_json'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    uniqueGrant: unique().on(table.auth0Subject, table.entitlementKey, table.source, table.sourceOrderId),
  }),
);

export const refunds = billing.table('refunds', {
  id: uuid('id').defaultRandom().primaryKey(),
  orderId: uuid('order_id').references(() => orders.id),
  stripeRefundId: text('stripe_refund_id').notNull().unique(),
  status: text('status').notNull(),
  amount: integer('amount').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});
