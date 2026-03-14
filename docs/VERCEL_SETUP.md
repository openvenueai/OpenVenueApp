# Vercel setup – step-by-step

Follow these steps in order. You’ll connect your repo to Vercel, set environment variables, deploy, then configure Supabase so sign-in and redirects work.

---

## Before you start

- [ ] Your OpenVenue code is pushed to **GitHub** (or GitLab/Bitbucket – Vercel supports all three).
- [ ] **Supabase** migrations are already applied (you should see tables like `accounts`, `event_workspaces`, `proposals`, etc.).
- [ ] You have a **Vercel account** at [vercel.com](https://vercel.com) (sign up with GitHub if you haven’t).

---

## Step 1: Import the project in Vercel

1. Go to [vercel.com/new](https://vercel.com/new) (or click **Add New…** → **Project** in the dashboard).
2. **Import Git Repository**
   - If your GitHub account isn’t connected, click **Connect Git Repository** and authorize Vercel for GitHub.
   - Find your **OpenVenue repo** in the list and click **Import** next to it.
3. You’ll land on the **Configure Project** page. **Don’t click Deploy yet** – we’ll add environment variables first in Step 2.

---

## Step 2: Set environment variables

Your app needs these variables in production. Add them **before** the first deploy.

### Where to add them

On the Configure Project page, open the **Environment Variables** section.  
For each variable below:

- **Key:** use the exact name (e.g. `NEXT_PUBLIC_SUPABASE_URL`).
- **Value:** paste the value (no quotes).
- **Environment:** leave **Production** checked; you can also check **Preview** if you want the same values for preview deployments.

Add these **four** variables:

---

### 1) `NEXT_PUBLIC_SUPABASE_URL`

- **What it is:** Your Supabase project URL.
- **Where to get it:**
  1. Open [supabase.com/dashboard](https://supabase.com/dashboard) and select your project.
  2. Go to **Project Settings** (gear icon in the sidebar).
  3. Click **API** in the left menu.
  4. Under **Project URL**, copy the URL (e.g. `https://xxxxx.supabase.co`).
- Paste that URL as the value for `NEXT_PUBLIC_SUPABASE_URL`.

---

### 2) `NEXT_PUBLIC_SUPABASE_ANON_KEY`

- **What it is:** Supabase anonymous (public) key for browser/client auth.
- **Where to get it:**
  1. Same Supabase **Project Settings → API** page.
  2. Under **Project API keys**, find **anon** /**public**.
  3. Click **Reveal** and copy the long key.
- Paste that key as the value for `NEXT_PUBLIC_SUPABASE_ANON_KEY`.  
  (The app also accepts `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` if you prefer that name; use one or the other.)

---

### 3) `SUPABASE_SERVICE_ROLE_KEY`

- **What it is:** Supabase service role key – **server-only**, never exposed to the browser. Used for admin/auth operations on the server.
- **Where to get it:**
  1. Same **Project Settings → API** page.
  2. Under **Project API keys**, find **service_role**.
  3. Click **Reveal** and copy the key.
- Paste it as the value for `SUPABASE_SERVICE_ROLE_KEY`.  
- **Important:** Do not use this key in client-side code or expose it publicly.

---

### 4) `DATABASE_URL`

- **What it is:** PostgreSQL connection string so the Next.js server (Drizzle) can read/write your Supabase database.
- **Where to get it:**
  1. In Supabase, go to **Project Settings → Database**.
  2. Scroll to **Connection string**.
  3. Choose **URI** and copy the connection string.
  4. Replace the placeholder `[YOUR-PASSWORD]` with your **database password** (the one you set when creating the project, or reset it under **Database → Database password**).
  5. For Vercel, use the **Connection pooling** string if you see it (often on port **5432** with **Session mode**). It looks like:
     ```text
     postgresql://postgres.[project-ref]:[YOUR-PASSWORD]@aws-0-[region].pooler.supabase.com:5432/postgres
     ```
- Paste the **full URI with your real password** as the value for `DATABASE_URL`.

---

### Optional variables (you can add these later)

| Variable             | Purpose                                      |
|---------------------|----------------------------------------------|
| `NEXT_PUBLIC_APP_URL` | Full app URL (e.g. `https://your-app.vercel.app`) for links/emails. If unset, the app falls back to `http://localhost:3000` in dev. |
| `SENTRY_DSN`        | Error tracking with Sentry                   |
| `RESEND_API_KEY`    | Transactional email (e.g. password reset)    |

---

After adding the four required variables, the **Environment Variables** section should list:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `DATABASE_URL`

---

## Step 3: Build settings (optional check)

Vercel usually auto-detects:

- **Framework Preset:** Next.js
- **Build Command:** `pnpm run build` or `next build` (from your `package.json`)
- **Output Directory:** (default for Next.js)
- **Install Command:** `pnpm install` (because it sees `pnpm-lock.yaml`)

You can leave these as-is. If your repo has a **Node version** requirement (e.g. `.nvmrc` with `20`), Vercel will typically use it. To force Node 20:

1. In the Configure Project page, open **Build and Development Settings**.
2. Set **Node.js Version** to **20.x** if the dropdown is available.

Then click **Deploy**.

---

## Step 4: Deploy

1. Click **Deploy** at the bottom of the Configure Project page.
2. Vercel will clone the repo, run `pnpm install` and `pnpm run build`, and deploy.
3. Wait for the build to finish. If it succeeds, you’ll see a **Visit** link (e.g. `https://your-project.vercel.app`).
4. If the build fails, open the **Build Logs** and fix the reported error (often a missing env var or TypeScript error).

---

## Step 5: Configure Supabase Auth for your Vercel URL

Until you do this, sign-in and redirects may fail or redirect to the wrong place.

1. In **Supabase Dashboard**, select your project.
2. Go to **Authentication** → **URL Configuration** (in the left sidebar).
3. Set **Site URL** to your Vercel URL, e.g.:
   ```text
   https://your-project.vercel.app
   ```
   (Use the exact URL Vercel gave you, with no trailing slash.)
4. Under **Redirect URLs**, add these two lines (replace with your real Vercel URL):
   ```text
   https://your-project.vercel.app/**
   https://your-project.vercel.app/auth/callback
   ```
   Click **Save**.
5. If you use **Email** auth, in **Authentication → Providers → Email** ensure **Confirm email** is configured as you want (e.g. off for testing).

---

## Step 6: Verify the deployment

1. Open your Vercel URL (e.g. `https://your-project.vercel.app`).
2. You should see the OpenVenue landing/marketing page.
3. Go to **Sign in** (or **Sign up**).
4. Sign up or sign in with email (and password) or another provider you enabled.
5. After auth, you should be redirected into the app (e.g. onboarding or dashboard).
6. Try opening **Dashboard**, **Leads**, and a **workspace**; confirm data loads and no redirect/auth errors.

If you see “Supabase is not configured” or database errors, double-check that all four env vars are set in Vercel and that **Redeploy** (after changing env vars) was done.

---

## Step 7: (Optional) Custom domain and production URL

- **Custom domain:** In Vercel, go to your project → **Settings → Domains**, add your domain, and follow the DNS instructions. After it’s active, set that as **Site URL** and add it to **Redirect URLs** in Supabase (e.g. `https://yourdomain.com/**` and `https://yourdomain.com/auth/callback`).
- **Production URL:** If you set `NEXT_PUBLIC_APP_URL`, set it to your final production URL (e.g. your custom domain or the main Vercel URL you use in production).

---

## Checklist summary

- [ ] Repo pushed to GitHub (or connected Git provider).
- [ ] New project created in Vercel and repo imported.
- [ ] `NEXT_PUBLIC_SUPABASE_URL` set in Vercel.
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` set in Vercel.
- [ ] `SUPABASE_SERVICE_ROLE_KEY` set in Vercel.
- [ ] `DATABASE_URL` set in Vercel (with real DB password).
- [ ] First deploy completed successfully.
- [ ] Supabase **Site URL** set to your Vercel URL.
- [ ] Supabase **Redirect URLs** include `https://your-app.vercel.app/**` and `https://your-app.vercel.app/auth/callback`.
- [ ] Sign-in and app navigation tested in the browser.

---

## Changing env vars later

1. Vercel project → **Settings** → **Environment Variables**.
2. Edit or add variables, then save.
3. Go to **Deployments**, open the **...** on the latest deployment, and click **Redeploy** so the new values are used.

---

## Troubleshooting

| Problem | What to check |
|--------|----------------|
| Build fails on “DATABASE_URL is not configured” | Add `DATABASE_URL` in Vercel and redeploy. |
| “Supabase is not configured” in the app | Ensure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set and redeploy. |
| Redirect loop or wrong redirect after login | Supabase **Site URL** and **Redirect URLs** must match your Vercel (or custom) URL exactly. |
| 500 or “could not connect to database” | `DATABASE_URL` must be correct (password, host, port). Use the Supabase **Connection pooling** URI if available. |
| Preview deployments fail | Add the same env vars to **Preview** in Environment Variables, or use Vercel’s “Preview” env scope. |

For more context, see `docs/deployment.md`.
