import Image from "next/image";
import { Mail, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { Seam } from "@/components/site/plate";

export function SiteFooter() {
  return (
    <footer className="brushed border-t border-white/10">
      <Seam />
      <div className="mx-auto max-w-6xl px-5 py-12 lg:px-8 lg:py-16">
        <Image
          src="/logo-plate.png"
          alt="Hadeed Ul Haq — Live Smash Burgers"
          width={2172}
          height={724}
          sizes="320px"
          className="h-auto w-full max-w-xs"
        />

        <p className="mt-6 max-w-xl text-base leading-relaxed text-steel-mid">
          Hadeed Ul Haq Catering &mdash; Live Smash Burger Catering across Watford, Hertfordshire,
          and Greater London.
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
          <a
            href={`mailto:${siteConfig.email}`}
            className="flex items-center gap-2.5 py-2 text-base text-steel transition-colors hover:text-ember-hot"
          >
            <Mail className="size-4 shrink-0 text-ember-hot" aria-hidden="true" />
            {siteConfig.email}
          </a>
          <p className="flex items-center gap-2.5 py-2 text-base text-steel">
            <MapPin className="size-4 shrink-0 text-ember-hot" aria-hidden="true" />
            Watford, WD24
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-steel-mid">
            &copy; 2026 Hadeed Ul Haq. All rights reserved.
          </p>
          <a
            href="/staff"
            className="py-2 text-sm tracking-[0.12em] text-steel-mid/70 uppercase transition-colors hover:text-steel-mid"
          >
            Staff
          </a>
        </div>
      </div>
    </footer>
  );
}
