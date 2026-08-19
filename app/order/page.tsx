"use client";

import { useState } from "react";
import { ChefHat, QrCode, Zap } from "lucide-react";
import { createOrder, type Order } from "@/lib/orders";
import { QuantityStepper } from "@/components/ticket/quantity-stepper";
import { StampButton } from "@/components/ticket/stamp-button";
import { TornTicketOverlay } from "@/components/ticket/torn-ticket-overlay";
import { QrTicketDialog } from "@/components/ticket/qr-ticket-dialog";
import { PerfSeam } from "@/components/ticket/ticket-frame";

export default function OrderTakerPage() {
  const [customerName, setCustomerName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [submitting, setSubmitting] = useState<"quick" | "large" | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [quickOrder, setQuickOrder] = useState<Order | null>(null);
  const [largeOrder, setLargeOrder] = useState<Order | null>(null);

  const canSubmit = customerName.trim().length > 0 && !submitting;

  function resetForm() {
    setCustomerName("");
    setQuantity(1);
  }

  async function handleSubmit(kind: "quick" | "large") {
    if (!canSubmit) return;
    setSubmitting(kind);
    setError(null);
    try {
      const order = await createOrder({
        customerName: customerName.trim(),
        quantity,
      });
      if (kind === "quick") {
        setQuickOrder(order);
        resetForm();
      } else {
        setLargeOrder(order);
      }
    } catch {
      setError("Couldn't send that order — check the connection and try again.");
    } finally {
      setSubmitting(null);
    }
  }

  const statusUrl =
    largeOrder && typeof window !== "undefined"
      ? `${window.location.origin}/status/${largeOrder.id}`
      : "";

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col px-5 py-8">
      <header className="mb-8 text-center">
        <p className="font-dotmatrix text-lg tracking-[0.3em] text-ink-soft uppercase">
          Hadeed Smash Burgers
        </p>
        <h1 className="mt-1 font-stamp text-3xl uppercase">Order Taker</h1>
      </header>

      <form
        className="ticket-shadow border-2 border-ink bg-paper p-6"
        onSubmit={(e) => e.preventDefault()}
      >
        <label className="block">
          <span className="font-dotmatrix text-sm tracking-[0.2em] text-ink-soft uppercase">
            Customer name
          </span>
          <input
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Name for the ticket"
            autoComplete="off"
            className="stepped mt-2 w-full border-2 border-ink bg-paper-dim px-4 py-4 font-stamp text-2xl text-ink uppercase placeholder:font-sans placeholder:text-base placeholder:normal-case placeholder:text-ink-soft focus:outline-none"
          />
        </label>

        <PerfSeam className="my-6" />

        <span className="block font-dotmatrix text-sm tracking-[0.2em] text-ink-soft uppercase">
          Burgers
        </span>
        <QuantityStepper value={quantity} onChange={setQuantity} className="mt-2" />

        {error ? (
          <p className="mt-4 font-dotmatrix text-base tracking-wide text-stamp-red uppercase">
            {error}
          </p>
        ) : null}

        <div className="mt-8 flex flex-col gap-3">
          <StampButton
            variant="primary"
            disabled={!canSubmit}
            onClick={() => handleSubmit("quick")}
          >
            <Zap className="size-5" strokeWidth={2.5} />
            Quick order
          </StampButton>
          <StampButton
            variant="outline"
            disabled={!canSubmit}
            onClick={() => handleSubmit("large")}
          >
            <QrCode className="size-5" strokeWidth={2.5} />
            Large / complex order
          </StampButton>
        </div>
        <p className="mt-4 text-center font-dotmatrix text-sm tracking-[0.15em] text-ink-soft uppercase">
          Quick order for 1&ndash;3 burgers &middot; large order prints a QR code
        </p>
      </form>

      <a
        href="/kds"
        className="mt-6 flex items-center justify-center gap-2 font-dotmatrix text-sm tracking-[0.2em] text-ink-soft uppercase underline underline-offset-4"
      >
        <ChefHat className="size-4" />
        Open kitchen display
      </a>

      {quickOrder ? (
        <TornTicketOverlay
          ticketNumber={quickOrder.ticket_number}
          customerName={quickOrder.customer_name}
          quantity={quickOrder.quantity}
          onDismiss={() => setQuickOrder(null)}
        />
      ) : null}

      {largeOrder ? (
        <QrTicketDialog
          open={Boolean(largeOrder)}
          onOpenChange={(open) => {
            if (!open) {
              setLargeOrder(null);
              resetForm();
            }
          }}
          ticketNumber={largeOrder.ticket_number}
          customerName={largeOrder.customer_name}
          quantity={largeOrder.quantity}
          statusUrl={statusUrl}
          onDone={() => {
            setLargeOrder(null);
            resetForm();
          }}
        />
      ) : null}
    </main>
  );
}
