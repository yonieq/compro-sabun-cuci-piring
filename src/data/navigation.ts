import type { NavItem, FooterColumn, ProductCategory } from "@/types/product";

/**
 * Primary navigation. Kept as data so the navbar, footer, mobile drawer and
 * sitemap all stay in sync from a single source.
 */
export const mainNav: NavItem[] = [
  { label: "Beranda", href: "/" },
  { label: "Tentang Kami", href: "/about" },
  { label: "Produk", href: "/products" },
  { label: "Keunggulan", href: "/#keunggulan" },
  { label: "Artikel", href: "/articles" },
  { label: "Hubungi Kami", href: "/contact" },
];

export const productCategories: ProductCategory[] = [
  {
    id: "sabun-cuci-piring",
    label: "Sabun Cuci Piring",
    shortLabel: "Cuci Piring",
    description:
      "Cairan pembersih untuk mencuci piring dan peralatan makan sehari-hari.",
  },
  {
    id: "pembersih-serbaguna",
    label: "Pembersih Serbaguna",
    shortLabel: "Serbaguna",
    description:
      "Pembersih untuk membantu merawat area dapur dan permukaan di sekitarnya.",
  },
  {
    id: "pencuci-buah-sayur",
    label: "Pencuci Piring, Buah & Sayur",
    shortLabel: "Buah & Sayur",
    description:
      "Produk yang diformulasikan untuk kebutuhan mencuci piring sekaligus buah dan sayur.",
  },
];

export const footerColumns: FooterColumn[] = [
  {
    title: "Jelajahi",
    links: [
      { label: "Beranda", href: "/" },
      { label: "Tentang Kami", href: "/about" },
      { label: "Keunggulan", href: "/#keunggulan" },
      { label: "Artikel", href: "/articles" },
      { label: "Hubungi Kami", href: "/contact" },
    ],
  },
  {
    title: "Produk",
    links: [
      { label: "Semua Produk", href: "/products" },
      { label: "Sabun Cuci Piring", href: "/products?kategori=sabun-cuci-piring" },
      { label: "Pembersih Serbaguna", href: "/products?kategori=pembersih-serbaguna" },
      { label: "Pencuci Buah & Sayur", href: "/products?kategori=pencuci-buah-sayur" },
    ],
  },
  {
    title: "Informasi",
    links: [
      { label: "Kebijakan Privasi", href: "/privacy" },
      { label: "Syarat & Ketentuan", href: "/terms" },
      { label: "Distribusi", href: "/#distribusi" },
      { label: "FAQ", href: "/contact#faq" },
    ],
  },
];
