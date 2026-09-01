"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Plate, SectionHeading } from "@/components/site/plate";
import { cn } from "@/lib/utils";

const EVENT_TYPES = [
  "Mosque / Community Event",
  "Private Party",
  "Wedding",
  "Corporate",
] as const;

const BURGER_COUNTS = ["50–100", "100–200", "200–300+"] as const;

const fieldClass =
  "w-full border border-white/15 bg-iron-black px-4 py-3.5 text-base text-chrome " +
  "placeholder:text-chrome-mid/70 focus:border-gold focus:outline-none " +
  "focus-visible:outline-none";

const labelClass =
  "block text-[0.68rem] font-semibold tracking-[0.16em] text-chrome-mid uppercase";

export function BookingForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "sending") return;

    const form = e.currentTarget;
    const data = new FormData(form);
    setState("sending");
    setError(null);

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: data.get("fullName"),
          organization: data.get("organization"),
          email: data.get("email"),
          phone: data.get("phone"),
          eventDate: data.get("eventDate"),
          venue: data.get("venue"),
          eventType: data.get("eventType"),
          burgerCount: data.get("burgerCount"),
          outdoorSpace: data.get("outdoorSpace") === "on",
          parkingAccess: data.get("parkingAccess") === "on",
          notes: data.get("notes"),
        }),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => null);
        throw new Error(payload?.error ?? "Something went wrong. Please try again.");
      }

      form.reset();
      setState("sent");
    } catch (err) {
      setState("idle");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <section id="booking" className="py-16 lg:py-24">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <SectionHeading>Reserve Your Event Date</SectionHeading>
        <p className="mt-4 text-base leading-relaxed text-chrome-mid sm:text-lg">
          Complete the form below and we will respond with a tailored proposal and quote within 24
          hours.
        </p>

        <Plate className="mt-8 px-6 py-8 sm:px-9 sm:py-10">
          {state === "sent" ? (
            <div className="py-10 text-center">
              <CheckCircle2 className="mx-auto size-14 text-signal-red-bright" strokeWidth={1.75} />
              <h3 className="engraved mt-5 font-display text-3xl tracking-wide uppercase">
                Inquiry Sent
              </h3>
              <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-chrome-mid">
                Thank you. We&apos;ve received your details and will respond with a tailored
                proposal and quote within 24 hours.
              </p>
              <button
                type="button"
                onClick={() => setState("idle")}
                className="press badge-face badge-panel mt-7 px-6 py-3 font-display text-base tracking-wide text-chrome uppercase"
              >
                Send another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate={false} className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="fullName" className={labelClass}>
                  Full Name
                </label>
                <input id="fullName" name="fullName" required autoComplete="name" className={cn(fieldClass, "mt-2")} />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="organization" className={labelClass}>
                  Organization / Event Name
                </label>
                <input id="organization" name="organization" autoComplete="organization" className={cn(fieldClass, "mt-2")} />
              </div>

              <div>
                <label htmlFor="email" className={labelClass}>
                  Email Address
                </label>
                <input id="email" name="email" type="email" required autoComplete="email" className={cn(fieldClass, "mt-2")} />
              </div>

              <div>
                <label htmlFor="phone" className={labelClass}>
                  Phone / WhatsApp Number
                </label>
                <input id="phone" name="phone" type="tel" required autoComplete="tel" className={cn(fieldClass, "mt-2")} />
              </div>

              <div>
                <label htmlFor="eventDate" className={labelClass}>
                  Event Date
                </label>
                <input id="eventDate" name="eventDate" type="date" className={cn(fieldClass, "mt-2 [color-scheme:dark]")} />
              </div>

              <div>
                <label htmlFor="venue" className={labelClass}>
                  Venue Location &amp; Postcode
                </label>
                <input id="venue" name="venue" className={cn(fieldClass, "mt-2")} />
              </div>

              <div>
                <label htmlFor="eventType" className={labelClass}>
                  Event Type
                </label>
                <select id="eventType" name="eventType" defaultValue="" className={cn(fieldClass, "mt-2")}>
                  <option value="" disabled>
                    Select…
                  </option>
                  {EVENT_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="burgerCount" className={labelClass}>
                  Estimated Burger Count
                </label>
                <select id="burgerCount" name="burgerCount" defaultValue="" className={cn(fieldClass, "mt-2")}>
                  <option value="" disabled>
                    Select…
                  </option>
                  {BURGER_COUNTS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <fieldset className="sm:col-span-2">
                <legend className={labelClass}>Venue Setup Details</legend>
                <div className="mt-3 space-y-3">
                  <label className="flex items-start gap-3 text-base text-chrome">
                    <input
                      type="checkbox"
                      name="outdoorSpace"
                      className="mt-0.5 size-5 shrink-0 accent-[var(--signal-red)]"
                    />
                    Outdoor space available (minimum 3m x 3m)
                  </label>
                  <label className="flex items-start gap-3 text-base text-chrome">
                    <input
                      type="checkbox"
                      name="parkingAccess"
                      className="mt-0.5 size-5 shrink-0 accent-[var(--signal-red)]"
                    />
                    Parking / loading access available
                  </label>
                </div>
              </fieldset>

              <div className="sm:col-span-2">
                <label htmlFor="notes" className={labelClass}>
                  Additional Notes
                </label>
                <textarea id="notes" name="notes" rows={4} className={cn(fieldClass, "mt-2 resize-y")} />
              </div>

              {error ? (
                <p
                  role="alert"
                  className="sm:col-span-2 border border-signal-red/50 bg-signal-red/10 px-4 py-3 text-base text-signal-red-bright"
                >
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={state === "sending"}
                className="press mt-1 flex items-center justify-center gap-2.5 bg-signal-red px-8 py-4 font-display text-xl tracking-wide text-white uppercase disabled:opacity-60 sm:col-span-2"
              >
                {state === "sending" ? (
                  <>
                    <Loader2 className="size-5 animate-spin" aria-hidden="true" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send className="size-5" aria-hidden="true" />
                    Send Inquiry
                  </>
                )}
              </button>
            </form>
          )}
        </Plate>
      </div>
    </section>
  );
}
