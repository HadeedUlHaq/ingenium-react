"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Plate, SectionHeading } from "@/components/site/plate";
import { FAQS } from "@/lib/faqs";
import { cn } from "@/lib/utils";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faqs" className="py-16 lg:py-24">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <SectionHeading>Frequently Asked Questions</SectionHeading>

        <ul className="mt-10 space-y-3">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q}>
                <Plate screws={false} className="overflow-hidden">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                    >
                      <span className="engraved font-display text-xl leading-tight tracking-wide uppercase sm:text-2xl">
                        {item.q}
                      </span>
                      <Plus
                        aria-hidden="true"
                        className={cn(
                          "size-5 shrink-0 text-signal-red-bright transition-transform duration-200",
                          isOpen && "rotate-45",
                        )}
                      />
                    </button>
                  </h3>
                  {isOpen ? (
                    <div id={`faq-panel-${i}`} className="px-5 pb-5 sm:px-6">
                      <p className="border-t border-white/10 pt-4 text-base leading-relaxed text-chrome-mid">
                        {item.a}
                      </p>
                    </div>
                  ) : null}
                </Plate>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
