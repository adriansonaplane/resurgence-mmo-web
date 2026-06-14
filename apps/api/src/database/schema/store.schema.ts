import { boolean, integer, jsonb, numeric, pgSchema, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const store = pgSchema('store');

export const productCategories = store.table('product_categories', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  isVisible: boolean('is_visible').notNull().default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const products = store.table('products', {
  id: uuid('id').defaultRandom().primaryKey(),
  categoryId: uuid('category_id').references(() => productCategories.id),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  entitlementKey: text('entitlement_key').notNull(),
  isVisible: boolean('is_visible').notNull().default(false),
  isActive: boolean('is_active').notNull().default(false),
  seoTitle: text('seo_title'),
  seoDescription: text('seo_description'),
  metadataJson: jsonb('metadata_json'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const productAssets = store.table('product_assets', {
  id: uuid('id').defaultRandom().primaryKey(),
  productId: uuid('product_id').notNull().references(() => products.id),
  url: text('url').notNull(),
  altText: text('alt_text').notNull(),
  sortOrder: integer('sort_order').notNull().default(0),
});

export const productPrices = store.table('product_prices', {
  id: uuid('id').defaultRandom().primaryKey(),
  productId: uuid('product_id').notNull().references(() => products.id),
  stripePriceId: text('stripe_price_id').notNull(),
  currency: text('currency').notNull().default('usd'),
  unitAmount: numeric('unit_amount').notNull(),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});
