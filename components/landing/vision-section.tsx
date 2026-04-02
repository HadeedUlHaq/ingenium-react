"use client";

import { useEffect, useRef, useState } from "react";

export function VisionSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.12 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="vision"
      ref={sectionRef}
      className="site-section overflow-hidden border-t border-foreground/12 bg-[linear-gradient(180deg,rgba(0,24,32,0.014),rgba(0,24,32,0)_44%)]"
    >
      <div className="site-shell">
        <div
          className={`site-intro max-w-4xl transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <span className="site-kicker">Our Vision</span>
          <h2 className="max-w-4xl text-3xl font-display leading-[1.02] tracking-tight lg:text-5xl">
            <span className="font-semibold text-gradient-heading">
              A world where every design
            </span>
            <span className="block font-medium text-muted-foreground">
              is instantly buildable.
            </span>
          </h2>
          <div
            className={`site-copy max-w-4xl space-y-5 text-base leading-relaxed text-muted-foreground transition-all duration-700 delay-150 lg:text-lg ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <p>
              Today, the rules that determine how buildings get built do not
              live in design software or documentation. They live in the
              experience of builders, engineers and architects, applied through
              manual design reviews, coordination meetings and on-site problem
              solving.
            </p>
            <p>
              We are building the intelligence layer that captures this tacit
              knowledge and embeds it into the design review process, applying
              the insight of an experienced project team to every design in real
              time and at scale.
            </p>
            <p>
              By combining real project outcomes, design information,
              regulatory requirements, designers judgement and the practical
              knowledge of builders, our platform ensures designs are not only
              compliant but truly buildable.
            </p>
            <p className="font-medium text-foreground">
              The result is a future where designers design, builders build,
              and the review in between happens automatically.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
