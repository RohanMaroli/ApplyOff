import Link from "next/link";
import { FormAlert } from "@/components/FormAlert";

const STEPS = [
  { title: "Build your profile", text: "Grades (even unfinished ones), tests and experience, entered once." },
  { title: "Shortlist programs", text: "Germany and USA master's programs with real requirements and deadlines." },
  { title: "Prepare", text: "A roadmap, test prep plans, and help with your SOP, CV and LORs." },
  { title: "Track and get admitted", text: "Every deadline, checklist and document in one place." },
];

type Props = { searchParams: Promise<{ message?: string }> };

export default async function Home({ searchParams }: Props) {
  const { message } = await searchParams;

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
      {message && (
        <div className="mx-auto mb-8 max-w-xl">
          <FormAlert message={message} />
        </div>
      )}

      <section className="mx-auto max-w-3xl space-y-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
          Your master&apos;s abroad, from &quot;where do I start?&quot; to admit.
        </h1>
        <p className="text-lg text-zinc-600">
          ApplyOff is the free, all-in-one hub for applying to master&apos;s programs in Germany and the USA.
        </p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/signup" className="rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white hover:bg-indigo-700">
            Get started — it&apos;s free
          </Link>
          <Link href="/login" className="rounded-lg border border-zinc-300 bg-white px-6 py-3 font-medium text-zinc-900 hover:bg-zinc-50">
            Log in
          </Link>
        </div>
      </section>

      <section className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, i) => (
          <div key={step.title} className="rounded-xl border border-zinc-200 bg-white p-5">
            <span className="text-sm font-semibold text-indigo-600">Step {i + 1}</span>
            <h2 className="mt-1 font-medium text-zinc-900">{step.title}</h2>
            <p className="mt-1 text-sm text-zinc-600">{step.text}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
