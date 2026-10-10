/**
 * The 18 travel services Vivid Yatra offers. Used for the JSON-LD offer
 * catalogue; the same names appear in page copy, the FAQ and the contact form.
 */
export type Service = { name: string; description: string };

export const services: Service[] = [
  { name: "Travel Planning", description: "End-to-end planning of trips across India, from the first idea to the final itinerary." },
  { name: "Holiday Packages", description: "Holiday packages to popular Indian destinations, customised to your dates and budget." },
  { name: "Tour Packages", description: "Sightseeing-focused tour packages combining stays, transport and local experiences." },
  { name: "Domestic Travel", description: "Trips within India, from Himachal and the Himalaya to Rajasthan, Kerala and Goa." },
  { name: "Customized Tours", description: "Private tours built around your dates, pace, interests and budget." },
  { name: "Destination Experiences", description: "Local experiences such as shikara rides, desert camps and Ganga aarti evenings." },
  { name: "Travel Experiences", description: "Activities and special moments planned into your itinerary." },
  { name: "Family Holidays", description: "Easy-paced holidays for families travelling with children or elderly parents." },
  { name: "Group Tours", description: "Trips planned for groups of friends, extended families, clubs and societies." },
  { name: "Honeymoon Packages", description: "Romantic getaways with comfortable stays and a relaxed pace." },
  { name: "Weekend Getaways", description: "Short breaks near Solan, Shimla and Chandigarh, such as Kasauli, Chail and Barog." },
  { name: "Adventure Travel", description: "Snow trips, treks and high-altitude road journeys in the Himalaya." },
  { name: "Cultural Travel", description: "Heritage, spiritual and food-focused journeys across India." },
  { name: "Luxury Travel", description: "Boutique, heritage and premium stays with private transfers." },
  { name: "Corporate Travel", description: "Team offsites, retreats, incentive trips and business travel within India." },
  { name: "Travel Consultation", description: "Advice on where to go, when to travel and what to expect." },
  { name: "Trip Planning", description: "Day-by-day itineraries with stays, transport and timings worked out for you." },
  { name: "Vacation Planning", description: "Complete planning for longer vacations and school-holiday trips." },
];
