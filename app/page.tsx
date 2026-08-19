import Link from "next/link";
import { ChefHat, ClipboardList } from "lucide-react";
import { PerfSeam } from "@/components/ticket/ticket-frame";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center gap-8 px-6 py-10 text-center text-ink">
      <div>
        <p className="font-dotmatrix text-lg tracking-[0.3em] text-ink-soft uppercase">
          Welcome to
        </p>
        <h1 className="mt-1 font-stamp text-4xl uppercase">Hadeed Smash Burgers</h1>
      </div>

      <PerfSeam className="w-full max-w-[16rem]" />

      <nav className="flex w-full flex-col gap-4">
        <Link
          href="/order"
          className="stepped ticket-shadow flex min-h-16 items-center justify-center gap-3 border-2 border-ink bg-ink font-stamp text-xl text-paper uppercase active:scale-[0.98]"
        >
          <ClipboardList className="size-6" strokeWidth={2.5} />
          Order taker
        </Link>
        <Link
          href="/kds"
          className="stepped ticket-shadow flex min-h-16 items-center justify-center gap-3 border-2 border-ink bg-paper font-stamp text-xl text-ink uppercase active:scale-[0.98]"
        >
          <ChefHat className="size-6" strokeWidth={2.5} />
          Kitchen display
        </Link>
      </nav>
    </main>
  );
}
