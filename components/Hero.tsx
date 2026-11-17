import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { sections, site } from "@/content/site";

const iconBtn =
  "grid size-12 place-items-center rounded-[12px] border-[1.5px] border-ink/25 bg-paper/80 text-ink-soft shadow-[0_1px_0_rgba(30,27,24,0.08)] transition hover:-translate-y-0.5 hover:border-ink/50 hover:bg-paper hover:text-ink";

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

        <ul className="flex gap-3" aria-label="Find me online">
          <SocialLink href={site.github} label="GitHub">
            <GitHubIcon />
          </SocialLink>
          <SocialLink href={site.linkedin} label="LinkedIn">
            <LinkedInIcon />
          </SocialLink>
          <SocialLink href={`mailto:${site.email}`} label={`Email ${site.email}`}>
            <Mail aria-hidden className="size-5" strokeWidth={1.75} />
          </SocialLink>
        </ul>

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

/**
 * Icon link. If the URL isn't set yet in content/site.ts it's hidden on the live site,
 * and shown dashed while running locally so you remember to add it.
 */
function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  if (!href) {
    if (process.env.NODE_ENV !== "development") return null;
    return (
      <li>
        <span
          title={`Add your ${label} URL in content/site.ts`}
          className={`${iconBtn} cursor-help border-dashed opacity-60`}
        >
          {children}
        </span>
      </li>
    );
  }
  const external = href.startsWith("http");
  return (
    <li>
      <a
        href={href}
        aria-label={label}
        className={iconBtn}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    </li>
  );
}

function GitHubIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="size-5" fill="currentColor">
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.4-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="size-5" fill="currentColor">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4V21H3V9.5Zm6.5 0h3.8v1.6h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.2c0-1.24-.02-2.84-1.73-2.84-1.73 0-2 1.35-2 2.75V21h-4V9.5Z" />
    </svg>
  );
}
