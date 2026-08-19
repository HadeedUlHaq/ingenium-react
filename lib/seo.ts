import { siteConfig } from "@/lib/site";

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
