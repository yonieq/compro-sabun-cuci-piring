"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "@/components/products/product-card";
import { cn } from "@/lib/utils";
import type { Product, ProductCategory } from "@/types/product";

type SortKey = "featured" | "name-asc" | "sizes-desc";

const sortLabels: Record<SortKey, string> = {
  featured: "Unggulan",
  "name-asc": "Nama A–Z",
  "sizes-desc": "Ukuran terbanyak",
};

/**
 * Client-side catalogue filter.
 *
 * The page itself stays static: filters live in the URL query string and are
 * read on the client. `history.replaceState` (not the router) keeps typing
 * responsive and avoids server round-trips; links remain shareable.
 */
export function ProductCatalog({
  products,
  categories,
}: {
  products: Product[];
  categories: ProductCategory[];
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const categoryParam = searchParams.get("kategori");
  const initialCategory =
    categoryParam && categories.some((category) => category.id === categoryParam)
      ? categoryParam
      : "all";

  const [category, setCategory] = useState<string>(initialCategory);
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [sort, setSort] = useState<SortKey>("featured");
  const [syncedCategory, setSyncedCategory] = useState(initialCategory);

  // Adjust state during render when the URL category changes (e.g. back/forward
  // navigation). This avoids a setState-in-effect cascade and an extra paint.
  if (initialCategory !== syncedCategory) {
    setSyncedCategory(initialCategory);
    setCategory(initialCategory);
  }

  // Reflect the active filters in the URL without triggering a navigation.
  useEffect(() => {
    const params = new URLSearchParams();
    if (category !== "all") params.set("kategori", category);
    if (query.trim()) params.set("q", query.trim());
    const next = params.toString();
    const target = next ? `${pathname}?${next}` : pathname;
    window.history.replaceState(null, "", target);
  }, [category, query, pathname]);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    const filtered = products.filter((product) => {
      const inCategory = category === "all" || product.category === category;
      if (!inCategory) return false;
      if (!normalized) return true;
      return (
        product.name.toLowerCase().includes(normalized) ||
        product.tagline.toLowerCase().includes(normalized) ||
        product.referenceBrand.toLowerCase().includes(normalized)
      );
    });

    switch (sort) {
      case "name-asc":
        return [...filtered].sort((a, b) => a.name.localeCompare(b.name, "id"));
      case "sizes-desc":
        return [...filtered].sort((a, b) => b.sizes.length - a.sizes.length);
      default:
        return [...filtered].sort(
          (a, b) => Number(b.featured) - Number(a.featured),
        );
    }
  }, [products, category, query, sort]);

  const reset = () => {
    setCategory("all");
    setQuery("");
    setSort("featured");
    router.replace(pathname, { scroll: false });
  };

  const activeCategory = categories.find((item) => item.id === category);

  return (
    <div>
      {/* Controls */}
      <div className="rounded-[1.75rem] border border-brand-deep/8 bg-white p-4 shadow-[0_20px_50px_-40px_rgba(23,77,50,0.5)] sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-sm">
            <label htmlFor="product-search" className="sr-only">
              Cari produk
            </label>
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft/45"
            />
            <input
              id="product-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Cari nama produk atau aroma…"
              className="h-12 w-full rounded-full border border-brand-deep/10 bg-brand-offwhite pl-11 pr-4 text-[0.88rem] text-brand-charcoal outline-none transition-colors placeholder:text-ink-soft/45 focus:border-brand-green/60 focus:bg-white focus-visible:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 rounded-full border border-brand-deep/10 px-3 py-1.5">
              <SlidersHorizontal
                className="h-3.5 w-3.5 text-ink-soft/60"
                aria-hidden="true"
              />
              <label htmlFor="product-sort" className="sr-only">
                Urutkan produk
              </label>
              <select
                id="product-sort"
                value={sort}
                onChange={(event) => setSort(event.target.value as SortKey)}
                className="bg-transparent text-[0.8rem] font-medium text-brand-deep outline-none"
              >
                {Object.entries(sortLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            {(category !== "all" || query) && (
              <button
                type="button"
                onClick={reset}
                className="rounded-full px-3 py-2 text-[0.8rem] font-semibold text-brand-deep underline-offset-4 hover:underline"
              >
                Reset filter
              </button>
            )}
          </div>
        </div>

        {/* Category chips */}
        <div
          role="group"
          aria-label="Filter kategori produk"
          className="mt-4 flex flex-wrap gap-2"
        >
          <button
            type="button"
            onClick={() => setCategory("all")}
            aria-pressed={category === "all"}
            className={cn(
              "rounded-full border px-4 py-2 text-[0.8rem] font-semibold transition-colors",
              category === "all"
                ? "border-brand-deep bg-brand-deep text-brand-offwhite"
                : "border-brand-deep/12 text-brand-deep hover:border-brand-deep/30 hover:bg-leaf-50",
            )}
          >
            Semua
          </button>
          {categories.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setCategory(item.id)}
              aria-pressed={category === item.id}
              className={cn(
                "rounded-full border px-4 py-2 text-[0.8rem] font-semibold transition-colors",
                category === item.id
                  ? "border-brand-deep bg-brand-deep text-brand-offwhite"
                  : "border-brand-deep/12 text-brand-deep hover:border-brand-deep/30 hover:bg-leaf-50",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Result meta */}
      <div className="mt-8 flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-[0.82rem] text-ink-soft/70" aria-live="polite">
          Menampilkan <strong className="font-semibold text-brand-deep">{results.length}</strong>{" "}
          produk
          {activeCategory ? ` · ${activeCategory.label}` : ""}
          {query.trim() ? ` · “${query.trim()}”` : ""}
        </p>
        <p className="text-[0.72rem] text-ink-soft/50">
          Data katalog referensi demo
        </p>
      </div>

      {/* Grid or empty state */}
      {results.length > 0 ? (
        <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((product) => (
            <li key={product.id}>
              <ProductCard
                product={product}
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-8 flex flex-col items-center gap-4 rounded-[1.75rem] border border-dashed border-brand-deep/15 bg-white/60 px-6 py-16 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-leaf-50 text-brand-deep">
            <Search className="h-6 w-6" aria-hidden="true" />
          </span>
          <div>
            <h3 className="font-display text-xl font-bold text-brand-deep">
              Produk tidak ditemukan
            </h3>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-ink-soft/70">
              Coba kata kunci lain, atau jelajahi seluruh kategori untuk melihat
              semua varian yang tersedia.
            </p>
          </div>
          <button
            type="button"
            onClick={reset}
            className="rounded-full bg-brand-deep px-5 py-2.5 text-[0.84rem] font-semibold text-brand-offwhite transition-colors hover:bg-brand-green"
          >
            Tampilkan semua produk
          </button>
        </div>
      )}

      <p className="mt-10 rounded-2xl bg-brand-cream/70 p-4 text-[0.74rem] leading-relaxed text-ink-soft/70">
        <Link href="/about" className="font-semibold text-brand-deep underline-offset-4 hover:underline">
          Catatan transparansi:
        </Link>{" "}
        katalog ini memakai data referensi demo untuk menguji tampilan. Nama
        merek pihak ketiga tidak menunjukkan kepemilikan atau afiliasi dengan
        CITRAVA.
      </p>
    </div>
  );
}
