"use client";

import { useActionState } from "react";
import { deleteAccount, updateEmail, updateName } from "@/app/(app)/actions";
import { Field } from "@/components/Field";
import { FormAlert } from "@/components/FormAlert";
import { SubmitButton } from "@/components/SubmitButton";

export function NameForm({ defaultName }: { defaultName: string }) {
  const [state, formAction] = useActionState(updateName, {});
  return (
    <form action={formAction} className="space-y-4">
      <Field label="Full name" name="full_name" defaultValue={defaultName} autoComplete="name" required />
      <FormAlert error={state.error} message={state.message} />
      <SubmitButton pendingText="Saving…" className="sm:w-auto">Save name</SubmitButton>
    </form>
  );
}

export function EmailForm({ currentEmail }: { currentEmail: string }) {
  const [state, formAction] = useActionState(updateEmail, {});
  return (
    <form action={formAction} className="space-y-4">
      <Field label="Email" name="email" type="email" defaultValue={currentEmail} autoComplete="email" required />
      <FormAlert error={state.error} message={state.message} />
      <SubmitButton pendingText="Sending…" className="sm:w-auto">Change email</SubmitButton>
    </form>
  );
}

export function DeleteAccountForm() {
  const [state, formAction] = useActionState(deleteAccount, {});
  return (
    <form action={formAction} className="space-y-4">
      <Field
        label='Type "DELETE" to permanently delete your account and all your data'
        name="confirm"
        autoComplete="off"
        required
      />
      <FormAlert error={state.error} />
      <SubmitButton variant="danger" pendingText="Deleting…" className="sm:w-auto">Delete my account</SubmitButton>
    </form>
  );
}
