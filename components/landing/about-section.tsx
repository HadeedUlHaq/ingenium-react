"use client";

import { useEffect, useRef, useState } from "react";
import { Linkedin } from "lucide-react";
import Image from "next/image";

const team = [
  {
    initial: "JP",
    name: "Joe Posnett",
    role: "Founder",
    linkedin: "https://www.linkedin.com/in/joe-posnett-a1b93a338/",
    imagePath: "/Joe Posnett.jpg",
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
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about-us"
      ref={sectionRef}
      className="site-section overflow-hidden bg-foreground/[0.028]"
    >
      <div className="site-shell">
        <div
          className={`site-intro max-w-3xl transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <span className="site-kicker">
            Who We Are
          </span>
          <h2 className="max-w-4xl text-3xl font-display leading-[1.02] tracking-tight lg:text-5xl">
            <span className="font-semibold text-gradient-heading">
              Built by people whove delivered construction projects.
            </span>
            <span className="block font-medium text-muted-foreground">
              Engineered with the AI expertise to solve them.
            </span>
          </h2>
        </div>

        <div className="mx-auto grid max-w-4xl site-grid md:grid-cols-2">
          {team.map((member, index) => (
            <article
              key={member.name}
              className={`site-panel transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <div className="flex h-full flex-col items-center px-6 py-6 text-center lg:px-7 lg:py-7">
                <div className="relative flex w-full max-w-[280px] items-center justify-center overflow-hidden rounded-[1.5rem] border border-foreground/10 bg-foreground/[0.05] aspect-[4/5]">
                  {member.imagePath ? (
                    <Image
                      src={member.imagePath}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <span className="font-display text-5xl text-foreground/25">
                      {member.initial}
                    </span>
                  )}
                </div>

                <div className="mt-6">
                  <p className="text-lg font-medium text-foreground">
                    {member.name}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {member.role}
                  </p>
                </div>

                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm text-foreground/65 transition-colors hover:text-foreground"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              </div>
            </article>
          ))}
          <article
            className={`site-panel transition-all duration-700 delay-200 md:col-span-2 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <div className="px-6 py-6 lg:px-7 lg:py-7">
              <p className="max-w-3xl text-base leading-relaxed text-muted-foreground lg:text-lg">
                Our team brings together 18+ years delivering construction
                projects and over a decade building data engineering and AI
                systems.
              </p>
              <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-foreground lg:text-[1.35rem]">
                Our mission is simple: clear, reliable design information at
                the right time.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
