import type { TravelStyleInfo } from "@/types/catalog";
import { india } from "./media";

export const travelStyleCatalog: TravelStyleInfo[] = [
  { slug: "family", title: "Family", subtitle: "Easy, fun trips for all ages", icon: "family", image: india("goa-beach", "Palm-fringed beach in Goa") },
  { slug: "couple", title: "Couple / Honeymoon", subtitle: "Romantic stays & moments", icon: "couple", image: india("udaipur-city-palace", "City Palace across Lake Pichola, Udaipur") },
  { slug: "adventure", title: "Adventure", subtitle: "For the thrill seekers", icon: "adventure", image: india("ladakh-road", "Biker on a Himalayan highway in Ladakh") },
  { slug: "cultural", title: "Cultural", subtitle: "Heritage, food & traditions", icon: "culture", image: india("jaipur-amer-fort", "Amer Fort ramparts, Jaipur") },
  { slug: "weekend", title: "Weekend", subtitle: "Short breaks, big memories", icon: "weekend", image: india("shimla-hills", "Hillside town of Shimla") },
  { slug: "luxury", title: "Luxury / Premium", subtitle: "For the fine explorers", icon: "luxury", image: india("mysore-palace-night", "Illuminated Mysore Palace") },
  { slug: "spiritual", title: "Spiritual", subtitle: "Temples, retreats & calm", icon: "spiritual", image: india("varanasi-aarti", "Ganga aarti ceremony in Varanasi") },
];
