import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const TONES = {
  paper: "bg-paper text-ink",
  cooking: "bg-cooking-yellow text-cooking-yellow-deep",
  ready: "bg-pass-green-bright text-pass-green-deep",
} as const;

type Props = {
  children: ReactNode;
  className?: string;
  tone?: keyof typeof TONES;
  /** Slight physical tilt, in degrees. 0 keeps the ticket square. */
  tilt?: number;
};

/**
 * The docket anatomy shared by every screen: a carbon-copy paper card with
 * a torn perforation seam and a lifted shadow, at whatever scale the
 * surface needs.
 */
export function TicketFrame({ children, className, tone = "paper", tilt = 0 }: Props) {
  return (
    <div
      className={cn(
        "ticket-shadow relative border-2 border-ink/80",
        TONES[tone],
        className,
      )}
      style={tilt ? { transform: `rotate(${tilt}deg)` } : undefined}
    >
      {children}
    </div>
  );
}

/** The dotted tear-line seam that separates sections of a ticket. */
export function PerfSeam({ className }: { className?: string }) {
  return <div className={cn("perf-seam", className)} aria-hidden="true" />;
}
