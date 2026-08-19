"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { QRCodeSVG } from "qrcode.react";
import { TicketNumber } from "@/components/ticket/ticket-number";
import { PerfSeam } from "@/components/ticket/ticket-frame";
import { StampButton } from "@/components/ticket/stamp-button";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ticketNumber: number;
  customerName: string;
  quantity: number;
  statusUrl: string;
  onDone: () => void;
};

/**
 * Shown to the order taker for large/complex orders: a QR code the
 * customer scans to open their own status page and self-track.
 */
export function QrTicketDialog({
  open,
  onOpenChange,
  ticketNumber,
  customerName,
  quantity,
  statusUrl,
  onDone,
}: Props) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-ink/70 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <DialogPrimitive.Content
          className="ticket-shadow fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 -translate-y-1/2 border-2 border-ink bg-paper p-8 text-center text-ink data-[state=open]:animate-in data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:zoom-out-95"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <DialogPrimitive.Title className="font-dotmatrix text-lg tracking-[0.3em] text-ink-soft uppercase">
            Scan to track your order
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            Scan this QR code with your phone to follow your order status.
          </DialogPrimitive.Description>

          <TicketNumber ticketNumber={ticketNumber} size="lg" className="mt-3 block" />
          <p className="mt-1 font-stamp text-xl uppercase">{customerName}</p>
          <p className="font-dotmatrix text-base tracking-[0.15em] text-ink-soft uppercase">
            {quantity} {quantity === 1 ? "burger" : "burgers"}
          </p>

          <PerfSeam className="my-6" />

          <div className="mx-auto flex w-fit items-center justify-center border-2 border-ink bg-white p-3">
            <QRCodeSVG value={statusUrl} size={192} marginSize={0} />
          </div>
          <p className="mt-4 font-dotmatrix text-sm tracking-[0.1em] text-ink-soft uppercase">
            Show this screen to the customer to scan
          </p>

          <StampButton variant="primary" className="mt-8" onClick={onDone}>
            Done
          </StampButton>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
