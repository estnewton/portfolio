"use client";

import Image from "next/image";
import { animate, useReducedMotion, type AnimationPlaybackControls } from "motion/react";
import { Minus, Plus, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { City } from "@/content/travel";

export type MapCity = City & { id: string; x: number; y: number; countryName: string };
export type MapRegion = { label: string; box: [number, number, number, number] };
type View = { k: number; x: number; y: number };

type Props = {
  W: number;
  H: number;
  mapW: number;
  mapH: number;
  cities: MapCity[];
  regions: MapRegion[];
  countriesWithoutCities: string[];
  children: React.ReactNode;
};

const MAX_K = 40;
const CHAR_W = 0.6; // monospace glyph width as a share of font size

export function TravelMapView({ W, H, mapW, mapH, cities, regions, countriesWithoutCities, children }: Props) {
  const reduce = useReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);
  const anim = useRef<AnimationPlaybackControls | null>(null);
  const drag = useRef<{ px: number; py: number; start: View; moved: boolean; hit: string | null } | null>(null);
  const [unit, setUnit] = useState(1); // viewBox units per screen pixel
  const [selected, setSelected] = useState<string | null>(null);
  const [activeRegion, setActiveRegion] = useState<string | undefined>(regions[0]?.label);

  const clamp = useCallback(
    (v: View): View => {
      const k = Math.min(MAX_K, Math.max(1, v.k));
      const cw = mapW * k;
      const ch = mapH * k;
      return {
        k,
        x: cw <= W ? (W - cw) / 2 : Math.min(0, Math.max(W - cw, v.x)),
        y: ch <= H ? (H - ch) / 2 : Math.min(0, Math.max(H - ch, v.y)),
      };
    },
    [W, H, mapW, mapH],
  );

  const fit = useCallback(
    ([x0, y0, x1, y1]: MapRegion["box"], pad = 36): View => {
      const k = Math.min((W - pad * 2) / (x1 - x0), (H - pad * 2) / (y1 - y0));
      return clamp({ k, x: W / 2 - (k * (x0 + x1)) / 2, y: H / 2 - (k * (y0 + y1)) / 2 });
    },
    [W, H, clamp],
  );

  const [view, setView] = useState<View>(() => (regions[0] ? fit(regions[0].box) : clamp({ k: 1, x: 0, y: 0 })));
  const viewRef = useRef(view);
  useEffect(() => {
    viewRef.current = view;
  }, [view]);

  const flyTo = useCallback(
    (target: View) => {
      anim.current?.stop();
      const to = clamp(target);
      if (reduce) return setView(to);
      const from = viewRef.current;
      anim.current = animate(0, 1, {
        duration: 0.7,
        ease: [0.4, 0, 0.2, 1],
        onUpdate: (t) =>
          setView({ k: from.k + (to.k - from.k) * t, x: from.x + (to.x - from.x) * t, y: from.y + (to.y - from.y) * t }),
      });
    },
    [clamp, reduce],
  );

  const zoomAt = useCallback(
    (factor: number, cx = W / 2, cy = H / 2, smooth = true) => {
      const v = viewRef.current;
      const k = Math.min(MAX_K, Math.max(1, v.k * factor));
      const next = { k, x: cx - ((cx - v.x) * k) / v.k, y: cy - ((cy - v.y) * k) / v.k };
      if (smooth) flyTo(next);
      else setView(clamp(next));
    },
    [W, H, clamp, flyTo],
  );

  // Track how big the map is on screen, so dots and labels stay the same size at any width.
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const ro = new ResizeObserver(([e]) => setUnit(W / Math.max(1, e.contentRect.width)));
    ro.observe(svg);
    return () => ro.disconnect();
  }, [W]);

  // Pinch-zoom on trackpads (sent as ctrl + wheel). Plain scrolling still scrolls the page.
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      const r = svg.getBoundingClientRect();
      const u = W / r.width;
      anim.current?.stop();
      zoomAt(Math.exp(-e.deltaY * 0.01), (e.clientX - r.left) * u, (e.clientY - r.top) * u, false);
    };
    svg.addEventListener("wheel", onWheel, { passive: false });
    return () => svg.removeEventListener("wheel", onWheel);
  }, [W, zoomAt]);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  // Dragging
  const onPointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    if (e.button !== 0) return;
    anim.current?.stop();
    // Remember which city (if any) was pressed: once the pointer is captured, later events target the map itself.
    const hit = (e.target as Element).closest?.("[data-city]")?.getAttribute("data-city") ?? null;
    drag.current = { px: e.clientX, py: e.clientY, start: viewRef.current, moved: false, hit };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const d = drag.current;
    if (!d) return;
    const dx = (e.clientX - d.px) * unit;
    const dy = (e.clientY - d.py) * unit;
    if (!d.moved && Math.hypot(dx, dy) < 4 * unit) return;
    d.moved = true;
    setActiveRegion(undefined);
    setView(clamp({ ...d.start, x: d.start.x + dx, y: d.start.y + dy }));
  };
  const onPointerUp = (e: React.PointerEvent<SVGSVGElement>) => {
    const d = drag.current;
    drag.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
    if (!d || d.moved) return;
    // A click, not a drag: open the city under the pointer, or close the pop-up.
    setSelected(d.hit);
  };

  const onKeyDown = (e: React.KeyboardEvent<SVGSVGElement>) => {
    const step = 60;
    const v = viewRef.current;
    const moves: Record<string, Partial<View>> = {
      ArrowLeft: { x: v.x + step },
      ArrowRight: { x: v.x - step },
      ArrowUp: { y: v.y + step },
      ArrowDown: { y: v.y - step },
    };
    if (moves[e.key]) {
      e.preventDefault();
      setView(clamp({ ...v, ...moves[e.key] }));
    } else if (e.key === "+" || e.key === "=") zoomAt(1.6);
    else if (e.key === "-") zoomAt(1 / 1.6);
  };

  const focusCity = (c: MapCity) => {
    const k = Math.max(viewRef.current.k, 7);
    flyTo({ k, x: W / 2 - c.x * k, y: H / 2 - c.y * k });
    setActiveRegion(undefined);
    setSelected(c.id);
  };

  // Screen positions + labels that don't overlap
  const placed = useMemo(() => {
    const font = 12 * unit;
    const pts = cities.map((c) => ({ c, sx: c.x * view.k + view.x, sy: c.y * view.k + view.y }));
    const inView = (sx: number, sy: number) => sx >= -10 && sx <= W + 10 && sy >= -10 && sy <= H + 10;
    const boxes: [number, number, number, number][] = [];
    const free = (b: [number, number, number, number]) =>
      b[0] >= 0 && b[2] <= W && b[1] >= 0 && b[3] <= H && boxes.every((o) => b[0] > o[2] || b[2] < o[0] || b[1] > o[3] || b[3] < o[1]);
    const labels: { key: string; text: string; x: number; y: number; anchor: "start" | "middle" | "end" }[] = [];
    const missing = new Map<string, typeof pts>();

    // Standalone cities get first claim on label space; clustered ones fall back to a group label.
    for (const p of [...pts].sort((a, b) => Number(!!a.c.cluster) - Number(!!b.c.cluster))) {
      if (!inView(p.sx, p.sy)) continue;
      const w = p.c.name.length * font * CHAR_W;
      // Try the label to the upper right, then right, then the left side of the dot.
      const spots = [
        { x: p.sx + 8 * unit, y: p.sy - 6 * unit, anchor: "start" as const },
        { x: p.sx + 9 * unit, y: p.sy + font / 2 - unit, anchor: "start" as const },
        { x: p.sx - 8 * unit, y: p.sy - 6 * unit, anchor: "end" as const },
        { x: p.sx - 9 * unit, y: p.sy + font / 2 - unit, anchor: "end" as const },
      ];
      const spot = spots.find((s) => {
        const x0 = s.anchor === "start" ? s.x : s.x - w;
        return free([x0, s.y - font, x0 + w, s.y + 3 * unit]);
      });
      if (spot) {
        const x0 = spot.anchor === "start" ? spot.x : spot.x - w;
        boxes.push([x0, spot.y - font, x0 + w, spot.y + 3 * unit]);
        labels.push({ key: p.c.id, text: p.c.name, ...spot });
      } else if (p.c.cluster) {
        missing.set(p.c.cluster, [...(missing.get(p.c.cluster) ?? []), p]);
      }
    }
    for (const [name, ps] of missing) {
      const all = pts.filter((p) => p.c.cluster === name);
      const text = `${name} (${all.length})`;
      const cx = (Math.min(...all.map((p) => p.sx)) + Math.max(...all.map((p) => p.sx))) / 2;
      const y = Math.max(...all.map((p) => p.sy)) + 20 * unit;
      const w = text.length * font * CHAR_W;
      const b: [number, number, number, number] = [cx - w / 2, y - font, cx + w / 2, y + 3 * unit];
      if (ps.length && free(b)) {
        boxes.push(b);
        labels.push({ key: `cluster-${name}`, text, x: cx, y, anchor: "middle" });
      }
    }
    return { pts, labels, font };
  }, [cities, view, unit, W, H]);

  const sel = placed.pts.find((p) => p.c.id === selected);
  const byCountry = useMemo(() => {
    const m = new Map<string, MapCity[]>();
    for (const c of cities) m.set(c.countryName, [...(m.get(c.countryName) ?? []), c]);
    for (const c of countriesWithoutCities) if (!m.has(c)) m.set(c, []);
    return [...m];
  }, [cities, countriesWithoutCities]);

  const btn =
    "rounded-full border-[1.5px] border-ink/20 bg-paper px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-ink-soft transition hover:border-ink/50 hover:text-ink";

  return (
    <figure>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        {regions.map((r) => (
          <button
            key={r.label}
            type="button"
            aria-pressed={activeRegion === r.label}
            onClick={() => {
              setActiveRegion(r.label);
              setSelected(null);
              flyTo(fit(r.box));
            }}
            className={`${btn} aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper`}
          >
            {r.label}
          </button>
        ))}
        <span className="ml-auto font-hand text-lg text-pen">drag to explore, tap a dot for a photo</span>
      </div>

      <div className="relative overflow-hidden rounded-[6px] bg-[#f7f2ea]">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          className="block h-auto w-full cursor-grab touch-none select-none active:cursor-grabbing"
          role="application"
          aria-roledescription="map"
          aria-label="Travel map. Drag or use arrow keys to move, plus and minus to zoom. Each dot is a city; the list below the map has every city."
          tabIndex={0}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={() => (drag.current = null)}
          onKeyDown={onKeyDown}
          onDoubleClick={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            zoomAt(2, (e.clientX - r.left) * unit, (e.clientY - r.top) * unit);
          }}
        >
          <g transform={`translate(${view.x} ${view.y}) scale(${view.k})`}>{children}</g>

          {placed.pts.map(({ c, sx, sy }) => (
            <g key={c.id} data-city={c.id} className="cursor-pointer">
              <circle cx={sx} cy={sy} r={12 * unit} fill="transparent" />
              <circle
                cx={sx}
                cy={sy}
                r={(selected === c.id ? 7 : 5) * unit}
                fill={c.photo ? "var(--cherry)" : "var(--ink-soft)"}
                stroke="var(--paper)"
                strokeWidth={1.75 * unit}
              />
              <title>{`${c.name}, ${c.countryName}`}</title>
            </g>
          ))}

          {placed.labels.map((l) => (
            <text
              key={l.key}
              x={l.x}
              y={l.y}
              textAnchor={l.anchor}
              fontSize={placed.font}
              className="pointer-events-none font-mono"
              fill="var(--ink)"
              stroke="#f7f2ea"
              strokeWidth={4 * unit}
              paintOrder="stroke"
              strokeLinejoin="round"
            >
              {l.text}
            </text>
          ))}
        </svg>

        {/* Zoom buttons */}
        <div className="absolute bottom-3 right-3 flex flex-col overflow-hidden rounded-[10px] border-[1.5px] border-ink/20 bg-paper shadow-sm">
          <button type="button" onClick={() => zoomAt(1.6)} aria-label="Zoom in" className="grid size-9 place-items-center hover:bg-blush">
            <Plus aria-hidden className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => zoomAt(1 / 1.6)}
            aria-label="Zoom out"
            className="grid size-9 place-items-center border-t border-ink/15 hover:bg-blush"
          >
            <Minus aria-hidden className="size-4" />
          </button>
        </div>

        {/* Photo pop-up */}
        {sel && (
          <div
            role="dialog"
            aria-label={`${sel.c.name}, ${sel.c.countryName}`}
            className="absolute z-10 w-[min(13rem,45%)]"
            style={{
              left: `${(sel.sx / W) * 100}%`,
              top: `${(sel.sy / H) * 100}%`,
              transform: `translate(${sel.sx > W / 2 ? "calc(-100% - 14px)" : "14px"}, ${sel.sy > H / 2 ? "calc(-100% + 24px)" : "-24px"})`,
            }}
          >
            <div className="relative -rotate-2 bg-paper p-2 pb-3 paper-shadow">
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Close photo"
                className="absolute -right-2.5 -top-2.5 z-10 grid size-7 place-items-center rounded-full bg-ink text-paper"
              >
                <X aria-hidden className="size-3.5" />
              </button>
              <div className="relative aspect-[4/3] overflow-hidden bg-bubblegum-soft">
                {sel.c.photo ? (
                  <Image
                    src={sel.c.photo}
                    alt={sel.c.photoAlt ?? `Photo from ${sel.c.name}`}
                    fill
                    sizes="208px"
                    className="object-cover"
                    style={{ objectPosition: sel.c.photoPosition ?? "50% 50%" }}
                  />
                ) : (
                  <span className="absolute inset-0 grid place-items-center font-hand text-xl text-cherry">photo coming soon</span>
                )}
              </div>
              <p className="mt-2 font-hand text-2xl leading-none">{sel.c.name}</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-ink-soft">
                {sel.c.caption ? `${sel.c.caption} · ` : ""}
                {sel.c.countryName}
              </p>
            </div>
          </div>
        )}
      </div>

      <figcaption className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 font-mono text-[11px] uppercase tracking-wider text-ink-soft">
        <span className="flex items-center gap-1.5">
          <span aria-hidden className="size-3 rounded-sm bg-bubblegum" /> Studied abroad
        </span>
        <span className="flex items-center gap-1.5">
          <span aria-hidden className="size-3 rounded-sm bg-bubblegum-soft" /> Visited
        </span>
        <span className="flex items-center gap-1.5">
          <span aria-hidden className="size-2.5 rounded-full bg-cherry" /> Has a photo
        </span>
      </figcaption>

      <dl className="mt-4 grid gap-x-6 gap-y-2 text-[14px] sm:grid-cols-2">
        {byCountry.map(([country, list]) => (
          <div key={country} className="flex gap-2">
            <dt className="shrink-0 font-semibold">{country}</dt>
            <dd className="text-ink-soft">
              {list
                .filter((c) => c.name !== country)
                .map((c, i) => (
                  <span key={c.id}>
                    {i > 0 && ", "}
                    <button
                      type="button"
                      onClick={() => focusCity(c)}
                      className="underline decoration-ink/20 underline-offset-2 hover:text-cherry hover:decoration-cherry"
                    >
                      {c.name}
                    </button>
                  </span>
                ))}
            </dd>
          </div>
        ))}
      </dl>
    </figure>
  );
}
