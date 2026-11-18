import type { Experience } from "@/lib/types";

// Edit me: newest first. Dates are "YYYY-MM"; use end: null for "present".

export const experience: Experience[] = [
  {
    id: "penn-state-global",
    org: "Penn State Global",
    role: "Study Abroad Peer Advisor",
    location: "University Park, PA",
    start: "2026-08",
    end: null,
    bullets: [
      "Analyzed user stories and advising data from 40+ students I advised to define and prioritize sustainability and DEI initiatives, then led the campaign reaching 700+ students.",
      "Shifted outreach to freshmen after advising data showed they asked the most general questions, hosting pop-ups in first-year dorms and pitching a study abroad course-matching search engine.",
    ],
  },
  {
    id: "aws-2026",
    org: "Amazon Web Services",
    role: "Software Engineer + Product Manager Intern",
    location: "Seattle, WA",
    start: "2026-05",
    end: "2026-08",
    bullets: [
      "Authored a PRD and led user research to drive a new optimized triage system across 4+ engineering teams.",
      "Built and shipped a triage layer inside AWS's internal critical incident platform, taking it from proof of concept to production: backlog down 43%, response time down 32%.",
      "Mapped the as-is incident workflow and applied 8D root cause analysis to design the target-state process, eliminating major recurring failures.",
      "Standardized a manual provisioning process, reducing setup time 13% and creating repeatable documentation.",
      "Presented and defended the product design and quantified outcomes to AWS leadership.",
    ],
    tags: ["PM", "SWE", "Operations"],
  },
  {
    id: "cea-capa",
    org: "CEA CAPA",
    role: "Social Media Management Intern",
    start: "2026-01",
    end: "2026-05",
    dateLabel: "Spring 2026",
    bullets: [
      "Independently managed the full production pipeline, from concept and scripting through filming, editing, and publishing.",
    ],
  },
  {
    id: "afe-ambassador",
    org: "Amazon Future Engineer",
    role: "Ambassador & Pod Facilitator",
    location: "Remote · Part-time",
    start: "2025-08",
    end: null,
    bullets: [
      "Represent Amazon Future Engineer's mission to expand computer science access for underrepresented students.",
      "Mentor younger students in my pod, helping them earn return offers at a Fortune 500 company.",
      "Attended AFROTECH Conference 2025 fully funded, landing 3–4 interviews through recruiter outreach.",
    ],
    tags: ["Mentorship", "Community"],
  },
  {
    id: "valley",
    org: "VALLEY Magazine, Penn State",
    role: "Finance Director",
    location: "University Park, PA",
    start: "2025-07",
    end: "2026-04",
    bullets: [
      "Grew annual revenue 36%, the org's largest on record, by conducting competitive analysis and building a financial business case and cost models to redesign sponsorship pricing across 5+ campaigns.",
    ],
    tags: ["Strategy"],
  },
  {
    id: "aws-2025",
    org: "Amazon Web Services",
    role: "Software Development Engineer Intern",
    location: "Seattle, WA",
    start: "2025-05",
    end: "2025-08",
    bullets: [
      "Cut incident detection and debugging time nearly 40% across 12+ orgs by identifying fragmented cloud observability as the core pain point and launching a centralized monitoring solution.",
      "Raised capacity-planning accuracy 14% and cut manual estimation by managing the rollout of an ML-powered AWS SageMaker forecasting workflow.",
      "Synthesized requirements from 4 senior managers across cross-functional teams into a phased launch plan.",
    ],
    tags: ["SDE"],
  },
  {
    id: "dream-lab",
    org: "DREAM Structures Lab, Penn State",
    role: "Engineering Undergraduate Researcher",
    location: "University Park, PA",
    start: "2025-02",
    end: "2026-08",
    bullets: [
      "Ran 100+ simulation iterations in MATLAB and ENVI-met across 5+ structural design configurations, then summarized findings into actionable insights.",
      "Built an AI-powered pipeline that detects and identifies laser welding errors in XCT data, 74% faster than manual analysis.",
    ],
    tags: ["Research"],
  },
];
