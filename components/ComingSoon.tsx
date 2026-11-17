import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Tape } from "@/components/decor/Decor";

// Temporary page used until each section is built in phase 2.
export function ComingSoon({ title }: { title: string }) {
  return (
    <main id="main" className="mat-bg grid min-h-dvh place-items-center p-6">
      <div className="relative w-full max-w-md -rotate-1 bg-paper p-8 paper-shadow">
        <Tape className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2" />
        <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-cherry">Phase 2</p>
        <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight">{title}</h1>
        <p className="mt-3 font-hand text-2xl text-pen">this page is still on the cutting mat…</p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 rounded-full border-[1.5px] border-ink px-4 py-2 text-sm font-medium hover:bg-bubblegum-soft"
        >
          <ArrowLeft aria-hidden className="size-4" /> Back to the board
        </Link>
      </div>
    </main>
  );
}
