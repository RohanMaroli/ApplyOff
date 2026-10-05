import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { safeNext } from "@/lib/auth";

// Google (and email links) send the user back here with a one-time ?code=.
// We swap the code for a session (login cookie), then send them on.
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  const next = safeNext(searchParams.get("next"));

  // The user cancelled on Google's screen, or the provider returned an error.
  const providerError = searchParams.get("error_description") ?? searchParams.get("error");
  if (providerError) {
    return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(friendly(providerError))}`);
  }

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(`${origin}${next}`);
  }

  return NextResponse.redirect(
    `${origin}/login?error=${encodeURIComponent("That login link is invalid or expired. Please try again.")}`,
  );
}

function friendly(error: string) {
  if (error.toLowerCase().includes("access_denied") || error.toLowerCase().includes("denied")) {
    return "Google sign-in was cancelled.";
  }
  return "Sign-in failed. Please try again.";
}
