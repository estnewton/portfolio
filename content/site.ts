// Edit me: the basics that show up across the whole site.

export const site = {
  name: "Esther Newton",
  firstName: "Esther",
  // Your site's address, used for link previews and the sitemap.
  // Set NEXT_PUBLIC_SITE_URL in Vercel once your custom domain is connected (e.g. https://esthernewton.com).
  // Until then it uses your Vercel address automatically.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  title: "Esther Newton · Product + Engineering",
  description:
    "Industrial Engineering student at Penn State and 2× AWS intern heading into product management. Projects, experience, and the occasional sticker.",
  kicker: ["Product", "Engineering", "Systems", "Operations", "Strategy"],
  // Home page hero: the small red line above your name, and the facts line under it.
  role: "Product · Engineering · Operations",
  facts: ["Industrial Engineering @ Penn State '28", "2× AWS intern", "First-gen"],
  headline: { before: "From whiteboard to", highlight: "shipped", after: "." },
  intro:
    "I'm a first-generation Industrial Engineering student at Penn State, fueled by ambition, community, purpose, and impact. I'm curious about how things work, and how they could work better. Let's connect and create what's next.",
  seeking: "Open to Summer and Fall 2027 internships and 2028 full-time roles in product, strategy, and operations",
  email: "esthernewton32@gmail.com",
  // Each icon stays hidden on the live site if its URL is empty.
  linkedin: "https://www.linkedin.com/in/esthernewton/",
  github: "https://github.com/estnewton",
  // Drop your resume at /public/resume.pdf
  resume: "/resume.pdf",
};

// The home page is one long scroll; these are its sections, in order, as linked from the top bar.
// desktopOnly: hidden from the bar on phones (the draggable board needs a mouse and a big screen).
export const homeSections: { id: string; label: string; desktopOnly?: boolean }[] = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "honors", label: "Honors" },
  { id: "board", label: "Board", desktopOnly: true },
  { id: "connect", label: "Connect" },
];

// Standalone section pages (also open as slide-over panels from the board's cards).
export const sections = [
  { id: "projects", label: "Projects", href: "/projects" },
  { id: "experience", label: "Experience", href: "/experience" },
  { id: "highlights", label: "Honors & Affiliations", href: "/highlights" },
  { id: "about", label: "About", href: "/about" },
  { id: "contact", label: "Contact", href: "/contact" },
] as const;
