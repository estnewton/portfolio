// Shared content types. Every content file in /content is typed against these,
// so TypeScript will tell you if you forget a field (like alt text).

export type Link = { label: string; href: string };

export type Image = {
  src: string;
  /** Required: describe the image for screen readers. */
  alt: string;
};

export type ProjectPart = {
  name: string;
  /** Short line under the name, e.g. what the lab studies. */
  about?: string;
  when?: string;
  focus: string;
  bullets: string[];
  link?: Link;
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  /** e.g. "2026" or "2025–present" */
  when: string;
  status?: "building" | "shipped" | "ongoing" | "research";
  tags: string[];
  problem: string;
  role: string;
  process: string[];
  outcome: string;
  links: Link[];
  cover?: Image;
  /** Separate labs, teams or phases inside one case study, each shown as its own card. */
  parts?: ProjectPart[];
  /** Finished work (graphics, screenshots) shown under "the work". */
  gallery?: Image[];
};

export type Experience = {
  id: string;
  org: string;
  role: string;
  location?: string;
  /** "YYYY-MM" */
  start: string;
  /** "YYYY-MM", or null for "present" */
  end: string | null;
  /** Optional override for the date text, e.g. "Spring 2026" */
  dateLabel?: string;
  summary?: string;
  bullets: string[];
  tags?: string[];
};

export type Highlight = {
  id: string;
  title: string;
  detail: string;
  year?: string;
  kind: "badge" | "polaroid";
  /** Short text shown inside a badge, e.g. "MLT" or "15+" */
  mark: string;
  image?: Image;
};

export type Pos = { x: number; y: number; r: number };

export type BoardItemKind = "avatar" | "section" | "currently" | "sticker";

export type BoardItemSpec = {
  id: string;
  kind: BoardItemKind;
  /** Accessible name for the item. */
  label: string;
  /** Approximate rendered size in px (used for tidy-up and keeping items on the board). */
  w: number;
  h: number;
  /** Starting position as fractions of the board (0–1) and rotation in degrees. */
  start: Pos;
};
