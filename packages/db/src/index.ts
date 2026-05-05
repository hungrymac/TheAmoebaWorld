import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema";

export * from "./schema";
export { schema };

export type AmoebaDb = PostgresJsDatabase<typeof schema>;

/**
 * Server-side database client. Use only with DATABASE_URL in trusted environments
 * (migrations, server actions, API routes). Never expose in the browser.
 */
export function createDb(connectionString: string): AmoebaDb {
  const client = postgres(connectionString, { max: 10 });
  return drizzle(client, { schema });
}
