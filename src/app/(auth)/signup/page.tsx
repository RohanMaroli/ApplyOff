import type { Metadata } from "next";
import Link from "next/link";
import { Divider } from "@/components/auth/Divider";
import { GoogleButton } from "@/components/auth/GoogleButton";
import { SignupForm } from "@/components/auth/SignupForm";

export const metadata: Metadata = { title: "Sign up" };

export default function SignupPage() {
  return (
    <>
      <div className="space-y-1 text-center">
        <h1 className="text-2xl font-semibold text-zinc-900">Create your account</h1>
        <p className="text-sm text-zinc-500">Free. Your roadmap to a master&apos;s abroad starts here.</p>
      </div>
      <GoogleButton next="/onboarding" />
      <Divider label="or use email" />
      <SignupForm />
      <p className="text-center text-xs text-zinc-500">
        Google sign-in only shares your name, email and profile photo with ApplyOff.
      </p>
      <p className="text-center text-sm text-zinc-600">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-indigo-600 hover:underline">
          Log in
        </Link>
      </p>
    </>
  );
}
