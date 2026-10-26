"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";

const STORAGE_KEY = "citrava-announcement-dismissed";

/**
 * Slim promotional bar, fixed above the navbar.
 *
 * Its measured height is published as `--announcement-h` on the document so the
 * fixed navbar and the page's top padding stay aligned when the bar is closed.
 * The bar is always rendered on the server, so there is no layout shift.
 */
export function AnnouncementBar() {
  const { announcement } = siteConfig;
  const [dismissed, setDismissed] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Publish the bar height as a CSS variable so the fixed navbar and the page
  // padding stay aligned. The ref callback covers the first paint; the
  // listener keeps it correct across viewport changes.
  const syncHeight = useCallback(() => {
    const root = document.documentElement;
    const height = dismissed ? 0 : (barRef.current?.offsetHeight ?? 0);
    root.style.setProperty("--announcement-h", `${height}px`);
  }, [dismissed]);

  useEffect(() => {
    window.addEventListener("resize", syncHeight);
    return () => window.removeEventListener("resize", syncHeight);
  }, [syncHeight]);

  useEffect(() => {
    syncHeight();
  }, [syncHeight]);

  if (!announcement.enabled) return null;

  const dismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Storage can be blocked; the bar simply stays dismissible.
    }
  };

  return (
    <AnimatePresence initial={false}>
      {!dismissed ? (
        <motion.div
          key="announcement"
          ref={barRef}
          initial={false}
          animate={{ height: "auto", opacity: 1 }}
          exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 top-0 z-[60] overflow-hidden bg-brand-deep text-brand-offwhite"
        >
          <div className="mx-auto flex w-full max-w-[92rem] items-center justify-center gap-3 px-4 py-2.5 text-center">
            <p className="text-[0.72rem] font-medium leading-snug tracking-[0.01em] sm:text-[0.78rem]">
              <span
                aria-hidden="true"
                className="mr-2 hidden rounded-full bg-brand-lime px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-brand-deep sm:inline-block"
              >
                Info
              </span>
              {announcement.message}
            </p>
            <Link
              href={announcement.href}
              className="group hidden shrink-0 items-center gap-1 text-[0.74rem] font-semibold text-brand-lime sm:inline-flex"
            >
              {announcement.ctaLabel}
              <ArrowRight
                aria-hidden="true"
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
              />
            </Link>
            <button
              type="button"
              onClick={dismiss}
              aria-label="Tutup informasi"
              className="ml-1 grid h-6 w-6 shrink-0 place-items-center rounded-full text-brand-offwhite/60 transition-colors hover:bg-white/10 hover:text-brand-offwhite"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
