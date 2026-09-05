import { PhotoSlot } from "@/components/site/photo-slot";
import { Container, SectionHeading } from "@/components/site/plate";

const NON_NEGOTIABLES = [
  {
    slot: "craft-1",
    brief: "A patty hitting the griddle, the crust just forming.",
    title: "The 80/20 Smash",
    body: "Premium ground beef pressed hard onto high-heat steel to create a deeply caramelized, savory crust that seals in natural juices.",
  },
  {
    slot: "craft-2",
    brief: "The house sauce being spooned or drizzled onto a burger.",
    title: "The Signature House Sauce",
    body: "Our custom 50/50 blend of tangy burger sauce and rich chili mayo—delivering a creamy, zesty finish balanced for guests of all ages.",
  },
  {
    slot: "craft-3",
    brief: "The stall in action: griddle, steam, and a queue of guests.",
    title: "The Live Experience",
    body: "Hot, fresh food served with real sizzle and aroma, elevating the atmosphere of your event.",
  },
] as const;

export function Craft() {
  return (
    <section id="about" className="py-16 lg:py-24">
      <Container>
        <SectionHeading sub="Live smash burgers, cooked to order at your venue.">
          Engineered for Speed. Crafted for Maximum Sear.
        </SectionHeading>

        <div className="mt-8 grid gap-6 text-base leading-relaxed text-white/85 lg:grid-cols-2 lg:gap-10 lg:text-lg">
          <p>
            We believe great burgers shouldn&apos;t be sitting under heat lamps or sitting in
            delivery boxes. We bring a commercial live-cooking setup directly to your venue,
            smashing fresh 80g beef patties to order right in front of your guests.
          </p>
          <p>
            By combining high-heat searing techniques with our custom Kitchen Display System
            (KDS), we eliminate long lines while delivering crisp, lace-edged patties, juicy
            centers, and pillowy toasted brioche every single time.
          </p>
        </div>

        <h3 className="display mt-16 text-3xl text-white sm:text-4xl">Our Three Non-Negotiables</h3>

        <ul className="mt-6 grid gap-8 sm:grid-cols-3 sm:gap-5">
          {NON_NEGOTIABLES.map((item) => (
            <li key={item.title}>
              <PhotoSlot
                slot={item.slot}
                brief={item.brief}
                alt={item.title}
                sizes="(max-width: 640px) 100vw, 33vw"
                className="aspect-[4/3]"
              />
              <h4 className="display mt-4 text-3xl text-white">{item.title}</h4>
              <p className="mono mt-2 text-[0.9rem] leading-relaxed text-grey">{item.body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
