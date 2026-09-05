"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteNav() {
  const [open, setOpen] = useState(false);

  // A menu open behind a scrolled-away page is a trap on phones.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-black">
      <div className="border-b border-line">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:h-20">
          <a href="#home" className="flex items-center gap-3" aria-label="Iron Burger, home">
            <Image
              src="/iron-burger.png"
              alt=""
              width={1254}
              height={1254}
              priority
              sizes="48px"
              className="h-9 w-9 lg:h-11 lg:w-11"
            />
            <span className="display text-2xl text-white lg:text-3xl">Iron Burger</span>
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="display text-xl text-white/80 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#booking"
              className="press display rounded-[2px] bg-white px-5 py-2 text-xl text-black hover:bg-off-white"
            >
              Book Live Catering
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex size-11 items-center justify-center text-white lg:hidden"
          >
            {open ? <X className="size-7" strokeWidth={1.75} /> : <Menu className="size-7" strokeWidth={1.75} />}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className="flex h-[calc(100dvh-4rem)] flex-col overflow-y-auto bg-black px-5 pt-4 pb-8 lg:hidden"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="display border-b border-line py-4 text-4xl text-white"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#booking"
            onClick={() => setOpen(false)}
            className="press display mt-8 block rounded-[2px] bg-white px-5 py-4 text-center text-2xl text-black"
          >
            Book Live Catering
          </a>
          <p className="mono mt-auto pt-8 text-sm text-grey">Watford &middot; Hertfordshire &middot; Greater London</p>
        </nav>
      ) : null}
    </header>
  );
}
