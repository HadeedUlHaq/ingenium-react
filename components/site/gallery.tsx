import { PhotoSlot } from "@/components/site/photo-slot";
import { Container, SectionHeading } from "@/components/site/plate";

const SHOTS = [
  {
    slot: "crisp-edge-dark",
    brief: "Crisp patty edges and melted cheese in dark, warm lighting.",
    alt: "Smash cheeseburger with thin caramelized crisp edges and melted cheese in dark lighting",
    caption: "The crisp edge",
    position: "object-center",
  },
  {
    slot: "griddle-gloved",
    brief: "Thin beef patties pressed onto a hot steel griddle.",
    alt: "A cook wearing a black glove pressing thin beef patties on a dark steel flat-top griddle",
    caption: "Pressed onto hot steel",
    position: "object-center",
  },
  {
    slot: "layered-burger-dark",
    brief: "Floating smash burger layers against a dark charcoal background.",
    alt: "An exploded smash cheeseburger with floating brioche bun, beef, cheese, sauce and pickles against a charcoal-black background",
    caption: "Layered to perfection",
    position: "object-center",
  },
] as const;

export function Gallery() {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <SectionHeading sub="A closer look at smash burgers and flat-top cooking.">
          From the Griddle
        </SectionHeading>
        <ul className="mt-8 grid gap-4 sm:grid-cols-3">
          {SHOTS.map((s) => (
            <li key={s.slot}>
              <PhotoSlot
                slot={s.slot}
                brief={s.brief}
                alt={s.alt}
                sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 1280px) 33vw, 400px"
                imageClassName={s.position}
                className="aspect-[4/3]"
              />
              <p className="mono mt-3 text-sm text-grey">{s.caption}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
