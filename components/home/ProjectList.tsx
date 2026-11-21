"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChevronRight } from "lucide-react";
import { projects } from "@/content/projects";
import { Tag } from "@/components/sections/ui";

// Same open-in-place rows as Experience: title and one-liner up front, the story one click away.
// Anything still marked "TODO" in content/projects.ts is left out here until you fill it in.

const statusTone = { building: "blue", shipped: "ink", ongoing: "pink", research: "pink" } as const;
const filled = (s?: string) => !!s && !s.startsWith("TODO");

function Label({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-cherry">{children}</p>;
}

export function ProjectList() {
  const [open, setOpen] = useState<Set<string>>(() => new Set());
  const allOpen = open.size === projects.length;

  const toggle = (slug: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });

  return (
    <>
      <div className="-mt-4 mb-2 flex justify-end">
        <button
          type="button"
          onClick={() => setOpen(allOpen ? new Set() : new Set(projects.map((p) => p.slug)))}
          className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft hover:text-cherry"
        >
          {allOpen ? "Collapse all" : "Expand all"}
        </button>
      </div>
      <ul className="divide-y divide-ink/15 border-b border-ink/15">
        {projects.map((p, i) => {
          const isOpen = open.has(p.slug);
          const steps = p.process.filter(filled);
          return (
            <li key={p.slug}>
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`proj-${p.slug}`}
                  onClick={() => toggle(p.slug)}
                  className="group grid w-full gap-x-6 gap-y-1 py-6 text-left sm:grid-cols-[2.5rem_1fr_auto] sm:items-start"
                >
                  <span className="font-mono text-[12px] text-cherry sm:pt-2">{String(i + 1).padStart(2, "0")}</span>
                  <span className="min-w-0">
                    <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="font-serif text-[28px] leading-tight transition group-hover:text-cherry">{p.title}</span>
                      {p.status && <Tag tone={statusTone[p.status]}>{p.status}</Tag>}
                    </span>
                    <span className="mt-1 block max-w-2xl text-[16px] leading-relaxed text-ink-soft">{p.tagline}</span>
                  </span>
                  <span className="hidden items-center gap-2 pt-3 font-mono text-[11px] uppercase tracking-wider text-ink-soft sm:flex">
                    {filled(p.when) && <span>{p.when}</span>}
                    <ChevronRight
                      aria-hidden
                      className={`size-4 text-cherry transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
                    />
                  </span>
                </button>
              </h3>

              <div
                id={`proj-${p.slug}`}
                inert={!isOpen}
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
              >
                <div className="overflow-hidden">
                  <div className="max-w-2xl space-y-5 pb-8 sm:ml-[4rem]">
                    {filled(p.problem) && (
                      <div>
                        <Label>The problem</Label>
                        <p className="mt-1.5 text-[16px] leading-relaxed">{p.problem}</p>
                      </div>
                    )}
                    {filled(p.role) && (
                      <div>
                        <Label>My role</Label>
                        <p className="mt-1.5 text-[16px] leading-relaxed">{p.role}</p>
                      </div>
                    )}
                    {(steps.length > 0 || (p.parts?.length ?? 0) > 0) && (
                      <div>
                        <Label>What I did</Label>
                        <ul className="mt-2 space-y-2 text-[16px] leading-relaxed">
                          {steps.map((s) => (
                            <li key={s} className="flex gap-2.5">
                              <span aria-hidden className="text-bubblegum">
                                ▸
                              </span>
                              <span>{s}</span>
                            </li>
                          ))}
                          {p.parts?.map((part) => (
                            <li key={part.name} className="flex gap-2.5">
                              <span aria-hidden className="text-bubblegum">
                                ▸
                              </span>
                              <span>
                                <strong className="font-semibold">{part.name}</strong>
                                <span className="text-ink-soft"> · {part.focus}. </span>
                                {part.bullets.join(" ")}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {filled(p.outcome) && (
                      <div>
                        <Label>Outcome</Label>
                        <p className="mt-1.5 text-[16px] leading-relaxed">{p.outcome}</p>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                      {p.comingSoon ? (
                        <span className="font-hand text-xl text-ink-soft">incoming</span>
                      ) : (
                        <Link
                          href={`/projects/${p.slug}`}
                          className="group/link inline-flex items-center gap-1.5 font-hand text-xl text-pen"
                        >
                          full case study
                          <ArrowRight aria-hidden className="size-4 transition group-hover/link:translate-x-1" />
                        </Link>
                      )}
                      {p.links.map((l) => (
                        <a
                          key={l.href}
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[14px] font-medium text-cherry hover:underline"
                        >
                          {l.label} <ArrowUpRight aria-hidden className="size-3.5" />
                        </a>
                      ))}
                    </div>
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
