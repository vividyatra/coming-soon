/**
 * Data access layer for the public site.
 *
 * Every page/section reads content through these async functions only.
 * Today they return the static files in `src/data`; when the admin panel
 * and database are added, swap the bodies for DB/API calls — components
 * stay untouched.
 */
import * as home from "@/data/home";
import * as about from "@/data/about";
import * as destinationsPage from "@/data/destinations";
import * as blog from "@/data/blog";
import * as planner from "@/data/planner";

export async function getHeroContent() {
  return { hero: home.hero, stats: home.heroStats, categories: home.heroCategories };
}

export async function getPopularDestinations() {
  return home.destinations;
}

export async function getFeaturedPackages() {
  return home.featuredPackages;
}

export async function getWhyChoose() {
  return home.whyChoose;
}

export async function getTravelStyles() {
  return home.travelStyles;
}

export async function getFeaturedSightseeing() {
  return home.sightseeing;
}

export async function getActiveOffers() {
  return home.offers;
}

export async function getProcessSteps() {
  return home.processSteps;
}

export async function getLatestBlogs(limit = 3) {
  return home.latestBlogs.slice(0, limit);
}

export async function getTestimonials() {
  return home.testimonials;
}

export async function getGallery() {
  return { categories: [...home.galleryCategories], items: home.gallery };
}

export async function getFaqs() {
  return home.faqs;
}

/* ---------------- About ---------------- */

export async function getAboutPage() {
  return {
    hero: about.aboutHero,
    story: about.aboutStory,
    stats: about.aboutStats,
    values: about.aboutValues,
    team: about.aboutTeam,
    intro: about.aboutIntro,
    visionMission: about.aboutVisionMission,
    whyUs: about.aboutWhyUs,
    approach: about.aboutApproach,
    difference: about.aboutDifference,
    expertise: about.aboutExpertise,
    promise: about.aboutPromise,
    testimonials: home.testimonials,
  };
}

/* ---------------- Destinations ---------------- */

export async function getDestinationsPage() {
  return {
    hero: destinationsPage.destinationsHero,
    features: destinationsPage.travelFeatures,
  };
}

/* ---------------- Blog ---------------- */

export async function getBlogPage() {
  return { cta: blog.blogCta };
}

/* ---------------- Contact / Trip Planner ---------------- */

export async function getPlannerPage() {
  return {
    hero: planner.plannerHero,
    steps: planner.plannerSteps,
    options: planner.plannerOptions,
    success: planner.plannerSuccess,
    why: planner.plannerWhy,
    testimonials: home.testimonials,
  };
}
