import { brandHighlights } from "@/data/highlights";
import { Container } from "@/components/shared/container";
import { Stagger, StaggerItem } from "@/components/shared/animated-section";

/**
 * Four-intro-level benefits. Deliberately avoids certification or efficacy
 * claims — see src/data/highlights.ts.
 */
export function BrandHighlights() {
  return (
    <section aria-labelledby="highlights-heading" className="bg-brand-offwhite">
      <Container className="py-14 sm:py-16">
        <h2 id="highlights-heading" className="sr-only">
          Keunggulan CITRAVA
        </h2>
        <Stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {brandHighlights.map((highlight) => {
            const Icon = highlight.icon;
            return (
              <StaggerItem
                key={highlight.title}
                className="group relative overflow-hidden rounded-3xl border border-brand-deep/8 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-green/30 hover:shadow-[0_24px_50px_-30px_rgba(23,77,50,0.45)]"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand-lime/12 transition-transform duration-500 group-hover:scale-150"
                />
                <span className="relative grid h-11 w-11 place-items-center rounded-2xl bg-brand-deep text-brand-lime transition-colors duration-300 group-hover:bg-brand-green group-hover:text-white">
                  <Icon className="h-5 w-5" aria-hidden="true" strokeWidth={1.9} />
                </span>
                <h3 className="relative mt-5 font-display text-[1.02rem] font-bold tracking-[-0.01em] text-brand-deep">
                  {highlight.title}
                </h3>
                <p className="relative mt-2 text-[0.85rem] leading-relaxed text-ink-soft/85">
                  {highlight.description}
                </p>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}
