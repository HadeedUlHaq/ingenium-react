import "server-only";
import { supabaseAdmin } from "@/lib/supabase/server";

/** Failed staff-login attempts allowed per IP before a temporary lockout. */
const MAX_FAILURES = 5;
const WINDOW_MS = 15 * 60 * 1000;

type RateLimitResult = { allowed: boolean; retryAfterSeconds?: number };

/**
 * DB-backed rate limiting for /api/staff/login and /api/staff/reset. An
 * in-memory counter would be useless here: Vercel runs multiple lambda
 * instances and resets state on every cold start.
 */
export async function checkRateLimit(ip: string): Promise<RateLimitResult> {
  const since = new Date(Date.now() - WINDOW_MS).toISOString();
  const { data, error } = await supabaseAdmin
    .from("staff_auth_attempts")
    .select("attempted_at")
    .eq("ip", ip)
    .eq("success", false)
    .gte("attempted_at", since)
    .order("attempted_at", { ascending: true });

  if (error) {
    // Fail open: an infra hiccup shouldn't lock staff out of their own event.
    return { allowed: true };
  }

  if ((data?.length ?? 0) < MAX_FAILURES) {
    return { allowed: true };
  }

  const oldest = new Date(data![0].attempted_at).getTime();
  const retryAfterSeconds = Math.max(1, Math.ceil((oldest + WINDOW_MS - Date.now()) / 1000));
  return { allowed: false, retryAfterSeconds };
}

/** Records an attempt; a success clears this IP's recent failure history. */
export async function recordAttempt(ip: string, success: boolean): Promise<void> {
  await supabaseAdmin.from("staff_auth_attempts").insert({ ip, success });
  if (success) {
    await supabaseAdmin
      .from("staff_auth_attempts")
      .delete()
      .eq("ip", ip)
      .eq("success", false);
  }
}

export function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}
