import { Suspense } from "react";
import { PackageOpen } from "lucide-react";
import { ProductCatalog } from "@/components/products/product-filter";
import { Reveal } from "@/components/shared/animated-section";
import { Container } from "@/components/shared/container";
import { products, totalSizeVariants } from "@/data/products";
import { productCategories } from "@/data/navigation";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Katalog Produk",
  description:
    "Jelajahi katalog sabun cuci piring, pembersih serbaguna, dan pencuci buah & sayur CITRAVA. Filter berdasarkan kategori atau cari nama produk.",
  path: "/products",
});

function CatalogFallback() {
  return (
    <div className="flex items-center gap-3 rounded-3xl border border-brand-deep/8 bg-white p-6 text-sm text-ink-soft/70">
      <PackageOpen className="h-5 w-5 text-brand-green" aria-hidden="true" />
      Memuat katalog produk…
    </div>
  );
}

export default function ProductsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-brand-offwhite pb-10 pt-24 sm:pt-28 lg:pt-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-0 h-[28rem] w-[28rem] rounded-full bg-brand-lime/25 blur-3xl"
        />
        <Container className="relative">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-brand-deep/10 bg-white/70 px-3.5 py-1.5 text-[0.64rem] font-bold uppercase tracking-[0.2em] text-brand-deep backdrop-blur">
              Katalog Produk
            </p>
            <h1 className="mt-5 max-w-3xl text-display font-display font-extrabold text-brand-charcoal">
              Pilih kesegaran untuk dapur Anda.
            </h1>
            <p className="mt-6 max-w-xl text-lead text-ink-soft">
              {products.length} varian referensi dalam {productCategories.length}{" "}
              kategori, dengan lebih dari {totalSizeVariants} pilihan ukuran.
              Gunakan filter untuk mempersempit pilihan.
            </p>
          </Reveal>

          <Reveal delay={0.08} className="mt-9">
            <dl className="grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-3">
              {productCategories.map((category) => {
                const count = products.filter(
                  (product) => product.category === category.id,
                ).length;
                return (
                  <div
                    key={category.id}
                    className="rounded-2xl border border-brand-deep/8 bg-white/70 p-4 backdrop-blur"
                  >
                    <dt className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-ink-soft/55">
                      {category.shortLabel}
                    </dt>
                    <dd className="mt-1 font-display text-2xl font-extrabold text-brand-deep">
                      {count}
                      <span className="ml-1 text-[0.7rem] font-medium text-ink-soft/55">
                        varian
                      </span>
                    </dd>
                  </div>
                );
              })}
            </dl>
          </Reveal>
        </Container>
      </section>

      <section aria-label="Daftar produk" className="bg-brand-offwhite pb-20 sm:pb-24">
        <Container>
          <Suspense fallback={<CatalogFallback />}>
            <ProductCatalog products={products} categories={productCategories} />
          </Suspense>
        </Container>
      </section>
    </>
  );
}
