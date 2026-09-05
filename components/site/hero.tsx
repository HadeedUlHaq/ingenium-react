import { PhotoSlot } from "@/components/site/photo-slot";
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
      <PhotoSlot
        slot="hero"
        brief="The hero shot: one burger, close and cut, cheese mid-drip, straight off the griddle."
        alt="A smash burger straight off the griddle"
        priority
        scrim
        className="aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9] lg:max-h-[82vh]"
      >
        <div className="flex h-full items-center justify-center px-5 text-center">
          <h1 className="display max-w-5xl text-[3.25rem] text-white sm:text-7xl lg:text-[6.75rem]">
            Live-Fired Smash Burgers
            <span className="mono mt-4 block text-base normal-case tracking-[0.12em] text-white sm:text-xl">
              for private &amp; community events
            </span>
          </h1>
        </div>
      </PhotoSlot>

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
