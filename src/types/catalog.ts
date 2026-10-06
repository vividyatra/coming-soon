/**
 * Catalog models — the CMS/admin-managed content that every listing and
 * detail template renders. Pages never hard-code this data; they read it
 * through `src/lib/catalog.ts`.
 */
import type { IconName } from "@/components/ui/Icon";
import type { Faq, Media } from "./content";

export type Region = "India" | "International";

export type TravelStyleSlug =
  | "family"
  | "couple"
  | "adventure"
  | "cultural"
  | "weekend"
  | "luxury"
  | "spiritual";

export type TravelStyleInfo = {
  slug: TravelStyleSlug;
  title: string;
  subtitle: string;
  icon: IconName;
  image: Media;
};

export type TitledText = { title: string; text: string };
export type IconText = TitledText & { icon: IconName };

/* ---------------------------------------------------------------- */
/* Destinations                                                      */
/* ---------------------------------------------------------------- */

export type SeasonInfo = {
  season: string;
  months: string;
  note: string;
  recommended?: boolean;
};

export type DestinationDetail = {
  slug: string;
  name: string;
  /** Indian state, or country for international destinations */
  state: string;
  region: Region;
  tagline: string;
  shortDescription: string;
  bestFor: string[];
  styles: TravelStyleSlug[];
  image: Media;
  gallery: Media[];
  overview: string[];
  quickFacts: { label: string; value: string }[];
  whyVisit: IconText[];
  topPlaces: { name: string; text: string; image?: Media }[];
  thingsToDo: IconText[];
  bestTime: SeasonInfo[];
  idealDuration: { days: string; text: string };
  tips: string[];
  faqs: Faq[];
  featured?: boolean;
  popular?: boolean;
};

/* ---------------------------------------------------------------- */
/* Tour packages                                                     */
/* ---------------------------------------------------------------- */

export type ItineraryDay = {
  day: number;
  title: string;
  description: string;
  meals?: string;
  stay?: string;
};

export type PriceTier = { label: string; price: number; note: string };

export type PackageCategory = "Heritage" | "Beach" | "Hill Station" | "Wildlife & Nature" | "Pilgrimage" | "International";

export type TourPackageDetail = {
  slug: string;
  title: string;
  destinationSlug: string;
  /** all destinations touched by the itinerary */
  destinations: string[];
  nights: number;
  days: number;
  startingPrice: number;
  originalPrice?: number;
  priceNote: string;
  travelType: string;
  category: PackageCategory;
  styles: TravelStyleSlug[];
  badge?: string;
  rating: number;
  reviews: number;
  image: Media;
  gallery: Media[];
  overview: string[];
  highlights: string[];
  itinerary: ItineraryDay[];
  placesCovered: string[];
  experiences: IconText[];
  inclusions: string[];
  exclusions: string[];
  pricing: PriceTier[];
  importantInfo: string[];
  faqs: Faq[];
  featured?: boolean;
  popular?: boolean;
};

/* ---------------------------------------------------------------- */
/* Sightseeing                                                       */
/* ---------------------------------------------------------------- */

export type SightseeingCategory = "Heritage" | "Spiritual" | "Nature" | "Adventure" | "Culture & Food" | "Landmarks";

export type SightseeingDetail = {
  slug: string;
  name: string;
  destinationSlug: string;
  category: SightseeingCategory;
  shortDescription: string;
  image: Media;
  gallery: Media[];
  overview: string[];
  whyVisit: IconText[];
  highlights: string[];
  thingsToKnow: { label: string; value: string; icon: IconName }[];
  bestTime: string;
  location: { address: string; city: string; state: string; mapQuery: string };
  nearby: string[];
  experiences: IconText[];
  faqs: Faq[];
  duration: string;
  featured?: boolean;
  popular?: boolean;
};

/* ---------------------------------------------------------------- */
/* Offers                                                            */
/* ---------------------------------------------------------------- */

export type OfferKind = "Package Offer" | "Limited Time" | "Coupon" | "Seasonal";

export type OfferDetail = {
  slug: string;
  title: string;
  subtitle: string;
  kind: OfferKind;
  discountLabel: string;
  code?: string;
  validFrom: string;
  validTill: string;
  image: Media;
  description: string[];
  benefits: IconText[];
  applicablePackages: string[];
  howToClaim: string[];
  terms: string[];
  faqs: Faq[];
  featured?: boolean;
};

/* ---------------------------------------------------------------- */
/* Blogs                                                             */
/* ---------------------------------------------------------------- */

export type BlogCategory = "Destination Guides" | "Travel Tips" | "Itineraries" | "Food & Culture" | "Spiritual Travel" | "Budget Travel";

export type ContentBlock =
  | { type: "h2"; text: string; id: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "image"; image: Media; caption?: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "tip"; title: string; text: string };

export type Author = { name: string; role: string; avatar: Media; bio: string };

export type BlogArticle = {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  destinationSlugs: string[];
  packageSlugs: string[];
  author: Author;
  date: string;
  readTime: string;
  image: Media;
  keyTakeaways: string[];
  content: ContentBlock[];
  faqs: Faq[];
  featured?: boolean;
  popular?: boolean;
};

/* ---------------------------------------------------------------- */
/* FAQ, legal, gallery                                               */
/* ---------------------------------------------------------------- */

export type FaqGroup = { slug: string; title: string; icon: IconName; items: Faq[] };

export type LegalPage = {
  slug: string;
  title: string;
  summary: string;
  updated: string;
  sections: { id: string; title: string; body: string[]; list?: string[] }[];
};

export type GalleryPhoto = {
  id: string;
  caption: string;
  location: string;
  category: "Destinations" | "Experiences" | "Customer Moments";
  shape: "tall" | "wide" | "square";
  image: Media;
  credit?: string;
};

/* ---------------------------------------------------------------- */
/* Customer account (front-end mock until the backend exists)        */
/* ---------------------------------------------------------------- */

export type BookingStatus = "Confirmed" | "Pending Payment" | "Completed" | "Cancelled";
export type EnquiryStatus = "New" | "In Discussion" | "Quote Sent" | "Converted" | "Closed";

export type Booking = {
  id: string;
  packageSlug: string;
  status: BookingStatus;
  bookedOn: string;
  travelDate: string;
  returnDate: string;
  travellers: { adults: number; children: number };
  amount: number;
  paid: number;
  travellerNames: string[];
};

export type Enquiry = {
  id: string;
  destination: string;
  status: EnquiryStatus;
  createdOn: string;
  travelMonth: string;
  travellers: string;
  budget: string;
  message: string;
  followUps: { date: string; by: string; note: string }[];
};

export type Customer = {
  name: string;
  email: string;
  phone: string;
  city: string;
  memberSince: string;
  avatar: Media;
  preferences: { styles: TravelStyleSlug[]; budget: string; newsletter: boolean };
  savedPackages: string[];
};
