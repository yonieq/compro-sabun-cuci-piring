/**
 * Brand design tokens.
 *
 * Used by `globals.css` (via @theme) and by a small number of components that
 * need the raw values (inline SVG gradients, JSON-LD, theme-colour meta).
 * Keep this file free of React imports so it can be used in both server and
 * client contexts.
 */

export const brand = {
  /** Primary citrus green — used for primary actions and accents. */
  green: "#65B832",
  /** Deep forest green — primary text and dark surfaces. */
  deep: "#174D32",
  /** Lime highlight — energetic accents and gradients. */
  lime: "#B8E54B",
  /** Lemon yellow — warm accents and ratings/badges. */
  lemon: "#F8D940",
  /** Page background. */
  offwhite: "#FAFBF6",
  /** Soft cream surface for warm sections. */
  cream: "#FFF8E7",
  /** Ink / charcoal. */
  charcoal: "#17251B",
} as const;

export type BrandColor = keyof typeof brand;

/** Typography stacks. The CSS variables are provided by next/font. */
export const typography = {
  heading: "var(--font-plus-jakarta)",
  body: "var(--font-inter)",
} as const;
