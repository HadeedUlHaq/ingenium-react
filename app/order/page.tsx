"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ChefHat, Lock, Printer } from "lucide-react";
import { createOrder, markCollected, type Order } from "@/lib/orders";
import { useOrders } from "@/hooks/use-orders";
import { QuantityStepper } from "@/components/ticket/quantity-stepper";
import { StampButton } from "@/components/ticket/stamp-button";
import { TornTicketOverlay } from "@/components/ticket/torn-ticket-overlay";
import { ReadyPickupRow } from "@/components/ticket/ready-pickup-row";
import { PerfSeam } from "@/components/ticket/ticket-frame";
import { ConnectionBadge } from "@/components/ticket/connection-badge";

export default function OrderTakerPage() {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newOrder, setNewOrder] = useState<Order | null>(null);
  const [collectingId, setCollectingId] = useState<string | null>(null);

  const { orders, connected, refetch } = useOrders();
  const ready = useMemo(
    () => orders.filter((o) => o.status === "READY").reverse(),
    [orders],
  );

  async function handleSubmit() {
    if (submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const order = await createOrder({ quantity });
      setNewOrder(order);
      setQuantity(1);
    } catch {
      setError("Couldn't send that order — check the connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleCollect(id: string) {
    setCollectingId(id);
    try {
      await markCollected(id);
      await refetch();
    } finally {
      setCollectingId(null);
    }
  }

  async function handleLock() {
    await fetch("/api/staff/logout", { method: "POST" });
    router.replace("/staff");
  }

  const statusUrl =
    newOrder && typeof window !== "undefined"
      ? `${window.location.origin}/status/${newOrder.id}`
      : "";

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col px-5 py-8">
      <header className="mb-4 text-center">
        <p className="font-dotmatrix text-lg tracking-[0.3em] text-ink-soft uppercase">
          Hadeed Smash Burgers
        </p>
        <h1 className="mt-1 font-stamp text-3xl uppercase">Order Taker</h1>
      </header>

      <div className="mb-6 flex items-center justify-between">
        <ConnectionBadge connected={connected} />
        <button
          type="button"
          onClick={handleLock}
          className="stepped flex items-center gap-1.5 border-2 border-ink/40 px-3 py-2 font-dotmatrix text-sm tracking-[0.1em] text-ink-soft uppercase"
        >
          <Lock className="size-4" />
          Lock
        </button>
      </div>

      <form
        className="ticket-shadow border-2 border-ink bg-paper p-6"
        onSubmit={(e) => e.preventDefault()}
      >
        <span className="block font-dotmatrix text-sm tracking-[0.2em] text-ink-soft uppercase">
          Burgers
        </span>
        <QuantityStepper value={quantity} onChange={setQuantity} className="mt-2" />

        {error ? (
          <p className="mt-4 font-dotmatrix text-base tracking-wide text-stamp-red uppercase">
            {error}
          </p>
        ) : null}

        <StampButton
          variant="primary"
          className="mt-8"
          disabled={submitting}
          onClick={handleSubmit}
        >
          <Printer className="size-5" strokeWidth={2.5} />
          Print ticket
        </StampButton>
        <p className="mt-4 text-center font-dotmatrix text-sm tracking-[0.15em] text-ink-soft uppercase">
          Every ticket gets a QR code for the customer to scan
        </p>
      </form>

      {ready.length > 0 ? (
        <section className="mt-8">
          <div className="mb-3 flex items-center gap-2">
            <h2 className="font-stamp text-xl uppercase">Ready for pickup</h2>
            <span className="font-dotmatrix text-base text-ink-soft">({ready.length})</span>
          </div>
          <ul className="flex flex-col gap-3">
            {ready.map((order) => (
              <ReadyPickupRow
                key={order.id}
                order={order}
                onCollect={handleCollect}
                collecting={collectingId === order.id}
              />
            ))}
          </ul>
        </section>
      ) : null}

      <PerfSeam className="my-8" />

      <a
        href="/kds"
        className="flex items-center justify-center gap-2 font-dotmatrix text-sm tracking-[0.2em] text-ink-soft uppercase underline underline-offset-4"
      >
        <ChefHat className="size-4" />
        Open kitchen display
      </a>

      {newOrder ? (
        <TornTicketOverlay
          ticketNumber={newOrder.ticket_number}
          quantity={newOrder.quantity}
          statusUrl={statusUrl}
          onNext={() => setNewOrder(null)}
        />
      ) : null}
    </main>
  );
}
