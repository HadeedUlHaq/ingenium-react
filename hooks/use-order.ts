"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { getOrder, type Order } from "@/lib/orders";

/**
 * Drives the customer status page for a single order via Supabase
 * Realtime, no polling. The realtime payload is applied directly to
 * state; a refetch only runs on mount, the channel (re)subscribing, and
 * the tab waking up.
 */
export function useOrder(orderId: string) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [connected, setConnected] = useState(false);
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
      // keep the last known state; the next realtime event or reconnect retries
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
        { event: "UPDATE", schema: "public", table: "orders", filter: `id=eq.${orderId}` },
        (payload) => {
          setOrder(payload.new as Order);
          setNotFound(false);
        },
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "orders", filter: `id=eq.${orderId}` },
        () => {
          setNotFound(true);
        },
      )
      .subscribe((status) => {
        if (!mounted.current) return;
        if (status === "SUBSCRIBED") {
          setConnected(true);
          refetch();
        } else if (status === "CLOSED" || status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
          setConnected(false);
        }
      });

    function handleWake() {
      if (document.visibilityState === "visible") refetch();
    }
    window.addEventListener("online", refetch);
    document.addEventListener("visibilitychange", handleWake);

    return () => {
      mounted.current = false;
      window.removeEventListener("online", refetch);
      document.removeEventListener("visibilitychange", handleWake);
      supabase.removeChannel(channel);
    };
  }, [orderId, refetch]);

  return { order, loading, notFound, connected };
}
