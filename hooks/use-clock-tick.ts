"use client";

import { useEffect, useState } from "react";

/**
 * Re-renders every second so live timers (elapsed wait time) stay accurate
 * without each ticket card running its own interval.
 */
export function useClockTick() {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  return now;
}

/** Formats an elapsed millisecond duration as MM:SS. */
export function formatElapsed(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}
