"use client";

import { useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";
import { useOrders } from "@/hooks/use-orders";
import { useClockTick } from "@/hooks/use-clock-tick";
import { markReady, resetEvent } from "@/lib/orders";
import { OrderCard } from "@/components/ticket/order-card";
import { cn } from "@/lib/utils";

type Tab = "active" | "ready";

export default function KitchenDisplayPage() {
  const { orders, loading, error, refetch } = useOrders();
  const now = useClockTick();
  const [tab, setTab] = useState<Tab>("active");
  const [markingId, setMarkingId] = useState<string | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const [resetting, setResetting] = useState(false);

  const active = useMemo(
    () => orders.filter((o) => o.status === "COOKING"),
    [orders],
  );
  const ready = useMemo(
    () => orders.filter((o) => o.status === "READY").reverse(),
    [orders],
  );

  async function handleMarkReady(id: string) {
    setMarkingId(id);
    try {
      await markReady(id);
      await refetch();
    } finally {
      setMarkingId(null);
    }
  }

  async function handleReset() {
    if (!confirmReset) {
      setConfirmReset(true);
      return;
    }
    setResetting(true);
    try {
      await resetEvent();
      await refetch();
    } finally {
      setResetting(false);
      setConfirmReset(false);
    }
  }

  const list = tab === "active" ? active : ready;

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col px-4 py-6">
      <header className="mb-5 flex items-center justify-between">
        <div>
          <p className="font-dotmatrix text-base tracking-[0.3em] text-ink-soft uppercase">
            Hadeed Smash Burgers
          </p>
          <h1 className="font-stamp text-2xl uppercase">Kitchen Display</h1>
        </div>
        <button
          type="button"
          onClick={handleReset}
          disabled={resetting}
          className={cn(
            "stepped flex items-center gap-1.5 border-2 px-3 py-2 font-dotmatrix text-sm tracking-[0.1em] uppercase disabled:opacity-40",
            confirmReset
              ? "border-stamp-red bg-stamp-red text-paper"
              : "border-ink/40 text-ink-soft",
          )}
        >
          <RotateCcw className="size-4" />
          {confirmReset ? "Confirm?" : "New event"}
        </button>
      </header>

      <div className="stepped mb-4 flex border-2 border-ink">
        <button
          type="button"
          onClick={() => setTab("active")}
          className={cn(
            "stepped min-h-12 flex-1 font-dotmatrix text-base tracking-[0.15em] uppercase",
            tab === "active" ? "bg-ink text-paper" : "text-ink-soft",
          )}
        >
          Active ({active.length})
        </button>
        <button
          type="button"
          onClick={() => setTab("ready")}
          className={cn(
            "stepped min-h-12 flex-1 border-l-2 border-ink font-dotmatrix text-base tracking-[0.15em] uppercase",
            tab === "ready" ? "bg-pass-green-deep text-paper" : "text-ink-soft",
          )}
        >
          Ready ({ready.length})
        </button>
      </div>

      {error ? (
        <p className="mb-4 font-dotmatrix text-base text-stamp-red uppercase">{error}</p>
      ) : null}

      {loading ? (
        <p className="font-dotmatrix text-lg tracking-[0.15em] text-ink-soft uppercase">
          Loading the rail&hellip;
        </p>
      ) : list.length === 0 ? (
        <p className="mt-10 text-center font-dotmatrix text-lg tracking-[0.15em] text-ink-soft uppercase">
          {tab === "active" ? "No tickets on the rail" : "Nothing picked up yet"}
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {list.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              now={now}
              marking={markingId === order.id}
              onMarkReady={tab === "active" ? handleMarkReady : undefined}
            />
          ))}
        </ul>
      )}
    </main>
  );
}
