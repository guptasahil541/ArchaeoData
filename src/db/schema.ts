import {
  pgTable,
  index,
  foreignKey,
  uuid,
  timestamp,
  integer,
  varchar,
  jsonb,
} from "drizzle-orm/pg-core";

export const historicalEventsTable = pgTable(
  "HistoricalEvents",
  {
    eventId: uuid("event_id").primaryKey().defaultRandom(),
    eventName: varchar("event_name").notNull(),
    description: varchar("description"),
    startDate: timestamp("start_date", { withTimezone: true }).notNull(),
    endDate: timestamp("end_date", { withTimezone: true }).notNull(),
    durationMinutes: integer("duration_minutes").notNull(),
    parentEventId: uuid("parent_event_id"),
    metadata: jsonb("metadata").notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.parentEventId],
      foreignColumns: [table.eventId],
    }),
    index("start_date_idx").on(table.startDate),
    index("end_date_idx").on(table.endDate),
  ],
);
