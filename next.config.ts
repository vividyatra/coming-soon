import type { NextConfig } from "next";

/*
 * The Home page content (src/data/home.ts) links to a few slugs that are not
 * part of the catalog. Instead of editing the Home page, those URLs are sent
 * to the closest matching page. Remove an entry once the admin/CMS publishes
 * a real page for that slug.
 */
const homeAliases: [string, string][] = [
  ["/tour-packages/swiss-alpine-escape", "/tour-packages/switzerland-alpine-8-days"],
  ["/tour-packages/bali-island-bliss", "/tour-packages/bali-honeymoon-6-days"],
  ["/tour-packages/japan-blossom-trail", "/destinations/japan"],
  ["/tour-packages/maldives-overwater-retreat", "/destinations/maldives"],
  ["/sightseeing/santorini-caldera", "/destinations/greece"],
  ["/sightseeing/jungfraujoch", "/destinations/switzerland"],
  ["/sightseeing/bali-beaches", "/destinations/bali"],
  ["/sightseeing/kyoto-temples", "/destinations/japan"],
  ["/sightseeing/golden-circle", "/destinations/iceland"],
  ["/offers/early-bird-europe", "/offers/switzerland-summer-saver"],
  ["/blogs/first-time-switzerland-guide", "/destinations/switzerland"],
  ["/blogs/best-beaches-in-bali", "/destinations/bali"],
  ["/blogs/iceland-northern-lights", "/destinations/iceland"],
];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
  },
  async redirects() {
    return homeAliases.map(([source, destination]) => ({ source, destination, permanent: false }));
  },
};

export default nextConfig;
