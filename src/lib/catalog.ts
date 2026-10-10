/**
 * Catalog data-access layer.
 *
 * Pages read FAQ and legal content through these async functions. They
 * currently resolve static data from `src/data/catalog`; once the admin panel
 * and database exist, replace the bodies with DB/API queries - the page
 * templates stay unchanged.
 */
import { faqGroups } from "@/data/catalog/faqs";
import { legalPages } from "@/data/catalog/legal";

const bySlug = <T extends { slug: string }>(list: T[], slug: string) => list.find((item) => item.slug === slug);

/* ---------------- shared ---------------- */

export async function getFaqGroups() {
  return faqGroups;
}
export async function getFaqGroup(slug: string) {
  return bySlug(faqGroups, slug);
}
export async function getLegalPage(slug: string) {
  return bySlug(legalPages, slug);
}
export async function getLegalPages() {
  return legalPages;
}
