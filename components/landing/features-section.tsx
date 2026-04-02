"use client";

import { useEffect, useRef, useState } from "react";
import { Clock3, PoundSterling, Repeat2 } from "lucide-react";

const impactCards = [
  {
    icon: Clock3,
    stat: "4+ hours / day",
    lines: [
      "reviewing and coordinating technical documents, per person.",
      "Per person, per day. Time that should be spent on the work that actually moves the project forward.",
    ],
  },
  {
    icon: PoundSterling,
    stat: "10-25% of project costs",
    lines: [
      "are lost annually in the UK due to building errors.",
      "Caused by information that doesnt line up across drawings - or arrives too late to review properly.",
    ],
  },
  {
    icon: Repeat2,
    stat: "30-50% of defects",
    lines: [
      "are repeat mistakes we already know how to prevent.",
      "Because lessons from previous issues rarely get captured and shared effectively.",
    ],
  },
] as const;

export function FeaturesSection() {
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
      id="problem"
      ref={sectionRef}
      className="site-section border-t border-foreground/12 bg-foreground/[0.028] pb-12 pt-12 lg:pb-14 lg:pt-14"
    >
      <div className="site-shell">
        <div
          className={`site-intro max-w-4xl transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <span className="site-kicker">
            The Problem
          </span>
          <h2 className="max-w-4xl text-3xl font-display leading-[1.02] tracking-tight lg:text-5xl">
            <span className="font-semibold text-gradient-heading">
              Too much time fixing problems.
            </span>
            <span className="block font-medium text-muted-foreground">
              Not enough time preventing them.
            </span>
          </h2>
          <p className="site-copy max-w-3xl text-base leading-relaxed text-muted-foreground lg:text-lg">
            Teams are expected to review impossible volumes of ever-evolving
            information - where a small change in one drawing can quietly affect
            many others.
          </p>
          <p className="site-followup max-w-3xl text-base font-medium leading-relaxed text-foreground/72 lg:text-lg">
            The numbers tell the story:
          </p>
        </div>

        <div className="grid site-grid lg:grid-cols-3">
          {impactCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <article
                key={card.stat}
                className={`site-panel h-full transition-all duration-700 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <div className="flex h-full flex-col px-6 py-6 lg:px-7 lg:py-7">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-foreground/[0.04]">
                    <Icon className="h-5 w-5 text-foreground" />
                  </div>
                  <h3 className="text-2xl font-normal leading-[1.05] tracking-tight text-foreground lg:text-[1.95rem]">
                    {card.stat}
                  </h3>
                  <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground lg:text-base">
                    {card.lines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <p
          className={`site-outro max-w-3xl text-lg font-medium leading-snug tracking-tight text-foreground transition-all duration-700 delay-300 lg:text-xl ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          Thats not a people problem. Its an information problem.
        </p>
      </div>
    </section>
  );
}
