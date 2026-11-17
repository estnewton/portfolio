import { highlights } from "@/content/highlights";
import { Tape } from "@/components/decor/Decor";
import { SectionHeader, Todo } from "./ui";

const badgeColors = [
  "bg-bubblegum text-ink",
  "bg-cherry text-paper",
  "bg-pen text-paper",
  "bg-ink text-bubblegum-soft",
];

export function HighlightsSection() {
  const badges = highlights.filter((h) => h.kind === "badge");
  const polaroids = highlights.filter((h) => h.kind === "polaroid");
  return (
    <>
      <SectionHeader id="section-title" kicker="03 · Highlights" title="Shiny things" note="collected along the way" />

      <ul className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
        {badges.map((h, i) => (
          <li key={h.id} className="flex flex-col items-center text-center">
            <span
              aria-hidden
              className={`grid size-28 place-items-center rounded-full border-4 border-paper font-display text-xl font-extrabold shadow-[3px_3px_0_var(--ink)] ring-[1.5px] ring-ink ${badgeColors[i % badgeColors.length]}`}
              style={{ rotate: `${(i % 2 ? 1 : -1) * (3 + i)}deg` }}
            >
              {h.mark}
            </span>
            <h2 className="mt-4 font-display text-[17px] font-extrabold leading-tight tracking-tight">{h.title}</h2>
            <p className="mt-1 text-[14px] leading-snug text-ink-soft">
              <Todo text={h.detail} />
            </p>
          </li>
        ))}
      </ul>

      {polaroids.length > 0 && (
        <ul className="mt-14 flex flex-wrap justify-center gap-10">
          {polaroids.map((h, i) => (
            <li key={h.id} className="relative w-64 bg-paper p-3 pb-4 paper-shadow" style={{ rotate: `${i % 2 ? 2 : -2}deg` }}>
              <Tape className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2" />
              <div className="grid aspect-square place-items-center bg-bubblegum-soft">
                {h.image?.src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={h.image.src} alt={h.image.alt} className="h-full w-full object-cover" />
                ) : (
                  <span className="font-bubble text-7xl text-cherry">{h.mark}</span>
                )}
              </div>
              <h2 className="mt-3 text-center font-hand text-2xl leading-none">{h.title}</h2>
              <p className="mt-1 text-center text-[13px] text-ink-soft">{h.detail}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
