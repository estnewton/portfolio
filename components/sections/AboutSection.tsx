import Image from "next/image";
import { Quote } from "lucide-react";
import { about } from "@/content/about";
import { skills } from "@/content/skills";
import { testimonials } from "@/content/testimonials";
import { travel } from "@/content/travel";
import { Tape } from "@/components/decor/Decor";
import { TravelMap } from "./TravelMap";
import { Card, SectionHeader, SubHeading, Tag, Todo } from "./ui";

export function AboutSection() {
  const showTestimonials = testimonials.length > 0 || process.env.NODE_ENV === "development";
  return (
    <>
      <SectionHeader id="section-title" kicker="04 · About" title="Hi, I'm Esther" note="nice to meet you :)" />

      {/* Story + photo */}
      <div className="grid gap-10 md:grid-cols-[1fr_240px]">
        <div className="space-y-4 text-[17px] leading-relaxed">
          {about.story.map((p) => (
            <p key={p}>
              <Todo text={p} />
            </p>
          ))}
        </div>
        <figure className="relative mx-auto w-[240px] rotate-2 bg-paper p-3 pb-4 paper-shadow md:mx-0">
          <Tape className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 -rotate-3" />
          <div className="relative aspect-[4/5] bg-bubblegum-soft">
            {about.photo.src ? (
              <Image src={about.photo.src} alt={about.photo.alt} fill sizes="240px" className="object-cover" />
            ) : (
              <span className="absolute inset-0 grid place-items-center p-4 text-center font-hand text-xl text-cherry">
                your photo here
                <br />
                (/public/images)
              </span>
            )}
          </div>
          <figcaption className="mt-2 text-center font-hand text-xl">that&apos;s the real me</figcaption>
        </figure>
      </div>

      {/* Looking for */}
      <Card className="mt-12 bg-bubblegum-soft">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cherry">What I&apos;m looking for</p>
        <h2 className="mt-1 font-display text-2xl font-extrabold tracking-tight">{about.lookingFor.title}</h2>
        <p className="mt-2 text-[16px] leading-relaxed">{about.lookingFor.detail}</p>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {about.lookingFor.notes.map((n) => (
            <li key={n}>
              <Tag tone="ink">{n.startsWith("TODO") ? <Todo text={n} /> : n}</Tag>
            </li>
          ))}
        </ul>
      </Card>

      {/* Skills */}
      <section aria-labelledby="skills" className="mt-14">
        <SubHeading id="skills">Skills and tools</SubHeading>
        <div className="grid gap-5 sm:grid-cols-2">
          {skills.map((g) => (
            <Card key={g.group}>
              <h3 className="font-hand text-2xl leading-none text-pen">{g.group}</h3>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {g.items.map((s) => (
                  <li key={s} className="rounded-md border border-ink/20 px-2 py-0.5 text-[14px]">
                    <Todo text={s} />
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      {/* Travel map */}
      <section aria-labelledby="travel" className="mt-14">
        <SubHeading id="travel">Where I&apos;ve been</SubHeading>
        <p className="-mt-2 mb-4 font-hand text-2xl text-pen">{travel.headline}</p>
        <Card>
          <TravelMap />
        </Card>
      </section>

      {/* Testimonials */}
      {showTestimonials && (
        <section aria-labelledby="testimonials" className="mt-14">
          <SubHeading id="testimonials">Kind words</SubHeading>
          {testimonials.length === 0 ? (
            <p className="rounded-[10px] border-[1.5px] border-dashed border-ink/30 p-5 text-[15px] text-ink-soft">
              Add quotes in <code className="font-mono text-[13px]">content/testimonials.ts</code>. This box only shows while
              running locally; the section stays hidden on the live site until there&apos;s at least one quote.
            </p>
          ) : (
            <ul className="grid gap-5 sm:grid-cols-2">
              {testimonials.map((t) => (
                <Card as="li" key={t.name}>
                  <Quote aria-hidden className="size-6 text-bubblegum" />
                  <blockquote className="mt-2 font-serif text-[20px] leading-snug">“{t.quote}”</blockquote>
                  <p className="mt-3 font-mono text-[11px] uppercase tracking-wider text-ink-soft">
                    {t.name} · {t.role}
                  </p>
                </Card>
              ))}
            </ul>
          )}
        </section>
      )}
    </>
  );
}
