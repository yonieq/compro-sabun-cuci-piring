import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { cn } from "@/lib/utils";

/**
 * Product card used on the homepage carousel, catalogue grid and related
 * products. Pure presentation — accepts a product from the data layer.
 */
export function ProductCard({
  product,
  priority = false,
  className,
  sizes = "(max-width: 640px) 86vw, (max-width: 1024px) 44vw, 30vw",
}: {
  product: Product;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  const popular = product.sizes.find((size) => size.popular) ?? product.sizes.at(-1)!;

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-brand-deep/8 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-green/25 hover:shadow-[0_30px_60px_-34px_rgba(23,77,50,0.5)]",
        className,
      )}
    >
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-square overflow-hidden"
        tabIndex={-1}
        aria-hidden="true"
      >
        <span
          className="absolute inset-0"
          style={{ background: product.gradient }}
        />
        <Image
          src={product.heroImage}
          alt=""
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover transition-transform duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045]"
        />
        <span className="absolute left-3.5 top-3.5 rounded-full bg-white/85 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-brand-deep backdrop-blur">
          Demo
        </span>
        <span className="absolute bottom-3.5 right-3.5 rounded-full bg-brand-deep/90 px-2.5 py-1 text-[0.62rem] font-semibold tracking-[0.04em] text-brand-offwhite backdrop-blur">
          {popular.label}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-brand-green">
          {product.category === "sabun-cuci-piring"
            ? "Sabun Cuci Piring"
            : product.category === "pembersih-serbaguna"
              ? "Pembersih Serbaguna"
              : "Pencuci Piring, Buah & Sayur"}
        </p>
        <h3 className="mt-2 font-display text-[1.06rem] font-bold leading-snug tracking-[-0.015em] text-brand-charcoal">
          <Link
            href={`/products/${product.slug}`}
            className="after:absolute after:inset-0 focus-visible:outline-none"
          >
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-[0.83rem] leading-relaxed text-ink-soft/80">
          {product.tagline}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <span className="text-[0.72rem] font-medium text-ink-soft/65">
            {product.sizes.length} pilihan ukuran
          </span>
          <span
            aria-hidden="true"
            className="grid h-9 w-9 place-items-center rounded-full bg-leaf-50 text-brand-deep transition-colors duration-300 group-hover:bg-brand-deep group-hover:text-brand-lime"
          >
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </article>
  );
}
