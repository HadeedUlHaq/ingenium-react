import { Plate, SectionHeading } from "@/components/site/plate";

const PACKAGES = [
  {
    name: "Community & Charity Pop-Ups",
    bestFor: "Mosques, Galas, School Fundraisers",
    included: [
      "Single Smash Burgers (80g Beef Patty, American Cheese, Crisp Lettuce, House Sauce, Toasted Brioche)",
      "Fast-line execution",
    ],
    capacity: "100 to 300+ Burgers",
  },
  {
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

export function Packages() {
  return (
    <section id="menu" className="py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <SectionHeading>Catering Packages &amp; Menu</SectionHeading>

        <ul className="mt-10 grid gap-4 lg:grid-cols-3">
          {PACKAGES.map((pkg) => (
            <li key={pkg.name}>
              <Plate className="flex h-full flex-col px-6 py-8 sm:px-7">
                <h3 className="engraved font-display text-2xl leading-tight tracking-wide uppercase sm:text-[1.75rem]">
                  {pkg.name}
                </h3>

                <dl className="mt-6 flex flex-1 flex-col gap-5">
                  <div>
                    <dt className="text-[0.68rem] font-semibold tracking-[0.16em] text-chrome-mid uppercase">
                      Best For
                    </dt>
                    <dd className="mt-1.5 text-base text-chrome">{pkg.bestFor}</dd>
                  </div>

                  <div>
                    <dt className="text-[0.68rem] font-semibold tracking-[0.16em] text-chrome-mid uppercase">
                      What&apos;s Included
                    </dt>
                    <dd className="mt-2">
                      <ul className="space-y-2">
                        {pkg.included.map((line) => (
                          <li key={line} className="flex gap-2.5 text-base leading-snug text-chrome">
                            <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 bg-signal-red" />
                            {line}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>

                  <div className="mt-auto border-t border-white/10 pt-5">
                    <dt className="text-[0.68rem] font-semibold tracking-[0.16em] text-chrome-mid uppercase">
                      Capacity
                    </dt>
                    <dd className="engraved mt-1 font-display text-2xl tracking-wide uppercase">
                      {pkg.capacity}
                    </dd>
                  </div>
                </dl>

                <a
                  href="#booking"
                  className="press mt-7 block bg-signal-red px-6 py-3.5 text-center font-display text-lg tracking-wide text-white uppercase"
                >
                  Request Quote
                </a>
              </Plate>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
