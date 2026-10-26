"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check, Leaf, Sparkles } from "lucide-react";
import { useState } from "react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { benefitChapters } from "@/data/highlights";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

/** Decorative still-life per chapter — pure CSS/SVG, no external assets. */
function ChapterVisual({ index, accent }: { index: number; accent: string }) {
  return (
    <div className="relative flex h-full min-h-[19rem] items-center justify-center overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-6 rounded-[42%_58%_48%_52%/50%_46%_54%_50%] opacity-70 blur-[1px]"
        style={{ background: `radial-gradient(circle at 35% 30%, ${accent}55, transparent 65%)` }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-10 rounded-full border border-brand-deep/8"
      />

      <motion.div
        key={`glass-${index}`}
        initial={{ opacity: 0, scale: 0.92, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.65, ease }}
        className="relative"
      >
        {/* stylised bottle silhouette */}
        <div className="relative h-56 w-24 rounded-[1.4rem_1.4rem_1.8rem_1.8rem] bg-white/85 shadow-[0_30px_60px_-28px_rgba(23,77,50,0.45)] backdrop-blur">
          <div className="absolute -top-5 left-1/2 h-6 w-12 -translate-x-1/2 rounded-t-lg bg-brand-deep" />
          <div className="absolute left-1/2 top-3 h-3 w-10 -translate-x-1/2 rounded-sm bg-brand-deep/70" />
          <div
            className="absolute inset-x-3 bottom-14 top-20 rounded-xl"
            style={{ background: `linear-gradient(160deg, #ffffff 0%, ${accent}33 100%)` }}
          />
          <div className="absolute inset-x-4 bottom-[4.2rem] rounded-lg bg-brand-deep px-2 py-2 text-center">
            <p className="font-display text-[0.52rem] font-extrabold tracking-[0.18em] text-brand-offwhite">
              CITRAVA
            </p>
            <span className="mx-auto mt-1 block h-[2px] w-6 rounded-full bg-brand-lime" />
          </div>
          <div className="absolute inset-x-5 bottom-4 space-y-1">
            <span className="block h-1 rounded-full bg-brand-deep/15" />
            <span className="block h-1 w-2/3 rounded-full bg-brand-deep/10" />
          </div>
          <div
            className="absolute inset-x-3 bottom-0 h-14 rounded-b-[1.8rem] opacity-40"
            style={{ background: `linear-gradient(to top, ${accent}, transparent)` }}
          />
        </div>

        {index % 2 === 0 ? (
          <motion.span
            aria-hidden="true"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-10 top-4 grid h-16 w-16 place-items-center rounded-full bg-brand-lemon shadow-[0_16px_30px_-16px_rgba(23,77,50,0.4)]"
          >
            <Leaf className="h-6 w-6 -rotate-12 text-brand-deep" aria-hidden="true" />
          </motion.span>
        ) : (
          <motion.span
            aria-hidden="true"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-12 bottom-8 grid h-14 w-14 place-items-center rounded-full border-[7px] border-brand-lime/70 bg-white/50"
          />
        )}
      </motion.div>

      <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-white/75 px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-brand-deep backdrop-blur">
        <Sparkles className="h-3 w-3 text-brand-green" aria-hidden="true" />
        Ilustrasi orisinal
      </div>
    </div>
  );
}

/**
 * Interactive storytelling section. Tabs are real buttons with roving focus
 * and `aria-selected`; content transitions with AnimatePresence.
 */
export function BenefitsSection() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const chapter = benefitChapters[active];
  const Icon = chapter.icon;

  return (
    <section
      id="keunggulan"
      aria-labelledby="benefits-heading"
      className="relative overflow-hidden bg-brand-deep text-brand-offwhite section-y"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-0 h-[32rem] w-[32rem] rounded-full bg-brand-green/18 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-20 h-[28rem] w-[28rem] rounded-full bg-brand-lemon/10 blur-3xl"
      />

      <Container className="relative">
        <SectionHeading
          tone="dark"
          eyebrow="Kenapa CITRAVA"
          title="Dirancang untuk Ritme Dapur Nyata"
          description="Empat pilar yang membentuk cara kami mengembangkan produk — sederhana, jujur, dan berfokus pada pengalaman mencuci sehari-hari."
          id="benefits-heading"
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
          {/* Tab list */}
          <div>
            <ul
              role="tablist"
              aria-label="Pilar keunggulan CITRAVA"
              aria-orientation="vertical"
              className="flex flex-col gap-2"
            >
              {benefitChapters.map((item, index) => {
                const selected = index === active;
                const ItemIcon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      role="tab"
                      id={`tab-${item.id}`}
                      aria-selected={selected}
                      aria-controls={`panel-${item.id}`}
                      tabIndex={selected ? 0 : -1}
                      onClick={() => setActive(index)}
                      onKeyDown={(event) => {
                        if (event.key === "ArrowDown" || event.key === "ArrowRight") {
                          event.preventDefault();
                          setActive((index + 1) % benefitChapters.length);
                        }
                        if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
                          event.preventDefault();
                          setActive(
                            (index - 1 + benefitChapters.length) %
                              benefitChapters.length,
                          );
                        }
                      }}
                      className={cn(
                        "flex w-full items-start gap-4 rounded-3xl border p-4 text-left transition-all duration-300 sm:p-5",
                        selected
                          ? "border-brand-lime/45 bg-white/[0.07] shadow-[0_20px_40px_-30px_rgba(0,0,0,0.6)]"
                          : "border-white/8 bg-transparent hover:border-white/18 hover:bg-white/[0.04]",
                      )}
                    >
                      <span
                        className={cn(
                          "grid h-10 w-10 shrink-0 place-items-center rounded-2xl transition-colors",
                          selected
                            ? "bg-brand-lime text-brand-deep"
                            : "bg-white/8 text-brand-offwhite/70",
                        )}
                      >
                        <ItemIcon className="h-4.5 w-4.5" aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-brand-lime/80">
                          {item.eyebrow}
                        </span>
                        <span
                          className={cn(
                            "mt-1 block font-display text-[1rem] font-bold leading-snug tracking-[-0.01em]",
                            selected ? "text-brand-offwhite" : "text-brand-offwhite/80",
                          )}
                        >
                          {item.title}
                        </span>
                      </span>
                      <motion.span
                        aria-hidden="true"
                        animate={{ opacity: selected ? 1 : 0, x: selected ? 0 : -4 }}
                        className="ml-auto mt-1 hidden text-brand-lime sm:block"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </motion.span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <p className="mt-4 text-[0.7rem] leading-relaxed text-brand-offwhite/45">
              Gunakan tombol atau tombol panah untuk berpindah antar pilar.
            </p>
          </div>

          {/* Panel */}
          <div
            role="tabpanel"
            id={`panel-${chapter.id}`}
            aria-labelledby={`tab-${chapter.id}`}
            className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-sm sm:p-8"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={chapter.id}
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
                transition={{ duration: 0.32, ease }}
                className="grid gap-6 sm:grid-cols-[1.05fr_0.95fr] sm:items-center"
              >
                <div>
                  <span
                    className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.16em]"
                    style={{ backgroundColor: `${chapter.accent}22`, color: chapter.accent }}
                  >
                    <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                    Pilar {String(active + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-display text-[1.45rem] font-extrabold leading-tight tracking-[-0.02em] text-brand-offwhite">
                    {chapter.title}
                  </h3>
                  <p className="mt-3 text-[0.9rem] leading-relaxed text-brand-offwhite/70">
                    {chapter.description}
                  </p>
                  <ul className="mt-5 space-y-2.5">
                    {chapter.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2.5 text-[0.84rem] leading-snug text-brand-offwhite/80"
                      >
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-lime/15 text-brand-lime">
                          <Check className="h-3 w-3" aria-hidden="true" strokeWidth={3} />
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                <ChapterVisual index={active} accent={chapter.accent} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
