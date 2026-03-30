"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

const solutions = [
  {
    number: "I",
    align: "left",
    title: "Spot issues early",
    description:
      "Identify inconsistencies, buildability risk and compliance issues before they become problems out on-site. Cross-referenced across fire strategy, architectural, structural and MEP drawings.",
  },
  {
    number: "II",
    align: "right",
    title: "Quantify change",
    description:
      "Track and summarise design revisions so commercial and programme impact is clear and auditable. Know exactly what changed, when, and what it means for cost and programme.",
  },
  {
    number: "III",
    align: "left",
    title: "Lessons learned",
    description:
      "Apply lessons learned from previous projects to new designs - embedding real construction judgement into every review. Stop making the same mistakes twice.",
  },
  {
    number: "IV",
    align: "right",
    title: "Compile evidence",
    description:
      "View retrieved source documents to check findings and compile design packs - whether for Gateway 2, tender submissions, or technical workshops.",
  },
];

function SolutionCard({
  solution,
  index,
}: {
  solution: (typeof solutions)[0];
  index: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const isRight = solution.align === "right";

  return (
    <div
      ref={cardRef}
      className={`flex transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      } ${isRight ? "justify-end" : "justify-start"}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div
        className={`w-full lg:w-[60%] py-10 border-b border-white/10 ${
          isRight ? "text-right pl-8 lg:pl-0 lg:pr-0" : "pr-8 lg:pr-0"
        }`}
      >
        <span
          className="font-display text-2xl mb-3 block"
          style={{ background: "linear-gradient(135deg, #01D480 0%, #48DEDC 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
        >
          {solution.number}
        </span>
        <h3 className="text-2xl lg:text-3xl font-display font-bold mb-4 text-white">
          {solution.title}
        </h3>
        <p className="text-white leading-relaxed text-lg">
          {solution.description}
        </p>
      </div>
    </div>
  );
}

export function HowItWorksSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #001820 0%, #019DBF 100%)" }}
    >
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 40px,
            white 40px,
            white 41px
          )`,
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-16 lg:mb-24">
          <span className="inline-flex items-center gap-3 text-sm font-display text-white mb-6">
            <span className="w-8 h-px bg-white/30" />
            The Solution
          </span>
          <h2
            className={`text-4xl lg:text-6xl font-display tracking-tight transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="text-white font-bold">Get clarity,</span>
            <br />
            <span className="text-white/50 font-normal">when it counts.</span>
          </h2>
        </div>

        <div className="space-y-0">
          {solutions.map((solution, index) => (
            <SolutionCard key={solution.number} solution={solution} index={index} />
          ))}
        </div>

        <p
          className={`mt-16 text-xl lg:text-2xl font-display text-white transition-all duration-700 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Talk to it like a teammate.{" "}
          <span className="text-white font-normal">
            Without changing the way that you work.
          </span>
        </p>

        <div
          className={`mt-10 transition-all duration-700 delay-500 ${
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
        </div>
      </div>
    </section>
  );
}
