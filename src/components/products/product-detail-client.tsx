"use client";

import { motion, useReducedMotion } from "motion/react";
import { Check, ChevronLeft, ChevronRight, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useId, useState } from "react";
import { cn } from "@/lib/utils";
import type { Product, ProductSize } from "@/types/product";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Product detail interactive area: image gallery, size selector and selected
 * summary. Kept in one client component so the size selection can drive the
 * gallery caption and the CTA label without extra server round-trips.
 */
export function ProductDetailClient({ product }: { product: Product }) {
  const reduce = useReducedMotion();
  const galleryId = useId().replace(/:/g, "");
  const gallery = product.gallery.length > 0 ? product.gallery : [product.heroImage];

  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<ProductSize>(
    product.sizes.find((size) => size.popular) ?? product.sizes[0],
  );

  const go = (direction: 1 | -1) =>
    setActiveImage((current) => (current + direction + gallery.length) % gallery.length);

  return (
    <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
      {/* Gallery */}
      <div>
        <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-brand-deep/8 bg-white">
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{ background: product.gradient, opacity: 0.12 }}
          />
          <motion.div
            key={activeImage}
            initial={reduce ? false : { opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease }}
            className="absolute inset-0"
          >
            <Image
              src={gallery[activeImage]}
              alt={`${product.name} — tampilan ${activeImage + 1} dari ${gallery.length}`}
              fill
              priority={activeImage === 0}
              loading={activeImage === 0 ? "eager" : "lazy"}
              sizes="(max-width: 1024px) 92vw, 48vw"
              className="object-cover"
            />
          </motion.div>

          <span className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.14em] text-brand-deep backdrop-blur">
            Demo · {product.referenceBrand}
          </span>

          {gallery.length > 1 ? (
            <div className="absolute inset-x-4 bottom-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Gambar sebelumnya"
                aria-controls={galleryId}
                className="grid h-10 w-10 place-items-center rounded-full bg-white/90 text-brand-deep shadow-sm backdrop-blur transition-colors hover:bg-white"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <p className="rounded-full bg-white/85 px-3 py-1 text-[0.66rem] font-semibold text-brand-deep backdrop-blur">
                {activeImage + 1} / {gallery.length}
              </p>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Gambar berikutnya"
                aria-controls={galleryId}
                className="grid h-10 w-10 place-items-center rounded-full bg-white/90 text-brand-deep shadow-sm backdrop-blur transition-colors hover:bg-white"
              >
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          ) : null}
        </div>

        {gallery.length > 1 ? (
          <ul
            id={galleryId}
            className="mt-3 grid grid-cols-3 gap-3"
            aria-label="Pilih tampilan gambar"
          >
            {gallery.map((image, index) => (
              <li key={`${image}-${index}`}>
                <button
                  type="button"
                  onClick={() => setActiveImage(index)}
                  aria-label={`Tampilkan gambar ${index + 1}`}
                  aria-pressed={activeImage === index}
                  className={cn(
                    "relative aspect-[4/3] w-full overflow-hidden rounded-xl border-2 transition-all",
                    activeImage === index
                      ? "border-brand-green ring-2 ring-brand-green/20"
                      : "border-transparent opacity-70 hover:opacity-100",
                  )}
                >
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="160px"
                    className="object-cover"
                  />
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      {/* Details */}
      <div>
        <p
          className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.16em]"
          style={{
            backgroundColor: `${product.accentColor}18`,
            color: product.accentColor,
          }}
        >
          Referensi demo · {product.referenceBrand}
        </p>
        <h1 className="mt-4 text-[clamp(2rem,3.6vw,2.9rem)] font-display font-extrabold leading-[1.04] tracking-[-0.03em] text-brand-charcoal">
          {product.name}
        </h1>
        <p className="mt-3 text-lead text-ink-soft">{product.tagline}</p>

        <p className="mt-5 text-[0.93rem] leading-relaxed text-ink-soft/85">
          {product.longDescription}
        </p>

        <div className="mt-7">
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-brand-deep">
              Pilih ukuran
            </h2>
            <span className="text-[0.7rem] text-ink-soft/55">
              {product.sizes.length} pilihan tersedia
            </span>
          </div>
          <div
            role="group"
            aria-label="Pilihan ukuran kemasan"
            className="mt-3 flex flex-wrap gap-2"
          >
            {product.sizes.map((size) => {
              const selected = selectedSize.label === size.label;
              return (
                <button
                  key={size.label}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  aria-pressed={selected}
                  className={cn(
                    "group relative rounded-xl border px-3.5 py-2 text-[0.8rem] font-semibold transition-all",
                    selected
                      ? "border-brand-deep bg-brand-deep text-brand-offwhite"
                      : "border-brand-deep/12 bg-white text-brand-deep hover:border-brand-deep/35",
                  )}
                >
                  {size.label}
                  {size.popular ? (
                    <span
                      className={cn(
                        "ml-1.5 rounded-full px-1.5 py-0.5 text-[0.52rem] font-bold uppercase tracking-wide",
                        selected
                          ? "bg-brand-lime text-brand-deep"
                          : "bg-brand-lime/40 text-brand-deep",
                      )}
                    >
                      Populer
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-[0.74rem] text-ink-soft/60" aria-live="polite">
            Dipilih: <strong className="font-semibold text-brand-deep">{selectedSize.label}</strong>
            {" · "}Harga belum tersedia pada prototipe.
          </p>
        </div>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <a
            href="/contact"
            className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-brand-deep px-6 py-3.5 text-[0.9rem] font-semibold text-brand-offwhite transition-colors hover:bg-brand-green"
          >
            <Search className="h-4 w-4" aria-hidden="true" />
            Tanya Ketersediaan
          </a>
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-deep/15 px-6 py-3.5 text-[0.9rem] font-semibold text-brand-deep transition-colors hover:bg-white"
          >
            Lihat produk lain
          </Link>
        </div>

        <div className="mt-6 rounded-2xl bg-brand-cream/70 p-4">
          <h2 className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-brand-deep">
            Catatan demo
          </h2>
          <p className="mt-1.5 text-[0.76rem] leading-relaxed text-ink-soft/75">
            Halaman ini menampilkan data referensi untuk keperluan desain. Nama
            “{product.referenceBrand}” bukan milik CITRAVA dan tidak menunjukkan
            afiliasi. Produk, kemasan, serta harga final akan diganti sebelum
            peluncuran.
          </p>
        </div>

        <ul className="mt-6 space-y-2.5">
          {product.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2.5 text-[0.86rem] leading-snug text-ink-soft"
            >
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-leaf-100 text-brand-deep">
                <Check className="h-3 w-3" aria-hidden="true" strokeWidth={3} />
              </span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
