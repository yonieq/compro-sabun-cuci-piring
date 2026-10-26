import { ArrowUpRight, Mail, Sparkles } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/shared/animated-section";
import { ButtonLink } from "@/components/shared/button-link";
import { Container } from "@/components/shared/container";
import { siteConfig } from "@/config/site";

/** Closing call to action — the last section before the footer. */
export function ContactCta() {
  return (
    <section aria-labelledby="contact-cta-heading" className="bg-brand-offwhite pb-20 sm:pb-24">
      <Container>
        <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-brand-green px-6 py-14 text-center sm:px-12 sm:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-16 -top-20 h-72 w-72 rounded-full bg-brand-lime/35 blur-2xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -right-10 h-80 w-80 rounded-full bg-brand-lemon/30 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.55)_1px,transparent_0)] [background-size:22px_22px]"
          />

          <div className="relative mx-auto max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-white backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Mari Terhubung
            </p>
            <h2
              id="contact-cta-heading"
              className="mt-5 text-balance-tight font-display text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-[1.03] text-white"
            >
              Mari Hadirkan Dapur yang Lebih Bersih
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-[0.98rem] leading-relaxed text-white/85">
              Punya pertanyaan tentang produk, distribusi, atau kerja sama?
              Tim CITRAVA siap membantu. Kami biasanya membalas dalam 1–2 hari
              kerja.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink
                href="/contact"
                variant="light"
                size="lg"
                withArrow
                className="w-full sm:w-auto"
              >
                Hubungi Kami
              </ButtonLink>
              <Link
                href={`mailto:${siteConfig.contact.email}`}
                className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full border border-white/35 px-6 text-[0.9rem] font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                {siteConfig.contact.email}
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>

            <p className="mt-6 text-[0.68rem] text-white/60">
              Alamat email dan nomor telepon pada prototipe ini masih berupa
              placeholder.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
