import "server-only";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type FormState = { error?: string; message?: string };

export function siteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

// Only allow redirects to paths on our own site (blocks "//evil.com" style open redirects).
export function safeNext(next: FormDataEntryValue | string | null | undefined, fallback = "/dashboard") {
  if (typeof next !== "string" || !next.startsWith("/") || next.startsWith("//")) return fallback;
  return next;
}

// For pages that need a logged-in user. The proxy already redirects, this is the real check.
export async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, avatar_url, role, onboarded_at")
    .eq("id", user.id)
    .single();

  return { supabase, user, profile };
}

// Turn Supabase error messages into something friendlier.
export function friendlyAuthError(message: string) {
  const m = message.toLowerCase();
  if (m.includes("invalid login credentials")) return "Wrong email or password.";
  if (m.includes("email not confirmed")) return "Please confirm your email first — check your inbox.";
  if (m.includes("user already registered")) return "An account with this email already exists. Try logging in.";
  if (m.includes("password should be")) return "Password must be at least 8 characters.";
  if (m.includes("rate limit") || m.includes("too many")) return "Too many attempts. Please wait a minute and try again.";
  if (m.includes("same_password") || m.includes("different from the old")) return "New password must be different from the old one.";
  return message;
}
