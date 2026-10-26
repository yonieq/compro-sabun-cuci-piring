"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/shared/container";
import { siteConfig } from "@/config/site";

const ease = [0.22, 1, 0.36, 1] as const;

const copy = {
  eyebrow: "Kebersihan Dapur Generasi Baru",
  title: ["Dapur Bersih.", "Hidup Lebih Segar."],
  description:
    "CITRAVA menghadirkan sabun cuci piring dan pembersih dapur dengan aroma citrus yang segar. Bersih maksimal untuk peralatan, ringan untuk rutinitas harian Anda.",
};

const stats = [
  { value: "7", label: "Varian aroma" },
  { value: "3", label: "Kategori produk" },
  { value: "30+", label: "Pilihan ukuran" },
];

/**
 * Hero campaign composition.
 * The artwork is an original SVG packshot; floating citrus and bubbles are
 * CSS/SVG ornaments layered around it so the composition stays crisp at any
 * viewport without relying on external photography.
 */
export function HeroSection() {
  const reduce = useReducedMotion();

  const fade = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 26 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.85, delay, ease },
        };

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-brand-offwhite pb-4 pt-24 sm:pb-6 sm:pt-28 lg:pb-8 lg:pt-32"
    >
      {/* Ambient background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-24 -top-24 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle_at_40%_40%,rgba(184,229,75,0.45),transparent_66%)] blur-2xl" />
        <div className="absolute -left-40 top-1/3 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(248,217,64,0.28),transparent_68%)] blur-2xl" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-brand-offwhite" />
      </div>

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-8">
          {/* Copy */}
          <div className="relative z-10 max-w-2xl lg:order-1">
            <motion.p
              {...fade(0.05)}
              className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-brand-deep/10 bg-white/70 px-3 py-1.5 text-[0.58rem] font-semibold uppercase leading-tight tracking-[0.12em] text-brand-deep shadow-[0_8px_24px_-18px_rgba(23,77,50,0.6)] backdrop-blur sm:gap-2 sm:px-4 sm:py-2 sm:text-[0.68rem] sm:tracking-[0.2em]"
            >
              <Sparkles
                className="h-3 w-3 shrink-0 text-brand-green sm:h-3.5 sm:w-3.5"
                aria-hidden="true"
              />
              {copy.eyebrow}
            </motion.p>

            <h1
              id="hero-heading"
              className="mt-6 text-hero font-display font-extrabold text-brand-charcoal"
            >
              <motion.span {...fade(0.12)} className="block">
                {copy.title[0]}
              </motion.span>
              <motion.span
                {...fade(0.2)}
                className="relative mt-1 block w-fit text-brand-green"
              >
                {copy.title[1]}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 320 18"
                  className="absolute -bottom-2 left-0 h-3 w-[92%] text-brand-lime"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M3 13C64 4 148 2 317 8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="7"
                    strokeLinecap="round"
                  />
                </svg>
              </motion.span>
            </h1>

            <motion.p
              {...fade(0.28)}
              className="mt-8 max-w-lg text-lead text-ink-soft"
            >
              {copy.description}
            </motion.p>

            <motion.div
              {...fade(0.36)}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <motion.a
                href="/products"
                whileHover={reduce ? undefined : { y: -2 }}
                whileTap={reduce ? undefined : { scale: 0.985 }}
                className="group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-brand-deep px-7 text-[0.92rem] font-semibold text-brand-offwhite shadow-[0_18px_40px_-18px_rgba(23,77,50,0.85)] transition-colors hover:bg-brand-green"
              >
                Jelajahi Produk
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                />
              </motion.a>
              <a
                href="#tentang"
                className="group inline-flex h-14 items-center justify-center gap-2 rounded-full border border-brand-deep/15 px-7 text-[0.92rem] font-semibold text-brand-deep transition-colors hover:border-brand-deep/40 hover:bg-white/60"
              >
                Kenali Kami
                <span
                  aria-hidden="true"
                  className="grid h-6 w-6 place-items-center rounded-full bg-brand-lime/50 transition-transform group-hover:translate-x-0.5"
                >
                  <ArrowRight className="h-3 w-3" />
                </span>
              </a>
            </motion.div>

            <motion.dl
              {...fade(0.46)}
              className="mt-11 grid grid-cols-3 gap-x-4 border-t border-brand-deep/8 pt-6 sm:flex sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-4"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-display text-2xl font-extrabold tracking-[-0.03em] text-brand-deep">
                    {stat.value}
                  </dd>
                  <span className="mt-0.5 text-[0.66rem] font-medium uppercase leading-tight tracking-[0.1em] text-ink-soft/70 sm:mt-0 sm:text-[0.72rem] sm:tracking-[0.12em]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.dl>

            <motion.p
              {...fade(0.54)}
              className="mt-5 max-w-md text-[0.72rem] leading-relaxed text-ink-soft/60"
            >
              *Angka di atas merujuk pada katalog referensi demo, bukan klaim
              penjualan.
            </motion.p>
          </div>

          {/* Visual */}
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.05, delay: 0.16, ease }}
            className="relative mx-auto w-full max-w-[34rem] px-2 sm:px-4 lg:order-2 lg:max-w-none lg:px-0"
          >
            <div className="relative aspect-square w-full">
              <div
                aria-hidden="true"
                className="absolute inset-[6%] rounded-[42%_58%_46%_54%/52%_44%_56%_48%] bg-gradient-to-br from-brand-lime/45 via-brand-lemon/25 to-brand-green/25 blur-[2px]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-[13%] rounded-full border border-brand-green/15"
              />
              <Image
                src="/images/hero/hero-product.svg"
                alt="Ilustrasi dua botol CITRAVA dengan irisan jeruk nipis, lemon, dan gelembung sabun"
                fill
                priority
                sizes="(max-width: 1024px) 92vw, 46vw"
                className="object-contain mix-blend-multiply drop-shadow-[0_30px_45px_rgba(23,77,50,0.18)]"
              />

              {/* Floating badge - performance-style, no invented claims */}
              <motion.div
                initial={reduce ? false : { opacity: 0, x: 18, y: -8 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.7, duration: 0.7, ease }}
                className="absolute -right-2 -top-3 max-w-[8rem] rounded-2xl border border-white/60 bg-white/85 px-3 py-2 shadow-[0_18px_40px_-22px_rgba(23,77,50,0.55)] backdrop-blur sm:right-3 sm:top-[6%] sm:max-w-none sm:px-4 sm:py-3"
              >
                <div className="flex items-center gap-1 text-brand-lemon">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className="h-3 w-3 fill-current"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="mt-1.5 text-[0.7rem] font-semibold leading-tight text-brand-deep">
                  Aroma citrus
                  <br />
                  <span className="font-medium text-ink-soft/75">
                    segar setiap hari
                  </span>
                </p>
              </motion.div>

              <motion.div
                initial={reduce ? false : { opacity: 0, x: -18, y: 12 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.82, duration: 0.7, ease }}
                className="absolute -bottom-3 -left-2 rounded-2xl border border-white/60 bg-brand-deep/92 px-3 py-2.5 text-brand-offwhite shadow-[0_18px_40px_-22px_rgba(23,77,50,0.7)] backdrop-blur sm:bottom-[9%] sm:left-0 sm:px-4 sm:py-3"
              >
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-brand-lime">
                  Tagline
                </p>
                <p className="mt-1 max-w-[9rem] text-[0.74rem] font-medium leading-snug">
                  {siteConfig.tagline}
                </p>
              </motion.div>

              <motion.span
                aria-hidden="true"
                animate={reduce ? undefined : { y: [0, -14, 0], rotate: [0, 4, 0] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-[6%] top-[16%] h-14 w-14 rounded-full bg-brand-lemon/70 blur-[1px] sm:h-16 sm:w-16"
              />
              <motion.span
                aria-hidden="true"
                animate={reduce ? undefined : { y: [0, 12, 0], rotate: [0, -6, 0] }}
                transition={{
                  duration: 11,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-[26%] right-[4%] h-10 w-10 rounded-full border-[6px] border-brand-lime/60 bg-white/40 sm:h-12 sm:w-12"
              />
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Scrolling citrus strip */}
      <div
        aria-hidden="true"
        className="relative mt-14 overflow-hidden border-y border-brand-deep/6 py-4 sm:mt-16"
      >
        <div className="flex w-max animate-[marquee_38s_linear_infinite] items-center gap-10 opacity-60">
          {Array.from({ length: 2 }).map((_, group) => (
            <div key={group} className="flex items-center gap-10">
              {[
                "Segar Setiap Hari",
                "Aroma Citrus",
                "Pilihan Ukuran Lengkap",
                "Untuk Dapur Indonesia",
                "Bersih Maksimal",
              ].map((item) => (
                <span
                  key={`${group}-${item}`}
                  className="flex items-center gap-10 whitespace-nowrap text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-brand-deep/50"
                >
                  {item}
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-green/60" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
