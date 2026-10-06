import type { Feature } from "@/types/content";
import { routes } from "./site";
import { hero, heroStats } from "./home";

/* Content of the Destinations page — ported from the original destinations.html */

export const destinationsHero = {
  titleLines: hero.titleLines,
  titleScript: hero.titleScript,
  image: hero.image,
  primaryCta: { label: "Explore Destinations", href: "#popular-destinations" },
  secondaryCta: { label: "Plan Your Trip", href: routes.planTrip },
  stats: heroStats,
};

export const travelFeatures: Feature[] = [
  { icon: "map", title: "Custom Travel", description: "Made for you" },
  { icon: "priceTag", title: "Best Price Guarantee", description: "Value you can trust" },
  { icon: "headset", title: "24/7 Support", description: "We are with you" },
  { icon: "secure", title: "Safe & Secure", description: "Your safety, our priority" },
];
