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

export const publicProfileSettings = player.table('public_profile_settings', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => userProfiles.id),
  publicName: text('public_name').notNull().unique(),
  displayName: text('display_name'),
  visibility: text('visibility').notNull().default('private'),
  settingsJson: jsonb('settings_json').notNull().default({}),
  sourceOfTruth: text('source_of_truth').notNull().default('website database'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const characterSummaryReadModels = player.table('character_summary_read_models', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => userProfiles.id),
  publicProfileId: uuid('public_profile_id').references(() => publicProfileSettings.id),
  externalCharacterId: text('external_character_id').notNull(),
  publicName: text('public_name'),
  characterName: text('character_name').notNull(),
  className: text('class_name').notNull(),
  level: integer('level').notNull().default(1),
  summaryJson: jsonb('summary_json').notNull().default({}),
  sourceOfTruth: text('source_of_truth').notNull().default('Game Platform Service'),
  syncedAt: timestamp('synced_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const achievementSummaryReadModels = player.table('achievement_summary_read_models', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => userProfiles.id),
  publicProfileId: uuid('public_profile_id').references(() => publicProfileSettings.id),
  externalAchievementId: text('external_achievement_id').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  achievedAt: timestamp('achieved_at', { withTimezone: true }),
  summaryJson: jsonb('summary_json').notNull().default({}),
  sourceOfTruth: text('source_of_truth').notNull().default('Game Platform Service'),
  syncedAt: timestamp('synced_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});
