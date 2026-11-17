// Building blocks for the "cutting-mat studio" section pages:
// clean bold sans headings, mono labels, blue-pen annotations, white cards with ink borders.

export function SectionHeader({
  kicker,
  title,
  note,
  id,
}: {
  kicker: string;
  title: string;
  note?: string;
  id?: string;
}) {
  return (
    <div className="mb-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-cherry">{kicker}</p>
      <div className="mt-2 flex flex-wrap items-end gap-x-4 gap-y-1">
        <h1 id={id} className="font-display text-[clamp(2.4rem,5vw,3.75rem)] font-extrabold leading-none tracking-[-0.035em]">
          {title}
        </h1>
        {note && <p className="-rotate-2 pb-1 font-hand text-2xl text-pen">{note}</p>}
      </div>
    </div>
  );
}

export function SubHeading({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2 id={id} className="mb-4 flex items-center gap-3 font-display text-xl font-extrabold tracking-tight">
      {children}
      <span aria-hidden className="h-px flex-1 bg-ink/15" />
    </h2>
  );
}

export function Card({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "section" | "li";
}) {
  return (
    <Tag className={`rounded-[10px] border-[1.5px] border-ink bg-paper p-5 shadow-[4px_4px_0_var(--ink)] ${className}`}>
      {children}
    </Tag>
  );
}

export function Tag({ children, tone = "pink" }: { children: React.ReactNode; tone?: "pink" | "ink" | "blue" }) {
  const tones = {
    pink: "bg-bubblegum-soft text-cherry",
    ink: "bg-ink text-paper",
    blue: "bg-[#e3e8fb] text-pen",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider ${tones[tone]}`}>
      {children}
    </span>
  );
}

export function Todo({ text }: { text: string }) {
  // Placeholder text starting with "TODO" renders in a muted dashed style so it's obvious what to fill in.
  if (!text.startsWith("TODO")) return <>{text}</>;
  return (
    <span className="rounded border border-dashed border-ink/30 bg-ink/[0.03] px-1.5 italic text-ink-soft">{text}</span>
  );
}
