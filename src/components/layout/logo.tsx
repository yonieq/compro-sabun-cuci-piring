import { Leaf } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * CITRAVA wordmark.
 *
 * The mark is original: a rounded citrus roundel with a leaf, drawn inline so
 * it stays crisp and inherits currentColor. Swap it for the final brand logo
 * by replacing this component only.
 */
export function Logo({
  className,
  tone = "dark",
  withTagline = false,
}: {
  className?: string;
  tone?: "dark" | "light";
  withTagline?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} — Beranda`}
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <span
        aria-hidden="true"
        className={cn(
          "relative grid h-10 w-10 place-items-center overflow-hidden rounded-[0.9rem] transition-transform duration-300 group-hover:-rotate-6 sm:h-11 sm:w-11",
          tone === "dark" ? "bg-brand-deep" : "bg-brand-offwhite",
        )}
      >
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(184,229,75,0.55),transparent_62%)]" />
        <span className="relative flex items-center gap-0.5">
          <span className="relative block h-4 w-4 rounded-full bg-brand-lime sm:h-[1.1rem] sm:w-[1.1rem]">
            <span className="absolute inset-[22%] rounded-full bg-brand-deep" />
            <span className="absolute left-1/2 top-1/2 h-[0.22rem] w-[0.22rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-lemon" />
          </span>
          <Leaf
            className="h-3 w-3 -rotate-12 text-brand-lemon sm:h-3.5 sm:w-3.5"
            strokeWidth={2.4}
          />
        </span>
      </span>
      <span className="flex min-w-0 flex-col justify-center leading-none">
        <span
          className={cn(
            "font-display text-[1.2rem] font-extrabold leading-none tracking-[0.1em] sm:text-[1.4rem] sm:tracking-[0.16em]",
            tone === "dark" ? "text-brand-deep" : "text-brand-offwhite",
          )}
        >
          {siteConfig.name}
        </span>
        {withTagline ? (
          <span
            className={cn(
              "mt-1 block max-w-[11.5rem] text-[0.5rem] font-medium uppercase leading-tight tracking-[0.1em] sm:max-w-none sm:text-[0.58rem] sm:tracking-[0.18em]",
              tone === "dark" ? "text-ink-soft/70" : "text-brand-offwhite/60",
            )}
          >
            Kitchen Care
          </span>
        ) : null}
      </span>
    </Link>
  );
}
