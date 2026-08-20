"use client";

import { use, useEffect, useRef, useState } from "react";
import { Flame, PartyPopper, Volume2 } from "lucide-react";
import { useOrder } from "@/hooks/use-order";
import { unlockChime, isChimeUnlocked, playReadyChime } from "@/lib/chime";
import { TicketNumber } from "@/components/ticket/ticket-number";
import { BurgerCount } from "@/components/ticket/burger-count";

export default function CustomerStatusPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = use(params);
  const { order, loading, notFound } = useOrder(orderId);
  const [soundReady, setSoundReady] = useState(false);
  const prevStatus = useRef<string | null>(null);

  useEffect(() => {
    if (!order) return;
    if (prevStatus.current === "COOKING" && order.status === "READY") {
      playReadyChime();
      if (typeof navigator !== "undefined" && "vibrate" in navigator) {
        navigator.vibrate([200, 100, 200]);
      }
    }
    prevStatus.current = order.status;
  }, [order]);

  function handleUnlock() {
    unlockChime();
    setSoundReady(isChimeUnlocked());
  }

  if (loading) {
    return (
      <main
        className="flex min-h-dvh items-center justify-center bg-paper p-6 text-ink"
        onClick={handleUnlock}
      >
        <p className="font-dotmatrix text-xl tracking-[0.2em] uppercase">Finding your ticket&hellip;</p>
      </main>
    );
  }

  if (notFound || !order) {
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center gap-3 bg-paper p-6 text-center text-ink">
        <p className="font-stamp text-2xl uppercase">Order not found</p>
        <p className="max-w-xs font-dotmatrix text-lg tracking-[0.1em] text-ink-soft uppercase">
          This ticket link doesn&apos;t match an active order. Ask the counter for help.
        </p>
      </main>
    );
  }

  const isCollected = order.status === "COLLECTED";
  const isReady = order.status === "READY" || isCollected;

  return (
    <main
      className={
        isReady
          ? "flex min-h-dvh flex-col items-center justify-center gap-6 bg-pass-green-bright p-6 text-center text-pass-green-deep"
          : "flex min-h-dvh flex-col items-center justify-center gap-6 bg-cooking-yellow p-6 text-center text-cooking-yellow-deep"
      }
      onClick={!soundReady ? handleUnlock : undefined}
    >
      {isReady ? (
        <PartyPopper className="size-16" strokeWidth={2} />
      ) : (
        <Flame className="size-16 animate-pulse" strokeWidth={2} />
      )}

      <TicketNumber ticketNumber={order.ticket_number} size="xl" />
      <BurgerCount quantity={order.quantity} size="lg" className="opacity-80" />

      <p className="max-w-xs font-stamp text-2xl leading-tight uppercase">
        {isCollected
          ? "Enjoy your burgers!"
          : isReady
            ? "Order ready for pickup! Please show this screen at the counter."
            : "Your order is being smashed! Please keep this page open."}
      </p>

      {!soundReady ? (
        <button
          type="button"
          onClick={handleUnlock}
          className="stepped mt-4 flex items-center gap-2 border-2 border-current px-4 py-2 font-dotmatrix text-sm tracking-[0.15em] uppercase opacity-70"
        >
          <Volume2 className="size-4" />
          Tap to enable the ready sound
        </button>
      ) : null}
    </main>
  );
}
