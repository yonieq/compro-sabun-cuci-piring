import { ArrowUpRight, CalendarDays, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { ArticleList } from "@/components/articles/article-list";
import { Reveal } from "@/components/shared/animated-section";
import { Container } from "@/components/shared/container";
import { articles, formatArticleDate } from "@/data/articles";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Artikel & Inspirasi Dapur",
  description:
    "Tips dapur, panduan produk, dan cerita seputar kebersihan dapur dari tim CITRAVA. Bacaan ringan untuk rutinitas yang lebih mudah.",
  path: "/articles",
});

export default function ArticlesPage() {
  const featured = articles.find((article) => article.featured) ?? articles[0];
  const rest = articles.filter((article) => article.slug !== featured.slug);

  return (
    <>
      <section className="relative overflow-hidden bg-brand-offwhite pb-12 pt-24 sm:pt-28 lg:pt-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-brand-lemon/20 blur-3xl"
        />
        <Container className="relative">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-brand-deep/10 bg-white/70 px-3.5 py-1.5 text-[0.64rem] font-bold uppercase tracking-[0.2em] text-brand-deep backdrop-blur">
              Jurnal CITRAVA
            </p>
            <h1 className="mt-5 max-w-3xl text-display font-display font-extrabold text-brand-charcoal">
              Catatan dari dapur yang lebih ringan.
            </h1>
            <p className="mt-6 max-w-xl text-lead text-ink-soft">
              Panduan praktis, cerita aroma, dan ide kecil untuk membuat
              rutinitas dapur terasa lebih menyenangkan.
            </p>
          </Reveal>
        </Container>
      </section>

      <section aria-label="Artikel unggulan" className="pb-12">
        <Container>
          <Reveal>
            <Link
              href={`/articles/${featured.slug}`}
              className="group grid overflow-hidden rounded-[2rem] border border-brand-deep/8 bg-white transition-all duration-300 hover:shadow-[0_36px_70px_-40px_rgba(23,77,50,0.45)] lg:grid-cols-2"
            >
              <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[22rem]">
                <Image
                  src={featured.coverImage}
                  alt={featured.coverAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[800ms] group-hover:scale-[1.03]"
                />
                <span className="absolute left-5 top-5 rounded-full bg-brand-lemon px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.14em] text-brand-deep">
                  Artikel unggulan
                </span>
              </div>

              <div className="flex flex-col justify-center p-6 sm:p-10">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.7rem] font-medium text-ink-soft/60">
                  <span className="rounded-full bg-leaf-50 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-[0.12em] text-brand-deep">
                    {featured.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                    <time dateTime={featured.publishedAt}>
                      {formatArticleDate(featured.publishedAt)}
                    </time>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    {featured.readingTime} menit baca
                  </span>
                </div>

                <h2 className="mt-4 font-display text-[clamp(1.5rem,2.6vw,2.15rem)] font-extrabold leading-[1.1] tracking-[-0.025em] text-brand-charcoal">
                  {featured.title}
                </h2>
                <p className="mt-3 max-w-lg text-[0.92rem] leading-relaxed text-ink-soft/80">
                  {featured.excerpt}
                </p>

                <span className="mt-6 inline-flex items-center gap-2 text-[0.84rem] font-semibold text-brand-deep">
                  Baca artikel
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </Link>
          </Reveal>
        </Container>
      </section>

      <section aria-label="Semua artikel" className="bg-brand-offwhite pb-20 sm:pb-24">
        <Container>
          <Suspense
            fallback={
              <p className="text-sm text-ink-soft/60">Memuat daftar artikel…</p>
            }
          >
            <ArticleList articles={rest} />
          </Suspense>
        </Container>
      </section>
    </>
  );
}
