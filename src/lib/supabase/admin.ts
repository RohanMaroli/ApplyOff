import "server-only";
import { createClient } from "@supabase/supabase-js";

// Admin client using the secret key. Bypasses row-level security:
// only use it on the server for things users can't do themselves (e.g. deleting their auth account).
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
}
