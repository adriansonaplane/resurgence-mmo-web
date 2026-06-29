import { jsonb, pgSchema, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const support = pgSchema('support');

export const contactMessages = support.table('contact_messages', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').notNull(),
  subject: text('subject').notNull(),
  message: text('message').notNull(),
  status: text('status').notNull().default('new'),
  metadataJson: jsonb('metadata_json'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const supportTickets = support.table('support_tickets', {
  id: uuid('id').defaultRandom().primaryKey(),
  auth0Subject: text('auth0_subject'),
  email: text('email').notNull(),
  subject: text('subject').notNull(),
  status: text('status').notNull().default('open'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const supportTicketEvents = support.table('support_ticket_events', {
  id: uuid('id').defaultRandom().primaryKey(),
  ticketId: uuid('ticket_id').notNull().references(() => supportTickets.id),
  actorAuth0Subject: text('actor_auth0_subject'),
  eventType: text('event_type').notNull(),
  body: text('body'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const bugReports = support.table('bug_reports', {
  id: uuid('id').defaultRandom().primaryKey(),
  auth0Subject: text('auth0_subject'),
  email: text('email'),
  title: text('title').notNull(),
  description: text('description').notNull(),
  reproductionSteps: text('reproduction_steps'),
  severity: text('severity').notNull().default('normal'),
  status: text('status').notNull().default('new'),
  metadataJson: jsonb('metadata_json').notNull().default({}),
  sourceOfTruth: text('source_of_truth').notNull().default('website database'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const banAppeals = support.table('ban_appeals', {
  id: uuid('id').defaultRandom().primaryKey(),
  auth0Subject: text('auth0_subject').notNull(),
  email: text('email'),
  appealText: text('appeal_text').notNull(),
  status: text('status').notNull().default('submitted'),
  accountServiceReference: text('account_service_reference'),
  metadataJson: jsonb('metadata_json').notNull().default({}),
  sourceOfTruth: text('source_of_truth').notNull().default('Account Service'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const accountRecoveryRequests = support.table('account_recovery_requests', {
  id: uuid('id').defaultRandom().primaryKey(),
  auth0Subject: text('auth0_subject'),
  email: text('email').notNull(),
  status: text('status').notNull().default('submitted'),
  accountServiceReference: text('account_service_reference'),
  metadataJson: jsonb('metadata_json').notNull().default({}),
  sourceOfTruth: text('source_of_truth').notNull().default('Account Service'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const knownIssueReferences = support.table('known_issue_references', {
  id: uuid('id').defaultRandom().primaryKey(),
  directusItemId: text('directus_item_id'),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  status: text('status').notNull().default('investigating'),
  summary: text('summary'),
  sourceOfTruth: text('source_of_truth').notNull().default('Directus'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});
