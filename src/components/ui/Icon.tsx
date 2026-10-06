import type { ReactNode, SVGProps } from "react";

/**
 * Line icon set used across the site. The first group is copied 1:1 from the
 * original HTML design; the rest are drawn in the same 1.4–1.6px line style.
 * Content data refers to icons by name so an admin can pick one later.
 */
type IconDef = { viewBox: string; body: ReactNode };

const s = { stroke: "currentColor", fill: "none" } as const;

const ICONS = {
  /* ---------- original: hero stats (24) ---------- */
  globe: {
    viewBox: "0 0 24 24",
    body: (
      <>
        <circle cx="12" cy="12" r="9" {...s} strokeWidth="1.4" />
        <path d="M3 12h18M12 3c2.6 2.6 3.9 6 3.9 9S14.6 18.4 12 21c-2.6-2.6-3.9-6-3.9-9S9.4 5.6 12 3Z" {...s} strokeWidth="1.4" />
      </>
    ),
  },
  users: {
    viewBox: "0 0 24 24",
    body: (
      <>
        <circle cx="9" cy="8" r="3.2" {...s} strokeWidth="1.4" />
        <path d="M3 19c0-3.3 2.7-5.3 6-5.3s6 2 6 5.3" {...s} strokeWidth="1.4" strokeLinecap="round" />
        <path d="M16 5.6a3 3 0 0 1 0 5.6M17.5 13.9c2 .8 3.5 2.6 3.5 5.1" {...s} strokeWidth="1.4" strokeLinecap="round" />
      </>
    ),
  },
  award: {
    viewBox: "0 0 24 24",
    body: (
      <>
        <circle cx="12" cy="9" r="5.5" {...s} strokeWidth="1.4" />
        <path d="m8.5 13.5-1.5 7 5-2.5 5 2.5-1.5-7" {...s} strokeWidth="1.4" strokeLinejoin="round" />
        <path d="m12 6.5 1 2 2.2.3-1.6 1.5.4 2.2-2-1-2 1 .4-2.2L8.8 8.8l2.2-.3 1-2Z" {...s} strokeWidth="1.1" strokeLinejoin="round" />
      </>
    ),
  },
  shieldCheck: {
    viewBox: "0 0 24 24",
    body: (
      <>
        <path d="M12 2.8 4.5 6v6c0 4.4 3.1 8.1 7.5 9.2 4.4-1.1 7.5-4.8 7.5-9.2V6L12 2.8Z" {...s} strokeWidth="1.4" strokeLinejoin="round" />
        <path d="m8.6 12 2.4 2.4 4.4-4.6" {...s} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },

  /* ---------- original: categories (32) ---------- */
  adventure: {
    viewBox: "0 0 32 32",
    body: (
      <>
        <path d="M3 24 11 10l5 8.5" {...s} strokeWidth="1.5" strokeLinejoin="round" />
        <path d="m13 24 6-10.5L29 24H13Z" {...s} strokeWidth="1.5" strokeLinejoin="round" />
        <path d="m8.6 16.6 2.4 2 2.2-2" {...s} strokeWidth="1.3" strokeLinecap="round" />
        <path d="M2 27h28" {...s} strokeWidth="1.5" strokeLinecap="round" />
      </>
    ),
  },
  relaxation: {
    viewBox: "0 0 32 32",
    body: (
      <>
        <circle cx="16" cy="16" r="13" {...s} strokeWidth="1.5" />
        <path d="M10 22c8.5 0 12.5-4.5 13-12-8 0-13 3.5-13 12Z" {...s} strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M10 22c1-4 3.5-7 7-9" {...s} strokeWidth="1.3" strokeLinecap="round" />
      </>
    ),
  },
  culture: {
    viewBox: "0 0 32 32",
    body: (
      <>
        <path d="m16 4 12 6H4l12-6Z" {...s} strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M7 13v10M13 13v10M19 13v10M25 13v10" {...s} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M3 26h26M4.5 23h23" {...s} strokeWidth="1.5" strokeLinecap="round" />
      </>
    ),
  },
  luxury: {
    viewBox: "0 0 32 32",
    body: (
      <>
        <path d="M9 5h14l6 8-13 14L3 13l6-8Z" {...s} strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M3 13h26M12 5 9 13l7 14 7-14-3-8" {...s} strokeWidth="1.3" strokeLinejoin="round" />
      </>
    ),
  },

  /* ---------- new: travel styles (32) ---------- */
  family: {
    viewBox: "0 0 32 32",
    body: (
      <>
        <circle cx="10" cy="8" r="3" {...s} strokeWidth="1.5" />
        <circle cx="22" cy="8" r="3" {...s} strokeWidth="1.5" />
        <circle cx="16" cy="16.5" r="2.3" {...s} strokeWidth="1.4" />
        <path d="M4.5 27v-7.5A5.5 5.5 0 0 1 10 14h.5M27.5 27v-7.5A5.5 5.5 0 0 0 22 14h-.5" {...s} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M11.5 27v-2.5a4.5 4.5 0 0 1 9 0V27" {...s} strokeWidth="1.5" strokeLinecap="round" />
      </>
    ),
  },
  couple: {
    viewBox: "0 0 32 32",
    body: (
      <>
        <path d="M16 27S4 20 4 11.8A6.3 6.3 0 0 1 16 9a6.3 6.3 0 0 1 12 2.8C28 20 16 27 16 27Z" {...s} strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M11 13.5c.6-1.6 1.9-2.5 3.4-2.5" {...s} strokeWidth="1.3" strokeLinecap="round" />
      </>
    ),
  },
  weekend: {
    viewBox: "0 0 32 32",
    body: (
      <>
        <rect x="4" y="6.5" width="24" height="21" rx="3" {...s} strokeWidth="1.5" />
        <path d="M4 12.5h24M10 3.5v5M22 3.5v5" {...s} strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="16" cy="20" r="3" {...s} strokeWidth="1.4" />
        <path d="M16 14.8v1.2M16 24v1.2M10.8 20H12M20 20h1.2" {...s} strokeWidth="1.3" strokeLinecap="round" />
      </>
    ),
  },
  spiritual: {
    viewBox: "0 0 32 32",
    body: (
      <>
        <path d="M16 6c3 3 4.4 6.4 4.4 10S19 23 16 25c-3-2-4.4-5.4-4.4-9S13 9 16 6Z" {...s} strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M11.8 12.2C8 11 5 12 3.5 13c1 5.5 5.4 11 12.5 12M20.2 12.2C24 11 27 12 28.5 13c-1 5.5-5.4 11-12.5 12" {...s} strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M6 28h20" {...s} strokeWidth="1.5" strokeLinecap="round" />
      </>
    ),
  },

  /* ---------- original: features bar (32) ---------- */
  map: {
    viewBox: "0 0 32 32",
    body: (
      <>
        <path d="M3 8.5 11.5 5v19L3 27.5v-19Z" {...s} strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M11.5 5 20 8.5v19L11.5 24" {...s} strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M20 8.5 28.5 5v19L20 27.5" {...s} strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M22 9.5a3.4 3.4 0 0 0-3.4 3.4c0 2.4 3.4 6 3.4 6s3.4-3.6 3.4-6A3.4 3.4 0 0 0 22 9.5Z" {...s} strokeWidth="1.4" strokeLinejoin="round" />
      </>
    ),
  },
  priceTag: {
    viewBox: "0 0 32 32",
    body: (
      <>
        <path d="M16.5 3.5H28v11.4L15.4 27.5 4 16.1 16.5 3.5Z" {...s} strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="22.5" cy="9.5" r="2.2" {...s} strokeWidth="1.4" />
        <path d="m10 13 8 8M18 13l-8 8" {...s} strokeWidth="1.5" strokeLinecap="round" />
      </>
    ),
  },
  headset: {
    viewBox: "0 0 32 32",
    body: (
      <>
        <path d="M5 19v-3a11 11 0 0 1 22 0v3" {...s} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M5 17h2.5A1.5 1.5 0 0 1 9 18.5v4A1.5 1.5 0 0 1 7.5 24H5v-7ZM27 17h-2.5a1.5 1.5 0 0 0-1.5 1.5v4a1.5 1.5 0 0 0 1.5 1.5H27v-7Z" {...s} strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M27 24v1.5a2.5 2.5 0 0 1-2.5 2.5H18" {...s} strokeWidth="1.5" strokeLinecap="round" />
      </>
    ),
  },
  secure: {
    viewBox: "0 0 32 32",
    body: (
      <>
        <path d="M16 3 5.5 7.5v8.6c0 6 4.4 11.4 10.5 12.9 6.1-1.5 10.5-6.9 10.5-12.9V7.5L16 3Z" {...s} strokeWidth="1.5" strokeLinejoin="round" />
        <rect x="11.5" y="14.5" width="9" height="7.5" rx="1.6" {...s} strokeWidth="1.4" />
        <path d="M13.5 14.5v-2a2.5 2.5 0 0 1 5 0v2" {...s} strokeWidth="1.4" strokeLinecap="round" />
      </>
    ),
  },

  /* ---------- new: why choose (32) ---------- */
  sparkle: {
    viewBox: "0 0 32 32",
    body: (
      <>
        <path d="M14 4.5c.9 5.6 3.4 8.1 9 9-5.6.9-8.1 3.4-9 9-.9-5.6-3.4-8.1-9-9 5.6-.9 8.1-3.4 9-9Z" {...s} strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M25 20.5c.4 2.2 1.3 3.1 3.5 3.5-2.2.4-3.1 1.3-3.5 3.5-.4-2.2-1.3-3.1-3.5-3.5 2.2-.4 3.1-1.3 3.5-3.5Z" {...s} strokeWidth="1.3" strokeLinejoin="round" />
      </>
    ),
  },
  rupee: {
    viewBox: "0 0 32 32",
    body: (
      <>
        <rect x="4" y="4" width="24" height="24" rx="5" {...s} strokeWidth="1.5" />
        <path d="M11 10h10M11 14.5h10M14 10c3.3 0 5 1.4 5 4.5s-2 4.5-5 4.5h-2.5l7 5.5" {...s} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  route: {
    viewBox: "0 0 32 32",
    body: (
      <>
        <circle cx="7.5" cy="24.5" r="3" {...s} strokeWidth="1.5" />
        <path d="M24.5 4a4 4 0 0 0-4 4c0 3 4 7 4 7s4-4 4-7a4 4 0 0 0-4-4Z" {...s} strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M10.5 24.5h9a4 4 0 0 0 0-8h-7a4 4 0 0 1 0-8h4" {...s} strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2.4 3" />
      </>
    ),
  },
  localGuide: {
    viewBox: "0 0 32 32",
    body: (
      <>
        <path d="M16 3.5a8 8 0 0 0-8 8c0 6 8 13.5 8 13.5s8-7.5 8-13.5a8 8 0 0 0-8-8Z" {...s} strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="16" cy="10" r="2.6" {...s} strokeWidth="1.4" />
        <path d="M11.8 16.8c.9-1.8 2.4-2.8 4.2-2.8s3.3 1 4.2 2.8" {...s} strokeWidth="1.4" strokeLinecap="round" />
        <path d="M8 28.5h16" {...s} strokeWidth="1.5" strokeLinecap="round" />
      </>
    ),
  },

  /* ---------- new: how it works (32) ---------- */
  compass: {
    viewBox: "0 0 32 32",
    body: (
      <>
        <circle cx="16" cy="16" r="12.5" {...s} strokeWidth="1.5" />
        <path d="m20.8 11.2-2.6 7-7 2.6 2.6-7 7-2.6Z" {...s} strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M16 3.5v2.5M16 26v2.5M3.5 16H6M26 16h2.5" {...s} strokeWidth="1.4" strokeLinecap="round" />
      </>
    ),
  },
  choose: {
    viewBox: "0 0 32 32",
    body: (
      <>
        <rect x="5" y="4" width="22" height="24" rx="3" {...s} strokeWidth="1.5" />
        <path d="m9.5 11 2 2 3.5-3.5M9.5 19l2 2 3.5-3.5" {...s} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18.5 11.5h4M18.5 19.5h4" {...s} strokeWidth="1.5" strokeLinecap="round" />
      </>
    ),
  },
  chat: {
    viewBox: "0 0 32 32",
    body: (
      <>
        <path d="M5 7.5A3.5 3.5 0 0 1 8.5 4h15A3.5 3.5 0 0 1 27 7.5v10a3.5 3.5 0 0 1-3.5 3.5H13l-6 5v-5.2A3.5 3.5 0 0 1 5 17.5v-10Z" {...s} strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M11 11h10M11 15h6" {...s} strokeWidth="1.5" strokeLinecap="round" />
      </>
    ),
  },
  confirm: {
    viewBox: "0 0 32 32",
    body: (
      <>
        <path d="m16 3.5 3 2.5 3.8-.8 1.5 3.6 3.6 1.5-.8 3.8 2.5 3-2.5 3 .8 3.8-3.6 1.5-1.5 3.6-3.8-.8-3 2.5-3-2.5-3.8.8-1.5-3.6-3.6-1.5.8-3.8-2.5-3 2.5-3-.8-3.8 3.6-1.5 1.5-3.6 3.8.8 3-2.5Z" {...s} strokeWidth="1.5" strokeLinejoin="round" />
        <path d="m11.5 16 3.1 3.1 6-6.2" {...s} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  suitcase: {
    viewBox: "0 0 32 32",
    body: (
      <>
        <rect x="5" y="9" width="22" height="17" rx="3" {...s} strokeWidth="1.5" />
        <path d="M12 9V6.5A1.5 1.5 0 0 1 13.5 5h5A1.5 1.5 0 0 1 20 6.5V9M11 9v17M21 9v17" {...s} strokeWidth="1.5" />
        <path d="M9 29h2M21 29h2" {...s} strokeWidth="1.5" strokeLinecap="round" />
      </>
    ),
  },

  /* ---------- original: About "What Drives Us" (48) ---------- */
  passion: {
    viewBox: "0 0 48 48",
    body: (
      <>
        <path d="M13 18c0-4.4 3.6-8 8-8h6c4.4 0 8 3.6 8 8v20c0 2.2-1.8 4-4 4H17c-2.2 0-4-1.8-4-4V18Z" {...s} strokeWidth="2" strokeLinejoin="round" />
        <path d="M19 10V8c0-2.2 1.8-4 4-4h2c2.2 0 4 1.8 4 4v2" {...s} strokeWidth="2" strokeLinejoin="round" />
        <path d="M20 24h8M20 30h8" {...s} strokeWidth="2" strokeLinecap="round" />
        <path d="M13 20h-2c-1.7 0-3 1.3-3 3v7c0 1.7 1.3 3 3 3h2M35 20h2c1.7 0 3 1.3 3 3v7c0 1.7-1.3 3-3 3h-2" {...s} strokeWidth="1.8" strokeLinejoin="round" />
      </>
    ),
  },
  commitment: {
    viewBox: "0 0 48 48",
    body: (
      <>
        <path d="M24 4 7 11v13c0 9.5 6.9 17.6 17 20 10.1-2.4 17-10.5 17-20V11L24 4Z" {...s} strokeWidth="2" strokeLinejoin="round" />
        <path d="m17 24 5 5 10-11" {...s} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  honest: {
    viewBox: "0 0 48 48",
    body: (
      <>
        <path d="M38 12A18 18 0 1 0 42 24" {...s} strokeWidth="2" strokeLinecap="round" />
        <circle cx="24" cy="24" r="10" {...s} strokeWidth="2" />
        <path d="m24 18 1.9 3.9 4.3.6-3.1 3 .7 4.3-3.8-2-3.8 2 .7-4.3-3.1-3 4.3-.6L24 18Z" {...s} strokeWidth="1.6" strokeLinejoin="round" />
      </>
    ),
  },
  planet: {
    viewBox: "0 0 48 48",
    body: (
      <>
        <path d="M12 36C6 26 12 12 26 8c6-1.7 12-2 16-1 1 4 .6 10-1 16-4 14-18 20-28 14l-1-1Z" {...s} strokeWidth="2" strokeLinejoin="round" />
        <path d="M11 40c3-10 10-18 20-23" {...s} strokeWidth="2" strokeLinecap="round" />
        <path d="M26 8c-3 8-2 15 3 21" {...s} strokeWidth="1.6" strokeLinecap="round" />
      </>
    ),
  },

  /* ---------- original: Trip Planner "Why Plan with Us" (48) ---------- */
  itinerary: {
    viewBox: "0 0 48 48",
    body: (
      <>
        <path d="M16 20c0-4.4 3.6-8 8-8h2c4.4 0 8 3.6 8 8v18c0 2.2-1.8 4-4 4H20c-2.2 0-4-1.8-4-4V20Z" {...s} strokeWidth="2" strokeLinejoin="round" />
        <path d="M21 12v-2a4 4 0 0 1 4-4 4 4 0 0 1 4 4v2" {...s} strokeWidth="2" strokeLinejoin="round" />
        <path d="M16 22h-2a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h2M34 22h2a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3h-2" {...s} strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M22 27a3 3 0 0 1 3-3 3 3 0 0 1 3 3c0 2.2-3 5-3 5s-3-2.8-3-5Z" {...s} strokeWidth="1.7" strokeLinejoin="round" />
      </>
    ),
  },
  expert: {
    viewBox: "0 0 48 48",
    body: (
      <>
        <path d="m24 5 4 3.4 5-1.2 2 4.8 4.8 2-1.2 5L42 24l-3.4 4 1.2 5-4.8 2-2 4.8-5-1.2L24 42l-4-3.4-5 1.2-2-4.8-4.8-2 1.2-5L6 24l3.4-4-1.2-5 4.8-2 2-4.8 5 1.2L24 5Z" {...s} strokeWidth="2" strokeLinejoin="round" />
        <path d="m17.5 24 4.6 4.6L31 19.5" {...s} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  saveMoney: {
    viewBox: "0 0 48 48",
    body: (
      <>
        <circle cx="24" cy="24" r="18" {...s} strokeWidth="2" />
        <path d="M24 13v14m0 0-5-5m5 5 5-5" {...s} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M17 34h14" {...s} strokeWidth="2" strokeLinecap="round" />
      </>
    ),
  },
  stressFree: {
    viewBox: "0 0 48 48",
    body: (
      <>
        <circle cx="24" cy="14" r="6" {...s} strokeWidth="2" />
        <path d="M14 34c0-5.5 4.5-9 10-9s10 3.5 10 9" {...s} strokeWidth="2" strokeLinecap="round" />
        <path d="M8 40c0-8.8 4-16 10-20M40 40c0-8.8-4-16-10-20" {...s} strokeWidth="2" strokeLinecap="round" />
        <circle cx="9.5" cy="27" r="4" {...s} strokeWidth="1.8" />
        <circle cx="38.5" cy="27" r="4" {...s} strokeWidth="1.8" />
      </>
    ),
  },

  /* ---------- ui (24) ---------- */
  arrowRight: {
    viewBox: "0 0 24 24",
    body: <path d="M5 12h13m0 0-5-5m5 5-5 5" {...s} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
  },
  arrowLeft: {
    viewBox: "0 0 24 24",
    body: <path d="M19 12H6m0 0 5-5m-5 5 5 5" {...s} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
  },
  calendar: {
    viewBox: "0 0 24 24",
    body: (
      <>
        <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" {...s} strokeWidth="1.5" />
        <path d="M3.5 9.5h17M8 3v4M16 3v4" {...s} strokeWidth="1.5" strokeLinecap="round" />
      </>
    ),
  },
  clock: {
    viewBox: "0 0 24 24",
    body: (
      <>
        <circle cx="12" cy="12" r="8.5" {...s} strokeWidth="1.5" />
        <path d="M12 7.5V12l3 2" {...s} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  pin: {
    viewBox: "0 0 24 24",
    body: (
      <>
        <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" {...s} strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="12" cy="10" r="2.3" {...s} strokeWidth="1.5" />
      </>
    ),
  },
  check: {
    viewBox: "0 0 24 24",
    body: <path d="m5 12.5 4.5 4.5L19 7.5" {...s} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />,
  },
  chevronLeft: {
    viewBox: "0 0 24 24",
    body: <path d="M14.5 6 8.5 12l6 6" {...s} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
  },
  chevronRight: {
    viewBox: "0 0 24 24",
    body: <path d="M9.5 6l6 6-6 6" {...s} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
  },
  chevronDown: {
    viewBox: "0 0 24 24",
    body: <path d="m6 9.5 6 6 6-6" {...s} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
  },
  plus: {
    viewBox: "0 0 24 24",
    body: <path d="M12 5v14M5 12h14" {...s} strokeWidth="1.6" strokeLinecap="round" />,
  },
  search: {
    viewBox: "0 0 24 24",
    body: (
      <>
        <circle cx="11" cy="11" r="6.6" {...s} strokeWidth="1.8" />
        <path d="m16 16 4.5 4.5" {...s} strokeWidth="1.8" strokeLinecap="round" />
      </>
    ),
  },
  menu: {
    viewBox: "0 0 24 24",
    body: <path d="M4 6h16M4 12h16M4 18h16" {...s} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
  },
  close: {
    viewBox: "0 0 24 24",
    body: <path d="M6 6l12 12M18 6 6 18" {...s} strokeWidth="2" strokeLinecap="round" />,
  },
  phone: {
    viewBox: "0 0 24 24",
    body: <path d="M8.6 3.5 10.8 8l-2.2 2.2a13.5 13.5 0 0 0 5.2 5.2L16 13.2l4.5 2.2v3.4c0 1.1-.9 2-2 2C10.2 20.5 3.5 13.8 3.3 5.5c0-1.1.9-2 2-2h3.3Z" {...s} strokeWidth="1.6" strokeLinejoin="round" />,
  },
  mail: {
    viewBox: "0 0 24 24",
    body: (
      <>
        <rect x="2.8" y="5" width="18.4" height="14" rx="2.2" {...s} strokeWidth="1.6" />
        <path d="m3.5 7 8.5 6 8.5-6" {...s} strokeWidth="1.6" strokeLinejoin="round" />
      </>
    ),
  },
  web: {
    viewBox: "0 0 24 24",
    body: (
      <>
        <circle cx="12" cy="12" r="9" {...s} strokeWidth="1.6" />
        <path d="M3 12h18M12 3c2.6 2.7 3.9 6 3.9 9s-1.3 6.3-3.9 9c-2.6-2.7-3.9-6-3.9-9S9.4 5.7 12 3Z" {...s} strokeWidth="1.6" />
      </>
    ),
  },
  plane: {
    viewBox: "0 0 24 24",
    body: <path d="M2.5 12.5 21 6l-6.5 12.5-2.5-5.5-9.5-.5Z" fill="currentColor" />,
  },
  star: {
    viewBox: "0 0 24 24",
    body: <path d="m12 3.2 2.7 5.5 6 .9-4.4 4.2 1 6-5.3-2.8-5.4 2.8 1-6L3.3 9.6l6-.9L12 3.2Z" fill="currentColor" />,
  },

  /* ---------- listing / detail / account (24) ---------- */
  camera: {
    viewBox: "0 0 24 24",
    body: (
      <>
        <path d="M4 8.5A2.5 2.5 0 0 1 6.5 6h1.8l1.4-2h4.6l1.4 2h1.8A2.5 2.5 0 0 1 20 8.5v8a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 16.5v-8Z" {...s} strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="12" cy="12.5" r="3.3" {...s} strokeWidth="1.5" />
      </>
    ),
  },
  food: {
    viewBox: "0 0 24 24",
    body: (
      <>
        <path d="M6 3v7a2 2 0 0 0 2 2v9M10 3v7a2 2 0 0 1-2 2M8 3v5" {...s} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M17.5 21V3c-2 1.2-3.5 3.8-3.5 7.5 0 2 1.2 3 3.5 3" {...s} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  boat: {
    viewBox: "0 0 24 24",
    body: (
      <>
        <path d="M3 15h18l-2.4 4.2a2 2 0 0 1-1.7 1H7.1a2 2 0 0 1-1.7-1L3 15Z" {...s} strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M6 15V9.5h12V15M9 9.5V6.5h6v3" {...s} strokeWidth="1.5" strokeLinejoin="round" />
      </>
    ),
  },
  sun: {
    viewBox: "0 0 24 24",
    body: (
      <>
        <circle cx="12" cy="12" r="4" {...s} strokeWidth="1.5" />
        <path d="M12 2.5v2M12 19.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2.5 12h2M19.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" {...s} strokeWidth="1.5" strokeLinecap="round" />
      </>
    ),
  },
  snow: {
    viewBox: "0 0 24 24",
    body: <path d="M12 2.5v19M3.8 7.25l16.4 9.5M3.8 16.75l16.4-9.5M9.5 4 12 6.5 14.5 4M9.5 20 12 17.5 14.5 20" {...s} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />,
  },
  rain: {
    viewBox: "0 0 24 24",
    body: (
      <>
        <path d="M7 15.5a4.5 4.5 0 0 1-.4-9 6 6 0 0 1 11.3 1.6A3.8 3.8 0 0 1 17.5 15.5H7Z" {...s} strokeWidth="1.5" strokeLinejoin="round" />
        <path d="m8 18.5-1 2M12.5 18.5l-1 2M17 18.5l-1 2" {...s} strokeWidth="1.5" strokeLinecap="round" />
      </>
    ),
  },
  bed: {
    viewBox: "0 0 24 24",
    body: (
      <>
        <path d="M3 18.5V6M3 14h18v4.5M21 14v-2.5A3.5 3.5 0 0 0 17.5 8H11v6" {...s} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="7" cy="10.5" r="2" {...s} strokeWidth="1.5" />
      </>
    ),
  },
  car: {
    viewBox: "0 0 24 24",
    body: (
      <>
        <path d="M4 16.5v-4l1.8-4.7A2 2 0 0 1 7.7 6.5h8.6a2 2 0 0 1 1.9 1.3l1.8 4.7v4M4 12.5h16" {...s} strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M4 16.5h16v2a1 1 0 0 1-1 1h-1.5a1 1 0 0 1-1-1v-.5h-9v.5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-2Z" {...s} strokeWidth="1.5" strokeLinejoin="round" />
      </>
    ),
  },
  ticket: {
    viewBox: "0 0 24 24",
    body: (
      <>
        <path d="M3.5 8.5V6.5a1 1 0 0 1 1-1h15a1 1 0 0 1 1 1v2a2.5 2.5 0 0 0 0 5v2a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1v-2a2.5 2.5 0 0 0 0-5Z" {...s} strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M14.5 6v2M14.5 11v2M14.5 16v2" {...s} strokeWidth="1.5" strokeLinecap="round" />
      </>
    ),
  },
  info: {
    viewBox: "0 0 24 24",
    body: (
      <>
        <circle cx="12" cy="12" r="8.5" {...s} strokeWidth="1.5" />
        <path d="M12 11v5.5M12 7.8v.2" {...s} strokeWidth="1.8" strokeLinecap="round" />
      </>
    ),
  },
  user: {
    viewBox: "0 0 24 24",
    body: (
      <>
        <circle cx="12" cy="8" r="3.8" {...s} strokeWidth="1.5" />
        <path d="M4.5 20c.6-3.8 3.6-6 7.5-6s6.9 2.2 7.5 6" {...s} strokeWidth="1.5" strokeLinecap="round" />
      </>
    ),
  },
  lock: {
    viewBox: "0 0 24 24",
    body: (
      <>
        <rect x="4.5" y="10.5" width="15" height="10" rx="2.2" {...s} strokeWidth="1.5" />
        <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" {...s} strokeWidth="1.5" strokeLinecap="round" />
      </>
    ),
  },
  logout: {
    viewBox: "0 0 24 24",
    body: <path d="M14 4.5H7A2.5 2.5 0 0 0 4.5 7v10A2.5 2.5 0 0 0 7 19.5h7M10 12h10m0 0-3.5-3.5M20 12l-3.5 3.5" {...s} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />,
  },
  heart: {
    viewBox: "0 0 24 24",
    body: <path d="M12 20s-7.5-4.4-7.5-10.2A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6C19.5 15.6 12 20 12 20Z" {...s} strokeWidth="1.5" strokeLinejoin="round" />,
  },
  grid: {
    viewBox: "0 0 24 24",
    body: <path d="M4.5 4.5h6v6h-6v-6ZM13.5 4.5h6v6h-6v-6ZM4.5 13.5h6v6h-6v-6ZM13.5 13.5h6v6h-6v-6Z" {...s} strokeWidth="1.5" strokeLinejoin="round" />,
  },
  receipt: {
    viewBox: "0 0 24 24",
    body: (
      <>
        <path d="M6 3.5h12v17l-2-1.3-2 1.3-2-1.3-2 1.3-2-1.3-2 1.3v-17Z" {...s} strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M9 8h6M9 11.5h6M9 15h3.5" {...s} strokeWidth="1.5" strokeLinecap="round" />
      </>
    ),
  },
  settings: {
    viewBox: "0 0 24 24",
    body: (
      <>
        <circle cx="12" cy="12" r="3" {...s} strokeWidth="1.5" />
        <path d="M19.4 13.5a7.6 7.6 0 0 0 0-3l1.8-1.4-1.8-3.1-2.1.8a7.5 7.5 0 0 0-2.6-1.5L14.4 3h-3.6l-.3 2.3a7.5 7.5 0 0 0-2.6 1.5l-2.1-.8-1.8 3.1 1.8 1.4a7.6 7.6 0 0 0 0 3L4 14.9l1.8 3.1 2.1-.8a7.5 7.5 0 0 0 2.6 1.5l.3 2.3h3.6l.3-2.3a7.5 7.5 0 0 0 2.6-1.5l2.1.8 1.8-3.1-1.8-1.4Z" {...s} strokeWidth="1.4" strokeLinejoin="round" />
      </>
    ),
  },
  edit: {
    viewBox: "0 0 24 24",
    body: <path d="M4.5 19.5h4l10-10a2.8 2.8 0 0 0-4-4l-10 10v4ZM13.5 6.5l4 4" {...s} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />,
  },
  share: {
    viewBox: "0 0 24 24",
    body: (
      <>
        <circle cx="17.5" cy="5.5" r="2.5" {...s} strokeWidth="1.5" />
        <circle cx="6.5" cy="12" r="2.5" {...s} strokeWidth="1.5" />
        <circle cx="17.5" cy="18.5" r="2.5" {...s} strokeWidth="1.5" />
        <path d="m8.7 10.8 6.6-4M8.7 13.2l6.6 4" {...s} strokeWidth="1.5" />
      </>
    ),
  },
  copy: {
    viewBox: "0 0 24 24",
    body: (
      <>
        <rect x="8.5" y="8.5" width="11" height="11" rx="2" {...s} strokeWidth="1.5" />
        <path d="M15.5 8.5V6.5a2 2 0 0 0-2-2h-7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h2" {...s} strokeWidth="1.5" />
      </>
    ),
  },
  filter: {
    viewBox: "0 0 24 24",
    body: <path d="M4 6h16M7 12h10M10 18h4" {...s} strokeWidth="1.6" strokeLinecap="round" />,
  },
  gift: {
    viewBox: "0 0 24 24",
    body: (
      <>
        <rect x="3.5" y="8" width="17" height="4" rx="1" {...s} strokeWidth="1.5" />
        <path d="M5 12v7.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V12M12 8v12.5M12 8S10.8 3.5 8.2 4.2C6 4.8 7 8 12 8Zm0 0s1.2-4.5 3.8-3.8C18 4.8 17 8 12 8Z" {...s} strokeWidth="1.5" strokeLinejoin="round" />
      </>
    ),
  },
  percent: {
    viewBox: "0 0 24 24",
    body: (
      <>
        <path d="m18.5 5.5-13 13" {...s} strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="7.5" cy="7.5" r="2.3" {...s} strokeWidth="1.5" />
        <circle cx="16.5" cy="16.5" r="2.3" {...s} strokeWidth="1.5" />
      </>
    ),
  },
  bookmark: {
    viewBox: "0 0 24 24",
    body: <path d="M6.5 4.5h11v16L12 16.5l-5.5 4v-16Z" {...s} strokeWidth="1.5" strokeLinejoin="round" />,
  },
  list: {
    viewBox: "0 0 24 24",
    body: <path d="M9 6.5h11M9 12h11M9 17.5h11M4.5 6.5h.5M4.5 12h.5M4.5 17.5h.5" {...s} strokeWidth="1.8" strokeLinecap="round" />,
  },
  walk: {
    viewBox: "0 0 24 24",
    body: (
      <>
        <circle cx="13" cy="4.5" r="1.8" {...s} strokeWidth="1.5" />
        <path d="m9.5 21 2.5-6 2.5 2.5V21M8 12l2-4.5 3 .5 2 3 3 1M12 8l-1 5" {...s} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  flag: {
    viewBox: "0 0 24 24",
    body: <path d="M5.5 21V4.5M5.5 4.5h11l-2 4 2 4h-11" {...s} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />,
  },
  download: {
    viewBox: "0 0 24 24",
    body: <path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M4.5 19.5h15" {...s} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
  },
  eye: {
    viewBox: "0 0 24 24",
    body: (
      <>
        <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" {...s} strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="3" {...s} strokeWidth="1.5" />
      </>
    ),
  },
  x: {
    viewBox: "0 0 24 24",
    body: <path fill="currentColor" d="M17.8 3.5h3.1l-6.8 7.8 8 10.6h-6.3l-4.9-6.4-5.6 6.4H2.2l7.3-8.3L1.8 3.5h6.4l4.4 5.9 5.2-5.9Zm-1.1 16.5h1.7L7.4 5.3H5.6l11.1 14.7Z" />,
  },
  quote: {
    viewBox: "0 0 24 24",
    body: <path fill="currentColor" d="M4 18v-5.2C4 8.5 6.3 5.8 10 5l.8 1.6C8.6 7.4 7.6 9 7.5 11H10v7H4Zm10 0v-5.2c0-4.3 2.3-7 6-7.8l.8 1.6c-2.2.8-3.2 2.4-3.3 4.4H20v7h-6Z" />,
  },

  /* ---------- social (filled) ---------- */
  facebook: {
    viewBox: "0 0 32 32",
    body: <path fill="currentColor" d="M21.95 5.005l-3.306-.004c-3.206 0-5.277 2.124-5.277 5.415v2.495H10.05v4.515h3.317l-.004 9.575h4.641l.004-9.575h3.806l-.003-4.514h-3.803v-2.117c0-1.018.241-1.533 1.566-1.533l2.366-.001.01-4.256z" />,
  },
  instagram: {
    viewBox: "0 0 24 24",
    body: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="4.6" {...s} strokeWidth="1.5" />
        <circle cx="12" cy="12" r="3.7" {...s} strokeWidth="1.5" />
        <circle cx="16.6" cy="7.4" r="1" fill="currentColor" />
      </>
    ),
  },
  youtube: {
    viewBox: "0 0 24 24",
    body: <path fill="currentColor" d="M19.67 8.14a2.14 2.14 0 0 0-1.42-1.43A52 52 0 0 0 12 6.38c-2.09-.02-4.18.09-6.25.33A2.14 2.14 0 0 0 4.33 8.14 22 22 0 0 0 4 12a22 22 0 0 0 .33 3.88c.1.34.28.64.53.89.25.25.56.42.89.51 2.07.25 4.16.36 6.25.33 2.09.03 4.18-.08 6.25-.33.34-.09.65-.26.9-.51.24-.25.42-.55.52-.89A22 22 0 0 0 20 12a22 22 0 0 0-.33-3.86ZM10.36 14.39V9.63L14.55 12l-4.19 2.39Z" />,
  },
  whatsapp: {
    viewBox: "0 0 24 24",
    body: (
      <>
        <path d="M4.5 19.5 5.6 16A8 8 0 1 1 8.4 18.6l-3.9.9Z" {...s} strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M9.3 8.6c.2-.4.5-.4.8-.4h.4c.2 0 .3.1.4.4l.6 1.4c0 .2 0 .3-.1.5l-.5.6c.6 1.1 1.4 1.9 2.5 2.5l.6-.5c.2-.1.3-.1.5-.1l1.4.6c.3.1.4.2.4.4v.4c0 .3 0 .6-.4.8-.5.3-1.2.5-1.8.3-2.3-.7-4.1-2.5-4.8-4.8-.2-.6 0-1.3.3-1.8Z" fill="currentColor" />
      </>
    ),
  },
  linkedin: {
    viewBox: "0 0 24 24",
    body: (
      <path fill="currentColor" d="M6.9 8.7H4.2V19h2.7V8.7ZM5.55 4.5a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2ZM19.8 13.3c0-2.8-1.5-4.8-4.1-4.8-1.3 0-2.3.7-2.8 1.5V8.7h-2.6V19H13v-5.3c0-1.4.6-2.6 2-2.6s1.9 1.2 1.9 2.6V19h2.9v-5.7Z" />
    ),
  },
} satisfies Record<string, IconDef>;

export type IconName = keyof typeof ICONS;

type IconProps = Omit<SVGProps<SVGSVGElement>, "name"> & {
  name: IconName;
  title?: string;
};

export function Icon({ name, title, ...rest }: IconProps) {
  const icon = ICONS[name];
  return (
    <svg
      viewBox={icon.viewBox}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      focusable="false"
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {icon.body}
    </svg>
  );
}
