import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/animated-section";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { lifestyleCards } from "@/data/highlights";
import { cn } from "@/lib/utils";

/**
 * Editorial kitchen-lifestyle gallery. The first card spans two columns on
 * large screens to break the grid rhythm.
 */
export function LifestyleGallery() {
  return (
    <section
      aria-labelledby="lifestyle-heading"
      className="relative bg-brand-offwhite section-y"
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Cerita Dapur"
            title="Ruang untuk Hidup yang Lebih Ringan"
            description="Inspirasi kecil seputar kebersihan dapur — dari cara mencuci piring hingga menjaga area masak tetap nyaman."
            id="lifestyle-heading"
          />
        </Reveal>

        <Stagger className="mt-10 grid gap-4 md:grid-cols-2">
          {lifestyleCards.map((card, index) => {
            const Icon = card.icon;
            const isFeature = index === 0;

            return (
              <StaggerItem key={card.title} as="article" className="h-full">
                <Link
                  href={card.href}
                  className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-brand-deep/8 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-36px_rgba(23,77,50,0.45)]"
                >
                  <div
                    className={cn(
                      "relative overflow-hidden",
                      isFeature ? "aspect-[16/10]" : "aspect-[16/9]",
                    )}
                  >
                    <Image
                      src={card.image}
                      alt={card.alt}
                      fill
                      sizes="(max-width: 768px) 92vw, 46vw"
                      className="object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                    />
                    <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/85 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-[0.14em] text-brand-deep backdrop-blur">
                      <Icon className="h-3 w-3 text-brand-green" aria-hidden="true" />
                      {card.tag}
                    </span>
                  </div>

                  <div className="flex flex-1 items-start justify-between gap-3 p-5">
                    <div>
                      <h3
                        className={
                          isFeature
                            ? "font-display text-[1.32rem] font-bold tracking-[-0.02em] text-brand-charcoal"
                            : "font-display text-[1.08rem] font-bold tracking-[-0.01em] text-brand-charcoal"
                        }
                      >
                        {card.title}
                      </h3>
                      <p className="mt-2 max-w-md text-[0.86rem] leading-relaxed text-ink-soft/78">
                        {card.description}
                      </p>
                    </div>
                    <span
                      aria-hidden="true"
                      className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-leaf-50 text-brand-deep transition-colors group-hover:bg-brand-deep group-hover:text-brand-lime"
                    >
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}
