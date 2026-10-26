/**
 * Central brand + company configuration.
 *
 * Every brand-facing string, colour and link in the application is sourced
 * from this file (plus `src/config/theme.ts`). Replacing the brand means
 * editing these values and the demo data — not hunting through components.
 *
 * ⚠️  The company details, address, phone, email and social handles below are
 * PLACEHOLDERS. They must be replaced with verified information before launch.
 */

/** A distribution channel. `status: "live"` requires a real `href`. */
export interface MarketplaceConfig {
  name: string;
  description: string;
  href: string | null;
  status: "live" | "placeholder";
}

export interface SocialConfig {
  label: string;
  href: string;
  handle: string;
  icon: "instagram" | "tiktok" | "youtube";
}

export const siteConfig = {
  name: "CITRAVA",
  legalName: "PT Citrava Indonesia (contoh)",
  tagline: "Bersih Maksimal, Segar Setiap Hari.",
  description:
    "CITRAVA menghadirkan sabun cuci piring dan pembersih dapur dengan aroma citrus yang segar — untuk dapur yang bersih dan hari yang lebih ringan.",
  shortDescription:
    "Produk kebersihan dapur bernuansa citrus untuk rumah tangga Indonesia.",
  /** Update to the production domain before deploying. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "id_ID",
  language: "id",
  foundedYear: 2026,
  /** Set to true while the site still ships demo product data. */
  demoMode: true,
  demoNotice:
    "Situs ini masih dalam tahap prototipe. Data produk yang tampil adalah referensi demo untuk keperluan desain dan akan diganti dengan produk resmi CITRAVA sebelum peluncuran.",

  announcement: {
    enabled: true,
    message: "Gratis ongkir untuk pembelian pertama di toko resmi — segera hadir.",
    ctaLabel: "Pelajari",
    href: "/products",
  },

  contact: {
    /** Placeholder contact details — replace with verified company data. */
    email: "halo@citrava.example",
    phone: "+62 21 0000 0000",
    whatsapp: "+62 812 0000 0000",
    address: {
      line1: "Alamat kantor (placeholder)",
      line2: "Jakarta, Indonesia",
      country: "Indonesia",
    },
    hours: "Senin–Jumat, 09.00–17.00 WIB",
  },

  company: {
    /** Placeholder company story — must be replaced with the real company narrative. */
    story: [
      "CITRAVA lahir dari satu pengamatan sederhana: mencuci piring bukan sekadar pekerjaan rumah, tetapi bagian dari ritme harian yang menentukan suasana dapur.",
      "Kami mengembangkan rangkaian produk kebersihan dapur yang mudah digunakan, wangi citrus yang tidak berlebihan, dan dikemas agar rapi di dapur Indonesia.",
      "Cerita perusahaan di halaman ini masih berupa placeholder. Tim CITRAVA akan melengkapinya dengan narasi resmi, sejarah, dan informasi perusahaan yang terverifikasi.",
    ],
    vision:
      "Menjadi merek kebersihan dapur pilihan keluarga Indonesia yang menghadirkan pengalaman bersih yang segar, praktis, dan menyenangkan.",
    missions: [
      "Menghadirkan produk kebersihan dapur yang mudah dipakai sehari-hari.",
      "Menjaga pengalaman mencuci piring tetap ringan lewat aroma citrus yang segar.",
      "Menyediakan pilihan ukuran dan format yang sesuai kebutuhan rumah tangga.",
      "Membangun komunikasi merek yang jujur, jelas, dan tidak berlebihan.",
    ],
    values: [
      {
        title: "Segar",
        description:
          "Aroma citrus dipilih agar aktivitas mencuci terasa lebih ringan dan menyenangkan.",
        icon: "sparkles",
      },
      {
        title: "Sederhana",
        description:
          "Produk dirancang mudah digunakan oleh siapa saja di rumah, tanpa langkah rumit.",
        icon: "droplets",
      },
      {
        title: "Praktis",
        description:
          "Tersedia beragam ukuran, dari kemasan kecil hingga isi ulang untuk pemakaian rutin.",
        icon: "layers",
      },
      {
        title: "Terbuka",
        description:
          "Kami tidak membuat klaim berlebihan dan akan menampilkan informasi produk secara transparan.",
        icon: "shield-check",
      },
    ],
  },

  socials: [
    { label: "Instagram", href: "#", handle: "@citrava (placeholder)", icon: "instagram" },
    { label: "TikTok", href: "#", handle: "@citrava (placeholder)", icon: "tiktok" },
    { label: "YouTube", href: "#", handle: "CITRAVA (placeholder)", icon: "youtube" },
  ] satisfies SocialConfig[],

  /**
   * Marketplace / distribution links.
   * `status: "placeholder"` renders a clearly disabled "segera hadir" state.
   * Replace `href` with a verified official store URL and set status to "live".
   */
  marketplaces: [
    { name: "Marketplace A", description: "Toko resmi — segera hadir", href: null, status: "placeholder" },
    { name: "Marketplace B", description: "Toko resmi — segera hadir", href: null, status: "placeholder" },
    { name: "Toko Retail", description: "Daftar retailer — segera hadir", href: null, status: "placeholder" },
    { name: "WhatsApp", description: "Pemesanan langsung — segera hadir", href: null, status: "placeholder" },
  ] satisfies MarketplaceConfig[],

  legal: {
    privacyUpdated: "1 Oktober 2026",
    termsUpdated: "1 Oktober 2026",
  },
} as const;

export type SiteConfig = typeof siteConfig;
