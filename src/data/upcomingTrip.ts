import { site } from "@/data/site";

/**
 * Upcoming trip shown in the site-wide popup - the single place to edit trip details.
 * Set `enabled: false` to hide the popup. It also hides itself once `date` (IST) has passed.
 */
export const upcomingTrip = {
  enabled: true,
  title: "Jaipur - Heritage & Royal Escape",
  destination: "Jaipur",
  duration: "2 Nights / 3 Days",
  theme: ["Forts", "Palaces", "Culture", "Shopping", "Royal Experiences"],
  /** Trip date, YYYY-MM-DD (India time). */
  date: "2026-10-20",
  dateLabel: "20 October 2026",
  boardingPoint: "Chandigarh",
  priceLabel: "₹15,999",
  originalPriceLabel: "₹21,999" as string | null,
  priceNote: "per person",
  earlyBird: { enabled: true, text: "Early birds get discounted price" },
  inclusions: [
    "AC Volvo / Urbania",
    "2 Nights Hotel Stay",
    "2 Breakfasts",
    "2 Dinners",
    "Forts & Palaces Entry Fees",
    "Monument Entry Fees",
    "Jaipur Sightseeing",
  ],
  highlights: ["Amer Fort", "Hawa Mahal", "City Palace", "Jal Mahal", "Nahargarh Fort", "Jaigarh Fort"],
  alsoCovered: [
    "Jantar Mantar",
    "Albert Hall",
    "Birla Mandir",
    "Kesar Baag",
    "Patrika Gate",
    "Jaipur Markets",
    "Chokhi Dhani (Rajasthani Cultural Experience)",
  ],
  trustPoints: [] as string[],
  tagline: "Explore · Experience · Evolve",
  /** Optional local image; set to null to show no image. */
  image: { src: "/images/india/jaipur-amer-fort.jpg", alt: "Amer Fort, Jaipur" } as { src: string; alt: string } | null,
  whatsappMessage:
    "Hi Vivid Yatra! I'm interested in the Jaipur Heritage & Royal Escape trip (2N/3D) on 20 October from Chandigarh at ₹15,999 per person. Please share the details and booking process.",
};

export function upcomingTripWhatsappHref(): string {
  return `${site.contact.whatsappHref}?text=${encodeURIComponent(upcomingTrip.whatsappMessage)}`;
}

/** True until the end of the trip date in IST (UTC+5:30). */
export function isUpcomingTripActive(now: Date = new Date()): boolean {
  if (!upcomingTrip.enabled) return false;
  const endIst = new Date(`${upcomingTrip.date}T23:59:59.999+05:30`);
  return now.getTime() <= endIst.getTime();
}