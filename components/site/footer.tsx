import Image from "next/image";
import { navLinks, siteConfig } from "@/lib/site";
import { Container } from "@/components/site/plate";

const linkClass = "display block py-1.5 text-2xl text-white/85 transition-colors hover:text-white";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <Container className="grid gap-10 py-12 lg:grid-cols-[1fr_auto_auto] lg:gap-20 lg:py-16">
        <div>
          <p className="mono text-sm leading-relaxed text-grey">Iron Burger &mdash;</p>
          <p className="mono mt-1 max-w-sm text-sm leading-relaxed text-white">
            Live Smash Burger Catering across Watford, Hertfordshire, and Greater London.
          </p>
        </div>

        <nav aria-label="Footer">
          {navLinks.map((link) => (
            <a key={link.href} href={`/${link.href}`} className={linkClass}>
              {link.label}
            </a>
          ))}
        </nav>

        <div>
          <a href={`mailto:${siteConfig.email}`} className={linkClass}>
            Contact
          </a>
          <p className="mono py-1.5 text-sm text-grey">{siteConfig.email}</p>
          <p className="mono py-1.5 text-sm text-grey">Watford, WD24</p>
          <a href="/privacy" className={`${linkClass} mt-2`}>
            Privacy Policy
          </a>
          <a href="/staff" className="mono mt-2 block py-1.5 text-xs text-grey uppercase tracking-[0.12em] hover:text-white">
            Staff
          </a>
        </div>
      </Container>

      {/* The sign-off: the wordmark at the width of the page, printed
          with a little grit so it reads as ink, not as a web font. */}
      <svg width="0" height="0" aria-hidden="true" className="absolute">
        <filter id="grit" x="-2%" y="-2%" width="104%" height="104%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.2" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      <div className="overflow-hidden px-4 pt-4 sm:px-6">
        <div
          aria-hidden="true"
          className="display flex items-center gap-[2.5vw] whitespace-nowrap text-[15vw] leading-none text-white sm:text-[19vw] 2xl:text-[19rem]"
          style={{ filter: "url(#grit)" }}
        >
          <Image
            src="/iron-burger.png"
            alt=""
            width={1254}
            height={1254}
            sizes="15vw"
            className="h-[0.85em] w-[0.85em] shrink-0"
          />
          <span>Iron Burger</span>
        </div>
      </div>

      <Container className="flex flex-col gap-2 py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="mono text-xs text-grey">&copy; 2026 Iron Burger. All rights reserved.</p>
        <p className="mono text-xs text-grey">{siteConfig.areaServed}</p>
      </Container>
    </footer>
  );
}
