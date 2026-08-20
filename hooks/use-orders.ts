"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { listOrders, type Order } from "@/lib/orders";

/**
 * Drives the Kitchen Display and Order Taker screens: every order, kept
 * live via Supabase Realtime. Payloads are applied directly to state
 * (INSERT appends, UPDATE replaces, DELETE removes) instead of triggering
 * a refetch, so updates land instantly. A full refetch only runs on
 * reconnect-worthy *events* - mount, the channel (re)subscribing, and the
 * tab waking up - never on a timer.
 */
export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);
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
      .channel("orders-live")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "orders" },
        (payload) => {
          const row = payload.new as Order;
          setOrders((prev) => (prev.some((o) => o.id === row.id) ? prev : [...prev, row]));
        },
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "orders" },
        (payload) => {
          const row = payload.new as Order;
          setOrders((prev) => prev.map((o) => (o.id === row.id ? row : o)));
        },
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "orders" },
        (payload) => {
          const oldId = (payload.old as Partial<Order>).id;
          if (!oldId) return;
          setOrders((prev) => prev.filter((o) => o.id !== oldId));
        },
      )
      .subscribe((status) => {
        if (!mounted.current) return;
        if (status === "SUBSCRIBED") {
          setConnected(true);
          refetch(); // catch up on anything missed while (re)connecting
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
  }, [refetch]);

  return { orders, loading, error, connected, refetch };
}
