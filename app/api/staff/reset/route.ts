import { NextResponse, type NextRequest } from "next/server";
import { createHash, timingSafeEqual } from "node:crypto";
import { COOKIE_NAME, verifySessionToken } from "@/lib/auth/session";
import { checkRateLimit, getClientIp, recordAttempt } from "@/lib/auth/rate-limit";
import { supabaseAdmin } from "@/lib/supabase/server";

export const runtime = "nodejs";

function safeEqual(a: string, b: string): boolean {
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

/**
 * Clears the event and restarts ticket numbers. Deliberately requires both
 * an active staff session AND a re-entered code - this is destructive and
 * shared across every open screen, so it earns its own confirmation beyond
 * just having the door unlocked.
 */
export async function POST(request: NextRequest) {
  const staffCode = process.env.STAFF_CODE;
  if (!staffCode) {
    return NextResponse.json({ error: "Staff login is not configured." }, { status: 500 });
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!(await verifySessionToken(token))) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  const ip = getClientIp(request.headers);
  const { allowed, retryAfterSeconds } = await checkRateLimit(ip);
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many attempts. Try again shortly." },
      { status: 429, headers: { "Retry-After": String(retryAfterSeconds) } },
    );
  }

  const body = await request.json().catch(() => null);
  const code = typeof body?.code === "string" ? body.code : "";
  const correct = code.length > 0 && safeEqual(code, staffCode);

  await recordAttempt(ip, correct);

  if (!correct) {
    return NextResponse.json({ error: "Incorrect code." }, { status: 401 });
  }

  const { error } = await supabaseAdmin.rpc("reset_event");
  if (error) {
    return NextResponse.json({ error: "Reset failed." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
