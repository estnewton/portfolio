import { FileDown, Mail } from "lucide-react";
import { site } from "@/content/site";
import { ContactForm } from "./ContactForm";
import { Card, SectionHeader } from "./ui";

const linkRow =
  "flex items-center gap-3 rounded-md px-2 py-2 transition hover:bg-bubblegum-soft [&_svg]:size-5 [&_svg]:shrink-0 [&_svg]:text-cherry";

export function ContactSection() {
  return (
    <>
      <SectionHeader id="section-title" kicker="05 · Contact" title="Say hi" note="my inbox is open :)" />
      <div className="grid gap-8 md:grid-cols-[1fr_260px]">
        <Card>
          <ContactForm />
        </Card>
        <div className="space-y-4">
          <p className="font-hand text-2xl leading-tight text-pen">or reach me directly:</p>
          <ul className="space-y-1 text-[15px]">
            <li>
              <a href={`mailto:${site.email}`} className={linkRow}>
                <Mail aria-hidden /> {site.email}
              </a>
            </li>
            {site.linkedin && (
              <li>
                <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className={linkRow}>
                  <svg aria-hidden viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4V21H3V9.5Zm6.5 0h3.8v1.6h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.2c0-1.24-.02-2.84-1.73-2.84-1.73 0-2 1.35-2 2.75V21h-4V9.5Z" />
                  </svg>
                  LinkedIn
                </a>
              </li>
            )}
            <li>
              <a href={site.resume} download className={linkRow}>
                <FileDown aria-hidden /> Download my resume
              </a>
            </li>
          </ul>
          <p className="rounded-md bg-ink px-3 py-2 text-[14px] text-paper">{site.seeking}</p>
        </div>
      </div>
    </>
  );
}
