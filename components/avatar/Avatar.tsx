"use client";

import { animate, type MotionValue, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useRef } from "react";
import { AvatarArt, EYE_CENTER, VIEWBOX } from "./AvatarArt";

const MAX_PUPIL = 4.5; // how far pupils can travel, in viewBox units

type Props = {
  className?: string;
  /** Wave when this flips to true (e.g. the card is hovered or focused). */
  waving?: boolean;
};

/** Animated avatar: eyes follow the cursor, blinks now and then, waves on hover. */
export function Avatar({ className = "", waving = false }: Props) {
  const ref = useRef<SVGSVGElement>(null);
  const reduce = useReducedMotion();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const pupilX = useSpring(rawX, { stiffness: 300, damping: 25 });
  const pupilY = useSpring(rawY, { stiffness: 300, damping: 25 });
  const eyeScale = useMotionValue(1);
  const handRotate = useMotionValue(0);

  // Eyes follow the pointer
  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      const svg = ref.current;
      if (!svg) return;
      const r = svg.getBoundingClientRect();
      if (r.width === 0) return;
      const cx = r.left + (EYE_CENTER.x / VIEWBOX.w) * r.width;
      const cy = r.top + (EYE_CENTER.y / VIEWBOX.h) * r.height;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy) || 1;
      const reach = Math.min(MAX_PUPIL, dist / 30);
      rawX.set((dx / dist) * reach);
      rawY.set((dy / dist) * reach);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, rawX, rawY]);

  // Occasional blink
  useEffect(() => {
    if (reduce) return;
    let t: ReturnType<typeof setTimeout>;
    const loop = () => {
      t = setTimeout(() => {
        animate(eyeScale, [1, 0.1, 1], { duration: 0.22 });
        loop();
      }, 2800 + Math.random() * 3200);
    };
    loop();
    return () => clearTimeout(t);
  }, [reduce, eyeScale]);

  // Wave: once on load, then whenever `waving` turns on
  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(() => wave(handRotate), 900);
    return () => clearTimeout(t);
  }, [reduce, handRotate]);

  useEffect(() => {
    if (waving && !reduce) wave(handRotate);
  }, [waving, reduce, handRotate]);

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${VIEWBOX.w} ${VIEWBOX.h}`}
      className={className}
      role="img"
      aria-label="Illustration of Esther waving"
    >
      <AvatarArt pupilX={pupilX} pupilY={pupilY} eyeScale={eyeScale} handRotate={handRotate} />
    </svg>
  );
}

function wave(rot: MotionValue<number>) {
  animate(rot, [0, -22, 6, -22, 4, 0], { duration: 1.3, ease: "easeInOut" });
}
