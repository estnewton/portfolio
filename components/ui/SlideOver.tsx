"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import { Maximize2, X } from "lucide-react";

/**
 * Side panel that opens over the board when a section card is clicked.
 * Closes with the X button, Escape, clicking the backdrop, or the browser back button.
 */
export function SlideOver({ href, children }: { href: string; children: React.ReactNode }) {
  const router = useRouter();
  const panel = useRef<HTMLDivElement>(null);
  const close = useCallback(() => router.back(), [router]);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    panel.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      // Keep Tab focus inside the panel
      if (e.key === "Tab" && panel.current) {
        const focusables = panel.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([type="hidden"]):not([tabindex="-1"]), textarea, select, [tabindex]:not([tabindex="-1"])',
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && (document.activeElement === first || document.activeElement === panel.current)) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      opener?.focus?.();
    };
  }, [close]);

  return (
    <div className="fixed inset-0 z-50">
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={close}
      />
      <motion.div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="section-title"
        tabIndex={-1}
        className="mat-bg absolute inset-y-0 right-0 flex w-full max-w-[920px] flex-col shadow-[-12px_0_40px_rgba(30,27,24,0.25)] outline-none sm:border-l-[1.5px] sm:border-ink"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 32 }}
      >
        <div className="flex items-center justify-end gap-2 border-b border-ink/10 bg-board/85 px-4 py-3 backdrop-blur">
          {/* Plain <a> so it does a full load of the standalone page instead of reopening the panel */}
          <a
            href={href}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-ink-soft hover:bg-ink/5 hover:text-ink"
          >
            <Maximize2 aria-hidden className="size-3.5" /> Full page
          </a>
          <button
            type="button"
            onClick={close}
            aria-label="Close panel"
            className="grid size-9 place-items-center rounded-full border-[1.5px] border-ink bg-paper transition hover:rotate-90 hover:bg-bubblegum-soft"
          >
            <X aria-hidden className="size-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto overscroll-contain px-6 pb-16 pt-10 sm:px-10">{children}</div>
      </motion.div>
    </div>
  );
}
