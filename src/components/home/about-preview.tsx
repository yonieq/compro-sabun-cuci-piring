import { ArrowUpRight, Quote } from "lucide-react";
import Image from "next/image";
import { Reveal } from "@/components/shared/animated-section";
import { ButtonLink } from "@/components/shared/button-link";
import { Container } from "@/components/shared/container";
import { siteConfig } from "@/config/site";

const credentials = [
  { label: "Pendekatan", value: "Citrus-first" },
  { label: "Fokus", value: "Dapur harian" },
  { label: "Jangkauan", value: "Rumah & usaha kecil" },
];

/** Two-column editorial introduction with a lifestyle still-life. */
export function AboutPreview() {
  return (
    <section
      id="tentang"
      aria-labelledby="about-preview-heading"
      className="relative overflow-hidden bg-brand-cream"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-brand-lemon/25 blur-3xl"
      />
      <Container className="section-y">
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <Reveal className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/3.4] overflow-hidden rounded-[2.2rem] bg-white shadow-[0_36px_80px_-40px_rgba(23,77,50,0.4)]">
              <Image
                src="/images/lifestyle/tentang-dapur.svg"
                alt="Ilustrasi dapur hangat dengan botol CITRAVA, wastafel, dan mangkuk buah citrus"
                fill
                sizes="(max-width: 1024px) 92vw, 44vw"
                className="object-cover"
              />
            </div>

            <div className="absolute -bottom-6 -right-3 w-[13.5rem] rounded-2xl border border-brand-deep/8 bg-white/95 p-4 shadow-[0_24px_50px_-30px_rgba(23,77,50,0.5)] backdrop-blur sm:-right-6">
              <Quote className="h-5 w-5 text-brand-green" aria-hidden="true" />
              <p className="mt-2 text-[0.78rem] font-medium leading-snug text-brand-deep">
                “Kebersihan yang terasa ringan untuk dijalani setiap hari.”
              </p>
              <p className="mt-2 text-[0.62rem] uppercase tracking-[0.16em] text-ink-soft/55">
                Filosofi merek
              </p>
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <Reveal>
              <p className="inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-leaf-700">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand-green" />
                Tentang CITRAVA
              </p>
              <h2
                id="about-preview-heading"
                className="mt-4 text-h2 text-balance-tight"
              >
                Lebih dari Sekadar Bersih
              </h2>
              <div className="mt-6 space-y-4 text-[0.97rem] leading-relaxed text-ink-soft">
                {siteConfig.company.story.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <dl className="mt-8 grid gap-4 rounded-3xl border border-brand-deep/8 bg-white/70 p-5 sm:grid-cols-3">
                {credentials.map((item) => (
                  <div key={item.label}>
                    <dt className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-ink-soft/55">
                      {item.label}
                    </dt>
                    <dd className="mt-1 font-display text-[0.95rem] font-bold text-brand-deep">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <ButtonLink href="/about" variant="primary" withArrow>
                  Selengkapnya Tentang Kami
                </ButtonLink>
                <a
                  href="#keunggulan"
                  className="inline-flex items-center gap-1.5 px-2 py-2 text-[0.86rem] font-semibold text-brand-deep transition-colors hover:text-brand-green"
                >
                  Lihat keunggulan
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>

              <p className="mt-5 text-[0.7rem] leading-relaxed text-ink-soft/55">
                *Cerita perusahaan di atas masih berupa placeholder dan akan
                diganti dengan narasi resmi CITRAVA.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
