"use client";

import { Suspense, useCallback } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { CodePad } from "@/components/gate/code-pad";

const ALLOWED_NEXT = new Set(["/order", "/kds"]);

function StaffLoginScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawNext = searchParams.get("next");
  const next = rawNext && ALLOWED_NEXT.has(rawNext) ? rawNext : "/order";

  const handleSubmit = useCallback(
    async (code: string) => {
      const res = await fetch("/api/staff/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      if (res.ok) {
        router.replace(next);
        router.refresh();
        return { ok: true as const };
      }

      const payload = await res.json().catch(() => null);
      return { ok: false as const, error: payload?.error ?? "Incorrect code." };
    },
    [next, router],
  );

  return (
    <main className="mx-auto flex min-h-dvh max-w-sm flex-col items-center justify-center gap-8 px-6 py-10 text-center text-ink">
      <div className="flex flex-col items-center">
        <Image src="/logo.png" alt="Hadeed Smash Burgers" width={1254} height={1254} className="h-12 w-12" priority />
        <p className="mt-3 font-dotmatrix text-lg tracking-[0.3em] text-ink-soft uppercase">
          Staff only
        </p>
        <h1 className="font-stamp text-2xl uppercase">Enter the code</h1>
      </div>
      <CodePad onSubmit={handleSubmit} />
    </main>
  );
}

export default function StaffLoginPage() {
  return (
    <Suspense fallback={null}>
      <StaffLoginScreen />
    </Suspense>
  );
}
