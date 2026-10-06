import type { Media } from "@/types/content";

/** Photo from /public/images/india (Unsplash licence). */
export const india = (name: string, alt: string): Media => ({ src: `/images/india/${name}.jpg`, alt });

/** Photo from /public/images (original site assets). */
export const site = (file: string, alt: string): Media => ({ src: `/images/${file}`, alt });
