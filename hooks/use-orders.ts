"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { listOrders, type Order } from "@/lib/orders";

/** Realtime-refetch fallback interval for flaky event Wi-Fi. */
const REFETCH_FALLBACK_MS = 15_000;

/**
 * Drives the Kitchen Display System: every order, kept live via Supabase
 * Realtime with a polling fallback so a dropped socket degrades to a
 * refetch instead of a stale screen.
 */
export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mounted = useRef(true);

  const refetch = useCallback(async () => {
    try {
      const next = await listOrders();
      if (mounted.current) {
        setOrders(next);
        setError(null);
      }
    } catch (err) {
      if (mounted.current) {
        setError(err instanceof Error ? err.message : "Failed to load orders");
      }
    } finally {
      if (mounted.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    mounted.current = true;
    refetch();

    const channel = supabase
      .channel("orders-kds")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders" },
        () => refetch(),
      )
      .subscribe();

    const interval = setInterval(refetch, REFETCH_FALLBACK_MS);

    return () => {
      mounted.current = false;
      clearInterval(interval);
      supabase.removeChannel(channel);
    };
  }, [refetch]);

  return { orders, loading, error, refetch };
}
