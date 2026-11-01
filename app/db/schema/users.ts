import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const Users = pgTable("users", {
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  created_at: timestamp("created_at"),
});

export type User = typeof Users.$inferSelect;
export type UserInsert = typeof Users.$inferInsert;
