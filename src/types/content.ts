/**
 * Content models shared by the public site and (later) the admin panel.
 * Keep these framework-agnostic so the same shapes can back a CMS / DB.
 */
import type { IconName } from "@/components/ui/Icon";

export type Media = {
  src: string;
  alt: string;
};

export type Link = {
  label: string;
  href: string;
};

export type NavItem = Link;

export type FooterColumn = {
  title: string;
  links: Link[];
};

export type Stat = {
  icon: IconName;
  value: string;
  label: string;
};

export type Category = {
  icon: IconName;
  title: string;
  subtitle: string;
};

export type Destination = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: Media;
};

export type TourPackage = {
  slug: string;
  title: string;
  destination: string;
  duration: string;
  startingPrice: number;
  priceNote: string;
  highlights: string[];
  badge?: string;
  image: Media;
};

export type Feature = {
  icon: IconName;
  title: string;
  description: string;
};

export type TravelStyle = {
  slug: string;
  icon: IconName;
  title: string;
  subtitle: string;
  image: Media;
};

export type Sightseeing = {
  slug: string;
  name: string;
  destination: string;
  info: string;
  image: Media;
};

export type Offer = {
  slug: string;
  title: string;
  discount: string;
  description: string;
  validTill: string;
  code?: string;
  cta: Link;
  image: Media;
};

export type ProcessStep = {
  icon: IconName;
  title: string;
  description: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: Media;
};

export type Testimonial = {
  name: string;
  trip: string;
  rating: number;
  quote: string;
  tagline: string;
  photo: Media;
};

export type GalleryItem = {
  id: string;
  category: string;
  caption: string;
  location: string;
  /** controls the tile shape in the masonry grid */
  shape: "tall" | "wide" | "square";
  image: Media;
};

export type Faq = {
  question: string;
  answer: string;
};

export type TeamMember = {
  name: string;
  role: string;
  photo: Media;
};

