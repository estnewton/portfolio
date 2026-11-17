import { SlideOver } from "@/components/ui/SlideOver";
import { ProjectsSection } from "@/components/sections/ProjectsSection";

export default function Page() {
  return (
    <SlideOver href="/projects">
      <ProjectsSection />
    </SlideOver>
  );
}
