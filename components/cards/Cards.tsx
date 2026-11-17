import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { currently } from "@/content/currently";
import { experience } from "@/content/experience";
import { highlights } from "@/content/highlights";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { BinderClip, DiscoBall, PinIcon, Pushpin, SquiggleArrow, StarDoodle, Tape } from "@/components/decor/Decor";

// Presentational cards shared by the draggable board and the mobile stack.
// They read from /content, so you shouldn't need to edit these to update text.

const linkBase =
  "group block select-none [-webkit-user-drag:none] focus-visible:outline-offset-4 transition-transform duration-200";

function Caption({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 font-hand text-2xl leading-none text-ink">
      {children}
      <ArrowUpRight
        aria-hidden
        className="size-5 text-pen transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </span>
  );
}

function Label({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`font-mono text-[11px] uppercase tracking-[0.14em] ${className}`}>{children}</span>;
}

/* ── Section cards ─────────────────────────────────────────────────── */

export function ProjectsCard() {
  return (
    <Link href="/projects" draggable={false} className={linkBase} style={{ width: 210 }}>
      <div className="relative bg-paper p-3 pb-4 paper-shadow">
        <BinderClip className="absolute -top-7 left-1/2 w-16 -translate-x-1/2" />
        <div className="flex h-[160px] flex-col justify-between bg-bubblegum-soft p-3">
          <Label className="text-cherry">Projects</Label>
          <ol className="space-y-1">
            {projects.map((p, i) => (
              <li key={p.slug} className="flex items-baseline gap-2 font-serif text-[19px] leading-[1.05]">
                <span className="font-mono text-[10px] font-normal text-cherry">{String(i + 1).padStart(2, "0")}</span>
                {p.title}
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-3 text-center">
          <Caption>things I&apos;ve made</Caption>
        </div>
      </div>
    </Link>
  );
}

export function ExperienceCard() {
  const top = experience.filter((e) => e.org.includes("Amazon")).slice(0, 2);
  const more = experience.length - top.length;
  return (
    <Link href="/experience" draggable={false} className={linkBase} style={{ width: 240 }}>
      <div className="relative lined-paper paper-shadow px-4 pb-4 pl-10 pt-3">
        <Tape className="absolute -top-3 right-6 h-6 w-20 rotate-[8deg]" />
        <Label className="text-cherry">Experience</Label>
        <ul className="mt-2 space-y-[3px] font-serif text-[17px] leading-[21px]">
          {top.map((e) => (
            <li key={e.id}>
              AWS · <em>{shortRole(e.role)}</em> &apos;{e.start.slice(2, 4)}
            </li>
          ))}
          <li className="text-ink-soft">+ {more} more roles</li>
        </ul>
        <div className="mt-2">
          <Caption>where I&apos;ve worked</Caption>
        </div>
      </div>
    </Link>
  );
}

function shortRole(role: string) {
  if (role.includes("Product Manager")) return "SWE + PM";
  if (role.includes("Software Development")) return "SDE";
  return role;
}

export function HighlightsCard() {
  const colors = ["bg-bubblegum text-ink", "bg-cherry text-paper", "bg-pen text-paper", "bg-paper text-cherry", "bg-ink text-bubblegum-soft"];
  return (
    <Link href="/highlights" draggable={false} className={linkBase} style={{ width: 210 }}>
      <div className="relative rounded-[18px] border-2 border-dashed border-ink/25 bg-kraft p-4 paper-shadow">
        <Pushpin className="absolute -top-4 left-1/2 size-8 -translate-x-1/2" color="var(--bubblegum)" />
        <Label className="text-cherry">Highlights</Label>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {highlights.map((h, i) => (
            <span
              key={h.id}
              title={h.title}
              className={`flex aspect-square items-center justify-center rounded-full border-2 border-paper font-display text-[11px] font-extrabold shadow-sm ${colors[i % colors.length]}`}
              style={{ rotate: `${(i % 2 ? 1 : -1) * (4 + i * 2)}deg` }}
            >
              {h.mark}
            </span>
          ))}
        </div>
        <div className="mt-3">
          <Caption>shiny things</Caption>
        </div>
      </div>
    </Link>
  );
}

export function AboutCard() {
  return (
    <Link href="/about" draggable={false} className={`${linkBase} relative`} style={{ width: 210 }}>
      <Pushpin className="absolute -top-3 left-6 z-10 size-8" />
      <div
        className="relative bg-paper px-5 pb-5 pt-6 paper-shadow"
        style={{
          clipPath:
            "polygon(0 4%, 6% 0, 14% 3%, 24% 0, 36% 2%, 48% 0, 60% 3%, 72% 0, 84% 2%, 94% 0, 100% 4%, 100% 100%, 0 100%)",
        }}
      >
        <Label className="text-cherry">About me</Label>
        <p className="mt-2 font-hand text-[22px] leading-[1.05] text-pen">
          IE nerd, PM in training, study-abroad alum. the story, the skills and the map →
        </p>
        <div className="mt-2">
          <Caption>nice to meet you</Caption>
        </div>
      </div>
    </Link>
  );
}

export function ContactCard() {
  return (
    <Link href="/contact" draggable={false} className={linkBase} style={{ width: 230 }}>
      <div className="relative h-[150px] overflow-hidden bg-bubblegum-soft paper-shadow">
        <svg aria-hidden viewBox="0 0 230 150" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          <path d="M0 0 L115 82 L230 0" fill="var(--bubblegum)" opacity="0.55" />
          <path d="M0 150 L92 70 M230 150 L138 70" stroke="var(--cherry)" strokeOpacity="0.25" strokeWidth="1.5" />
        </svg>
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-3">
          <div>
            <Label className="text-cherry">Contact</Label>
            <div className="mt-1">
              <Caption>say hi :)</Caption>
            </div>
          </div>
          <span aria-hidden className="grid size-12 place-items-center rounded-full bg-cherry font-hand text-lg text-paper">
            E.N.
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ── Non-section items ─────────────────────────────────────────────── */

export function CurrentlyCard() {
  return (
    <section aria-label="Currently" className="relative bg-sticky p-4 pt-5 paper-shadow" style={{ width: 220 }}>
      <Pushpin className="absolute -top-4 left-1/2 size-8 -translate-x-1/2" color="var(--pen)" />
      <div className="flex items-baseline justify-between">
        <Label className="text-cherry">Currently</Label>
        <span className="font-mono text-[10px] text-ink-soft">{currently.updated}</span>
      </div>
      <dl className="mt-2 space-y-2">
        {currently.items.map((it) => (
          <div key={it.label}>
            <dt className="font-hand text-xl leading-none text-pen">{it.label}</dt>
            <dd className="font-serif text-[18px] leading-[1.15]">{it.text}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function NameSticker() {
  return (
    <span
      aria-hidden
      className="block font-bubble text-[56px] leading-none text-bubblegum"
      style={{
        WebkitTextStroke: "0px",
        textShadow:
          "3px 3px 0 var(--paper), -3px 3px 0 var(--paper), 3px -3px 0 var(--paper), -3px -3px 0 var(--paper), 0 3px 0 var(--paper), 3px 0 0 var(--paper), 0 -3px 0 var(--paper), -3px 0 0 var(--paper), 4px 6px 8px rgba(30,27,24,0.25)",
      }}
    >
      {site.firstName}
    </span>
  );
}

export function DiscoSticker() {
  return <DiscoBall className="block size-24 drop-shadow-md" />;
}

export function StarSticker() {
  return <StarDoodle className="block size-[60px]" />;
}

export function PinSticker() {
  return (
    <span className="flex items-center gap-1.5 rounded-full bg-paper px-3 py-2 paper-shadow" style={{ width: 170 }}>
      <PinIcon className="h-6 w-4 shrink-0" />
      <span className="font-mono text-[11px] uppercase tracking-wider text-ink">{site.location}</span>
    </span>
  );
}

export function HintNote() {
  return (
    <span className="flex items-center gap-1 bg-paper px-3 py-2 paper-shadow" style={{ width: 190 }}>
      <span className="font-hand text-[22px] leading-[1] text-pen">psst… drag things around</span>
      <SquiggleArrow className="w-10 shrink-0 -rotate-12" />
    </span>
  );
}
