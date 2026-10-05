import type { Metadata } from "next";
import { NewPasswordForm } from "@/components/auth/NewPasswordForm";
import { requireUser } from "@/lib/auth";

export const metadata: Metadata = { title: "Set a new password" };

// Reached from the reset email: /auth/callback logs the user in, then sends them here.
export default async function ResetPasswordPage() {
  await requireUser();

  return (
    <>
      <div className="space-y-1 text-center">
        <h1 className="text-2xl font-semibold text-zinc-900">Set a new password</h1>
      </div>
      <NewPasswordForm />
    </>
  );
}
