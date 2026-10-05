import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// "Export my data": download everything we store about the user as JSON.
// Add new tables here as later modules (applications, documents…) are built.
export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Not logged in" }, { status: 401 });

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single();

  const data = {
    exported_at: new Date().toISOString(),
    account: {
      id: user.id,
      email: user.email,
      created_at: user.created_at,
      sign_in_methods: (user.identities ?? []).map((i) => i.provider),
    },
    profile,
  };

  return new NextResponse(JSON.stringify(data, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": 'attachment; filename="applyoff-data.json"',
    },
  });
}
