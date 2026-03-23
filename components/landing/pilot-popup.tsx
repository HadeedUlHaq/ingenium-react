"use client";

import { useEffect, useState } from "react";
import { X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { BookDemoTab } from "./book-demo-tab";

export function PilotPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed || isVisible) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 45000);

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      if (scrollPercent >= 50) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isDismissed, isVisible]);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
  };

  return (
    <>
      <BookDemoTab
        aria-hidden={isVisible}
        tabIndex={isVisible ? -1 : 0}
        className={cn(
          "z-40 ease-out",
          isVisible
            ? "pointer-events-none opacity-0 scale-90"
            : "pointer-events-auto opacity-100 scale-100 delay-200"
        )}
      />

      <div
        aria-live="polite"
        aria-hidden={!isVisible}
        className={cn(
          "fixed right-0 bottom-8 z-50 w-[min(23rem,calc(100vw-1rem))] origin-bottom-right transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:bottom-10 sm:w-[23rem]",
          isVisible
            ? "pointer-events-auto opacity-100 scale-100 translate-x-0 translate-y-0"
            : "pointer-events-none opacity-0 scale-[0.32] translate-x-[24%] translate-y-[8%]"
        )}
        style={{
          clipPath: isVisible
            ? "inset(0% 0% 0% 0% round 1.5rem 0 0 1.5rem)"
            : "inset(0% 0% 0% 86% round 1.5rem 0 0 1.5rem)",
        }}
      >
        <div className="relative overflow-hidden rounded-l-[1.5rem] rounded-r-none border border-foreground/20 bg-background p-6 shadow-2xl sm:p-7">
          <button
            type="button"
            onClick={handleDismiss}
            className="absolute top-4 right-4 p-1 text-foreground/40 transition-colors duration-200 hover:text-foreground"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>

          <div
            className="absolute top-0 left-0 right-0 h-0.5"
            style={{ background: "linear-gradient(135deg, #01D480 0%, #48DEDC 100%)" }}
          />

          <p className="mb-3 pr-8 font-display text-xs uppercase tracking-widest text-muted-foreground">
            Now onboarding
          </p>
          <h3 className="mb-3 pr-8 font-display text-xl leading-tight text-gradient-heading">
            Now onboarding live project partners.
          </h3>
          <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
            If improving design quality is a focus for your team this year, we&apos;d love to chat.
          </p>

          <div className="flex flex-col gap-3">
            <a
              href="https://calendly.com/ingeniumsoftware"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleDismiss}
              className="btn-gradient inline-flex h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold group"
            >
              Request a Pilot Walkthrough
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <button
              type="button"
              onClick={handleDismiss}
              className="text-center text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
