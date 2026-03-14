import process from "node:process"
import postgres from "postgres"

function loadOptionalEnvFile(path: string) {
  try {
    process.loadEnvFile?.(path)
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
      throw error
    }
  }
}

loadOptionalEnvFile(".env.local")
loadOptionalEnvFile(".env")

function requireEnv(name: string) {
  const value = process.env[name]

  if (!value) {
    throw new Error(`${name} is not configured.`)
  }

  return value
}

function withTimeout<T>(promise: Promise<T>, ms: number, label: string) {
  let timer: ReturnType<typeof setTimeout> | undefined

  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(label)), ms)
  })

  return Promise.race([promise, timeout]).finally(() => {
    if (timer) {
      clearTimeout(timer)
    }
  })
}

async function checkPublicApi(url: string, publishableKey: string) {
  const response = await withTimeout(
    fetch(`${url}/auth/v1/health`, {
      headers: {
        apikey: publishableKey,
      },
    }),
    10_000,
    "Timed out while checking the public Supabase API.",
  )

  if (!response.ok) {
    throw new Error(`Public API health check failed with ${response.status}.`)
  }

  return response.json()
}

async function checkServiceRole(url: string, serviceRoleKey: string) {
  const response = await withTimeout(
    fetch(`${url}/auth/v1/admin/users?page=1&per_page=1`, {
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
      },
    }),
    10_000,
    "Timed out while checking the Supabase service role key.",
  )

  if (!response.ok) {
    throw new Error(`Service role check failed with ${response.status}.`)
  }

  const payload = (await response.json()) as { users?: Array<unknown> }

  return payload.users?.length ?? 0
}

async function checkDatabase(databaseUrl: string) {
  const sql = postgres(databaseUrl, {
    max: 1,
    prepare: false,
    connect_timeout: 5,
    idle_timeout: 5,
  })

  try {
    const rows = await withTimeout(
      sql`select current_database() as database, current_user as user`,
      10_000,
      "Timed out while checking the Postgres connection.",
    )

    return rows[0] as { database: string; user: string }
  } finally {
    await sql.end({ timeout: 1 })
  }
}

async function main() {
  const url = requireEnv("NEXT_PUBLIC_SUPABASE_URL")
  const publishableKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!publishableKey) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY is not configured.",
    )
  }

  const serviceRoleKey = requireEnv("SUPABASE_SERVICE_ROLE_KEY")
  const databaseUrl = process.env.DIRECT_URL ?? requireEnv("DATABASE_URL")

  const health = await checkPublicApi(url, publishableKey)
  const usersChecked = await checkServiceRole(url, serviceRoleKey)
  const database = await checkDatabase(databaseUrl)

  console.log("Supabase checks passed.")
  console.log(`- Project URL: ${url}`)
  console.log(`- Auth health: ${JSON.stringify(health)}`)
  console.log(`- Service role: queried ${usersChecked} user(s)`)
  console.log(
    `- Database: connected to ${database.database} as ${database.user}`,
  )
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error))
  process.exit(1)
})
