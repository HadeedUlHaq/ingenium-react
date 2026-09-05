"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Container } from "@/components/site/plate";
import { cn } from "@/lib/utils";

const EVENT_TYPES = [
  "Mosque / Community Event",
  "Private Party",
  "Wedding",
  "Corporate",
] as const;

const BURGER_COUNTS = ["50–100", "100–200", "200–300+"] as const;

const fieldClass =
  "mt-2 w-full rounded-[2px] border border-black bg-white px-4 py-3.5 text-base text-black " +
  "placeholder:text-grey-ink focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black";

const labelClass = "mono block text-[0.72rem] uppercase tracking-[0.14em] text-grey-ink";

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
      <Container className="max-w-3xl">
        {/* The one white panel on the page: a card handed across the counter. */}
        <div className="light-panel bg-white px-6 py-8 text-black sm:px-10 sm:py-12">
          <h2 className="display text-[2.75rem] sm:text-6xl">Reserve Your Event Date</h2>
          <p className="mono mt-3 max-w-xl text-[0.95rem] leading-relaxed text-grey-ink">
            Complete the form below and we will respond with a tailored proposal and quote
            within 24 hours.
          </p>

          {state === "sent" ? (
            <div className="mt-10 border-t border-line-dark py-10 text-center">
              <CheckCircle2 className="mx-auto size-12 text-black" strokeWidth={1.5} />
              <h3 className="display mt-5 text-4xl">Inquiry Sent</h3>
              <p className="mono mx-auto mt-3 max-w-md text-[0.9rem] leading-relaxed text-grey-ink">
                Thank you. We&apos;ve received your details and will respond with a tailored
                proposal and quote within 24 hours.
              </p>
              <button
                type="button"
                onClick={() => setState("idle")}
                className="press display mt-7 rounded-[2px] border border-black px-6 py-3 text-lg text-black hover:bg-black hover:text-white"
              >
                Send another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 grid gap-5 border-t border-line-dark pt-8 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="fullName" className={labelClass}>
                  Full Name
                </label>
                <input id="fullName" name="fullName" required autoComplete="name" className={fieldClass} />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="organization" className={labelClass}>
                  Organization / Event Name
                </label>
                <input id="organization" name="organization" autoComplete="organization" className={fieldClass} />
              </div>

              <div>
                <label htmlFor="email" className={labelClass}>
                  Email Address
                </label>
                <input id="email" name="email" type="email" required autoComplete="email" className={fieldClass} />
              </div>

              <div>
                <label htmlFor="phone" className={labelClass}>
                  Phone / WhatsApp Number
                </label>
                <input id="phone" name="phone" type="tel" required autoComplete="tel" className={fieldClass} />
              </div>

              <div>
                <label htmlFor="eventDate" className={labelClass}>
                  Event Date
                </label>
                <input id="eventDate" name="eventDate" type="date" className={cn(fieldClass, "[color-scheme:light]")} />
              </div>

              <div>
                <label htmlFor="venue" className={labelClass}>
                  Venue Location &amp; Postcode
                </label>
                <input id="venue" name="venue" className={fieldClass} />
              </div>

              <div>
                <label htmlFor="eventType" className={labelClass}>
                  Event Type
                </label>
                <select id="eventType" name="eventType" defaultValue="" className={fieldClass}>
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
                <select id="burgerCount" name="burgerCount" defaultValue="" className={fieldClass}>
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
                  <label className="flex items-start gap-3 text-[0.95rem]">
                    <input type="checkbox" name="outdoorSpace" className="mt-0.5 size-5 shrink-0 accent-black" />
                    Outdoor space available (minimum 3m x 3m)
                  </label>
                  <label className="flex items-start gap-3 text-[0.95rem]">
                    <input type="checkbox" name="parkingAccess" className="mt-0.5 size-5 shrink-0 accent-black" />
                    Parking / loading access available
                  </label>
                </div>
              </fieldset>

              <div className="sm:col-span-2">
                <label htmlFor="notes" className={labelClass}>
                  Additional Notes
                </label>
                <textarea id="notes" name="notes" rows={4} className={cn(fieldClass, "resize-y")} />
              </div>

              {error ? (
                <p
                  role="alert"
                  className="mono border border-signal-red px-4 py-3 text-[0.9rem] text-signal-red sm:col-span-2"
                >
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={state === "sending"}
                className="press display mt-1 flex items-center justify-center gap-2.5 rounded-[2px] bg-black px-8 py-4 text-2xl text-white hover:bg-black-3 disabled:opacity-60 sm:col-span-2"
              >
                {state === "sending" ? (
                  <>
                    <Loader2 className="size-5 animate-spin" aria-hidden="true" />
                    Sending…
                  </>
                ) : (
                  "Send Inquiry"
                )}
              </button>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}
