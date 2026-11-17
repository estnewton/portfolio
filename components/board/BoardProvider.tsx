"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { BOARD_VERSION, boardItems } from "@/content/board";
import { defaultLayout, shuffleLayout, tidyLayout, toFrac, type Layout, type Size } from "@/lib/board";

const STORAGE_KEY = `esther-board-v${BOARD_VERSION}`;

type BoardCtx = {
  layout: Layout;
  size: Size;
  ready: boolean;
  order: string[];
  message: string;
  setSize: (s: Size) => void;
  move: (id: string, px: { x: number; y: number }) => void;
  raise: (id: string) => void;
  tidy: () => void;
  shuffle: () => void;
  reset: () => void;
};

const Ctx = createContext<BoardCtx | null>(null);

export function useBoard() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useBoard must be used inside <BoardProvider>");
  return v;
}

function readSaved(): Layout | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Layout) : null;
  } catch {
    return null;
  }
}

function save(layout: Layout) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(layout));
  } catch {
    /* private mode or storage blocked: the board still works, it just won't remember */
  }
}

function clearSaved() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

export function BoardProvider({ children }: { children: React.ReactNode }) {
  const [layout, setLayout] = useState<Layout>(() => defaultLayout(boardItems));
  const [size, setSizeState] = useState<Size>({ w: 0, h: 0 });
  const [order, setOrder] = useState<string[]>(() => boardItems.map((i) => i.id));
  const [message, setMessage] = useState("");
  const loaded = useRef(false);
  const sizeRef = useRef(size);

  const setSize = useCallback((s: Size) => {
    sizeRef.current = s;
    setSizeState(s);
    // Restore a saved arrangement the first time we know the board's size.
    if (!loaded.current && s.w > 0) {
      loaded.current = true;
      const saved = readSaved();
      if (saved) setLayout((prev) => ({ ...prev, ...saved }));
    }
  }, []);

  const commit = useCallback((next: Layout, msg: string) => {
    setLayout(next);
    save(next);
    setMessage(msg);
  }, []);

  const move = useCallback((id: string, px: { x: number; y: number }) => {
    setLayout((prev) => {
      const next = { ...prev, [id]: toFrac(px, prev[id]?.r ?? 0, sizeRef.current) };
      save(next);
      return next;
    });
  }, []);

  const raise = useCallback((id: string) => {
    setOrder((prev) => (prev[prev.length - 1] === id ? prev : [...prev.filter((x) => x !== id), id]));
  }, []);

  const tidy = useCallback(() => commit(tidyLayout(boardItems, sizeRef.current), "Board tidied into a grid."), [commit]);
  const shuffle = useCallback(() => commit(shuffleLayout(boardItems, sizeRef.current), "Board shuffled."), [commit]);
  const reset = useCallback(() => {
    setLayout(defaultLayout(boardItems));
    clearSaved();
    setMessage("Board reset to the starting layout.");
  }, []);

  const value = useMemo(
    () => ({ layout, size, ready: size.w > 0, order, message, setSize, move, raise, tidy, shuffle, reset }),
    [layout, size, order, message, setSize, move, raise, tidy, shuffle, reset],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
