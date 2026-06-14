import { boolean, pgSchema, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const auth = pgSchema('auth');

export const userProfiles = auth.table('user_profiles', {
  id: uuid('id').defaultRandom().primaryKey(),
  displayName: text('display_name'),
  email: text('email'),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const auth0Identities = auth.table('auth0_identities', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => userProfiles.id),
  auth0Subject: text('auth0_subject').notNull().unique(),
  email: text('email'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const userRolesCache = auth.table('user_roles_cache', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => userProfiles.id),
  role: text('role').notNull(),
  source: text('source').notNull().default('auth0'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});
