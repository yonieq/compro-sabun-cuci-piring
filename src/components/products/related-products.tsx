import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

/** Compact related-product tile used on product detail pages. */
export function RelatedProducts({
  products,
  title = "Varian lain yang mungkin cocok",
}: {
  products: Product[];
  title?: string;
}) {
  if (products.length === 0) return null;

  return (
    <section aria-labelledby="related-products-heading" className="mt-16">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2
          id="related-products-heading"
          className="text-h3 font-display font-bold text-brand-charcoal"
        >
          {title}
        </h2>
        <Link
          href="/products"
          className="group inline-flex items-center gap-1.5 text-[0.82rem] font-semibold text-brand-deep hover:text-brand-green"
        >
          Semua produk
          <ArrowUpRight
            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>

      <ul className="mt-5 grid gap-4 sm:grid-cols-3">
        {products.map((product) => (
          <li key={product.id}>
            <Link
              href={`/products/${product.slug}`}
              className={cn(
                "group flex h-full flex-col overflow-hidden rounded-2xl border border-brand-deep/8 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-32px_rgba(23,77,50,0.45)]",
              )}
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={product.heroImage}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 92vw, 30vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <p className="text-[0.58rem] font-bold uppercase tracking-[0.14em] text-brand-green">
                  {product.category === "sabun-cuci-piring"
                    ? "Cuci Piring"
                    : product.category === "pembersih-serbaguna"
                      ? "Serbaguna"
                      : "Buah & Sayur"}
                </p>
                <h3 className="mt-1.5 font-display text-[0.95rem] font-bold leading-snug text-brand-charcoal">
                  {product.name}
                </h3>
                <p className="mt-1 line-clamp-2 text-[0.76rem] leading-relaxed text-ink-soft/70">
                  {product.tagline}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
