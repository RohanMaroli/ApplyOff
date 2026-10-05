# Setup: Supabase + Google sign-in

Do this once to make login work (locally and on Vercel). ~20 minutes.

## 1. Create the Supabase project
1. Sign up at https://supabase.com → **New project** (free tier). Pick a region close to your users (e.g. Mumbai or Frankfurt). Save the database password somewhere safe.
2. **Project Settings → API**. Copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - Publishable key (or `anon` public key) → `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - Secret key (or `service_role` key) → `SUPABASE_SECRET_KEY` (**never share or commit this**)
3. In the project folder: `cp .env.example .env.local` and paste the values in.

## 2. Create the database table
**SQL Editor → New query**, paste the contents of `supabase/migrations/0001_profiles.sql`, click **Run**.
Check **Table Editor**: a `profiles` table should exist.

## 3. Auth URLs
**Authentication → URL Configuration**:
- **Site URL:** `http://localhost:3000` (change to your Vercel URL when you deploy)
- **Redirect URLs:** add
  - `http://localhost:3000/**`
  - `https://<your-vercel-app>.vercel.app/**` (once deployed)

## 4. Google OAuth
1. Go to https://console.cloud.google.com → create a project ("ApplyOff").
2. **APIs & Services → OAuth consent screen** (Google Auth Platform → Branding):
   - App name "ApplyOff", your support email, audience **External**.
   - Scopes: only `openid`, `email`, `profile` (the defaults). Don't add others.
   - While in "Testing" mode only test users you add can log in; click **Publish app** when you launch.
3. **Clients → Create client → Web application**:
   - **Authorised JavaScript origins:** `http://localhost:3000` (+ your Vercel URL later)
   - **Authorised redirect URI:** `https://<your-project-ref>.supabase.co/auth/v1/callback`
     (exactly as shown in Supabase → Authentication → Providers → Google)
4. Copy the **Client ID** and **Client secret**.
5. Supabase → **Authentication → Providers (Sign In / Providers) → Google** → enable, paste ID + secret, save.

## 5. Email sign-in settings
- **Authentication → Providers → Email:** enabled, "Confirm email" on.
- Same-email accounts are linked automatically: someone who signed up with email and later uses Google (same verified email) gets the same account.
- Supabase's built-in email sender is heavily rate-limited (a few emails/hour). Fine for testing; before launch, set up custom SMTP (e.g. Resend) under **Project Settings → Auth → SMTP**.

### Recommended: email links that work in any browser
By default, email links only work if opened in the same browser that requested them. To fix that, edit
**Authentication → Email Templates** and change the link in each template:

| Template | Link |
|---|---|
| Confirm signup | `{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email&next=/onboarding` |
| Reset password | `{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=recovery` |
| Change email address | `{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email_change&next=/settings` |

## 6. Run it
```bash
npm install
npm run dev
```
Open http://localhost:3000 → **Sign up** → **Continue with Google**. You should land on the welcome page, then the dashboard.

## 7. Make yourself an admin
After signing up: **Table Editor → profiles** → set your row's `role` to `admin`. (Users can't change this themselves.)

## 8. Deploy to Vercel
1. https://vercel.com → **Add New → Project** → import the GitHub repo.
2. Add the 4 environment variables from `.env.local`; set `NEXT_PUBLIC_SITE_URL` to the Vercel URL.
3. Deploy, then add the Vercel URL to Supabase (step 3) and Google (step 4.3).

## Troubleshooting
- **"redirect_uri_mismatch" from Google:** the redirect URI in Google Cloud must exactly match the one shown in Supabase's Google provider page.
- **Logged in with Google but sent back to /login:** the URL isn't in Supabase's Redirect URLs list (step 3).
- **No confirmation email:** check spam; you may have hit the built-in email rate limit.
- **"Couldn't delete your account":** `SUPABASE_SECRET_KEY` is missing or wrong.
