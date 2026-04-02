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
      className="site-section overflow-hidden border-t border-foreground/12 bg-foreground/[0.03]"
    >
      <div className="site-shell">
        <div
          className={`site-intro transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="site-kicker">
            Security &amp; Privacy
          </span>
          <h2 className="max-w-4xl text-3xl font-display leading-[1.02] tracking-tight lg:text-5xl">
            <span className="font-semibold text-gradient-heading">Built for enterprise.</span>
            <span className="block font-medium text-muted-foreground">Trusted from day one.</span>
          </h2>
        </div>

        <div className="grid site-grid md:grid-cols-3">
          {securityFeatures.map((feature, index) => (
            <div
              key={feature.title}
              className={`site-panel group transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="px-6 py-6 lg:px-7 lg:py-7">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-foreground/[0.04]">
                  <feature.icon className="h-5 w-5 text-foreground" />
                </div>
                <h3 className="text-xl font-medium tracking-tight transition-transform duration-300 group-hover:translate-x-1">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground lg:text-base">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
