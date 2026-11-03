import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { Users } from "./users";

export const Env = pgTable("env", {
    vault: integer("vault").references(() => Users.id),
    env: text("env").notNull(),
    id: serial("id").primaryKey(),
    label: text("label").notNull(),
    created_at: timestamp("created_at").defaultNow(),
});
export type EnvType = typeof Env.$inferSelect;
export type EnvInsert = typeof Env.$inferInsert;
