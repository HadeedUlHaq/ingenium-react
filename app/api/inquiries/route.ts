import { NextResponse, type NextRequest } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import { getClientIp } from "@/lib/auth/rate-limit";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";

/** Public endpoint, so it needs its own abuse ceiling. */
const MAX_PER_WINDOW = 5;
const WINDOW_MS = 60 * 60 * 1000;

function str(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, max);
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request.headers);

  const { count, error: countError } = await supabaseAdmin
    .from("inquiries")
    .select("id", { count: "exact", head: true })
    .eq("ip", ip)
    .gte("created_at", new Date(Date.now() - WINDOW_MS).toISOString());

  // Fail open on an infra hiccup: losing a real booking costs more than
  // letting one extra inquiry through.
  if (!countError && (count ?? 0) >= MAX_PER_WINDOW) {
    return NextResponse.json(
      { error: "Too many inquiries from this connection. Please email us directly." },
      { status: 429 },
    );
  }

  const body = await request.json().catch(() => null);

  const fullName = str(body?.fullName, 120);
  const email = str(body?.email, 200);
  const phone = str(body?.phone, 40);

  if (!fullName || !email || !phone) {
    return NextResponse.json(
      { error: "Please provide your name, email, and phone number." },
      { status: 400 },
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please check your email address." }, { status: 400 });
  }

  const rawDate = str(body?.eventDate, 10);
  const eventDate = rawDate && /^\d{4}-\d{2}-\d{2}$/.test(rawDate) ? rawDate : null;

  const row = {
    full_name: fullName,
    organization: str(body?.organization, 160),
    email,
    phone,
    event_date: eventDate,
    venue: str(body?.venue, 240),
    event_type: str(body?.eventType, 60),
    burger_count: str(body?.burgerCount, 40),
    outdoor_space: body?.outdoorSpace === true,
    parking_access: body?.parkingAccess === true,
    notes: str(body?.notes, 4000),
    ip,
  };

  const { error } = await supabaseAdmin.from("inquiries").insert(row);
  if (error) {
    return NextResponse.json(
      { error: "We couldn't save that. Please try again or email us directly." },
      { status: 500 },
    );
  }

  await notify(row);

  return NextResponse.json({ ok: true });
}

/**
 * Best-effort notification. A saved inquiry is the source of truth, so an
 * email failure (or no key configured yet) must never fail the request -
 * the booking is already safe in the database either way.
 */
async function notify(row: Record<string, unknown>) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.INQUIRY_NOTIFY_EMAIL;
  if (!apiKey || !to) return;

  const lines = [
    `Name: ${row.full_name}`,
    `Organization: ${row.organization ?? "—"}`,
    `Email: ${row.email}`,
    `Phone: ${row.phone}`,
    `Event date: ${row.event_date ?? "—"}`,
    `Venue: ${row.venue ?? "—"}`,
    `Event type: ${row.event_type ?? "—"}`,
    `Burger count: ${row.burger_count ?? "—"}`,
    `Outdoor space (3m x 3m): ${row.outdoor_space ? "Yes" : "No"}`,
    `Parking / loading access: ${row.parking_access ? "Yes" : "No"}`,
    "",
    `Notes: ${row.notes ?? "—"}`,
  ].join("\n");

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.INQUIRY_FROM_EMAIL ?? "onboarding@resend.dev",
        to: [to],
        reply_to: row.email,
        subject: `New event inquiry — ${row.full_name}`,
        text: `New booking inquiry from ${siteConfig.url}\n\n${lines}`,
      }),
    });
  } catch {
    // Swallowed on purpose: the inquiry is already stored.
  }
}
