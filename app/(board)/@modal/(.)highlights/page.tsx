import { SlideOver } from "@/components/ui/SlideOver";
import { HighlightsSection } from "@/components/sections/HighlightsSection";

export default function Page() {
  return (
    <SlideOver href="/highlights">
      <HighlightsSection />
    </SlideOver>
  );
}
