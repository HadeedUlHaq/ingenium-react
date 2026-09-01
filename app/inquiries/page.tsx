"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, RefreshCw } from "lucide-react";

type Inquiry = {
  id: string;
  created_at: string;
  full_name: string;
  organization: string | null;
  email: string;
  phone: string;
  event_date: string | null;
  venue: string | null;
  event_type: string | null;
  burger_count: string | null;
  outdoor_space: boolean;
  parking_access: boolean;
  notes: string | null;
};

export default function InquiriesPage() {
  const router = useRouter();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/inquiries/list");
      if (!res.ok) throw new Error("Couldn't load inquiries.");
      const payload = await res.json();
      setInquiries(payload.inquiries);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't load inquiries.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleLock() {
    await fetch("/api/staff/logout", { method: "POST" });
    router.replace("/staff");
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-2xl flex-col px-4 py-6">
      <header className="mb-5 flex items-center justify-between gap-3">
        <h1 className="font-stamp text-2xl uppercase">Booking Inquiries</h1>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={load}
            aria-label="Refresh"
            className="stepped flex items-center gap-1.5 border-2 border-ink/40 px-3 py-2 font-dotmatrix text-sm text-ink-soft uppercase"
          >
            <RefreshCw className="size-4" />
          </button>
          <button
            type="button"
            onClick={handleLock}
            aria-label="Lock screen"
            className="stepped flex items-center gap-1.5 border-2 border-ink/40 px-3 py-2 font-dotmatrix text-sm text-ink-soft uppercase"
          >
            <Lock className="size-4" />
          </button>
        </div>
      </header>

      {error ? (
        <p className="mb-4 font-dotmatrix text-base text-stamp-red uppercase">{error}</p>
      ) : null}

      {loading ? (
        <p className="font-dotmatrix text-lg tracking-[0.15em] text-ink-soft uppercase">
          Loading&hellip;
        </p>
      ) : inquiries.length === 0 ? (
        <p className="mt-10 text-center font-dotmatrix text-lg tracking-[0.15em] text-ink-soft uppercase">
          No inquiries yet
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {inquiries.map((q) => (
            <li key={q.id} className="ticket-shadow border-2 border-ink bg-paper p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="font-stamp text-xl uppercase">{q.full_name}</h2>
                <time className="font-dotmatrix text-sm text-ink-soft">
                  {new Date(q.created_at).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </time>
              </div>

              {q.organization ? (
                <p className="mt-0.5 text-base text-ink-soft">{q.organization}</p>
              ) : null}

              <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-base">
                <dt className="font-dotmatrix text-sm text-ink-soft uppercase">Email</dt>
                <dd>
                  <a href={`mailto:${q.email}`} className="underline underline-offset-2">
                    {q.email}
                  </a>
                </dd>
                <dt className="font-dotmatrix text-sm text-ink-soft uppercase">Phone</dt>
                <dd>
                  <a href={`tel:${q.phone}`} className="underline underline-offset-2">
                    {q.phone}
                  </a>
                </dd>
                {q.event_date ? (
                  <>
                    <dt className="font-dotmatrix text-sm text-ink-soft uppercase">Date</dt>
                    <dd>{q.event_date}</dd>
                  </>
                ) : null}
                {q.venue ? (
                  <>
                    <dt className="font-dotmatrix text-sm text-ink-soft uppercase">Venue</dt>
                    <dd>{q.venue}</dd>
                  </>
                ) : null}
                {q.event_type ? (
                  <>
                    <dt className="font-dotmatrix text-sm text-ink-soft uppercase">Type</dt>
                    <dd>{q.event_type}</dd>
                  </>
                ) : null}
                {q.burger_count ? (
                  <>
                    <dt className="font-dotmatrix text-sm text-ink-soft uppercase">Burgers</dt>
                    <dd>{q.burger_count}</dd>
                  </>
                ) : null}
                <dt className="font-dotmatrix text-sm text-ink-soft uppercase">Setup</dt>
                <dd>
                  {q.outdoor_space ? "Outdoor space ✓" : "Outdoor space ✗"} ·{" "}
                  {q.parking_access ? "Parking ✓" : "Parking ✗"}
                </dd>
              </dl>

              {q.notes ? (
                <p className="mt-3 border-t-2 border-ink/15 pt-3 text-base whitespace-pre-line">
                  {q.notes}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
