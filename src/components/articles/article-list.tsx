"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { ArticleCard } from "@/components/articles/article-card";
import { articleCategories } from "@/data/articles";
import { cn } from "@/lib/utils";
import type { Article } from "@/types/product";

/** Client-side article filtering by category and free-text search. */
export function ArticleList({ articles }: { articles: Article[] }) {
  const [category, setCategory] = useState<string>("all");
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return articles.filter((article) => {
      const inCategory = category === "all" || article.category === category;
      if (!inCategory) return false;
      if (!normalized) return true;
      return (
        article.title.toLowerCase().includes(normalized) ||
        article.excerpt.toLowerCase().includes(normalized) ||
        article.category.toLowerCase().includes(normalized)
      );
    });
  }, [articles, category, query]);

  return (
    <div>
      <div className="flex flex-col gap-4 rounded-3xl border border-brand-deep/8 bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div
          role="group"
          aria-label="Filter kategori artikel"
          className="flex flex-wrap gap-2"
        >
          <button
            type="button"
            onClick={() => setCategory("all")}
            aria-pressed={category === "all"}
            className={cn(
              "rounded-full border px-4 py-2 text-[0.8rem] font-semibold transition-colors",
              category === "all"
                ? "border-brand-deep bg-brand-deep text-brand-offwhite"
                : "border-brand-deep/12 text-brand-deep hover:bg-leaf-50",
            )}
          >
            Semua
          </button>
          {articleCategories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
              className={cn(
                "rounded-full border px-4 py-2 text-[0.8rem] font-semibold transition-colors",
                category === item
                  ? "border-brand-deep bg-brand-deep text-brand-offwhite"
                  : "border-brand-deep/12 text-brand-deep hover:bg-leaf-50",
              )}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:max-w-[15rem]">
          <label htmlFor="article-search" className="sr-only">
            Cari artikel
          </label>
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft/45"
          />
          <input
            id="article-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari artikel…"
            className="h-11 w-full rounded-full border border-brand-deep/10 bg-brand-offwhite pl-10 pr-4 text-[0.84rem] outline-none transition-colors placeholder:text-ink-soft/45 focus:border-brand-green/60 focus:bg-white"
          />
        </div>
      </div>

      <p className="mt-6 text-[0.8rem] text-ink-soft/65" aria-live="polite">
        {results.length} artikel
        {category !== "all" ? ` dalam kategori ${category}` : ""}
      </p>

      {results.length > 0 ? (
        <ul className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((article) => (
            <li key={article.slug}>
              <ArticleCard article={article} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-4 rounded-3xl border border-dashed border-brand-deep/15 bg-white/60 px-6 py-14 text-center">
          <h2 className="font-display text-lg font-bold text-brand-deep">
            Belum ada artikel yang cocok
          </h2>
          <p className="mx-auto mt-2 max-w-sm text-sm text-ink-soft/70">
            Coba kata kunci lain atau pilih kategori “Semua”.
          </p>
          <button
            type="button"
            onClick={() => {
              setCategory("all");
              setQuery("");
            }}
            className="mt-4 rounded-full bg-brand-deep px-5 py-2.5 text-[0.82rem] font-semibold text-brand-offwhite hover:bg-brand-green"
          >
            Reset pencarian
          </button>
        </div>
      )}
    </div>
  );
}
