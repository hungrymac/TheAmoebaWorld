import { pgSchema, uuid, text, timestamp, numeric } from "drizzle-orm/pg-core";

export const accountingSchema = pgSchema("accounting");

/** Placeholder: management accounting facts (all include tenant_id) */
export const costCenters = accountingSchema.table("cost_centers", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id").notNull(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const journalLines = accountingSchema.table("journal_lines", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id").notNull(),
  amount: numeric("amount", { precision: 18, scale: 2 }).notNull(),
  memo: text("memo"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
