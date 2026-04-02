"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function CtaSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="book-demo" ref={sectionRef} className="site-section overflow-hidden border-t border-foreground/12 bg-[linear-gradient(180deg,rgba(0,24,32,0.014),rgba(0,24,32,0)_46%)]">
      <div className="site-shell">
        <div
          className={`relative overflow-hidden rounded-[2rem] border border-foreground/12 bg-[linear-gradient(145deg,rgba(255,255,255,0.92),rgba(235,244,245,0.9))] transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(72,222,220,0.18),transparent_28%),linear-gradient(135deg,transparent_0%,transparent_58%,rgba(0,24,32,0.04)_58.2%,transparent_58.8%)]" />

          <div className="relative z-10 px-6 py-8 lg:px-10 lg:py-10">
            <div className="max-w-3xl">
              <h2 className="max-w-4xl text-3xl font-display leading-[1.02] tracking-tight lg:text-5xl">
                <span className="font-semibold text-gradient-heading">
                  Let&apos;s fix the design problem.
                </span>
                <span className="block font-medium text-muted-foreground">
                  Together.
                </span>
              </h2>

              <p className="site-copy max-w-2xl text-base leading-relaxed text-muted-foreground lg:text-lg">
                Now onboarding live project partners. If improving design
                quality is a focus for your team this year, let&apos;s look at
                where the review effort is getting stuck.
              </p>

              <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <Link
                  href="/contact"
                  className="btn-gradient inline-flex h-12 items-center justify-center gap-2 rounded-full px-7 text-sm font-semibold"
                >
                  Book a Demo
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex h-12 items-center justify-center rounded-full border border-foreground/20 px-7 text-sm font-medium transition-colors hover:bg-foreground/5"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
