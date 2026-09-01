import { DataPlate, Plate, SectionHeading } from "@/components/site/plate";

const REASONS = [
  {
    spec: "160–175+",
    specLabel: "Burgers per event",
    title: "High-Volume Capability",
    body: "Our streamlined assembly process routinely manages 160–175+ burgers per event without compromising speed or consistency.",
  },
  {
    spec: "3m × 3m",
    specLabel: "Gazebo footprint",
    title: "Self-Contained Setup",
    body: "Compact 3m x 3m gazebo footprint with commercial-grade griddles, refrigeration, and safety barriers.",
  },
  {
    spec: "Per-head",
    specLabel: "Or flat rate",
    title: "Transparent Pricing",
    body: "Clear per-head or flat-rate event packages with automated, itemized invoicing.",
  },
] as const;

export function WhyUs() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <SectionHeading>Why Organizers Partner With Us</SectionHeading>

        <ul className="mt-10 grid gap-4 lg:grid-cols-3">
          {REASONS.map((reason) => (
            <li key={reason.title}>
              <Plate className="flex h-full flex-col gap-5 px-6 py-8 sm:px-7">
                <DataPlate
                  value={reason.spec}
                  label={reason.specLabel}
                  className="self-start"
                />
                <div>
                  <h3 className="engraved font-display text-2xl tracking-wide uppercase">
                    {reason.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-chrome-mid">{reason.body}</p>
                </div>
              </Plate>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
