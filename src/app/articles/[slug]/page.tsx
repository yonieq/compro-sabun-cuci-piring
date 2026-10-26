import type { Metadata } from "next";
import { CalendarDays, Clock, Quote } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/articles/article-card";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/animated-section";
import {
  articles,
  formatArticleDate,
  getArticleBySlug,
  getRelatedArticles,
} from "@/data/articles";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}


export async function generateMetadata({
  params,
}: PageProps<"/articles/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return pageMetadata({
      title: "Artikel tidak ditemukan",
      description: "Artikel yang Anda cari tidak tersedia.",
      path: `/articles/${slug}`,
      noIndex: true,
    });
  }

  return pageMetadata({
    title: article.seoTitle,
    description: article.seoDescription,
    path: `/articles/${article.slug}`,
    image: article.coverImage,
    type: "article",
    publishedTime: `${article.publishedAt}T00:00:00+07:00`,
    modifiedTime: `${article.updatedAt ?? article.publishedAt}T00:00:00+07:00`,
    keywords: [article.category, "tips dapur", "kebersihan dapur"],
  });
}

export default async function ArticleDetailPage({
  params,
}: PageProps<"/articles/[slug]">) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) notFound();

  const related = getRelatedArticles(article, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: absoluteUrl(article.coverImage),
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    author: { "@type": "Organization", name: article.author },
    publisher: { "@type": "Organization", name: "CITRAVA" },
    mainEntityOfPage: absoluteUrl(`/articles/${article.slug}`),
    articleSection: article.category,
  };

  return (
    <>
      <article>
        <header className="relative overflow-hidden bg-brand-deep pb-16 pt-24 text-brand-offwhite sm:pt-28 lg:pt-32">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 top-0 h-[30rem] w-[30rem] rounded-full bg-brand-green/25 blur-3xl"
          />
          <Container className="relative">
            <Breadcrumbs
              tone="light"
              items={[
                { label: "Artikel", href: "/articles" },
                { label: article.category, href: "/articles" },
                { label: article.title },
              ]}
            />

            <div className="mt-7 max-w-3xl">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.16em] text-brand-lime">
                {article.category}
              </p>
              <h1 className="mt-5 text-balance-tight font-display text-[clamp(2rem,4vw,3.4rem)] font-extrabold leading-[1.04] text-brand-offwhite">
                {article.title}
              </h1>
              <p className="mt-5 max-w-2xl text-[1.02rem] leading-relaxed text-brand-offwhite/72">
                {article.excerpt}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.76rem] text-brand-offwhite/60">
                <span className="inline-flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="grid h-7 w-7 place-items-center rounded-full bg-brand-lime text-[0.6rem] font-bold text-brand-deep"
                  >
                    CR
                  </span>
                  {article.author}
                </span>
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
            </div>
          </Container>
        </header>

        <div className="bg-brand-offwhite">
          <Container>
            <Reveal className="relative -mt-10 overflow-hidden rounded-[2rem] border border-white/40 bg-white shadow-[0_40px_80px_-50px_rgba(23,77,50,0.6)]">
              <div className="relative aspect-[16/9]">
                <Image
                  src={article.coverImage}
                  alt={article.coverAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 76rem"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <div className="mx-auto max-w-[46rem] py-14 sm:py-16">
              {article.content.map((section, index) => (
                <section key={index} className="mb-9 last:mb-0">
                  {section.heading ? (
                    <h2 className="mb-4 mt-10 font-display text-[1.4rem] font-bold tracking-[-0.02em] text-brand-charcoal">
                      {section.heading}
                    </h2>
                  ) : null}

                  {section.paragraphs?.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 28)}
                      className="mb-4 text-[1rem] leading-[1.8] text-ink-soft"
                    >
                      {paragraph}
                    </p>
                  ))}

                  {section.list ? (
                    <ul className="my-5 space-y-2.5 rounded-2xl bg-leaf-50/80 p-5">
                      {section.list.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-[0.94rem] leading-relaxed text-ink-soft"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {section.quote ? (
                    <blockquote className="my-7 rounded-2xl border-l-4 border-brand-green bg-brand-cream/60 p-6">
                      <Quote
                        className="mb-2 h-5 w-5 text-brand-green"
                        aria-hidden="true"
                      />
                      <p className="font-display text-[1.1rem] font-semibold leading-relaxed text-brand-deep">
                        {section.quote}
                      </p>
                    </blockquote>
                  ) : null}

                  {section.callout ? (
                    <p className="my-6 rounded-2xl bg-brand-deep p-5 text-[0.9rem] leading-relaxed text-brand-offwhite/85">
                      {section.callout}
                    </p>
                  ) : null}
                </section>
              ))}

              <div className="mt-12 flex flex-col gap-4 rounded-3xl border border-brand-deep/10 bg-white/70 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-display text-[1rem] font-bold text-brand-deep">
                    Butuh produk untuk dapur Anda?
                  </p>
                  <p className="mt-1 text-[0.82rem] text-ink-soft/70">
                    Jelajahi katalog demo atau hubungi tim CITRAVA.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href="/products"
                    className="rounded-full bg-brand-deep px-5 py-2.5 text-[0.82rem] font-semibold text-brand-offwhite transition-colors hover:bg-brand-green"
                  >
                    Lihat produk
                  </Link>
                  <Link
                    href="/contact"
                    className="rounded-full border border-brand-deep/15 px-5 py-2.5 text-[0.82rem] font-semibold text-brand-deep transition-colors hover:bg-white"
                  >
                    Hubungi kami
                  </Link>
                </div>
              </div>

              <p className="mt-6 rounded-2xl bg-brand-cream/70 p-4 text-[0.72rem] leading-relaxed text-ink-soft/70">
                Artikel ini adalah konten demo untuk keperluan prototipe. Tidak
                ada klaim sertifikasi, hasil laboratorium, atau angka penjualan
                yang disertakan.
              </p>
            </div>

            {related.length > 0 ? (
              <section
                aria-labelledby="related-articles-heading"
                className="border-t border-brand-deep/10 pb-16 pt-12"
              >
                <h2
                  id="related-articles-heading"
                  className="text-h3 font-display font-bold text-brand-charcoal"
                >
                  Baca juga
                </h2>
                <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {related.map((item) => (
                    <li key={item.slug}>
                      <ArticleCard article={item} size="compact" />
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </Container>
        </div>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
