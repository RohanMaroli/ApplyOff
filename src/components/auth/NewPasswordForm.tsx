"use client";

import { useActionState } from "react";
import { updatePassword } from "@/app/(auth)/actions";
import { Field } from "@/components/Field";
import { FormAlert } from "@/components/FormAlert";
import { SubmitButton } from "@/components/SubmitButton";

export function NewPasswordForm({ submitLabel = "Save new password" }: { submitLabel?: string }) {
  const [state, formAction] = useActionState(updatePassword, {});

  return (
    <form action={formAction} className="space-y-4">
      <Field
        label="New password"
        name="password"
        type="password"
        autoComplete="new-password"
        minLength={8}
        hint="At least 8 characters."
        required
      />
      <Field label="Confirm new password" name="confirm" type="password" autoComplete="new-password" required />
      <FormAlert error={state.error} />
      <SubmitButton pendingText="Saving…">{submitLabel}</SubmitButton>
    </form>
  );
}
