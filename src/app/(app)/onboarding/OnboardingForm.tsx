"use client";

import { useActionState } from "react";
import { completeOnboarding } from "@/app/(app)/actions";
import { Field } from "@/components/Field";
import { FormAlert } from "@/components/FormAlert";
import { SubmitButton } from "@/components/SubmitButton";

export function OnboardingForm({ defaultName }: { defaultName: string }) {
  const [state, formAction] = useActionState(completeOnboarding, {});

  return (
    <form action={formAction} className="space-y-4">
      <Field label="What should we call you?" name="full_name" defaultValue={defaultName} autoComplete="name" required />
      <FormAlert error={state.error} />
      <SubmitButton pendingText="Saving…">Continue to my dashboard</SubmitButton>
    </form>
  );
}
