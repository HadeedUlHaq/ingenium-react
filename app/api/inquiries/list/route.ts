import { NextResponse, type NextRequest } from "next/server";
import { COOKIE_NAME, verifySessionToken } from "@/lib/auth/session";
import { supabaseAdmin } from "@/lib/supabase/server";

export const runtime = "nodejs";

/** Staff-only: the inquiries table is service-role-only, so reading it
 *  has to come back through an authenticated route. */
export async function GET(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!(await verifySessionToken(token))) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  const { data, error } = await supabaseAdmin
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) {
    return NextResponse.json({ error: "Couldn't load inquiries." }, { status: 500 });
  }
  return NextResponse.json({ inquiries: data ?? [] });
}
