import type { Metadata } from "next";
import { SectionShell } from "@/components/sections/SectionShell";
import { AboutSection } from "@/components/sections/AboutSection";

export const metadata: Metadata = {
  title: "About",
  description: "About Esther Newton: Industrial Engineering at Penn State, heading into product management. Skills, travel, and what she's looking for.",
};

export default function Page() {
  return (
    <SectionShell current="about">
      <AboutSection />
    </SectionShell>
  );
}
