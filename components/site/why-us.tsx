import { Container, SectionHeading } from "@/components/site/plate";

const REASONS = [
  {
    figure: "160–175+",
    unit: "burgers per event",
    title: "High-Volume Capability",
    body: "Our streamlined assembly process routinely manages 160–175+ burgers per event without compromising speed or consistency.",
  },
  {
    figure: "3m × 3m",
    unit: "gazebo footprint",
    title: "Self-Contained Setup",
    body: "Compact 3m x 3m gazebo footprint with commercial-grade griddles, refrigeration, and safety barriers.",
  },
  {
    figure: "Per-head",
    unit: "or flat-rate packages",
    title: "Transparent Pricing",
    body: "Clear per-head or flat-rate event packages with automated, itemized invoicing.",
  },
] as const;

export function WhyUs() {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <SectionHeading sub="Capacity, footprint and pricing, in plain figures.">
          Why Organizers Partner With Us
        </SectionHeading>

        <ul className="mt-10 grid border-t border-line lg:grid-cols-3">
          {REASONS.map((r) => (
            <li
              key={r.title}
              className="border-b border-line py-8 lg:border-r lg:border-b-0 lg:pr-8 lg:last:border-r-0 lg:[&:not(:first-child)]:pl-8"
            >
              <p className="display text-6xl text-white lg:text-7xl">{r.figure}</p>
              <p className="mono mt-1 text-sm text-grey">{r.unit}</p>
              <h3 className="display mt-7 text-3xl text-white">{r.title}</h3>
              <p className="mt-2 max-w-md text-[0.95rem] leading-relaxed text-white/85">{r.body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
