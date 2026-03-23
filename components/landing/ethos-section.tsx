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
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm font-display text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            Our Ethos
          </span>
          <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-12">
            <span className="text-gradient-heading font-bold">Restore clarity.</span>
            <br />
            <span className="text-muted-foreground font-normal">Keep building simple.</span>
          </h2>
        </div>

        <div
          className={`max-w-4xl transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed mb-8">
            We have deep respect for the people who get the job done. Construction takes intelligence, creativity, and grit. But too often, that talent is buried under a lack of clear and practical design information.
          </p>
          <p className="text-xl lg:text-2xl font-display text-gradient-heading leading-relaxed">
            Ingenium exists to fix that. To restore clarity. To keep building simple.
          </p>
        </div>
      </div>
    </section>
  );
}
