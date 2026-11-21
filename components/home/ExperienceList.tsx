"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { experience } from "@/content/experience";
import { formatRange } from "@/lib/format";
import { Tag, Todo } from "@/components/sections/ui";

// Rows that open in place: company, role and dates up front, the details one click away.
const OPEN_FIRST = "aws-2026";

export function ExperienceList() {
  const [open, setOpen] = useState<Set<string>>(() => new Set([OPEN_FIRST]));
  const allOpen = open.size === experience.length;

  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <>
      <div className="-mt-4 mb-2 flex justify-end">
        <button
          type="button"
          onClick={() => setOpen(allOpen ? new Set() : new Set(experience.map((e) => e.id)))}
          className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft hover:text-cherry"
        >
          {allOpen ? "Collapse all" : "Expand all"}
        </button>
      </div>
      <ul className="divide-y divide-ink/15 border-b border-ink/15">
        {experience.map((e) => {
          const isOpen = open.has(e.id);
          const current = e.end === null;
          return (
            <li key={e.id}>
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`exp-${e.id}`}
                  onClick={() => toggle(e.id)}
                  className="group flex w-full items-start justify-between gap-4 py-5 text-left"
                >
                  <span className="min-w-0">
                    <span className="block font-mono text-[13px] uppercase tracking-[0.12em] text-ink group-hover:text-cherry">
                      {e.org}
                    </span>
                    <span className="mt-0.5 block font-serif text-[19px] leading-snug text-ink-soft">{e.role}</span>
                  </span>
                  <span className="flex shrink-0 items-center gap-2 pt-0.5 font-mono text-[11px] uppercase tracking-wider text-ink-soft">
                    {current && <span className="rounded-full bg-bubblegum px-2 py-0.5 text-[10px] text-ink">now</span>}
                    <span className="hidden sm:inline">{formatRange(e.start, e.end, e.dateLabel)}</span>
                    <ChevronRight
                      aria-hidden
                      className={`size-4 text-cherry transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
                    />
                  </span>
                </button>
              </h3>
              <div
                id={`exp-${e.id}`}
                inert={!isOpen}
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
              >
                <div className="overflow-hidden">
                  <div className="max-w-2xl pb-6">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-cherry">
                      <span className="sm:hidden">{formatRange(e.start, e.end, e.dateLabel)}</span>
                      {e.location && (
                        <>
                          <span className="sm:hidden"> · </span>
                          {e.location}
                        </>
                      )}
                    </p>
                    {e.bullets.length > 0 && (
                      <ul className="mt-3 space-y-2 text-[16px] leading-relaxed">
                        {e.bullets.map((b) => (
                          <li key={b} className="flex gap-2.5">
                            <span aria-hidden className="text-bubblegum">
                              ▸
                            </span>
                            <span>
                              <Todo text={b} />
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {e.tags && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {e.tags.map((t) => (
                          <Tag key={t} tone="blue">
                            {t}
                          </Tag>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
