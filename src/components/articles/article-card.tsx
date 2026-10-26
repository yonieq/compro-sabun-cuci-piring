import { CalendarDays, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { formatArticleDate } from "@/data/articles";
import type { Article } from "@/types/product";

/** Standard article card used in listings and related content. */
export function ArticleCard({
  article,
  size = "default",
  className,
}: {
  article: Article;
  size?: "default" | "compact";
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-brand-deep/8 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_55px_-34px_rgba(23,77,50,0.45)]",
        className,
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden",
          size === "compact" ? "aspect-[16/9]" : "aspect-[16/10]",
        )}
      >
        <Image
          src={article.coverImage}
          alt={article.coverAlt}
          fill
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 31vw"
          className="object-cover transition-transform duration-[700ms] group-hover:scale-[1.04]"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/85 px-2.5 py-1 text-[0.58rem] font-bold uppercase tracking-[0.14em] text-brand-deep backdrop-blur">
          {article.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.68rem] font-medium text-ink-soft/60">
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

        <h3 className="mt-3 font-display text-[1.05rem] font-bold leading-snug tracking-[-0.012em] text-brand-charcoal">
          <Link
            href={`/articles/${article.slug}`}
            className="after:absolute after:inset-0 focus-visible:outline-none"
          >
            {article.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 text-[0.83rem] leading-relaxed text-ink-soft/78">
          {article.excerpt}
        </p>

        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[0.78rem] font-semibold text-brand-deep">
          Baca artikel
          <span
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      </div>
    </article>
  );
}
