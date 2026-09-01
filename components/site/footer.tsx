import Image from "next/image";
import { Mail, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { Seam } from "@/components/site/plate";

export function SiteFooter() {
  return (
    <footer className="badge-face border-t border-white/10">
      <Seam />
      <div className="mx-auto max-w-6xl px-5 py-12 lg:px-8 lg:py-16">
        <Image
          src="/iron-burger.png"
          alt="Iron Burger"
          width={1254}
          height={1254}
          sizes="200px"
          className="h-auto w-auto max-w-[12rem]"
        />

        <p className="mt-6 max-w-xl text-base leading-relaxed text-chrome-mid">
          Iron Burger &mdash; Live Smash Burger Catering across Watford, Hertfordshire,
          and Greater London.
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
          <a
            href={`mailto:${siteConfig.email}`}
            className="flex items-center gap-2.5 py-2 text-base text-chrome transition-colors hover:text-signal-red-bright"
          >
            <Mail className="size-4 shrink-0 text-signal-red-bright" aria-hidden="true" />
            {siteConfig.email}
          </a>
          <p className="flex items-center gap-2.5 py-2 text-base text-chrome">
            <MapPin className="size-4 shrink-0 text-signal-red-bright" aria-hidden="true" />
            Watford, WD24
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-chrome-mid">
            &copy; 2026 Iron Burger. All rights reserved.
          </p>
          <a
            href="/staff"
            className="py-2 text-sm tracking-[0.12em] text-chrome-mid/70 uppercase transition-colors hover:text-chrome-mid"
          >
            Staff
          </a>
        </div>
      </div>
    </footer>
  );
}
