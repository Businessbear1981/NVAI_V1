import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Kiki Backstage Experience Tables

// Guest Book entries
export const kikiGuestBook = mysqlTable("kiki_guest_book", {
  id: int("id").autoincrement().primaryKey(),
  visitorName: varchar("visitor_name", { length: 255 }).notNull(),
  message: text("message").notNull(),
  email: varchar("email", { length: 320 }),
  isPublic: int("is_public").default(1).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type KikiGuestBookEntry = typeof kikiGuestBook.$inferSelect;
export type InsertKikiGuestBookEntry = typeof kikiGuestBook.$inferInsert;

// Film Crowdfunding Campaign
export const kikiFilmCampaign = mysqlTable("kiki_film_campaign", {
  id: int("id").autoincrement().primaryKey(),
  supporterName: varchar("supporter_name", { length: 255 }).notNull(),
  pledgeAmount: int("pledge_amount").notNull(),
  pledgeMessage: text("pledge_message"),
  email: varchar("email", { length: 320 }),
  isPublic: int("is_public").default(1).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type KikiFilmPledge = typeof kikiFilmCampaign.$inferSelect;
export type InsertKikiFilmPledge = typeof kikiFilmCampaign.$inferInsert;

// Lingerie Collection Products
export const lingerieLine = mysqlTable("lingerie_line", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  era: varchar("era", { length: 100 }).notNull(),
  inspiration: text("inspiration"),
  imageUrl: varchar("image_url", { length: 512 }),
  price: int("price").notNull(),
  brand: varchar("brand", { length: 255 }),
  isAvailable: int("is_available").default(1).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type LingerieProduct = typeof lingerieLine.$inferSelect;
export type InsertLingerieProduct = typeof lingerieLine.$inferInsert;

// Kiki Story Archive
export const kikiArchive = mysqlTable("kiki_archive", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  type: varchar("type", { length: 100 }).notNull(),
  contentUrl: varchar("content_url", { length: 512 }).notNull(),
  year: int("year"),
  source: varchar("source", { length: 255 }),
  isPublic: int("is_public").default(1).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type KikiArchiveItem = typeof kikiArchive.$inferSelect;
export type InsertKikiArchiveItem = typeof kikiArchive.$inferInsert;

// Kiki Products (Exposé, Audiobook, etc.)
export const kikiProducts = mysqlTable("kiki_products", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  type: varchar("type", { length: 100 }).notNull(),
  price: int("price").notNull(),
  imageUrl: varchar("image_url", { length: 512 }),
  downloadUrl: varchar("download_url", { length: 512 }),
  isAvailable: int("is_available").default(1).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type KikiProduct = typeof kikiProducts.$inferSelect;
export type InsertKikiProduct = typeof kikiProducts.$inferInsert;
