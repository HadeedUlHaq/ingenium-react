import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * A sesame stud - the badge's bun seeds, doing the job fasteners do
 * on a panel. Sizes and angles vary per corner so four of them read as
 * scattered seeds rather than a repeated sticker.
 */
export function Sesame({ className, tilt = 20 }: { className?: string; tilt?: number }) {
  return (
    <svg viewBox="0 0 24 16" aria-hidden="true" className={cn("h-2.5 w-4", className)}>
      <defs>
        <linearGradient id={`seed-${tilt}`} x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor="oklch(0.92 0.11 92)" />
          <stop offset="55%" stopColor="oklch(0.78 0.14 86)" />
          <stop offset="100%" stopColor="oklch(0.55 0.11 74)" />
        </linearGradient>
      </defs>
      <g transform={`rotate(${tilt} 12 8)`}>
        <ellipse cx="12" cy="8.8" rx="10" ry="6" fill="oklch(0 0 0 / 0.45)" />
        <ellipse cx="12" cy="8" rx="10" ry="6" fill={`url(#seed-${tilt})`} />
        <ellipse cx="9" cy="5.6" rx="4.2" ry="2" fill="oklch(1 0 0 / 0.4)" />
      </g>
    </svg>
  );
}

/**
 * The site's structural unit: a charcoal panel rimmed in gold the way
 * the brand badge is rimmed, with sesame studs at its corners. Every
 * section is built from these, so the page reads as one badge system
 * rather than a grid of generic cards.
 */
export function Plate({
  children,
  className,
  screws = true,
}: {
  children: ReactNode;
  className?: string;
  /** Kept as `screws` so existing section markup needs no changes. */
  screws?: boolean;
}) {
  return (
    <div className={cn("badge-face badge-panel", className)}>
      {screws ? (
        <>
          <Sesame tilt={22} className="absolute top-3 left-3" />
          <Sesame tilt={-14} className="absolute top-3 right-3" />
          <Sesame tilt={-32} className="absolute bottom-3 left-3" />
          <Sesame tilt={8} className="absolute right-3 bottom-3" />
        </>
      ) : null}
      {children}
    </div>
  );
}

/**
 * A gilded data plate: the brief's spec numbers (80/20, 3m x 3m,
 * 160-175+) are the product's proof, so they sit on gold with dark
 * lettering - the strongest contrast pair in the system at 8.4:1.
 */
export function DataPlate({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("gilded flex flex-col items-center px-4 py-3 text-center", className)}>
      <span className="font-display text-2xl leading-none font-semibold tracking-wide text-iron-black uppercase sm:text-3xl">
        {value}
      </span>
      <span className="mt-1 text-[0.68rem] leading-tight font-semibold tracking-[0.14em] text-iron-black/75 uppercase">
        {label}
      </span>
    </div>
  );
}

/** A thin gold rule - the badge rim, and the page's only divider. */
export function Seam({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn("gold-seam w-full", className)} />;
}

/** Section heading in the chrome IRON voice. */
export function SectionHeading({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "engraved font-display text-3xl leading-[0.95] font-semibold tracking-wide uppercase sm:text-4xl lg:text-5xl",
        className,
      )}
    >
      {children}
    </h2>
  );
}
