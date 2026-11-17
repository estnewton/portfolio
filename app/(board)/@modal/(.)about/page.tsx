import { SlideOver } from "@/components/ui/SlideOver";
import { AboutSection } from "@/components/sections/AboutSection";

export default function Page() {
  return (
    <SlideOver href="/about">
      <AboutSection />
    </SlideOver>
  );
}
