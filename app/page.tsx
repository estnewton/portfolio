import { Board } from "@/components/board/Board";
import { BoardProvider } from "@/components/board/BoardProvider";
import { BoardToolbar } from "@/components/board/BoardToolbar";
import { Hero } from "@/components/Hero";
import { MobileStack } from "@/components/MobileStack";

export default function Home() {
  return (
    <BoardProvider>
      <main
        id="main"
        className="blush-paper min-h-dvh lg:grid lg:h-dvh lg:min-h-[760px] lg:grid-cols-[minmax(420px,37%)_1fr] lg:overflow-hidden"
      >
        <Hero toolbar={<BoardToolbar />} />

        {/* Desktop: draggable cork board in a wood frame */}
        <div className="hidden py-6 pr-6 lg:block">
          <div className="cork-frame h-full rounded-[14px] p-3">
            <div className="cork-bg h-full rounded-[6px]">
              <Board />
            </div>
          </div>
        </div>

        {/* Mobile + tablet: scrollable stack on cork */}
        <div className="cork-bg lg:hidden">
          <MobileStack />
        </div>
      </main>
    </BoardProvider>
  );
}
