"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Delete, Lock } from "lucide-react";
import { STAFF_CODE, STAFF_CODE_LENGTH, isStaffUnlocked, setStaffUnlocked } from "@/lib/gate";
import { PerfSeam } from "@/components/ticket/ticket-frame";
import { cn } from "@/lib/utils";

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "del"] as const;

type Props = {
  label: string;
  children: ReactNode;
};

/**
 * Staff-only screen gate. Checks localStorage after mount (never during
 * render) so there's no hydration mismatch and no flash of gated content
 * before the check runs - the keypad is the default until proven unlocked.
 */
export function PasscodeGate({ label, children }: Props) {
  const [checked, setChecked] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [entered, setEntered] = useState("");
  const [wrong, setWrong] = useState(false);

  useEffect(() => {
    setUnlocked(isStaffUnlocked());
    setChecked(true);
  }, []);

  useEffect(() => {
    if (entered.length < STAFF_CODE_LENGTH) return;
    if (entered === STAFF_CODE) {
      setStaffUnlocked();
      setUnlocked(true);
      return;
    }
    setWrong(true);
    const id = window.setTimeout(() => {
      setWrong(false);
      setEntered("");
    }, 500);
    return () => window.clearTimeout(id);
  }, [entered]);

  function press(key: (typeof KEYS)[number]) {
    if (wrong || key === "") return;
    if (key === "del") {
      setEntered((e) => e.slice(0, -1));
      return;
    }
    if (entered.length >= STAFF_CODE_LENGTH) return;
    setEntered((e) => e + key);
  }

  if (!checked) return null;
  if (unlocked) return <>{children}</>;

  return (
    <main className="mx-auto flex min-h-dvh max-w-sm flex-col items-center justify-center gap-8 px-6 py-10 text-center text-ink">
      <div>
        <Lock className="mx-auto size-8" strokeWidth={2.5} />
        <p className="mt-3 font-dotmatrix text-lg tracking-[0.3em] text-ink-soft uppercase">
          Staff only
        </p>
        <h1 className="font-stamp text-2xl uppercase">{label}</h1>
      </div>

      <div
        className={cn(
          "flex gap-3",
          wrong && "animate-flash-late",
        )}
      >
        {Array.from({ length: STAFF_CODE_LENGTH }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "stepped flex size-12 items-center justify-center border-2 font-stamp text-2xl",
              wrong ? "border-stamp-red text-stamp-red" : "border-ink text-ink",
            )}
          >
            {entered[i] ?? ""}
          </div>
        ))}
      </div>

      <PerfSeam className="w-full max-w-[16rem]" />

      <div className="grid w-full grid-cols-3 gap-3">
        {KEYS.map((key, i) =>
          key === "" ? (
            <div key={i} aria-hidden="true" />
          ) : (
            <button
              key={i}
              type="button"
              onClick={() => press(key)}
              aria-label={key === "del" ? "Delete digit" : `Digit ${key}`}
              className="stepped ticket-shadow flex min-h-16 items-center justify-center border-2 border-ink bg-paper font-stamp text-2xl text-ink uppercase active:scale-[0.95]"
            >
              {key === "del" ? <Delete className="size-6" strokeWidth={2.5} /> : key}
            </button>
          ),
        )}
      </div>
    </main>
  );
}
