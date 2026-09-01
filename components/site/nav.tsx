"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // A menu open behind a scrolled-away page is a trap on phones.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-shadow duration-200",
        scrolled && "shadow-[0_10px_30px_-16px_oklch(0_0_0/0.9)]",
      )}
    >
      <div
        className={cn(
          "brushed border-b border-white/10 transition-colors duration-200",
          scrolled ? "bg-gunmetal-deep/95 backdrop-blur-sm" : "",
        )}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 lg:px-8">
          <a href="#home" className="flex shrink-0 items-center" aria-label="Hadeed Ul Haq, home">
            <Image
              src="/logo-plate.png"
              alt="Hadeed Ul Haq — Live Smash Burgers"
              width={2172}
              height={724}
              priority
              sizes="160px"
              className="h-11 w-auto sm:h-12"
            />
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium tracking-[0.1em] text-steel-mid uppercase transition-colors hover:text-steel"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#booking"
              className="plate-press brushed plate-panel px-5 py-2.5 font-plate text-base tracking-wide text-ember-hot uppercase"
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
            className="plate-press brushed plate-panel flex size-11 items-center justify-center text-steel lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className="brushed h-[calc(100dvh-4.5rem)] overflow-y-auto border-b border-white/10 px-5 pt-2 pb-8 lg:hidden"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block border-b border-white/10 py-4 font-plate text-2xl tracking-wide text-steel uppercase"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#booking"
            onClick={() => setOpen(false)}
            className="plate-press mt-6 block bg-ember px-5 py-4 text-center font-plate text-xl tracking-wide text-white uppercase"
          >
            Book Live Catering
          </a>
        </nav>
      ) : null}
    </header>
  );
}
