import { cn } from "@/lib/utils";
import { LATE_THRESHOLD_MS, type Order } from "@/lib/orders";
import { formatElapsed } from "@/hooks/use-clock-tick";
import { TicketNumber } from "@/components/ticket/ticket-number";
import { StampButton } from "@/components/ticket/stamp-button";

type Props = {
  order: Order;
  now: number;
  onMarkReady?: (id: string) => void;
  marking?: boolean;
};

export function OrderCard({ order, now, onMarkReady, marking }: Props) {
  const elapsedMs = now - new Date(order.created_at).getTime();
  const isLate = order.status === "COOKING" && elapsedMs > LATE_THRESHOLD_MS;
  const isReady = order.status === "READY";

  return (
    <li
      className={cn(
        "ticket-shadow flex items-center gap-4 border-2 border-ink bg-paper p-4",
        isLate && "animate-flash-late border-stamp-red",
        isReady && "bg-pass-green-bright/40",
      )}
    >
      <TicketNumber ticketNumber={order.ticket_number} size="md" />
      <div className="min-w-0 flex-1">
        <p className="truncate font-stamp text-xl uppercase">{order.customer_name}</p>
        <p className="font-dotmatrix text-base tracking-[0.15em] text-ink-soft uppercase">
          {order.quantity} {order.quantity === 1 ? "burger" : "burgers"}
        </p>
        <p
          className={cn(
            "font-dotmatrix text-lg tabular-nums tracking-[0.1em]",
            isLate ? "font-bold text-stamp-red uppercase" : "text-ink-soft",
          )}
        >
          {isReady ? "Picked up" : formatElapsed(elapsedMs)}
          {isLate ? " · LATE" : ""}
        </p>
      </div>
      {onMarkReady && !isReady ? (
        <StampButton
          variant="ready"
          className="min-h-14 w-auto shrink-0 px-5"
          disabled={marking}
          onClick={() => onMarkReady(order.id)}
        >
          Ready
        </StampButton>
      ) : null}
    </li>
  );
}
