import type { FooterColumn, Link, NavItem } from "@/types/content";
import type { IconName } from "@/components/ui/Icon";

/** Central route map - every internal link on the site points here. */
export const routes = {
  home: "/",
  about: "/about",
  contact: "/contact",
  faq: "/faq",
  privacy: "/privacy-policy",
  terms: "/terms-and-conditions",
} as const;

export const site = {
  name: "Vivid Yatra",
  /** registered company name - used in the copyright line and legal pages */
  legalName: "Vivid Yatra Private Limited",
  tagline: "A Vivid Journey of Self-Discovery",
  description:
    "Vivid Yatra is a travel planning company in Solan, Himachal Pradesh, creating customised holidays, tour packages and weekend getaways across India.",
  logo: { src: "/images/logo.svg", alt: "Vivid Yatra" },
  footerLogo: { src: "/images/footer-logo.svg", alt: "Vivid Yatra" },
  contact: {
    phone: "+91 99159 68487",
    phoneHref: "tel:+919915968487",
    whatsappHref: "https://wa.me/919915968487",
    email: "info@vividyatra.com",
    supportEmail: "support@vividyatra.com",
    website: "www.vividyatra.com",
    websiteHref: "https://www.vividyatra.com",
    address: "Shop No. 5, 1st Floor, Thakur Complex, Rajgarh Road, Solan, Himachal Pradesh 173212",
    addressLines: ["Shop No. 5, 1st Floor, Thakur Complex", "Rajgarh Road, Solan", "Himachal Pradesh 173212"],
    city: "Solan, Himachal Pradesh",
    /** Google Maps embed + listing for the Vivid Yatra office (Contact page map) */
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3423.3036873583314!2d77.1072215!3d30.9061345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390f81fee651cf41%3A0xcbe2a6f8d9f5d01e!2sVivid%20Yatra!5e0!3m2!1sen!2sin!4v1791500383093!5m2!1sen!2sin",
    mapUrl: "https://www.google.com/maps?cid=14691488522174844958",
    /** structured address — used by the JSON-LD (keep in sync with `address`) */
    postalAddress: {
      streetAddress: "Shop No. 5, 1st Floor, Thakur Complex, Rajgarh Road",
      addressLocality: "Solan",
      addressRegion: "Himachal Pradesh",
      postalCode: "173212",
      addressCountry: "IN",
    },
    hours: "8:00 AM – 10:00 PM",
  },
};

export const mainNav: NavItem[] = [
  { label: "Home", href: routes.home },
  { label: "About", href: routes.about },
  { label: "FAQ", href: routes.faq },
  { label: "Contact", href: routes.contact },
];

export const headerCta: Link = { label: "Enquire Now", href: routes.contact };

export const socialLinks: { label: string; href: string; icon: IconName }[] = [
  { label: "Facebook", href: "https://www.facebook.com/VividYatra/", icon: "facebook" },
  { label: "Instagram", href: "https://www.instagram.com/vividyatra/", icon: "instagram" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/vividyatra", icon: "linkedin" },
  { label: "X", href: "https://x.com/VividYatra", icon: "x" },
  { label: "YouTube", href: "https://www.youtube.com/@VividYatra", icon: "youtube" },
];

export const legalLinks: Link[] = [
  { label: "Privacy Policy", href: routes.privacy },
  { label: "Terms & Conditions", href: routes.terms },
];

export const footerColumns: FooterColumn[] = [
  { title: "Quick Links", links: mainNav },
];
