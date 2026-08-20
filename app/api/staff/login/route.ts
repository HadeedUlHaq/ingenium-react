import { NextResponse, type NextRequest } from "next/server";
import { createHash, timingSafeEqual } from "node:crypto";
import { COOKIE_NAME, SESSION_TTL_SECONDS, createSessionToken } from "@/lib/auth/session";
import { checkRateLimit, getClientIp, recordAttempt } from "@/lib/auth/rate-limit";

export const runtime = "nodejs";

/** Hash both sides to a fixed length first, so the comparison is both
 * constant-time and doesn't leak the code's length via timing. */
function safeEqual(a: string, b: string): boolean {
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

export async function POST(request: NextRequest) {
  const staffCode = process.env.STAFF_CODE;
  if (!staffCode) {
    return NextResponse.json({ error: "Staff login is not configured." }, { status: 500 });
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

  const token = await createSessionToken();
  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_TTL_SECONDS,
    path: "/",
  });
  return response;
}
