// The homepage board. Section links clicked from here open in a slide-over panel
// (the @modal slot) instead of leaving the board; the URL still changes, so the
// back button closes the panel and a refresh shows the full section page.

export default function BoardLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
