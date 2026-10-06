import type { FooterColumn, Link, NavItem } from "@/types/content";
import type { IconName } from "@/components/ui/Icon";

/** Central route map — every internal link on the site points here. */
export const routes = {
  home: "/",
  destinations: "/destinations",
  packages: "/tour-packages",
  sightseeing: "/sightseeing",
  offers: "/offers",
  blogs: "/blogs",
  about: "/about",
  contact: "/contact",
  planTrip: "/plan-your-trip",
  enquire: "/plan-your-trip",
  booking: "/booking",
  login: "/login",
  register: "/register",
  account: "/account",
  gallery: "/gallery",
  faq: "/faq",
  privacy: "/privacy-policy",
  terms: "/terms-and-conditions",
  cancellation: "/cancellation-policy",
  refund: "/refund-policy",
  cookies: "/cookie-policy",
} as const;

export const site = {
  name: "Vivid Yatra",
  tagline: "A Vivid Journey of Self-Discovery",
  description:
    "Curated journeys, handpicked stays and thoughtful local experiences — planned end to end by travel specialists who have been there.",
  logo: { src: "/images/logo.svg", alt: "Vivid Yatra" },
  footerLogo: { src: "/images/footer-logo.svg", alt: "Vivid Yatra" },
  contact: {
    phone: "+91 98765 43210",
    phoneHref: "tel:+919876543210",
    whatsappHref: "https://wa.me/919876543210",
    email: "info@vividyatra.com",
    website: "www.vividyatra.com",
    websiteHref: "https://www.vividyatra.com",
    address: "2nd Floor, Travel House, Connaught Place, New Delhi 110001",
    hours: "Mon – Sat, 10:00 AM – 7:00 PM",
  },
};

export const mainNav: NavItem[] = [
  { label: "Home", href: routes.home },
  { label: "Destinations", href: routes.destinations },
  { label: "Tour Packages", href: routes.packages },
  { label: "Sightseeing", href: routes.sightseeing },
  { label: "Offers", href: routes.offers },
  { label: "Blogs", href: routes.blogs },
  { label: "About", href: routes.about },
  { label: "Contact", href: routes.contact },
];

export const headerCta: Link = { label: "Plan Your Trip", href: routes.planTrip };
export const headerSecondaryCta: Link = { label: "Enquire Now", href: routes.enquire };

export const socialLinks: { label: string; href: string; icon: IconName }[] = [
  { label: "Facebook", href: "https://www.facebook.com/", icon: "facebook" },
  { label: "Instagram", href: "https://www.instagram.com/", icon: "instagram" },
  { label: "YouTube", href: "https://www.youtube.com/", icon: "youtube" },
  { label: "LinkedIn", href: "https://www.linkedin.com/", icon: "linkedin" },
  { label: "WhatsApp", href: site.contact.whatsappHref, icon: "whatsapp" },
];

export const footerColumns: FooterColumn[] = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: routes.about },
      { label: "Why Vivid Yatra", href: `${routes.about}#why-us` },
      { label: "Travel Blogs", href: routes.blogs },
      { label: "Travel Gallery", href: routes.gallery },
      { label: "Contact Us", href: routes.contact },
    ],
  },
  {
    title: "Important Pages",
    links: [
      { label: "Plan Your Trip", href: routes.planTrip },
      { label: "Special Offers", href: routes.offers },
      { label: "Sightseeing", href: routes.sightseeing },
      { label: "FAQs", href: routes.faq },
      { label: "Customer Login", href: routes.login },
    ],
  },
  {
    title: "Destinations",
    links: [
      { label: "Switzerland", href: `${routes.destinations}/switzerland` },
      { label: "Bali", href: `${routes.destinations}/bali` },
      { label: "Japan", href: `${routes.destinations}/japan` },
      { label: "Greece", href: `${routes.destinations}/greece` },
      { label: "Maldives", href: `${routes.destinations}/maldives` },
      { label: "Dubai", href: `${routes.destinations}/dubai` },
    ],
  },
  {
    title: "Packages",
    links: [
      { label: "Honeymoon Packages", href: `${routes.packages}?style=couple` },
      { label: "Family Holidays", href: `${routes.packages}?style=family` },
      { label: "Adventure Trips", href: `${routes.packages}?style=adventure` },
      { label: "Luxury Escapes", href: `${routes.packages}?style=luxury` },
      { label: "Weekend Getaways", href: `${routes.packages}?style=weekend` },
      { label: "Spiritual Journeys", href: `${routes.packages}?style=spiritual` },
    ],
  },
];

export const legalLinks: Link[] = [
  { label: "Privacy Policy", href: routes.privacy },
  { label: "Terms & Conditions", href: routes.terms },
  { label: "Cancellation Policy", href: routes.cancellation },
  { label: "Refund Policy", href: routes.refund },
  { label: "Cookie Policy", href: routes.cookies },
];
