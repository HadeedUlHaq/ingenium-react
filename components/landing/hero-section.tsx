"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="site-page-offset relative flex min-h-[76vh] items-center overflow-hidden bg-background">
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        {[...Array(8)].map((_, index) => (
          <div
            key={`hero-h-${index}`}
            className="absolute h-px bg-foreground/10"
            style={{ top: `${12.5 * (index + 1)}%`, left: 0, right: 0 }}
          />
        ))}
        {[...Array(12)].map((_, index) => (
          <div
            key={`hero-v-${index}`}
            className="absolute w-px bg-foreground/10"
            style={{ left: `${8.33 * (index + 1)}%`, top: 0, bottom: 0 }}
          />
        ))}
      </div>

      <div className="site-shell relative z-10 w-full py-14 lg:py-[4.5rem]">
        <div className="site-intro mb-0 max-w-5xl text-left">
          <h1
            className={`block max-w-5xl text-[clamp(3.35rem,6.2vw,5.8rem)] font-display font-semibold leading-[1.02] tracking-tight transition-all duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <span className="block pb-[0.12em] text-gradient-hero">
              Keep building simple.
            </span>
          </h1>

          <p
            className={`mt-4 max-w-4xl text-[clamp(1.3rem,2.2vw,1.95rem)] font-medium leading-[1.12] tracking-tight text-foreground/70 transition-all duration-700 lg:whitespace-nowrap ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            AI Design Review for Construction Teams
          </p>

          <div
            className={`mt-7 max-w-5xl transition-all duration-700 delay-200 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <p className="text-lg leading-relaxed text-muted-foreground lg:whitespace-nowrap lg:text-[1.28rem]">
              Free your teams from wasted time searching drawings and fixing
              costly site mistakes.
            </p>
            <p className="site-copy max-w-3xl text-base leading-relaxed text-muted-foreground lg:text-lg">
              Ingenium reviews your design information like an experienced
              project team - identifying clashes, compliance gaps and
              buildability risks early to reduce RFIs, change orders and
              construction risk.
            </p>

            <div className="mt-9">
              <Link
                href="/contact"
                className="btn-gradient inline-flex h-12 items-center justify-center gap-2 rounded-full px-7 text-sm font-semibold"
              >
                Contact Us
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
