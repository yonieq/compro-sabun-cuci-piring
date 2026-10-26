import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

/**
 * Brand glyphs are drawn here instead of imported because the icon library no
 * longer ships trademarked social marks. They are simplified, original shapes
 * intended as neutral placeholders until official brand kits are available.
 */
export function InstagramIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5.2" />
      <circle cx="12" cy="12" r="4.1" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TikTokIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M14.2 3.5c.2 2.3 1.6 3.9 3.9 4.2v2.9c-1.5.1-2.9-.4-4.1-1.2v5.6a5.1 5.1 0 1 1-4.4-5v3a2.2 2.2 0 1 0 1.5 2.1V3.5z" />
    </svg>
  );
}

export function YouTubeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2.5" y="5.2" width="19" height="13.6" rx="4.2" />
      <path d="M10.4 9.2l5 2.8-5 2.8z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M20.5 11.6a8.4 8.4 0 0 1-12.4 7.5L3.5 20.5l1.5-4.5a8.4 8.4 0 1 1 15.5-4.4z" />
      <path d="M8.9 8.4c-.3.7-.2 1.7.6 2.8.9 1.2 2.1 2 3.2 2.3.9.2 1.6 0 2-.5.2-.3.2-.6 0-.9l-1.2-.8c-.3-.2-.6-.1-.8.1l-.4.4c-.6-.2-1.6-1.1-1.9-1.8l.4-.5c.2-.2.2-.5 0-.8l-.8-1.2c-.2-.3-.6-.3-.9-.1z" />
    </svg>
  );
}

export function MarketplaceIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 9.5V19a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 20 19V9.5" />
      <path d="M3 9.5h18l-2-5.5H5z" />
      <path d="M9 13.5a3 3 0 0 0 6 0" />
    </svg>
  );
}

export const socialIcons = {
  instagram: InstagramIcon,
  tiktok: TikTokIcon,
  youtube: YouTubeIcon,
  whatsapp: WhatsAppIcon,
  marketplace: MarketplaceIcon,
} as const;

export type SocialIconName = keyof typeof socialIcons;
