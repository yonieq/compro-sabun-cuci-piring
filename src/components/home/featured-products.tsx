import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ProductCarousel } from "@/components/products/product-carousel";
import { Reveal } from "@/components/shared/animated-section";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { getFeaturedProducts } from "@/data/products";

/** Featured product rail — data comes from src/data/products.ts. */
export function FeaturedProducts() {
  const featured = getFeaturedProducts(4);

  return (
    <section
      aria-labelledby="featured-heading"
      className="relative bg-brand-offwhite section-y"
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Rangkaian Produk"
            title="Temukan Kesegaran Pilihanmu"
            description="Dari jeruk nipis yang klasik hingga green tea yang lebih lembut — setiap varian dirancang untuk menemani rutinitas dapur dengan karakternya sendiri."
            action={
              <Link
                href="/products"
                className="group inline-flex items-center gap-2 rounded-full border border-brand-deep/12 px-5 py-3 text-[0.84rem] font-semibold text-brand-deep transition-colors hover:border-brand-deep/35 hover:bg-white"
              >
                Lihat semua produk
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                />
              </Link>
            }
            id="featured-heading"
          />
        </Reveal>

        <Reveal delay={0.08} className="mt-10">
          <ProductCarousel products={featured} />
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-6 text-[0.72rem] leading-relaxed text-ink-soft/60">
            Produk di atas menggunakan data referensi demo. Nama merek pihak
            ketiga hanya untuk keperluan pengujian desain dan bukan produk
            CITRAVA.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
