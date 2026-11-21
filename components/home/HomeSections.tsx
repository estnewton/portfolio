import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { about } from "@/content/about";
import { currently } from "@/content/currently";
import { highlights } from "@/content/highlights";
import { site } from "@/content/site";
import { travel } from "@/content/travel";
import { Board } from "@/components/board/Board";
import { BoardToolbar } from "@/components/board/BoardToolbar";
import { CurrentlyList } from "@/components/cards/Cards";
import { Pushpin, Tape } from "@/components/decor/Decor";
import { ContactForm } from "@/components/sections/ContactForm";
import { TravelMap } from "@/components/sections/TravelMap";
import { Todo } from "@/components/sections/ui";
import { ExperienceList } from "./ExperienceList";
import { ProjectList } from "./ProjectList";
import { Section } from "./Section";

/* ── About ─────────────────────────────────────────────────────────── */

export function AboutBlock() {
  return (
    <Section id="about" title="About">
      <div className="grid gap-10 md:grid-cols-[1fr_250px]">
        <div className="max-w-2xl">
          <div className="space-y-5 text-[17px] leading-[1.75]">
            {about.story.map((p) => (
              <p key={p}>
                <Todo text={p} />
              </p>
            ))}
          </div>

          <div className="mt-10 border-l-2 border-bubblegum pl-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-cherry">What I&apos;m looking for</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {about.lookingFor.timing.map((t) => (
                <li
                  key={t}
                  className="rounded-full border-[1.5px] border-cherry bg-paper px-3 py-1 font-serif text-[17px] italic text-cherry"
                >
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{about.lookingFor.detail}</p>
          </div>
        </div>

        <aside className="space-y-8">
          {/* the "Currently" sticky note, pinned like on the board */}
          <section aria-label="Currently" className="relative mx-auto max-w-[250px] -rotate-1 bg-sticky p-4 pt-5 paper-shadow md:mx-0">
            <Pushpin className="absolute -top-4 left-1/2 size-8 -translate-x-1/2" color="var(--pen)" />
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-cherry">Currently</span>
              <span className="font-mono text-[10px] text-ink-soft">{currently.updated}</span>
            </div>
            <CurrentlyList />
          </section>

          <figure className="relative mx-auto max-w-[250px] rotate-2 bg-paper p-3 pb-3 paper-shadow md:mx-0">
            <Tape className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 rotate-3" />
            <div className="relative aspect-[900/1044] bg-bubblegum-soft">
              <Image src={about.familyPhoto.src} alt={about.familyPhoto.alt} fill sizes="250px" className="object-cover" />
            </div>
            <figcaption className="mt-2 text-center font-hand text-xl leading-none">{about.familyPhoto.caption}</figcaption>
          </figure>
        </aside>
      </div>

      {/* Interactive travel map: drag, zoom, tap a city for photos */}
      <div className="mt-14">
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="font-serif text-[28px] leading-none">Where I&apos;ve been</h3>
          <p className="font-hand text-2xl leading-none text-pen">{travel.headline}</p>
        </div>
        <div className="rounded-[10px] border-[1.5px] border-ink bg-paper p-3 shadow-[4px_4px_0_var(--ink)] sm:p-5">
          <TravelMap />
        </div>
      </div>
    </Section>
  );
}

/* ── Experience ────────────────────────────────────────────────────── */

export function ExperienceBlock() {
  return (
    <Section id="experience" title="Experience" note="newest first">
      <ExperienceList />
    </Section>
  );
}

/* ── Projects ──────────────────────────────────────────────────────── */

export function ProjectsBlock() {
  return (
    <Section id="projects" title="Projects" note="(+ what I learned)">
      <ProjectList />
    </Section>
  );
}

/* ── Honors & Affiliations ─────────────────────────────────────────── */

const badgeColors = ["bg-bubblegum text-ink", "bg-cherry text-paper", "bg-pen text-paper", "bg-ink text-bubblegum-soft"];

export function HonorsBlock() {
  const badges = highlights.filter((h) => h.kind === "badge");
  return (
    <Section id="honors" title="Honors & Affiliations" note="collected along the way">
      <ul className="grid gap-x-6 gap-y-6 sm:grid-cols-2">
        {badges.map((h, i) => (
          <li key={h.id} className="flex items-start gap-4">
            <span
              aria-hidden
              className={`grid size-16 shrink-0 place-items-center rounded-full border-[3px] border-paper text-center font-display text-[11px] font-extrabold leading-tight shadow-[2px_2px_0_var(--ink)] ring-[1.5px] ring-ink transition hover:rotate-0 hover:scale-110 ${badgeColors[i % badgeColors.length]}`}
              style={{ rotate: `${(i % 2 ? 1 : -1) * (3 + (i % 3) * 2)}deg` }}
            >
              {h.mark}
            </span>
            <div className="min-w-0 pt-1">
              <h3 className="font-serif text-[20px] leading-tight">{h.title}</h3>
              <p className="mt-1 text-[14px] leading-snug text-ink-soft">
                <Todo text={h.detail} />
              </p>
              {h.link && (
                <a
                  href={h.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-1 text-[13px] font-medium text-cherry hover:underline"
                >
                  {h.link.label} <ArrowUpRight aria-hidden className="size-3.5" />
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ── The cork board (desktop only) ─────────────────────────────────── */

export function BoardBlock() {
  return (
    <Section id="board" title="The board" note="psst… drag things around" wide className="board-js hidden lg:block">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="max-w-xl text-[15px] leading-relaxed text-ink-soft">
          The fun stuff that didn&apos;t fit in a section. Drag things around however you like (it remembers), or
          use the envelope to say hi.
        </p>
        <BoardToolbar />
      </div>
      <div className="cork-frame h-[680px] rounded-[14px] p-3">
        <div className="cork-bg h-full rounded-[6px]">
          <Board />
        </div>
      </div>
    </Section>
  );
}

/* ── Connect ───────────────────────────────────────────────────────── */

export function ConnectBlock() {
  return (
    <Section id="connect" title="Connect" note="my inbox is open :)">
      <div>
        <p className="mb-5 font-mono text-[11px] uppercase leading-relaxed tracking-wider text-ink-soft">{site.seeking}</p>
        <div className="rounded-[10px] border-[1.5px] border-ink bg-paper p-5 shadow-[4px_4px_0_var(--ink)]">
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
