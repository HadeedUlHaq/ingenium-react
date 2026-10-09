import "server-only";
import { existsSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import path from "node:path";

const EXTENSIONS = ["jpg", "jpeg", "png", "webp", "avif"] as const;

/**
 * Photo slots resolve at build time. Drop a file named after the slot
 * into public/photos/ (e.g. public/photos/hero.jpg), commit, deploy, and
 * the slot renders it - no code change. Until then the slot holds its
 * exact space and names the file it is waiting for.
 *
 * See public/photos/README.txt for the full list of slot names.
 */
export function photo(slot: string): string | null {
  const dir = path.join(process.cwd(), "public", "photos");
  for (const ext of EXTENSIONS) {
    if (existsSync(path.join(dir, `${slot}.${ext}`))) {
      // Replacing an asset must also invalidate Next's optimized-image cache.
      const version = createHash("sha256")
        .update(readFileSync(path.join(dir, `${slot}.${ext}`)))
        .digest("hex")
        .slice(0, 12);
      return `/photos/${slot}.${ext}?v=${version}`;
    }
  }
  return null;
}
