# Supabase Setup Notes

This repo now has a durable non-MCP Supabase setup path:

- direct app/runtime access through `.env.local`
- Supabase CLI access through `supabase login` and `supabase link`
- a local verification script through `pnpm supabase:check`

## Required Environment Variables

Add these values to `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_PROJECT_REF=
SUPABASE_DB_PASSWORD=
DATABASE_URL=
DIRECT_URL=
```

`NEXT_PUBLIC_SUPABASE_ANON_KEY` is still accepted as a fallback during setup, but the preferred public key variable is `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.

## Connection Strategy

Supabase direct Postgres hosts use IPv6. On machines or networks without reliable IPv6 support, the safer default is the Supabase pooler.

Recommended for local app runtime and other persistent IPv4-safe environments:

```bash
DATABASE_URL=postgresql://postgres.<project-ref>:<db-password>@aws-0-<region>.pooler.supabase.com:5432/postgres
```

Recommended for `DIRECT_URL`:

- use the direct connection string if your machine supports IPv6
- otherwise reuse the same session pooler string from `DATABASE_URL`

For this repo, the CLI-verified project is `qfluveolehhxwdrzeftc` in `us-west-2`, so the session pooler host pattern is:

```bash
aws-0-us-west-2.pooler.supabase.com
```

## CLI Workflow

Login once:

```bash
supabase login
```

If the browser flow is flaky, use a personal access token instead:

```bash
supabase login --token '<your-token>'
```

Link the repo to the hosted project:

```bash
supabase link --project-ref "$SUPABASE_PROJECT_REF" --password "$SUPABASE_DB_PASSWORD"
```

This stores the working project link in the local `supabase/.temp` folder so future CLI commands target the right project.

## Verification

Run:

```bash
pnpm supabase:check
```

This verifies:

- the public Supabase URL is reachable
- the service role key can query the auth admin API
- the configured Postgres connection string can connect successfully

## Runtime Helpers

The following files power the app-side integration:

- `lib/supabase/client.ts`
- `lib/supabase/server.ts`
- `lib/supabase/admin.ts`
- `lib/supabase/proxy.ts`

## What The Proxy Does

- refreshes Supabase auth cookies during requests
- keeps session state aligned between browser and server
- redirects protected app paths to `/sign-in` when there is no authenticated user

Protected paths currently include:

- `/dashboard`
- `/leads`
- `/workspace`
- `/calendar`
- `/tasks`
- `/reports`
- `/settings`
