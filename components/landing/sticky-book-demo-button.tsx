"use client";

import { usePathname } from "next/navigation";
import { BookDemoTab } from "./book-demo-tab";

export function StickyBookDemoButton() {
  const pathname = usePathname();

  if (
    pathname === "/" ||
    pathname === "/contact" ||
    pathname.startsWith("/contact/")
  ) {
    return null;
  }

  return <BookDemoTab />;
}
