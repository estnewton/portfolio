import Link from "next/link";
import { ArrowUpRight, FileDown, Mail } from "lucide-react";
import { sections, site } from "@/content/site";

const btn =
  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition hover:-translate-y-0.5";
const primary = `${btn} bg-cherry text-paper hover:bg-ink`;
const secondary = `${btn} border border-cherry/40 bg-paper/60 text-cherry hover:bg-paper`;

/** The 30-second scan: who, what, what I'm looking for, and how to reach me. Styled like a magazine cover. */
export function Hero({ toolbar }: { toolbar?: React.ReactNode }) {
  return (
    <header className="flex flex-col gap-6 px-6 pb-10 pt-8 sm:px-10 lg:h-full lg:justify-between lg:py-8 lg:pl-12 lg:pr-8">
      <div className="flex flex-col gap-6">
        {/* masthead */}
        <div className="flex items-center justify-between border-b border-cherry/30 pb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-cherry">
          <span>{site.name}</span>
          <span>Portfolio · Vol. 01</span>
        </div>

        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft">{site.kicker.join(" · ")}</p>
          <h1 className="mt-4 font-serif text-[clamp(3.1rem,6vw,5.9rem)] leading-[0.9] tracking-[-0.02em] text-ink">
            {site.headline.before}{" "}
            <span className="whitespace-nowrap">
              <em className="relative inline-block text-cherry">
                {site.headline.highlight}
                <svg
                  aria-hidden
                  viewBox="0 0 200 20"
                  preserveAspectRatio="none"
                  className="absolute -bottom-1 left-0 h-2.5 w-full"
                >
                  <path d="M3 14 C 50 4, 120 4, 197 10" fill="none" stroke="var(--bubblegum)" strokeWidth="5" strokeLinecap="round" />
                </svg>
              </em>
              {site.headline.after}
            </span>
          </h1>
          <p className="mt-3 font-hand text-2xl text-pen">— hi, i&apos;m esther :)</p>
        </div>

        <p className="max-w-md text-[16px] leading-relaxed text-ink-soft">{site.intro}</p>

        <p className="inline-flex w-fit items-center gap-2 rounded-full border border-ink/15 bg-paper/70 px-4 py-2 text-sm text-ink">
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bubblegum opacity-75" />
            <span className="relative inline-flex size-2.5 rounded-full bg-cherry" />
          </span>
          {site.seeking}
        </p>

        <div className="flex flex-wrap gap-2">
          <a href={site.resume} className={primary} download>
            <FileDown aria-hidden className="size-4" /> Resume
          </a>
          <a href={`mailto:${site.email}`} className={secondary}>
            <Mail aria-hidden className="size-4" /> Email
          </a>
          {site.linkedin && (
            <a href={site.linkedin} className={secondary} target="_blank" rel="noopener noreferrer">
              <LinkedInIcon /> LinkedIn
            </a>
          )}
        </div>

        <nav aria-label="Sections" className="border-t border-cherry/30 pt-3">
          <ol className="grid grid-cols-2 gap-x-6 gap-y-1 sm:grid-cols-3">
            {sections.map((s, i) => (
              <li key={s.id}>
                <Link
                  href={s.href}
                  className="group inline-flex items-baseline gap-2 font-serif text-[22px] italic text-ink hover:text-cherry"
                >
                  <span className="font-mono text-[10px] not-italic text-cherry">{String(i + 1).padStart(2, "0")}</span>
                  {s.label}
                  <ArrowUpRight
                    aria-hidden
                    className="size-4 self-center opacity-0 transition group-hover:opacity-100"
                  />
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      {toolbar && <div className="hidden lg:block">{toolbar}</div>}
    </header>
  );
}

function LinkedInIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="size-4" fill="currentColor">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4V21H3V9.5Zm6.5 0h3.8v1.6h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.2c0-1.24-.02-2.84-1.73-2.84-1.73 0-2 1.35-2 2.75V21h-4V9.5Z" />
    </svg>
  );
}
