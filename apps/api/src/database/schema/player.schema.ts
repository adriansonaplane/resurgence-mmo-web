import { boolean, integer, jsonb, pgSchema, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { userProfiles } from './auth.schema';

export const player = pgSchema('player');

export const characterSummaries = player.table('character_summaries', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => userProfiles.id),
  externalCharacterId: text('external_character_id').notNull(),
  name: text('name').notNull(),
  className: text('class_name').notNull(),
  level: integer('level').notNull().default(1),
  lastSeenAt: timestamp('last_seen_at', { withTimezone: true }),
  metadataJson: jsonb('metadata_json'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const accountFlags = player.table('account_flags', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => userProfiles.id),
  flag: text('flag').notNull(),
  enabled: boolean('enabled').notNull().default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const accountPreferences = player.table('account_preferences', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => userProfiles.id),
  preferencesJson: jsonb('preferences_json').notNull().default({}),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});
