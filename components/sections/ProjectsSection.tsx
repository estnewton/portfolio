import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects } from "@/content/projects";
import { Card, SectionHeader, Tag } from "./ui";

const statusTone = { building: "blue", shipped: "ink", ongoing: "pink", research: "pink" } as const;

export function ProjectsSection() {
  return (
    <>
      <SectionHeader id="section-title" kicker="01 · Projects" title="Things I've made" note="(+ what I learned)" />
      <ul className="grid gap-6 sm:grid-cols-2">
        {projects.map((p, i) => (
          <li key={p.slug}>
            <Link href={`/projects/${p.slug}`} className="group block h-full rounded-[10px]">
              <Card className="flex h-full flex-col transition group-hover:-translate-y-1 group-hover:shadow-[6px_6px_0_var(--ink)]">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-cherry">{String(i + 1).padStart(2, "0")}</span>
                  {p.status && <Tag tone={statusTone[p.status]}>{p.status}</Tag>}
                </div>
                <h2 className="mt-3 font-display text-2xl font-extrabold tracking-tight">{p.title}</h2>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-soft">{p.tagline}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
                <span className="mt-5 inline-flex items-center gap-1.5 font-hand text-xl text-pen">
                  read the case study
                  <ArrowRight aria-hidden className="size-4 transition group-hover:translate-x-1" />
                </span>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
