import { AvatarCard } from "@/components/cards/AvatarCard";
import {
  AboutCard,
  ContactCard,
  CurrentlyCard,
  ExperienceCard,
  HighlightsCard,
  NameSticker,
  ProjectsCard,
} from "@/components/cards/Cards";

// Phones and small tablets: the same cards as the board, stacked like a scrapbook page.
// No dragging here, since that's awkward on touch screens.

const items: { node: React.ReactNode; tilt: number }[] = [
  { node: <ProjectsCard />, tilt: 2 },
  { node: <ExperienceCard />, tilt: -2 },
  { node: <HighlightsCard />, tilt: 1.5 },
  { node: <AboutCard />, tilt: -1.5 },
  { node: <ContactCard />, tilt: 2 },
];

export function MobileStack() {
  return (
    <div className="px-6 pb-16 sm:px-10">
      <div className="relative mx-auto flex max-w-xl flex-wrap items-start justify-center gap-x-6 gap-y-10">
        <div className="-rotate-2">
          <AvatarCard />
        </div>
        <div className="flex flex-col items-center gap-6 rotate-2">
          <NameSticker />
          <CurrentlyCard />
        </div>
        {items.map((it, i) => (
          <div key={i} style={{ rotate: `${it.tilt}deg` }}>
            {it.node}
          </div>
        ))}
      </div>
    </div>
  );
}
