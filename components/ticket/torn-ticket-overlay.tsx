"use client";

import { useEffect } from "react";
import { TicketNumber } from "@/components/ticket/ticket-number";

type Props = {
  ticketNumber: number;
  customerName: string;
  quantity: number;
  onDismiss: () => void;
};

/**
 * The order-taker's confirmation moment: a ticket printing and tearing off
 * the rail, held on screen for the customer to see, then torn away.
 */
export function TornTicketOverlay({ ticketNumber, customerName, quantity, onDismiss }: Props) {
  useEffect(() => {
    const id = window.setTimeout(onDismiss, 5000);
    return () => window.clearTimeout(id);
  }, [onDismiss]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Order confirmed"
      onClick={onDismiss}
    >
      <div className="animate-tear-in torn-edge-bottom ticket-shadow w-full max-w-sm bg-paper px-8 pt-10 pb-14 text-center text-ink">
        <p className="font-dotmatrix text-lg tracking-[0.3em] text-ink-soft uppercase">
          Ticket printed
        </p>
        <TicketNumber ticketNumber={ticketNumber} size="xl" className="mt-4 block" />
        <p className="mt-6 font-stamp text-2xl uppercase">{customerName}</p>
        <p className="font-dotmatrix text-lg tracking-[0.2em] text-ink-soft uppercase">
          {quantity} {quantity === 1 ? "burger" : "burgers"}
        </p>
        <p className="mt-8 font-dotmatrix text-base tracking-[0.15em] text-ink-soft uppercase">
          Tap anywhere for the next order
        </p>
      </div>
    </div>
  );
}
