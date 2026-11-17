import type { BoardItemSpec, Pos } from "./types";

export type Size = { w: number; h: number };
export type Layout = Record<string, Pos>;

const PAD = 8;

export const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), Math.max(lo, hi));

/** Fractions (0–1) → pixels, keeping the whole item on the board. */
export function toPx(pos: Pos, item: BoardItemSpec, size: Size): Pos {
  return {
    x: clamp(pos.x * size.w, PAD, size.w - item.w - PAD),
    y: clamp(pos.y * size.h, PAD, size.h - item.h - PAD),
    r: pos.r,
  };
}

/** Pixels → fractions, so layouts survive window resizes. */
export function toFrac(px: { x: number; y: number }, r: number, size: Size): Pos {
  return { x: size.w ? px.x / size.w : 0, y: size.h ? px.y / size.h : 0, r };
}

export function defaultLayout(items: BoardItemSpec[]): Layout {
  return Object.fromEntries(items.map((i) => [i.id, i.start]));
}

/**
 * "Tidy up": shelf-pack items left-to-right in their listed order,
 * wrap to a new row when full, center each row, and center the block vertically.
 */
export function tidyLayout(items: BoardItemSpec[], size: Size, gap = 28): Layout {
  const rows: { items: BoardItemSpec[]; w: number; h: number }[] = [];
  let row = { items: [] as BoardItemSpec[], w: 0, h: 0 };
  const maxW = size.w - PAD * 2;
  for (const it of items) {
    const nextW = row.items.length ? row.w + gap + it.w : it.w;
    if (row.items.length && nextW > maxW) {
      rows.push(row);
      row = { items: [], w: 0, h: 0 };
    }
    row.w = row.items.length ? row.w + gap + it.w : it.w;
    row.h = Math.max(row.h, it.h);
    row.items.push(it);
  }
  if (row.items.length) rows.push(row);

  const totalH = rows.reduce((s, r) => s + r.h, 0) + gap * (rows.length - 1);
  let y = Math.max(PAD, (size.h - totalH) / 2);
  const out: Layout = {};
  for (const r of rows) {
    let x = Math.max(PAD, (size.w - r.w) / 2);
    for (const it of r.items) {
      out[it.id] = toFrac({ x, y: y + (r.h - it.h) / 2 }, 0, size);
      x += it.w + gap;
    }
    y += r.h + gap;
  }
  return out;
}

/** "Shuffle": scatter items randomly with a little tilt. */
export function shuffleLayout(items: BoardItemSpec[], size: Size): Layout {
  const out: Layout = {};
  for (const it of items) {
    const x = Math.random() * Math.max(0, size.w - it.w);
    const y = Math.random() * Math.max(0, size.h - it.h);
    out[it.id] = toFrac({ x, y }, Math.round((Math.random() - 0.5) * 16), size);
  }
  return out;
}
