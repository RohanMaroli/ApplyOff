import type { Metadata } from "next";
import { signOut } from "@/app/(auth)/actions";
import { NewPasswordForm } from "@/components/auth/NewPasswordForm";
import { SubmitButton } from "@/components/SubmitButton";
import { requireUser } from "@/lib/auth";
import { DeleteAccountForm, EmailForm, NameForm } from "./SettingsForms";

export const metadata: Metadata = { title: "Settings" };

const PROVIDER_LABELS: Record<string, string> = { google: "Google", email: "Email & password" };

export default async function SettingsPage() {
  const { user, profile } = await requireUser();
  const providers = (user.identities ?? []).map((i) => i.provider);
  const hasPassword = providers.includes("email");

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-3xl font-semibold text-zinc-900">Account settings</h1>

      <Section title="Profile">
        <NameForm defaultName={profile?.full_name ?? ""} />
      </Section>

      <Section title="Sign-in methods" description="Ways you can log in to this account.">
        <ul className="flex flex-wrap gap-2">
          {providers.map((p) => (
            <li key={p} className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-sm text-zinc-700">
              {PROVIDER_LABELS[p] ?? p}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-zinc-500">
          Using Google with the same email as your email login opens this same account.
        </p>
      </Section>

      <Section title="Email">
        <EmailForm currentEmail={user.email ?? ""} />
      </Section>

      <Section
        title="Password"
        description={hasPassword ? undefined : "Optional: set a password to log in with email as well as Google."}
      >
        <NewPasswordForm submitLabel="Save password" />
      </Section>

      <Section title="Sessions">
        <div className="flex flex-col gap-3 sm:flex-row">
          <form action={signOut}>
            <SubmitButton variant="secondary" pendingText="Logging out…">Log out</SubmitButton>
          </form>
          <form action={signOut}>
            <input type="hidden" name="scope" value="global" />
            <SubmitButton variant="secondary" pendingText="Logging out…">Log out of all devices</SubmitButton>
          </form>
        </div>
      </Section>

      <Section title="Notifications" description="Deadline and LOR reminder settings are coming soon.">
        <p className="text-sm text-zinc-500">Nothing to configure yet.</p>
      </Section>

      <Section title="Your data" description="Download everything we store about you, or delete it all.">
        <a
          href="/settings/export"
          className="inline-flex rounded-lg border border-zinc-300 px-4 py-2.5 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
        >
          Export my data (JSON)
        </a>
        <div className="mt-6 border-t border-zinc-200 pt-6">
          <DeleteAccountForm />
        </div>
      </Section>
    </div>
  );
}

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-medium text-zinc-900">{title}</h2>
      {description && <p className="mt-1 text-sm text-zinc-500">{description}</p>}
      <div className="mt-4">{children}</div>
    </section>
  );
}
