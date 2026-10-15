import type { Metadata, Viewport } from "next";
import { Great_Vibes, Inter, Playfair_Display } from "next/font/google";
import { site } from "@/data/site";
import { SITE_URL } from "@/lib/seo";
import { UpcomingTripPopup } from "@/components/shared/UpcomingTripPopup";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

/* Italic is only used below the fold (About quote), so it is loaded on demand instead of preloaded. */
const playfairItalic = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: "italic",
  variable: "--font-playfair-italic",
  display: "swap",
  preload: false,
});

/* Script accent font - short decorative lines; not preloaded so it doesn't compete with the hero image. */
const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
  display: "swap",
  preload: false,
});

const defaultTitle = "Vivid Yatra | Travel Planning & Holiday Packages in India";

/* Site-wide defaults — each page sets its own title, description, canonical and social tags via pageMetadata().
   Icons, manifest and the social preview image come from the file conventions in this folder
   (icon.png, apple-icon.png, manifest.ts, opengraph-image.tsx, twitter-image.tsx). */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: defaultTitle, template: "%s | Vivid Yatra" },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_IN",
    title: defaultTitle,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    site: "@VividYatra",
    title: defaultTitle,
    description: site.description,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#3F4A1C",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" data-scroll-behavior="smooth" className={`${inter.variable} ${playfair.variable} ${playfairItalic.variable} ${greatVibes.variable}`}>
      <body>
        {children}
        <UpcomingTripPopup />
      </body>
    </html>
  );
}
