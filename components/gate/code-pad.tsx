"use client";

import { useState } from "react";
import { Delete, CornerDownLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "del", "0", "enter"] as const;

type SubmitResult = { ok: true } | { ok: false; error: string };

type Props = {
  onSubmit: (code: string) => Promise<SubmitResult>;
  maxLength?: number;
};

/**
 * Numeral code entry shared by the staff login screen and the New Event
 * reset dialog: a masked readout plus a keypad with an explicit ENTER key,
 * so the client never needs to know the code's length. A wrong code (or a
 * server-side rate-limit lockout) flashes red, surfaces the server's
 * message, and clears.
 */
export function CodePad({ onSubmit, maxLength = 8 }: Props) {
  const [value, setValue] = useState("");
  const [wrong, setWrong] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    if (busy || value.length === 0) return;
    setBusy(true);
    setError(null);
    const result = await onSubmit(value);
    setBusy(false);
    if (result.ok) return;
    setError(result.error);
    setWrong(true);
    window.setTimeout(() => {
      setWrong(false);
      setValue("");
    }, 500);
  }

  function press(key: (typeof KEYS)[number]) {
    if (busy || wrong) return;
    if (key === "del") {
      setValue((v) => v.slice(0, -1));
      return;
    }
    if (key === "enter") {
      submit();
      return;
    }
    if (value.length >= maxLength) return;
    setValue((v) => v + key);
  }

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <div
        className={cn(
          "stepped ticket-shadow flex min-h-16 w-full items-center justify-center border-2 bg-paper-dim px-4",
          wrong ? "animate-flash-late border-stamp-red" : "border-ink",
        )}
      >
        <span className="stamp-digits font-stamp text-3xl tracking-[0.4em]" aria-live="polite">
          {value ? "•".repeat(value.length) : " "}
        </span>
      </div>

      {error ? (
        <p className="-mt-3 font-dotmatrix text-sm tracking-[0.15em] text-stamp-red uppercase">
          {error}
        </p>
      ) : null}

      <div className="grid w-full grid-cols-3 gap-3">
        {KEYS.map((key) => (
          <button
            key={key}
            type="button"
            disabled={busy}
            onClick={() => press(key)}
            aria-label={
              key === "del" ? "Delete digit" : key === "enter" ? "Submit code" : `Digit ${key}`
            }
            className={cn(
              "stepped ticket-shadow flex min-h-16 items-center justify-center border-2 border-ink font-stamp text-2xl uppercase active:scale-[0.95] disabled:opacity-40",
              key === "enter" ? "bg-ink text-paper" : "bg-paper text-ink",
            )}
          >
            {key === "del" ? (
              <Delete className="size-6" strokeWidth={2.5} />
            ) : key === "enter" ? (
              <CornerDownLeft className="size-6" strokeWidth={2.5} />
            ) : (
              key
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
