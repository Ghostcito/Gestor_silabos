import {
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const silabos = pgTable("silabos", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(), // ID autoincremental
  codigo: varchar("codigo", { length: 10 }).notNull().unique(), // Ej: "CS101"
  nombre: varchar("nombre", { length: 100 }).notNull(), // Ej: "Programación I"
  creditos: integer("creditos").notNull(),
  ciclo: integer("ciclo").notNull(), // Semestre/ciclo académico
  descripcion: text("descripcion"),
  profesor: varchar("profesor", { length: 100 }).notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});
