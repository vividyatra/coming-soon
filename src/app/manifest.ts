import type { MetadataRoute } from "next";
import { site } from "@/data/site";

/** Web app manifest - served at /manifest.webmanifest. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Vivid Yatra",
    short_name: "Vivid Yatra",
    description: site.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    lang: "en-IN",
    background_color: "#F7F4ED",
    theme_color: "#3F4A1C",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}