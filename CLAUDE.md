@AGENTS.md

# ApplyOff

- The owner wants features built for them (they're learning separately), so build modules end to end. Keep code readable with short comments explaining the why, so they can follow it.
- Plan: `docs/REQUIREMENTS.md`. Step-by-step tasks: `docs/BUILD_GUIDE.md`.
- Stack: Next.js (App Router, TypeScript, `src/`), Tailwind CSS, Supabase, Vercel.
- Check changes with `npm run lint` and `npm run build`.
- Auth: Supabase via `@supabase/ssr`. Clients in `src/lib/supabase/`, session refresh in `src/proxy.ts` (Next 16's renamed middleware), helpers in `src/lib/auth.ts`. Database changes go in `supabase/migrations/` as numbered SQL files with RLS enabled. Setup steps: `docs/SETUP_SUPABASE.md`.
