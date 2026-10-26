"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { Logo } from "@/components/layout/logo";
import { ButtonLink } from "@/components/shared/button-link";
import { siteConfig } from "@/config/site";
import { mainNav } from "@/data/navigation";
import { cn } from "@/lib/utils";

/**
 * Full-height mobile drawer with focus containment and Escape-to-close.
 * Rendered only on small screens; the desktop nav is a separate element.
 */
export function MobileNav({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);
  const previousPathname = useRef(pathname);

  // Close only after a real route change — not on the initial mount, which
  // would otherwise dismiss the drawer the moment it opens.
  useEffect(() => {
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;
    onClose();
  }, [pathname, onClose]);

  // Escape to close + focus management.
  useEffect(() => {
    if (!open) return;
    lastFocused.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      lastFocused.current?.focus?.();
    };
  }, [open, onClose]);

  const drawer = reduce
    ? { initial: false as const, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: -16 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -12 },
      };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[70] lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Tutup menu"
            onClick={onClose}
            className="absolute inset-0 h-full w-full cursor-default bg-brand-deep/35 backdrop-blur-sm"
            tabIndex={-1}
          />
          <motion.div
            ref={panelRef}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Menu navigasi"
            {...drawer}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-3 top-3 max-h-[calc(100dvh-1.5rem)] overflow-y-auto rounded-[2rem] bg-brand-offwhite p-5 shadow-[0_40px_90px_-30px_rgba(23,77,50,0.55)]"
          >
            <div className="flex items-center justify-between">
              <Logo />
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Tutup menu navigasi"
                className="grid h-11 w-11 place-items-center rounded-full border border-brand-deep/10 bg-white text-brand-deep"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Navigasi seluler" className="mt-6">
              <ul className="flex flex-col">
                {mainNav.map((item, index) => {
                  const active =
                    item.href === "/"
                      ? pathname === "/"
                      : !item.href.startsWith("/#") &&
                        pathname.startsWith(item.href);

                  return (
                    <motion.li
                      key={item.href}
                      initial={reduce ? false : { opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: reduce ? 0 : 0.05 + index * 0.045,
                        duration: 0.35,
                      }}
                      className="border-b border-brand-deep/8 last:border-0"
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex items-center justify-between py-4 font-display text-xl font-bold tracking-[-0.02em] text-brand-deep",
                          active && "text-brand-green",
                        )}
                      >
                        {item.label}
                        <ArrowUpRight
                          className="h-4 w-4 opacity-40"
                          aria-hidden="true"
                        />
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            <div className="mt-6 flex flex-col gap-3">
              <ButtonLink href="/products" size="lg" withArrow onClick={onClose}>
                Jelajahi Produk
              </ButtonLink>
              <ButtonLink
                href="/contact"
                variant="outline"
                size="lg"
                onClick={onClose}
              >
                Hubungi Kami
              </ButtonLink>
            </div>

            <p className="mt-6 text-xs leading-relaxed text-ink-soft/75">
              {siteConfig.tagline}
            </p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
