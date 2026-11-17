"use client";

import { animate, motion, useMotionValue, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import type { BoardItemSpec, Pos } from "@/lib/types";
import { useBoard } from "./BoardProvider";

type Props = {
  spec: BoardItemSpec;
  pos: Pos; // pixels
  index: number;
  z: number;
  constraints: React.RefObject<HTMLDivElement | null>;
  /** True when the item has no focusable child (like a link) of its own. */
  focusable: boolean;
  children: React.ReactNode;
};

const STEP = 12;
const BIG_STEP = 48;

export function BoardItem({ spec, pos, index, z, constraints, focusable, children }: Props) {
  const { move, raise, ready } = useBoard();
  const reduce = useReducedMotion();
  const x = useMotionValue(pos.x);
  const y = useMotionValue(pos.y);
  const rotate = useMotionValue(pos.r);
  const dragged = useRef(false);

  const placed = useRef(false);

  // Glide to new positions (tidy, shuffle, keyboard, resize).
  useEffect(() => {
    // Until the board is measured, and on the first measured frame, jump instead of gliding.
    if (!ready || !placed.current) {
      x.set(pos.x);
      y.set(pos.y);
      rotate.set(pos.r);
      if (ready) placed.current = true;
      return;
    }
    const opts = reduce ? { duration: 0 } : { type: "spring" as const, stiffness: 220, damping: 26 };
    const anims = [animate(x, pos.x, opts), animate(y, pos.y, opts), animate(rotate, pos.r, opts)];
    return () => anims.forEach((a) => a.stop());
  }, [pos.x, pos.y, pos.r, ready, reduce, x, y, rotate]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? BIG_STEP : STEP;
    const d: Record<string, [number, number]> = {
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
      ArrowUp: [0, -step],
      ArrowDown: [0, step],
    };
    const delta = d[e.key];
    if (!delta) return;
    e.preventDefault();
    raise(spec.id);
    move(spec.id, { x: x.get() + delta[0], y: y.get() + delta[1] });
  };

  const a11y = focusable
    ? {
        tabIndex: 0,
        role: "group",
        "aria-roledescription": "movable card",
        "aria-label": spec.label,
      }
    : {};

  return (
    <motion.div
      {...a11y}
      aria-describedby="board-help"
      className="absolute left-0 top-0 cursor-grab touch-none active:cursor-grabbing"
      style={{ x, y, rotate, zIndex: z }}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={
        ready
          ? {
              opacity: 1,
              scale: 1,
              transition: { delay: reduce ? 0 : 0.1 + index * 0.05, type: "spring", stiffness: 260, damping: 20 },
            }
          : { opacity: 0, scale: 0.85 }
      }
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      drag
      dragConstraints={constraints}
      dragElastic={0.08}
      dragMomentum={false}
      whileDrag={{ scale: 1.05 }}
      whileHover={{ scale: 1.02 }}
      onPointerDownCapture={() => {
        dragged.current = false;
        raise(spec.id);
      }}
      onFocus={() => raise(spec.id)}
      onDragStart={() => {
        dragged.current = true;
      }}
      onDragEnd={() => move(spec.id, { x: x.get(), y: y.get() })}
      onClickCapture={(e) => {
        // A drag shouldn't also count as a click on the card's link.
        if (dragged.current) {
          e.preventDefault();
          e.stopPropagation();
          dragged.current = false;
        }
      }}
      onKeyDown={onKeyDown}
    >
      {children}
    </motion.div>
  );
}
