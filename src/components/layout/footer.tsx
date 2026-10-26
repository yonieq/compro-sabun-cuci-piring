import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { Container } from "@/components/shared/container";
import { type SocialIconName } from "@/components/shared/social-icons";
import { SocialLink } from "@/components/shared/social-link";
import { siteConfig } from "@/config/site";
import { footerColumns } from "@/data/navigation";

const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-brand-deep text-brand-offwhite">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-brand-green/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-52 right-0 h-[28rem] w-[28rem] rounded-full bg-brand-lime/10 blur-3xl"
      />

      <Container className="relative">
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)] lg:gap-10 lg:py-20">
          <div className="max-w-sm">
            <Logo tone="light" withTagline />
            <p className="mt-6 text-sm leading-relaxed text-brand-offwhite/70">
              {siteConfig.description}
            </p>

            <ul className="mt-7 space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="inline-flex items-center gap-2.5 text-brand-offwhite/80 hover:text-brand-lime"
                >
                  <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2.5 text-brand-offwhite/80 hover:text-brand-lime"
                >
                  <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-brand-offwhite/70">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>
                  {siteConfig.contact.address.line1},<br />
                  {siteConfig.contact.address.line2}
                </span>
              </li>
            </ul>

            <div className="mt-7">
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-brand-offwhite/45">
                Media sosial
              </p>
              <ul className="mt-3 flex items-center gap-2">
                {siteConfig.socials.map((social) => (
                  <li key={social.label}>
                    <SocialLink
                      href={social.href}
                      label={social.label}
                      icon={social.icon as SocialIconName}
                      handle={social.handle}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {footerColumns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-brand-offwhite/45">
                {column.title}
              </h2>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="text-sm text-brand-offwhite/75 transition-colors hover:text-brand-lime"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col gap-4 text-[0.76rem] text-brand-offwhite/55 md:flex-row md:items-center md:justify-between">
            <p>
              © {currentYear} {siteConfig.legalName}. Seluruh hak dilindungi.
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <Link href="/privacy" className="hover:text-brand-lime">
                Kebijakan Privasi
              </Link>
              <Link href="/terms" className="hover:text-brand-lime">
                Syarat & Ketentuan
              </Link>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/12 px-2.5 py-1 text-[0.68rem]">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-brand-lemon"
                />
                Prototipe — konten demo
              </span>
            </div>
          </div>
        </div>

        {siteConfig.demoMode ? (
          <div className="border-t border-white/10 py-5">
            <div className="flex items-start gap-3 rounded-2xl bg-white/[0.04] p-4 text-[0.74rem] leading-relaxed text-brand-offwhite/60">
              <ArrowUpRight
                className="mt-0.5 h-4 w-4 shrink-0 text-brand-lemon"
                aria-hidden="true"
              />
              <p>
                <strong className="font-semibold text-brand-offwhite/85">
                  Catatan demo:
                </strong>{" "}
                {siteConfig.demoNotice} Nama produk pihak ketiga yang muncul
                hanya sebagai referensi data sementara dan bukan produk
                CITRAVA.
              </p>
            </div>
          </div>
        ) : null}
      </Container>
    </footer>
  );
}
