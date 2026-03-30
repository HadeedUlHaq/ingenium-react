"use client";

import { useEffect, useState, useRef } from "react";
import { CollapsibleListItem } from "./collapsible-list-item";

const examples = [
  {
    id: "fire-ductwork",
    title: "Fire Rated Ductwork Penetration Risk",
    risk: "Part B compliance failure.",
    description:
      "Ductwork passing through protected lobbies without appropriate smoke control measures creates regulatory risk. Ingenium cross-references fire strategy, architectural and MEP drawings to surface these conflicts early.",
  },
  {
    id: "window-height",
    title: "Window Height Discrepancy",
    risk: "Rework and coordination disputes.",
    description:
      "Height variances between architect and specialist contractor drawings - such as shims not being accounted for behind fixing brackets - are identified across related documents to prevent downstream installation conflict.",
  },
  {
    id: "dpc-parapet",
    title: "Missing DPC at Parapet Wall",
    risk: "Water ingress and NHBC 6.1.21 non-compliance.",
    description:
      "Parapet wall build-ups where a damp proof course is omitted despite the cavity being interrupted by masonry support are a recurring envelope failure. Ingenium analyses the wall build-up and flags this condition before construction.",
  },
];

export function InfrastructureSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
    <section ref={sectionRef} id="examples" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div
          className={`mb-16 lg:mb-20 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm font-display text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            Examples
          </span>
          <h2 className="text-4xl lg:text-6xl font-display tracking-tight">
            <span className="text-gradient-heading font-bold">Real world issues.</span>
            <br />
            <span className="text-muted-foreground font-normal">Real world consequences.</span>
          </h2>
        </div>

        <div>
          {examples.map((example, index) => (
            <CollapsibleListItem
              key={example.id}
              index={index}
              title={example.title}
              description={example.description}
              meta={
                <>
                  <span className="font-semibold text-foreground/60">Risk:</span>{" "}
                  {example.risk}
                </>
              }
              initiallyOpen={index === 0}
              animateIn
            />
          ))}
        </div>
      </div>
    </section>
  );
}
