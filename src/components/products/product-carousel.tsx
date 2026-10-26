"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ProductCard } from "@/components/products/product-card";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

/**
 * Horizontal scroll-snap product rail with keyboard and button navigation.
 * Uses native scrolling (no layout animation) so it stays fast on mobile and
 * works without JavaScript for the initial render.
 */
export function ProductCarousel({ products }: { products: Product[] }) {
  const railRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const max = rail.scrollWidth - rail.clientWidth;
    setAtStart(rail.scrollLeft <= 8);
    setAtEnd(rail.scrollLeft >= max - 8);
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    sync();
    rail.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      rail.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  const scrollBy = (direction: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    const firstCard = rail.querySelector<HTMLElement>("[data-card]");
    const step = firstCard ? firstCard.offsetWidth + 16 : rail.clientWidth * 0.8;
    rail.scrollBy({ left: step * direction, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <ul
        ref={railRef}
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-pl-5 px-5 pb-2 sm:-mx-8 sm:scroll-pl-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0"
        aria-label="Produk unggulan"
      >
        {products.map((product, index) => (
          <li
            key={product.id}
            data-card
            className="w-[78vw] shrink-0 snap-start sm:w-[46vw] md:w-[38vw] lg:w-auto"
          >
            <ProductCard product={product} priority={index < 2} />
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-between gap-3 lg:hidden">
        <p className="text-[0.72rem] font-medium uppercase tracking-[0.16em] text-ink-soft/55">
          Geser untuk melihat
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            disabled={atStart}
            aria-label="Produk sebelumnya"
            className={cn(
              "grid h-10 w-10 place-items-center rounded-full border border-brand-deep/12 bg-white text-brand-deep transition-opacity",
              atStart && "opacity-35",
            )}
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            disabled={atEnd}
            aria-label="Produk berikutnya"
            className={cn(
              "grid h-10 w-10 place-items-center rounded-full border border-brand-deep/12 bg-white text-brand-deep transition-opacity",
              atEnd && "opacity-35",
            )}
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
