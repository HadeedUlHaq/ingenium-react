"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { getOrder, type Order } from "@/lib/orders";

/** Per the spec: poll every 5s as a fallback alongside the realtime subscription. */
const POLL_MS = 5_000;

/**
 * Drives the customer status page for a single order: realtime updates
 * plus 5s polling, so the page updates without a manual refresh even on
 * flaky event Wi-Fi.
 */
export function useOrder(orderId: string) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const mounted = useRef(true);

  const refetch = useCallback(async () => {
    try {
      const next = await getOrder(orderId);
      if (!mounted.current) return;
      if (!next) {
        setNotFound(true);
      } else {
        setOrder(next);
        setNotFound(false);
      }
    } catch {
      // keep the last known state; the next poll or realtime event retries
    } finally {
      if (mounted.current) setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    mounted.current = true;
    refetch();

    const channel = supabase
      .channel(`order-status-${orderId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "orders",
          filter: `id=eq.${orderId}`,
        },
        () => refetch(),
      )
      .subscribe();

    const interval = setInterval(refetch, POLL_MS);

    return () => {
      mounted.current = false;
      clearInterval(interval);
      supabase.removeChannel(channel);
    };
  }, [orderId, refetch]);

  return { order, loading, notFound };
}
