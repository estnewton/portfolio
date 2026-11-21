import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { bookCover, currently } from "@/content/currently";
import { site } from "@/content/site";
import { DiscoBall, PaintPalette, PickleballPaddle, Pushpin, SquiggleArrow, StarDoodle, Tape } from "@/components/decor/Decor";

// Presentational cards for the draggable board.
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
              <Caption>don&apos;t be a stranger</Caption>
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
      <CurrentlyList />
    </section>
  );
}

/** The building / reading / learning lines, with the book cover beside "reading". Used on the board and in About. */
export function CurrentlyList() {
  const book = currently.book;
  return (
    <dl className="mt-2 space-y-2">
      {currently.items.map((it) => {
        const showCover = it.label === "reading" && book;
        return (
          <div key={it.label} className={showCover ? "flex items-start gap-3" : undefined}>
            <div className="min-w-0 flex-1">
              <dt className="font-hand text-xl leading-none text-pen">{it.label}</dt>
              <dd className="font-serif text-[18px] leading-[1.15]">{it.text}</dd>
            </div>
            {showCover && (
              // eslint-disable-next-line @next/next/no-img-element -- remote cover from Open Library
              <img
                src={bookCover(book.isbn)}
                alt={`Cover of ${book.title} by ${book.author}`}
                width={48}
                height={62}
                loading="lazy"
                draggable={false}
                className="h-[62px] w-12 shrink-0 rotate-3 rounded-[2px] object-cover shadow-[0_4px_8px_-3px_rgba(30,27,24,0.45)]"
              />
            )}
          </div>
        );
      })}
    </dl>
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

export function HintNote() {
  return (
    <span className="flex items-center gap-1 bg-paper px-3 py-2 paper-shadow" style={{ width: 190 }}>
      <span className="font-hand text-[22px] leading-[1] text-pen">psst… drag things around</span>
      <SquiggleArrow className="w-10 shrink-0 -rotate-12" />
    </span>
  );
}

/* ── Fun stickers: hobbies and bits of personality, nothing repeated from the page ── */

export function PickleballSticker() {
  return (
    <span className="relative block" style={{ width: 96 }}>
      <PickleballPaddle className="block h-[120px] w-24 drop-shadow-md" />
      <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap font-hand text-lg leading-none text-ink">
        pickleball?
      </span>
    </span>
  );
}

export function PaletteSticker() {
  return (
    <span className="relative block" style={{ width: 100 }}>
      <PaintPalette className="block h-[84px] w-[100px] drop-shadow-md" />
      <span className="absolute -bottom-4 right-0 font-hand text-lg leading-none text-ink">I paint!</span>
    </span>
  );
}

export function BonjourBubble() {
  return (
    <span className="relative block rounded-[22px] border-2 border-ink bg-paper px-4 py-2 text-center" style={{ width: 150 }}>
      <span className="font-hand text-[30px] leading-none text-cherry">bonjour!</span>
      <span className="block font-mono text-[9px] uppercase tracking-[0.14em] text-ink-soft">(still learning)</span>
      <svg aria-hidden viewBox="0 0 30 20" className="absolute -bottom-[14px] left-6 h-4 w-7">
        <path d="M2 0 L10 18 L22 0" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
        <path d="M0 0 H30" stroke="var(--paper)" strokeWidth="4" />
      </svg>
    </span>
  );
}

export function BoardingPass() {
  return (
    <span className="relative flex overflow-hidden rounded-[8px] bg-paper paper-shadow" style={{ width: 240 }}>
      <Tape className="absolute -top-2 left-8 z-10 h-5 w-16 -rotate-6" />
      <span className="flex-1 border-r-2 border-dashed border-ink/20 p-3">
        <Label className="text-cherry">Boarding pass</Label>
        <span className="mt-1 flex items-center gap-2 font-mono text-[22px] font-medium leading-none text-ink">
          USA <span className="text-pen">✈</span> FRA
        </span>
        <span className="mt-2 grid grid-cols-2 gap-x-2 font-mono text-[9px] uppercase tracking-wider text-ink-soft">
          <span>
            Purpose
            <span className="block text-[11px] text-ink">Study abroad</span>
          </span>
          <span>
            Seat
            <span className="block text-[11px] text-ink">Window</span>
          </span>
        </span>
      </span>
      <span className="grid w-14 place-items-center bg-bubblegum-soft">
        <span className="rotate-90 whitespace-nowrap font-hand text-lg text-cherry">bon voyage</span>
      </span>
    </span>
  );
}

export function AskMeNote() {
  return (
    <span className="relative block lined-paper px-4 pb-3 pl-9 pt-3 paper-shadow" style={{ width: 200 }}>
      <Pushpin className="absolute -top-3 right-5 size-7" color="var(--bubblegum)" />
      <Label className="text-cherry">Ask me about</Label>
      <span className="mt-1 block font-hand text-[21px] leading-[24px] text-pen">
        my Mona Lisa photo
        <br />
        the best train routes in France
        <br />
        my pickleball serve
      </span>
    </span>
  );
}

export function AfrotechPolaroid() {
  return (
    <figure className="relative bg-paper p-2.5 pb-2 paper-shadow" style={{ width: 190 }}>
      <Tape className="absolute -top-3 right-6 h-6 w-16 rotate-6" />
      <div className="relative aspect-[700/564] bg-ink">
        <Image
          src="/images/afrotech.jpg"
          alt="Esther in front of the AFROTECH Conference backdrop, wearing a conference badge."
          fill
          sizes="190px"
          draggable={false}
          className="object-cover"
        />
      </div>
      <figcaption className="pt-1.5 text-center font-hand text-xl leading-none text-ink">AFROTECH &apos;25</figcaption>
    </figure>
  );
}
