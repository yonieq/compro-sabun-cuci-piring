import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/shared/button-link";
import { Container } from "@/components/shared/container";

export const metadata: Metadata = {
  title: "Halaman tidak ditemukan",
  description: "Halaman yang Anda cari tidak tersedia.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-brand-offwhite pt-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-10 h-80 w-80 rounded-full bg-brand-lime/25 blur-3xl"
      />
      <Container className="relative">
        <div className="max-w-xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-brand-deep/10 bg-white/70 px-3.5 py-1.5 text-[0.64rem] font-bold uppercase tracking-[0.2em] text-brand-deep">
            Error 404
          </p>
          <h1 className="mt-5 text-hero font-display font-extrabold text-brand-charcoal">
            Halaman ini belum ada di dapur kami.
          </h1>
          <p className="mt-5 text-lead text-ink-soft">
            Tautan yang Anda buka mungkin sudah berubah atau salah ketik. Silakan
            kembali ke beranda atau jelajahi katalog produk.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/" withArrow>
              Kembali ke Beranda
            </ButtonLink>
            <ButtonLink href="/products" variant="outline">
              Lihat Produk
            </ButtonLink>
          </div>
          <p className="mt-6 text-[0.8rem] text-ink-soft/60">
            Butuh bantuan?{" "}
            <Link
              href="/contact"
              className="font-semibold text-brand-deep underline underline-offset-4"
            >
              Hubungi kami
            </Link>
            .
          </p>
        </div>
      </Container>
    </section>
  );
}
