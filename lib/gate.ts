/**
 * Staff passcode gate for /order and /kds.
 *
 * This is a UI guard, not a security boundary: the Supabase anon key
 * ships in the client bundle and the orders table's RLS policies are
 * permissive by design (no auth, event tool), so anyone determined can
 * still write to the database directly. This only stops a customer
 * picking up the counter phone and wandering into the kitchen screen.
 */

export const STAFF_CODE = (process.env.NEXT_PUBLIC_STAFF_CODE ?? "8008").trim();
export const STAFF_CODE_LENGTH = STAFF_CODE.length;

const STORAGE_KEY = "hsb-staff-unlocked";

export function isStaffUnlocked(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function setStaffUnlocked(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // Storage unavailable (private browsing, etc.) - unlock just won't persist.
  }
}
