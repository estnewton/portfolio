import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "@/content/projects";
import { SectionShell } from "@/components/sections/SectionShell";
import { Card, Tag, Todo } from "@/components/sections/ui";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return { title: p.title, description: p.tagline };
}

export default function Page({ params }: PageProps<"/projects/[slug]">) {
  return (
    <SectionShell current="projects">
      <Suspense fallback={<div className="h-96 animate-pulse rounded-[10px] bg-ink/5" />}>
        <CaseStudy params={params} />
      </Suspense>
    </SectionShell>
  );
}

async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = projects.findIndex((x) => x.slug === slug);
  if (i === -1) notFound();
  const p = projects[i];
  const next = projects[(i + 1) % projects.length];

  return (
    <>
      <Link href="/projects" className="inline-flex items-center gap-1.5 font-hand text-xl text-pen hover:underline">
        <ArrowLeft aria-hidden className="size-4" /> all projects
      </Link>

      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-cherry">
            Case study {String(i + 1).padStart(2, "0")} · {p.when}
          </span>
          {p.status && <Tag tone="ink">{p.status}</Tag>}
        </div>
        <h1 className="mt-3 font-display text-[clamp(2.6rem,6vw,4.5rem)] font-extrabold leading-none tracking-[-0.035em]">
          {p.title}
        </h1>
        <p className="mt-4 max-w-2xl text-xl leading-relaxed text-ink-soft">{p.tagline}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </header>

      {p.cover?.src && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={p.cover.src} alt={p.cover.alt} className="mt-10 w-full rounded-[10px] border-[1.5px] border-ink" />
      )}

      {/* At-a-glance strip: what a recruiter reads first */}
      <dl className="mt-10 grid gap-4 sm:grid-cols-3">
        <Card>
          <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-cherry">My role</dt>
          <dd className="mt-2 text-[15px] leading-relaxed">
            <Todo text={p.role} />
          </dd>
        </Card>
        <Card className="sm:col-span-2 bg-bubblegum-soft">
          <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-cherry">Outcome</dt>
          <dd className="mt-2 text-[15px] leading-relaxed">
            <Todo text={p.outcome} />
          </dd>
        </Card>
      </dl>

      <div className="mt-14 grid gap-12 md:grid-cols-[180px_1fr]">
        <h2 className="font-hand text-3xl leading-none text-pen md:text-right">the problem</h2>
        <p className="text-[17px] leading-relaxed">
          <Todo text={p.problem} />
        </p>

        <h2 className="font-hand text-3xl leading-none text-pen md:text-right">the process</h2>
        <ol className="space-y-4">
          {p.process.map((step, n) => (
            <li key={step} className="flex gap-4">
              <span className="grid size-7 shrink-0 place-items-center rounded-full border-[1.5px] border-ink bg-paper font-mono text-[12px]">
                {n + 1}
              </span>
              <p className="pt-0.5 text-[17px] leading-relaxed">
                <Todo text={step} />
              </p>
            </li>
          ))}
        </ol>

        <h2 className="font-hand text-3xl leading-none text-pen md:text-right">the outcome</h2>
        <p className="text-[17px] leading-relaxed">
          <Todo text={p.outcome} />
        </p>

        {p.links.length > 0 && (
          <>
            <h2 className="font-hand text-3xl leading-none text-pen md:text-right">links</h2>
            <ul className="flex flex-wrap gap-2">
              {p.links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border-[1.5px] border-ink bg-paper px-4 py-1.5 text-sm font-medium hover:bg-bubblegum-soft"
                  >
                    {l.label} <ArrowUpRight aria-hidden className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <Link
        href={`/projects/${next.slug}`}
        className="group mt-20 flex items-center justify-between rounded-[10px] border-[1.5px] border-ink bg-paper p-6 shadow-[4px_4px_0_var(--ink)] transition hover:-translate-y-1"
      >
        <span>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-cherry">Next case study</span>
          <span className="mt-1 block font-display text-2xl font-extrabold tracking-tight">{next.title}</span>
        </span>
        <ArrowRight aria-hidden className="size-6 transition group-hover:translate-x-1" />
      </Link>
    </>
  );
}
