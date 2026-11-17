const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2025-05" → "May 2025" */
export function formatMonth(ym: string) {
  const [y, m] = ym.split("-").map(Number);
  return `${MONTHS[(m || 1) - 1]} ${y}`;
}

/** "May 2025 – Aug 2025", "Aug 2026 – Present", or an explicit label. */
export function formatRange(start: string, end: string | null, label?: string) {
  if (label) return label;
  const s = formatMonth(start);
  if (end === null) return `${s} – Present`;
  const e = formatMonth(end);
  // Same year: "May – Aug 2025"
  if (start.slice(0, 4) === end.slice(0, 4)) return `${s.split(" ")[0]} – ${e}`;
  return `${s} – ${e}`;
}
