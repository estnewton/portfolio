import type { Metadata } from "next";
import { SectionShell } from "@/components/sections/SectionShell";
import { ProjectsSection } from "@/components/sections/ProjectsSection";

export const metadata: Metadata = {
  title: "Projects",
  description: "Case studies from Esther Newton: Slate, In The Know, Train Over Plane, and research at Penn State's DREAM Structures Lab.",
};

export default function Page() {
  return (
    <SectionShell current="projects">
      <ProjectsSection />
    </SectionShell>
  );
}
