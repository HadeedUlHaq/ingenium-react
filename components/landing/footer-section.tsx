"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { AnimatedWave } from "./animated-wave";
import Link from "next/link";

const footerLinks = {
  Product: [
    { name: "How it Works", href: "/solution" },
    { name: "Examples", href: "/solution#examples" },
    { name: "Security", href: "/solution#security" },
  ],
  Company: [
    { name: "About Us", href: "/about" },
    { name: "Book a Demo", href: "https://calendly.com/ingeniumsoftware" },
  ],
  Resources: [
    { name: "FAQ's", href: "/faq" },
    { name: "Security & Data", href: "/solution#security" },
    { name: "Privacy", href: "#" },
  ],
};

const socialLinks = [
  { name: "LinkedIn", href: "https://linkedin.com" },
];

export function FooterSection() {
  return (
    <footer className="relative border-t border-foreground/10">
      <div className="absolute inset-0 h-64 opacity-20 pointer-events-none overflow-hidden">
        <AnimatedWave />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="py-16 lg:py-24">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-12 lg:gap-8">
            <div className="col-span-2">
              <Link href="/" className="inline-flex items-center mb-6">
                <Image
                  src="/ingenium-software-logo.png"
                  alt="Ingenium Software"
                  width={195}
                  height={40}
                  className="h-8 w-auto object-contain"
                />
              </Link>

              <p className="font-display text-muted-foreground leading-relaxed mb-8 max-w-xs">
                Your AI Design Manager for Construction. Keep building simple.
              </p>

              <div className="flex gap-6">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                ))}
              </div>
            </div>

            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-sm font-medium mb-6">{title}</h3>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="py-8 border-t border-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; 2026 Ingenium Software. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
