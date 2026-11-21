// Edit me: the "Currently" sticky note on the homepage.
// Keep each line short (under ~40 characters) so it fits the note.
//
// book: the cover shown next to "reading". Covers come from Open Library, looked up by ISBN
// (the barcode number on the back of the book, or search the title at openlibrary.org).

export const currently: {
  updated: string;
  items: { label: string; text: string }[];
  book?: { title: string; author: string; isbn: string };
} = {
  updated: "Nov 2026",
  items: [
    { label: "building", text: "AI tools" },
    { label: "reading", text: "The Inner Game of Tennis" },
    { label: "learning", text: "French" },
  ],
  book: { title: "The Inner Game of Tennis", author: "W. Timothy Gallwey", isbn: "9780679778318" },
};

export const bookCover = (isbn: string) => `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;
