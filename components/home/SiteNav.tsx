"use client";

import { useEffect, useState } from "react";
import { homeSections, site } from "@/content/site";

/** Sticky top bar: name on the left, section links on the right. Highlights the section you're reading. */
export function SiteNav() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    // The active section is the last one whose top has scrolled past a line 35% down the screen.
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.35;
      let current: string | null = null;
      for (const s of homeSections) {
        const el = document.getElementById(s.id);
        if (el && el.offsetParent !== null && el.getBoundingClientRect().top <= line) current = s.id;
      }
      // At the very bottom, the last section wins even if it's short.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = homeSections[homeSections.length - 1].id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-blush/85 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-8">
        <a href="#top" className="shrink-0 font-wide text-[13px] font-bold uppercase tracking-[0.04em] text-ink">
          {site.name}
          <span className="text-bubblegum">.</span>
        </a>
        <nav aria-label="Sections" className="min-w-0 overflow-x-auto [scrollbar-width:none]">
          <ul className="flex gap-1 sm:gap-2">
            {homeSections.map((s) => (
              <li key={s.id} className={s.desktopOnly ? "hidden lg:block" : undefined}>
                <a
                  href={`#${s.id}`}
                  aria-current={active === s.id ? "true" : undefined}
                  className={`block whitespace-nowrap rounded-full px-2 py-1 font-mono text-[11px] uppercase tracking-[0.12em] transition ${
                    active === s.id ? "bg-ink text-paper" : "text-ink-soft hover:text-cherry"
                  }`}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
