import type { Metadata } from "next";
import { SectionShell } from "@/components/sections/SectionShell";
import { ProjectsSection } from "@/components/sections/ProjectsSection";

export const metadata: Metadata = {
  title: "Projects",
  description: "Case studies from Esther Newton: Slate, She Builds, Train Over Plane, and undergraduate research at Penn State.",
};

export default function Page() {
  return (
    <SectionShell current="projects">
      <ProjectsSection />
    </SectionShell>
  );
}
