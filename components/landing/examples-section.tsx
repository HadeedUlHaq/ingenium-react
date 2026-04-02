"use client";

import { CollapsibleListItem } from "@/components/landing/collapsible-list-item";

const examples = [
  {
    title: "Fire Rated Ductwork Penetration Risk",
    risk: "Risk: Part B compliance failure.",
    body: "Ductwork passing through protected lobbies without appropriate smoke control measures creates regulatory risk. Ingenium cross-references fire strategy, architectural and MEP drawings to surface these conflicts early.",
  },
  {
    title: "Window Height Discrepancy",
    risk: "Risk: Rework and coordination disputes.",
    body: "Height variances between architect and specialist contractor drawings such as shims not being accounted for behind fixing brackets are identified across related documents to prevent downstream installation conflict.",
  },
  {
    title: "Incorrect Fire-Stopping Specification Intumescent Putty Pad",
    risk: "Risk: Fire stopping non-compliance and potential Building Regulations / fire strategy failure.",
    body: "The Employers Requirements specified a fire-rated intumescent putty pad, however the electrical contractors scope referenced a different system. Neither solution had been tested for installation within the 97 mm fire-rated wall shown on the architects drawings. Ingenium identifies specification conflicts, verifies tested wall build-ups against design details, and retrieves compliant product alternatives before installation.",
  },
  {
    title: "Missing DPC at Parapet Wall",
    risk: "Risk: Water ingress and NHBC 6.1.21 non-compliance.",
    body: "Parapet wall build-ups where a damp proof course is omitted despite the cavity being interrupted by masonry support are a recurring envelope failure. Ingenium analyses the wall build-up and flags this condition before construction.",
  },
] as const;

export function ExamplesSection() {
  return (
    <section id="examples" className="site-section border-t border-foreground/12 bg-foreground/[0.022]">
      <div className="site-shell">
        <div className="site-intro max-w-4xl">
          <span className="site-kicker">Examples</span>
          <h2 className="max-w-4xl text-3xl font-display leading-[1.02] tracking-tight lg:text-5xl">
            <span className="font-semibold text-gradient-heading">
              Real Examples
            </span>
            <span className="block font-medium text-muted-foreground">
              Ingenium is Designed to Prevent
            </span>
          </h2>
        </div>

        <div className="w-full">
          {examples.map((example, index) => (
            <CollapsibleListItem
              key={example.title}
              title={example.title}
              description={
                <>
                  <p>
                    <span className="font-semibold text-foreground">
                      {example.risk}
                    </span>
                  </p>
                  <p className="mt-4">{example.body}</p>
                </>
              }
              index={index}
              initiallyOpen={index === 0}
              animateIn
            />
          ))}
        </div>
      </div>
    </section>
  );
}
