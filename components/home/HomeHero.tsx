import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { Mail } from "lucide-react";
import { about } from "@/content/about";
import { site } from "@/content/site";
import { GitHubIcon, LinkedInIcon, SocialLink } from "./Social";

// Hero photo: your headshot at public/images/headshot.jpg, or the About photo until that file exists.
const HEADSHOT = "/images/headshot.jpg";

/** Name, one-line pitch, links, and a photo. The 30-second scan. */
export function HomeHero() {
  const hasHeadshot = fs.existsSync(path.join(process.cwd(), "public", HEADSHOT));
  const heroPhoto = hasHeadshot
    ? { src: HEADSHOT, alt: "Headshot of Esther Newton smiling in a navy blazer and white blouse", position: "50% 30%" }
    : { src: about.photo.src, alt: about.photo.alt, position: "55% 40%" };
  const [first, ...rest] = site.name.split(" ");
  return (
    <section id="top" aria-labelledby="hero-name" className="scroll-mt-16">
      <div className="mx-auto grid max-w-5xl items-center gap-10 px-4 pb-12 pt-14 sm:px-8 sm:pt-20 md:grid-cols-[1fr_280px] md:gap-14">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cherry">{site.role}</p>
          <h1
            id="hero-name"
            className="mt-6 text-[clamp(3.25rem,8vw,5.25rem)] font-semibold leading-[1.05] tracking-[-0.02em]"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            {first}{" "}
            <em className="relative inline-block text-cherry">
              {rest.join(" ")}
              <svg aria-hidden viewBox="0 0 200 20" preserveAspectRatio="none" className="absolute -bottom-1 left-0 h-2.5 w-full">
                <path d="M3 14 C 50 4, 120 4, 197 10" fill="none" stroke="var(--bubblegum)" strokeWidth="5" strokeLinecap="round" />
              </svg>
            </em>
          </h1>
          <p className="mt-5 font-mono text-[12px] uppercase leading-relaxed tracking-[0.14em] text-ink-soft">
            {site.facts.join("  ·  ")}
          </p>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-ink-soft">{site.intro}</p>

          <ul className="mt-7 flex gap-3" aria-label="Find me online">
            <SocialLink href={site.linkedin} label="LinkedIn">
              <LinkedInIcon />
            </SocialLink>
            <SocialLink href={site.github} label="GitHub">
              <GitHubIcon />
            </SocialLink>
            <SocialLink href={`mailto:${site.email}`} label={`Email ${site.email}`}>
              <Mail aria-hidden className="size-5" strokeWidth={1.75} />
            </SocialLink>
          </ul>
        </div>

        <div className="relative mx-auto aspect-[4/5] w-full max-w-[280px] overflow-hidden rounded-[4px] bg-bubblegum-soft">
          <Image
            src={heroPhoto.src}
            alt={heroPhoto.alt}
            fill
            priority
            sizes="280px"
            className="object-cover"
            style={{ objectPosition: heroPhoto.position }}
          />
        </div>
      </div>
    </section>
  );
}
