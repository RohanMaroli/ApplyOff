import Image from "next/image";
import Link from "next/link";
import { signOut } from "@/app/(auth)/actions";
import { createClient } from "@/lib/supabase/server";

// Top navigation. Shows different links depending on whether the user is logged in.
export async function Navbar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const avatar = user?.user_metadata?.avatar_url as string | undefined;

  return (
    <header className="border-b border-zinc-200 bg-white">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link href={user ? "/dashboard" : "/"} className="text-lg font-bold tracking-tight text-zinc-900">
          Apply<span className="text-indigo-600">Off</span>
        </Link>

        {user ? (
          <div className="flex items-center gap-4 text-sm">
            <Link href="/dashboard" className="text-zinc-700 hover:text-zinc-900">
              Dashboard
            </Link>
            <Link href="/settings" className="flex items-center gap-2 text-zinc-700 hover:text-zinc-900">
              {avatar && (
                <Image src={avatar} alt="" width={28} height={28} className="rounded-full" unoptimized />
              )}
              <span className="hidden sm:inline">Settings</span>
            </Link>
            <form action={signOut}>
              <button type="submit" className="text-zinc-500 hover:text-zinc-900">
                Log out
              </button>
            </form>
          </div>
        ) : (
          <div className="flex items-center gap-3 text-sm">
            <Link href="/login" className="text-zinc-700 hover:text-zinc-900">
              Log in
            </Link>
            <Link href="/signup" className="rounded-lg bg-indigo-600 px-3 py-2 font-medium text-white hover:bg-indigo-700">
              Sign up
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
