import Link from "next/link";
import { cn } from "@/lib/utils";

type BookDemoTabProps = {
  className?: string;
  tabIndex?: number;
  "aria-hidden"?: boolean;
};

export function BookDemoTab({
  className,
  tabIndex,
  "aria-hidden": ariaHidden,
}: BookDemoTabProps) {
  return (
    <Link
      href="/contact"
      tabIndex={tabIndex}
      aria-hidden={ariaHidden}
      aria-label="Book a demo"
      className={cn(
        "fixed right-0 bottom-8 z-30 inline-flex items-center justify-center rounded-l-2xl rounded-r-none bg-[linear-gradient(135deg,#01D480_0%,#48DEDC_100%)] px-2 py-4 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-white shadow-lg transition-[opacity,transform,background] duration-300 hover:bg-[linear-gradient(135deg,#001820_0%,#019DBF_100%)] sm:bottom-10 sm:px-2.5 sm:py-5",
        className
      )}
      style={{ writingMode: "vertical-rl" }}
    >
      Book Demo
    </Link>
  );
}
