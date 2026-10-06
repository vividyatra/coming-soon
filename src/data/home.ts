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
import { routes } from "./site";

/* --------------------------------------------------------------
   HERO — content kept exactly as in the original design
   -------------------------------------------------------------- */
export const hero = {
  titleLines: ["Every Destination.", "Every Experience."],
  titleScript: "A New You.",
  image: { src: "/images/hero-banner.jpg", alt: "Traveller with a backpack looking out over a mountain lake" },
  primaryCta: { label: "Explore Destinations", href: routes.destinations },
  secondaryCta: { label: "Plan Your Trip", href: routes.planTrip },
  categoriesCta: { label: "View all travel styles", href: "#travel-styles" },
};

export const heroStats: Stat[] = [
  { icon: "globe", value: "100+", label: "Destinations" },
  { icon: "users", value: "2500+", label: "Happy Travelers" },
  { icon: "award", value: "10+", label: "Years of Experience" },
  { icon: "shieldCheck", value: "98%", label: "Satisfaction Rate" },
];

export const heroCategories: Category[] = [
  { icon: "adventure", title: "Adventure", subtitle: "For the thrill seekers" },
  { icon: "relaxation", title: "Relaxation", subtitle: "For the peace lovers" },
  { icon: "culture", title: "Culture", subtitle: "For the curious minds" },
  { icon: "luxury", title: "Luxury", subtitle: "For the fine explorers" },
];

/* --------------------------------------------------------------
   POPULAR DESTINATIONS
   -------------------------------------------------------------- */
export const destinations: Destination[] = [
  {
    slug: "switzerland",
    name: "Switzerland",
    tagline: "The Land of Wonders",
    description: "Glacier trains, lakeside towns and Alpine summits.",
    image: { src: "/images/switzerland.jpg", alt: "Snow-capped Swiss Alps above a lake" },
  },
  {
    slug: "bali",
    name: "Bali",
    tagline: "Island of the Gods",
    description: "Sunset beaches, rice terraces and slow island days.",
    image: { src: "/images/bali.jpg", alt: "Sunset over a Bali beach" },
  },
  {
    slug: "iceland",
    name: "Iceland",
    tagline: "Nature’s Masterpiece",
    description: "Waterfalls, black-sand beaches and northern lights.",
    image: { src: "/images/Iceland.jpg", alt: "Icelandic landscape" },
  },
  {
    slug: "japan",
    name: "Japan",
    tagline: "Tradition Meets Tomorrow",
    description: "Shrines, bullet trains and cherry-blossom streets.",
    image: { src: "/images/japan.jpg", alt: "Pagoda in Japan" },
  },
  {
    slug: "greece",
    name: "Greece",
    tagline: "Mythical & Timeless",
    description: "Whitewashed lanes above the deep-blue Aegean.",
    image: { src: "/images/greece.jpg", alt: "Santorini steps leading to the Aegean Sea" },
  },
  {
    slug: "maldives",
    name: "Maldives",
    tagline: "Paradise on Earth",
    description: "Overwater villas on quiet turquoise lagoons.",
    image: { src: "/images/blog_04.avif", alt: "Maldives lagoon" },
  },
  {
    slug: "dubai",
    name: "Dubai",
    tagline: "Luxury Redefined",
    description: "Desert dunes, skyline views and fine dining.",
    image: { src: "/images/blog_09.avif", alt: "Dubai" },
  },
];

/* --------------------------------------------------------------
   FEATURED TOUR PACKAGES
   -------------------------------------------------------------- */
export const featuredPackages: TourPackage[] = [
  {
    slug: "swiss-alpine-escape",
    title: "Swiss Alpine Escape",
    destination: "Switzerland",
    duration: "7 Nights / 8 Days",
    startingPrice: 189999,
    priceNote: "per person",
    badge: "Bestseller",
    highlights: ["Glacier Express panorama ride", "Jungfraujoch – Top of Europe", "Lake Lucerne cruise"],
    image: { src: "/images/blog_01.jpg", alt: "Hiker above a Swiss mountain lake" },
  },
  {
    slug: "bali-island-bliss",
    title: "Bali Island Bliss",
    destination: "Bali, Indonesia",
    duration: "5 Nights / 6 Days",
    startingPrice: 64999,
    priceNote: "per person",
    highlights: ["Private pool villa in Ubud", "Tanah Lot sunset visit", "Nusa Penida day trip"],
    image: { src: "/images/blog_02.avif", alt: "Golden sunset over a Bali beach" },
  },
  {
    slug: "japan-blossom-trail",
    title: "Japan Blossom Trail",
    destination: "Japan",
    duration: "8 Nights / 9 Days",
    startingPrice: 214999,
    priceNote: "per person",
    badge: "New",
    highlights: ["Tokyo, Kyoto & Osaka", "Bullet train with JR Pass", "Tea ceremony in Gion"],
    image: { src: "/images/blog_05.avif", alt: "Pagoda at golden hour in Japan" },
  },
  {
    slug: "maldives-overwater-retreat",
    title: "Maldives Overwater Retreat",
    destination: "Maldives",
    duration: "4 Nights / 5 Days",
    startingPrice: 109999,
    priceNote: "per person",
    highlights: ["Overwater villa stay", "Speedboat transfers", "Sunset dolphin cruise"],
    image: { src: "/images/blog_04.avif", alt: "Overwater villas in the Maldives" },
  },
];

/* --------------------------------------------------------------
   WHY CHOOSE VIVID YATRA
   -------------------------------------------------------------- */
export const whyChoose: Feature[] = [
  { icon: "sparkle", title: "Curated Travel Experiences", description: "Every stay and activity is handpicked and tested by our team." },
  { icon: "rupee", title: "Transparent Pricing", description: "Clear inclusions, no hidden charges — what you see is what you pay." },
  { icon: "route", title: "Personalized Planning", description: "Itineraries shaped around your pace, budget and interests." },
  { icon: "localGuide", title: "Local Expertise", description: "On-ground partners and guides who know every destination well." },
  { icon: "headset", title: "Dedicated Support", description: "One trip manager and 24/7 assistance before and during travel." },
];

/* --------------------------------------------------------------
   EXPLORE BY TRAVEL STYLE
   -------------------------------------------------------------- */
export const travelStyles: TravelStyle[] = [
  { slug: "family", icon: "family", title: "Family", subtitle: "Easy, fun trips for all ages", image: { src: "/images/about-hero-left.png", alt: "Alpine lake framed by pine forest" } },
  { slug: "couple", icon: "couple", title: "Couple / Honeymoon", subtitle: "Romantic stays & moments", image: { src: "/images/greece.jpg", alt: "Santorini lane above the sea" } },
  { slug: "adventure", icon: "adventure", title: "Adventure", subtitle: "For the thrill seekers", image: { src: "/images/blog_07.avif", alt: "Camper van on a red-rock canyon road" } },
  { slug: "cultural", icon: "culture", title: "Cultural", subtitle: "Heritage, food & traditions", image: { src: "/images/blog_06.avif", alt: "Historic Italian town" } },
  { slug: "weekend", icon: "weekend", title: "Weekend", subtitle: "Short breaks, big memories", image: { src: "/images/woman-dog-alpine-lake.png", alt: "Woman with her dog at an alpine lake" } },
  { slug: "luxury", icon: "luxury", title: "Luxury / Premium", subtitle: "For the fine explorers", image: { src: "/images/blog_09.avif", alt: "Dubai skyline" } },
  { slug: "spiritual", icon: "spiritual", title: "Spiritual", subtitle: "Temples, retreats & calm", image: { src: "/images/japan.jpg", alt: "Pagoda overlooking the city at dusk" } },
];

/* --------------------------------------------------------------
   FEATURED SIGHTSEEING
   -------------------------------------------------------------- */
export const sightseeing: Sightseeing[] = [
  {
    slug: "santorini-caldera",
    name: "Oia & the Santorini Caldera",
    destination: "Greece",
    info: "Walk the whitewashed lanes of Oia and stay for the most famous sunset in the Aegean.",
    image: { src: "/images/greece.jpg", alt: "Santorini steps leading down to the sea" },
  },
  {
    slug: "jungfraujoch",
    name: "Jungfraujoch – Top of Europe",
    destination: "Switzerland",
    info: "Cogwheel train to 3,454 m with glacier views and the Ice Palace.",
    image: { src: "/images/switzerland.jpg", alt: "Swiss Alps" },
  },
  {
    slug: "bali-beaches",
    name: "Bali’s Sunset Beaches",
    destination: "Bali",
    info: "Golden-hour strolls along Seminyak, Jimbaran and the quiet southern coves.",
    image: { src: "/images/bali.jpg", alt: "Bali beach at sunset" },
  },
  {
    slug: "kyoto-temples",
    name: "Kyoto’s Temple Trail",
    destination: "Japan",
    info: "Fushimi Inari gates, Kiyomizu-dera and old Gion lanes.",
    image: { src: "/images/japan.jpg", alt: "Japanese pagoda" },
  },
  {
    slug: "golden-circle",
    name: "Northern Lights & Golden Circle",
    destination: "Iceland",
    info: "Aurora hunts under dark skies, plus geysers and Gullfoss falls by day.",
    image: { src: "/images/Iceland.jpg", alt: "Icelandic landscape" },
  },
];

/* --------------------------------------------------------------
   SPECIAL OFFERS
   -------------------------------------------------------------- */
export const offers: Offer[] = [
  {
    slug: "early-bird-europe",
    title: "Early Bird Europe 2027",
    discount: "Save up to 15%",
    description: "Book your summer Europe holiday early and lock in the best fares, stays and a free travel insurance upgrade.",
    validTill: "31 Dec 2026",
    code: "EARLYEU15",
    cta: { label: "Grab This Offer", href: `${routes.offers}/early-bird-europe` },
    image: { src: "/images/switzerland.jpg", alt: "Swiss Alps" },
  },
  {
    slug: "honeymoon-special",
    title: "Honeymoon Special",
    discount: "Free room upgrade",
    description: "Complimentary villa upgrade and a candle-light dinner on Bali & Maldives packages.",
    validTill: "15 Nov 2026",
    cta: { label: "View Offer", href: `${routes.offers}/honeymoon-special` },
    image: { src: "/images/blog_04.avif", alt: "Maldives lagoon" },
  },
  {
    slug: "group-getaway",
    title: "Group Getaway",
    discount: "₹5,000 off / person",
    description: "Travelling with 6 or more? Enjoy a flat group discount on any international package.",
    validTill: "31 Jan 2027",
    cta: { label: "View Offer", href: `${routes.offers}/group-getaway` },
    image: { src: "/images/blog_07.avif", alt: "Camper van on a red-rock canyon road" },
  },
];

/* --------------------------------------------------------------
   HOW VIVID YATRA WORKS
   -------------------------------------------------------------- */
export const processSteps: ProcessStep[] = [
  { icon: "compass", title: "Explore", description: "Browse destinations, packages and travel styles." },
  { icon: "choose", title: "Choose", description: "Shortlist a package or ask for a custom plan." },
  { icon: "chat", title: "Enquire", description: "Share your dates and needs — we reply within 24 hours." },
  { icon: "confirm", title: "Confirm", description: "Finalise the itinerary and book with secure payment." },
  { icon: "suitcase", title: "Travel", description: "Pack your bags — we’re with you at every step." },
];

/* --------------------------------------------------------------
   LATEST BLOGS
   -------------------------------------------------------------- */
export const latestBlogs: BlogPost[] = [
  {
    slug: "first-time-switzerland-guide",
    title: "10 Things to Know Before Your First Trip to Switzerland",
    excerpt: "Rail passes, weather, budgets and the scenic routes worth every franc.",
    category: "Travel Guide",
    date: "18 Sep 2026",
    readTime: "6 min read",
    image: { src: "/images/blog_01.jpg", alt: "Hiker above a Swiss mountain lake" },
  },
  {
    slug: "best-beaches-in-bali",
    title: "The Best Beaches in Bali for Every Kind of Traveller",
    excerpt: "From lively Seminyak sunsets to quiet coves in Nusa Dua — where to go and when.",
    category: "Beaches",
    date: "05 Sep 2026",
    readTime: "5 min read",
    image: { src: "/images/blog_02.avif", alt: "Golden sunset over a Bali beach" },
  },
  {
    slug: "iceland-northern-lights",
    title: "Chasing the Northern Lights in Iceland",
    excerpt: "The best months, where to stay and how to photograph the aurora.",
    category: "Adventure",
    date: "22 Aug 2026",
    readTime: "7 min read",
    image: { src: "/images/blog_03.avif", alt: "Icelandic landscape" },
  },
];

/* --------------------------------------------------------------
   TESTIMONIALS
   -------------------------------------------------------------- */
export const testimonials: Testimonial[] = [
  {
    name: "Ananya & Rohan",
    trip: "Bali Honeymoon · 6 Days",
    rating: 5,
    quote: "Vivid Yatra planned our honeymoon perfectly! Every little detail was taken care of. Truly a memorable experience.",
    tagline: "Happy travelers for life!",
    photo: { src: "/images/photo-1520854221256-17451cc331bf.avif", alt: "Ananya and Rohan on their honeymoon" },
  },
  {
    name: "Priya & Arjun",
    trip: "Switzerland · 8 Days",
    rating: 5,
    quote: "Our entire journey was beautifully planned and completely stress-free from the very first call.",
    tagline: "Memories we will always cherish!",
    photo: { src: "/images/65.jpg", alt: "Priya, a Vivid Yatra traveller" },
  },
  {
    name: "Neha & Karan",
    trip: "Greece · 7 Days",
    rating: 5,
    quote: "Every destination, hotel and experience was perfectly arranged exactly the way we hoped.",
    tagline: "A wonderful travel experience!",
    photo: { src: "/images/45.jpg", alt: "Karan, a Vivid Yatra traveller" },
  },
  {
    name: "Meera & Rahul",
    trip: "Japan · 9 Days",
    rating: 4,
    quote: "The planning was smooth, thoughtful and exactly what we wanted for our first big trip together.",
    tagline: "Travel made beautifully simple!",
    photo: { src: "/images/28.jpg", alt: "Meera, a Vivid Yatra traveller" },
  },
  {
    name: "Aditi & Vikram",
    trip: "Maldives · 5 Days",
    rating: 5,
    quote: "From the planning to the final day, everything felt effortless and genuinely personal.",
    tagline: "Already planning our next trip!",
    photo: { src: "/images/12.jpg", alt: "Vikram, a Vivid Yatra traveller" },
  },
];

/* --------------------------------------------------------------
   TRAVEL GALLERY
   -------------------------------------------------------------- */
export const galleryCategories = ["All", "Mountains", "Beaches", "Culture", "Cities"] as const;

export const gallery: GalleryItem[] = [
  { id: "g1", category: "Mountains", caption: "Alpine lakes at dawn", location: "Switzerland", shape: "tall", image: { src: "/images/about-hero-left.png", alt: "Alpine lake framed by pine forest" } },
  { id: "g2", category: "Beaches", caption: "Aegean blues", location: "Santorini, Greece", shape: "square", image: { src: "/images/greece.jpg", alt: "Santorini steps leading to the sea" } },
  { id: "g3", category: "Culture", caption: "Temple mornings", location: "Kyoto, Japan", shape: "wide", image: { src: "/images/blog_05.avif", alt: "Pagoda at golden hour" } },
  { id: "g4", category: "Beaches", caption: "Lagoon days", location: "Maldives", shape: "tall", image: { src: "/images/blog_04.avif", alt: "Maldives lagoon" } },
  { id: "g5", category: "Cities", caption: "Skyline evenings", location: "Dubai, UAE", shape: "square", image: { src: "/images/blog_09.avif", alt: "Dubai skyline" } },
  { id: "g6", category: "Mountains", caption: "Canyon road trips", location: "Adventure Trails", shape: "wide", image: { src: "/images/blog_07.avif", alt: "Camper van on a red-rock canyon road" } },
  { id: "g7", category: "Beaches", caption: "Golden hour on the shore", location: "Bali, Indonesia", shape: "square", image: { src: "/images/blog_02.avif", alt: "Golden sunset over a Bali beach" } },
  { id: "g8", category: "Cities", caption: "Old-world streets", location: "Italy", shape: "tall", image: { src: "/images/blog_06.avif", alt: "Historic Italian town" } },
  { id: "g9", category: "Mountains", caption: "A quiet lakeside walk", location: "Swiss Alps", shape: "square", image: { src: "/images/woman-dog-alpine-lake.png", alt: "Woman with her dog at an alpine lake" } },
  { id: "g10", category: "Mountains", caption: "Land of fire & ice", location: "Iceland", shape: "wide", image: { src: "/images/blog_03.avif", alt: "Icelandic landscape" } },
];

/* --------------------------------------------------------------
   FAQ
   -------------------------------------------------------------- */
export const faqs: Faq[] = [
  {
    question: "How do I book a tour package with Vivid Yatra?",
    answer: "Choose a package or share your travel idea through the enquiry form. A trip specialist will call you within 24 hours, finalise the itinerary with you and send a secure payment link to confirm the booking.",
  },
  {
    question: "Can I customise a package to suit my plans?",
    answer: "Yes. Every package is a starting point — you can change hotels, add or remove days, include activities or combine destinations. We’ll share a revised quote before anything is booked.",
  },
  {
    question: "What is included in the package price?",
    answer: "Inclusions are listed on each package and typically cover hotels, daily breakfast, transfers and the sightseeing mentioned. Flights, visas and insurance are shown separately so pricing stays transparent.",
  },
  {
    question: "Do you help with visas and travel insurance?",
    answer: "We guide you through documentation for every destination, share checklists and can arrange travel insurance with your booking.",
  },
  {
    question: "What happens if I need to cancel or reschedule?",
    answer: "Changes and cancellations follow the policy shared with your quote. Our team will always try to reschedule first so you lose as little as possible.",
  },
  {
    question: "Is support available while I am travelling?",
    answer: "Yes — you get a dedicated trip manager plus 24/7 phone and WhatsApp support for the entire duration of your trip.",
  },
];
