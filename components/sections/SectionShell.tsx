import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { sections, site } from "@/content/site";

/** Full-page wrapper for section pages: cutting-mat background, back link, section tabs. */
export function SectionShell({ current, children }: { current?: string; children: React.ReactNode }) {
  return (
    <div className="mat-bg min-h-dvh">
      <header className="sticky top-0 z-20 border-b border-ink/10 bg-board/85 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-5 py-3 sm:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-ink bg-paper px-3.5 py-1.5 text-sm font-medium transition hover:-translate-x-0.5 hover:bg-bubblegum-soft"
          >
            <ArrowLeft aria-hidden className="size-4" /> Back home
          </Link>
          <nav aria-label="Sections">
            <ul className="flex flex-wrap gap-1">
              {sections.map((s) => {
                const active = s.id === current;
                return (
                  <li key={s.id}>
                    <Link
                      href={s.href}
                      aria-current={active ? "page" : undefined}
                      className={`rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-wider transition ${
                        active ? "bg-ink text-paper" : "text-ink-soft hover:bg-ink/5 hover:text-ink"
                      }`}
                    >
                      {s.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </header>
      <main id="main" className="mx-auto max-w-5xl px-5 pb-24 pt-12 sm:px-8">
        {children}
      </main>
      <footer className="mx-auto max-w-5xl px-5 pb-10 font-mono text-[11px] uppercase tracking-wider text-ink-soft sm:px-8">
        {site.name}
      </footer>
    </div>
  );
}
