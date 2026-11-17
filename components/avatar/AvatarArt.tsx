"use client";

import { useId } from "react";
import { motion, type MotionValue } from "motion/react";

/*
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │  Cartoon Esther: long wavy hair, navy blazer, white blouse.          │
 * │                                                                      │
 * │  Tweak colors in `C` below. To swap in your own drawing:             │
 * │  1. Export an SVG with a 240 × 290 artboard (or update VIEWBOX +     │
 * │     EYE_CENTER below).                                               │
 * │  2. Paste your paths in place of the groups below, keeping these     │
 * │     three wrappers so the animations keep working:                   │
 * │       • <motion.g style={{ x: pupilX, y: pupilY }}>  → your pupils   │
 * │       • <motion.g style={{ scaleY: eyeScale }}>      → whole eyes    │
 * │       • <motion.g style={{ rotate: handRotate }}>    → waving arm    │
 * │  3. Set HAND_ORIGIN to where your arm meets your shoulder.           │
 * └──────────────────────────────────────────────────────────────────────┘
 */

export const VIEWBOX = { w: 240, h: 290 };
/** Midpoint between the eyes, in viewBox units. Pupils look from here. */
export const EYE_CENTER = { x: 120, y: 132 };
const HAND_ORIGIN = "186px 244px";

const ink = "var(--ink)";
const C = {
  skin: "#9a6142",
  skinShade: "#7c4a30",
  hair: "#2a211c",
  hairShine: "#4a3c33",
  blazer: "#24396b",
  blazerShade: "#1a2a52",
  blouse: "var(--paper)",
  lips: "#a8504a",
};

type Props = {
  pupilX: MotionValue<number>;
  pupilY: MotionValue<number>;
  eyeScale: MotionValue<number>;
  handRotate: MotionValue<number>;
};

export function AvatarArt({ pupilX, pupilY, eyeScale, handRotate }: Props) {
  const clip = useId();
  const eyeL = "M86 132 Q97 121 109 131 Q97 140 86 132 Z";
  const eyeR = "M131 131 Q143 121 154 132 Q143 140 131 131 Z";

  return (
    <>
      <defs>
        <clipPath id={clip}>
          <path d={eyeL} />
          <path d={eyeR} />
        </clipPath>
      </defs>

      {/* hair, back layer (falls behind the shoulders) */}
      <path
        d="M120 56 C74 56 48 92 50 140 C51 170 42 190 48 212 C54 232 40 250 52 268 C60 280 76 278 82 270 L158 270 C164 278 180 280 188 268 C200 250 186 232 192 212 C198 190 189 170 190 140 C192 92 166 56 120 56 Z"
        fill={C.hair}
        stroke={ink}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* blazer + blouse */}
      <path
        d="M28 290 C32 238, 74 214, 120 214 C166 214, 208 238, 212 290 Z"
        fill={C.blazer}
        stroke={ink}
        strokeWidth="3"
      />
      <path d="M100 215 L120 268 L140 215 Z" fill={C.blouse} stroke={ink} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M120 236 L120 268" stroke={ink} strokeWidth="1.5" opacity="0.35" />
      {/* lapels */}
      <path d="M98 216 L88 236 L104 244 L120 284" fill="none" stroke={C.blazerShade} strokeWidth="3" strokeLinejoin="round" />
      <path d="M142 216 L152 236 L136 244 L120 284" fill="none" stroke={C.blazerShade} strokeWidth="3" strokeLinejoin="round" />

      {/* neck */}
      <path d="M107 182 L107 210 Q120 222 133 210 L133 182 Z" fill={C.skin} stroke={ink} strokeWidth="3" strokeLinejoin="round" />
      <path d="M108 196 Q120 204 132 196" fill="none" stroke={C.skinShade} strokeWidth="3" opacity="0.6" />

      {/* wavy locks over the shoulders */}
      <path
        d="M66 168 C56 194 72 212 62 236 C54 254 64 270 80 278 C88 262 80 246 88 228 C94 210 82 192 86 172 Z"
        fill={C.hair}
        stroke={ink}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M174 168 C184 194 168 212 178 236 C186 254 176 270 160 278 C152 262 160 246 152 228 C146 210 158 192 154 172 Z"
        fill={C.hair}
        stroke={ink}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M72 200 q8 10 2 22 M74 246 q-6 10 2 20 M168 200 q-8 10 -2 22 M166 246 q6 10 -2 20" fill="none" stroke={C.hairShine} strokeWidth="2.5" strokeLinecap="round" />

      {/* waving arm */}
      <motion.g style={{ rotate: handRotate, transformOrigin: HAND_ORIGIN, transformBox: "view-box" }}>
        <path d="M184 246 C200 226, 207 200, 208 180" fill="none" stroke={ink} strokeWidth="21" strokeLinecap="round" />
        <path d="M184 246 C200 226, 207 200, 208 180" fill="none" stroke={C.blazer} strokeWidth="15" strokeLinecap="round" />
        <path d="M200 178 L216 180" stroke={C.blouse} strokeWidth="5" strokeLinecap="round" />
        <circle cx="208" cy="164" r="14" fill={C.skin} stroke={ink} strokeWidth="3" />
        <path d="M200 158 v-10 M208 154 v-12 M216 157 v-10" stroke={ink} strokeWidth="2.5" strokeLinecap="round" />
      </motion.g>

      {/* head */}
      <ellipse cx="120" cy="128" rx="54" ry="60" fill={C.skin} stroke={ink} strokeWidth="3" />

      {/* front hair: center part, framing the face */}
      <path
        d="M118 62 C86 62 62 84 60 126 C59 148 62 168 70 184 C70 156 76 122 92 100 C102 86 112 76 118 70 Z"
        fill={C.hair}
        stroke={ink}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M122 62 C154 62 178 84 180 126 C181 148 178 168 170 184 C170 156 164 122 148 100 C138 86 128 76 122 70 Z"
        fill={C.hair}
        stroke={ink}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M98 74 Q80 88 74 112 M142 74 Q160 88 166 112" fill="none" stroke={C.hairShine} strokeWidth="2.5" strokeLinecap="round" />

      {/* brows */}
      <path d="M85 118 Q97 110 109 116" fill="none" stroke={C.hair} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M131 116 Q143 110 155 118" fill="none" stroke={C.hair} strokeWidth="3.5" strokeLinecap="round" />

      {/* eyes (blink) */}
      <motion.g style={{ scaleY: eyeScale, transformOrigin: `${EYE_CENTER.x}px ${EYE_CENTER.y}px`, transformBox: "view-box" }}>
        <path d={eyeL} fill="#fff" />
        <path d={eyeR} fill="#fff" />
        {/* pupils (follow the cursor) */}
        <g clipPath={`url(#${clip})`}>
          <motion.g style={{ x: pupilX, y: pupilY }}>
            <circle cx="97.5" cy="131" r="5.5" fill="#3a2418" />
            <circle cx="142.5" cy="131" r="5.5" fill="#3a2418" />
            <circle cx="97.5" cy="131" r="2.6" fill={ink} />
            <circle cx="142.5" cy="131" r="2.6" fill={ink} />
            <circle cx="99.5" cy="129" r="1.5" fill="#fff" />
            <circle cx="144.5" cy="129" r="1.5" fill="#fff" />
          </motion.g>
        </g>
        {/* lash lines */}
        <path d="M84 133 Q97 119 110 131 L113 128" fill="none" stroke={ink} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M156 133 Q143 119 130 131 L127 128" fill="none" stroke={ink} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M86 132 Q97 140 109 131 M131 131 Q143 140 154 132" fill="none" stroke={ink} strokeWidth="1.5" opacity="0.6" />
      </motion.g>

      {/* cheeks, nose, smile */}
      <circle cx="84" cy="152" r="9" fill="var(--bubblegum)" opacity="0.3" />
      <circle cx="156" cy="152" r="9" fill="var(--bubblegum)" opacity="0.3" />
      <path d="M114 150 Q120 156 126 150" fill="none" stroke={C.skinShade} strokeWidth="3" strokeLinecap="round" />
      <path
        d="M101 163 Q120 162 139 163 Q132 182 120 182 Q108 182 101 163 Z"
        fill={C.lips}
        stroke={ink}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M104 165 Q120 164 136 165 Q133 172 120 172 Q107 172 104 165 Z" fill="#fff" />
    </>
  );
}
