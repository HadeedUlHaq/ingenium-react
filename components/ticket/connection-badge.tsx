import { cn } from "@/lib/utils";

type Props = {
  connected: boolean;
  className?: string;
};

/** Live/reconnecting indicator - staff need to know whether the realtime feed can be trusted. */
export function ConnectionBadge({ connected, className }: Props) {
  return (
    <span
      className={cn(
        "flex items-center gap-1.5 font-dotmatrix text-xs tracking-[0.15em] uppercase",
        connected ? "text-ink-soft" : "text-stamp-red",
        className,
      )}
    >
      <span
        className={cn("size-2 rounded-full", connected ? "bg-pass-green" : "animate-blink bg-stamp-red")}
        aria-hidden="true"
      />
      {connected ? "Live" : "Reconnecting"}
    </span>
  );
}
