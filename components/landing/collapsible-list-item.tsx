"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type CollapsibleListItemProps = {
  index: number;
  title: string;
  description: string;
  meta?: ReactNode;
  initiallyOpen?: boolean;
  animateIn?: boolean;
};

export function CollapsibleListItem({
  index,
  title,
  description,
  meta,
  initiallyOpen = false,
  animateIn = false,
}: CollapsibleListItemProps) {
  const [isOpen, setIsOpen] = useState(initiallyOpen);
  const [isVisible, setIsVisible] = useState(!animateIn);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animateIn) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (itemRef.current) observer.observe(itemRef.current);
    return () => observer.disconnect();
  }, [animateIn]);

  return (
    <div
      ref={itemRef}
      className={cn(
        "border-b border-foreground/10 transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
      style={animateIn ? { transitionDelay: `${index * 100}ms` } : undefined}
    >
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="group flex w-full items-center justify-between gap-6 py-8 text-left"
        aria-expanded={isOpen}
      >
        <div className="flex items-start gap-6">
          <span className="mt-1 shrink-0 font-mono text-sm text-muted-foreground">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="text-xl font-display transition-all duration-300 group-hover:text-gradient-heading lg:text-2xl">
              {title}
            </h3>
            {meta ? <div className="mt-1 text-sm text-muted-foreground">{meta}</div> : null}
          </div>
        </div>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300",
            isOpen && "rotate-180"
          )}
        />
      </button>

      <div
        className={cn(
          "overflow-hidden transition-all duration-500 ease-in-out",
          isOpen ? "max-h-[28rem] pb-8 opacity-100" : "max-h-0 pb-0 opacity-0"
        )}
      >
        <p className="pl-12 text-lg leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}
