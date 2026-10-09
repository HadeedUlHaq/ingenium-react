import { PhotoSlot } from "@/components/site/photo-slot";
import { Button, Container, SectionHeading } from "@/components/site/plate";

const PACKAGES = [
  {
    slot: "package-community-griddle",
    brief: "Thin smash burger patties searing on a steaming dark steel griddle.",
    alt: "Thin beef patties searing on a dark steel flat-top griddle with rising steam",
    name: "Community & Charity Pop-Ups",
    bestFor: "Mosques, Galas, School Fundraisers",
    included: [
      "Single Smash Burgers (80g Beef Patty, American Cheese, Crisp Lettuce, House Sauce, Toasted Brioche)",
      "Fast-line execution",
    ],
    capacity: "100 to 300+ Burgers",
  },
  {
    slot: "package-private-griddle",
    brief: "Thin smash patties topped with melted cheese on a steaming dark griddle.",
    alt: "Thin crisp-edged beef patties topped with melted golden cheese on a dark steel griddle with rising steam",
    name: "Private Celebrations",
    bestFor: "Birthdays, Weddings, Anniversaries",
    included: [
      "Dedicated grill master setup",
      "Single or Double Smash options",
      "Custom sides",
      "Tailored guest experience",
    ],
    capacity: "50 to 150 Guests",
  },
  {
    slot: "package-corporate-burger",
    brief: "A smash cheeseburger with crisp edges, pickles and sauce on a dark surface.",
    alt: "A thin smash cheeseburger with melted cheese, pickles and sauce on a charcoal-black surface",
    name: "Corporate Events",
    bestFor: "Office Lunches, Staff Days, Brand Activations",
    included: [
      "Flexible live-cooking or timed hot-drop deliveries",
      "Clean single-box packaging",
      "Itemized business invoicing",
    ],
    capacity: "Flexible",
  },
] as const;

const label = "mono text-[0.72rem] uppercase tracking-[0.14em] text-grey-ink";

export function Packages() {
  return (
    <section id="menu" className="bg-black-2 py-16 lg:py-24">
      <Container>
        <SectionHeading sub="Live service for 50 to 300+ guests. Pick the format that fits your event.">
          Catering Packages &amp; Menu
        </SectionHeading>

        <ul className="mt-10 grid gap-5 lg:grid-cols-3">
          {PACKAGES.map((pkg) => (
            <li key={pkg.name} className="flex flex-col bg-off-white text-black">
              <PhotoSlot
                slot={pkg.slot}
                brief={pkg.brief}
                alt={pkg.alt}
                tone="light"
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="aspect-[4/3]"
              />

              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <h3 className="display text-4xl leading-[0.95]">{pkg.name}</h3>

                <dl className="mt-6 flex flex-1 flex-col gap-5">
                  <div>
                    <dt className={label}>Best For</dt>
                    <dd className="mt-1.5 text-[0.95rem]">{pkg.bestFor}</dd>
                  </div>

                  <div>
                    <dt className={label}>What&apos;s Included</dt>
                    <dd className="mt-2">
                      <ul className="space-y-2">
                        {pkg.included.map((line) => (
                          <li key={line} className="flex gap-2.5 text-[0.95rem] leading-snug">
                            <span aria-hidden="true" className="mt-[0.55em] size-1.5 shrink-0 bg-black" />
                            {line}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>

                  <div className="mt-auto border-t border-line-dark pt-5">
                    <dt className={label}>Capacity</dt>
                    <dd className="display mt-1 text-3xl">{pkg.capacity}</dd>
                  </div>
                </dl>

                <Button href="#booking" tone="dark" className="mt-7 w-full">
                  Request Quote
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
