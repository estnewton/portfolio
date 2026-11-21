import type { BoardItemSpec } from "@/lib/types";

// Starting layout of the homepage board.
// x and y are fractions of the board (0 = left/top, 1 = right/bottom); r is rotation in degrees.
// Items are kept fully on the board automatically, so values near 1 are safe.
// Visitors' own arrangements are saved in their browser; bump BOARD_VERSION to reset everyone.

export const BOARD_VERSION = 5;

// Only things that aren't already in the page sections above it: the avatar, the "Currently"
// note, contact, and fun stickers about hobbies and personality.
export const boardItems: BoardItemSpec[] = [
  { id: "avatar", kind: "avatar", label: "Illustrated Esther", w: 230, h: 290, start: { x: 0.03, y: 0.05, r: -2 } },
  { id: "name", kind: "sticker", label: "Esther sticker", w: 190, h: 80, start: { x: 0.26, y: 0.04, r: 6 } },
  { id: "bonjour", kind: "sticker", label: "Bonjour speech bubble", w: 150, h: 80, start: { x: 0.45, y: 0.14, r: -5 } },
  { id: "currently", kind: "currently", label: "Currently", w: 220, h: 250, start: { x: 0.63, y: 0.05, r: 3 } },
  { id: "pickleball", kind: "sticker", label: "Pickleball paddle sticker", w: 96, h: 132, start: { x: 0.9, y: 0.07, r: 8 } },
  { id: "contact", kind: "section", label: "Contact", w: 230, h: 160, start: { x: 0.3, y: 0.42, r: -2 } },
  { id: "star", kind: "sticker", label: "Star doodle", w: 60, h: 60, start: { x: 0.54, y: 0.42, r: 10 } },
  { id: "pass", kind: "sticker", label: "Boarding pass to France", w: 240, h: 110, start: { x: 0.63, y: 0.52, r: 3 } },
  { id: "palette", kind: "sticker", label: "Paint palette sticker", w: 100, h: 100, start: { x: 0.05, y: 0.7, r: -8 } },
  { id: "disco", kind: "sticker", label: "Disco ball sticker", w: 96, h: 96, start: { x: 0.2, y: 0.74, r: 0 } },
  { id: "askme", kind: "sticker", label: "Ask me about note", w: 200, h: 130, start: { x: 0.4, y: 0.76, r: 2 } },
  { id: "afrotech", kind: "sticker", label: "Photo from AFROTECH Conference 2025", w: 190, h: 180, start: { x: 0.62, y: 0.72, r: -4 } },
  { id: "hint", kind: "sticker", label: "Drag hint", w: 190, h: 70, start: { x: 0.84, y: 0.82, r: -4 } },
];
