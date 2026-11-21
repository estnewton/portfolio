const iconBtn =
  "grid size-11 place-items-center rounded-[12px] border-[1.5px] border-ink/25 bg-paper/80 text-ink-soft transition hover:-translate-y-0.5 hover:border-ink/50 hover:bg-paper hover:text-ink";

/**
 * Icon link. If the URL isn't set yet in content/site.ts it's hidden on the live site,
 * and shown dashed while running locally so you remember to add it.
 */
export function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  if (!href) {
    if (process.env.NODE_ENV !== "development") return null;
    return (
      <li>
        <span title={`Add your ${label} URL in content/site.ts`} className={`${iconBtn} cursor-help border-dashed opacity-60`}>
          {children}
        </span>
      </li>
    );
  }
  const external = href.startsWith("http");
  return (
    <li>
      <a
        href={href}
        aria-label={label}
        className={iconBtn}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    </li>
  );
}

export function GitHubIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.4-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

export function LinkedInIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4V21H3V9.5Zm6.5 0h3.8v1.6h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.2c0-1.24-.02-2.84-1.73-2.84-1.73 0-2 1.35-2 2.75V21h-4V9.5Z" />
    </svg>
  );
}
