import { pgSchema, uuid, text, timestamp } from "drizzle-orm/pg-core";

export const meetingSchema = pgSchema("meeting");

/** Placeholder: domain tables for meeting analysis (all include tenant_id) */
export const meetingSessions = meetingSchema.table("meeting_sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id").notNull(),
  title: text("title").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
