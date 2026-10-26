import { Check, Sparkles } from "lucide-react";
import Image from "next/image";
import { Reveal } from "@/components/shared/animated-section";
import { ButtonLink } from "@/components/shared/button-link";
import { Container } from "@/components/shared/container";
import { getProductBySlug } from "@/data/products";

const highlights = [
  "Aroma jeruk nipis yang segar",
  "Sembilan pilihan ukuran",
  "Cocok untuk pemakaian harian",
];

/** Full-bleed split showcase for the flagship demo variant. */
export function ProductShowcase() {
  const product =
    getProductBySlug("mama-lemon-jeruk-nipis") ?? null;

  if (!product) return null;

  return (
    <section aria-labelledby="showcase-heading" className="section-y">
      <Container>
        <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-brand-deep">
          <div className="grid lg:grid-cols-2">
            <div className="relative z-10 flex flex-col justify-center p-8 sm:p-12 lg:p-14">
              <p className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-brand-lime">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                Varian Andalan
              </p>
              <h2
                id="showcase-heading"
                className="mt-5 max-w-md font-display text-[clamp(1.9rem,3.7vw,3rem)] font-extrabold leading-[1.04] tracking-[-0.03em] text-brand-offwhite"
              >
                Kesegaran jeruk nipis dalam setiap bilasan.
              </h2>
              <p className="mt-5 max-w-sm text-[0.94rem] leading-relaxed text-brand-offwhite/72">
                Aroma citrus yang bersih dan busa yang mudah dibilas membuat
                varian ini pilihan aman untuk dapur yang sibuk. Tersedia dari
                kemasan 58 mL hingga 1,5 L.
              </p>

              <ul className="mt-6 space-y-2.5">
                {highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 text-[0.86rem] text-brand-offwhite/85"
                  >
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-brand-lime/18 text-brand-lime">
                      <Check className="h-3 w-3" aria-hidden="true" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <ButtonLink
                  href={`/products/${product.slug}`}
                  variant="light"
                  withArrow
                >
                  Lihat Detail Produk
                </ButtonLink>
                <ButtonLink
                  href="/products"
                  variant="ghost"
                  className="text-brand-offwhite hover:bg-white/10"
                >
                  Semua Varian
                </ButtonLink>
              </div>
            </div>

            <div className="relative min-h-[22rem] lg:min-h-[32rem]">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(circle_at_62%_46%,rgba(184,229,75,0.42),transparent_64%)]"
              />
              <div
                aria-hidden="true"
                className="absolute -right-10 top-12 h-56 w-56 rounded-full border-[14px] border-brand-lemon/20"
              />
              <div
                aria-hidden="true"
                className="absolute -left-6 bottom-10 h-40 w-40 rounded-full border-[10px] border-brand-lime/15"
              />
              {/* Citrus-tinted stage keeps the packshot artwork from boxing out */}
              <div className="absolute inset-x-6 bottom-10 top-10 overflow-hidden rounded-[2rem] sm:inset-x-10">
                <div className="absolute inset-0 bg-[linear-gradient(155deg,#F7FCE8_0%,#E4F5C9_55%,#CDEBA4_100%)]" />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_1px_1px,rgba(23,77,50,0.16)_1px,transparent_0)] [background-size:18px_18px]"
                />
                <Image
                  src={product.heroImage}
                  alt={`Ilustrasi kemasan ${product.name}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain p-4 drop-shadow-[0_26px_42px_rgba(23,77,50,0.24)] sm:p-6"
                />
              </div>
              <div className="absolute bottom-5 left-5 rounded-full bg-brand-deep/80 px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-brand-offwhite/85 backdrop-blur">
                Data referensi demo
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
