/**
 * Catalog data-access layer.
 *
 * Every listing/detail template reads through these async functions. They
 * currently resolve static data from `src/data/catalog`; once the admin panel
 * and database exist, replace the bodies with DB/API queries — the page
 * templates stay unchanged.
 */
import { destinationCatalog } from "@/data/catalog/destinations";
import { packageCatalog } from "@/data/catalog/packages";
import { sightseeingCatalog } from "@/data/catalog/sightseeing";
import { offerCatalog } from "@/data/catalog/offers";
import { blogCatalog } from "@/data/catalog/blogs";
import { travelStyleCatalog } from "@/data/catalog/styles";
import { faqGroups } from "@/data/catalog/faqs";
import { legalPages } from "@/data/catalog/legal";
import { galleryPhotos } from "@/data/catalog/gallery";
import { demoBookings, demoCustomer, demoEnquiries } from "@/data/catalog/account";
import type { DestinationDetail, TourPackageDetail, TravelStyleSlug } from "@/types/catalog";

const bySlug = <T extends { slug: string }>(list: T[], slug: string) => list.find((item) => item.slug === slug);
const pick = <T extends { slug: string }>(list: T[], slugs: string[]) =>
  slugs.map((slug) => bySlug(list, slug)).filter((item): item is T => Boolean(item));

/* ---------------- destinations ---------------- */

export type DestinationCardData = DestinationDetail & { packagesCount: number };

const withCount = (d: DestinationDetail): DestinationCardData => ({
  ...d,
  packagesCount: packageCatalog.filter((p) => p.destinations.includes(d.slug)).length,
});

export async function getDestinations() {
  return destinationCatalog.map(withCount);
}
export async function getDestination(slug: string) {
  const d = bySlug(destinationCatalog, slug);
  return d ? withCount(d) : undefined;
}
export async function getDestinationSlugs() {
  return destinationCatalog.map((d) => d.slug);
}
export async function getDestinationsByState() {
  const groups = new Map<string, DestinationCardData[]>();
  for (const d of destinationCatalog.filter((x) => x.region === "India")) {
    groups.set(d.state, [...(groups.get(d.state) ?? []), withCount(d)]);
  }
  return [...groups.entries()].map(([state, items]) => ({ state, items }));
}
export async function getRelatedDestinations(slug: string, limit = 4) {
  const d = bySlug(destinationCatalog, slug);
  if (!d) return [];
  return destinationCatalog
    .filter((x) => x.slug !== slug)
    .map((x) => ({ x, score: (x.state === d.state ? 3 : 0) + (x.region === d.region ? 1 : 0) + x.styles.filter((s) => d.styles.includes(s)).length }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ x }) => withCount(x));
}

/* ---------------- packages ---------------- */

export async function getPackages() {
  return packageCatalog;
}
export async function getPackage(slug: string) {
  return bySlug(packageCatalog, slug);
}
export async function getPackageSlugs() {
  return packageCatalog.map((p) => p.slug);
}
export async function getPackagesForDestination(slug: string) {
  return packageCatalog.filter((p) => p.destinations.includes(slug));
}
export async function getPackagesBySlugs(slugs: string[]) {
  return pick(packageCatalog, slugs);
}
export async function getPackagesByStyle(style: TravelStyleSlug) {
  return packageCatalog.filter((p) => p.styles.includes(style));
}
export async function getRelatedPackages(pkg: TourPackageDetail, limit = 3) {
  return packageCatalog
    .filter((p) => p.slug !== pkg.slug)
    .map((p) => ({ p, score: (p.destinationSlug === pkg.destinationSlug ? 3 : 0) + (p.category === pkg.category ? 2 : 0) + p.styles.filter((s) => pkg.styles.includes(s)).length }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ p }) => p);
}

/* ---------------- sightseeing ---------------- */

export async function getSightseeing() {
  return sightseeingCatalog;
}
export async function getSight(slug: string) {
  return bySlug(sightseeingCatalog, slug);
}
export async function getSightSlugs() {
  return sightseeingCatalog.map((s) => s.slug);
}
export async function getSightsForDestination(slug: string) {
  return sightseeingCatalog.filter((s) => s.destinationSlug === slug);
}
export async function getSightsBySlugs(slugs: string[]) {
  return pick(sightseeingCatalog, slugs);
}

/* ---------------- offers ---------------- */

export async function getOffers() {
  return offerCatalog;
}
export async function getOffer(slug: string) {
  return bySlug(offerCatalog, slug);
}
export async function getOfferSlugs() {
  return offerCatalog.map((o) => o.slug);
}
export async function getOffersForPackage(slug: string) {
  return offerCatalog.filter((o) => o.applicablePackages.includes(slug));
}

/* ---------------- blogs ---------------- */

export async function getBlogs() {
  return blogCatalog;
}
export async function getBlog(slug: string) {
  return bySlug(blogCatalog, slug);
}
export async function getBlogSlugs() {
  return blogCatalog.map((b) => b.slug);
}
export async function getBlogsForDestination(slug: string) {
  return blogCatalog.filter((b) => b.destinationSlugs.includes(slug));
}
export async function getBlogsForPackage(slug: string) {
  return blogCatalog.filter((b) => b.packageSlugs.includes(slug));
}
export async function getRelatedBlogs(slug: string, limit = 3) {
  const blog = bySlug(blogCatalog, slug);
  if (!blog) return [];
  return blogCatalog
    .filter((b) => b.slug !== slug)
    .map((b) => ({ b, score: (b.category === blog.category ? 2 : 0) + b.destinationSlugs.filter((d) => blog.destinationSlugs.includes(d)).length }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ b }) => b);
}

/* ---------------- shared ---------------- */

export async function getTravelStyles() {
  return travelStyleCatalog;
}
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
export async function getGalleryPhotos() {
  return galleryPhotos;
}

/* ---------------- customer account (demo) ---------------- */

export async function getCustomer() {
  return demoCustomer;
}
export async function getBookings() {
  return demoBookings.map((b) => ({ ...b, pkg: bySlug(packageCatalog, b.packageSlug) }));
}
export async function getBooking(id: string) {
  const b = demoBookings.find((x) => x.id === id);
  return b ? { ...b, pkg: bySlug(packageCatalog, b.packageSlug) } : undefined;
}
export async function getEnquiries() {
  return demoEnquiries;
}
