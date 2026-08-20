"use client";

import { QRCodeSVG } from "qrcode.react";
import { TicketNumber } from "@/components/ticket/ticket-number";
import { BurgerCount } from "@/components/ticket/burger-count";
import { PerfSeam } from "@/components/ticket/ticket-frame";
import { StampButton } from "@/components/ticket/stamp-button";

type Props = {
  ticketNumber: number;
  quantity: number;
  statusUrl: string;
  onNext: () => void;
};

/**
 * The order-taker's confirmation moment for every order: a ticket
 * printing and tearing off the rail, with a QR code the customer scans
 * to open their own status page. Stays on screen until the order taker
 * taps "Next order" - no timer racing the customer's camera.
 */
export function TornTicketOverlay({ ticketNumber, quantity, statusUrl, onNext }: Props) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Order confirmed"
    >
      <div className="animate-tear-in torn-edge-bottom ticket-shadow w-full max-w-sm bg-paper px-8 pt-10 pb-14 text-center text-ink">
        <p className="font-dotmatrix text-lg tracking-[0.3em] text-ink-soft uppercase">
          Ticket printed
        </p>
        <TicketNumber ticketNumber={ticketNumber} size="xl" className="mt-4 block" />
        <BurgerCount quantity={quantity} size="lg" className="mt-4" />

        <PerfSeam className="my-6" />

        <div className="mx-auto flex w-fit items-center justify-center border-2 border-ink bg-white p-3">
          <QRCodeSVG value={statusUrl} size={176} marginSize={0} />
        </div>
        <p className="mt-4 font-dotmatrix text-base tracking-[0.15em] text-ink-soft uppercase">
          Customer scans to track their order
        </p>

        <StampButton variant="primary" className="mt-8" onClick={onNext}>
          Next order
        </StampButton>
      </div>
    </div>
  );
}
