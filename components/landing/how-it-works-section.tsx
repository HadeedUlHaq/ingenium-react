"use client";

import { useEffect, useRef, useState } from "react";
import {
  BookCheck,
  FileSearch,
  GitCompareArrows,
  Lightbulb,
  MessagesSquare,
  ShieldCheck,
} from "lucide-react";

const solutions = [
  {
    icon: FileSearch,
    title: "Spot issues early",
    description:
      "Identify inconsistencies, buildability risk and compliance issues before they become problems out on-site.",
  },
  {
    icon: GitCompareArrows,
    title: "Quantify change",
    description:
      "Track and summarise design revisions so commercial and programme impacts are clear and auditable. Know exactly what changed, when, and what it means for cost and programme.",
  },
  {
    icon: BookCheck,
    title: "Lessons Learned",
    description:
      "Apply lessons learned from past projects to new designs. Stop making the same mistakes twice.",
  },
  {
    icon: Lightbulb,
    title: "Find Solutions",
    description:
      "Proposes data-driven solutions using insights from project history, building regulations, and identifies compliant products that meet the design requirements.",
  },
  {
    icon: ShieldCheck,
    title: "Compile Evidence",
    description:
      "View retrieved source documents to check findings and compile design packs - whether for Gateway 2, tender submissions, or technical workshops.",
  },
  {
    icon: MessagesSquare,
    title: "Share Findings",
    description:
      "Auto-generate RFIs and export reports for design reviews, technical workshops and email communications so that verified issues can be acted upon.",
  },
] as const;

export function HowItWorksSection() {
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
      id="solution"
      ref={sectionRef}
      className="site-section overflow-hidden border-t border-foreground/12 bg-[linear-gradient(180deg,rgba(0,24,32,0.015),rgba(0,24,32,0)_42%)]"
    >
      <div className="site-shell">
        <div
          className={`site-intro max-w-4xl transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <span className="site-kicker">
            The Solution
          </span>
          <h2 className="max-w-4xl text-3xl font-display leading-[1.02] tracking-tight lg:text-5xl">
            <span className="font-semibold text-gradient-heading">
              Clear design information,
            </span>
            <span className="block font-medium text-muted-foreground">
              at the right time
            </span>
          </h2>
        </div>

        <div className="grid site-grid md:grid-cols-2 xl:grid-cols-3">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;

            return (
              <article
                key={solution.title}
                className={`site-panel h-full transition-all duration-700 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 90}ms` }}
              >
                <div className="flex h-full flex-col px-6 py-6 lg:px-7 lg:py-7">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-foreground/[0.04]">
                    <Icon className="h-5 w-5 text-foreground" />
                  </div>
                  <h3 className="text-xl font-medium tracking-tight text-foreground lg:text-2xl">
                    {solution.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground lg:text-base">
                    {solution.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
