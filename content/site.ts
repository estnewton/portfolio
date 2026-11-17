// Edit me: the basics that show up across the whole site.

export const site = {
  name: "Esther Newton",
  firstName: "esther",
  // TODO: change to your real domain once it's connected in Vercel.
  url: "https://esthernewton.com",
  title: "Esther Newton · Product + Engineering",
  description:
    "Industrial Engineering student at Penn State and 2× AWS intern heading into product management. Projects, experience, and the occasional sticker.",
  kicker: ["Product", "Engineering", "Systems"],
  headline: { before: "I make complicated things feel", highlight: "simple", after: "." },
  intro:
    "Industrial Engineering @ Penn State ('28). Two AWS internships, SDE in 2025 and SWE + PM in 2026. Now heading into product management.",
  seeking: "Seeking Summer 2027 PM / SWE internships",
  location: "State College, PA",
  email: "esthernewton32@gmail.com",
  // TODO: paste your LinkedIn URL. The LinkedIn button stays hidden until this is set.
  linkedin: "",
  // Drop your resume at /public/resume.pdf
  resume: "/resume.pdf",
};

export const sections = [
  { id: "projects", label: "Projects", href: "/projects" },
  { id: "experience", label: "Experience", href: "/experience" },
  { id: "highlights", label: "Highlights", href: "/highlights" },
  { id: "about", label: "About", href: "/about" },
  { id: "contact", label: "Contact", href: "/contact" },
] as const;
