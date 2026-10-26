import { siteConfig } from "@/config/site";

/** Join class names without pulling in a dependency. */
export function cn(
  ...classes: Array<string | number | bigint | false | null | undefined>
): string {
  return classes.filter((value) => typeof value === "string" && value.length > 0).join(" ");
}

/** Prefix a root-relative path with the configured canonical site URL. */
export function absoluteUrl(path = "/"): string {
  const base = siteConfig.url.replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized === "/" ? "" : normalized}`;
}

/** Format a number with Indonesian thousands separators. */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat("id-ID").format(value);
}

/** Truncate text on a word boundary. */
export function truncate(text: string, max = 160): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max).trimEnd()}…`;
}

/**
 * Build a products listing URL with optional category/search params.
 * Used by navigation and any server-rendered links so query strings stay
 * consistent with what the client-side filter writes.
 */
export function productsHref({
  category,
  q,
}: { category?: string; q?: string } = {}): string {
  const params = new URLSearchParams();
  if (category) params.set("kategori", category);
  if (q) params.set("q", q);
  const query = params.toString();
  return query ? `/products?${query}` : "/products";
}

/** Deterministic initials for avatars / monograms. */
export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
