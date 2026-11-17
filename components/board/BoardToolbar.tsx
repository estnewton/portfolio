"use client";

import { LayoutGrid, RotateCcw, Shuffle } from "lucide-react";
import { useBoard } from "./BoardProvider";

const btn =
  "inline-flex items-center gap-1.5 rounded-full border-[1.5px] border-ink bg-paper px-3.5 py-1.5 font-mono text-[12px] uppercase tracking-wider text-ink transition hover:-translate-y-0.5 hover:bg-bubblegum-soft active:translate-y-0";

export function BoardToolbar() {
  const { tidy, shuffle, reset, message } = useBoard();
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button type="button" className={btn} onClick={tidy} aria-keyshortcuts="T">
        <LayoutGrid aria-hidden className="size-4" /> Tidy up
      </button>
      <button type="button" className={btn} onClick={shuffle}>
        <Shuffle aria-hidden className="size-4" /> Shuffle
      </button>
      <button type="button" className={btn} onClick={reset} aria-label="Reset board">
        <RotateCcw aria-hidden className="size-4" />
      </button>
      <p role="status" aria-live="polite" className="sr-only">
        {message}
      </p>
    </div>
  );
}
