import type { Metadata } from "next";
import { SectionShell } from "@/components/sections/SectionShell";
import { HighlightsSection } from "@/components/sections/HighlightsSection";

export const metadata: Metadata = {
  title: "Highlights",
  description: "Awards and highlights: MLT Career Prep Fellow, Millennium Scholar, NCWIT Rising Star and more.",
};

export default function Page() {
  return (
    <SectionShell current="highlights">
      <HighlightsSection />
    </SectionShell>
  );
}
