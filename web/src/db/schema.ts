import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const briefs = pgTable("briefs", {
  id: serial("id").primaryKey(),
  brandName: text("brand_name").notNull(),
  audience: text("audience").notNull(),
  budget: text("budget").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
