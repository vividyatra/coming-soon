import type { MetadataRoute } from "next";
import { routes } from "@/data/site";
import { absoluteUrl } from "@/lib/seo";

const lastModified = new Date("2026-10-09");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl(routes.home), lastModified, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl(routes.about), lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl(routes.contact), lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl(routes.faq), lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl(routes.privacy), lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl(routes.terms), lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}
