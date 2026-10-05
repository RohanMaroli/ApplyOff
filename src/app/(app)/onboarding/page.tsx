import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { OnboardingForm } from "./OnboardingForm";

export const metadata: Metadata = { title: "Welcome" };

const NEXT_STEPS = [
  { title: "Build your profile", text: "Your degree, grades (even if not final yet), tests and experience." },
  { title: "Shortlist programs", text: "Find master's programs in Germany and the USA that fit you." },
  { title: "Track every application", text: "Deadlines, checklists and documents in one place." },
];

// Shown once, right after sign-up.
export default async function OnboardingPage() {
  const { user, profile } = await requireUser();
  if (profile?.onboarded_at) redirect("/dashboard");

  const defaultName = profile?.full_name ?? user.user_metadata?.full_name ?? "";

  return (
    <div className="mx-auto max-w-lg space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-semibold text-zinc-900">Welcome to ApplyOff 👋</h1>
        <p className="text-zinc-600">Here&apos;s how we&apos;ll get you from &quot;where do I start?&quot; to an admit.</p>
      </div>

      <ol className="space-y-3">
        {NEXT_STEPS.map((step, i) => (
          <li key={step.title} className="flex gap-3 rounded-xl border border-zinc-200 bg-white p-4">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700">
              {i + 1}
            </span>
            <div>
              <p className="font-medium text-zinc-900">{step.title}</p>
              <p className="text-sm text-zinc-600">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <OnboardingForm defaultName={defaultName} />
      </div>
    </div>
  );
}
