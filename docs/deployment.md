# OpenVenue Deployment (Vercel)

This app is ready to deploy to [Vercel](https://vercel.com) with the Next.js App Router.

## Prerequisites

- A [Vercel](https://vercel.com) account
- A [Supabase](https://supabase.com) project (for auth and database)
- Node.js 20 LTS (see `.nvmrc`)

## Environment variables

Configure these in your Vercel project (Settings → Environment Variables):

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-only; keep secret) |

Optional:

- `SENTRY_DSN` – for error tracking
- `RESEND_API_KEY` – for transactional email (e.g. password reset)

## Database migrations

Run migrations against your Supabase Postgres **before** or **at** first deploy:

1. **Option A – Drizzle push (dev/staging)**  
   `pnpm db:push` (uses `DATABASE_URL` or Supabase connection string)

2. **Option B – SQL migrations**  
   Apply the files in `db/migrations/` in order (e.g. via Supabase SQL editor or migration runner).

Ensure the schema matches what the app expects (accounts, profiles, event_workspaces, tasks, notes, proposals, etc.).

## Deploy to Vercel

1. Push the repo to GitHub (or connect another Git provider in Vercel).
2. In Vercel: **Add New Project** → import the repository.
3. Framework preset: **Next.js** (auto-detected).
4. Set the environment variables above for Production (and Preview if desired).
5. Deploy. Vercel will run `pnpm build` (install + build).

## Post-deploy

- Point your custom domain in Vercel if needed.
- In Supabase Auth → URL Configuration, set **Site URL** and **Redirect URLs** to your Vercel URL (e.g. `https://your-app.vercel.app`).
- Run seed data in a one-off script or via Supabase SQL if you need demo data: `pnpm db:seed` (with `DATABASE_URL` set).

## Build and run locally

```bash
nvm use
pnpm install
pnpm build
pnpm start
```

For local dev with Supabase:

```bash
cp .env.example .env.local
# Edit .env.local with your Supabase URL and keys
pnpm dev
```
