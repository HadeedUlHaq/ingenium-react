"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { resetEvent } from "@/lib/orders";
import { CodePad } from "@/components/gate/code-pad";
import { PerfSeam } from "@/components/ticket/ticket-frame";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onReset: () => void;
};

/**
 * Re-enters the staff code before wiping the queue - a New Event reset is
 * destructive and shared across every open screen, so it earns its own
 * confirmation beyond just having the door already unlocked.
 */
export function ResetDialog({ open, onOpenChange, onReset }: Props) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-ink/70 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <DialogPrimitive.Content
          className="ticket-shadow fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 -translate-y-1/2 border-2 border-ink bg-paper p-8 text-center text-ink data-[state=open]:animate-in data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:zoom-out-95"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <DialogPrimitive.Title className="font-stamp text-2xl uppercase">
            Start a new event?
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="mt-2 font-dotmatrix text-sm tracking-[0.1em] text-ink-soft uppercase">
            This clears every ticket and restarts numbering at #001. Enter the staff code to
            confirm.
          </DialogPrimitive.Description>

          <PerfSeam className="my-6" />

          <CodePad
            onSubmit={async (code) => {
              try {
                await resetEvent(code);
                onReset();
                onOpenChange(false);
                return { ok: true };
              } catch (err) {
                return {
                  ok: false,
                  error: err instanceof Error ? err.message : "Reset failed.",
                };
              }
            }}
          />
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
