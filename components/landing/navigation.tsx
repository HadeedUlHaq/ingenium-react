"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { primaryNavLinks, siteConfig } from "@/lib/site";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed z-50 transition-all duration-500 ${
        isScrolled ? "left-4 right-4 top-4" : "left-0 right-0 top-0"
      }`}
    >
      <nav
        className={`mx-auto transition-all duration-500 ${
          isScrolled || isMobileMenuOpen
            ? "max-w-[1200px] rounded-2xl border border-foreground/10 bg-background/82 shadow-lg backdrop-blur-xl"
            : "max-w-[1400px] bg-transparent"
        }`}
      >
        <div
          className={`flex items-center justify-between px-6 transition-all duration-500 lg:px-8 ${
            isScrolled ? "h-14" : "h-[4.5rem] lg:h-20"
          }`}
        >
          <Link href="/" className="flex items-center">
            <Image
              src={siteConfig.logoPath}
              alt="Ingenium Software"
              width={195}
              height={40}
              priority
              className={`h-auto w-auto object-contain transition-all duration-500 ${
                isScrolled ? "max-h-7" : "max-h-8 lg:max-h-9"
              }`}
            />
          </Link>

          <div className="hidden items-center gap-8 md:flex lg:gap-10">
            {primaryNavLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="group relative text-sm text-foreground/70 transition-colors duration-300 hover:text-foreground"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-foreground transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-4 md:flex">
            <Link
              href="/contact"
              className={`btn-gradient inline-flex items-center justify-center rounded-full font-semibold transition-all duration-500 ${
                isScrolled ? "h-9 px-4 text-xs" : "h-10 px-6 text-sm"
              }`}
            >
              Book a Demo
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((current) => !current)}
            className="p-2 md:hidden"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 bg-background transition-all duration-500 md:hidden ${
          isMobileMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute right-8 top-8 rounded-full border border-foreground/10 p-3 transition-colors hover:bg-foreground/5"
          aria-label="Close menu"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="flex h-full flex-col px-8 pb-8 pt-28">
          <div className="flex flex-1 flex-col justify-center gap-7">
            {primaryNavLinks.map((link, index) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-4xl font-medium tracking-tight text-foreground transition-all duration-500 hover:text-muted-foreground ${
                  isMobileMenuOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
                style={{
                  transitionDelay: isMobileMenuOpen ? `${index * 70}ms` : "0ms",
                }}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div
            className={`border-t border-foreground/10 pt-6 transition-all duration-500 ${
              isMobileMenuOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: isMobileMenuOpen ? "240ms" : "0ms" }}
          >
            <Link
              href="/contact"
              className="btn-gradient flex h-12 items-center justify-center rounded-full text-sm font-semibold"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Book a Demo
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
