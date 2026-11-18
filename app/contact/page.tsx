import type { Metadata } from "next";
import { SectionShell } from "@/components/sections/SectionShell";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Esther Newton about product, strategy, and operations internships and full-time roles.",
};

export default function Page() {
  return (
    <SectionShell current="contact">
      <ContactSection />
    </SectionShell>
  );
}
