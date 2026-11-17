"use client";

import { useEffect, useRef } from "react";
import { boardItems } from "@/content/board";
import { toPx } from "@/lib/board";
import { AvatarCard } from "@/components/cards/AvatarCard";
import {
  AboutCard,
  ContactCard,
  CurrentlyCard,
  DiscoSticker,
  ExperienceCard,
  HighlightsCard,
  HintNote,
  NameSticker,
  PinSticker,
  ProjectsCard,
  StarSticker,
} from "@/components/cards/Cards";
import { BoardItem } from "./BoardItem";
import { useBoard } from "./BoardProvider";

// Map board ids (from content/board.ts) to what they render.
const RENDER: Record<string, { node: React.ReactNode; focusable: boolean }> = {
  avatar: { node: <AvatarCard />, focusable: true },
  projects: { node: <ProjectsCard />, focusable: false },
  experience: { node: <ExperienceCard />, focusable: false },
  highlights: { node: <HighlightsCard />, focusable: false },
  about: { node: <AboutCard />, focusable: false },
  contact: { node: <ContactCard />, focusable: false },
  currently: { node: <CurrentlyCard />, focusable: true },
  name: { node: <NameSticker />, focusable: false },
  disco: { node: <DiscoSticker />, focusable: false },
  star: { node: <StarSticker />, focusable: false },
  pin: { node: <PinSticker />, focusable: false },
  hint: { node: <HintNote />, focusable: false },
};

export function Board() {
  const ref = useRef<HTMLDivElement>(null);
  const { layout, size, order, setSize, tidy } = useBoard();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ w: Math.round(width), h: Math.round(height) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [setSize]);

  return (
    <div
      ref={ref}
      className="relative h-full w-full"
      onKeyDown={(e) => {
        if ((e.key === "t" || e.key === "T") && !e.metaKey && !e.ctrlKey && !e.altKey) {
          e.preventDefault();
          tidy();
        }
      }}
    >
      <h2 className="sr-only">Board</h2>
      <p id="board-help" className="sr-only">
        Drag to rearrange, or use the arrow keys (hold Shift for bigger steps). Press T to tidy up.
      </p>
      {boardItems.map((spec, i) => {
        const r = RENDER[spec.id];
        if (!r) return null;
        const pos = toPx(layout[spec.id] ?? spec.start, spec, size.w ? size : { w: 1, h: 1 });
        return (
          <BoardItem
            key={spec.id}
            spec={spec}
            pos={pos}
            index={i}
            z={order.indexOf(spec.id) + 1}
            constraints={ref}
            focusable={r.focusable}
          >
            {r.node}
          </BoardItem>
        );
      })}
    </div>
  );
}
