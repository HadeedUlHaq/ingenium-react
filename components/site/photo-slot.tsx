import Image, { getImageProps } from "next/image";
import type { ReactNode } from "react";
import { photo } from "@/lib/photos";
import { cn } from "@/lib/utils";

type Props = {
  /** File stem under public/photos/, e.g. "hero" -> public/photos/hero.jpg */
  slot: string;
  /** Optional portrait crop file stem, used below the 768px breakpoint if present. */
  mobileSlot?: string;
  /** What the photo should show; printed on the placeholder as a brief. */
  brief: string;
  alt: string;
  className?: string;
  /** Image-only classes, e.g. "object-[60%_center] md:object-center". */
  imageClassName?: string;
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
  mobileSlot,
  brief,
  alt,
  className,
  imageClassName,
  sizes = "100vw",
  priority,
  tone = "dark",
  children,
  scrim,
}: Props) {
  const src = photo(slot);
  const mobileSrc = mobileSlot ? photo(mobileSlot) : null;
  const dark = tone === "dark";
  const imageClasses = cn("object-cover", imageClassName);
  const responsiveImage = src && mobileSrc && mobileSrc !== src
    ? {
        desktop: getImageProps({
          src, alt, fill: true, sizes, priority,
          loading: priority ? "eager" : "lazy",
          fetchPriority: priority ? "high" : undefined,
          className: imageClasses,
        }).props,
        mobile: getImageProps({ src: mobileSrc, alt, fill: true, sizes }).props,
      }
    : null;

  return (
    <div data-photo-slot={slot} className={cn("relative overflow-hidden", className)}>
      {src ? (
        responsiveImage ? (
          <>
            {/* getImageProps supplies optimized URLs; preload only the matching crop. */}
            {priority ? (
              <>
                <link
                  rel="preload"
                  as="image"
                  href={responsiveImage.mobile.srcSet ? undefined : responsiveImage.mobile.src}
                  imageSrcSet={responsiveImage.mobile.srcSet}
                  imageSizes={responsiveImage.mobile.sizes}
                  media="(width < 768px)"
                  fetchPriority="high"
                />
                <link
                  rel="preload"
                  as="image"
                  href={responsiveImage.desktop.srcSet ? undefined : responsiveImage.desktop.src}
                  imageSrcSet={responsiveImage.desktop.srcSet}
                  imageSizes={responsiveImage.desktop.sizes}
                  media="(min-width: 768px)"
                  fetchPriority="high"
                />
              </>
            ) : null}
            <picture>
              <source
                media="(width < 768px)"
                srcSet={responsiveImage.mobile.srcSet ?? responsiveImage.mobile.src}
                sizes={responsiveImage.mobile.sizes}
              />
              {/* One image carries the alt text for both crops; no client source swapping. */}
              <img {...responsiveImage.desktop} />
            </picture>
          </>
        ) : (
          <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className={imageClasses} />
        )
      ) : (
        <div
          role="img"
          aria-label={`Photo placeholder: ${alt}`}
          className={cn("absolute inset-0", dark ? "photo-slot-dark" : "photo-slot-light")}
        >
          <div
            className={cn(
              "mono text-sm leading-relaxed",
              dark ? "text-grey" : "text-grey-ink",
              children
                ? "absolute bottom-4 left-4 right-4 max-w-[16rem] text-left"
                : "absolute inset-0 flex flex-col items-center justify-center p-6 text-center",
            )}
          >
            <span className={cn("block", !children && "mt-2 max-w-sm")}>{brief}</span>
            <span className={cn("block border-t pt-2", children ? "mt-2" : "mt-3", dark ? "border-line" : "border-line-dark")}>
              Photo forthcoming
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
