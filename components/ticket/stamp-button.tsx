"use client";

import { useState, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Gold carries the primary action, matching the badge; red is the
 * site's CTA colour and stays reserved for destructive/urgent here;
 * green keeps its functional "ready" meaning for the kitchen.
 * Dark text on gold/green is the strongest pair in the system.
 */
const VARIANTS = {
  primary: "gilded text-iron-black border-gold-deep",
  outline: "badge-face text-chrome border-gold/40",
  danger: "bg-signal-red text-white border-signal-red",
  ready: "bg-pass-green text-iron-black border-pass-green",
} as const;

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof VARIANTS;
  children: ReactNode;
};

/**
 * A full-width docket action: pressing it lands like a rubber stamp -
 * a short stepped thunk, not an eased hover fade. Big touch target for
 * kitchen and counter use.
 */
export function StampButton({
  variant = "primary",
  className,
  children,
  onClick,
  disabled,
  ...props
}: Props) {
  const [stamping, setStamping] = useState(false);

  return (
    <button
      type="button"
      className={cn(
        "stepped relative flex min-h-14 w-full items-center justify-center gap-2 border-2 px-6 font-stamp text-xl uppercase tracking-wide disabled:cursor-not-allowed disabled:opacity-40",
        "active:scale-[0.97]",
        stamping && "animate-stamp-thunk",
        VARIANTS[variant],
        className,
      )}
      disabled={disabled}
      onClick={(e) => {
        setStamping(true);
        window.setTimeout(() => setStamping(false), 220);
        onClick?.(e);
      }}
      {...props}
    >
      {children}
    </button>
  );
}
