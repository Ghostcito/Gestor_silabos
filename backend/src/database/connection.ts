import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { silabos } from "./schema.js";

const connectionString = process.env.DATABASE_URL || "";

const client = postgres(connectionString, { prepare: false });
const db = drizzle(client);
