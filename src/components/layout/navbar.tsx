"use client";

import { ArrowUpRight, ChevronDown, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/layout/logo";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Container } from "@/components/shared/container";
import { siteConfig } from "@/config/site";
import { mainNav } from "@/data/navigation";
import { products } from "@/data/products";
import { cn } from "@/lib/utils";

/** Highlight the nav item that matches the current route (anchors excluded). */
function useActivePath() {
  const pathname = usePathname();

  return (href: string) => {
    // In-page anchors (e.g. "/#keunggulan") are never a "current page" —
    // flagging them would mark both Beranda and Keunggulan as active.
    if (href.startsWith("/#")) return false;
    if (href === "/") return pathname === "/";
    if (href.startsWith("/products")) return pathname.startsWith("/products");
    return pathname === href || pathname.startsWith(`${href}/`);
  };
}

const featuredProducts = products.filter((product) => product.featured).slice(0, 3);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const isActive = useActivePath();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-[var(--announcement-h,0px)] z-50 transition-[background-color,box-shadow,backdrop-filter,top] duration-300",
          scrolled
            ? "border-b border-brand-deep/8 bg-brand-offwhite/88 shadow-[0_10px_40px_-24px_rgba(23,77,50,0.45)] backdrop-blur-xl"
            : "bg-transparent",
        )}
      >
        <Container className="flex h-[4.5rem] min-w-0 items-center justify-between gap-3 lg:h-20 lg:gap-4">
          <Logo tone="dark" />

          <nav aria-label="Navigasi utama" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((item) => {
                const active = isActive(item.href);
                const isProducts = item.href === "/products";

                return (
                  <li
                    key={item.href}
                    className="relative"
                    onMouseEnter={
                      isProducts ? () => setProductsOpen(true) : undefined
                    }
                    onMouseLeave={
                      isProducts ? () => setProductsOpen(false) : undefined
                    }
                  >
                    <Link
                      href={item.href}
                      onClick={() => setProductsOpen(false)}
                      aria-current={active ? "page" : undefined}
                      aria-expanded={isProducts ? productsOpen : undefined}
                      className={cn(
                        "relative flex items-center gap-1 rounded-full px-3.5 py-2 text-[0.86rem] font-medium text-ink-soft transition-colors hover:text-brand-deep",
                        active && "font-semibold text-brand-deep",
                      )}
                    >
                      {item.label}
                      {isProducts ? (
                        <ChevronDown
                          aria-hidden="true"
                          className={cn(
                            "h-3.5 w-3.5 transition-transform duration-200",
                            productsOpen && "rotate-180",
                          )}
                        />
                      ) : null}
                      {active ? (
                        <span
                          aria-hidden="true"
                          className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-brand-green"
                        />
                      ) : null}
                    </Link>

                    {isProducts ? (
                      <div
                        className={cn(
                          "absolute left-1/2 top-full z-10 w-[30rem] -translate-x-1/2 pt-3 transition-all duration-200",
                          productsOpen
                            ? "visible translate-y-0 opacity-100"
                            : "invisible -translate-y-1 opacity-0",
                        )}
                      >
                        <div className="overflow-hidden rounded-3xl border border-brand-deep/8 bg-white/95 p-3 shadow-[0_30px_70px_-30px_rgba(23,77,50,0.4)] backdrop-blur-xl">
                          <div className="grid gap-1">
                            {featuredProducts.map((product) => (
                              <Link
                                key={product.id}
                                href={`/products/${product.slug}`}
                                className="flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-colors hover:bg-leaf-50"
                              >
                                <span
                                  aria-hidden="true"
                                  className="h-10 w-10 shrink-0 rounded-xl"
                                  style={{ background: product.gradient }}
                                />
                                <span className="min-w-0">
                                  <span className="block truncate text-[0.86rem] font-semibold text-brand-charcoal">
                                    {product.name}
                                  </span>
                                  <span className="block truncate text-xs text-ink-soft/80">
                                    {product.tagline}
                                  </span>
                                </span>
                              </Link>
                            ))}
                          </div>
                          <Link
                            href="/products"
                            className="mt-2 flex items-center justify-between gap-2 rounded-2xl bg-leaf-50 px-4 py-3 text-[0.84rem] font-semibold text-brand-deep transition-colors hover:bg-leaf-100"
                          >
                            Lihat semua produk
                            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                          </Link>
                        </div>
                      </div>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={siteConfig.announcement.href}
              className="hidden items-center gap-2 rounded-full bg-brand-deep px-5 py-2.5 text-[0.82rem] font-semibold text-brand-offwhite shadow-[0_12px_30px_-16px_rgba(23,77,50,0.8)] transition-all hover:-translate-y-0.5 hover:bg-brand-green lg:inline-flex"
            >
              Jelajahi Produk
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Buka menu navigasi"
              aria-expanded={open}
              aria-controls="mobile-navigation"
              className="grid h-11 w-11 place-items-center rounded-full border border-brand-deep/12 bg-white/70 text-brand-deep backdrop-blur transition-colors hover:bg-white lg:hidden"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </Container>
      </header>

      <MobileNav open={open} onClose={() => setOpen(false)} />
    </>
  );
}
