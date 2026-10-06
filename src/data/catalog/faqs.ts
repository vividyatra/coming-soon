import type { FaqGroup } from "@/types/catalog";

/* Knowledge base for /faq (and reused on listing pages). */

export const faqGroups: FaqGroup[] = [
  {
    slug: "general",
    title: "General Travel",
    icon: "globe",
    items: [
      { question: "What kind of trips does Vivid Yatra plan?", answer: "We plan private, customisable holidays across India and select international destinations — heritage tours, honeymoons, family holidays, adventure trips and spiritual journeys." },
      { question: "Are your tours private or group tours?", answer: "Most of our trips are private, meaning your own vehicle and driver. We also run fixed-departure group trips for Ladakh and Kashmir." },
      { question: "Do you help with flights and trains?", answer: "Yes. We can book flights and trains for you, or you can book them yourself and we will plan the land arrangements around them." },
      { question: "Is travel insurance included?", answer: "Insurance is included on international packages and available as an add-on for domestic trips." },
    ],
  },
  {
    slug: "booking",
    title: "Booking",
    icon: "calendar",
    items: [
      { question: "How do I book a package?", answer: "Click Book Now on any package or send an enquiry. Your trip manager confirms availability and shares a secure payment link." },
      { question: "How far in advance should I book?", answer: "We recommend 4–6 weeks for domestic trips and 8–12 weeks for international trips, and earlier for peak season." },
      { question: "Will I get a confirmation voucher?", answer: "Yes — you receive hotel vouchers, driver details and a day-wise itinerary on email and WhatsApp before travel." },
    ],
  },
  {
    slug: "packages",
    title: "Packages",
    icon: "suitcase",
    items: [
      { question: "Can I customise a package?", answer: "Every package can be customised — change hotels, add days, include activities or combine destinations." },
      { question: "Are prices per person?", answer: "Prices are per person on twin-sharing basis unless stated otherwise." },
      { question: "What hotel categories are available?", answer: "Most packages offer Standard (3★), Deluxe (4★) and Luxury (5★ or heritage) options." },
    ],
  },
  {
    slug: "payment",
    title: "Payments",
    icon: "rupee",
    items: [
      { question: "What payment methods do you accept?", answer: "UPI, credit and debit cards, net banking and bank transfer. EMI options are available on selected cards." },
      { question: "How much advance is required?", answer: "A 25% advance confirms your booking. The balance is due 15 days before travel." },
      { question: "Is my payment secure?", answer: "All online payments are processed through PCI-DSS compliant payment gateways." },
    ],
  },
  {
    slug: "cancellation",
    title: "Cancellation & Refunds",
    icon: "receipt",
    items: [
      { question: "What is your cancellation policy?", answer: "30+ days before travel: 10% retention; 15–29 days: 25%; 7–14 days: 50%; under 7 days: no refund. See the cancellation policy for details." },
      { question: "How long do refunds take?", answer: "Refunds are processed within 7–10 working days to the original payment method." },
      { question: "Can I change my travel dates instead?", answer: "Yes. Date changes are free once if requested 21+ days before travel, subject to availability." },
    ],
  },
  {
    slug: "destinations",
    title: "Destinations",
    icon: "map",
    items: [
      { question: "What is the best time to visit Rajasthan?", answer: "October to March, when the weather is pleasant and festivals are in full swing." },
      { question: "Do I need a permit for Ladakh?", answer: "Indian nationals need an inner-line permit for Nubra, Pangong and some other areas. We arrange it for you." },
      { question: "Is Kashmir safe for tourists?", answer: "Tourist areas like Srinagar, Gulmarg and Pahalgam are regularly visited by travellers. We monitor conditions closely and plan accordingly." },
    ],
  },
  {
    slug: "account",
    title: "Customer Account",
    icon: "user",
    items: [
      { question: "Do I need an account to book?", answer: "No, but an account lets you track enquiries, bookings, payments and documents in one place." },
      { question: "I forgot my password. What should I do?", answer: "Use ‘Forgot password’ on the login page or sign in with a one-time password sent to your mobile." },
      { question: "Can I download my vouchers?", answer: "Yes — confirmed bookings show downloadable vouchers and invoices under My Bookings." },
    ],
  },
];
