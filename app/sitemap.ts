import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { sections, site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, priority: 1 },
    ...sections.map((s) => ({ url: `${site.url}${s.href}`, priority: 0.8 })),
    ...projects.filter((p) => !p.comingSoon).map((p) => ({ url: `${site.url}/projects/${p.slug}`, priority: 0.7 })),
  ];
}
