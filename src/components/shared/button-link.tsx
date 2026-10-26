import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "light" | "dark";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-[-0.01em] transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] disabled:pointer-events-none disabled:opacity-55";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-deep text-brand-offwhite shadow-[0_14px_34px_-16px_rgba(23,77,50,0.7)] hover:bg-brand-green hover:shadow-[0_18px_40px_-14px_rgba(101,184,50,0.55)] hover:-translate-y-0.5 active:translate-y-0",
  secondary:
    "bg-brand-green text-white shadow-[0_14px_34px_-16px_rgba(101,184,50,0.8)] hover:bg-brand-deep hover:-translate-y-0.5 active:translate-y-0",
  outline:
    "border border-brand-deep/18 bg-transparent text-brand-deep hover:border-brand-deep/45 hover:bg-brand-deep/[0.04]",
  ghost: "text-brand-deep hover:bg-brand-deep/[0.06]",
  light:
    "bg-white text-brand-deep shadow-[0_14px_34px_-18px_rgba(23,77,50,0.45)] hover:bg-brand-cream hover:-translate-y-0.5",
  dark: "bg-brand-charcoal text-brand-offwhite hover:bg-brand-deep hover:-translate-y-0.5",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-[0.82rem]",
  md: "h-12 px-6 text-[0.9rem]",
  lg: "h-14 px-8 text-[0.95rem]",
};

interface ButtonLinkProps extends Omit<ComponentProps<typeof Link>, "className"> {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  /** Renders a trailing arrow that nudges on hover. */
  withArrow?: boolean;
  /** Icon rendered before the label. */
  icon?: ReactNode;
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  withArrow = false,
  icon,
  ...props
}: ButtonLinkProps) {
  const isExternal = /^https?:\/\//.test(String(props.href));

  return (
    <Link
      {...props}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(base, variants[variant], sizes[size], className)}
    >
      {icon ? <span aria-hidden="true">{icon}</span> : null}
      <span>{children}</span>
      {withArrow ? (
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-1"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 8h11M9 4l4 4-4 4" />
        </svg>
      ) : null}
    </Link>
  );
}

interface ButtonProps extends ComponentProps<"button"> {
  variant?: Variant;
  size?: Size;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(base, variants[variant], sizes[size], className)}
    >
      {children}
    </button>
  );
}
