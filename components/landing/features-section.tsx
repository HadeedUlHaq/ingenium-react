"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  {
    number: "01",
    value: "4+ hrs/day",
    title: "Reviewing & coordinating technical documents",
    description: "Per person, per day. Time that could be spent on the work that actually moves a project forward.",
  },
  {
    number: "02",
    value: "10-25%",
    title: "Of project costs lost to building errors annually in the UK",
    description: "Errors that, in most cases, stem from information that was always there - just never connected.",
  },
  {
    number: "03",
    value: "30-50%",
    title: "Of defects are repeat mistakes we already know how to prevent",
    description: "The industry keeps making the same errors. Not because people aren't skilled - but because the information system fails them.",
  },
];

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`group relative transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 py-12 lg:py-20 border-b border-foreground/10">
        <div className="shrink-0">
          <span className="font-mono text-sm text-muted-foreground">{stat.number}</span>
        </div>
        <div className="flex-1 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="text-5xl lg:text-6xl font-display text-gradient-heading mb-4">
              {stat.value}
            </div>
            <h3 className="text-2xl lg:text-3xl font-display mb-4 group-hover:translate-x-2 transition-transform duration-500">
              {stat.title}
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {stat.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FeaturesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="problem" ref={sectionRef} className="relative py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-16 lg:mb-24">
          <span className="inline-flex items-center gap-3 text-sm font-display text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            The Problem
          </span>
          <h2
            className={`text-4xl lg:text-6xl font-display tracking-tight transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="text-gradient-heading font-bold">Too much time fixing problems.</span>
            <br />
            <span className="text-muted-foreground font-normal">Not enough time preventing them.</span>
          </h2>
          <p
            className={`mt-8 text-xl text-muted-foreground leading-relaxed max-w-3xl transition-all duration-700 delay-150 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Teams are expected to review impossible volumes of ever-evolving information - where a small change in one drawing can quietly affect many others. The numbers tell the story.
          </p>
        </div>

        <div>
          {stats.map((stat, index) => (
            <StatCard key={stat.number} stat={stat} index={index} />
          ))}
        </div>

        <p
          className={`mt-12 text-xl font-display text-gradient-heading transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          This isn&apos;t a people problem. It&apos;s an information problem.
        </p>
      </div>
    </section>
  );
}
