"use client";

import Image from "next/image";
import Link from "next/link";
import { DottedMap } from "@/components/ui/dotted-map";
import { footerLinkGroups, siteConfig } from "@/lib/site";

export function FooterSection() {
  return (
    <footer className="relative overflow-hidden border-t border-foreground/10 bg-white text-foreground">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(255,255,255,1))]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(1,212,128,0.025)_0%,rgba(72,222,220,0.035)_100%)]" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <DottedMap
          width={180}
          height={90}
          mapSamples={5200}
          dotRadius={0.18}
          dotColor="rgba(1,212,128,0.18)"
          className="absolute -right-[10%] bottom-[-8%] h-[142%] w-[132%] [mask-image:radial-gradient(82%_78%_at_70%_56%,black,transparent_92%)]"
        />
        <DottedMap
          width={180}
          height={90}
          mapSamples={5200}
          dotRadius={0.18}
          dotColor="rgba(72,222,220,0.18)"
          className="absolute -right-[12%] bottom-[-10%] h-[148%] w-[136%] [mask-image:radial-gradient(84%_80%_at_74%_50%,black,transparent_92%)]"
        />
      </div>

      <div className="site-shell relative z-10">
        <div className="grid gap-10 py-14 lg:grid-cols-[minmax(0,1.2fr)_repeat(3,minmax(0,0.8fr))] lg:gap-8 lg:py-16">
          <div className="max-w-sm">
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/ingenium-software-logo.png"
                alt="Ingenium Software"
                width={195}
                height={40}
                className="h-8 w-auto object-contain"
              />
            </Link>

            <p className="mt-5 text-base font-medium leading-relaxed text-foreground/74">
              AI Design Review for Construction Teams. Keep building simple.
            </p>

            <div className="mt-6 space-y-3 text-sm text-muted-foreground">
              <p>
                Review drawings faster, surface risk earlier, and keep design
                decisions grounded in source evidence.
              </p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex text-foreground/72 transition-colors hover:text-foreground"
              >
                {siteConfig.email}
              </a>
            </div>
          </div>

          {Object.entries(footerLinkGroups).map(([title, links]) => (
            <div key={title}>
              <h3 className="site-label text-foreground/48">
                {title}
              </h3>
              <ul className="mt-5 space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground/68 transition-colors hover:text-foreground"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 border-t border-foreground/10 py-5 text-sm text-foreground/52 md:flex-row md:items-center md:justify-between">
          <p>&copy; 2026 Ingenium Software. All rights reserved.</p>
          <p>Construction design review software for contractors, consultants, and developers.</p>
        </div>
      </div>
    </footer>
  );
}
