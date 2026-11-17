"use client";

import { useState } from "react";
import { Avatar } from "@/components/avatar/Avatar";
import { Tape } from "@/components/decor/Decor";

export function AvatarCard() {
  const [hover, setHover] = useState(false);
  return (
    <figure
      className="relative bg-paper p-3 pb-2 paper-shadow"
      style={{ width: 230 }}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
    >
      <Tape className="absolute -top-3 left-4 h-6 w-20 -rotate-6" />
      <div className="bg-board">
        <Avatar className="block h-auto w-full" waving={hover} />
      </div>
      <figcaption className="pt-1 text-center font-hand text-xl text-ink">
        that&apos;s me :)
      </figcaption>
    </figure>
  );
}
