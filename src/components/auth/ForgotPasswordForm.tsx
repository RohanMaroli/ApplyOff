"use client";

import { useActionState } from "react";
import { sendPasswordReset } from "@/app/(auth)/actions";
import { Field } from "@/components/Field";
import { FormAlert } from "@/components/FormAlert";
import { SubmitButton } from "@/components/SubmitButton";

export function ForgotPasswordForm() {
  const [state, formAction] = useActionState(sendPasswordReset, {});

  if (state.message) return <FormAlert message={state.message} />;

  return (
    <form action={formAction} className="space-y-4">
      <Field label="Email" name="email" type="email" autoComplete="email" required />
      <FormAlert error={state.error} />
      <SubmitButton pendingText="Sending…">Send reset link</SubmitButton>
    </form>
  );
}
