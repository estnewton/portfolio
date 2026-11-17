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
        className="board-bg min-h-dvh lg:grid lg:h-dvh lg:min-h-[760px] lg:grid-cols-[minmax(400px,36%)_1fr] lg:overflow-hidden"
      >
        <Hero toolbar={<BoardToolbar />} />

        {/* Desktop: draggable board */}
        <div className="hidden p-6 pl-2 lg:block">
          <Board />
        </div>

        {/* Mobile + tablet: scrollable stack */}
        <div className="lg:hidden">
          <MobileStack />
        </div>
      </main>
    </BoardProvider>
  );
}
