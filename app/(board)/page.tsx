import { Board } from "@/components/board/Board";
import { BoardProvider } from "@/components/board/BoardProvider";
import { BoardToolbar } from "@/components/board/BoardToolbar";
import { Hero } from "@/components/Hero";
import { MobileStack } from "@/components/MobileStack";
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

export default function Home() {
  return (
    <BoardProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
      {/* Without JavaScript the board can't position its cards, so show the stacked layout instead. */}
      <noscript>
        <style>{`.board-js{display:none!important}.board-nojs{display:block!important}`}</style>
      </noscript>
      <main
        id="main"
        className="blush-paper min-h-dvh lg:grid lg:h-dvh lg:min-h-[760px] lg:grid-cols-[minmax(420px,37%)_1fr] lg:overflow-hidden"
      >
        <Hero toolbar={<BoardToolbar />} />

        {/* Desktop: draggable cork board in a wood frame */}
        <div className="board-js hidden py-6 pr-6 lg:block">
          <div className="cork-frame h-full rounded-[14px] p-3">
            <div className="cork-bg h-full rounded-[6px]">
              <Board />
            </div>
          </div>
        </div>

        {/* Mobile + tablet (and desktop without JavaScript): scrollable stack on cork */}
        <div className="board-nojs cork-bg lg:hidden lg:overflow-y-auto">
          <MobileStack />
        </div>
      </main>
    </BoardProvider>
  );
}
