import Link from "next/link";
import { FileDown, Mail } from "lucide-react";
import { sections, site } from "@/content/site";

const pill =
  "inline-flex items-center gap-2 rounded-full border-[1.5px] border-ink bg-paper px-4 py-2 text-sm font-medium text-ink transition hover:-translate-y-0.5 hover:bg-bubblegum-soft";

/** The 30-second scan: who, what, what I'm looking for, and how to reach me. */
export function Hero({ toolbar }: { toolbar?: React.ReactNode }) {
  return (
    <header className="flex flex-col gap-6 px-6 pb-8 pt-10 sm:px-10 lg:h-full lg:justify-between lg:py-10 lg:pl-14 lg:pr-4">
      <div className="flex flex-col gap-5">
        <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-ink-soft">
          {site.kicker.join(" · ")}
        </p>

        <div>
          <p className="font-hand text-3xl text-pen sm:text-4xl">hi, i&apos;m esther :)</p>
          <h1 className="mt-1 font-display text-[clamp(2.6rem,5.2vw,4.75rem)] font-extrabold leading-[0.95] tracking-[-0.035em] text-ink">
            {site.headline.before}{" "}
            <span className="whitespace-nowrap">
            <span className="relative inline-block text-cherry">
              {site.headline.highlight}
              <svg
                aria-hidden
                viewBox="0 0 200 20"
                preserveAspectRatio="none"
                className="absolute -bottom-2 left-0 h-3 w-full"
              >
                <path d="M3 14 C 50 4, 120 4, 197 10" fill="none" stroke="var(--bubblegum)" strokeWidth="6" strokeLinecap="round" />
              </svg>
            </span>
            {site.headline.after}
            </span>
          </h1>
        </div>

        <p className="max-w-md text-[17px] leading-relaxed text-ink-soft">{site.intro}</p>

        <p className="inline-flex w-fit items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper">
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bubblegum opacity-75" />
            <span className="relative inline-flex size-2.5 rounded-full bg-bubblegum" />
          </span>
          {site.seeking}
        </p>

        <div className="flex flex-wrap gap-2">
          <a href={site.resume} className={pill} download>
            <FileDown aria-hidden className="size-4" /> Resume
          </a>
          <a href={`mailto:${site.email}`} className={pill}>
            <Mail aria-hidden className="size-4" /> Email
          </a>
          {site.linkedin && (
            <a href={site.linkedin} className={pill} target="_blank" rel="noopener noreferrer">
              <LinkedInIcon /> LinkedIn
            </a>
          )}
        </div>

        <nav aria-label="Sections">
          <ul className="flex flex-wrap gap-x-4 gap-y-1">
            {sections.map((s) => (
              <li key={s.id}>
                <Link
                  href={s.href}
                  className="font-hand text-2xl text-ink underline decoration-bubblegum decoration-2 underline-offset-4 hover:text-cherry"
                >
                  {s.label.toLowerCase()}
                </Link>
              </li>
            ))}
          </ul>
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
