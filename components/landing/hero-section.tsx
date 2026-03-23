"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-background">
      {/* Subtle grid lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        {[...Array(8)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute h-px bg-foreground/10"
            style={{ top: `${12.5 * (i + 1)}%`, left: 0, right: 0 }}
          />
        ))}
        {[...Array(12)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute w-px bg-foreground/10"
            style={{ left: `${8.33 * (i + 1)}%`, top: 0, bottom: 0 }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-32 lg:py-40">
        {/* Eyebrow */}
        <div
          className={`mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm font-display text-muted-foreground">
            <span className="w-8 h-px bg-foreground/30" />
            Keep building simple.
          </span>
        </div>

        {/* Main headline */}
        <div className="mb-10">
          <h1
            className={`text-[clamp(2.5rem,8vw,7rem)] font-display font-bold leading-[1.04] tracking-tight transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="block pb-[0.08em] text-gradient-heading">Your AI Design Manager</span>
            <span className="block pb-[0.08em] text-gradient-heading">for Construction</span>
          </h1>
        </div>

        {/* Description + CTAs */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-end">
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-xl mb-3">
              Eliminate time wasted locating the right drawings, doing repetitive checks, and fixing preventable mistakes on-site.
            </p>
            <p className="text-base text-muted-foreground/80 leading-relaxed max-w-xl">
              Ingenium reviews your design information like an experienced project team — embedding years of construction judgement into every review, reducing costly design issues, programme delays, RFIs and change orders.
            </p>
          </div>

          {/* CTAs */}
          <div
            className={`flex flex-col sm:flex-row items-start gap-4 transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <a
              href="https://calendly.com/ingeniumsoftware"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gradient inline-flex items-center justify-center gap-2 px-8 h-14 text-base font-semibold rounded-full group"
            >
              Book a Demo
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="mailto:hello@ingeniumsoftware.ai"
              className="inline-flex items-center justify-center px-8 h-14 text-base font-medium rounded-full border border-foreground/20 hover:bg-foreground/5 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
