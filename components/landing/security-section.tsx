"use client";

import { useEffect, useState, useRef } from "react";
import { Shield, Lock, Layers } from "lucide-react";

const securityFeatures = [
  {
    icon: Shield,
    title: "Data Security",
    description:
      "Encryption in transit and at rest, with role-based access controls aligned to Cyber Essentials standards.",
  },
  {
    icon: Lock,
    title: "Private Cloud",
    description:
      "Securely hosted in a private environment, with deployment options aligned to your IT requirements.",
  },
  {
    icon: Layers,
    title: "Workflow Compatibility",
    description:
      "Designed to operate alongside your existing document management and BIM workflows without disrupting how your team works.",
  },
];

function GradientIcon({ Icon }: { Icon: React.ElementType }) {
  return (
    <div className="relative w-12 h-12 flex items-center justify-center">
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="icon-gradient-fill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#01D480" />
            <stop offset="100%" stopColor="#48DEDC" />
          </linearGradient>
        </defs>
      </svg>
      <Icon className="w-6 h-6" style={{ stroke: "url(#icon-gradient-fill)" }} />
    </div>
  );
}

export function SecuritySection() {
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
    <section
      id="security"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-foreground/[0.02] overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div
          className={`mb-16 lg:mb-20 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm font-display text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            Security &amp; Privacy
          </span>
          <h2 className="text-4xl lg:text-6xl font-display tracking-tight">
            <span className="text-gradient-heading font-bold">Built for enterprise.</span>
            <br />
            <span className="text-muted-foreground font-normal">Trusted from day one.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {securityFeatures.map((feature, index) => (
            <div
              key={feature.title}
              className={`p-8 border border-foreground/10 hover:border-foreground/20 transition-all duration-500 group ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <GradientIcon Icon={feature.icon} />
              <h3 className="text-xl font-display font-bold mb-3 mt-6 group-hover:translate-x-1 transition-transform duration-300">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
