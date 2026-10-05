import type { Metadata } from "next";
import Link from "next/link";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

export const metadata: Metadata = { title: "Forgot password" };

export default function ForgotPasswordPage() {
  return (
    <>
      <div className="space-y-1 text-center">
        <h1 className="text-2xl font-semibold text-zinc-900">Reset your password</h1>
        <p className="text-sm text-zinc-500">We&apos;ll email you a link to set a new one.</p>
      </div>
      <ForgotPasswordForm />
      <p className="text-center text-sm text-zinc-600">
        <Link href="/login" className="font-medium text-indigo-600 hover:underline">
          Back to log in
        </Link>
      </p>
    </>
  );
}
