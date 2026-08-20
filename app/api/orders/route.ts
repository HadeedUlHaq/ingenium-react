import { NextResponse, type NextRequest } from "next/server";
import { COOKIE_NAME, verifySessionToken } from "@/lib/auth/session";
import { supabaseAdmin } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!(await verifySessionToken(token))) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const quantity = Number(body?.quantity);
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
    return NextResponse.json({ error: "Invalid quantity." }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("orders")
    .insert({ quantity })
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: "Couldn't create order." }, { status: 500 });
  }
  return NextResponse.json(data);
}
