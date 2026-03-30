"use client";

import { useEffect, useState } from "react";

export function TestimonialsSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative py-32 lg:py-40 border-t border-foreground/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            From the field
          </span>
          <div className="flex-1 h-px bg-foreground/10" />
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-8">
            <blockquote
              className={`transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-4xl">
                &ldquo;We set out to reduce the time spent reviewing and coordinating design information by 30%. By the end of the trial, a full review cycle that would normally take three days was completed in just two. The Ingenium team were hands on throughout, responsive to feedback and clearly understood the realities of live construction projects. It felt like working with an extension of our own team.&rdquo;
              </p>
            </blockquote>

            <div
              className={`mt-12 flex items-center gap-6 transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <div className="w-16 h-16 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center shrink-0">
                <span className="font-display text-2xl text-foreground">J</span>
              </div>
              <div>
                <p className="text-lg font-medium text-foreground">Joe Craven</p>
                <p className="text-muted-foreground">Operations Director</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-center">
            <div
              className={`p-8 border border-foreground/10 transition-all duration-700 delay-300 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase block mb-4">
                Key Result
              </span>
              <p className="font-display text-4xl md:text-5xl text-gradient-heading leading-tight">
                3-day review
                <br />
                in 2 days
              </p>
              <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
                A full design review cycle completed one day faster than usual.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
