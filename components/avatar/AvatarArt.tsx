"use client";

import { motion, type MotionValue } from "motion/react";

/*
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │  PLACEHOLDER ILLUSTRATION — swap in your own!                        │
 * │                                                                      │
 * │  How to replace it:                                                  │
 * │  1. Draw yourself in Figma / Procreate / Illustrator and export SVG  │
 * │     with a 240 × 290 artboard (or update VIEWBOX + EYE_CENTER below).│
 * │  2. Paste your paths in place of the groups below, keeping these     │
 * │     three wrappers so the animations keep working:                   │
 * │       • <motion.g style={{ x: pupilX, y: pupilY }}>  → your pupils   │
 * │       • <motion.g style={{ scaleY: eyeScale }}>      → whole eyes    │
 * │       • <motion.g style={{ rotate: handRotate }}>    → waving arm    │
 * │  3. Set HAND_ORIGIN to where your arm meets your shoulder.           │
 * │                                                                      │
 * │  Prefer a drawn PNG? Put it in /public and render an <image> for the │
 * │  body, then keep separate SVG eyes on top so they still follow.      │
 * └──────────────────────────────────────────────────────────────────────┘
 */

export const VIEWBOX = { w: 240, h: 290 };
/** Midpoint between the eyes, in viewBox units. Pupils look from here. */
export const EYE_CENTER = { x: 120, y: 134 };
const HAND_ORIGIN = "184px 238px";

const ink = "var(--ink)";

type Props = {
  pupilX: MotionValue<number>;
  pupilY: MotionValue<number>;
  eyeScale: MotionValue<number>;
  handRotate: MotionValue<number>;
};

export function AvatarArt({ pupilX, pupilY, eyeScale, handRotate }: Props) {
  return (
    <>
      {/* body */}
      <path
        d="M36 290 C40 238, 78 214, 120 214 C162 214, 200 238, 204 290 Z"
        fill="var(--bubblegum-soft)"
        stroke={ink}
        strokeWidth="3"
      />
      <path d="M100 216 Q120 232 140 216" fill="none" stroke={ink} strokeWidth="3" strokeLinecap="round" />
      <rect x="108" y="190" width="24" height="28" fill="var(--paper)" stroke={ink} strokeWidth="3" />

      {/* waving arm */}
      <motion.g style={{ rotate: handRotate, transformOrigin: HAND_ORIGIN, transformBox: "view-box" }}>
        <path d="M182 240 C198 222, 206 198, 208 178" fill="none" stroke={ink} strokeWidth="19" strokeLinecap="round" />
        <path d="M182 240 C198 222, 206 198, 208 178" fill="none" stroke="var(--bubblegum-soft)" strokeWidth="13" strokeLinecap="round" />
        <circle cx="209" cy="166" r="15" fill="var(--paper)" stroke={ink} strokeWidth="3" />
        <path d="M200 160 v-10 M208 156 v-12 M216 158 v-10" stroke={ink} strokeWidth="2.5" strokeLinecap="round" />
      </motion.g>

      {/* ears + earrings */}
      <ellipse cx="60" cy="140" rx="9" ry="13" fill="var(--paper)" stroke={ink} strokeWidth="3" />
      <ellipse cx="180" cy="140" rx="9" ry="13" fill="var(--paper)" stroke={ink} strokeWidth="3" />
      <circle cx="58" cy="158" r="4" fill="var(--bubblegum)" />
      <circle cx="182" cy="158" r="4" fill="var(--bubblegum)" />

      {/* head */}
      <ellipse cx="120" cy="132" rx="61" ry="65" fill="var(--paper)" stroke={ink} strokeWidth="3" />

      {/* hair + bun + scrunchie */}
      <circle cx="120" cy="52" r="21" fill={ink} />
      <rect x="104" y="66" width="32" height="8" rx="4" fill="var(--bubblegum)" />
      <path
        d="M58 132 C52 80, 88 62, 120 64 C154 66, 188 84, 182 132 C172 108, 152 92, 128 92 C108 100, 90 104, 70 122 Z"
        fill={ink}
      />

      {/* brows */}
      <path d="M86 112 Q98 106 108 112" fill="none" stroke={ink} strokeWidth="3" strokeLinecap="round" />
      <path d="M132 112 Q142 106 154 112" fill="none" stroke={ink} strokeWidth="3" strokeLinecap="round" />

      {/* eyes (blink) */}
      <motion.g style={{ scaleY: eyeScale, transformOrigin: `${EYE_CENTER.x}px ${EYE_CENTER.y}px`, transformBox: "view-box" }}>
        <ellipse cx="98" cy="134" rx="12" ry="13" fill="#fff" stroke={ink} strokeWidth="2.5" />
        <ellipse cx="142" cy="134" rx="12" ry="13" fill="#fff" stroke={ink} strokeWidth="2.5" />
        {/* pupils (follow the cursor) */}
        <motion.g style={{ x: pupilX, y: pupilY }}>
          <circle cx="98" cy="135" r="5.5" fill={ink} />
          <circle cx="142" cy="135" r="5.5" fill={ink} />
          <circle cx="100" cy="133" r="1.6" fill="#fff" />
          <circle cx="144" cy="133" r="1.6" fill="#fff" />
        </motion.g>
      </motion.g>

      {/* cheeks, nose, smile */}
      <circle cx="84" cy="158" r="9" fill="var(--bubblegum)" opacity="0.45" />
      <circle cx="156" cy="158" r="9" fill="var(--bubblegum)" opacity="0.45" />
      <path d="M120 142 q-5 10 3 12" fill="none" stroke={ink} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M104 164 Q120 182 136 164 Z" fill="var(--cherry)" stroke={ink} strokeWidth="3" strokeLinejoin="round" />
    </>
  );
}
