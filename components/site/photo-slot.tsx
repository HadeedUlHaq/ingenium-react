import Image from "next/image";
import type { ReactNode } from "react";
import { photo } from "@/lib/photos";
import { cn } from "@/lib/utils";

type Props = {
  /** File stem under public/photos/, e.g. "hero" -> public/photos/hero.jpg */
  slot: string;
  /** What the photo should show; printed on the placeholder as a brief. */
  brief: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Placeholder tone: dark on black sections, light on white panels. */
  tone?: "dark" | "light";
  /** Optional overlay content (e.g. a headline over the hero). */
  children?: ReactNode;
  /** Darken the photo so white text stays legible over it. */
  scrim?: boolean;
};

/**
 * A full-bleed photo that either renders the real file or holds the
 * space for it. The aspect ratio and size live in `className`, so the
 * placeholder is pixel-identical to the photo it is waiting for. When
 * content sits over the slot, the placeholder's brief moves to a corner
 * so it never collides with a headline.
 */
export function PhotoSlot({
  slot,
  brief,
  alt,
  className,
  sizes = "100vw",
  priority,
  tone = "dark",
  children,
  scrim,
}: Props) {
  const src = photo(slot);
  const dark = tone === "dark";

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {src ? (
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" />
      ) : (
        <div
          role="img"
          aria-label={`Photo placeholder: ${alt}`}
          className={cn("absolute inset-0", dark ? "photo-slot-dark" : "photo-slot-light")}
        >
          <div
            className={cn(
              "mono text-[0.78rem] leading-relaxed",
              dark ? "text-grey" : "text-grey-ink",
              children
                ? "absolute bottom-4 left-4 max-w-[16rem] text-left"
                : "absolute inset-0 flex flex-col items-center justify-center p-6 text-center",
            )}
          >
            {!children ? <span className="display block text-2xl">Photo</span> : null}
            <span className={cn("block", !children && "mt-2 max-w-sm")}>{brief}</span>
            <span className={cn("block border-t pt-2", children ? "mt-2" : "mt-3", dark ? "border-line" : "border-line-dark")}>
              public/photos/{slot}.jpg
            </span>
          </div>
        </div>
      )}
      {src && scrim ? (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0_0_0/0.25),oklch(0_0_0/0.6))]"
        />
      ) : null}
      {children ? <div className="absolute inset-0">{children}</div> : null}
    </div>
  );
}
