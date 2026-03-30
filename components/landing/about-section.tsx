"use client";

import { useEffect, useRef, useState } from "react";
import { Linkedin } from "lucide-react";

const team = [
  {
    initial: "JP",
    name: "Joe Posnett",
    role: "Founder",
    linkedin: "https://www.linkedin.com/in/joe-posnett-a1b93a338/",
  },
  {
    initial: "YK",
    name: "Yusuf Khan",
    role: "CTO",
    linkedin: "https://www.linkedin.com/in/yusuf-jkhan1/",
  },
];

export function AboutSection() {
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
      id="about-us"
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
            Who We Are
          </span>
          <h2 className="text-4xl lg:text-6xl font-display tracking-tight">
            <span className="text-gradient-heading font-bold">Shaped by what we&apos;ve lived.</span>
            <br />
            <span className="text-muted-foreground font-normal">Sharpened by what we know.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div
            className={`flex gap-6 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            {team.map((member, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-4">
                <div className="w-full aspect-[3/4] bg-foreground/5 border border-foreground/10 flex items-center justify-center group hover:bg-foreground/10 transition-colors duration-300">
                  <span className="font-display text-4xl text-foreground/20 group-hover:text-foreground/40 transition-colors duration-300">
                    {member.initial}
                  </span>
                </div>
                <div className="text-center">
                  <p className="text-base font-medium text-foreground">{member.name}</p>
                  <p className="text-sm text-muted-foreground mb-2">{member.role}</p>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-foreground/50 hover:text-foreground transition-colors duration-300"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    LinkedIn
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div
            className={`transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <p className="text-xl lg:text-2xl font-display text-gradient-heading mb-6 leading-tight">
              Construction Delivery + AI Engineering.
            </p>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Two worlds that rarely overlap - building the intelligence layer construction has been missing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
