import type { Metadata } from "next";
import Link from "next/link";
import { Divider } from "@/components/auth/Divider";
import { EmailLoginForm } from "@/components/auth/EmailLoginForm";
import { GoogleButton } from "@/components/auth/GoogleButton";
import { FormAlert } from "@/components/FormAlert";

export const metadata: Metadata = { title: "Log in" };

type Props = { searchParams: Promise<{ next?: string; error?: string; message?: string }> };

export default async function LoginPage({ searchParams }: Props) {
  const { next, error, message } = await searchParams;

  return (
    <>
      <div className="space-y-1 text-center">
        <h1 className="text-2xl font-semibold text-zinc-900">Welcome back</h1>
        <p className="text-sm text-zinc-500">Log in to continue your applications.</p>
      </div>
      <FormAlert error={error} message={message} />
      <GoogleButton next={next} />
      <Divider label="or use email" />
      <EmailLoginForm next={next} />
      <p className="text-center text-sm text-zinc-600">
        New to ApplyOff?{" "}
        <Link href="/signup" className="font-medium text-indigo-600 hover:underline">
          Create an account
        </Link>
      </p>
    </>
  );
}
