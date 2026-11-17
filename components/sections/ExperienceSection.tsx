import { experience } from "@/content/experience";
import { formatRange } from "@/lib/format";
import { SectionHeader, Tag, Todo } from "./ui";

export function ExperienceSection() {
  return (
    <>
      <SectionHeader id="section-title" kicker="02 · Experience" title="Where I've worked" note="newest first" />
      <ol className="relative ml-2 border-l-2 border-dashed border-ink/30">
        {experience.map((e) => {
          const current = e.end === null;
          return (
            <li key={e.id} className="relative mb-8 pl-8 last:mb-0">
              <span
                aria-hidden
                className={`absolute -left-[9px] top-1.5 size-4 rounded-full border-2 border-ink ${current ? "bg-bubblegum" : "bg-paper"}`}
              />
              <p className="font-mono text-[12px] uppercase tracking-wider text-cherry">
                {formatRange(e.start, e.end, e.dateLabel)}
                {current && <span className="ml-2 rounded-full bg-ink px-2 py-0.5 text-[10px] text-paper">now</span>}
              </p>
              <h2 className="mt-1 font-display text-xl font-extrabold leading-tight tracking-tight">{e.role}</h2>
              <p className="text-[15px] text-ink-soft">
                {e.org}
                {e.location && <span> · {e.location}</span>}
              </p>
              {e.bullets.length > 0 && (
                <ul className="mt-2 space-y-1 text-[15px] leading-relaxed">
                  {e.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span aria-hidden className="text-bubblegum">▸</span>
                      <span>
                        <Todo text={b} />
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              {e.tags && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {e.tags.map((t) => (
                    <Tag key={t} tone="blue">
                      {t}
                    </Tag>
                  ))}
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </>
  );
}
