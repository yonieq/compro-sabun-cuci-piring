import type { LucideIcon } from "lucide-react";
import {
  Bubbles,
  Citrus,
  Droplets,
  Leaf,
  PackageOpen,
  Sparkles,
  SprayCan,
  Sun,
  UtensilsCrossed,
} from "lucide-react";

/** Homepage benefit strip (intro-level claims only — no certifications). */
export interface Highlight {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const brandHighlights: Highlight[] = [
  {
    icon: Bubbles,
    title: "Membantu Angkat Lemak",
    description:
      "Diformulasikan untuk membantu membersihkan sisa lemak pada piring dan peralatan makan.",
  },
  {
    icon: Citrus,
    title: "Aroma Citrus Menyegarkan",
    description:
      "Nuansa jeruk nipis dan lemon yang ringan, membuat aktivitas mencuci terasa lebih segar.",
  },
  {
    icon: PackageOpen,
    title: "Pilihan Ukuran Praktis",
    description:
      "Dari kemasan kecil hingga isi besar, pilih ukuran yang sesuai kebutuhan dapur Anda.",
  },
  {
    icon: Sparkles,
    title: "Bersih untuk Aktivitas Dapur",
    description:
      "Membantu menjaga peralatan masak dan area kerja tetap nyaman digunakan setiap hari.",
  },
];

/** Interactive "why choose us" story chapters. */
export interface BenefitChapter {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
  icon: LucideIcon;
  accent: string;
  gradient: string;
}

export const benefitChapters: BenefitChapter[] = [
  {
    id: "formulasi",
    eyebrow: "01 — Pendekatan Produk",
    title: "Diformulasikan untuk kenyamanan sehari-hari",
    description:
      "Kami memulai dari kebutuhan dapur nyata: busa yang cukup, aroma yang tidak berlebihan, dan kemasan yang mudah digunakan. Fokus kami adalah pengalaman mencuci yang terasa ringan, bukan klaim yang sulit dibuktikan.",
    points: [
      "Arah formula difokuskan pada pembersihan harian",
      "Aroma citrus yang seimbang, tidak menyengat",
      "Kemasan dirancang mudah dituang dan disimpan",
    ],
    icon: Droplets,
    accent: "#65B832",
    gradient: "linear-gradient(140deg, #EAF8DC 0%, #CFF0AE 100%)",
  },
  {
    id: "pengalaman",
    eyebrow: "02 — Pengalaman Mencuci",
    title: "Aktivitas yang terasa lebih ringan",
    description:
      "Wangi segar dan busa yang mudah dibilas membuat proses mencuci terasa lebih menyenangkan. Detail kecil seperti pegangan botol dan tutup yang rapat ikut menentukan kenyamanan saat digunakan.",
    points: [
      "Busa mudah dibilas hingga bersih",
      "Aroma segar yang bertahan di area dapur",
      "Tutup rapat untuk penyimpanan yang aman",
    ],
    icon: Bubbles,
    accent: "#37B98C",
    gradient: "linear-gradient(140deg, #E3FAF2 0%, #B7E7D0 100%)",
  },
  {
    id: "variasi",
    eyebrow: "03 — Variasi Produk",
    title: "Satu merek, banyak pilihan aroma",
    description:
      "Setiap rumah punya preferensi berbeda. Karena itu kami menyiapkan rangkaian aroma dan format yang bisa disesuaikan dengan kebiasaan keluarga — dari jeruk nipis yang klasik hingga green tea yang lebih lembut.",
    points: [
      "Beragam aroma untuk suasana berbeda",
      "Format cair dan pembersih serbaguna",
      "Rangkaian ukuran dari kecil hingga besar",
    ],
    icon: Leaf,
    accent: "#9DB35B",
    gradient: "linear-gradient(140deg, #F3F7E6 0%, #DCE7BE 100%)",
  },
  {
    id: "praktis",
    eyebrow: "04 — Praktis Sehari-hari",
    title: "Siap menemani ritual dapur Anda",
    description:
      "Kami percaya produk kebersihan terbaik adalah yang benar-benar dipakai. Itu sebabnya kemasan CITRAVA dibuat sederhana, mudah dijangkau, dan tersedia dalam ukuran yang masuk akal untuk kebutuhan harian.",
    points: [
      "Ukuran kecil untuk ruang terbatas",
      "Ukuran besar untuk kebutuhan rutin",
      "Mudah ditemukan di toko dan marketplace",
    ],
    icon: SprayCan,
    accent: "#F0A24B",
    gradient: "linear-gradient(140deg, #FFF4E4 0%, #F8DCC0 100%)",
  },
];

/** Editorial kitchen-lifestyle gallery on the homepage. */
export interface LifestyleCard {
  title: string;
  description: string;
  image: string;
  alt: string;
  href: string;
  tag: string;
  icon: LucideIcon;
}

export const lifestyleCards: LifestyleCard[] = [
  {
    title: "Tips mencuci piring",
    description:
      "Urutan yang tepat membuat tumpukan piring lebih cepat selesai tanpa menggosok berlebihan.",
    image: "/images/lifestyle/tips-mencuci-piring.svg",
    alt: "Ilustrasi botol sabun cuci piring dikelilingi irisan jeruk nipis dan gelembung",
    href: "/articles/mengangkat-lemak-piring",
    tag: "Rutinitas",
    icon: UtensilsCrossed,
  },
  {
    title: "Merawat peralatan dapur",
    description:
      "Cara sederhana menyimpan dan mengeringkan peralatan agar lebih awet dan nyaman dipakai.",
    image: "/images/lifestyle/merawat-peralatan-dapur.svg",
    alt: "Ilustrasi peralatan dapur dan botol pembersih bernuansa krem",
    href: "/articles/merawat-peralatan-dapur",
    tag: "Perawatan",
    icon: PackageOpen,
  },
  {
    title: "Menjaga area memasak",
    description:
      "Kebiasaan kecil selama memasak yang membuat area kerja tetap rapi dan nyaman.",
    image: "/images/lifestyle/area-memasak-bersih.svg",
    alt: "Ilustrasi dapur dengan ubin hijau, botol sabun, dan buah lime",
    href: "/articles/menjaga-area-memasak-tetap-bersih",
    tag: "Kebiasaan",
    icon: Sun,
  },
  {
    title: "Menghadapi noda lemak",
    description:
      "Langkah praktis saat minyak dan lemak menempel di permukaan dapur kesayangan Anda.",
    image: "/images/lifestyle/noda-lemak.svg",
    alt: "Ilustrasi botol pembersih charcoal dapur dengan latar abu-abu lembut",
    href: "/articles/mengangkat-lemak-piring",
    tag: "Solusi",
    icon: Droplets,
  },
];

/** A few honest, non-fabricated "about" stats — all derived from demo data. */
export const aboutStats = [
  { value: 7, suffix: "", label: "Varian referensi demo" },
  { value: 3, suffix: "", label: "Kategori produk" },
  { value: 30, suffix: "+", label: "Referensi ukuran kemasan" },
  { value: 4, suffix: "", label: "Pilar cerita merek" },
];
