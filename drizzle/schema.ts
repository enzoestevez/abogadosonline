import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, json } from "drizzle-orm/mysql-core";

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

// Tabla para guardar consultas de sucesiones
export const successionConsultations = mysqlTable("succession_consultations", {
  id: int("id").autoincrement().primaryKey(),
  hasWill: varchar("hasWill", { length: 10 }).notNull(),
  deceasedType: varchar("deceasedType", { length: 50 }).notNull(),
  maritalStatus: varchar("maritalStatus", { length: 50 }).notNull(),
  hasChildren: varchar("hasChildren", { length: 10 }).notNull(),
  heirstAgreement: varchar("heirstAgreement", { length: 10 }).notNull(),
  heirName: varchar("heirName", { length: 255 }).notNull(),
  heirEmail: varchar("heirEmail", { length: 320 }).notNull(),
  heirPhone: varchar("heirPhone", { length: 20 }).notNull(),
  diagnosis: json("diagnosis"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type SuccessionConsultation = typeof successionConsultations.$inferSelect;
export type InsertSuccessionConsultation = typeof successionConsultations.$inferInsert;

// Tabla para guardar consultas de divorcios
export const divorceConsultations = mysqlTable("divorce_consultations", {
  id: int("id").autoincrement().primaryKey(),
  hasChildren: varchar("hasChildren", { length: 10 }).notNull(),
  childrenAges: varchar("childrenAges", { length: 50 }),
  hasAssets: varchar("hasAssets", { length: 10 }).notNull(),
  contactName: varchar("contactName", { length: 255 }).notNull(),
  contactEmail: varchar("contactEmail", { length: 320 }).notNull(),
  contactPhone: varchar("contactPhone", { length: 20 }).notNull(),
  diagnosis: json("diagnosis"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type DivorceConsultation = typeof divorceConsultations.$inferSelect;
export type InsertDivorceConsultation = typeof divorceConsultations.$inferInsert;