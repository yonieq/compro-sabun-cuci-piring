import type { Metadata } from "next";
import {
  ArrowUpRight,
  Droplets,
  Layers,
  Leaf,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ButtonLink } from "@/components/shared/button-link";
import { Container } from "@/components/shared/container";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/animated-section";
import { SectionHeading } from "@/components/shared/section-heading";
import { siteConfig } from "@/config/site";
import { productCategories } from "@/data/navigation";
import { products } from "@/data/products";
import { pageMetadata } from "@/lib/seo";

const iconMap = {
  sparkles: Sparkles,
  droplets: Droplets,
  layers: Layers,
  "shield-check": ShieldCheck,
} as const;

export const metadata: Metadata = pageMetadata({
  title: "Tentang Kami",
  description:
    "Kenali CITRAVA: filosofi merek, visi dan misi, nilai perusahaan, serta komitmen produk untuk dapur Indonesia. Sebagian konten masih berupa placeholder.",
  path: "/about",
});

const timeline = [
  {
    year: "2026",
    quarter: "Q1",
    title: "Riset kategori",
    description:
      "Meninjau kebutuhan rumah tangga Indonesia pada kategori pembersih dapur dan preferensi aroma.",
    placeholder: true,
  },
  {
    year: "2026",
    quarter: "Q2",
    title: "Pengembangan identitas",
    description:
      "Menyusun arah visual, sistem warna citrus, dan bahasa merek yang segar namun tetap terpercaya.",
    placeholder: true,
  },
  {
    year: "2026",
    quarter: "Q3",
    title: "Uji kemasan & katalog",
    description:
      "Menguji struktur informasi produk, pilihan ukuran, dan pengalaman berbelanja di situs.",
    placeholder: true,
  },
  {
    year: "2026",
    quarter: "Q4",
    title: "Persiapan peluncuran",
    description:
      "Tahap berikutnya akan mencakup verifikasi data perusahaan, lisensi aset, dan kanal distribusi resmi.",
    placeholder: true,
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Intro */}
      <section className="relative overflow-hidden bg-brand-cream pb-16 pt-24 sm:pt-28 lg:pt-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 top-0 h-[32rem] w-[32rem] rounded-full bg-brand-lime/30 blur-3xl"
        />
        <Container className="relative">
          <Breadcrumbs items={[{ label: "Tentang Kami" }]} />
          <div className="mt-7 grid items-end gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-brand-deep/10 bg-white/70 px-3.5 py-1.5 text-[0.64rem] font-bold uppercase tracking-[0.2em] text-brand-deep backdrop-blur">
                <Leaf className="h-3.5 w-3.5 text-brand-green" aria-hidden="true" />
                Tentang CITRAVA
              </p>
              <h1 className="mt-5 text-display font-display font-extrabold text-brand-charcoal">
                Kebersihan yang terasa segar, bukan sekadar bersih.
              </h1>
              <p className="mt-6 max-w-xl text-lead text-ink-soft">
                CITRAVA adalah merek kebersihan dapur yang lahir dari kebiasaan
                sederhana: merawat ruang memasak agar terasa nyaman dipakai
                setiap hari.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/products" withArrow>
                  Lihat Katalog Produk
                </ButtonLink>
                <ButtonLink href="/contact" variant="outline">
                  Bicara dengan Kami
                </ButtonLink>
              </div>
            </div>

            <Reveal className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-white/60 shadow-[0_36px_70px_-40px_rgba(23,77,50,0.5)]">
                <Image
                  src="/images/lifestyle/dapur-bersih.svg"
                  alt="Ilustrasi wastafel dapur dengan gelembung sabun dan botol pembersih"
                  fill
                  priority
                  sizes="(max-width: 1024px) 92vw, 42vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-5 left-5 rounded-2xl bg-brand-deep px-4 py-3 text-brand-offwhite shadow-lg">
                <p className="text-[0.6rem] font-bold uppercase tracking-[0.16em] text-brand-lime">
                  Tagline
                </p>
                <p className="mt-1 text-[0.82rem] font-semibold">
                  {siteConfig.tagline}
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Philosophy */}
      <section aria-labelledby="philosophy-heading" className="overflow-hidden bg-brand-offwhite section-y">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
            <Reveal>
              <SectionHeading
                eyebrow="Filosofi Merek"
                title="Lebih dari Sekadar Bersih"
                description="Kami percaya pengalaman bersih bukan hanya soal hasil akhir, tetapi juga bagaimana prosesnya terasa."
                id="philosophy-heading"
              />
              <div className="mt-6 space-y-4 text-[0.95rem] leading-relaxed text-ink-soft">
                {siteConfig.company.story.map((paragraph) => (
                  <p key={paragraph.slice(0, 30)}>{paragraph}</p>
                ))}
              </div>
              <p className="mt-6 rounded-2xl bg-brand-cream p-4 text-[0.74rem] leading-relaxed text-ink-soft/70">
                <strong className="font-semibold text-brand-deep">
                  Catatan placeholder:
                </strong>{" "}
                narasi di atas adalah contoh untuk prototipe. Sejarah, pendiri,
                dan lokasi perusahaan yang sebenarnya belum disertakan.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="grid gap-4 sm:grid-cols-2">
              {siteConfig.company.values.map((value) => {
                const Icon = iconMap[value.icon as keyof typeof iconMap] ?? Leaf;
                return (
                  <div
                    key={value.title}
                    className="rounded-3xl border border-brand-deep/8 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-36px_rgba(23,77,50,0.45)]"
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-leaf-50 text-brand-deep">
                      <Icon className="h-5 w-5" aria-hidden="true" strokeWidth={1.9} />
                    </span>
                    <h3 className="mt-4 font-display text-[1.02rem] font-bold text-brand-deep">
                      {value.title}
                    </h3>
                    <p className="mt-2 text-[0.84rem] leading-relaxed text-ink-soft/80">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Vision & mission */}
      <section
        aria-labelledby="vision-heading"
        className="relative overflow-hidden bg-brand-deep text-brand-offwhite section-y"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-brand-green/20 blur-3xl"
        />
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <Reveal>
              <p className="inline-flex items-center gap-2 text-[0.66rem] font-bold uppercase tracking-[0.2em] text-brand-lime">
                <Target className="h-3.5 w-3.5" aria-hidden="true" />
                Visi & Misi
              </p>
              <h2
                id="vision-heading"
                className="mt-4 text-h2 text-brand-offwhite"
              >
                Arah yang kami tuju
              </h2>
              <div className="mt-7 rounded-3xl border border-white/12 bg-white/[0.05] p-6">
                <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-brand-lime">
                  Visi
                </p>
                <p className="mt-2 font-display text-[1.15rem] font-semibold leading-relaxed text-brand-offwhite">
                  {siteConfig.company.vision}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-brand-lime">
                Misi
              </p>
              <ol className="mt-4 space-y-4">
                {siteConfig.company.missions.map((mission, index) => (
                  <li
                    key={mission}
                    className="flex items-start gap-4 border-b border-white/10 pb-4 last:border-0"
                  >
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-lime/15 font-display text-[0.8rem] font-bold text-brand-lime">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-[0.94rem] leading-relaxed text-brand-offwhite/80">
                      {mission}
                    </p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Timeline */}
      <section aria-labelledby="timeline-heading" className="overflow-hidden bg-brand-offwhite section-y">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Perjalanan Merek"
              title="Tahapan Pengembangan"
              description="Urutan di bawah adalah kerangka kerja prototipe, bukan sejarah perusahaan yang sebenarnya. Semua entri ditandai sebagai placeholder."
              id="timeline-heading"
            />
          </Reveal>

          <Stagger className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {timeline.map((item, index) => (
              <StaggerItem key={item.title}>
                <div className="relative h-full overflow-hidden rounded-3xl border border-brand-deep/8 bg-white p-6">
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-lime via-brand-green to-brand-deep"
                    style={{ opacity: 1 - index * 0.18 }}
                  />
                  <div className="flex items-center justify-between">
                    <span className="font-display text-2xl font-extrabold tracking-[-0.03em] text-brand-deep">
                      {item.year}
                    </span>
                    <span className="rounded-full bg-leaf-50 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-[0.12em] text-brand-deep/70">
                      {item.quarter}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-[1rem] font-bold text-brand-charcoal">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[0.82rem] leading-relaxed text-ink-soft/78">
                    {item.description}
                  </p>
                  <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-brand-cream px-2.5 py-1 text-[0.56rem] font-bold uppercase tracking-[0.12em] text-brand-deep/70">
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-full bg-brand-lemon"
                    />
                    Placeholder
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Product commitment */}
      <section aria-labelledby="commitment-heading" className="bg-brand-cream section-y">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            <Reveal>
              <SectionHeading
                eyebrow="Komitmen Produk"
                title="Jelas, jujur, dan bisa dipertanggungjawabkan"
                description="Kami memilih untuk tidak mencantumkan klaim yang belum dapat kami buktikan — termasuk sertifikasi, angka laboratorium, atau penghargaan."
                id="commitment-heading"
              />
              <ul className="mt-7 space-y-3">
                {[
                  "Informasi produk disusun dari data terstruktur, bukan teks iklan bebas.",
                  "Klaim pembersihan dibatasi pada fungsi dasar dan pengalaman pemakaian.",
                  "Nama merek pihak ketiga hanya muncul sebagai referensi demo yang ditandai jelas.",
                  "Aset visual dibuat orisinal dan tidak menjiplak kemasan pihak lain.",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[0.9rem] leading-relaxed text-ink-soft"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.08} className="grid gap-3 sm:grid-cols-2">
              {productCategories.map((category) => {
                const count = products.filter(
                  (product) => product.category === category.id,
                ).length;
                return (
                  <Link
                    key={category.id}
                    href={`/products?kategori=${category.id}`}
                    className="group flex flex-col justify-between gap-6 rounded-3xl border border-brand-deep/8 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-green/30 hover:shadow-[0_24px_50px_-36px_rgba(23,77,50,0.45)]"
                  >
                    <div className="flex items-start justify-between">
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-leaf-50 text-brand-deep">
                        <Leaf className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <ArrowUpRight
                        className="h-4 w-4 text-ink-soft/40 transition-colors group-hover:text-brand-deep"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <h3 className="font-display text-[0.98rem] font-bold text-brand-deep">
                        {category.label}
                      </h3>
                      <p className="mt-1 text-[0.78rem] leading-relaxed text-ink-soft/70">
                        {category.description}
                      </p>
                      <p className="mt-3 text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-brand-green">
                        {count} varian demo
                      </p>
                    </div>
                  </Link>
                );
              })}

              <div className="flex flex-col justify-between gap-4 rounded-3xl bg-brand-deep p-5 text-brand-offwhite sm:col-span-2">
                <p className="text-[0.9rem] leading-relaxed text-brand-offwhite/80">
                  Ingin tahu lebih jauh tentang rencana produk CITRAVA? Kami
                  terbuka untuk pertanyaan, masukan, maupun diskusi kerja sama.
                </p>
                <div className="flex flex-wrap gap-2">
                  <ButtonLink href="/contact" variant="light" size="sm" withArrow>
                    Hubungi Kami
                  </ButtonLink>
                  <ButtonLink
                    href="/articles"
                    variant="ghost"
                    size="sm"
                    className="text-brand-offwhite hover:bg-white/10"
                  >
                    Baca jurnal
                  </ButtonLink>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
