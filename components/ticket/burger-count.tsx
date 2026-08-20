import { cn } from "@/lib/utils";

const SIZES = {
  md: "text-3xl",
  lg: "text-4xl",
} as const;

type Props = {
  quantity: number;
  size?: keyof typeof SIZES;
  className?: string;
};

/**
 * The burger count, set large enough to read at arm's length - the
 * second thing every screen builds around, after the ticket number.
 */
export function BurgerCount({ quantity, size = "md", className }: Props) {
  return (
    <p className={cn("stamp-digits font-stamp tabular-nums uppercase", SIZES[size], className)}>
      {quantity} {quantity === 1 ? "burger" : "burgers"}
    </p>
  );
}
