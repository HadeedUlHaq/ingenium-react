"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <section id="book-demo" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div
          className={`relative border border-foreground transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          onMouseMove={handleMouseMove}
        >
          <div
            className="absolute inset-0 opacity-10 pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0,0,0,0.15), transparent 40%)`,
            }}
          />

          <div className="relative z-10 px-8 lg:px-16 py-16 lg:py-24">
            <div className="flex flex-col items-start gap-12">
              <div className="flex-1">
                <h2 className="text-4xl lg:text-7xl font-display tracking-tight mb-8 leading-[0.95]">
                  <span className="text-gradient-heading font-bold">Let&apos;s fix the design problem.</span>
                  <br />
                  <span className="text-muted-foreground font-normal">Together.</span>
                </h2>

                <p className="text-xl text-muted-foreground mb-12 leading-relaxed max-w-xl">
                  Now onboarding live project partners. If improving design quality is a focus for your team this year, we&apos;d love to chat.
                </p>

                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <a
                    href="https://calendly.com/ingeniumsoftware"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gradient inline-flex items-center justify-center gap-2 px-8 h-14 text-base font-semibold rounded-full group"
                  >
                    Book a Demo
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                  <a
                    href="mailto:hello@ingeniumsoftware.ai"
                    className="inline-flex items-center justify-center px-8 h-14 text-base font-medium rounded-full border border-foreground/20 hover:bg-foreground/5 transition-colors"
                  >
                    Contact Us
                  </a>
                </div>

                <p className="text-sm text-muted-foreground mt-8 font-display">
                  For all other inquiries, please contact us via email or use the form.
                </p>
              </div>
            </div>
          </div>

          <div className="absolute top-0 right-0 w-32 h-32 border-b border-l border-foreground/10" />
          <div className="absolute bottom-0 left-0 w-32 h-32 border-t border-r border-foreground/10" />
        </div>
      </div>
    </section>
  );
}
