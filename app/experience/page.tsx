import type { Metadata } from "next";
import { SectionShell } from "@/components/sections/SectionShell";
import { ExperienceSection } from "@/components/sections/ExperienceSection";

export const metadata: Metadata = {
  title: "Experience",
  description: "Esther Newton's experience: two AWS internships (SDE, SWE + PM), research, VALLEY Magazine and more.",
};

export default function Page() {
  return (
    <SectionShell current="experience">
      <ExperienceSection />
    </SectionShell>
  );
}
