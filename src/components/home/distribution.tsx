import { Clock, Store } from "lucide-react";
import { Reveal } from "@/components/shared/animated-section";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { siteConfig, type MarketplaceConfig } from "@/config/site";

/**
 * Distribution section.
 *
 * All marketplace entries are placeholders. They are rendered as disabled
 * "segera hadir" tiles — no fake official-store URLs are created. To go live,
 * set `href` and `status: "live"` in src/config/site.ts.
 */
export function Distribution() {
  return (
    <section
      id="distribusi"
      aria-labelledby="distribution-heading"
      className="bg-brand-offwhite section-y"
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Distribusi"
            title="Produk Favorit untuk Setiap Dapur"
            description="CITRAVA akan hadir melalui toko resmi dan mitra ritel terpilih. Tautan pembelian di bawah ini masih berupa placeholder sampai kanal resmi tersedia."
            id="distribution-heading"
          />
        </Reveal>

        <Reveal delay={0.06} className="mt-10">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {(siteConfig.marketplaces as MarketplaceConfig[]).map((marketplace) => {
              const isLive =
                marketplace.status === "live" && Boolean(marketplace.href);

              return (
                <li key={marketplace.name}>
                  {isLive ? (
                    <a
                      href={marketplace.href ?? "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex h-full flex-col justify-between gap-6 rounded-3xl border border-brand-deep/10 bg-white p-5 transition-all hover:-translate-y-1 hover:border-brand-green/35 hover:shadow-[0_24px_50px_-30px_rgba(23,77,50,0.45)]"
                    >
                      <Store className="h-5 w-5 text-brand-green" aria-hidden="true" />
                      <span>
                        <span className="block font-display text-[0.98rem] font-bold text-brand-deep">
                          {marketplace.name}
                        </span>
                        <span className="mt-1 block text-[0.76rem] text-ink-soft/65">
                          {marketplace.description}
                        </span>
                      </span>
                    </a>
                  ) : (
                    <div
                      aria-disabled="true"
                      className="flex h-full cursor-not-allowed flex-col justify-between gap-6 rounded-3xl border border-dashed border-brand-deep/15 bg-white/45 p-5"
                    >
                      <div className="flex items-center justify-between">
                        <Store
                          className="h-5 w-5 text-ink-soft/35"
                          aria-hidden="true"
                        />
                        <span className="inline-flex items-center gap-1 rounded-full bg-brand-cream px-2 py-0.5 text-[0.56rem] font-bold uppercase tracking-[0.12em] text-brand-deep/60">
                          <Clock className="h-2.5 w-2.5" aria-hidden="true" />
                          Segera
                        </span>
                      </div>
                      <span>
                        <span className="block font-display text-[0.95rem] font-bold text-brand-deep/60">
                          {marketplace.name}
                        </span>
                        <span className="mt-1 block text-[0.74rem] leading-snug text-ink-soft/50">
                          {marketplace.description}
                        </span>
                      </span>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-[0.72rem] leading-relaxed text-ink-soft/60">
            Catatan: tautan toko resmi belum tersedia pada prototipe ini. Kami
            tidak mencantumkan URL marketplace fiktif. Hubungi tim kami untuk
            informasi ketersediaan.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
