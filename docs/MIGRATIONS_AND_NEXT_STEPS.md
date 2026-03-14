# Step-by-step: New migrations and next steps

Follow these in order.

---

## Part 1: Apply the new migrations in Supabase

**If your Supabase database is brand new**, you must run the **initial migration first** (`db/migrations/0000_clumsy_pandemic.sql`). It creates the base tables: `accounts`, `profiles`, `venues`, `account_memberships`, `contacts`, `event_workspaces`, `tasks`, `notes`, etc. Without it, onboarding and the app will fail with errors like “We could not read your account profile.”

- **First time setup:** Run `0000_clumsy_pandemic.sql` in the Supabase SQL Editor (copy the file from the repo), then run 0001, 0002, 0003 below.
- **Already have the base schema:** Run only the three new migrations (0001, 0002, 0003) in this order.

### Option A – Supabase Dashboard (recommended if you use the web UI)

1. **Open your project**
   - Go to [supabase.com/dashboard](https://supabase.com/dashboard) and open your project.

2. **Open the SQL Editor**
   - In the left sidebar: **SQL Editor** → **New query**.

3. **Run migration 0001 (proposals, contracts, payments)**
   - Open the file `db/migrations/0001_skinny_chat.sql` in your repo.
   - Copy its **entire contents**.
   - Paste into the Supabase SQL Editor.
   - Click **Run** (or press Cmd/Ctrl + Enter).
   - You should see a success message. If you get an error that a table already exists, that migration was already applied; you can skip to the next file.

4. **Run migration 0002 (timelines, BEO)**
   - Open `db/migrations/0002_timeline_beo.sql`.
   - Copy entire contents → paste into a **new** SQL Editor tab (or clear the previous query).
   - Click **Run**.

5. **Run migration 0003 (AI tables)**
   - Open `db/migrations/0003_ai_tables.sql`.
   - Copy entire contents → paste into a new query.
   - Click **Run**.

6. **Confirm tables exist**
   - In the left sidebar: **Table Editor**.
   - You should see (among others): `proposals`, `proposal_items`, `contracts`, `payment_milestones`, `timelines`, `timeline_items`, `beos`, `ai_runs`, `ai_artifacts`, `ai_summaries`, `ai_suggestions`.

---

### Option B – Command line (if you have `DATABASE_URL` or Supabase connection string)

1. **Set your database URL** in `.env.local` (or export it in the terminal):
   ```bash
   # Example (use your real project ref and password):
   export DATABASE_URL="postgresql://postgres.<project-ref>:<password>@aws-0-<region>.pooler.supabase.com:5432/postgres"
   ```

2. **Apply migrations in order** (each command runs one migration file):
   ```bash
   cd "/Users/spencerchurchill/Code/OpenVenue 3.0"
   psql "$DATABASE_URL" -f db/migrations/0001_skinny_chat.sql
   psql "$DATABASE_URL" -f db/migrations/0002_timeline_beo.sql
   psql "$DATABASE_URL" -f db/migrations/0003_ai_tables.sql
   ```
   If you don’t have `psql` installed, use Option A (Dashboard) instead.

3. **Optional: use Drizzle’s push (dev only)**  
   This syncs the schema from code to the DB without running migration files. Use only if you’re okay overwriting the DB to match the app:
   ```bash
   pnpm db:push
   ```
   For a shared or production DB, prefer running the three SQL files above.

---

## Part 2: Environment variables

Make sure these are set wherever you run or deploy the app (e.g. `.env.local` for local, Vercel project settings for production).

| Variable | Where to get it | Required for |
|----------|-----------------|---------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API → Project URL | App + auth |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` or `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Same page → anon public key | App + auth |
| `SUPABASE_SERVICE_ROLE_KEY` | Same page → service_role key (keep secret) | Server-only auth/admin |

For local dev, copy `.env.example` to `.env.local` and fill in these values.

---

## Part 3: Verify locally (optional but recommended)

1. **Install and run**
   ```bash
   nvm use
   pnpm install
   pnpm dev
   ```

2. **Quick checks**
   - Sign in and open the **Dashboard** (daily briefing and pipeline should load).
   - Open **Leads** → open a lead → in the workspace, open **Proposal**, **Payments & Contract**, **Timeline**, and **BEO** tabs. Adding a proposal item or timeline item should work if migrations and env are correct.

3. **Typecheck** (after freeing disk space if you hit “no space left” before):
   ```bash
   pnpm typecheck
   ```

4. **Tests**
   ```bash
   pnpm test
   ```

---

## Part 4: Deploy to Vercel (when ready)

1. **Push your code** to GitHub (or your connected Git provider).

2. **In Vercel**
   - Add New Project → import this repo.
   - Add the three env vars from Part 2 (Production and Preview if you want).

3. **Deploy**
   - Vercel will run `pnpm build`. After deploy, open your app URL.

4. **Supabase Auth redirect**
   - Supabase Dashboard → **Authentication** → **URL Configuration**.
   - Set **Site URL** to your Vercel URL (e.g. `https://your-app.vercel.app`).
   - In **Redirect URLs**, add:
     - `https://your-app.vercel.app/**`
     - `https://your-app.vercel.app/auth/callback`

More detail: `docs/deployment.md`.

---

## Summary checklist

- [ ] Run `0001_skinny_chat.sql` in Supabase (SQL Editor or `psql`).
- [ ] Run `0002_timeline_beo.sql` in Supabase.
- [ ] Run `0003_ai_tables.sql` in Supabase.
- [ ] Confirm new tables exist in Table Editor (or no errors when running the app).
- [ ] Set `NEXT_PUBLIC_SUPABASE_URL`, anon key, and `SUPABASE_SERVICE_ROLE_KEY` in `.env.local` and (for deploy) in Vercel.
- [ ] Optional: run `pnpm dev`, click through Dashboard and a workspace (Proposal, Timeline, etc.), then `pnpm typecheck` and `pnpm test`.
- [ ] When ready: connect repo to Vercel, add env vars, deploy, then set Site URL and Redirect URLs in Supabase Auth.
