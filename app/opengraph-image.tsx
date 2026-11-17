import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/content/site";

// The preview image shown when the site is shared on LinkedIn, iMessage, Slack, etc.
// Generated once at build time.

export const alt = `${site.name}: ${site.headline.before} ${site.headline.highlight}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const fontDir = join(process.cwd(), "node_modules/@fontsource");
const serif = readFile(join(fontDir, "instrument-serif/files/instrument-serif-latin-400-normal.woff"));
const serifItalic = readFile(join(fontDir, "instrument-serif/files/instrument-serif-latin-400-italic.woff"));
const mono = readFile(join(fontDir, "dm-mono/files/dm-mono-latin-400-normal.woff"));

const C = {
  blush: "#f4eee4",
  ink: "#1e1b18",
  inkSoft: "#5b524a",
  cherry: "#8a1c2b",
  bubblegum: "#f37fb0",
  pink: "#fbd3e3",
  paper: "#fffdf8",
  cork: "#c39062",
  frame: "#9b6a41",
};

export default async function Image() {
  const card = (label: string, rotate: number, bg: string, top: number, left: number) => (
    <div
      style={{
        position: "absolute",
        top,
        left,
        width: 150,
        height: 130,
        background: bg,
        transform: `rotate(${rotate}deg)`,
        boxShadow: "0 10px 20px rgba(60,32,12,0.35)",
        display: "flex",
        alignItems: "flex-end",
        padding: 14,
        fontFamily: "DM Mono",
        fontSize: 16,
        letterSpacing: 2,
        color: C.cherry,
      }}
    >
      {label}
    </div>
  );

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: C.blush, padding: 56 }}>
        {/* left: editorial headline */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 640 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: `1.5px solid ${C.cherry}`,
              paddingBottom: 10,
              fontFamily: "DM Mono",
              fontSize: 18,
              letterSpacing: 3,
              color: C.cherry,
            }}
          >
            <span>{site.name.toUpperCase()}</span>
            <span>PORTFOLIO</span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", fontFamily: "Instrument Serif", fontSize: 92, lineHeight: 0.95, color: C.ink }}>
            {site.headline.before.split(" ").map((w) => (
              <span key={w} style={{ marginRight: 22 }}>
                {w}
              </span>
            ))}
            <span style={{ fontStyle: "italic", color: C.cherry }}>{site.headline.highlight}</span>
            <span>{site.headline.after}</span>
          </div>
          <div style={{ display: "flex", fontFamily: "DM Mono", fontSize: 20, letterSpacing: 1.5, color: C.inkSoft }}>
            INDUSTRIAL ENGINEERING @ PENN STATE · 2× AWS
          </div>
        </div>

        {/* right: framed cork board with pinned cards */}
        <div
          style={{
            display: "flex",
            marginLeft: 48,
            flex: 1,
            background: C.frame,
            borderRadius: 14,
            padding: 12,
          }}
        >
          <div style={{ display: "flex", position: "relative", flex: 1, background: C.cork, borderRadius: 6 }}>
            {card("PROJECTS", -4, C.paper, 40, 30)}
            {card("EXPERIENCE", 5, C.pink, 80, 196)}
            {card("HIGHLIGHTS", 3, C.paper, 250, 40)}
            {card("CONTACT", -5, C.bubblegum, 290, 200)}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Instrument Serif", data: await serif, style: "normal", weight: 400 },
        { name: "Instrument Serif", data: await serifItalic, style: "italic", weight: 400 },
        { name: "DM Mono", data: await mono, style: "normal", weight: 400 },
      ],
    },
  );
}
