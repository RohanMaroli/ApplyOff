# ApplyOff

An all-in-one hub for students applying to master's programs abroad (starting with Germany and the USA).

- **What we're building:** [`docs/REQUIREMENTS.md`](docs/REQUIREMENTS.md)
- **How to build it, step by step:** [`docs/BUILD_GUIDE.md`](docs/BUILD_GUIDE.md)

## Run it locally

First-time setup (Supabase + Google sign-in): [`docs/SETUP_SUPABASE.md`](docs/SETUP_SUPABASE.md)

```bash
npm install      # once, installs dependencies
cp .env.example .env.local   # then fill in your Supabase keys
npm run dev      # starts the site at http://localhost:3000
```

Other commands: `npm run build` (production build), `npm run lint` (check code style/errors).

## Tech stack

Next.js (React + TypeScript) · Tailwind CSS · Supabase (database, auth, storage) · Vercel (hosting)

## Status

- [x] **M1 Accounts & login**: Google sign-in, email sign-up/login, email verification, password reset, onboarding, protected pages, settings (name, email, password, log out everywhere), data export, account deletion
- [ ] M2 Profile
- [ ] M4 Program database
- [ ] M5 Application tracker
- [ ] M6 Documents
