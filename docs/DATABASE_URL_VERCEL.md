# Fixing DATABASE_URL on Vercel (Supabase)

If onboarding fails with "We could not read your account profile" or the app can’t reach the database, the cause is usually **DATABASE_URL** on Vercel. Use this checklist.

---

## 1. Get the correct connection string from Supabase

1. Open **[supabase.com/dashboard](https://supabase.com/dashboard)** and select your project.
2. Go to **Project Settings** (gear in the sidebar) → **Database**.
3. Scroll to **Connection string**.
4. Choose **URI**.
5. Use the **Connection pooling** tab (not “Direct connection”).  
   - **Mode:** Session.  
   - Copy the URI. It will look like:
     ```text
     postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres
     ```
6. Replace **`[YOUR-PASSWORD]`** with your **database password** (the one you set when creating the project).  
   - Forgot it? Same **Database** settings page → **Database password** → **Reset database password**.
7. If your password contains **special characters** (`@`, `#`, `%`, `/`, `?`, etc.), **URL-encode** them in the URI:
   - `@` → `%40`
   - `#` → `%23`
   - `%` → `%25`
   - `/` → `%2F`
   - Or use Supabase’s **Connection string** copy and only replace the placeholder; some UIs insert the password for you.

---

## 2. Set DATABASE_URL on Vercel

1. Go to **[vercel.com](https://vercel.com)** → your project → **Settings** → **Environment Variables**.
2. Find **DATABASE_URL** (or add it):
   - **Key:** `DATABASE_URL`
   - **Value:** the full URI from step 1 (with your real password, and special characters encoded if needed).
   - **Environments:** at least **Production**. Add **Preview** if you use preview deployments.
3. Save.
4. **Redeploy** so the new value is used: **Deployments** → … on the latest deployment → **Redeploy**.

---

## 3. Checklist

- [ ] Using the **pooler** URI (`pooler.supabase.com:5432`), not the direct connection.
- [ ] Password in the URI is correct (no typo, no leftover `[YOUR-PASSWORD]`).
- [ ] Special characters in the password are URL-encoded in the URI.
- [ ] **DATABASE_URL** is set for **Production** (and Preview if needed).
- [ ] You **redeployed** after changing the variable.

---

## 4. Optional: require SSL

If you still get connection errors, add SSL to the URI by appending (use `?` if there are no query params yet, otherwise `&`):

```text
?sslmode=require
```

Example:

```text
postgresql://postgres.xxxxx:password@aws-0-us-west-2.pooler.supabase.com:5432/postgres?sslmode=require
```

Then update **DATABASE_URL** on Vercel with this value and redeploy.

---

## 5. If you see "Failed query" (connection / pooler)

The error may look like: `Failed query: select ... from "profiles" where ...` or `... from "accounts" where ...`.

**Use Session mode (port 5432), not Transaction mode.**  
Onboarding runs several queries in one request (profile lookup, then account slug check, then a big insert). Supabase’s **Transaction** pooler (port 6543) returns the connection after each query, so the next query can fail with "Failed query". The **Session** pooler (port **5432**) keeps the same connection for the whole request.

1. In Supabase **Project Settings → Database → Connection string**, choose the **Session** pooler URI (port **5432**), not Transaction (6543).
2. Copy the URI, replace `[YOUR-PASSWORD]` with your database password.
3. Set that as **DATABASE_URL** in Vercel (Production, and Preview if you use it).
4. Redeploy, then try onboarding again.

The host should be `aws-0-[region].pooler.supabase.com` (with **pooler** in the name).

---

## 6. Verify from Vercel (optional)

After redeploying, run through **onboarding** again. If it still fails, check:

- **Vercel** → your project → **Deployments** → latest → **Functions** or **Logs** for runtime errors mentioning the database or connection.
- That **DATABASE_URL** is the one from **Project Settings → Database → Connection string (URI)** with the pooler and your actual password.
