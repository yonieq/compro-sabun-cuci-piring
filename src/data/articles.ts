import type { Article } from "@/types/product";

/**
 * DEMO EDITORIAL CONTENT.
 *
 * All articles below are written for the prototype and are clearly demo
 * content: no certifications, awards, laboratory claims or statistics are
 * asserted. Replace or expand before launch.
 */

export const articleCategories = [
  "Tips Dapur",
  "Panduan Produk",
  "Gaya Hidup",
  "Perawatan",
] as const;

export const articles: Article[] = [
  {
    slug: "mengangkat-lemak-piring",
    title: "Cara Mengangkat Lemak di Piring Tanpa Menggosok Berlebihan",
    excerpt:
      "Lemak yang sudah mengeras sering membuat piring sulit dibersihkan. Beberapa kebiasaan sederhana bisa membuat prosesnya jauh lebih ringan.",
    category: "Tips Dapur",
    categoryId: "tips",
    readingTime: 5,
    publishedAt: "2026-09-18",
    author: "Tim Redaksi CITRAVA",
    coverImage: "/images/articles/artikel-lemak.svg",
    coverAlt:
      "Ilustrasi botol sabun cuci piring dengan irisan jeruk nipis dan gelembung sabun",
    featured: true,
    status: "demo",
    content: [
      {
        paragraphs: [
          "Piring yang menumpuk setelah makan malam besar sering menjadi ujian kesabaran. Lemak yang sudah dingin menempel kuat, dan semakin lama dibiarkan, semakin keras pula lapisannya. Kabar baiknya: Anda tidak selalu perlu menggosok lebih keras.",
          "Kunci utama mengangkat lemak adalah memberi waktu bagi produk pembersih untuk bekerja, lalu menggunakan suhu air yang tepat. Dua hal sederhana ini sering terlewat.",
        ],
      },
      {
        heading: "Mulai dari air yang tepat",
        paragraphs: [
          "Air hangat membantu melunakkan lemak sehingga lebih mudah diangkat dari permukaan piring. Namun air yang terlalu panas juga tidak selalu lebih baik, terutama untuk peralatan dengan lapisan tertentu.",
          "Untuk piring sehari-hari, air hangat yang nyaman di tangan sudah cukup. Jika lemak sudah mengeras, rendam piring beberapa menit sebelum mulai mencuci.",
        ],
      },
      {
        heading: "Beri waktu produk bekerja",
        paragraphs: [
          "Salah satu kesalahan umum adalah menuangkan sabun lalu langsung menggosok sekuat tenaga. Padahal, memberi jeda beberapa detik setelah sabun bersentuhan dengan lemak dapat membantu proses pembersihan.",
        ],
        list: [
          "Basahi piring dengan air hangat.",
          "Tuangkan sabun secukupnya, lalu diamkan sebentar.",
          "Gosok dengan spons lembut, mulai dari bagian tengah.",
          "Bilas hingga tidak ada sisa busa.",
        ],
      },
      {
        heading: "Perhatikan spons yang Anda pakai",
        paragraphs: [
          "Spons yang sudah lama dipakai, kotor, atau berbau tidak akan membantu hasil cucian. Ganti spons secara berkala, dan pertimbangkan menggunakan spons berbeda untuk piring dan untuk area yang lebih kotor.",
        ],
        callout:
          "Tips: untuk lemak yang sangat membandel, rendam piring dalam air hangat beberapa saat sebelum mencuci. Waktu rendam sering lebih efektif daripada tenaga tambahan.",
      },
      {
        heading: "Setelah mencuci",
        paragraphs: [
          "Pastikan piring benar-benar kering sebelum disimpan. Sisa air yang tertinggal dapat membuat area lembap, dan area lembap tidak nyaman untuk penyimpanan peralatan makan.",
          "Menjaga kebiasaan kecil ini membuat dapur terasa lebih rapi, dan pekerjaan mencuci berikutnya menjadi lebih singkat.",
        ],
      },
    ],
    seoTitle: "Cara Mengangkat Lemak di Piring — Tips Dapur CITRAVA",
    seoDescription:
      "Panduan sederhana mengangkat lemak di piring: suhu air, waktu kontak sabun, dan perawatan spons. Konten demo CITRAVA.",
  },
  {
    slug: "aroma-citrus-yang-menempel-di-ingatan",
    title: "Kenapa Aroma Citrus Terasa Menyegarkan di Dapur",
    excerpt:
      "Jeruk nipis dan lemon bukan hanya soal wangi. Ada alasan mengapa aroma citrus terasa cocok untuk ruang yang identik dengan kebersihan.",
    category: "Gaya Hidup",
    categoryId: "gaya-hidup",
    readingTime: 4,
    publishedAt: "2026-09-10",
    author: "Tim Redaksi CITRAVA",
    coverImage: "/images/articles/artikel-citrus.svg",
    coverAlt: "Ilustrasi jeruk lemon dan lime dengan latar kuning cerah",
    featured: true,
    status: "demo",
    content: [
      {
        paragraphs: [
          "Coba ingat wangi apa yang muncul di kepala Anda ketika membayangkan dapur yang bersih. Banyak orang menjawab hal yang sama: sesuatu yang segar, sedikit asam, dan ringan. Citrus sering menjadi jawabannya.",
          "Aroma memainkan peran besar dalam cara kita merasakan kebersihan. Ruangan yang wangi segar terasa lebih nyaman, bahkan sebelum kita memeriksa apakah permukaannya benar-benar bersih.",
        ],
      },
      {
        heading: "Segar, ringan, dan mudah dikenali",
        paragraphs: [
          "Jeruk nipis dan lemon memiliki profil aroma yang tajam namun ringan. Aroma ini tidak menutupi bau lain dengan wangi yang berat, tetapi memberi kesan bersih dan terbuka.",
          "Itulah sebabnya banyak produk kebersihan rumah tangga memilih keluarga aroma citrus: mudah dikenali, diterima banyak orang, dan tidak terlalu mencolok.",
        ],
      },
      {
        heading: "Menciptakan ritual kecil",
        paragraphs: [
          "Menambahkan aroma pada aktivitas rumah tangga bisa mengubah cara kita menjalaninya. Kegiatan yang tadinya terasa sebagai kewajiban dapat terasa sedikit lebih menyenangkan.",
        ],
        quote:
          "Aroma tidak membuat piring lebih bersih. Tetapi ia membuat prosesnya terasa lebih ringan untuk dijalani.",
      },
      {
        heading: "Seimbang, bukan berlebihan",
        paragraphs: [
          "Wangi yang terlalu kuat justru dapat mengganggu, terutama di ruang dapur yang berventilasi terbatas. CITRAVA memilih arah aroma yang segar dan tidak berlebihan agar tetap nyaman digunakan setiap hari.",
          "Jika Anda sensitif terhadap wangi tertentu, selalu periksa informasi produk dan gunakan di area dengan sirkulasi udara yang baik.",
        ],
      },
    ],
    seoTitle: "Aroma Citrus dan Kesegaran Dapur — Cerita CITRAVA",
    seoDescription:
      "Mengapa aroma citrus terasa identik dengan dapur bersih, dan bagaimana menghadirkan kesegaran tanpa berlebihan. Konten demo CITRAVA.",
  },
  {
    slug: "ritme-dapur-yang-lebih-ringan",
    title: "Membangun Ritme Dapur yang Lebih Ringan Setiap Hari",
    excerpt:
      "Dapur yang rapi tidak lahir dari satu kali bersih-bersih besar. Ia terbentuk dari kebiasaan kecil yang dilakukan berulang.",
    category: "Gaya Hidup",
    categoryId: "gaya-hidup",
    readingTime: 6,
    publishedAt: "2026-08-29",
    author: "Tim Redaksi CITRAVA",
    coverImage: "/images/articles/artikel-dapur.svg",
    coverAlt:
      "Ilustrasi dapur hijau dengan ubin, botol sabun cuci piring, dan irisan jeruk nipis",
    featured: true,
    status: "demo",
    content: [
      {
        paragraphs: [
          "Sebagian orang menganggap kebersihan dapur adalah proyek akhir pekan. Kenyataannya, dapur yang paling nyaman biasanya dirawat dengan cara yang paling sederhana: sedikit, tetapi sering.",
        ],
      },
      {
        heading: "Prinsip lima menit",
        paragraphs: [
          "Alih-alih menunggu menumpuk, luangkan beberapa menit setelah memasak untuk membereskan area kerja. Meja yang langsung dibersihkan jauh lebih mudah dirawat daripada meja yang dibiarkan semalaman.",
        ],
        list: [
          "Bersihkan permukaan kerja setelah selesai memasak.",
          "Cuci peralatan yang paling sering dipakai lebih dulu.",
          "Keringkan area sekitar wastafel agar tidak lembap.",
          "Kembalikan bahan makanan ke tempat penyimpanan.",
        ],
      },
      {
        heading: "Tempat untuk setiap hal",
        paragraphs: [
          "Dapur terasa berantakan bukan selalu karena kotor, tetapi karena barang tidak punya tempat yang jelas. Menentukan satu tempat untuk spons, satu tempat untuk lap, dan satu tempat untuk produk pembersih membuat dapur terasa lebih tenang.",
          "Penyimpanan yang jelas juga memudahkan anggota keluarga lain ikut menjaga kerapian tanpa perlu diingatkan.",
        ],
      },
      {
        heading: "Pilih peralatan yang mudah dirawat",
        paragraphs: [
          "Semakin sedikit langkah yang dibutuhkan untuk merawat sesuatu, semakin besar kemungkinan hal itu dilakukan secara konsisten. Ini berlaku untuk peralatan masak, wadah penyimpanan, hingga produk pembersih yang Anda gunakan.",
          "Produk dengan ukuran yang sesuai kebutuhan harian, misalnya, membuat Anda tidak perlu sering membeli dan tidak kehabisan di saat yang tidak tepat.",
        ],
      },
      {
        heading: "Rayakan kemajuan kecil",
        paragraphs: [
          "Ritme tidak terbentuk dalam sehari. Mulailah dari satu kebiasaan, lalu tambahkan kebiasaan berikutnya ketika yang pertama sudah terasa alami.",
        ],
        callout:
          "Dapur yang bersih adalah hasil dari kebiasaan, bukan dari usaha besar sesekali.",
      },
    ],
    seoTitle: "Ritme Dapur Lebih Ringan — Gaya Hidup CITRAVA",
    seoDescription:
      "Kebiasaan kecil untuk menjaga dapur tetap rapi dan nyaman setiap hari. Konten demo CITRAVA.",
  },
  {
    slug: "memilih-ukuran-sabun-cuci-piring",
    title: "Memilih Ukuran Sabun Cuci Piring Sesuai Kebutuhan Rumah",
    excerpt:
      "Dari 58 mL hingga 1,5 L, setiap ukuran punya perannya sendiri. Ini panduan sederhana memilih yang paling masuk akal untuk dapur Anda.",
    category: "Panduan Produk",
    categoryId: "panduan",
    readingTime: 4,
    publishedAt: "2026-08-14",
    author: "Tim Redaksi CITRAVA",
    coverImage: "/images/lifestyle/tips-mencuci-piring.svg",
    coverAlt:
      "Ilustrasi botol sabun cuci piring dengan irisan jeruk nipis dan gelembung",
    featured: false,
    status: "demo",
    content: [
      {
        paragraphs: [
          "Rak produk sabun cuci piring sering menawarkan banyak pilihan ukuran. Membeli yang paling besar belum tentu paling hemat, dan membeli yang kecil belum tentu paling praktis. Semuanya bergantung pada pola pemakaian.",
        ],
      },
      {
        heading: "Ukuran kecil: untuk mencoba dan untuk bepergian",
        paragraphs: [
          "Kemasan 58 mL hingga 105 mL cocok untuk kamar kos, perjalanan, atau sekadar mencoba varian baru sebelum membeli ukuran besar. Ukurannya ringan dan tidak memakan tempat.",
        ],
      },
      {
        heading: "Ukuran menengah: keseimbangan sehari-hari",
        paragraphs: [
          "Ukuran 230 mL hingga 430 mL adalah pilihan umum untuk rumah kecil dengan kebutuhan mencuci yang stabil. Mudah disimpan di dekat wastafel tanpa memenuhi area kerja.",
        ],
      },
      {
        heading: "Ukuran besar: untuk kebutuhan rutin",
        paragraphs: [
          "680 mL hingga 1,5 L lebih cocok untuk rumah dengan aktivitas dapur tinggi, atau untuk keluarga yang mencuci piring beberapa kali sehari. Ukuran besar juga biasanya menjadi pilihan untuk isi ulang.",
        ],
        list: [
          "Hitung perkiraan pemakaian harian di rumah Anda.",
          "Pertimbangkan ruang penyimpanan di dapur.",
          "Periksa apakah ukuran besar tersedia dalam format isi ulang.",
          "Simpan di tempat sejuk dan jauh dari jangkauan anak-anak.",
        ],
      },
      {
        heading: "Yang lebih penting dari ukuran",
        paragraphs: [
          "Apa pun ukuran yang Anda pilih, kebiasaan menuang secukupnya dan menyimpan produk dengan benar akan lebih menentukan pengalaman mencuci daripada ukuran kemasannya.",
        ],
      },
    ],
    seoTitle: "Panduan Memilih Ukuran Sabun Cuci Piring — CITRAVA",
    seoDescription:
      "Panduan memilih ukuran sabun cuci piring dari 58 mL sampai 1,5 L sesuai kebutuhan rumah. Konten demo CITRAVA.",
  },
  {
    slug: "merawat-peralatan-dapur",
    title: "Merawat Peralatan Dapur agar Lebih Tahan Lama",
    excerpt:
      "Peralatan dapur yang dirawat dengan benar bertahan lebih lama dan lebih nyaman dipakai. Mulai dari hal-hal yang sering terlewat.",
    category: "Perawatan",
    categoryId: "perawatan",
    readingTime: 5,
    publishedAt: "2026-07-30",
    author: "Tim Redaksi CITRAVA",
    coverImage: "/images/lifestyle/merawat-peralatan-dapur.svg",
    coverAlt:
      "Ilustrasi peralatan dapur dan botol pembersih dengan latar krem",
    featured: false,
    status: "demo",
    content: [
      {
        paragraphs: [
          "Peralatan dapur adalah investasi jangka panjang. Tanpa perawatan, alat yang awalnya nyaman bisa cepat kusam, berbau, atau berubah fungsi.",
        ],
      },
      {
        heading: "Keringkan sebelum disimpan",
        paragraphs: [
          "Air yang tertinggal pada peralatan logam dapat mempercepat munculnya karat atau noda. Setelah dicuci, keringkan dengan lap bersih atau biarkan di rak pengering sebelum disimpan.",
        ],
      },
      {
        heading: "Pisahkan alat yang mudah tergores",
        paragraphs: [
          "Peralatan dengan lapisan anti lengket sebaiknya tidak digosok dengan bahan abrasif. Gunakan spons lembut dan hindari menumpuknya dengan alat logam tanpa pelindung.",
        ],
        list: [
          "Gunakan spons lembut untuk lapisan anti lengket.",
          "Hindari merendam alat kayu terlalu lama.",
          "Bersihkan talenan segera setelah digunakan.",
          "Simpan alat tajam secara terpisah.",
        ],
      },
      {
        heading: "Perhatikan talenan dan spons",
        paragraphs: [
          "Talenan dan spons adalah dua benda yang paling sering terlewat. Keduanya menyerap air dan sisa makanan, sehingga perlu dibersihkan dan dikeringkan dengan baik, serta diganti secara berkala.",
        ],
        callout:
          "Jika spons sudah berbau atau talenan sudah sangat tergores, saatnya mengganti. Biaya penggantian jauh lebih kecil daripada risiko kenyamanan dapur.",
      },
      {
        heading: "Sesuaikan dengan bahan",
        paragraphs: [
          "Setiap bahan punya kebutuhan perawatan berbeda. Mengetahui bahan peralatan Anda membantu memilih cara mencuci yang tepat dan menghindari kerusakan yang tidak perlu.",
        ],
      },
    ],
    seoTitle: "Merawat Peralatan Dapur agar Tahan Lama — CITRAVA",
    seoDescription:
      "Cara sederhana merawat peralatan dapur: pengeringan, penyimpanan, dan perawatan talenan. Konten demo CITRAVA.",
  },
  {
    slug: "menjaga-area-memasak-tetap-bersih",
    title: "Menjaga Area Memasak Tetap Bersih Selama Minggu Sibuk",
    excerpt:
      "Tidak perlu bersih-bersih besar setiap hari. Dengan urutan yang tepat, area memasak bisa tetap terkendali bahkan di minggu tersibuk.",
    category: "Tips Dapur",
    categoryId: "tips",
    readingTime: 5,
    publishedAt: "2026-07-12",
    author: "Tim Redaksi CITRAVA",
    coverImage: "/images/lifestyle/area-memasak-bersih.svg",
    coverAlt:
      "Ilustrasi area memasak dengan ubin hijau, botol sabun, dan buah lime",
    featured: false,
    status: "demo",
    content: [
      {
        paragraphs: [
          "Ada minggu-minggu ketika memasak terasa seperti balapan. Di tengah kesibukan, area memasak bisa dengan cepat berubah dari rapi menjadi penuh. Kuncinya bukan menambah waktu, tetapi mengatur urutan.",
        ],
      },
      {
        heading: "Bersihkan sambil memasak",
        paragraphs: [
          "Manfaatkan waktu menunggu masakan matang untuk membereskan sisa bahan atau mencuci alat yang sudah tidak dipakai. Sedikit demi sedikit, tumpukan di akhir berkurang.",
        ],
      },
      {
        heading: "Fokus pada titik yang paling sering disentuh",
        paragraphs: [
          "Pegangan kompor, tombol, dan permukaan meja kerja adalah area yang paling sering disentuh. Membersihkannya secara rutin memberi dampak besar pada kesan bersih dapur.",
        ],
        list: [
          "Lap permukaan kerja setelah selesai memasak.",
          "Bersihkan area sekitar kompor dari cipratan minyak.",
          "Keringkan wastafel sebelum meninggalkan dapur.",
          "Kosongkan tempat sampah secara rutin.",
        ],
      },
      {
        heading: "Siapkan perlengkapan di satu tempat",
        paragraphs: [
          "Menyimpan lap, spons, dan produk pembersih dalam satu area membuat proses membersihkan lebih cepat dimulai. Semakin mudah dimulai, semakin besar kemungkinan selesai.",
        ],
        quote:
          "Kebersihan area memasak lebih ditentukan oleh konsistensi kecil daripada usaha besar yang jarang.",
      },
    ],
    seoTitle: "Menjaga Area Memasak Tetap Bersih — Tips CITRAVA",
    seoDescription:
      "Urutan praktis menjaga area memasak tetap bersih selama minggu sibuk. Konten demo CITRAVA.",
  },
];

export const featuredArticles = articles.filter((article) => article.featured);

export const getArticleBySlug = (slug: string): Article | undefined =>
  articles.find((article) => article.slug === slug);

export const getRelatedArticles = (article: Article, limit = 3): Article[] =>
  articles
    .filter((candidate) => candidate.slug !== article.slug)
    .sort((a, b) => {
      const aScore = a.categoryId === article.categoryId ? 0 : 1;
      const bScore = b.categoryId === article.categoryId ? 0 : 1;
      return aScore - bScore;
    })
    .slice(0, limit);

export const articleSlugs = articles.map((article) => article.slug);

export const articleDateFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export const formatArticleDate = (iso: string): string =>
  articleDateFormatter.format(new Date(`${iso}T00:00:00`));
