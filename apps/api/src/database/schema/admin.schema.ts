import { jsonb, pgSchema, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const admin = pgSchema('admin');

export const dashboardMetadata = admin.table('dashboard_metadata', {
  id: uuid('id').defaultRandom().primaryKey(),
  widgetKey: text('widget_key').notNull().unique(),
  title: text('title').notNull(),
  description: text('description'),
  configJson: jsonb('config_json').notNull().default({}),
  sourceOfTruth: text('source_of_truth').notNull().default('website database'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const playerReportReferences = admin.table('player_report_references', {
  id: uuid('id').defaultRandom().primaryKey(),
  reporterAuth0Subject: text('reporter_auth0_subject'),
  reportedAuth0Subject: text('reported_auth0_subject'),
  externalReportId: text('external_report_id'),
  status: text('status').notNull().default('open'),
  summary: text('summary').notNull(),
  metadataJson: jsonb('metadata_json').notNull().default({}),
  sourceOfTruth: text('source_of_truth').notNull().default('Account Service'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});
