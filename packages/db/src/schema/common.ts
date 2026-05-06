import { pgSchema, uuid, text, timestamp, primaryKey } from "drizzle-orm/pg-core";

/** Logical grouping for shared tenant + identity tables */
export const commonSchema = pgSchema("common");

export const tenants = commonSchema.table("tenants", {
  tenantId: uuid("tenant_id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

/**
 * Per-tenant profile row for an auth user (theme: every table carries tenant_id).
 * Composite PK matches RLS and cross-app joins on (tenant_id, user_id).
 */
export const profiles = commonSchema.table(
  "profiles",
  {
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => tenants.tenantId, { onDelete: "cascade" }),
    userId: uuid("user_id").notNull(),
    displayName: text("display_name"),
    avatarUrl: text("avatar_url"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.tenantId, t.userId] }),
  }),
);

export const tenantMemberships = commonSchema.table(
  "tenant_memberships",
  {
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => tenants.tenantId, { onDelete: "cascade" }),
    userId: uuid("user_id").notNull(),
    role: text("role").notNull().default("member"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.tenantId, t.userId] }),
  }),
);
