import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "@/db/schema"

type OpenVenueDb = ReturnType<typeof createDbClient>["db"]

declare global {
  var __openvenueDb:
    | {
        client: postgres.Sql
        db: OpenVenueDb
      }
    | undefined
}

function getDatabaseUrl() {
  const databaseUrl = process.env.DATABASE_URL

  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL is not configured. Add it to your environment before using the database client.",
    )
  }

  return databaseUrl
}

export function createDbClient(databaseUrl = getDatabaseUrl()) {
  const client = postgres(databaseUrl, {
    max: 1,
    prepare: false,
  })

  return {
    client,
    db: drizzle(client, { schema }),
  }
}

export function getDb() {
  if (globalThis.__openvenueDb) {
    return globalThis.__openvenueDb.db
  }

  const connection = createDbClient()

  if (process.env.NODE_ENV !== "production") {
    globalThis.__openvenueDb = connection
  }

  return connection.db
}

export type DatabaseClient = ReturnType<typeof getDb>
