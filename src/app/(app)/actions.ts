"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { friendlyAuthError, requireUser, siteUrl, type FormState } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";

export async function completeOnboarding(_prev: FormState, formData: FormData): Promise<FormState> {
  const fullName = String(formData.get("full_name") ?? "").trim();
  if (!fullName) return { error: "Please enter your name." };

  const { supabase, user } = await requireUser();
  const { error } = await supabase
    .from("profiles")
    .update({ full_name: fullName, onboarded_at: new Date().toISOString() })
    .eq("id", user.id);
  if (error) return { error: "Couldn't save. Please try again." };

  redirect("/dashboard");
}

export async function updateName(_prev: FormState, formData: FormData): Promise<FormState> {
  const fullName = String(formData.get("full_name") ?? "").trim();
  if (!fullName) return { error: "Name can't be empty." };

  const { supabase, user } = await requireUser();
  const { error } = await supabase.from("profiles").update({ full_name: fullName }).eq("id", user.id);
  if (error) return { error: "Couldn't save. Please try again." };

  revalidatePath("/", "layout");
  return { message: "Name updated." };
}

export async function updateEmail(_prev: FormState, formData: FormData): Promise<FormState> {
  const email = String(formData.get("email") ?? "").trim();
  const { supabase, user } = await requireUser();
  if (!email) return { error: "Enter an email." };
  if (email === user.email) return { error: "That's already your email." };

  const { error } = await supabase.auth.updateUser(
    { email },
    { emailRedirectTo: `${siteUrl()}/auth/callback?next=/settings` },
  );
  if (error) return { error: friendlyAuthError(error.message) };

  return { message: `Check ${email} (and your current inbox) for a link to confirm the change.` };
}

export async function deleteAccount(_prev: FormState, formData: FormData): Promise<FormState> {
  if (formData.get("confirm") !== "DELETE") return { error: 'Type DELETE to confirm.' };

  const { supabase, user } = await requireUser();

  // Deleting the auth user also deletes their profile (and later their data) via "on delete cascade".
  const admin = createAdminClient();
  const { error } = await admin.auth.admin.deleteUser(user.id);
  if (error) return { error: "Couldn't delete your account. Please try again or contact us." };

  // Clear this browser's login cookies (the user no longer exists on the server).
  await supabase.auth.signOut({ scope: "local" });
  redirect("/?message=" + encodeURIComponent("Your account and data have been deleted."));
}
