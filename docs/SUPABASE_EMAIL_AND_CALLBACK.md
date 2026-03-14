# Fix verification email linking to localhost + callback errors

If the sign-up verification email sends you to **http://localhost:3000/auth/callback** (or the link expires with `otp_expired`), Supabase is still using **localhost** as your app URL. Fix it in the dashboard so emails and redirects use your **production Vercel URL**.

---

## 1. Set Site URL to production

Supabase uses **Site URL** when building links in emails (e.g. confirm signup). If it’s `http://localhost:3000`, the link in the email will point to localhost.

1. Open **[supabase.com/dashboard](https://supabase.com/dashboard)** → your project.
2. Go to **Authentication** → **URL Configuration**.
3. Set **Site URL** to your live app URL, with no trailing slash, e.g.:
   ```text
   https://your-project-name.vercel.app
   ```
4. Click **Save**.

New confirmation emails will use this URL in the link.

---

## 2. Add production redirect URLs

1. Same page: **Authentication** → **URL Configuration**.
2. Under **Redirect URLs**, add (replace with your real Vercel URL):
   ```text
   https://your-project-name.vercel.app/**
   https://your-project-name.vercel.app/auth/callback
   ```
3. Click **Save**.

---

## 3. Optional: turn off “Confirm email” for testing

If you want to sign up without clicking an email link while you test:

1. **Authentication** → **Providers** → **Email**.
2. Turn **off** “Confirm email” (or leave it on and use the production link from step 1).
3. Save.

With “Confirm email” off, new users can sign in right after sign-up without verifying. Turn it back on when you’re done testing.

---

## 4. After changing Site URL

- **Existing user:** If you already signed up and the old email link expired, either:
  - Sign in with email/password (if “Confirm email” is off), or  
  - Use **Authentication** → **Users** and confirm the user manually, or  
  - Sign up again with the same email after fixing the URL (new email will use the correct link).
- **New sign-ups:** Will get a confirmation email that points to `https://your-project-name.vercel.app/auth/callback?token=...` and should work.

---

## Summary

| Setting        | Where                         | Set to (example)                          |
|----------------|-------------------------------|-------------------------------------------|
| **Site URL**   | Auth → URL Configuration      | `https://your-app.vercel.app`             |
| **Redirect URLs** | Auth → URL Configuration  | `https://your-app.vercel.app/**` and `https://your-app.vercel.app/auth/callback` |

After this, verification emails will link to your Vercel app instead of localhost.
