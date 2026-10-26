import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Page container. Keeps a single max-width and responsive gutters across the
 * whole site so no section invents its own spacing.
 */
export function Container({
  children,
  className,
  as: Tag = "div",
  width = "default",
  style,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer" | "main" | "nav";
  width?: "default" | "wide" | "prose";
  style?: CSSProperties;
}) {
  const widths = {
    default: "max-w-[82rem]",
    wide: "max-w-[92rem]",
    prose: "max-w-[46rem]",
  } as const;

  return (
    <Tag
      className={cn(
        "mx-auto w-full px-5 sm:px-8 lg:px-10",
        widths[width],
        className,
      )}
      style={style}
    >
      {children}
    </Tag>
  );
}
