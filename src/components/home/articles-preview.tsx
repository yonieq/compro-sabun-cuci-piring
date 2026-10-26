import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/animated-section";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { articles, formatArticleDate } from "@/data/articles";

const preview = articles.slice(0, 3);

/** Three-card editorial preview linking to the article detail pages. */
export function ArticlesPreview() {
  return (
    <section
      aria-labelledby="articles-heading"
      className="relative bg-brand-cream section-y"
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Jurnal CITRAVA"
            title="Bacaan Ringan untuk Dapur Anda"
            description="Catatan, panduan, dan cerita seputar kebersihan dapur — ditulis untuk membantu rutinitas terasa lebih mudah."
            action={
              <Link
                href="/articles"
                className="group inline-flex items-center gap-2 rounded-full border border-brand-deep/12 bg-white/60 px-5 py-3 text-[0.84rem] font-semibold text-brand-deep transition-colors hover:border-brand-deep/35 hover:bg-white"
              >
                Semua artikel
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                />
              </Link>
            }
            id="articles-heading"
          />
        </Reveal>

        <Stagger className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {preview.map((article) => (
            <StaggerItem key={article.slug} as="article">
              <Link
                href={`/articles/${article.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-brand-deep/8 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-36px_rgba(23,77,50,0.4)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={article.coverImage}
                    alt={article.coverAlt}
                    fill
                    sizes="(max-width: 768px) 92vw, (max-width: 1024px) 46vw, 31vw"
                    className="object-cover transition-transform duration-[700ms] group-hover:scale-[1.04]"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/85 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-[0.14em] text-brand-deep backdrop-blur">
                    {article.category}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-4 text-[0.68rem] font-medium text-ink-soft/60">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                      <time dateTime={article.publishedAt}>
                        {formatArticleDate(article.publishedAt)}
                      </time>
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                      {article.readingTime} menit baca
                    </span>
                  </div>

                  <h3 className="mt-3 font-display text-[1.08rem] font-bold leading-snug tracking-[-0.015em] text-brand-charcoal">
                    {article.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-[0.84rem] leading-relaxed text-ink-soft/80">
                    {article.excerpt}
                  </p>

                  <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[0.8rem] font-semibold text-brand-deep">
                    Baca artikel
                    <ArrowRight
                      aria-hidden="true"
                      className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
