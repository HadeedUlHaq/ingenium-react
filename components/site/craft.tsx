import { DataPlate, Plate, SectionHeading } from "@/components/site/plate";

const NON_NEGOTIABLES = [
  {
    spec: "80/20",
    specLabel: "Beef blend",
    title: "The 80/20 Smash",
    body: "Premium ground beef pressed hard onto high-heat steel to create a deeply caramelized, savory crust that seals in natural juices.",
  },
  {
    spec: "50/50",
    specLabel: "Sauce blend",
    title: "The Signature House Sauce",
    body: "Our custom 50/50 blend of tangy burger sauce and rich chili mayo—delivering a creamy, zesty finish balanced for guests of all ages.",
  },
  {
    spec: "Live",
    specLabel: "Cooked on-site",
    title: "The Live Experience",
    body: "Hot, fresh food served with real sizzle and aroma, elevating the atmosphere of your event.",
  },
] as const;

export function Craft() {
  return (
    <section id="about" className="py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="max-w-3xl">
          <SectionHeading>Engineered for Speed. Crafted for Maximum Sear.</SectionHeading>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-steel-mid sm:text-lg">
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
        </div>

        <h3 className="engraved mt-14 font-plate text-2xl tracking-wide uppercase">
          Our Three Non-Negotiables
        </h3>

        <ul className="mt-6 grid gap-4 lg:grid-cols-3">
          {NON_NEGOTIABLES.map((item) => (
            <li key={item.title}>
              <Plate className="flex h-full flex-col gap-5 px-6 py-8 sm:px-7">
                <DataPlate
                  value={item.spec}
                  label={item.specLabel}
                  className="self-start !bg-none bg-gunmetal-deep"
                />
                <div>
                  <h4 className="engraved font-plate text-2xl tracking-wide uppercase">
                    {item.title}
                  </h4>
                  <p className="mt-3 text-base leading-relaxed text-steel-mid">{item.body}</p>
                </div>
              </Plate>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
