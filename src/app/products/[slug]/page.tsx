import type { Metadata } from "next";
import { ArrowUpRight, Leaf } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductDetailClient } from "@/components/products/product-detail-client";
import { RelatedProducts } from "@/components/products/related-products";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/animated-section";
import { productCategories } from "@/data/navigation";
import {
  getProductBySlug,
  getRelatedProducts,
  products,
} from "@/data/products";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}


export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return pageMetadata({
      title: "Produk tidak ditemukan",
      description: "Produk yang Anda cari tidak tersedia.",
      path: `/products/${slug}`,
      noIndex: true,
    });
  }

  return pageMetadata({
    title: product.name,
    description: product.seoDescription,
    path: `/products/${product.slug}`,
    image: product.heroImage,
    type: "product",
    keywords: [product.name, product.referenceBrand, "sabun cuci piring"],
  });
}

export default async function ProductDetailPage({
  params,
}: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const related = getRelatedProducts(product, 3);
  const category = productCategories.find((item) => item.id === product.category);
  const totalSizes = product.sizes.length;

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    url: absoluteUrl(`/products/${product.slug}`),
    image: absoluteUrl(product.heroImage),
    category: category?.label ?? "Produk kebersihan dapur",
    brand: { "@type": "Brand", name: "CITRAVA" },
    // No price is invented; offers are intentionally omitted from the prototype.
    isRelatedTo: {
      "@type": "Product",
      name: product.referenceBrand,
      description: "Merek referensi demo (bukan produk CITRAVA).",
    },
  };

  return (
    <>
      <section className="bg-brand-offwhite pb-10 pt-24 sm:pt-28 lg:pt-32">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Produk", href: "/products" },
              ...(category
                ? [
                    {
                      label: category.shortLabel,
                      href: `/products?kategori=${category.id}`,
                    },
                  ]
                : []),
              { label: product.name },
            ]}
          />

          <div className="mt-6">
            <ProductDetailClient product={product} />
          </div>
        </Container>
      </section>

      <section aria-labelledby="product-info-heading" className="bg-brand-cream py-16">
        <Container>
          <Reveal className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
            <div>
              <p className="inline-flex items-center gap-2 text-[0.66rem] font-bold uppercase tracking-[0.2em] text-leaf-700">
                <Leaf className="h-3.5 w-3.5" aria-hidden="true" />
                Informasi Produk
              </p>
              <h2
                id="product-info-heading"
                className="mt-3 text-h2 text-balance-tight"
              >
                Detail yang perlu Anda tahu
              </h2>
              <p className="mt-4 text-[0.9rem] leading-relaxed text-ink-soft/80">
                Informasi di bawah mengikuti struktur data katalog. Nilai yang
                belum tersedia ditandai secara jujur alih-alih diisi dengan
                klaim atau angka yang tidak terverifikasi.
              </p>
            </div>

            <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {[
                { term: "Kategori", detail: category?.label ?? "—" },
                { term: "Rentang ukuran", detail: `${totalSizes} pilihan kemasan` },
                {
                  term: "Ukuran terkecil",
                  detail: product.sizes[0]?.label ?? "—",
                },
                {
                  term: "Ukuran terbesar",
                  detail: product.sizes.at(-1)?.label ?? "—",
                },
                { term: "Format", detail: product.sizes[0]?.unit === "g" ? "Bubuk / gel pembersih" : "Cairan" },
                { term: "Status data", detail: "Referensi demo" },
              ].map((row) => (
                <div
                  key={row.term}
                  className="border-b border-brand-deep/10 pb-3"
                >
                  <dt className="text-[0.64rem] font-semibold uppercase tracking-[0.14em] text-ink-soft/55">
                    {row.term}
                  </dt>
                  <dd className="mt-1 text-[0.94rem] font-semibold text-brand-deep">
                    {row.detail}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.08} className="mt-10">
            <div className="flex flex-col items-start justify-between gap-4 rounded-3xl border border-brand-deep/10 bg-white/70 p-6 sm:flex-row sm:items-center">
              <div>
                <h2 className="font-display text-lg font-bold text-brand-deep">
                  Butuh informasi lebih lanjut?
                </h2>
                <p className="mt-1 text-[0.85rem] text-ink-soft/70">
                  Tanyakan ketersediaan, ukuran, atau rencana distribusi ke tim
                  kami.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand-deep px-5 py-3 text-[0.85rem] font-semibold text-brand-offwhite transition-colors hover:bg-brand-green"
              >
                Hubungi tim
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>

          <RelatedProducts products={related} />
        </Container>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
