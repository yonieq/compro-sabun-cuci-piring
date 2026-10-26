import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Container } from "@/components/shared/container";

export interface LegalSection {
  id: string;
  heading: string;
  body: ReactNode;
}

/** Shared shell for legal pages: consistent typography and table of contents. */
export function LegalPage({
  title,
  intro,
  updated,
  sections,
  notice,
}: {
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
  notice?: string;
}) {
  return (
    <>
      <section className="bg-brand-cream pb-12 pt-24 sm:pt-28 lg:pt-32">
        <Container>
          <Breadcrumbs items={[{ label: title }]} />
          <div className="mt-6 max-w-3xl">
            <p className="text-[0.64rem] font-bold uppercase tracking-[0.2em] text-leaf-700">
              Informasi Legal
            </p>
            <h1 className="mt-4 text-display font-display font-extrabold text-brand-charcoal">
              {title}
            </h1>
            <p className="mt-5 text-lead text-ink-soft">{intro}</p>
            <p className="mt-4 text-[0.76rem] text-ink-soft/55">
              Terakhir diperbarui: {updated}
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-brand-offwhite section-y">
        <Container className="grid gap-10 lg:grid-cols-[16rem_1fr] lg:gap-16">
          <nav aria-label="Daftar isi" className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-ink-soft/50">
              Daftar isi
            </p>
            <ol className="mt-3 space-y-2 border-l border-brand-deep/10 pl-4">
              {sections.map((section, index) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="text-[0.82rem] leading-snug text-ink-soft/75 transition-colors hover:text-brand-deep"
                  >
                    {index + 1}. {section.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="max-w-[46rem]">
            {notice ? (
              <p className="mb-8 rounded-2xl border border-brand-deep/10 bg-brand-cream/70 p-4 text-[0.78rem] leading-relaxed text-ink-soft/75">
                {notice}
              </p>
            ) : null}

            {sections.map((section, index) => (
              <section
                key={section.id}
                id={section.id}
                className="mb-9 scroll-mt-28"
                aria-labelledby={`${section.id}-heading`}
              >
                <h2
                  id={`${section.id}-heading`}
                  className="font-display text-[1.3rem] font-bold tracking-[-0.02em] text-brand-charcoal"
                >
                  {index + 1}. {section.heading}
                </h2>
                <div className="mt-3 space-y-3 text-[0.94rem] leading-[1.75] text-ink-soft [&_a]:font-semibold [&_a]:text-brand-deep [&_a]:underline [&_a]:underline-offset-4 [&_li]:flex [&_li]:gap-2.5 [&_ul]:space-y-2">
                  {section.body}
                </div>
              </section>
            ))}

            <p className="mt-10 rounded-2xl bg-leaf-50 p-5 text-[0.78rem] leading-relaxed text-ink-soft/75">
              Dokumen ini adalah contoh untuk prototipe dan belum ditinjau oleh
              penasihat hukum. Sebelum peluncuran publik, teks harus disesuaikan
              dengan praktik perusahaan yang sebenarnya dan peraturan yang
              berlaku di Indonesia.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
