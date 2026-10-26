import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import { ContactForm } from "@/components/contact/contact-form";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/animated-section";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Hubungi Kami",
  description:
    "Hubungi tim CITRAVA untuk pertanyaan produk, kerja sama, atau distribusi. Formulir kontak dengan validasi tersedia di halaman ini.",
  path: "/contact",
});

const faqs = [
  {
    question: "Apakah produk di situs ini sudah bisa dibeli?",
    answer:
      "Belum. Situs ini masih berupa prototipe dengan data referensi demo. Kanal pembelian resmi belum tersedia dan tautan marketplace masih berstatus segera hadir.",
  },
  {
    question: "Mengapa ada nama merek lain di halaman produk?",
    answer:
      "Nama tersebut digunakan sebagai referensi data sementara agar tata letak katalog dapat diuji dengan konten yang realistis. Produk tersebut bukan milik CITRAVA dan tidak menunjukkan afiliasi apa pun.",
  },
  {
    question: "Apakah formulir di halaman ini benar-benar mengirim pesan?",
    answer:
      "Formulir melakukan validasi di browser dan di server, tetapi pengiriman email belum diaktifkan karena penyedia email belum dikonfigurasi. Pesan tidak diterima oleh tim secara nyata.",
  },
  {
    question: "Bagaimana cara menjadi mitra distribusi?",
    answer:
      "Silakan gunakan formulir dengan subjek “Kerja sama distribusi”. Tim akan menindaklanjuti setelah kanal komunikasi resmi aktif.",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-brand-offwhite pb-12 pt-24 sm:pb-16 sm:pt-28 lg:pt-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-0 h-[26rem] w-[26rem] rounded-full bg-brand-lime/25 blur-3xl"
        />
        <Container className="relative">
          <Breadcrumbs items={[{ label: "Hubungi Kami" }]} />
          <div className="mt-7 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-brand-deep/10 bg-white/70 px-3.5 py-1.5 text-[0.64rem] font-bold uppercase tracking-[0.2em] text-brand-deep backdrop-blur">
                <MessageCircle className="h-3.5 w-3.5 text-brand-green" aria-hidden="true" />
                Hubungi Kami
              </p>
              <h1 className="mt-5 max-w-2xl text-display font-display font-extrabold text-brand-charcoal">
                Mari bicara tentang dapur yang lebih bersih.
              </h1>
              <p className="mt-6 max-w-xl text-lead text-ink-soft">
                Pertanyaan produk, rencana distribusi, atau kerja sama — kirimkan
                pesan dan tim CITRAVA akan menindaklanjuti.
              </p>
            </div>
            <p className="rounded-2xl bg-brand-cream/80 p-4 text-[0.76rem] leading-relaxed text-ink-soft/70">
              <strong className="font-semibold text-brand-deep">Catatan:</strong>{" "}
              alamat, telepon, dan email pada halaman ini masih placeholder.
              Formulir memvalidasi input tetapi belum mengirim email karena
              penyedia email belum dikonfigurasi.
            </p>
          </div>
        </Container>
      </section>

      <section aria-label="Kontak dan formulir" className="bg-brand-offwhite pb-20 sm:pb-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
            <div className="min-w-0 space-y-3">
              {[
                {
                  icon: Mail,
                  label: "Email",
                  value: siteConfig.contact.email,
                  href: `mailto:${siteConfig.contact.email}`,
                  note: "Placeholder",
                },
                {
                  icon: Phone,
                  label: "Telepon",
                  value: siteConfig.contact.phone,
                  href: `tel:${siteConfig.contact.phone.replace(/\s/g, "")}`,
                  note: "Placeholder",
                },
                {
                  icon: MessageCircle,
                  label: "WhatsApp",
                  value: siteConfig.contact.whatsapp,
                  href: null,
                  note: "Segera hadir",
                },
                {
                  icon: MapPin,
                  label: "Kantor",
                  value: `${siteConfig.contact.address.line1}, ${siteConfig.contact.address.line2}`,
                  href: null,
                  note: "Placeholder",
                },
              ].map((item) => {
                const Icon = item.icon;
                const body = (
                  <>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-leaf-50 text-brand-deep">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-ink-soft/55">
                        {item.label}
                      </span>
                      <span className="mt-0.5 block truncate text-[0.88rem] font-semibold text-brand-deep">
                        {item.value}
                      </span>
                    </span>
                    <span className="shrink-0 rounded-full bg-brand-cream px-2 py-0.5 text-[0.54rem] font-bold uppercase tracking-[0.1em] text-brand-deep/60">
                      {item.note}
                    </span>
                  </>
                );

                return item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex w-full max-w-full items-center gap-3 rounded-2xl border border-brand-deep/8 bg-white p-4 transition-colors hover:border-brand-green/30"
                  >
                    {body}
                  </a>
                ) : (
                  <div
                    key={item.label}
                    className="flex w-full max-w-full items-center gap-3 rounded-2xl border border-brand-deep/8 bg-white/60 p-4"
                  >
                    {body}
                  </div>
                );
              })}

              <div className="rounded-2xl border border-brand-deep/8 bg-brand-deep p-5 text-brand-offwhite">
                <p className="inline-flex items-center gap-2 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-brand-lime">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                  Jam layanan
                </p>
                <p className="mt-2 text-[0.9rem] font-semibold">
                  {siteConfig.contact.hours}
                </p>
                <p className="mt-1 text-[0.76rem] text-brand-offwhite/60">
                  Kami berusaha membalas dalam 1–2 hari kerja.
                </p>
              </div>
            </div>

            <Reveal>
              <ContactForm />
            </Reveal>
          </div>
        </Container>
      </section>

      <section
        id="faq"
        aria-labelledby="faq-heading"
        className="bg-brand-cream section-y"
      >
        <Container width="prose">
          <Reveal>
            <p className="text-[0.66rem] font-bold uppercase tracking-[0.2em] text-leaf-700">
              FAQ
            </p>
            <h2 id="faq-heading" className="mt-3 text-h2 text-balance-tight">
              Pertanyaan yang sering muncul
            </h2>
          </Reveal>

          <div className="mt-8 divide-y divide-brand-deep/10 border-y border-brand-deep/10">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-display text-[0.98rem] font-bold text-brand-deep marker:hidden">
                  {faq.question}
                  <span
                    aria-hidden="true"
                    className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-brand-deep/15 text-brand-deep transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl text-[0.88rem] leading-relaxed text-ink-soft/80">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>

          <p className="mt-6 text-[0.76rem] leading-relaxed text-ink-soft/60">
            Masih ada pertanyaan?{" "}
            <Link
              href="/about"
              className="font-semibold text-brand-deep underline underline-offset-4"
            >
              Kenali CITRAVA lebih jauh
            </Link>{" "}
            atau kirimkan pesan melalui formulir di atas.
          </p>
        </Container>
      </section>
    </>
  );
}
