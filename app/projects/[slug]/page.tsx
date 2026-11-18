import type { Metadata } from "next";
import Image from "next/image";
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

        {p.parts && p.parts.length > 0 && (
          <>
            <h2 className="font-hand text-3xl leading-none text-pen md:text-right">
              {p.parts.length > 1 ? "the labs" : "the lab"}
            </h2>
            <div className="grid gap-6 lg:grid-cols-2">
              {p.parts.map((part, n) => (
                <Card key={part.name} as="article" className={n % 2 ? "bg-bubblegum-soft" : ""}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-cherry">
                      Lab {String(n + 1).padStart(2, "0")}
                    </span>
                    {part.when && <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-soft">{part.when}</span>}
                  </div>
                  <h3 className="mt-2 font-display text-2xl font-extrabold leading-tight tracking-tight">
                    <Todo text={part.name} />
                  </h3>
                  <p className="mt-1 font-hand text-2xl leading-tight text-pen">{part.focus}</p>
                  {part.about && <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">{part.about}</p>}
                  <ul className="mt-4 space-y-2">
                    {part.bullets.map((b) => (
                      <li key={b} className="flex gap-2.5 text-[15px] leading-relaxed">
                        <span aria-hidden className="mt-[0.55em] size-1.5 shrink-0 rotate-45 bg-bubblegum" />
                        <span>
                          <Todo text={b} />
                        </span>
                      </li>
                    ))}
                  </ul>
                  {part.link && (
                    <a
                      href={part.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-cherry hover:underline"
                    >
                      {part.link.label} <ArrowUpRight aria-hidden className="size-4" />
                    </a>
                  )}
                </Card>
              ))}
            </div>
          </>
        )}

        {p.process.length > 0 && (
          <>
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
          </>
        )}

        <h2 className="font-hand text-3xl leading-none text-pen md:text-right">the outcome</h2>
        <p className="text-[17px] leading-relaxed">
          <Todo text={p.outcome} />
        </p>

        {p.gallery && p.gallery.length > 0 && (
          <>
            <h2 className="font-hand text-3xl leading-none text-pen md:text-right">the work</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {p.gallery.map((img, n) => (
                <a
                  key={img.src}
                  href={img.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block overflow-hidden rounded-[6px] border-[1.5px] border-ink bg-paper p-2 shadow-[4px_4px_0_var(--ink)] transition hover:-translate-y-1 hover:rotate-0 ${n % 2 ? "rotate-[1deg]" : "-rotate-[1deg]"}`}
                >
                  <Image src={img.src} alt={img.alt} width={1030} height={1370} className="h-auto w-full" sizes="(min-width: 768px) 40vw, 90vw" />
                </a>
              ))}
            </div>
          </>
        )}

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
