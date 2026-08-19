import { supabase } from "@/lib/supabase/client";

export type OrderStatus = "COOKING" | "READY";

export type Order = {
  id: string;
  ticket_number: number;
  customer_name: string;
  quantity: number;
  status: OrderStatus;
  created_at: string;
  ready_at: string | null;
};

/** Orders waiting longer than this are flagged LATE on the kitchen display. */
export const LATE_THRESHOLD_MS = 10 * 60 * 1000;

/** Zero-pads a ticket number for display, e.g. 7 -> "#007". */
export function formatTicket(ticketNumber: number) {
  return `#${String(ticketNumber).padStart(3, "0")}`;
}

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

export async function createOrder(input: {
  customerName: string;
  quantity: number;
}): Promise<Order> {
  const { data, error } = await supabase
    .from("orders")
    .insert({
      customer_name: input.customerName,
      quantity: input.quantity,
    })
    .select("*")
    .single();

  if (error) throw error;
  return data;
}

export async function markReady(id: string): Promise<void> {
  const { error } = await supabase
    .from("orders")
    .update({ status: "READY", ready_at: new Date().toISOString() })
    .eq("id", id);

  if (error) throw error;
}

/** Clears the queue and restarts ticket numbers at #001 for a new event. */
export async function resetEvent(): Promise<void> {
  const { error } = await supabase.rpc("reset_event");
  if (error) throw error;
}
