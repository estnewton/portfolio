import type { Metadata } from "next";
import { SectionShell } from "@/components/sections/SectionShell";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Esther Newton about Summer 2027 PM and SWE internships.",
};

export default function Page() {
  return (
    <SectionShell current="contact">
      <ContactSection />
    </SectionShell>
  );
}
