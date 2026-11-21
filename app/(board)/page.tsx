import { BoardProvider } from "@/components/board/BoardProvider";
import { HomeHero } from "@/components/home/HomeHero";
import {
  AboutBlock,
  BoardBlock,
  ConnectBlock,
  ExperienceBlock,
  HonorsBlock,
  ProjectsBlock,
} from "@/components/home/HomeSections";
import { SiteNav } from "@/components/home/SiteNav";
import { about } from "@/content/about";
import { site } from "@/content/site";

// Structured data so search engines understand who this site is about.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  email: `mailto:${site.email}`,
  jobTitle: "Product Management and Software Engineering Intern",
  description: site.description,
  alumniOf: { "@type": "CollegeOrUniversity", name: "The Pennsylvania State University" },
  knowsAbout: ["Product management", "Software engineering", "Industrial engineering"],
  sameAs: [site.linkedin, site.github].filter(Boolean),
  ...(about.photo.src ? { image: `${site.url}${about.photo.src}` } : {}),
};

// One long page: hero, then each section in order. The draggable cork board lives near the
// end (desktop only), and its cards still open each section in a slide-over panel.
export default function Home() {
  return (
    <BoardProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
      {/* Without JavaScript the board can't position its cards, so leave it out. */}
      <noscript>
        <style>{`.board-js{display:none!important}`}</style>
      </noscript>
      <div className="blush-paper min-h-dvh">
        <SiteNav />
        <main id="main">
          <HomeHero />
          <AboutBlock />
          <ExperienceBlock />
          <ProjectsBlock />
          <HonorsBlock />
          <BoardBlock />
          <ConnectBlock />
        </main>
        <footer className="mx-auto max-w-5xl border-t border-ink/15 px-4 py-8 font-mono text-[11px] uppercase tracking-wider text-ink-soft sm:px-8">
          {site.name}
        </footer>
      </div>
    </BoardProvider>
  );
}
