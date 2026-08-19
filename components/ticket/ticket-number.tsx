import { cn } from "@/lib/utils";
import { formatTicket } from "@/lib/orders";

const SIZES = {
  md: "text-5xl",
  lg: "text-7xl",
  xl: "text-[6.5rem] leading-[0.9]",
} as const;

type Props = {
  ticketNumber: number;
  size?: keyof typeof SIZES;
  className?: string;
};

/** The monumental stamped ticket number every screen builds around. */
export function TicketNumber({ ticketNumber, size = "lg", className }: Props) {
  return (
    <span
      className={cn("stamp-digits font-stamp tabular-nums", SIZES[size], className)}
      aria-label={`Ticket ${formatTicket(ticketNumber)}`}
    >
      {formatTicket(ticketNumber)}
    </span>
  );
}
