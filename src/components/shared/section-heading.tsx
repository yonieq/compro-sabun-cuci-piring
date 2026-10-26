import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Section heading with an optional eyebrow and supporting copy.
 * `align` controls the editorial alignment used across the site.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  className,
  action,
  id,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
  action?: ReactNode;
  id?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        align === "center" && "items-center text-center",
        action && "md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow ? (
          <p
            className={cn(
              "mb-4 inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em]",
              tone === "dark" ? "text-brand-lime" : "text-leaf-700",
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                tone === "dark" ? "bg-brand-lime" : "bg-brand-green",
              )}
            />
            {eyebrow}
          </p>
        ) : null}
        <h2
          id={id}
          className={cn(
            "text-h2 text-balance-tight",
            tone === "dark" && "text-brand-offwhite",
          )}
        >
          {title}
        </h2>
        {description ? (
          <p
            className={cn(
              "mt-5 text-lead",
              tone === "dark" ? "text-brand-offwhite/75" : "text-ink-soft",
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
