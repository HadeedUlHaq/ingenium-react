"use client";

import { useEffect, useRef, useState } from "react";

export function EthosSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="site-section overflow-hidden border-t border-foreground/12 bg-foreground/[0.026]"
    >
      <div className="site-shell">
        <div
          className={`site-intro max-w-4xl transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <span className="site-kicker">
            Our Ethos
          </span>
          <h2 className="max-w-4xl text-3xl font-display leading-[1.02] tracking-tight lg:text-5xl">
            <span className="font-semibold text-gradient-heading">Keep building simple.</span>
          </h2>
          <div
            className={`site-copy max-w-4xl space-y-5 text-base leading-relaxed text-muted-foreground transition-all duration-700 delay-150 lg:text-lg ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <p>
              We have deep respect for the people who get the job done.
              Construction takes intelligence, creativity, and grit. But too
              often, that talent is buried under a lack of clear and practical
              design information.
            </p>
            <p className="font-medium text-foreground">
              Ingenium was built to change that - bringing clarity to design
              information so teams can focus on actually getting the job built.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
