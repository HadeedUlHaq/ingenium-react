import Image from "next/image";
import { BadgeCheck, Flame, ShieldCheck } from "lucide-react";
import { Plate } from "@/components/site/plate";

const BADGES = [
  { icon: BadgeCheck, text: "100% Halal Certified Ingredients" },
  { icon: Flame, text: "High-Capacity Live Production (80+ Burgers/Hr)" },
  { icon: ShieldCheck, text: "Fully Insured & Commercial Hygiene Setup" },
] as const;

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-24">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <Plate className="shine-sweep relative overflow-hidden px-6 py-10 sm:px-10 sm:py-14 lg:px-16 lg:py-20">
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <Image
              src="/iron-burger.png"
              alt="Iron Burger"
              width={1254}
              height={1254}
              priority
              sizes="(max-width: 640px) 70vw, 320px"
              className="mx-auto h-auto w-full max-w-[20rem]"
            />

            <h1 className="engraved mt-10 font-display text-[2.6rem] leading-[0.92] tracking-wide uppercase sm:text-6xl lg:text-7xl">
              Live-Fired Smash Burgers for Private &amp; Community Events
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-chrome-mid sm:text-lg">
              Fresh 80/20 grass-fed beef smashed live on-site, melted cheese, and our signature
              house sauce&mdash;served piping hot straight off the griddle across Watford and
              Hertfordshire.
            </p>

            <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row">
              <a
                href="#booking"
                className="press bg-signal-red px-8 py-4 text-center font-display text-xl tracking-wide text-white uppercase shadow-[0_10px_28px_-12px_var(--signal-red)]"
              >
                Request Event Quote
              </a>
              <a
                href="#menu"
                className="press badge-face badge-panel px-8 py-4 text-center font-display text-xl tracking-wide text-chrome uppercase"
              >
                View Menu Packages
              </a>
            </div>
          </div>
        </Plate>

        <ul className="mt-5 grid gap-3 sm:grid-cols-3">
          {BADGES.map(({ icon: Icon, text }) => (
            <li key={text}>
              <Plate
                screws={false}
                className="flex h-full items-center gap-3 px-4 py-4 sm:flex-col sm:gap-2 sm:py-5 sm:text-center"
              >
                <Icon className="size-6 shrink-0 text-signal-red-bright" strokeWidth={2} aria-hidden="true" />
                <span className="text-sm leading-snug font-medium text-chrome">{text}</span>
              </Plate>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
