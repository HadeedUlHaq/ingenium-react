import { CheckCircle2 } from "lucide-react";
import { type Order } from "@/lib/orders";
import { TicketNumber } from "@/components/ticket/ticket-number";
import { BurgerCount } from "@/components/ticket/burger-count";
import { StampButton } from "@/components/ticket/stamp-button";

type Props = {
  order: Order;
  onCollect: (id: string) => void;
  collecting?: boolean;
};

/**
 * A ready ticket on the order taker's own screen, so they can see what
 * the kitchen has finished without a second device. Tapping "Collected"
 * hands it over and clears it from this list and the KDS Ready tab.
 */
export function ReadyPickupRow({ order, onCollect, collecting }: Props) {
  return (
    <li className="ticket-shadow flex items-center gap-4 border-2 border-ink bg-pass-green-bright/40 p-4">
      <TicketNumber ticketNumber={order.ticket_number} size="md" />
      <BurgerCount quantity={order.quantity} size="lg" className="min-w-0 flex-1" />
      <StampButton
        variant="ready"
        className="min-h-14 w-auto shrink-0 px-5"
        disabled={collecting}
        onClick={() => onCollect(order.id)}
      >
        <CheckCircle2 className="size-5" strokeWidth={2.5} />
        Collected
      </StampButton>
    </li>
  );
}
