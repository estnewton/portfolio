import type { BoardItemSpec } from "@/lib/types";

// Starting layout of the homepage board.
// x and y are fractions of the board (0 = left/top, 1 = right/bottom); r is rotation in degrees.
// Items are kept fully on the board automatically, so values near 1 are safe.
// Visitors' own arrangements are saved in their browser; bump BOARD_VERSION to reset everyone.

export const BOARD_VERSION = 1;

export const boardItems: BoardItemSpec[] = [
  { id: "avatar", kind: "avatar", label: "Illustrated Esther", w: 230, h: 290, start: { x: 0.02, y: 0.05, r: -2 } },
  { id: "projects", kind: "section", label: "Projects", w: 210, h: 250, start: { x: 0.31, y: 0.02, r: 3 } },
  { id: "experience", kind: "section", label: "Experience", w: 240, h: 180, start: { x: 0.62, y: 0.09, r: -4 } },
  { id: "currently", kind: "currently", label: "Currently", w: 220, h: 220, start: { x: 0.7, y: 0.42, r: 3 } },
  { id: "highlights", kind: "section", label: "Highlights", w: 210, h: 210, start: { x: 0.4, y: 0.42, r: -3 } },
  { id: "about", kind: "section", label: "About", w: 210, h: 190, start: { x: 0.03, y: 0.56, r: 2 } },
  { id: "contact", kind: "section", label: "Contact", w: 230, h: 160, start: { x: 0.36, y: 0.76, r: -2 } },
  { id: "name", kind: "sticker", label: "esther sticker", w: 190, h: 80, start: { x: 0.76, y: 0.02, r: 6 } },
  { id: "disco", kind: "sticker", label: "Disco ball sticker", w: 96, h: 96, start: { x: 0.27, y: 0.42, r: 0 } },
  { id: "star", kind: "sticker", label: "Star doodle", w: 60, h: 60, start: { x: 0.3, y: 0.68, r: 10 } },
  { id: "pin", kind: "sticker", label: "Location sticker", w: 170, h: 52, start: { x: 0.74, y: 0.86, r: -3 } },
  { id: "hint", kind: "sticker", label: "Drag hint", w: 190, h: 70, start: { x: 0.7, y: 0.72, r: -4 } },
];
