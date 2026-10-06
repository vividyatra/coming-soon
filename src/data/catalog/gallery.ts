import type { GalleryPhoto } from "@/types/catalog";
import { india, site } from "./media";

/* Public travel gallery (/gallery). */

export const galleryPhotos: GalleryPhoto[] = [
  { id: "p1", category: "Destinations", caption: "Taj at first light", location: "Agra, Uttar Pradesh", shape: "tall", image: india("agra-taj-gateway", "Taj Mahal framed by the gateway") },
  { id: "p2", category: "Destinations", caption: "City of lakes", location: "Udaipur, Rajasthan", shape: "wide", image: india("udaipur-city-palace", "City Palace above Lake Pichola") },
  { id: "p3", category: "Experiences", caption: "Evening aarti", location: "Varanasi, Uttar Pradesh", shape: "square", image: india("varanasi-aarti", "Ganga aarti") },
  { id: "p4", category: "Experiences", caption: "Life on the backwaters", location: "Alleppey, Kerala", shape: "wide", image: india("kerala-houseboat", "Kerala houseboat") },
  { id: "p5", category: "Destinations", caption: "Palace of Winds", location: "Jaipur, Rajasthan", shape: "square", image: india("jaipur-hawa-mahal", "Hawa Mahal") },
  { id: "p6", category: "Experiences", caption: "Riding the high passes", location: "Ladakh", shape: "tall", image: india("ladakh-road", "Biker in Ladakh") },
  { id: "p7", category: "Destinations", caption: "Houseboats on Dal Lake", location: "Srinagar, Kashmir", shape: "wide", image: india("kashmir-dal-lake", "Dal Lake") },
  { id: "p8", category: "Customer Moments", caption: "Honeymoon in the hills", location: "Swiss Alps", shape: "square", image: site("woman-dog-alpine-lake.png", "Traveller at an alpine lake") },
  { id: "p9", category: "Destinations", caption: "Golden reflections", location: "Amritsar, Punjab", shape: "tall", image: india("amritsar-golden-temple-lake", "Golden Temple") },
  { id: "p10", category: "Experiences", caption: "Desert sunset", location: "Jaisalmer, Rajasthan", shape: "wide", image: india("jaisalmer-dunes", "Sand dunes") },
  { id: "p11", category: "Customer Moments", caption: "Summit smiles", location: "Himachal Pradesh", shape: "square", image: india("himachal-snow-trek", "Trekkers on a snowy ridge") },
  { id: "p12", category: "Destinations", caption: "Royal Mysore", location: "Mysuru, Karnataka", shape: "wide", image: india("mysore-palace-night", "Mysore Palace illuminated") },
  { id: "p13", category: "Experiences", caption: "A royal thali", location: "Rajasthan", shape: "square", image: india("indian-cuisine", "Indian curries") },
  { id: "p14", category: "Destinations", caption: "Ancient Hampi", location: "Karnataka", shape: "tall", image: india("hampi-temple", "Hampi temple") },
  { id: "p15", category: "Customer Moments", caption: "Beach days", location: "South Goa", shape: "wide", image: india("goa-beach", "Goa beach") },
  { id: "p16", category: "Destinations", caption: "Tea-country mornings", location: "Darjeeling, West Bengal", shape: "square", image: india("darjeeling-hills", "Darjeeling hills") },
  { id: "p17", category: "Customer Moments", caption: "Dawn on the Ganges", location: "Varanasi", shape: "wide", image: india("varanasi-boats", "Boats on the Ganges") },
  { id: "p18", category: "Destinations", caption: "Gateway to the sea", location: "Mumbai, Maharashtra", shape: "square", image: india("mumbai-gateway", "Gateway of India") },
];
