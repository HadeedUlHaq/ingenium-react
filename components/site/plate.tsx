import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * A machined screw head, seated in the plate. Drawn rather than iconified
 * so the slot angle can vary per corner - four identical screws read as a
 * repeated sticker, which is exactly what a real plate never looks like.
 */
export function Screw({ className, angle = 35 }: { className?: string; angle?: number }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("size-3.5", className)}>
      <defs>
        <radialGradient id={`screw-${angle}`} cx="38%" cy="32%">
          <stop offset="0%" stopColor="oklch(0.62 0.006 250)" />
          <stop offset="70%" stopColor="oklch(0.38 0.006 250)" />
          <stop offset="100%" stopColor="oklch(0.24 0.006 250)" />
        </radialGradient>
      </defs>
      <circle cx="12" cy="12" r="10" fill="oklch(0 0 0 / 0.55)" />
      <circle cx="12" cy="11" r="9" fill={`url(#screw-${angle})`} />
      <g transform={`rotate(${angle} 12 11)`}>
        <rect x="4.5" y="9.6" width="15" height="2.8" rx="1" fill="oklch(0 0 0 / 0.6)" />
        <rect x="4.5" y="9.6" width="15" height="1.2" rx="0.6" fill="oklch(1 0 0 / 0.09)" />
      </g>
    </svg>
  );
}

/**
 * The site's structural unit: a brushed-steel plate fastened at its
 * corners. Every section is built from these rather than from generic
 * cards, so the whole page reads as one machined assembly.
 */
export function Plate({
  children,
  className,
  screws = true,
}: {
  children: ReactNode;
  className?: string;
  screws?: boolean;
}) {
  return (
    <div className={cn("brushed plate-panel", className)}>
      {screws ? (
        <>
          <Screw angle={35} className="absolute top-2.5 left-2.5" />
          <Screw angle={-20} className="absolute top-2.5 right-2.5" />
          <Screw angle={72} className="absolute bottom-2.5 left-2.5" />
          <Screw angle={12} className="absolute right-2.5 bottom-2.5" />
        </>
      ) : null}
      {children}
    </div>
  );
}

/**
 * A stamped data plate: the spec-dense numbers in this brief (80g, 80/hr,
 * 3m x 3m) are the product's proof, so they get their own riveted plate
 * rather than sitting in prose.
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
    <div
      className={cn(
        "brushed plate-panel flex flex-col items-center px-4 py-3 text-center",
        className,
      )}
    >
      <span className="engraved font-plate text-2xl leading-none tracking-wide uppercase sm:text-3xl">
        {value}
      </span>
      <span className="mt-1.5 text-[0.68rem] leading-tight font-medium tracking-[0.14em] text-steel-mid uppercase">
        {label}
      </span>
    </div>
  );
}

/** The welded seam between plates - the page's only section divider. */
export function Seam({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn("plate-seam w-full", className)} />;
}

/** Section heading in the machined voice, used by every band. */
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
        "engraved font-plate text-3xl leading-[0.95] tracking-wide uppercase sm:text-4xl lg:text-5xl",
        className,
      )}
    >
      {children}
    </h2>
  );
}
