"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  className?: string;
};

/** Big thumb-reach +/- stepper for setting burger quantity at the counter. */
export function QuantityStepper({ value, onChange, min = 1, max = 20, className }: Props) {
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));

  return (
    <div
      className={cn(
        "stepped flex items-stretch border-2 border-ink",
        className,
      )}
    >
      <button
        type="button"
        onClick={dec}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className="stepped flex min-h-16 w-16 shrink-0 items-center justify-center border-r-2 border-ink text-ink active:scale-95 disabled:opacity-30"
      >
        <Minus className="size-7" strokeWidth={3} />
      </button>
      <div className="flex flex-1 items-center justify-center bg-paper-dim">
        <span className="stamp-digits font-stamp text-5xl tabular-nums" aria-live="polite">
          {value}
        </span>
      </div>
      <button
        type="button"
        onClick={inc}
        disabled={value >= max}
        aria-label="Increase quantity"
        className="stepped flex min-h-16 w-16 shrink-0 items-center justify-center border-l-2 border-ink text-ink active:scale-95 disabled:opacity-30"
      >
        <Plus className="size-7" strokeWidth={3} />
      </button>
    </div>
  );
}
