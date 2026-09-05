import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/*
 * The Counter primitives. Everything on the site is built from four
 * things: a container, a display heading with its mono subline, a
 * hairline rule, and a square button. No cards, no shadows, no bezels.
 */

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8", className)}>{children}</div>;
}

/**
 * The section voice: a tall condensed heading with an optional mono
 * subline beneath it. Subline below, never above - the heading carries
 * its own weight.
 */
export function SectionHeading({
  children,
  sub,
  tone = "dark",
  className,
}: {
  children: ReactNode;
  sub?: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div className={className}>
      <h2 className={cn("display text-[2.75rem] sm:text-6xl lg:text-[4rem]", dark ? "text-white" : "text-black")}>
        {children}
      </h2>
      {sub ? (
        <p className={cn("mono mt-3 max-w-2xl text-[0.95rem]", dark ? "text-grey" : "text-grey-ink")}>{sub}</p>
      ) : null}
    </div>
  );
}

/** A hairline rule. The only divider in this world. */
export function Rule({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return <hr className={cn("h-px border-0", tone === "dark" ? "bg-line" : "bg-line-dark", className)} />;
}

/** Kept for older imports. */
export const Seam = Rule;

type ButtonProps = {
  href: string;
  children: ReactNode;
  /** light: white on black sections. dark: black on white panels. ghost: outlined on black. */
  tone?: "light" | "dark" | "ghost";
  className?: string;
  onClick?: () => void;
};

/** A square counter-ticket button in display caps. */
export function Button({ href, children, tone = "light", className, onClick }: ButtonProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        "press inline-flex items-center justify-center rounded-[2px] px-7 py-3.5 text-center display text-xl",
        tone === "light" && "bg-white text-black hover:bg-off-white",
        tone === "dark" && "bg-black text-white hover:bg-black-3",
        tone === "ghost" && "border border-white text-white hover:bg-white hover:text-black",
        className,
      )}
    >
      {children}
    </a>
  );
}
