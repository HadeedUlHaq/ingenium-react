import { PhotoSlot } from "@/components/site/photo-slot";
import { Container, SectionHeading } from "@/components/site/plate";

const SHOTS = [
  { slot: "gallery-1", brief: "The fries, the sauce, a hand reaching in." },
  { slot: "gallery-2", brief: "The setup from the guests' side of the counter." },
  { slot: "gallery-3", brief: "A burger held up, evening light behind it." },
] as const;

export function Gallery() {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <SectionHeading>From the Griddle</SectionHeading>
        <ul className="mt-8 grid gap-4 sm:grid-cols-3">
          {SHOTS.map((s) => (
            <li key={s.slot}>
              <PhotoSlot
                slot={s.slot}
                brief={s.brief}
                alt="Iron Burger at an event"
                sizes="(max-width: 640px) 100vw, 33vw"
                className="aspect-[4/5]"
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
