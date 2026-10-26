/** Domain types shared across server and client components. */

export type ProductCategoryId =
  | "sabun-cuci-piring"
  | "pembersih-serbaguna"
  | "pencuci-buah-sayur";

export interface ProductCategory {
  id: ProductCategoryId;
  label: string;
  shortLabel: string;
  description: string;
}

export type ProductStatus = "demo" | "published" | "draft";

export interface ProductSize {
  /** Volume in millilitres, or weight in grams for powder/gel cleaners. */
  value: number;
  unit: "mL" | "g";
  /** Display label, e.g. "680 mL". */
  label: string;
  /** Optional: mark a size as the most popular pick. */
  popular?: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  /** The brand this demo product references. Kept explicit for attribution. */
  referenceBrand: string;
  category: ProductCategoryId;
  tagline: string;
  description: string;
  longDescription: string;
  features: string[];
  sizes: ProductSize[];
  /** Path under /public used for cards and listings. */
  heroImage: string;
  /** Additional gallery views; may reuse the hero artwork for the prototype. */
  gallery: string[];
  /** Hex accent used for chips, gradients and placeholder backgrounds. */
  accentColor: string;
  /** Tailwind-friendly CSS gradient string. */
  gradient: string;
  featured: boolean;
  status: ProductStatus;
  /** External reference URL (demo reference only — never rendered as a store link). */
  externalUrl: string | null;
  seoTitle: string;
  seoDescription: string;
}

export interface ArticleSection {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
  quote?: string;
  callout?: string;
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryId: string;
  readingTime: number;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  coverImage: string;
  coverAlt: string;
  featured: boolean;
  status: ProductStatus;
  content: ArticleSection[];
  seoTitle: string;
  seoDescription: string;
}

export interface NavItem {
  label: string;
  href: string;
  description?: string;
}

export interface FooterColumn {
  title: string;
  links: NavItem[];
}
