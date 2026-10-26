"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Floating back-to-top control. Appears after the hero and respects
 * reduced-motion preferences via the global CSS media query.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 900);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Kembali ke atas"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
        })
      }
      className={cn(
        "fixed bottom-5 right-5 z-40 grid h-11 w-11 place-items-center rounded-full border border-brand-deep/10 bg-white/90 text-brand-deep shadow-[0_16px_40px_-20px_rgba(23,77,50,0.6)] backdrop-blur transition-all duration-300 hover:bg-brand-deep hover:text-brand-offwhite sm:bottom-7 sm:right-7",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <ArrowUp className="h-4 w-4" aria-hidden="true" />
    </button>
  );
}
