"use client";

import type { SocialIconName } from "@/components/shared/social-icons";
import { socialIcons } from "@/components/shared/social-icons";

/**
 * Social link with a safe placeholder state.
 * When `href` is "#" the link is inert: it is announced as unavailable and
 * never navigates. Real URLs render as normal external links.
 */
export function SocialLink({
  href,
  label,
  icon,
  handle,
}: {
  href: string;
  label: string;
  icon: SocialIconName;
  handle?: string;
}) {
  const Icon = socialIcons[icon];
  const isPlaceholder = href === "#";

  if (isPlaceholder) {
    return (
      <span
        role="link"
        aria-disabled="true"
        tabIndex={0}
        title={`${label} — segera hadir`}
        className="grid h-10 w-10 cursor-not-allowed place-items-center rounded-full border border-white/10 text-brand-offwhite/35"
      >
        <Icon className="h-4 w-4" />
        <span className="sr-only">
          {label} {handle ? `(${handle})` : ""} — placeholder, belum tersedia
        </span>
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label}${handle ? ` — ${handle}` : ""}`}
      className="grid h-10 w-10 place-items-center rounded-full border border-white/12 text-brand-offwhite/75 transition-colors hover:border-brand-lime/60 hover:bg-white/5 hover:text-brand-lime"
    >
      <Icon className="h-4 w-4" />
    </a>
  );
}
