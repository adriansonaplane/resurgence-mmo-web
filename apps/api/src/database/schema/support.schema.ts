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
