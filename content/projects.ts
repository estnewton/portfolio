import { site } from "@/content/site";
import type { Project } from "@/lib/types";

// Edit me: each project gets its own case-study page at /projects/<slug>.
// Anything starting with "TODO" is a placeholder for you to replace.

export const projects: Project[] = [
  {
    slug: "slate",
    title: "Slate",
    tagline: "An optimized task scheduler that turns a to-do list into a realistic day.",
    when: "June 2026",
    status: "building",
    tags: ["Product", "Python", "React", "Streamlit", "Figma"],
    problem:
      "To-do lists treat every task the same. Students juggling classes, work, and deadlines end up with a long list and no realistic plan for the day, so urgent work slips while easy tasks get done first.",
    role: "Product lead and builder: research, product definition, design, and engineering.",
    process: [
      "Ran user research on how students plan their days and where their to-do lists break down.",
      "Turned the findings into a prioritized feature roadmap and specs, centered on urgency-aware task ranking.",
      "Designed the experience in Figma, then built it with Python, React, and Streamlit.",
      "Validated the ranking logic with 9 unit tests.",
    ],
    outcome:
      "Led end-to-end product definition for Slate, from user research to a prioritized roadmap and specs for urgency-aware task ranking, validated with 9 unit tests. The code is on my GitHub.",
    links: [{ label: "View on GitHub", href: site.github }],
  },

  {
    slug: "she-builds",
    title: "She Builds",
    tagline: "K–12 outreach that gets young students, especially girls, excited about building.",
    when: "TODO",
    status: "ongoing",
    tags: ["K–12 Outreach", "Community", "Instagram"],
    problem: "TODO: Which students lacked access to STEAM exposure, and why?",
    role: "TODO: Your role (founder? lead?) and the team around you.",
    process: [
      "TODO: How you designed the program and found schools.",
      "TODO: How the Instagram supports it.",
    ],
    outcome: "TODO: Students reached, sessions run, followers, testimonials.",
    // TODO: add the Instagram link, e.g. { label: "Instagram", href: "https://instagram.com/<handle>" }
    links: [],
  },
  {
    slug: "train-over-plane",
    title: "Train Over Plane",
    tagline: "A sustainable travel guide for study abroad students.",
    when: "2026",
    status: "shipped",
    tags: ["Sustainability", "Travel", "Content"],
    problem:
      "Study abroad students default to budget flights for weekend trips, even when a train is cheaper, center to center, and far lower in emissions. The information they need to plan by rail is scattered across apps, sites, and languages, so flying feels easier.",
    role: "Product Manager",
    process: [
      "Researched rail routes, travel times, and ticketing in France and Italy, focusing on the trips Penn State students actually take.",
      "Grouped routes into simple regional loops (the Riviera, the Alps, Paris and beyond; Northern Italy and the heart of Italy) with travel times, booking tips, and student deals like the Zou! Études pass.",
      "Designed a one-page guide for each country with a clear \"why train > plane\" pitch and QR codes to route planners, published with Penn State Global Sustainability.",
    ],
    outcome: "Promoting sustainable travel for Penn State students while they study abroad.",
    links: [],
    gallery: [
      {
        src: "/images/projects/france-by-train.webp",
        alt: "France by Train guide: rail routes and times for the Riviera, the Alps, and Paris and beyond, with ticket tips and a QR code to plan routes.",
      },
      {
        src: "/images/projects/italy-by-train.webp",
        alt: "Italy by Train guide: routes for the Northern Loop and the heart of Italy, top train lines, and reasons to choose the train over a plane.",
      },
    ],
  },
  {
    slug: "undergraduate-research",
    title: "Undergraduate Research",
    tagline:
      "Two Penn State labs: sustainable structural design at the DREAM Structures Lab, and AI that spots laser-welding defects in XCT scans.",
    when: "2025–2026",
    status: "research",
    tags: ["Research", "Engineering", "Simulation", "AI"],
    problem:
      "How do you design structures that perform well while using fewer resources? And how do you catch tiny welding defects without someone combing through every scan by hand? My research has tackled both: optimizing structural design for sustainability, and automating defect detection in X-ray CT (XCT) data.",
    role: "Research & Development Engineer",
    process: [],
    parts: [
      {
        name: "DREAM Structures Lab",
        about:
          "Design Resilient Engineered Autonomous and Multifunctional structures, led by Dr. Mariantonieta Gutierrez Soto in Penn State's School of Engineering Design and Innovation.",
        when: "1 year",
        focus: "Sustainable solutions and design optimization",
        bullets: [
          "Ran 100+ simulation iterations in MATLAB and ENVI-met across 5+ structural design configurations.",
          "Summarized the results into actionable insights on which designs performed best.",
        ],
        link: { label: "About the lab", href: "https://sotostructures.com/about/" },
      },
      {
        name: "Dr. Jingli's Lab",
        focus: "AI for laser-welding inspection",
        bullets: [
          "Built an AI-powered pipeline that detects and identifies laser welding errors in XCT data.",
          "Cut analysis time 74% compared with manual inspection.",
        ],
      },
    ],
    outcome:
      "100+ simulation iterations across 5+ structural design configurations, and an AI pipeline that finds laser-welding errors in XCT data 74% faster than manual analysis.",
    links: [],
  },

];
