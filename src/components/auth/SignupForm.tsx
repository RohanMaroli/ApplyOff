"use client";

import { useActionState } from "react";
import { signUpWithEmail } from "@/app/(auth)/actions";
import { Field } from "@/components/Field";
import { FormAlert } from "@/components/FormAlert";
import { SubmitButton } from "@/components/SubmitButton";

export function SignupForm() {
  const [state, formAction] = useActionState(signUpWithEmail, {});

  // After sign-up we only show the "check your email" message.
  if (state.message) return <FormAlert message={state.message} />;

  return (
    <form action={formAction} className="space-y-4">
      <Field label="Full name" name="full_name" autoComplete="name" required />
      <Field label="Email" name="email" type="email" autoComplete="email" required />
      <Field
        label="Password"
        name="password"
        type="password"
        autoComplete="new-password"
        minLength={8}
        hint="At least 8 characters."
        required
      />
      <FormAlert error={state.error} />
      <SubmitButton pendingText="Creating account…">Sign up with email</SubmitButton>
    </form>
  );
}
