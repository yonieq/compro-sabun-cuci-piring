import type { Product, ProductSize } from "@/types/product";

/**
 * DEMO PRODUCT DATA — reference catalogue.
 *
 * The variants below are used as *temporary reference data* during the design
 * phase. They are inspired by publicly listed Mama Lemon / Mama Lime variants
 * so the layout can be tested with realistic content. They are NOT CITRAVA
 * products, and CITRAVA does not manufacture, own or distribute them.
 *
 * Before launch:
 *  1. Replace every entry with the company's own product data.
 *  2. Replace the packaging artwork in /public/images/products.
 *  3. Set `status` to "published" and `siteConfig.demoMode` to false.
 */

const ml = (value: number, popular = false): ProductSize => ({
  value,
  unit: "mL",
  label: `${value} mL`,
  popular,
});

const grams = (value: number): ProductSize => ({
  value,
  unit: "g",
  label: `${value} g`,
});

export const products: Product[] = [
  {
    id: "p-jeruk-nipis",
    slug: "mama-lemon-jeruk-nipis",
    name: "MAMA Lemon Jeruk Nipis",
    referenceBrand: "Mama Lemon",
    category: "sabun-cuci-piring",
    tagline: "Aroma jeruk nipis yang segar untuk cucian harian.",
    description:
      "Sabun cuci piring cair dengan aroma jeruk nipis. Tersedia dalam banyak pilihan ukuran, dari kemasan kecil untuk sekali pakai hingga isi besar untuk kebutuhan rumah tangga.",
    longDescription:
      "Varian jeruk nipis adalah wajah paling dikenal dari rangkaian demo ini. Aromanya yang segar membuat aktivitas mencuci piring terasa lebih ringan, sementara pilihan ukuran yang lengkap memudahkan penyesuaian dengan kebutuhan dapur — mulai dari kamar kos hingga rumah dengan kebutuhan harian tinggi.",
    features: [
      "Aroma jeruk nipis yang segar dan mudah dikenali",
      "Tersedia sembilan pilihan ukuran",
      "Kemasan praktis untuk pemakaian harian",
      "Cocok untuk mencuci piring dan peralatan makan",
    ],
    sizes: [ml(58), ml(105), ml(230), ml(400), ml(430), ml(680, true), ml(750), ml(1000), ml(1500)],
    heroImage: "/images/products/mama-lemon-jeruk-nipis.svg",
    gallery: [
      "/images/products/mama-lemon-jeruk-nipis.svg",
      "/images/hero/hero-product.svg",
      "/images/lifestyle/tips-mencuci-piring.svg",
    ],
    accentColor: "#65B832",
    gradient: "linear-gradient(135deg, #65B832 0%, #B8E54B 100%)",
    featured: true,
    status: "demo",
    externalUrl: "https://www.mamaindonesia.com/",
    seoTitle: "MAMA Lemon Jeruk Nipis — Referensi Demo Produk",
    seoDescription:
      "Contoh halaman produk untuk varian jeruk nipis dengan sembilan pilihan ukuran. Data referensi demo, bukan produk CITRAVA.",
  },
  {
    id: "p-lemon-mint",
    slug: "mama-lemon-lemon-mint",
    name: "MAMA Lemon Lemon & Daun Mint",
    referenceBrand: "Mama Lemon",
    category: "sabun-cuci-piring",
    tagline: "Perpaduan lemon dan daun mint yang menyegarkan.",
    description:
      "Varian dengan aroma lemon dan daun mint. Pilihan yang tepat jika Anda menyukai wangi segar yang sedikit lebih sejuk setelah mencuci piring.",
    longDescription:
      "Lemon dan daun mint memberi kesan segar yang berbeda dari jeruk nipis: lebih sejuk, dengan nuansa herbal yang ringan. Varian ini tersedia dalam enam ukuran untuk kebutuhan rumah tangga maupun usaha kecil.",
    features: [
      "Aroma lemon dengan sentuhan daun mint",
      "Enam pilihan ukuran",
      "Wangi segar yang tidak berlebihan",
      "Cocok untuk penggunaan harian di rumah",
    ],
    sizes: [ml(58), ml(105), ml(400), ml(430), ml(680, true)],
    heroImage: "/images/products/mama-lemon-lemon-mint.svg",
    gallery: [
      "/images/products/mama-lemon-lemon-mint.svg",
      "/images/lifestyle/area-memasak-bersih.svg",
    ],
    accentColor: "#8FD9A8",
    gradient: "linear-gradient(135deg, #3F9A5B 0%, #8FD9A8 100%)",
    featured: true,
    status: "demo",
    externalUrl: "https://www.mamaindonesia.com/",
    seoTitle: "MAMA Lemon Lemon & Daun Mint — Referensi Demo Produk",
    seoDescription:
      "Contoh halaman produk untuk varian lemon dan daun mint dengan enam pilihan ukuran. Data referensi demo, bukan produk CITRAVA.",
  },
  {
    id: "p-yuzu",
    slug: "mama-lemon-japanese-yuzu",
    name: "MAMA Lemon Japanese Yuzu & Jeruk Nipis",
    referenceBrand: "Mama Lemon",
    category: "sabun-cuci-piring",
    tagline: "Yuzu Jepang berpadu jeruk nipis.",
    description:
      "Varian yuzu dengan sentuhan jeruk nipis. Aroma yang lebih lembut dan ekspresif untuk pengalaman mencuci piring yang berbeda.",
    longDescription:
      "Yuzu memberikan karakter aroma yang lembut dengan sedikit rasa manis-asam. Dalam rangkaian demo ini varian yuzu hanya tersedia dalam satu ukuran, sehingga cocok untuk menampilkan bagaimana satu varian dapat menjadi pilihan khusus di katalog.",
    features: [
      "Aroma yuzu Jepang yang lembut",
      "Sentuhan jeruk nipis untuk kesegaran",
      "Satu pilihan ukuran untuk edisi khusus",
      "Kemasan yang mudah disimpan di dapur",
    ],
    sizes: [ml(680, true)],
    heroImage: "/images/products/mama-lemon-japanese-yuzu.svg",
    gallery: [
      "/images/products/mama-lemon-japanese-yuzu.svg",
      "/images/lifestyle/dapur-bersih.svg",
    ],
    accentColor: "#F8D940",
    gradient: "linear-gradient(135deg, #E0A81F 0%, #F8D940 100%)",
    featured: true,
    status: "demo",
    externalUrl: "https://www.mamaindonesia.com/",
    seoTitle: "MAMA Lemon Japanese Yuzu & Jeruk Nipis — Referensi Demo Produk",
    seoDescription:
      "Contoh halaman produk untuk varian yuzu Jepang dan jeruk nipis. Data referensi demo, bukan produk CITRAVA.",
  },
  {
    id: "p-stain-remover",
    slug: "mama-lemon-stain-remover",
    name: "MAMA Lemon Stain Remover",
    referenceBrand: "Mama Lemon",
    category: "pembersih-serbaguna",
    tagline: "Pembersih dapur untuk noda membandel di area masak.",
    description:
      "Pembersih serbaguna untuk membantu mengangkat noda di area dapur, seperti meja, kompor, dan permukaan kerja lainnya.",
    longDescription:
      "Satu-satunya produk non-cair dalam rangkaian demo ini. Pembersih serbaguna ini ditujukan untuk area dapur yang lebih luas daripada sekadar piring: meja kerja, permukaan kompor, dan area sekitar tempat memasak. Ukurannya menggunakan satuan gram karena format produknya berbeda.",
    features: [
      "Untuk area dapur dan permukaan kerja",
      "Format 500 g",
      "Membantu merawat tampilan area masak",
      "Dikemas praktis untuk penggunaan rutin",
    ],
    sizes: [grams(500)],
    heroImage: "/images/products/mama-lemon-stain-remover.svg",
    gallery: [
      "/images/products/mama-lemon-stain-remover.svg",
      "/images/lifestyle/merawat-peralatan-dapur.svg",
    ],
    accentColor: "#F0A24B",
    gradient: "linear-gradient(135deg, #C77A26 0%, #F5D3A1 100%)",
    featured: false,
    status: "demo",
    externalUrl: "https://www.mamaindonesia.com/",
    seoTitle: "MAMA Lemon Stain Remover — Referensi Demo Produk",
    seoDescription:
      "Contoh halaman produk pembersih serbaguna dapur. Data referensi demo, bukan produk CITRAVA.",
  },
  {
    id: "p-mineral-salt",
    slug: "mama-lime-mineral-salt",
    name: "MAMA Lime Mineral Salt",
    referenceBrand: "Mama Lime",
    category: "pencuci-buah-sayur",
    tagline: "Garaman mineral dengan aroma lime yang ringan.",
    description:
      "Produk pembersih bernuansa lime yang diformulasikan untuk kebutuhan mencuci piring sekaligus buah dan sayur.",
    longDescription:
      "Rangkaian Lime mengeksplorasi sisi yang lebih ringan dan segar dari aktivitas mencuci. Varian Mineral Salt hadir dalam tujuh ukuran dan ditujukan untuk kebutuhan mencuci piring, buah, dan sayur — satu produk untuk beberapa kebiasaan di dapur.",
    features: [
      "Nuansa lime dengan sentuhan garam mineral",
      "Tujuh pilihan ukuran",
      "Untuk kebutuhan cuci piring, buah, dan sayur",
      "Aroma segar yang ringan",
    ],
    sizes: [ml(58), ml(105), ml(230), ml(400), ml(430), ml(680, true), ml(750), ml(1500)],
    heroImage: "/images/products/mama-lime-mineral-salt.svg",
    gallery: [
      "/images/products/mama-lime-mineral-salt.svg",
      "/images/lifestyle/dapur-bersih.svg",
    ],
    accentColor: "#37B98C",
    gradient: "linear-gradient(135deg, #1E9B78 0%, #5FD9AE 100%)",
    featured: true,
    status: "demo",
    externalUrl: "https://www.mamaindonesia.co.id/products",
    seoTitle: "MAMA Lime Mineral Salt — Referensi Demo Produk",
    seoDescription:
      "Contoh halaman produk varian mineral salt untuk piring, buah, dan sayur. Data referensi demo, bukan produk CITRAVA.",
  },
  {
    id: "p-charcoal",
    slug: "mama-lime-charcoal",
    name: "MAMA Lime Charcoal",
    referenceBrand: "Mama Lime",
    category: "pencuci-buah-sayur",
    tagline: "Arang aktif dengan nuansa lime yang tenang.",
    description:
      "Varian charcoal dengan tampilan lebih gelap dan nuansa lime. Ditujukan untuk kebutuhan mencuci piring, buah, dan sayur.",
    longDescription:
      "Charcoal memberi karakter visual yang paling berbeda dalam rangkaian demo: gelap, tenang, dan sedikit lebih maskulin. Varian ini tersedia dalam tiga ukuran dan tetap berada dalam keluarga produk pencuci piring, buah, dan sayur.",
    features: [
      "Nuansa arang aktif dengan aroma lime",
      "Tiga pilihan ukuran",
      "Untuk kebutuhan cuci piring, buah, dan sayur",
      "Tampilan kemasan yang berbeda dari varian lain",
    ],
    sizes: [ml(105), ml(230), ml(680, true)],
    heroImage: "/images/products/mama-lime-charcoal.svg",
    gallery: [
      "/images/products/mama-lime-charcoal.svg",
      "/images/lifestyle/noda-lemak.svg",
    ],
    accentColor: "#5E7C70",
    gradient: "linear-gradient(135deg, #26332D 0%, #7C948A 100%)",
    featured: false,
    status: "demo",
    externalUrl: "https://www.mamaindonesia.co.id/products",
    seoTitle: "MAMA Lime Charcoal — Referensi Demo Produk",
    seoDescription:
      "Contoh halaman produk varian charcoal untuk piring, buah, dan sayur. Data referensi demo, bukan produk CITRAVA.",
  },
  {
    id: "p-green-tea",
    slug: "mama-lime-green-tea",
    name: "MAMA Lime Green Tea & Habbatussauda",
    referenceBrand: "Mama Lime",
    category: "pencuci-buah-sayur",
    tagline: "Green tea dan habbatussauda dalam satu botol.",
    description:
      "Varian green tea dengan habbatussauda. Aroma yang lebih lembut untuk kebutuhan mencuci piring, buah, dan sayur.",
    longDescription:
      "Green tea dan habbatussauda memberi karakter aroma yang lebih hangat dibanding varian lime lainnya. Tersedia dalam tiga ukuran, varian ini melengkapi rentang aroma pada rangkaian demo.",
    features: [
      "Aroma green tea dengan habbatussauda",
      "Tiga pilihan ukuran",
      "Untuk kebutuhan cuci piring, buah, dan sayur",
      "Aroma lembut dan menenangkan",
    ],
    sizes: [ml(58), ml(430), ml(680, true)],
    heroImage: "/images/products/mama-lime-green-tea.svg",
    gallery: [
      "/images/products/mama-lime-green-tea.svg",
      "/images/lifestyle/tips-mencuci-piring.svg",
    ],
    accentColor: "#9DB35B",
    gradient: "linear-gradient(135deg, #6E8C33 0%, #D3DFB2 100%)",
    featured: false,
    status: "demo",
    externalUrl: "https://www.mamaindonesia.co.id/products",
    seoTitle: "MAMA Lime Green Tea & Habbatussauda — Referensi Demo Produk",
    seoDescription:
      "Contoh halaman produk varian green tea dan habbatussauda. Data referensi demo, bukan produk CITRAVA.",
  },
];

/* ------------------------------------------------------------------ */
/* selectors                                                           */
/* ------------------------------------------------------------------ */

export const getProductBySlug = (slug: string): Product | undefined =>
  products.find((product) => product.slug === slug);

export const getFeaturedProducts = (limit?: number): Product[] => {
  const featured = products.filter((product) => product.featured);
  return typeof limit === "number" ? featured.slice(0, limit) : featured;
};

export const getRelatedProducts = (product: Product, limit = 3): Product[] => {
  const sameCategory = products.filter(
    (candidate) =>
      candidate.id !== product.id && candidate.category === product.category,
  );
  const others = products.filter(
    (candidate) =>
      candidate.id !== product.id && candidate.category !== product.category,
  );
  return [...sameCategory, ...others].slice(0, limit);
};

export const productSlugs = products.map((product) => product.slug);

/** Total number of size references across the catalogue (used for metadata). */
export const totalSizeVariants = products.reduce(
  (sum, product) => sum + product.sizes.length,
  0,
);

/** All distinct bottle sizes, sorted ascending, for filter chips if needed. */
export const allSizes = [
  ...new Set(products.flatMap((product) => product.sizes.map((size) => size.label))),
];
