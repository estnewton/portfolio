import type { Metadata } from "next";
import { Bagel_Fat_One, Caveat, DM_Mono, DM_Sans, Inter_Tight } from "next/font/google";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { site } from "@/content/site";
import "./globals.css";

const interTight = Inter_Tight({ variable: "--font-inter-tight", subsets: ["latin"] });
const dmSans = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"] });
const dmMono = DM_Mono({ variable: "--font-dm-mono", subsets: ["latin"], weight: ["400", "500"] });
const caveat = Caveat({ variable: "--font-caveat", subsets: ["latin"] });
const bagel = Bagel_Fat_One({ variable: "--font-bagel", subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s · ${site.name}` },
  description: site.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${dmSans.variable} ${dmMono.variable} ${caveat.variable} ${bagel.variable} antialiased`}
    >
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-paper focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
