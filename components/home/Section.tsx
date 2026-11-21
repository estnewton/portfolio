/** One section of the home page: big serif title over a thin rule, with an optional handwritten aside. */
export function Section({
  id,
  title,
  note,
  wide = false,
  className = "",
  children,
}: {
  id: string;
  title: string;
  note?: string;
  wide?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`scroll-mt-16 py-16 sm:py-20 ${className}`}>
      <div className={`mx-auto px-4 sm:px-8 ${wide ? "max-w-6xl" : "max-w-5xl"}`}>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-x-4 gap-y-1 border-b border-ink/15 pb-4">
          <h2 id={`${id}-title`} className="font-serif text-[clamp(2.25rem,4.5vw,3.25rem)] leading-none tracking-[-0.01em]">
            {title}
          </h2>
          {note && <p className="-rotate-2 font-hand text-2xl leading-none text-pen">{note}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
