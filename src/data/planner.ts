import type { Category } from "@/types/content";

/* Content of the Plan Your Trip page — built on the original Trip Planner design. */

export const plannerHero = {
  title: "Trip Planner",
  subtitle: "Your dream trip, perfectly planned",
  highlight: "step by step.",
};

export const plannerSteps = ["Where to?", "When?", "Travellers", "Preferences", "Contact"];

export const plannerOptions = {
  tripTypes: ["Family holiday", "Honeymoon / Couple", "Friends’ trip", "Solo trip", "Group / Corporate", "Pilgrimage"],
  adults: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"],
  children: ["0", "1", "2", "3", "4", "5+"],
  budget: ["Under ₹25,000 per person", "₹25,000 – ₹50,000 per person", "₹50,000 – ₹1,00,000 per person", "Above ₹1,00,000 per person", "Not sure yet"],
  experiences: ["Heritage & forts", "Nature & hills", "Beaches", "Adventure", "Wildlife", "Spiritual", "Food & culture", "Luxury stays", "Shopping", "Wellness & spa"],
};

export const plannerSuccess = {
  title: "Thank you! Your travel request has been received.",
  text: "A Vivid Yatra travel specialist will call you within 24 hours with ideas and a draft itinerary.",
  next: ["We review your request and shortlist the best options", "Your specialist calls to understand your preferences", "You receive a day-by-day itinerary and quote on email & WhatsApp"],
};

/* "\n" marks the line break used in the original design */
export const plannerWhy: Category[] = [
  { icon: "itinerary", title: "Personalized\nItineraries", subtitle: "Just for you" },
  { icon: "expert", title: "Expert Guidance", subtitle: "From travel specialists" },
  { icon: "saveMoney", title: "Save Time & Money", subtitle: "Best plans for you" },
  { icon: "stressFree", title: "Stress Free\nPlanning", subtitle: "We handle it all" },
];
