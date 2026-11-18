import type { Metadata } from "next";
import { SectionShell } from "@/components/sections/SectionShell";
import { HighlightsSection } from "@/components/sections/HighlightsSection";

export const metadata: Metadata = {
  title: "Honors & Affiliations",
  description: "Honors and affiliations: Amazon Future Engineer Scholar, SEO Career, MLT Career Prep, Millennium Scholar, NCWIT Rising Star and more.",
};

export default function Page() {
  return (
    <SectionShell current="highlights">
      <HighlightsSection />
    </SectionShell>
  );
}
