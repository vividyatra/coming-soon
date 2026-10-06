import type { TeamMember, Category } from "@/types/content";
import { heroStats } from "./home";

/* Content of the About Us page — ported 1:1 from the original about.html */

export const aboutHero = {
  title: "About Us",
  lines: ["We don’t just plan trips,", "we create stories", "you’ll cherish forever."],
  smallPhoto: { src: "/images/about-hero-left.png", alt: "Alpine lake framed by pine forest" },
  largePhoto: { src: "/images/about-right-man.png", alt: "Traveller with a backpack looking over a mountain valley" },
  compass: { src: "/images/compass-icon.png", alt: "" },
};

export const aboutStory = {
  title: "Our Story",
  text: "Vivid Yatra was born out of a simple belief that travel has the power to transform lives. We craft travel experiences that blend adventure and cultural immersion to bring you closer to yourself and the places you’ve always dreamed of.",
  image: { src: "/images/hero-banner.jpg", alt: "Traveller resting above a mountain lake" },
  cta: { label: "Know More About Us", href: "#what-drives-us" },
};

/* same numbers as the home hero, shown without icons */
export const aboutStats = heroStats.map(({ value, label }) => ({ value, label }));

export const aboutValues: Category[] = [
  { icon: "passion", title: "Passion", subtitle: "For Exploration" },
  { icon: "commitment", title: "Commitment", subtitle: "To Quality" },
  { icon: "honest", title: "Honest", subtitle: "In Service" },
  { icon: "planet", title: "Responsibility", subtitle: "For our planet" },
];

export const aboutTeam: { titleLines: string[]; members: TeamMember[] } = {
  titleLines: ["Meet the Explorers Behind", "Your Next Journey"],
  members: [
    { name: "Arjun Krishnan", role: "Co-Founder", photo: { src: "/images/32.png", alt: "Arjun Krishnan" } },
    { name: "Meera Sharma", role: "Travel Curator", photo: { src: "/images/44.png", alt: "Meera Sharma" } },
    { name: "Raghav Bansal", role: "Operations Head", photo: { src: "/images/75.png", alt: "Raghav Bansal" } },
    { name: "Sneha Iyer", role: "Experience Designer", photo: { src: "/images/68.png", alt: "Sneha Iyer" } },
  ],
};

/* ---------------- sections added for the full About page ---------------- */

export const aboutIntro = {
  eyebrow: "About Vivid Yatra",
  title: "A travel company built around people, not packages",
  paragraphs: [
    "Vivid Yatra is a New Delhi–based travel company that designs private, thoughtfully paced journeys across India and a handful of international favourites. For more than ten years we have helped families, couples and friends discover places the way they deserve to be discovered — slowly, comfortably and with a local by their side.",
    "Every itinerary is planned by a specialist who has travelled the route, supported by trusted hotels, drivers and guides we have worked with for years.",
  ],
  highlights: ["Private, fully customisable trips", "Travel specialists who have been there", "Transparent, all-inclusive pricing", "24/7 support from a real person"],
};

export const aboutVisionMission = [
  {
    icon: "compass" as const,
    label: "Our Vision",
    title: "To make meaningful travel effortless for every Indian traveller.",
    text: "We imagine a world where planning a trip is as joyful as taking it — where every traveller can explore with confidence, curiosity and care for the places they visit.",
  },
  {
    icon: "route" as const,
    label: "Our Mission",
    title: "Design journeys that feel personal, honest and unforgettable.",
    text: "We listen first, plan with local expertise, price transparently and stay with you from the first call to the last day of your trip.",
  },
];

export const aboutWhyUs = [
  { icon: "sparkle" as const, title: "Handpicked experiences", text: "Every hotel, guide and activity is personally vetted by our team." },
  { icon: "rupee" as const, title: "Transparent pricing", text: "Clear inclusions and no hidden charges — what you see is what you pay." },
  { icon: "route" as const, title: "Truly personalised", text: "Itineraries shaped around your pace, interests and budget." },
  { icon: "localGuide" as const, title: "Local expertise", text: "On-ground partners in every destination we sell." },
  { icon: "headset" as const, title: "24/7 trip support", text: "One trip manager plus round-the-clock help while you travel." },
  { icon: "shieldCheck" as const, title: "Safe & secure", text: "Verified partners, secure payments and clear policies." },
];

export const aboutApproach = [
  { icon: "chat" as const, title: "We listen", text: "A relaxed call to understand who’s travelling, what you love and what you’d rather skip." },
  { icon: "map" as const, title: "We design", text: "A day-by-day draft itinerary with hotel options and honest advice on pace and season." },
  { icon: "edit" as const, title: "We refine", text: "We fine-tune until it feels right — change hotels, add days, swap experiences." },
  { icon: "suitcase" as const, title: "You travel, we support", text: "Vouchers, driver details and a trip manager on WhatsApp throughout your journey." },
];

export const aboutDifference = {
  columns: ["Typical online booking", "Travelling with Vivid Yatra"],
  rows: [
    ["One-size-fits-all packages", "Itineraries designed around you"],
    ["Call centres and ticket numbers", "One dedicated trip manager"],
    ["Hidden fees at checkout", "Clear, all-inclusive quotes"],
    ["Hotels chosen by algorithm", "Hotels our team has stayed in"],
    ["Support ends at payment", "24/7 support until you’re home"],
  ],
};

export const aboutExpertise = [
  { title: "Royal Rajasthan", text: "Forts, palaces, heritage hotels and desert camps.", image: { src: "/images/india/jaipur-amer-fort.jpg", alt: "Amer Fort, Jaipur" }, href: "/destinations/jaipur" },
  { title: "Himalayan Adventures", text: "Ladakh road trips, Manali snow and Kashmir valleys.", image: { src: "/images/india/ladakh-road.jpg", alt: "Road through Ladakh" }, href: "/destinations/leh-ladakh" },
  { title: "Honeymoons", text: "Udaipur lakes, Kerala houseboats and island escapes.", image: { src: "/images/india/udaipur-city-palace.jpg", alt: "Udaipur City Palace" }, href: "/tour-packages?style=couple" },
  { title: "Spiritual Journeys", text: "Varanasi, Amritsar and the great temple towns.", image: { src: "/images/india/varanasi-aarti.jpg", alt: "Ganga aarti" }, href: "/tour-packages?style=spiritual" },
  { title: "Kerala & the South", text: "Backwaters, tea hills, Mysore and Hampi.", image: { src: "/images/india/kerala-backwaters.jpg", alt: "Kerala backwaters" }, href: "/destinations/kerala" },
  { title: "International Escapes", text: "Switzerland, Bali, Maldives and Dubai.", image: { src: "/images/switzerland.jpg", alt: "Swiss Alps" }, href: "/destinations?region=International#explore" },
];

export const aboutPromise = {
  quote: "We measure success by one thing — whether you come home wanting to travel with us again.",
  cite: "Arjun Krishnan, Co-Founder",
  promises: [
    { icon: "clock" as const, title: "Reply within 24 hours", text: "Every enquiry gets a personal response." },
    { icon: "receipt" as const, title: "No hidden costs", text: "Detailed quotes before you pay a rupee." },
    { icon: "calendar" as const, title: "Flexible changes", text: "One free date change up to 21 days before travel." },
    { icon: "heart" as const, title: "Feedback that matters", text: "We call after every trip — and act on what you say." },
  ],
};
