import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { FormAlert } from "@/components/FormAlert";
import { requireUser } from "@/lib/auth";

export const metadata: Metadata = { title: "Dashboard" };

// Placeholders for the modules we build next (see docs/REQUIREMENTS.md).
const COMING_UP = [
  { title: "Profile", text: "Academics, test scores and experience.", module: "M2" },
  { title: "Programs", text: "Search programs in Germany and the USA.", module: "M4" },
  { title: "Applications", text: "Deadlines, status and checklists.", module: "M5" },
  { title: "Documents", text: "SOPs, CVs and transcripts with versions.", module: "M6" },
];

type Props = { searchParams: Promise<{ message?: string }> };

export default async function DashboardPage({ searchParams }: Props) {
  const { profile } = await requireUser();
  if (!profile?.onboarded_at) redirect("/onboarding");
  const { message } = await searchParams;

  const firstName = profile.full_name?.split(" ")[0] ?? "there";

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold text-zinc-900">Hi {firstName}!</h1>
        <p className="text-zinc-600">This is your home base. More tools are on the way.</p>
      </div>
      <FormAlert message={message} />
      <div className="grid gap-4 sm:grid-cols-2">
        {COMING_UP.map((item) => (
          <div key={item.title} className="rounded-xl border border-dashed border-zinc-300 bg-white p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-medium text-zinc-900">{item.title}</h2>
              <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-500">Coming soon</span>
            </div>
            <p className="mt-1 text-sm text-zinc-600">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
