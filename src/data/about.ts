import type { TeamMember, Category } from "@/types/content";
import { site } from "./site";
import { heroStats } from "./home";
import { india } from "./catalog/media";

/*
 * About page content. Honesty rule: no invented years, traveller counts,
 * awards, partner names or team members — add real details when available.
 */

export const aboutHero = {
  title: "About Vivid Yatra",
  /** keyword line rendered inside the h1, under the title */
  kicker: "Travel planners in Solan, Himachal Pradesh",
  lines: ["We don’t just plan trips,", "we create stories", "you’ll cherish forever."],
  smallPhoto: { src: "/images/about-hero-left.jpg", alt: "Alpine lake framed by pine forest" },
  largePhoto: { src: "/images/about-right-man.jpg", alt: "Traveller with a backpack looking over a mountain valley" },
  compass: { src: "/images/compass-icon.png", alt: "" },
};

export const aboutStory = {
  title: "Our Story",
  text: "Vivid Yatra began with a simple belief: travel should feel personal, not packaged. From the hills of Solan, we plan trips the way we would want to travel ourselves — at the right pace, with honest advice and room for the moments that make a journey memorable.",
  image: { src: "/images/hero-banner.jpg", alt: "Traveller with a backpack looking out over a mountain lake" },
  cta: { label: "What We Believe", href: "#what-drives-us" },
};

/* same facts as the home hero, shown without icons */
export const aboutStats = heroStats.map(({ value, label }) => ({ value, label }));

export const aboutValues: Category[] = [
  { icon: "passion", title: "Passion", subtitle: "For exploration" },
  { icon: "commitment", title: "Commitment", subtitle: "To quality" },
  { icon: "honest", title: "Honesty", subtitle: "In every quote" },
  { icon: "planet", title: "Responsibility", subtitle: "For our planet" },
];

/* Team profiles are intentionally empty — the section stays hidden until real names, roles and photos are added. */
export const aboutTeam: { titleLines: string[]; members: TeamMember[] } = {
  titleLines: ["Meet the Team Behind", "Your Next Journey"],
  members: [],
};

/* ---------------- sections added for the full About page ---------------- */

export const aboutIntro = {
  eyebrow: "About Vivid Yatra",
  title: "A Solan-based travel company built around people, not packages",
  paragraphs: [
    `${site.name} is a travel planning company run by ${site.legalName} from Solan, Himachal Pradesh. We design customised tours, holiday packages and weekend getaways across India for families, couples, friends, groups and companies.`,
    "We start with a conversation, not a catalogue. Tell us how you like to travel and we plan the route, stays, transport and experiences — then share everything in a clear written quote, so you know exactly what you are paying for.",
  ],
  highlights: ["Customised tours across India", "Based in Solan, Himachal Pradesh", "Clear, written quotes", "Support before and during your trip"],
  badge: { script: "Rooted in Himachal", text: "Planning journeys across India from our home base in Solan." },
  image: india("manali-mountains", "Snow-capped peaks and pine forests near Manali, Himachal Pradesh"),
};

export const aboutVisionMission = [
  {
    icon: "compass" as const,
    label: "Our Vision",
    title: "To make meaningful travel across India effortless for every traveller.",
    text: "We imagine a world where planning a trip is as joyful as taking it — where every traveller can explore with confidence, curiosity and care for the places they visit.",
  },
  {
    icon: "route" as const,
    label: "Our Mission",
    title: "Plan journeys that feel personal, honest and unforgettable.",
    text: "We listen first, plan with local knowledge, quote clearly in writing and stay in touch from the first call to the last day of your trip.",
  },
];

export const aboutWhyUs = [
  { icon: "sparkle" as const, title: "Thoughtfully chosen stays", text: "Hotels and homestays suggested to match your style, budget and pace." },
  { icon: "rupee" as const, title: "Clear pricing", text: "Detailed written quotes that list what is and isn’t included." },
  { icon: "route" as const, title: "Truly personalised", text: "Itineraries shaped around your pace, interests and budget." },
  { icon: "localGuide" as const, title: "Local knowledge", text: "Practical know-how of hill roads, seasons and regional travel." },
  { icon: "headset" as const, title: "Support on your trip", text: "One point of contact, reachable by phone or WhatsApp while you travel." },
  { icon: "shieldCheck" as const, title: "Clear policies", text: "Booking, payment and cancellation terms shared in writing with every quote." },
];

export const aboutApproach = [
  { icon: "chat" as const, title: "We listen", text: "A relaxed travel consultation to understand who’s travelling, what you love and what you’d rather skip." },
  { icon: "map" as const, title: "We plan", text: "A day-by-day draft itinerary with stay options and honest advice on pace and season." },
  { icon: "edit" as const, title: "We refine", text: "We fine-tune until it feels right — change hotels, add days, swap experiences." },
  { icon: "suitcase" as const, title: "You travel, we support", text: "Confirmations, driver details and a planner on WhatsApp throughout your journey." },
];

export const aboutDifference = {
  columns: ["Typical online booking", "Travelling with Vivid Yatra"],
  rows: [
    ["One-size-fits-all packages", "Itineraries designed around you"],
    ["Call centres and ticket numbers", "One planner who knows your trip"],
    ["Unclear inclusions", "Written quotes with clear inclusions"],
    ["Hotels picked from a long list", "Stays suggested to match your style"],
    ["Support ends at payment", "Help available while you travel"],
  ],
};

export const aboutExpertise = [
  { title: "Himachal & Weekend Getaways", text: "Shimla, Manali, Kasauli and Chail — short breaks and longer hill holidays.", image: india("shimla-hills", "Houses spread across the green hills of Shimla"), href: "/contact" },
  { title: "Adventure Travel", text: "Ladakh road trips, snow treks and high-altitude journeys.", image: india("ladakh-road", "Biker on an open Himalayan highway in Ladakh"), href: "/contact" },
  { title: "Honeymoon Packages", text: "Kashmir houseboats, Udaipur’s lakes and Kerala’s backwaters.", image: india("udaipur-city-palace", "City Palace rising above Lake Pichola, Udaipur"), href: "/contact" },
  { title: "Cultural Travel", text: "Varanasi, Amritsar, Rajasthan’s forts and India’s great temple towns.", image: india("varanasi-aarti", "Ganga aarti ceremony in Varanasi"), href: "/contact" },
  { title: "Family Holidays & Group Tours", text: "Easy-paced trips for families, friends, clubs and societies.", image: india("kerala-houseboat", "Houseboat cruising the Kerala backwaters"), href: "/contact" },
  { title: "Corporate & Luxury Travel", text: "Team offsites, business trips and heritage or boutique stays.", image: india("jaipur-amer-fort", "Amer Fort ramparts and courtyards in Jaipur"), href: "/contact" },
];

export const aboutPromise = {
  quote: "We measure success by one thing — whether you come home wanting to travel with us again.",
  cite: "The Vivid Yatra team",
  promises: [
    { icon: "clock" as const, title: "A personal reply", text: "We aim to answer every enquiry within 24 hours." },
    { icon: "receipt" as const, title: "No hidden costs", text: "Detailed written quotes before you pay a rupee." },
    { icon: "calendar" as const, title: "Help with changes", text: "We rework plans with you and explain any supplier charges upfront." },
    { icon: "heart" as const, title: "Feedback that matters", text: "We ask how your trip went — and act on what you say." },
  ],
};
