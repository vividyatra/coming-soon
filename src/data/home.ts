import type {
  BlogPost,
  Category,
  Destination,
  Faq,
  Feature,
  GalleryItem,
  Offer,
  ProcessStep,
  Sightseeing,
  Stat,
  Testimonial,
  TourPackage,
  TravelStyle,
} from "@/types/content";
import { routes, site } from "./site";
import { india } from "./catalog/media";

/*
 * Home page content — domestic India travel, planned from Solan, Himachal Pradesh.
 * Honesty rule: no invented numbers, prices, ratings, reviews or awards.
 * Anything that needs a real figure (prices, reviews) stays empty until provided.
 */

/* --------------------------------------------------------------
   HERO
   -------------------------------------------------------------- */
export const hero = {
  /** keyword line rendered inside the h1, above the brand headline */
  eyebrow: "Travel Planning & Holiday Packages in India",
  titleLines: ["Every Destination.", "Every Experience."],
  titleScript: "A New You.",
  /** "What is Vivid Yatra" summary — shown under the headline */
  summaryLead: site.name,
  summary:
    "is a travel planning company in Solan, Himachal Pradesh, creating customised holidays, tour packages and weekend getaways across India for families, couples, groups and teams.",
  image: { src: "/images/hero-banner.jpg", alt: "Traveller with a backpack looking out over a mountain lake" },
  primaryCta: { label: "Explore Destinations", href: "#destinations-title" },
  secondaryCta: { label: "Plan Your Trip", href: routes.contact },
  categoriesCta: { label: "View all travel styles", href: "#travel-styles" },
};

/* Facts only — no traveller counts, years or satisfaction scores. */
export const heroStats: Stat[] = [
  { icon: "globe", value: "Pan-India", label: "Destinations across India" },
  { icon: "suitcase", value: "18", label: "Travel services" },
  { icon: "chat", value: "1:1", label: "Personal trip planning" },
  { icon: "pin", value: "Solan", label: "Himachal home base" },
];

export const heroCategories: Category[] = [
  { icon: "adventure", title: "Adventure Travel", subtitle: "Snow, treks & road trips" },
  { icon: "family", title: "Family Holidays", subtitle: "Easy pace for all ages" },
  { icon: "culture", title: "Cultural Travel", subtitle: "Heritage, food & festivals" },
  { icon: "luxury", title: "Luxury Travel", subtitle: "Boutique & palace stays" },
];

/* --------------------------------------------------------------
   POPULAR DESTINATIONS (India)
   -------------------------------------------------------------- */
export const destinations: Destination[] = [
  {
    slug: "shimla",
    name: "Shimla",
    tagline: "Himachal Pradesh",
    description: "Mall Road walks, the heritage toy train and pine-clad hills, an easy drive from Solan.",
    image: india("shimla-hills", "Houses spread across the green hills of Shimla"),
  },
  {
    slug: "manali",
    name: "Manali",
    tagline: "Himachal Pradesh",
    description: "Snow-capped peaks, apple orchards and adventure in the Kullu Valley.",
    image: india("manali-mountains", "Snow-capped peaks and pine forests near Manali"),
  },
  {
    slug: "ladakh",
    name: "Ladakh",
    tagline: "High Himalaya",
    description: "High passes, monasteries and unforgettable road journeys.",
    image: india("ladakh-road", "Road winding through the mountains of Ladakh"),
  },
  {
    slug: "kashmir",
    name: "Kashmir",
    tagline: "Jammu & Kashmir",
    description: "Shikara rides on Dal Lake and meadows in Gulmarg and Pahalgam.",
    image: india("kashmir-dal-lake", "Houseboats on Dal Lake with snowy mountains behind"),
  },
  {
    slug: "rajasthan",
    name: "Rajasthan",
    tagline: "Jaipur · Udaipur · Jaisalmer",
    description: "Forts, palaces, desert camps and royal heritage stays.",
    image: india("jaipur-amer-fort", "Amer Fort ramparts and courtyards in Jaipur"),
  },
  {
    slug: "kerala",
    name: "Kerala",
    tagline: "God’s Own Country",
    description: "Backwater houseboats, tea hills and slow coastal days.",
    image: india("kerala-backwaters", "Houseboat on the Kerala backwaters under coconut palms"),
  },
  {
    slug: "goa",
    name: "Goa",
    tagline: "West Coast",
    description: "Beaches, Portuguese-era churches and laid-back breaks by the sea.",
    image: india("goa-beach", "Palm-fringed beach in Goa"),
  },
];

/* --------------------------------------------------------------
   HOLIDAY & TOUR PACKAGES — sample itineraries, priced only on request
   -------------------------------------------------------------- */
export const featuredPackages: TourPackage[] = [
  {
    slug: "shimla-manali-family-holiday",
    title: "Shimla & Manali Hill Holiday",
    destination: "Himachal Pradesh",
    duration: "5N / 6D",
    priceNote: "Quoted for your dates & group",
    highlights: ["Mall Road and Kufri in Shimla", "Solang Valley snow and adventure", "Private vehicle with driver"],
    badge: "Family Holidays",
    image: india("manali-mountains", "Snow-capped peaks above Manali in the Kullu Valley"),
  },
  {
    slug: "kashmir-honeymoon",
    title: "Kashmir Honeymoon Escape",
    destination: "Jammu & Kashmir",
    duration: "5N / 6D",
    priceNote: "Quoted for your dates & group",
    highlights: ["Houseboat stay on Dal Lake", "Gulmarg and Pahalgam day trips", "Sunset shikara ride"],
    badge: "Honeymoon",
    image: india("kashmir-dal-lake", "Houseboats moored on Dal Lake in Srinagar"),
  },
  {
    slug: "ladakh-road-trip",
    title: "Ladakh Adventure Road Trip",
    destination: "Ladakh",
    duration: "6N / 7D",
    priceNote: "Quoted for your dates & group",
    highlights: ["Rest days in Leh to acclimatise", "Nubra Valley and Pangong Lake", "Private vehicle with local driver"],
    badge: "Adventure",
    image: india("ladakh-road", "Biker on an open Himalayan highway in Ladakh"),
  },
  {
    slug: "royal-rajasthan",
    title: "Royal Rajasthan Heritage Tour",
    destination: "Rajasthan",
    duration: "6N / 7D",
    priceNote: "Quoted for your dates & group",
    highlights: ["Jaipur, Udaipur and Jaisalmer", "Heritage hotel options", "Desert camp evening"],
    badge: "Cultural",
    image: india("udaipur-city-palace", "City Palace rising above Lake Pichola, Udaipur"),
  },
];

/* --------------------------------------------------------------
   WHY CHOOSE
   -------------------------------------------------------------- */
export const whyChoose: Feature[] = [
  { icon: "route", title: "Customized tours", description: "Every itinerary is shaped around your dates, pace, interests and budget." },
  { icon: "localGuide", title: "Himachal home base", description: "Based in Solan, we know the hill roads, seasons and stays of the region well." },
  { icon: "receipt", title: "Clear written quotes", description: "Inclusions, exclusions and cancellation terms are shared in writing before you pay." },
  { icon: "chat", title: "One point of contact", description: "The same planner looks after your trip from the first call to your return." },
  { icon: "headset", title: "Help while you travel", description: "Reach us on phone or WhatsApp if plans need to change on the road." },
];

/* --------------------------------------------------------------
   TRAVEL STYLES
   -------------------------------------------------------------- */
export const travelStyles: TravelStyle[] = [
  { slug: "family", icon: "family", title: "Family Holidays", subtitle: "Easy-paced trips for all ages", image: india("kerala-houseboat", "Traditional houseboat on the Kerala backwaters") },
  { slug: "honeymoon", icon: "couple", title: "Honeymoon Packages", subtitle: "Romantic stays, relaxed pace", image: india("kashmir-dal-lake", "Dal Lake houseboats in Kashmir") },
  { slug: "adventure", icon: "adventure", title: "Adventure Travel", subtitle: "Snow treks & mountain roads", image: india("himachal-snow-trek", "Trekkers on a snowy ridge in Himachal Pradesh") },
  { slug: "cultural", icon: "culture", title: "Cultural Travel", subtitle: "Heritage, food & festivals", image: india("varanasi-aarti", "Priests performing the Ganga aarti in Varanasi") },
  { slug: "weekend", icon: "weekend", title: "Weekend Getaways", subtitle: "Short breaks near Solan", image: india("shimla-hills", "Hillside town of Shimla") },
  { slug: "luxury", icon: "luxury", title: "Luxury Travel", subtitle: "Palace & boutique stays", image: india("udaipur-city-palace", "City Palace of Udaipur rising above Lake Pichola") },
  { slug: "group", icon: "users", title: "Group Tours", subtitle: "Friends, families & clubs", image: india("ladakh-road", "Road through the Ladakh mountains") },
];

/* --------------------------------------------------------------
   DESTINATION EXPERIENCES
   -------------------------------------------------------------- */
export const sightseeing: Sightseeing[] = [
  {
    slug: "shikara-dal-lake",
    name: "Shikara Ride on Dal Lake",
    destination: "Srinagar, Kashmir",
    info: "Glide past houseboats and floating gardens in a wooden shikara — loveliest in the soft light of early morning or sunset.",
    image: india("kashmir-dal-lake", "Houseboats on Dal Lake with snowy mountains behind"),
  },
  {
    slug: "ganga-aarti",
    name: "Evening Ganga Aarti",
    destination: "Varanasi, Uttar Pradesh",
    info: "Watch lamps, bells and chants light up the ghats at dusk.",
    image: india("varanasi-aarti", "Ganga aarti ceremony on the ghats of Varanasi"),
  },
  {
    slug: "golden-temple",
    name: "Golden Temple Visit",
    destination: "Amritsar, Punjab",
    info: "Feel the calm of Harmandir Sahib and share a meal at the community langar.",
    image: india("amritsar-golden-temple", "Golden Temple glowing at dusk in Amritsar"),
  },
  {
    slug: "solang-snow",
    name: "Snow Day in Solang Valley",
    destination: "Manali, Himachal Pradesh",
    info: "Snow play and seasonal adventure activities, weather permitting.",
    image: india("himachal-snow-trek", "Trekkers on a snowy ridge near Manali"),
  },
  {
    slug: "jaisalmer-desert",
    name: "Desert Evening in Jaisalmer",
    destination: "Jaisalmer, Rajasthan",
    info: "Camel rides over golden dunes, folk music and dinner under the stars.",
    image: india("jaisalmer-dunes", "Golden sand dunes of the Thar Desert near Jaisalmer"),
  },
];

/* --------------------------------------------------------------
   TRIPS FOR EVERY OCCASION (uses the offers layout — no discounts or codes)
   -------------------------------------------------------------- */
export const offers: Offer[] = [
  {
    slug: "corporate-travel",
    title: "Corporate Travel & Team Offsites",
    discount: "Corporate Travel",
    description:
      "Hill-station offsites, team retreats, incentive trips and business travel — stays, transport, meeting spaces and activities planned together and shared in one clear written quote.",
    cta: { label: "Plan a Corporate Trip", href: routes.contact },
    image: india("shimla-hills", "Green hills and hillside buildings of Shimla"),
  },
  {
    slug: "honeymoon-packages",
    title: "Honeymoons in the Hills & by the Sea",
    discount: "Honeymoon Packages",
    description: "Snowy Manali, a Kashmir houseboat, Udaipur’s lakes or Kerala’s backwaters — planned at your pace.",
    cta: { label: "Plan a Honeymoon", href: routes.contact },
    image: india("udaipur-city-palace", "City Palace across Lake Pichola, Udaipur"),
  },
  {
    slug: "group-tours",
    title: "Group Tours for Friends & Families",
    discount: "Group Tours",
    description: "One plan for everyone — rooms, vehicles and an itinerary that suits the whole group.",
    cta: { label: "Plan a Group Tour", href: routes.contact },
    image: india("kerala-houseboat", "Houseboat cruising the Kerala backwaters"),
  },
];

/* --------------------------------------------------------------
   HOW IT WORKS
   -------------------------------------------------------------- */
export const processSteps: ProcessStep[] = [
  { icon: "chat", title: "Travel Consultation", description: "Tell us who’s travelling, when, and the kind of holiday you have in mind." },
  { icon: "map", title: "Trip Planning", description: "We draft a day-by-day itinerary with stay and transport options." },
  { icon: "edit", title: "Customise", description: "Change hotels, pace or experiences until the plan feels right." },
  { icon: "confirm", title: "Confirm in Writing", description: "You get a written quote and confirmation before any payment." },
  { icon: "suitcase", title: "Travel & Support", description: "Set off with your documents ready and a planner a call away." },
];

/* --------------------------------------------------------------
   TRAVEL PLANNING TIPS (uses the blog card layout — no dates)
   -------------------------------------------------------------- */
export const latestBlogs: BlogPost[] = [
  {
    slug: "best-time-himachal",
    title: "When Is the Best Time to Visit Himachal Pradesh?",
    excerpt:
      "March to June suits sightseeing in Shimla and Manali, winter brings snow to higher areas, and the monsoon months call for flexible plans on hill roads.",
    category: "Vacation Planning",
    image: india("manali-mountains", ""),
  },
  {
    slug: "ladakh-spiti-planning",
    title: "Planning a Ladakh or Spiti Trip? Start Here",
    excerpt:
      "Allow time to acclimatise, carry valid photo ID for every traveller and check the current permit rules for protected areas before you go.",
    category: "Adventure Travel",
    image: india("ladakh-road", ""),
  },
  {
    slug: "weekend-getaways-solan",
    title: "Easy Weekend Getaways from Solan & Chandigarh",
    excerpt:
      "Kasauli, Chail, Barog and Shimla make relaxed two or three-day breaks — add a good stay and a cab, and the weekend plans itself.",
    category: "Weekend Getaways",
    image: india("shimla-hills", ""),
  },
];

/* --------------------------------------------------------------
   TESTIMONIALS — intentionally empty: add only real, consented reviews.
   The section is hidden while this list is empty.
   -------------------------------------------------------------- */
export const testimonials: Testimonial[] = [];

/* --------------------------------------------------------------
   GALLERY
   -------------------------------------------------------------- */
export const galleryCategories = ["All", "Mountains", "Heritage", "Spiritual", "Water & Coast"] as const;

export const gallery: GalleryItem[] = [
  { id: "g1", category: "Mountains", caption: "Snow-capped peaks", location: "Manali, Himachal Pradesh", shape: "tall", image: india("manali-mountains", "Snow-capped peaks and pine forests near Manali") },
  { id: "g2", category: "Heritage", caption: "Amer Fort ramparts", location: "Jaipur, Rajasthan", shape: "wide", image: india("jaipur-amer-fort", "Amer Fort ramparts and courtyards in Jaipur") },
  { id: "g3", category: "Water & Coast", caption: "Life on the backwaters", location: "Kerala", shape: "square", image: india("kerala-houseboat", "Traditional houseboat on the Kerala backwaters") },
  { id: "g4", category: "Spiritual", caption: "Evening Ganga aarti", location: "Varanasi, Uttar Pradesh", shape: "tall", image: india("varanasi-aarti", "Priests performing the Ganga aarti in Varanasi") },
  { id: "g5", category: "Mountains", caption: "Hillside homes", location: "Shimla, Himachal Pradesh", shape: "wide", image: india("shimla-hills", "Houses spread across the green hills of Shimla") },
  { id: "g6", category: "Water & Coast", caption: "Palm-fringed shores", location: "Goa", shape: "tall", image: india("goa-beach", "Turquoise water and palm-lined beach in Goa") },
  { id: "g7", category: "Heritage", caption: "City Palace on Lake Pichola", location: "Udaipur, Rajasthan", shape: "square", image: india("udaipur-city-palace", "City Palace of Udaipur rising above Lake Pichola") },
  { id: "g8", category: "Mountains", caption: "The open road", location: "Ladakh", shape: "wide", image: india("ladakh-road", "Biker on an open Himalayan highway in Ladakh") },
  { id: "g9", category: "Spiritual", caption: "Golden Temple at dusk", location: "Amritsar, Punjab", shape: "square", image: india("amritsar-golden-temple", "Golden Temple glowing at dusk in Amritsar") },
  { id: "g10", category: "Heritage", caption: "The Taj Mahal", location: "Agra, Uttar Pradesh", shape: "tall", image: india("agra-taj-mahal", "Taj Mahal with its reflecting pool in Agra") },
  { id: "g11", category: "Mountains", caption: "Misty tea-country hills", location: "Darjeeling, West Bengal", shape: "wide", image: india("darjeeling-hills", "Clouds rolling over the hills of Darjeeling") },
];

/* --------------------------------------------------------------
   HOME FAQ — direct 40–60 word answers
   -------------------------------------------------------------- */
export const faqs: Faq[] = [
  {
    question: "What is Vivid Yatra?",
    answer: `${site.name} is a travel planning company run by ${site.legalName} from Solan, Himachal Pradesh. We plan customised holidays, tour packages, weekend getaways, group tours and corporate travel across India, taking care of the itinerary, stays, transport and experiences so you can simply enjoy the journey.`,
  },
  {
    question: "What travel services does Vivid Yatra offer?",
    answer:
      "We offer travel planning, holiday packages, tour packages, domestic travel, customized tours, family holidays, honeymoon packages, group tours, weekend getaways, adventure travel, cultural travel, luxury travel and corporate travel, along with travel consultation, trip planning, vacation planning, and destination experiences such as shikara rides and desert camps.",
  },
  {
    question: "Can I customise a holiday package?",
    answer:
      "Yes. Every package we share is only a starting point. We can change the destinations, number of nights, hotel style, transport and activities to suit your dates, pace and budget, and we send a revised itinerary and written quote for each change until the plan feels right.",
  },
  {
    question: "Do you plan weekend getaways near Solan, Shimla and Chandigarh?",
    answer:
      "Yes. Short breaks are easy to plan from our base in Solan. Kasauli, Chail, Barog and Shimla are popular choices, and we can arrange the stay, a cab and a simple day plan so a two or three-day weekend feels relaxed rather than rushed.",
  },
  {
    question: "Do you organise group tours and corporate travel?",
    answer:
      "Yes. We plan group tours for friends, families, clubs and societies, and corporate travel such as team offsites, retreats and incentive trips. Share your group size, dates, budget and any meeting or activity needs, and we will propose stays and transport in one written quote.",
  },
  {
    question: "How do I start planning a trip with Vivid Yatra?",
    answer: `Send us an enquiry through our contact form, call or WhatsApp ${site.contact.phone}, or email ${site.contact.email}. Tell us your dates, destinations, number of travellers and budget. We aim to reply within 24 hours with ideas and next steps, and nothing is booked until you confirm in writing.`,
  },
];
