import { HeroVideo } from "@/components/site/hero-video";
import { Button, Container } from "@/components/site/plate";

/* The brief's three trust badges, set as figures the way a counter
   prints its promises: the number first, the meaning under it. */
const PROOF = [
  { figure: "100%", label: "Halal certified ingredients" },
  { figure: "80+/hr", label: "High-capacity live production" },
  { figure: "Insured", label: "Fully insured, commercial hygiene setup" },
] as const;

export function Hero() {
  return (
    <section id="home" className="pt-16 lg:pt-20">
      <div className="relative isolate flex min-h-[660px] overflow-hidden bg-black md:min-h-[620px] lg:min-h-[700px]">
        <HeroVideo />
        <Container className="relative z-10 flex items-end pb-12 pt-32 md:items-center md:py-24">
          <div className="w-full max-w-xl text-center md:max-w-md md:text-left lg:max-w-xl">
            <h1 className="display max-w-xl text-[2.75rem] text-white sm:text-7xl lg:text-[6rem]">
              Live-Fired Smash Burgers
              <span className="mono mt-3 block text-base leading-relaxed normal-case tracking-[0.04em] text-white sm:text-xl">
                for private &amp; community events
              </span>
            </h1>
          </div>
        </Container>
      </div>

      <Container className="py-10 lg:py-14">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <p className="mono max-w-2xl text-[0.95rem] leading-relaxed text-grey sm:text-base">
            Fresh 80/20 grass-fed beef smashed live on-site, melted cheese, and our signature
            house sauce&mdash;served piping hot straight off the griddle across Watford and
            Hertfordshire.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="#booking">Request Event Quote</Button>
            <Button href="#menu" tone="ghost">
              View Menu Packages
            </Button>
          </div>
        </div>

        <ul className="mt-12 grid border-t border-line sm:grid-cols-3">
          {PROOF.map((item) => (
            <li
              key={item.figure}
              className="border-b border-line py-5 sm:border-r sm:border-b-0 sm:pr-6 sm:last:border-r-0 sm:[&:not(:first-child)]:pl-6"
            >
              <p className="display text-4xl text-white">{item.figure}</p>
              <p className="mono mt-1 text-sm text-grey">{item.label}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
