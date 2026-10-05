"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signInWithEmail } from "@/app/(auth)/actions";
import { Field } from "@/components/Field";
import { FormAlert } from "@/components/FormAlert";
import { SubmitButton } from "@/components/SubmitButton";

export function EmailLoginForm({ next }: { next?: string }) {
  const [state, formAction] = useActionState(signInWithEmail, {});

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="next" value={next ?? "/dashboard"} />
      <Field label="Email" name="email" type="email" autoComplete="email" required />
      <Field label="Password" name="password" type="password" autoComplete="current-password" required />
      <div className="text-right">
        <Link href="/forgot-password" className="text-sm text-indigo-600 hover:underline">
          Forgot password?
        </Link>
      </div>
      <FormAlert error={state.error} message={state.message} />
      <SubmitButton pendingText="Logging in…">Log in with email</SubmitButton>
    </form>
  );
}
