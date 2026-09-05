"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Container, SectionHeading } from "@/components/site/plate";
import { FAQS } from "@/lib/faqs";
import { cn } from "@/lib/utils";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faqs" className="py-16 lg:py-24">
      <Container className="max-w-4xl">
        <SectionHeading>Frequently Asked Questions</SectionHeading>

        <ul className="mt-10 border-t border-line">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q} className="border-b border-line">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left"
                  >
                    <span className="display text-2xl text-white sm:text-3xl">{item.q}</span>
                    <Plus
                      aria-hidden="true"
                      strokeWidth={1.5}
                      className={cn(
                        "size-6 shrink-0 text-white transition-transform duration-200",
                        isOpen && "rotate-45",
                      )}
                    />
                  </button>
                </h3>
                {isOpen ? (
                  <div id={`faq-panel-${i}`} className="pb-6">
                    <p className="mono max-w-2xl text-[0.95rem] leading-relaxed text-grey">{item.a}</p>
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
