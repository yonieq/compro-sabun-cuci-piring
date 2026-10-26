import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** Accessible breadcrumb trail. The final crumb is the current page. */
export function Breadcrumbs({
  items,
  tone = "dark",
  className,
}: {
  items: { label: string; href?: string }[];
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol
        className={cn(
          "flex flex-wrap items-center gap-1.5 text-[0.74rem]",
          tone === "dark" ? "text-ink-soft/65" : "text-brand-offwhite/60",
        )}
      >
        <li>
          <Link
            href="/"
            className={cn(
              "inline-flex items-center gap-1.5 transition-colors",
              tone === "dark" ? "hover:text-brand-deep" : "hover:text-brand-lime",
            )}
          >
            <Home className="h-3 w-3" aria-hidden="true" />
            Beranda
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
              <ChevronRight className="h-3 w-3 opacity-40" aria-hidden="true" />
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className={cn(
                    "transition-colors",
                    tone === "dark"
                      ? "hover:text-brand-deep"
                      : "hover:text-brand-lime",
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={cn(
                    "font-medium",
                    tone === "dark" ? "text-brand-deep" : "text-brand-offwhite/85",
                  )}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
