"use client";

import { useEffect, useState } from "react";

export function TestimonialsSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="site-section border-t border-foreground/12 bg-[linear-gradient(180deg,rgba(0,24,32,0.012),rgba(0,24,32,0)_40%)] pt-12 lg:pt-14">
      <div className="site-shell">
        <span
          className={`site-kicker mb-4 transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          Testimonial
        </span>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-stretch">
          <div
            className={`site-panel transition-all duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <div className="px-6 py-7 lg:px-8 lg:py-8">
              <blockquote>
                <p className="text-[1.65rem] font-display leading-[1.22] text-foreground lg:text-[1.85rem]">
                  &ldquo;A full design review cycle that normally took three
                  days was completed in less than one using Ingenium. We
                  originally set out to reduce review time by 30%, but the
                  results far exceeded that.&rdquo;
                </p>
              </blockquote>

              <div className="mt-8 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-foreground/10 bg-foreground/[0.04]">
                  <span className="font-display text-xl text-foreground">J</span>
                </div>
                <div>
                  <p className="text-base font-medium text-foreground">
                    Joe Craven
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Operations Director
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`overflow-hidden rounded-[1.75rem] border border-[#0f2d37] bg-[#071820] text-white transition-all duration-700 delay-150 ${
              isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
          >
            <div className="h-full bg-[radial-gradient(circle_at_top_left,rgba(72,222,220,0.18),transparent_35%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent)] px-6 py-7 lg:px-8 lg:py-8">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-white">
                Key result
              </p>
              <p className="mt-6 font-display text-[2.25rem] leading-[1.08] text-white lg:text-[2.65rem]">
                3 days
                <br />
                to &lt;1 day
              </p>
              <p className="mt-5 text-sm leading-relaxed text-white/70">
                The initial target was a 30% reduction. The trial cycle finished
                more than 66% faster.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
