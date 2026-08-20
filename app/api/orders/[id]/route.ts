import { NextResponse, type NextRequest } from "next/server";
import { COOKIE_NAME, verifySessionToken } from "@/lib/auth/session";
import { supabaseAdmin } from "@/lib/supabase/server";

export const runtime = "nodejs";

const ALLOWED_STATUSES = new Set(["READY", "COLLECTED"]);

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!(await verifySessionToken(token))) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => null);
  const status = body?.status;
  if (typeof status !== "string" || !ALLOWED_STATUSES.has(status)) {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  }

  const update: Record<string, unknown> = { status };
  if (status === "READY") update.ready_at = new Date().toISOString();
  if (status === "COLLECTED") update.collected_at = new Date().toISOString();

  const { error } = await supabaseAdmin.from("orders").update(update).eq("id", id);
  if (error) {
    return NextResponse.json({ error: "Update failed." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
