/**
 * Signed staff-session cookie, built on Web Crypto (`crypto.subtle`) so the
 * same code runs unmodified in both the Edge middleware and the Node route
 * handlers - `node:crypto` would break the middleware.
 *
 * Token shape: base64url(payload JSON) + "." + base64url(HMAC-SHA256 of the
 * payload bytes). `crypto.subtle.verify` for HMAC performs a constant-time
 * comparison internally, so no separate timing-safe check is needed here.
 */

export const COOKIE_NAME = "hsb_staff";

const SESSION_TTL_MS = 12 * 60 * 60 * 1000; // one event day
export const SESSION_TTL_SECONDS = SESSION_TTL_MS / 1000;

function getSecretHex(): string {
  const secret = process.env.STAFF_SESSION_SECRET;
  if (!secret) throw new Error("STAFF_SESSION_SECRET is not set");
  return secret.trim();
}

function hexToBytes(hex: string): Uint8Array<ArrayBuffer> {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(str: string): Uint8Array<ArrayBuffer> {
  const padLength = (4 - (str.length % 4)) % 4;
  const padded = str.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat(padLength);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function getKey(): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    hexToBytes(getSecretHex()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

export async function createSessionToken(): Promise<string> {
  const payload = JSON.stringify({ exp: Date.now() + SESSION_TTL_MS });
  const payloadBytes = new TextEncoder().encode(payload);
  const key = await getKey();
  const signature = await crypto.subtle.sign("HMAC", key, payloadBytes);
  return `${toBase64Url(payloadBytes)}.${toBase64Url(new Uint8Array(signature))}`;
}

export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  const [payloadPart, sigPart] = token.split(".");
  if (!payloadPart || !sigPart) return false;

  try {
    const payloadBytes = fromBase64Url(payloadPart);
    const sigBytes = fromBase64Url(sigPart);
    const key = await getKey();
    const valid = await crypto.subtle.verify("HMAC", key, sigBytes, payloadBytes);
    if (!valid) return false;

    const payload = JSON.parse(new TextDecoder().decode(payloadBytes)) as { exp?: number };
    return typeof payload.exp === "number" && payload.exp > Date.now();
  } catch {
    return false;
  }
}
