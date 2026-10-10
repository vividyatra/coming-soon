/**
 * SEO helpers — page metadata and schema.org (JSON-LD) builders.
 * All names, contact details and the address come from `src/data/site.ts`
 * so the entity details (NAP) stay identical everywhere.
 */
import type { Metadata } from "next";
import type { Faq } from "@/types/content";
import { site, socialLinks } from "@/data/site";
import { services } from "@/data/services";

export const SITE_URL = "https://www.vividyatra.com";

/**
 * Hero photo used as the schema.org `image` of the business.
 * Social previews (og:image / twitter:image) come from the generated
 * `app/opengraph-image.tsx` and `app/twitter-image.tsx` instead.
 */
export const OG_IMAGE = {
  url: "/images/hero-banner.jpg",
  width: 2400,
  height: 1600,
  alt: "Traveller with a backpack looking out over a mountain lake",
};

/**
 * Generated 1200x630 social preview (app/opengraph-image.tsx + app/twitter-image.tsx).
 * Referenced explicitly because a page-level `openGraph` object replaces the root one,
 * which would otherwise drop the file-based image on every page.
 */
export const SOCIAL_IMAGE = {
  alt: "Vivid Yatra — Travel Planning & Holiday Packages in India. Solan, Himachal Pradesh",
  width: 1200,
  height: 630,
  type: "image/png",
} as const;

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const INDIA = { "@type": "Country", name: "India" } as const;

export const absoluteUrl = (path = "/") => new URL(path, SITE_URL).toString();

type PageMeta = {
  /** page title without the brand — the root template appends " | Vivid Yatra" */
  title: string;
  description: string;
  path: string;
  /** use the title exactly as given (Home) */
  absoluteTitle?: boolean;
};

export function pageMetadata({ title, description, path, absoluteTitle = false }: PageMeta): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${site.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      siteName: site.name,
      locale: "en_IN",
      title: fullTitle,
      description,
      images: [{ url: "/opengraph-image", ...SOCIAL_IMAGE }],
    },
    twitter: {
      card: "summary_large_image",
      site: "@VividYatra",
      title: fullTitle,
      description,
      images: [{ url: "/twitter-image", alt: SOCIAL_IMAGE.alt }],
    },
  };
}

/* ---------------------------------------------------------------- */
/* JSON-LD                                                           */
/* ---------------------------------------------------------------- */

type Node = Record<string, unknown>;

export const jsonLdGraph = (...nodes: Node[]) => ({ "@context": "https://schema.org", "@graph": nodes });

const telephone = site.contact.phoneHref.replace("tel:", "");

/** TravelAgency is a LocalBusiness subtype, so it carries the local-business fields. Opening hours are intentionally omitted. */
export function organizationSchema(): Node {
  return {
    "@type": "TravelAgency",
    "@id": ORG_ID,
    name: site.name,
    legalName: site.legalName,
    url: absoluteUrl("/"),
    logo: { "@type": "ImageObject", url: absoluteUrl(site.logo.src) },
    image: absoluteUrl(OG_IMAGE.url),
    description: site.description,
    slogan: site.tagline,
    telephone,
    email: site.contact.email,
    address: { "@type": "PostalAddress", ...site.contact.postalAddress },
    areaServed: INDIA,
    sameAs: socialLinks.map((s) => s.href),
    contactPoint: [
      { "@type": "ContactPoint", contactType: "customer service", telephone, email: site.contact.email, areaServed: "IN" },
      { "@type": "ContactPoint", contactType: "customer support", telephone, email: site.contact.supportEmail, areaServed: "IN" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Travel services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.name, description: s.description, areaServed: INDIA, provider: { "@id": ORG_ID } },
      })),
    },
  };
}

export function websiteSchema(): Node {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: absoluteUrl("/"),
    name: site.name,
    description: site.description,
    inLanguage: "en-IN",
    publisher: { "@id": ORG_ID },
  };
}

type PageType = "WebPage" | "AboutPage" | "ContactPage" | "FAQPage";

export function webPageSchema(type: PageType, page: { path: string; name: string; description: string }, extra: Node = {}): Node {
  const url = absoluteUrl(page.path);
  return {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name: page.name,
    description: page.description,
    inLanguage: "en-IN",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    ...extra,
  };
}

/** Question/Answer list for the FAQPage node (used on /faq only). */
export function faqEntities(faqs: Faq[]): Node {
  return {
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]): Node {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
