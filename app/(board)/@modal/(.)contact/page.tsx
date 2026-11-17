import { SlideOver } from "@/components/ui/SlideOver";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Page() {
  return (
    <SlideOver href="/contact">
      <ContactSection />
    </SlideOver>
  );
}
