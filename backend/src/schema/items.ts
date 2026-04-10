import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { categories } from './categories.js';
import { sql } from 'drizzle-orm';

export const items = sqliteTable('items', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  description: text('description'),
  quantity: integer('quantity').notNull().default(1),
  purchaseDate: text('purchase_date'),
  purchasePrice: real('purchase_price'),
  categoryId: integer('categories_id').references(() => categories.id),
  createdAt: text('created_at')
    .notNull()
    .default(sql`(datetime('now'))`),
  updatedAt: text('updated_at')
    .notNull()
    .default(sql`(datetime('now'))`),
});
