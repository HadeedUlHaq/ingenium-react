import { supabase } from "@/lib/supabase/client";

export type OrderStatus = "COOKING" | "READY" | "COLLECTED";

export type Order = {
  id: string;
  ticket_number: number;
  quantity: number;
  status: OrderStatus;
  created_at: string;
  ready_at: string | null;
  collected_at: string | null;
};

/** Orders waiting longer than this are flagged LATE on the kitchen display. */
export const LATE_THRESHOLD_MS = 10 * 60 * 1000;

/** Zero-pads a ticket number for display, e.g. 7 -> "#007". */
export function formatTicket(ticketNumber: number) {
  return `#${String(ticketNumber).padStart(3, "0")}`;
}

// Reads stay on the anon client (RLS allows SELECT) so every screen's
// Supabase Realtime subscription keeps working. Writes go through
// server-side API routes that require a valid staff session.

export async function listOrders(): Promise<Order[]> {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export async function getOrder(id: string): Promise<Order | null> {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data;
}

async function apiRequest<T>(
  url: string,
  method: "POST" | "PATCH",
  body: unknown,
): Promise<T> {
  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const payload = await res.json().catch(() => null);
    throw new Error(payload?.error ?? `Request failed (${res.status})`);
  }
  return res.json();
}

export async function createOrder(input: { quantity: number }): Promise<Order> {
  return apiRequest<Order>("/api/orders", "POST", input);
}

export async function markReady(id: string): Promise<void> {
  await apiRequest(`/api/orders/${id}`, "PATCH", { status: "READY" });
}

/** The order taker hands the ticket over: clears it from both live lists. */
export async function markCollected(id: string): Promise<void> {
  await apiRequest(`/api/orders/${id}`, "PATCH", { status: "COLLECTED" });
}

/** Clears the queue and restarts ticket numbers at #001 for a new event. */
export async function resetEvent(code: string): Promise<void> {
  await apiRequest("/api/staff/reset", "POST", { code });
}
