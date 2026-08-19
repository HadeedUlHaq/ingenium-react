"use client";

import { useState, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const VARIANTS = {
  primary: "bg-ink text-paper border-ink",
  outline: "bg-paper text-ink border-ink",
  danger: "bg-stamp-red text-paper border-stamp-red",
  ready: "bg-pass-green-deep text-paper border-pass-green-deep",
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
